import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Stat {
  value: number;
  suffix: string;
  label: string;
  detail: string;
}

export default function StatStrip({ stats }: { stats: Stat[] }) {
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
          if (ctx.conditions!.reduceMotion) return;

          gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
            const target = Number(el.dataset.count);
            const counter = { n: 0 };
            gsap.to(counter, {
              n: target,
              duration: 1.6,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              onUpdate: () => {
                el.textContent = String(Math.round(counter.n));
              },
            });
          });
        }
      );
    },
    { scope }
  );

  return (
    <div ref={scope} className="blueprint-dark bg-ink-900 text-paper">
      <div className="mx-auto grid max-w-site grid-cols-2 gap-px lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-paper/[0.08] px-6 py-10 lg:px-8 lg:py-12">
            <p className="font-display text-[2.6rem] font-bold leading-none text-brand-bright lg:text-[3.2rem]">
              {/* min-width reserved so the count-up never shifts layout */}
              <span
                data-count={stat.value}
                className="inline-block text-right [font-variant-numeric:tabular-nums]"
                style={{ minWidth: `${String(stat.value).length}ch` }}
              >
                {stat.value}
              </span>
              <span className="text-paper/90">{stat.suffix}</span>
            </p>
            <p className="mt-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-paper">
              {stat.label}
            </p>
            <p className="mt-1.5 text-[0.85rem] text-paper/55">{stat.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
