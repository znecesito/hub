import React from "react";
import { EXPERIENCE } from "../data/experience.js";

export default function ExperienceTimeline() {
  return (
    <section className="experience-section" aria-labelledby="experience-heading">
      <div className="section-heading">
        <p className="section-heading__kicker">Experience</p>
        <h2 id="experience-heading">Reliability work behind the projects.</h2>
      </div>

      <ol className="experience-timeline">
        {EXPERIENCE.map((entry, index) => (
          <li className="experience-item" key={entry.id}>
            <div className="experience-item__marker" aria-hidden="true">
              <span className="experience-item__dot" />
              {index < EXPERIENCE.length - 1 ? <span className="experience-item__line" /> : null}
            </div>

            <article className="experience-item__card">
              <div className="experience-item__header">
                <div>
                  <h3>{entry.company}</h3>
                  <p className="experience-item__role">{entry.role}</p>
                </div>
                <time className="experience-item__period" dateTime={entry.period}>
                  {entry.period}
                </time>
              </div>

              <ul className="experience-item__highlights">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
