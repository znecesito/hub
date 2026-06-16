import React from "react";
import AppCard from "../components/AppCard.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHero from "../components/SiteHero.jsx";
import { APPS } from "../data/apps.js";

export default function HomePage() {
  return (
    <main className="home-page">
      <div className="home-page__shell">
        <SiteHero />

        <section className="apps-section" aria-labelledby="apps-heading">
          <div className="apps-section__intro">
            <p className="apps-section__kicker">Available tools</p>
            <h2 id="apps-heading">Choose what you want to inspect.</h2>
          </div>

          <div className="apps-grid">
            {APPS.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>

        <section className="bio-card" aria-labelledby="bio-heading">
          <p className="bio-card__kicker">About the maker</p>
          <h2 id="bio-heading">Hi, I am Zack.</h2>
          <p>
            This hub collects lightweight Instagram tools built around the data Meta already lets
            you export. The goal is simple: clear answers, calm interfaces, and privacy boundaries
            that are easy to understand.
          </p>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
