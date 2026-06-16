import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import "react-activity-calendar/tooltips.css";

const GITHUB_USERNAME = "znecesito";

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
          colorScheme="light"
          fontSize={13}
          showColorLegend={false}
          showMonthLabels
          showTotalCount={false}
          tooltips={{
            activity: {
              text: ({ date, count }) =>
                count === 1
                  ? `1 contribution on ${date}`
                  : `${count} contributions on ${date}`
            }
          }}
        />
        <p className="github-card__note">
          Showing the last year of public contribution activity.
        </p>
      </div>
    </section>
  );
}
