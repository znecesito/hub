import React from "react";
import { PROFILE } from "../data/profile.js";

const FOOTER_LINKS = PROFILE.socials.filter((social) => social.id === "github" || social.id === "linkedin");

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Built by Zackarin Necesito.</p>
      <div className="site-footer__links">
        {FOOTER_LINKS.map((social) => (
          <a href={social.href} target="_blank" rel="noreferrer" key={social.id}>
            {social.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
