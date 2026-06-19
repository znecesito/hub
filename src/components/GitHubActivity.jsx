import React, { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import "react-activity-calendar/tooltips.css";
import { fetchGitHubContributions } from "../lib/githubContributions.js";

const GITHUB_USERNAME = "znecesito";

const GITHUB_THEME = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"]
};

export default function GitHubActivity() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchGitHubContributions(GITHUB_USERNAME)
      .then((contributions) => {
        if (!cancelled) {
          setData(contributions);
        }
      })
      .catch((fetchError) => {
        if (!cancelled) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : `Fetching GitHub contribution data for "${GITHUB_USERNAME}" failed.`
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="github-section" aria-labelledby="github-heading">
      <div className="section-heading">
        <p className="section-heading__kicker">Recent GitHub activity</p>
        <h2 id="github-heading">Building momentum since April.</h2>
      </div>

      <div className="github-card">
        {loading ? (
          <p className="github-card__status">Loading GitHub activity...</p>
        ) : null}
        {error ? (
          <p className="github-card__error">{error}</p>
        ) : null}
        {!loading && !error && data.length > 0 ? (
          <ActivityCalendar
            data={data}
            colorScheme="light"
            fontSize={13}
            showColorLegend={false}
            showMonthLabels
            showTotalCount={false}
            theme={GITHUB_THEME}
            tooltips={{
              activity: {
                text: ({ date, count }) =>
                  count === 1
                    ? `1 contribution on ${date}`
                    : `${count} contributions on ${date}`
              }
            }}
          />
        ) : null}
        <p className="github-card__note">
          Showing the last year of public contribution activity.
        </p>
      </div>
    </section>
  );
}
