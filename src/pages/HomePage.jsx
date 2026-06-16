import React from "react";
import AppCard from "../components/AppCard.jsx";
import GitHubActivity from "../components/GitHubActivity.jsx";
import ProfessionalSnapshot from "../components/ProfessionalSnapshot.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import { APPS } from "../data/apps.js";

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

        <ProfessionalSnapshot />

        <section className="bio-card" aria-labelledby="bio-heading">
          <p className="section-heading__kicker">About</p>
          <h2 id="bio-heading">I build tools that make systems easier to understand.</h2>
          <p>
            SRE building practical software for reliability, automation, and everyday workflows.
          </p>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
