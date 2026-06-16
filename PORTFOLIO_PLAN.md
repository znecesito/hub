# Portfolio Hub Plan

## Purpose

This project is evolving from a two-app landing page into Zackarin Necesito's personal project and professional work hub.

The site should not be framed as an Instagram tools hub. The Instagram apps are early projects in a broader portfolio. Future projects may be unrelated to Instagram, so all page copy, metadata, and docs should support a general personal portfolio.

## Positioning

Primary positioning:

> SRE building practical tools for reliability, automation, and everyday workflows.

Alternate short lines:

- I build tools that make systems easier to understand.
- Practical software for reliability, automation, and personal workflows.
- Projects, experiments, and systems work by Zackarin Necesito.

The through-line across personal projects and professional work is toil reduction, clarity, automation, and useful software.

## Design Direction

Use `https://itzkashan.dev/` as a quality bar and structural inspiration, not as a direct visual clone.

Preferred style:

- Minimalist, sleek, and typography-led.
- More personal portfolio than product landing page.
- Neutral palette: off-white, near-black, slate/gray.
- One restrained accent color at most.
- Simple borders, panels, spacing, and project cards.
- Less copy. More signal.
- Avoid the current Instagram-app design family as the main direction.
- Avoid heavy animations for Phase 1.

Desired feel:

> Systems engineer with taste.

## Public Resume Guidance

The resume source exists at:

`/Users/znecesito/Downloads/Zackarin_Necesito_SRE_Resume.pdf`

Do not publish the raw resume as-is without user confirmation. It includes personal contact details and employer-specific language.

Public-safe guidance:

- Use GitHub and LinkedIn before phone number.
- Consider omitting phone number from the site.
- Keep impact, but avoid internal implementation detail.
- Prefer compact role summaries over full resume bullets.
- Keep professional work connected to the portfolio theme: automation, observability, incident response, deployment safety, infrastructure, and reliability.

Example public-safe work framing:

> Built internal automation that reduced incident investigation time by up to 2 hours by summarizing large production log searches.

If a public resume download is added, place the sanitized PDF at:

`public/resume/zackarin-necesito-resume.pdf`

Do not expose the raw Downloads path in app code. App code should only link to the public asset path:

`/resume/zackarin-necesito-resume.pdf`

## Phase 1 Scope

Goal: turn the current page into a minimal personal hub while keeping it one page.

Sections:

1. Hero
2. Selected Projects
3. Professional Snapshot
4. Footer/contact

Recommended hero copy:

Eyebrow:

```text
Projects by Zack
```

Headline:

```text
I build tools that make systems easier to understand.
```

Body:

```text
SRE building practical software for reliability, automation, and everyday workflows.
```

Optional pills:

```text
Reliability
Automation
Web tools
Experiments
```

Selected Projects section:

```text
Selected projects
```

Keep the project descriptions short. The cards should feel like a project index, not app marketing pages.

Professional Snapshot section:

```text
Professional snapshot
```

Suggested roles:

- JPMorgan Chase, Site Reliability Engineer, 2022-present
- AMC Networks / HIDIVE, DevOps Engineer, 2021-2022
- Tata Consultancy Services / GE, Cloud Engineer, 2019-2021

Keep each role to 1-2 short bullets or a single concise sentence.

Footer:

- GitHub link
- LinkedIn placeholder or real link when user provides it
- Optional resume download only after a sanitized public resume is created

## Current Project URLs

Use public production URLs directly in `src/data/apps.js`. These are not secrets.

```js
url: "https://ig-wrapped-theta.vercel.app"
url: "https://unreciprocated.vercel.app"
```

Hardcoding these public app URLs in the registry is acceptable for Phase 1. Use Vite environment variables only if the hub needs different URLs for preview, staging, and production.

## Phase 1 Implementation Checklist

- Update `index.html` title, description, and Open Graph copy away from Instagram-only language.
- Update `README.md` to describe this as a personal project portfolio hub.
- Update `src/components/SiteHero.jsx` with the new positioning.
- Update `src/pages/HomePage.jsx` section labels and bio copy.
- Update `src/data/apps.js` with real production URLs and shorter project descriptions.
- Add a compact Professional Snapshot section. This can be in `HomePage.jsx` initially or a new component if the markup grows.
- Simplify `src/tailwind.css` toward a neutral, monochrome style.
- Keep the app accessible, mobile-first, and fast.
- Run `npm run build`.

## Later Phases

Phase 1.5: implemented

- Add a more personable profile header inspired by `https://itzkashan.dev/`, without directly copying its style.
- Include profile picture, full name, role line, compact bio/contact rows with icons, and social links.
- Do not add visual pronunciation text. The user only wants pronunciation if it is audio-based.
- Keep the existing hero/about wording as the core bio:

```text
I build tools that make systems easier to understand.
SRE building practical software for reliability, automation, and everyday workflows.
```

- Add social/action links with icons:
  - GitHub: `https://github.com/znecesito`
  - LinkedIn: `https://www.linkedin.com/in/zackarin-necesito-794203125/`
  - Instagram: `https://www.instagram.com/znecesito/`
  - Resume: `/resume/zackarin-necesito-resume.pdf` after a public-safe resume asset exists
- Omit WhatsApp, pronouns, and website links.
- Project cards should move closer to Kashan's structure:
  - thumbnail preview
  - project name
  - short description
  - technologies used
  - `Open project` link
  - no status label
  - no `View details` link
  - thumbnail should also be clickable and navigate to the project

Phase 1.5 asset names:

- Profile image:
  - place at `public/profile/zackarin-necesito.webp`
  - use this exact filename even if the temporary image changes later
  - prefer square crop, at least 512x512
- Project screenshots:
  - place at `public/projects/ig-wrapped.webp`
  - place at `public/projects/unreciprocated.webp`
  - prefer 16:10 or 4:3 screenshots
  - capture the actual app UI, not only the browser chrome
- Public resume:
  - place at `public/resume/zackarin-necesito-resume.pdf`
  - only after the user confirms the PDF is safe to publish

Phase 1.5 data model changes:

- Extend `src/data/apps.js` with fields like:

```js
thumbnail: "/projects/ig-wrapped.webp",
technologies: ["React", "Vite", "Tailwind", "Client-side parsing"]
```

Phase 2: implemented

- Add GitHub contributions heatmap using the simple dependency `react-github-calendar`.
- Username: `znecesito`.
- Show only recent activity, ideally the last 3 months / last 90 days.
- Preferred implementation: use the package's data transform/filter hook if available so older days are removed before rendering.
- Keep this as a visual section, not a full GitHub analytics dashboard.
- Label idea:

```text
Recent GitHub activity
```

Technical notes:

- This is acceptable as a simple client-side enhancement for this portfolio.
- Do not put a GitHub token in frontend code.
- If `react-github-calendar` cannot reliably filter to the last 3 months, either:
  - render the current year but visually constrain the section, or
  - defer a more robust build-time GitHub GraphQL implementation to a later phase.

Phase 3: implemented

- Add a more polished experience timeline.
- Add project metadata such as stack, year, and links.
- Add real GitHub links per project.
- Add LinkedIn link when available.

Phase 4:

- Create a sanitized public resume PDF.
- Add a `Download resume` link.
- Consider a dedicated `/resume` page if the site grows beyond one page.

Phase 5: implemented early

- Add optional audio pronunciation for the name.
- If audio is not ready, do not add pronunciation UI at all.
- Commit the audio as a local static asset rather than calling a TTS API from the browser.
- Preferred asset path:

`public/audio/zackarin-necesito-pronunciation.mp3`

- The profile header can include a small play button only after this asset exists.

Top free AI voice generator options to try for the pronunciation clip:

1. Free.ai Text to Speech: `https://free.ai/voice/text-to-speech/`
   - Good first choice. Offers free usage, no sign-up for basic generation, MP3/WAV download options, and natural open-source models like Kokoro.
2. TTS.ai: `https://tts.ai/`
   - Good model playground. Offers open-source TTS models, no-account usage for free models, and audio conversion options.
3. SpeechGen: `https://speechgen.io/`
   - Good fallback for realistic voice options. Has a free no-account character allowance and MP3/WAV downloads.

Suggested text prompt:

```text
Zackarin Necesito
```

If the voice mispronounces it, try a phonetic prompt for the audio only:

```text
Zah-KAR-in Neh-seh-SEE-to
```

Do not display the phonetic spelling visually on the site unless the user later asks for it.

Phase 6:

- Add richer project detail pages only if the project list grows enough to justify routing.
- Consider writing/case-study pages for larger projects.

## Notes For Future Agents

- Do not modify sibling projects `../ig-wrapped/` or `../unreciprocated/` unless explicitly asked.
- Keep this project in `hub/`.
- Match the sibling stack only where useful: Vite, React 18, Tailwind v4.
- The visual direction no longer needs to match the Instagram apps.
- Since this repo does not use `@vitejs/plugin-react`, JSX files should import `React` explicitly.
- Phase 1.5 now includes profile, project screenshot, resume, and pronunciation audio assets under `public/`.
