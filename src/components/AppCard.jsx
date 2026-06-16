import React, { useState } from "react";

export default function AppCard({ app }) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const hasThumbnail = app.thumbnail && !thumbnailFailed;

  return (
    <article className="app-card">
      <a className="app-card__thumbnail" href={app.url} target="_blank" rel="noreferrer" aria-label={`Open ${app.name}`}>
        {hasThumbnail ? (
          <img src={app.thumbnail} alt="" onError={() => setThumbnailFailed(true)} />
        ) : (
          <span>{app.name}</span>
        )}
      </a>

      <h2 className="app-card__name">{app.name}</h2>
      <p className="app-card__tagline">{app.tagline}</p>
      <p className="app-card__description">{app.description}</p>

      <ul className="app-card__tech" aria-label={`${app.name} technologies`}>
        {app.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>

      <a className="app-card__link" href={app.url} target="_blank" rel="noreferrer">
        Open project
        <span aria-hidden>{" ->"}</span>
      </a>
    </article>
  );
}
