import React from "react";

const FOCUS_ITEMS = ["Reliability", "Automation", "Web tools", "Experiments"];

export default function SiteHero() {
  return (
    <section className="site-hero" aria-labelledby="site-hero-heading">
      <div className="site-hero__eyebrow">Projects by Zack</div>
      <h1 id="site-hero-heading" className="site-hero__title">
        I build tools that make systems easier to understand.
      </h1>
      <p className="site-hero__lede">
        SRE building practical software for reliability, automation, and everyday workflows.
      </p>
      <ul className="site-hero__trust" aria-label="Project focus areas">
        {FOCUS_ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
