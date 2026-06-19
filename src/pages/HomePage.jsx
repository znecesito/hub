import React from "react";
import AppCard from "../components/AppCard.jsx";
import ExperienceTimeline from "../components/ExperienceTimeline.jsx";
import GitHubActivity from "../components/GitHubActivity.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import { APPS } from "../data/apps.js";
import { PROFILE } from "../data/profile.js";

export default function HomePage() {
  return (
    <main className="home-page">
      <div className="home-page__shell">
        <ProfileHeader />

        <section className="apps-section" aria-labelledby="apps-heading">
          <div className="section-heading">
            <p className="section-heading__kicker">Selected projects</p>
            <h2 id="apps-heading">Small tools, shipped simply.</h2>
          </div>

          <div className="apps-grid">
            {APPS.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>

        <GitHubActivity />

        <ExperienceTimeline />

        <section className="bio-card" aria-labelledby="bio-kicker">
          <p className="section-heading__kicker" id="bio-kicker">
            About
          </p>
          <p>{PROFILE.about}</p>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
