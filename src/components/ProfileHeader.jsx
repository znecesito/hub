import React, { useRef, useState } from "react";
import Icon from "./Icon.jsx";
import { PROFILE } from "../data/profile.js";

const DETAILS = [
  {
    icon: "location",
    label: "Based in",
    value: PROFILE.location
  },
  {
    icon: "focus",
    label: "Focus",
    value: PROFILE.focus
  },
  {
    icon: "status",
    label: "Status",
    value: PROFILE.availability
  }
];

export default function ProfileHeader() {
  const [imageFailed, setImageFailed] = useState(false);
  const audioRef = useRef(null);

  function playPronunciation() {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }

  return (
    <section className="profile-card" aria-label="Profile">
      <div className="profile-card__media" aria-hidden={imageFailed}>
        {imageFailed ? (
          <span>{PROFILE.initials}</span>
        ) : (
          <img src={PROFILE.image} alt="" onError={() => setImageFailed(true)} />
        )}
      </div>

      <div className="profile-card__content">
        <div className="profile-card__identity">
          <p className="profile-card__eyebrow">Projects by Zack</p>
          <h1>{PROFILE.name}</h1>
          <p>{PROFILE.role}</p>
        </div>

        <button className="pronunciation-button" type="button" onClick={playPronunciation}>
          <Icon name="audio" />
          Hear name
        </button>
        <audio ref={audioRef} src={PROFILE.pronunciationAudio} preload="none" />

        <div className="profile-card__bio" aria-label="About Zack">
          {PROFILE.bio.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <dl className="profile-card__details">
          {DETAILS.map((detail) => (
            <div key={detail.label}>
              <dt>
                <Icon name={detail.icon} />
                {detail.label}
              </dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>

        <div className="profile-card__links" aria-label="Social links">
          {PROFILE.socials.map((social) =>
            social.pending ? (
              <span className="profile-link is-disabled" key={social.id} title="Add a public resume PDF to enable this link">
                <Icon name={social.icon} />
                {social.label}
              </span>
            ) : (
              <a className="profile-link" href={social.href} target="_blank" rel="noreferrer" key={social.id}>
                <Icon name={social.icon} />
                {social.label}
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
}
