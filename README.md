# Reliant Development — Marketing Site

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
| `/privacy`     | Privacy policy (counsel review before launch)       |
| `/terms`       | Terms of use (counsel review before launch)         |
| `/thanks`      | Post-submit confirmation (`noindex`)                |

The **Reliant Solar** nav/footer links point to the dev deployment
(`src/data/site.ts` → `solarUrl`). Update when the solar site gets its production domain.

## TODO before launch

1. **Form backend (Resend — code is ready, needs the client's account)** — all
   forms POST to `/api/lead` (`src/pages/api/lead.ts`), which emails the lead
   via Resend and redirects to `/thanks`. To activate:
   1. Create a Resend API key (resend.com → API Keys).
   2. In Vercel → Project → Settings → Environment Variables, set
      `RESEND_API_KEY` (required), and optionally `LEAD_TO_EMAIL` (receiving
      inbox; defaults to the site email) and `LEAD_FROM_EMAIL` (sender on a
      domain verified in Resend). See `.env.example`.
   3. Verify the sending domain in Resend (DNS records). Until then, the
      default `onboarding@resend.dev` sender only delivers to the Resend
      account owner's inbox — fine for testing, not for production.
   Submissions carry a hidden `form-name` (`free-estimate`,
   `commercial-assessment`, `contact`) for routing, plus a honeypot spam trap.
   If delivery fails, the visitor is shown a call-us fallback page — leads are
   never dropped silently.
2. **Photos** — the work gallery (`public/images/projects/`) and the about /
   residential / commercial heroes are real client job-site photos (added
   Sep 2026). Interim stock remains only on the home hero (tower cranes) and
   contact hero (plans desk) — swap when suitable real shots exist. Location
   captions can be added to gallery cards once the client confirms them.
3. **Email address** — `contact@reliant-development.com` in `src/data/site.ts` is a
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
