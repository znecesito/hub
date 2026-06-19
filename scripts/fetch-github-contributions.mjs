import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const USERNAME = "znecesito";
const OUTPUT_PATH = join(dirname(fileURLToPath(import.meta.url)), "../public/data/github-contributions.json");

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4
};

async function fetchWithTimeout(url, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function transformDenoContributions(weeks) {
  return weeks.flat().map((day) => ({
    date: day.date,
    count: day.contributionCount,
    level: LEVEL_MAP[day.contributionLevel] ?? 0
  }));
}

function transformVercelContributions(contributions) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 365);
  cutoff.setHours(0, 0, 0, 0);

  return contributions
    .filter((day) => new Date(`${day.date}T00:00:00`) >= cutoff)
    .map((day) => {
      const level = Number.parseInt(day.intensity, 10) || 0;
      return {
        date: day.date,
        count: day.count > 0 ? day.count : level > 0 ? 1 : 0,
        level
      };
    });
}

function isActivityList(items) {
  return (
    Array.isArray(items) &&
    items.length > 0 &&
    typeof items[0]?.date === "string" &&
    typeof items[0]?.count === "number" &&
    typeof items[0]?.level === "number"
  );
}

async function fetchContributions(username) {
  try {
    const denoResponse = await fetchWithTimeout(
      `https://github-contributions-api.deno.dev/${username}.json`
    );
    if (denoResponse.ok) {
      const denoData = await denoResponse.json();
      const contributions = transformDenoContributions(denoData.contributions);
      if (isActivityList(contributions)) {
        return { source: "deno", contributions };
      }
    }
  } catch {
    // Fall through to the next source.
  }

  try {
    const vercelResponse = await fetchWithTimeout(
      `https://github-contributions.vercel.app/api/v1/${username}`
    );
    if (vercelResponse.ok) {
      const vercelData = await vercelResponse.json();
      const contributions = transformVercelContributions(vercelData.contributions);
      if (isActivityList(contributions)) {
        return { source: "vercel", contributions };
      }
    }
  } catch {
    // Fall through to the next source.
  }

  try {
    const legacyResponse = await fetchWithTimeout(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      5000
    );
    if (legacyResponse.ok) {
      const legacyData = await legacyResponse.json();
      if (isActivityList(legacyData.contributions)) {
        return { source: "legacy", contributions: legacyData.contributions };
      }
    }
  } catch {
    // No more sources to try.
  }

  throw new Error(`Unable to fetch GitHub contributions for ${username}.`);
}

async function main() {
  const { source, contributions } = await fetchContributions(USERNAME);
  const payload = {
    username: USERNAME,
    source,
    fetchedAt: new Date().toISOString(),
    contributions
  };

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);

  console.log(`Wrote ${contributions.length} contribution days from ${source}.`);
}

main().catch((error) => {
  console.error(error.message);

  if (existsSync(OUTPUT_PATH)) {
    console.warn("Using existing github-contributions.json.");
    process.exit(0);
  }

  process.exit(1);
});
