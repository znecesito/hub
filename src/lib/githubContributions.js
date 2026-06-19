const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4
};

const PRIMARY_API = "https://github-contributions-api.jogruber.de/v4";
const FALLBACK_API = "https://github-contributions-api.deno.dev";

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

async function fetchWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchGitHubContributions(username) {
  try {
    const response = await fetchWithTimeout(`${PRIMARY_API}/${username}?y=last`);
    if (response.ok) {
      const data = await response.json();
      if (isActivityList(data.contributions)) {
        return data.contributions;
      }
    }
  } catch {
    // Primary API is often slow or unavailable; fall back below.
  }

  const response = await fetch(`${FALLBACK_API}/${username}.json`);
  if (!response.ok) {
    throw new Error(`Fetching GitHub contribution data for "${username}" failed.`);
  }

  const data = await response.json();
  if (!Array.isArray(data.contributions)) {
    throw new Error(`Fetching GitHub contribution data for "${username}" failed.`);
  }

  return transformDenoContributions(data.contributions);
}
