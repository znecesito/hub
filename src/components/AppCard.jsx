import React, { useState } from "react";
import Icon from "./Icon.jsx";

export default function AppCard({ app }) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const hasThumbnail = app.thumbnail && !thumbnailFailed;

  const Thumbnail = app.url ? "a" : "div";

  return (
    <article className="app-card">
      <Thumbnail
        className="app-card__thumbnail"
        {...(app.url ? { href: app.url, target: "_blank", rel: "noreferrer", "aria-label": `Open ${app.name}` } : {})}
      >
        {hasThumbnail ? (
          <img src={app.thumbnail} alt="" onError={() => setThumbnailFailed(true)} />
        ) : (
          <span>{app.name}</span>
        )}
      </Thumbnail>

      <div className="app-card__meta">
        <span className="app-card__year">{app.year}</span>
        <span className="app-card__meta-divider" aria-hidden="true">
          /
        </span>
        <span className="app-card__stack">{app.technologies.join(" · ")}</span>
      </div>

      <h2 className="app-card__name">{app.name}</h2>
      <p className="app-card__tagline">{app.tagline}</p>
      <p className="app-card__description">{app.description}</p>

      <div className="app-card__actions">
        {app.url ? (
          <a className="app-card__link app-card__link--primary" href={app.url} target="_blank" rel="noreferrer">
            Open project
            <span aria-hidden>{" ->"}</span>
          </a>
        ) : (
          <span className="app-card__link app-card__link--primary app-card__link--disabled">Private project</span>
        )}
        {app.github ? (
          <a className="app-card__link app-card__link--secondary" href={app.github} target="_blank" rel="noreferrer">
            <Icon name="github" />
            View code
          </a>
        ) : null}
      </div>
    </article>
  );
}
