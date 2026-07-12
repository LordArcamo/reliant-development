# Reliant Construction — Marketing Site

Astro 4 + React islands + Tailwind CSS 3 + GSAP. Sister site to
[Reliant Solar](https://relaint-solar-com.vercel.app/) — shared ink/paper palette and type
family, with the construction division's amber primary.

## Commands

```sh
npm install     # install dependencies
npm run dev     # dev server at localhost:4321
npm run build   # production build to dist/
npm run preview # preview the production build
```

## Pages

| Route          | Purpose                                             |
| -------------- | --------------------------------------------------- |
| `/`            | Home — hero, stats, pillars, services, process, FAQ |
| `/about`       | Story, fact sheet, values                           |
| `/residential` | Residential services + homeowner promise            |
| `/commercial`  | Commercial services + capabilities                  |
| `/contact`     | Channels + lead form                                |
| `/thanks`      | Post-submit confirmation (`noindex`)                |

The **Reliant Solar** nav/footer links point to the dev deployment
(`src/data/site.ts` → `solarUrl`). Update when the solar site gets its production domain.

## TODO before launch

1. **Form backend** — every form posts to `https://formspree.io/f/YOUR_FORM_ID`
   (in `src/components/PageCTA.astro`). Create a Formspree form and replace the ID,
   or swap in a custom endpoint. Forms carry a hidden `form-name` field
   (`free-estimate`, `commercial-assessment`, `contact`) for routing.
2. **Photos** — the "Recent work" section currently uses interim stock photos
   (Unsplash license, commercial use OK, no attribution required) in
   `public/images/projects/`. Replace them with real job-site shots (same
   filenames, or update the list in `src/components/RecentWork.astro`) and
   restore location captions once the photos are genuinely yours.
3. **Email address** — `contact@reliant-construction.com` in `src/data/site.ts` is a
   placeholder; set the real inbox.
4. **Domain** — set the production URL in `astro.config.mjs` (`site`) and
   `src/data/site.ts` (`url`), then update `public/robots.txt`.
5. **OG image** — add a branded 1200×630 default and wire it in `src/components/SEO.astro`.
6. Verify Google Business Profile + Search Console, submit `/sitemap.xml`.

## Design system

- Tokens in `src/styles/global.css`. Industrial-dark theme: token roles are
  semantic — `--ink-*` is the light foreground scale, `--paper`/`--paper-soft`
  are dark surfaces (#1b1b19 page / #232321 cards), `--band` (#131312) is the
  deepest section background, `--brand` amber is tuned for dark, and `--solar`
  cyan is reserved strictly for links to the Reliant Solar site.
- Logo: the shared Reliant mark (`public/images/logo-mark.webp`, same asset as
  Reliant Solar) recolored to division amber via the `.logo-mask` CSS mask;
  static amber versions in `public/images/logo-mark-amber.png` + favicons.
- Type: Bricolage Grotesque (display) · Geist (body) · JetBrains Mono (spec labels).
- Motif: "blueprint & steel", professional register — faint drafting grids,
  dimension lines, mono spec tags, soft elevation (`.card-shadow`) and subtle
  card hovers (`.card-hover`). No hard offset shadows or stripe patterns.
- Motion: GSAP hero timeline + ScrollTrigger count-ups (React islands in
  `Hero.tsx` / `StatStrip.tsx`); site-wide IntersectionObserver fade-up in
  `src/layouts/Base.astro`. Everything respects `prefers-reduced-motion`.
