import { execSync } from "node:child_process";
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

async function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
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

function transformGraphQlContributions(weeks) {
  return weeks.flatMap((week) => week.contributionDays).map((day) => ({
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

function getGitHubToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  if (process.env.GH_TOKEN) return process.env.GH_TOKEN;

  try {
    return execSync("gh auth token", { encoding: "utf8" }).trim() || null;
  } catch {
    return null;
  }
}

async function fetchFromGitHubApi(username) {
  const token = getGitHubToken();
  if (!token) return null;

  const query = `
    query ($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetchWithTimeout("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-hub-contributions-fetch"
    },
    body: JSON.stringify({ query, variables: { login: username } })
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL API responded with ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(`GitHub GraphQL API errors: ${payload.errors.map((e) => e.message).join("; ")}`);
  }

  const weeks = payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  const contributions = transformGraphQlContributions(weeks ?? []);

  if (!isActivityList(contributions)) return null;

  return { source: "github-graphql", contributions };
}

async function fetchFromMirrors(username) {
  try {
    const denoResponse = await fetchWithTimeout(`https://github-contributions-api.deno.dev/${username}.json`);
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
    const vercelResponse = await fetchWithTimeout(`https://github-contributions.vercel.app/api/v1/${username}`);
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
      {},
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

  return null;
}

async function fetchContributions(username) {
  try {
    const fromApi = await fetchFromGitHubApi(username);
    if (fromApi) return fromApi;
    console.warn("No GitHub token available or GraphQL fetch failed; falling back to third-party mirrors.");
  } catch (error) {
    console.warn(`GitHub GraphQL fetch failed (${error.message}); falling back to third-party mirrors.`);
  }

  const fromMirror = await fetchFromMirrors(username);
  if (fromMirror) return fromMirror;

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
