import React from "react";

export default function AppCard({ app }) {
  return (
    <article className="app-card">
      <div className="app-card__header">
        <span className="app-card__status">{app.status}</span>
        <span className="app-card__accent" style={{ backgroundColor: app.accent }} aria-hidden />
      </div>

      <h2 className="app-card__name">{app.name}</h2>
      <p className="app-card__tagline">{app.tagline}</p>
      <p className="app-card__description">{app.description}</p>
      <p className="app-card__privacy">{app.privacy}</p>

      <a className="app-card__link" href={app.url} target="_blank" rel="noreferrer">
        Launch app
        <span aria-hidden>{" ->"}</span>
      </a>
    </article>
  );
}
