import React from "react";
import { GitHubCalendar } from "react-github-calendar";

const GITHUB_USERNAME = "znecesito";
const RECENT_DAYS = 30;

function selectRecentActivity(data) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - RECENT_DAYS);
  cutoff.setHours(0, 0, 0, 0);

  return data.filter((day) => new Date(`${day.date}T00:00:00`) >= cutoff);
}

export default function GitHubActivity() {
  return (
    <section className="github-section" aria-labelledby="github-heading">
      <div className="section-heading">
        <p className="section-heading__kicker">Recent GitHub activity</p>
        <h2 id="github-heading">Building momentum since April.</h2>
      </div>

      <div className="github-card">
        <GitHubCalendar
          username={GITHUB_USERNAME}
          transformData={selectRecentActivity}
          blockMargin={10}
          blockRadius={8}
          blockSize={48}
          colorScheme="light"
          fontSize={13}
          showColorLegend={false}
          showMonthLabels
          showTotalCount={false}
          theme={{
            light: ["#edeae2", "#c7d2fe", "#818cf8", "#4f46e5", "#111827"]
          }}
        />
        <p className="github-card__note">
          Showing roughly the last 30 days of public contribution activity.
        </p>
      </div>
    </section>
  );
}
