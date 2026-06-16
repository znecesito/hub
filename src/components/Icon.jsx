import React from "react";

const ICONS = {
  github: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.19-3.37-1.19-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.51 9.51 0 0 1 12 6c.85 0 1.7.11 2.5.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </>
  ),
  linkedin: (
    <>
      <path d="M6.5 9.5H3.75V20H6.5V9.5Z" />
      <path d="M5.12 8.1a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z" />
      <path d="M10 9.5h2.64v1.44h.04c.37-.7 1.27-1.69 2.93-1.69 3.13 0 3.71 2.06 3.71 4.74V20h-2.75v-5.33c0-1.27-.02-2.91-1.77-2.91-1.78 0-2.05 1.39-2.05 2.82V20H10V9.5Z" />
    </>
  ),
  resume: (
    <>
      <path d="M7 3h6l4 4v14H7V3Z" />
      <path d="M13 3v5h5" />
      <path d="M9.75 12h4.5" />
      <path d="M9.75 15h4.5" />
      <path d="M9.75 18h2.5" />
    </>
  ),
  audio: (
    <>
      <path d="M4 10v4h3l4 4V6l-4 4H4Z" />
      <path d="M15 9.5a4 4 0 0 1 0 5" />
      <path d="M17.5 7a7 7 0 0 1 0 10" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-5.27 7-11a7 7 0 1 0-14 0c0 5.73 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  focus: (
    <>
      <path d="M4 12h4l2-7 4 14 2-7h4" />
      <path d="M3 3v18h18" />
    </>
  ),
  status: (
    <>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="m5.64 5.64 2.83 2.83" />
      <path d="m15.53 15.53 2.83 2.83" />
      <path d="m18.36 5.64-2.83 2.83" />
      <path d="m8.47 15.53-2.83 2.83" />
    </>
  )
};

export default function Icon({ name, className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill={name === "github" || name === "linkedin" ? "currentColor" : "none"}
      stroke={name === "github" || name === "linkedin" ? "none" : "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {ICONS[name]}
    </svg>
  );
}
