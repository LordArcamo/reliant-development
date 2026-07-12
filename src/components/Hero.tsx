import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { site } from '../data/site';

gsap.registerPlugin(useGSAP);

if (import.meta.env.DEV && typeof window !== 'undefined') {
  // Dev-only handle so animations can be inspected/fast-forwarded from the console
  (window as any).gsap = gsap;
}

export default function Hero() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          allowMotion: '(prefers-reduced-motion: no-preference)',
        },
        (ctx) => {
          const { reduceMotion } = ctx.conditions!;
          if (reduceMotion) {
            gsap.set('[data-hero-fade], [data-hero-line], [data-hero-img]', {
              clearProps: 'all',
              opacity: 1,
            });
            return;
          }

          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

          tl.from('[data-hero-line]', {
            yPercent: 110,
            duration: 0.9,
            stagger: 0.12,
          })
            .from(
              '[data-hero-fade]',
              { autoAlpha: 0, y: 20, duration: 0.7, stagger: 0.1 },
              '-=0.45'
            )
            .from(
              '[data-hero-img]',
              { scale: 1.08, duration: 1.4, ease: 'power2.out' },
              '-=0.9'
            );
        }
      );
    },
    { scope }
  );

  return (
    <div ref={scope} className="mx-auto grid max-w-site items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:pb-28 lg:pt-40">
      <div>
        <p data-hero-fade className="eyebrow">
          General Contracting · NJ / NY / PA
        </p>
        <h1 className="display mt-5 text-[clamp(2.6rem,6.5vw,4.6rem)]">
          <span className="block overflow-hidden">
            <span data-hero-line className="block">We don't just build.</span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block text-brand-deep">We overbuild.</span>
          </span>
        </h1>
        <p data-hero-fade className="mt-6 max-w-xl text-[1.1rem] leading-relaxed text-ink-700">
          From residential remodels to commercial fit-outs — planned in writing, built
          by in-house crews, and backed by a 10-year workmanship warranty. The same
          discipline that powers Reliant Solar, applied to everything else worth building.
        </p>
        <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-4">
          <a href="/contact#free-estimate" className="btn-primary">
            Get a free estimate
          </a>
          <a href="/#our-process" className="btn-ghost">
            See our process
          </a>
        </div>
        <p data-hero-fade className="mt-7 font-mono text-[0.78rem] uppercase tracking-[0.16em] text-ink-500">
          Or call now ·{' '}
          <a href={site.phoneHref} className="font-semibold text-ink-900 hover:text-brand-deep">
            {site.phoneDisplay}
          </a>
        </p>
      </div>

      <figure data-hero-fade className="relative hidden lg:block">
        <div className="card-shadow relative overflow-hidden border border-ink-900/10">
          <div className="absolute inset-x-0 top-0 z-10 h-[3px] bg-brand" />
          <img
            data-hero-img
            src="/images/heroes/hero-home.jpg"
            alt="Tower cranes over a commercial structure under construction"
            className="aspect-[4/3] w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <figcaption className="mt-3 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-500">
          <span>Ground-up · Fit-out · Remodel</span>
          <span>NJ · NY · PA</span>
        </figcaption>
      </figure>
    </div>
  );
}
