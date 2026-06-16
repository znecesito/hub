import React from "react";

const TRUST_ITEMS = ["Browser-only", "Official exports", "No scraping", "No login"];

export default function SiteHero() {
  return (
    <section className="site-hero" aria-labelledby="site-hero-heading">
      <div className="site-hero__eyebrow">Privacy-first Instagram tools</div>
      <h1 id="site-hero-heading" className="site-hero__title">
        Small tools for understanding your Instagram export.
      </h1>
      <p className="site-hero__lede">
        I build browser-only apps that turn official Instagram data downloads into useful, readable
        views. No scraping, no account access, and no uploads.
      </p>
      <ul className="site-hero__trust" aria-label="Privacy and access">
        {TRUST_ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
