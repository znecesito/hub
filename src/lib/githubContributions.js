const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4
};

const PRIMARY_API = "https://github-contributions-api.deno.dev";
const SECONDARY_API = "https://github-contributions.vercel.app/api/v1";
const LEGACY_API = "https://github-contributions-api.jogruber.de/v4";
const STATIC_DATA_PATH = "/data/github-contributions.json";

function isActivityList(items) {
  return (
    Array.isArray(items) &&
    items.length > 0 &&
    typeof items[0]?.date === "string" &&
    typeof items[0]?.count === "number" &&
    typeof items[0]?.level === "number"
  );
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

async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchFromDeno(username) {
  const response = await fetchWithTimeout(`${PRIMARY_API}/${username}.json`);
  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  if (!Array.isArray(data.contributions)) {
    return null;
  }

  return transformDenoContributions(data.contributions);
}

async function fetchFromVercel(username) {
  const response = await fetchWithTimeout(`${SECONDARY_API}/${username}`);
  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  if (!Array.isArray(data.contributions)) {
    return null;
  }

  return transformVercelContributions(data.contributions);
}

async function fetchFromLegacy(username) {
  const response = await fetchWithTimeout(`${LEGACY_API}/${username}?y=last`, 3000);
  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  if (!isActivityList(data.contributions)) {
    return null;
  }

  return data.contributions;
}

async function fetchFromStaticBundle() {
  const response = await fetch(STATIC_DATA_PATH);
  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  if (!isActivityList(data.contributions)) {
    return null;
  }

  return data.contributions;
}

export async function fetchGitHubContributions(username) {
  const sources = [
    fetchFromStaticBundle,
    () => fetchFromDeno(username),
    () => fetchFromVercel(username),
    () => fetchFromLegacy(username)
  ];

  for (const source of sources) {
    try {
      const contributions = await source();
      if (isActivityList(contributions)) {
        return contributions;
      }
    } catch {
      // Try the next source.
    }
  }

  throw new Error(`Fetching GitHub contribution data for "${username}" failed.`);
}
