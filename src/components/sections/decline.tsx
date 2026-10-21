"use client";

import { ArrowRight, Droplets, GraduationCap, Flower2, TreePine } from "lucide-react";
import { useLanguage } from "@/components/layout/language-provider";
import { Container, SectionHead } from "@/components/sections/container";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

// US managed honey bee colony losses (% of colonies lost per year), Bee Informed Partnership annual
// survey as published by USDA ARS and the University of Maryland. Only years with a figure we verified.
const losses = [
  { year: "2010–11", short: "’10–11", value: 36.4 },
  { year: "2011–12", short: "’11–12", value: 28.9 },
  { year: "2012–13", short: "’12–13", value: 45.0 },
  { year: "2013–14", short: "’13–14", value: 34.2 },
  { year: "2014–15", short: "’14–15", value: 42.1 },
  { year: "2015–16", short: "’15–16", value: 40.5 },
  { year: "2016–17", short: "’16–17", value: 33.2 },
  { year: "2018–19", short: "’18–19", value: 40.7 },
  { year: "2020–21", short: "’20–21", value: 45.5 },
];
const MAX = 50;

const sources = [
  { label: "Bee Informed Partnership loss surveys (USDA ARS)", href: "https://www.ars.usda.gov/is/pr/2015/150513.htm" },
  { label: "University of Maryland: 2016–17 loss survey", href: "https://agnr.umd.edu/news/nations-beekeepers-lost-33-percent-bees-2016-17" },
  { label: "University of Maryland: 2018–19 loss survey", href: "https://agnr.umd.edu/news/us-beekeepers-lost-over-40-colonies-during-last-year-annual-survey-showing-winter-losses" },
  { label: "University of Maryland: 2020–21 loss survey", href: "https://agnr.umd.edu/news/us-beekeepers-continue-report-high-colony-loss-rates-no-clear-progression-toward-improvement" },
  { label: "IPBES pollinator assessment", href: "https://ipbes.net/article/press-release-pollinators-vital-our-food-supply-under-threat" },
  { label: "Guerin et al. 2025, Insects: native honeybees in Cambodia", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11766281/" },
  { label: "Mongabay: decline of Cambodia's native bees", href: "https://news.mongabay.com/2025/02/decline-of-cambodias-native-bees-spells-trouble-for-countrys-farming-future/" },
];

const AVG = Math.round((losses.reduce((n, l) => n + l.value, 0) / losses.length) * 10) / 10;
const ticks = [0, 20, 40];

/** Compact cream card that sits on a dark panel. Colours are fixed so it reads the same in light and dark mode. */
function ChartCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-3xl bg-forest-foreground p-5 text-cocoa shadow-xl sm:p-6", className)}>{children}</div>;
}

function LossChart() {
  const { t } = useLanguage();
  const d = t.decline;
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const top = Math.max(...losses.map((l) => l.value));

  return (
    <ChartCard className="w-full max-w-xl">
      <div ref={ref}>
        <h4 className="text-base font-bold leading-snug sm:text-lg">{d.chartTitle}</h4>
        <p className="mt-1 text-xs leading-relaxed text-cocoa/70">{d.chartSub}</p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-cocoa/75">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-orange" /> {d.unit}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 border-t-2 border-dashed border-cocoa/60" /> {d.average} {AVG}%
          </span>
        </div>

        <figure className="mt-5" aria-label={d.chartTitle}>
          <div className="flex gap-2">
            <div className="relative h-36 w-7 shrink-0 text-[10px] text-cocoa/60 sm:h-40" aria-hidden="true">
              {ticks.map((tick) => (
                <span key={tick} className="absolute right-0 translate-y-1/2" style={{ bottom: `${(tick / MAX) * 100}%` }}>
                  {tick}%
                </span>
              ))}
            </div>

            <div className="min-w-0 flex-1">
              <div className="relative h-36 sm:h-40">
                {ticks.map((tick) => (
                  <div key={tick} className="absolute inset-x-0 border-t border-dashed border-cocoa/15" style={{ bottom: `${(tick / MAX) * 100}%` }} />
                ))}
                <div className="absolute inset-x-0 border-t-2 border-dashed border-cocoa/50" style={{ bottom: `${(AVG / MAX) * 100}%` }} aria-hidden="true" />
                <div className="absolute inset-0 flex items-end justify-between gap-1">
                  {losses.map((l, i) => (
                    <div
                      key={l.year}
                      tabIndex={0}
                      role="img"
                      aria-label={`${l.year}: ${l.value.toFixed(1)}%`}
                      className="group relative flex h-full flex-1 flex-col items-center justify-end outline-none"
                    >
                      {l.value === top && <span className="mb-1 text-[10px] font-bold tabular-nums">{l.value.toFixed(1)}%</span>}
                      <div
                        className="w-4 rounded-none bg-orange transition-[height,filter] duration-700 ease-out group-hover:brightness-110 group-focus-visible:brightness-110 sm:w-5"
                        style={{ height: seen ? `${(l.value / MAX) * 100}%` : "0%", transitionDelay: seen ? `${i * 70}ms` : "0ms" }}
                      />
                      <span className="pointer-events-none absolute -top-7 z-10 whitespace-nowrap rounded-md bg-cocoa px-2 py-1 text-[11px] text-cocoa-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        {l.year}: {l.value.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-1.5 flex justify-between gap-1" aria-hidden="true">
                {losses.map((l) => (
                  <span key={l.year} className="flex-1 text-center text-[9px] text-cocoa/60 sm:text-[10px]">
                    {l.short}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </figure>

        <details className="mt-4 text-xs">
          <summary className="cursor-pointer font-medium text-orange">{d.table}</summary>
          <table className="mt-2 w-full max-w-xs text-left">
            <thead>
              <tr className="border-b border-cocoa/15 text-cocoa/60">
                <th className="py-1 font-medium">{d.year}</th>
                <th className="py-1 font-medium">{d.lost}</th>
              </tr>
            </thead>
            <tbody>
              {losses.map((l) => (
                <tr key={l.year} className="border-b border-cocoa/10">
                  <td className="py-1">{l.year}</td>
                  <td className="py-1 tabular-nums">{l.value.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>
    </ChartCard>
  );
}

function NestBars() {
  const { t } = useLanguage();
  const d = t.decline;
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const max = Math.max(...d.nests.map((n) => n.value));
  const fills = ["bg-forest/45", "bg-orange"];

  return (
    <ChartCard className="w-full max-w-xl">
      <div ref={ref}>
        <h4 className="text-base font-bold leading-snug sm:text-lg">{d.nestsTitle}</h4>
        <p className="mt-1 text-xs text-cocoa/70">{d.nestsSub}</p>
        <ul className="mt-4 space-y-3">
          {d.nests.map((n, i) => (
            <li key={n.label}>
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-cocoa/80">{n.label}</span>
                <span className="font-bold tabular-nums">{n.note}</span>
              </div>
              <div className="mt-1 h-2.5 bg-cocoa/10">
                <div
                  className={cn("h-full transition-[width] duration-1000 ease-out", fills[i])}
                  style={{ width: seen ? `${(n.value / max) * 100}%` : "0%", transitionDelay: `${i * 200}ms` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  );
}

const helpIcons = [Droplets, GraduationCap, TreePine, Flower2];

export function Decline() {
  const { t } = useLanguage();
  const d = t.decline;

  return (
    <section id="impact" className="scroll-mt-20 py-12 sm:py-16">
      <Container>
        <SectionHead eyebrow={d.eyebrow} title={d.title} body={d.body} align="center" />

        <div className="dust mt-12 grid items-center gap-8 rounded-3xl bg-cocoa p-6 text-cocoa-foreground sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div>
            <p className="font-script text-4xl text-accent">{d.worldTitle}</p>
            <h3 className="mt-1 max-w-md text-2xl font-bold sm:text-3xl">{d.worldHeading}</h3>
            <ul className="mt-6 grid gap-3">
              {d.stats.map((s, i) => (
                <li
                  key={s.value}
                  className={cn(
                    "lift flex items-center gap-4 rounded-2xl p-3 pr-5",
                    i === 0 ? "bg-accent text-accent-foreground" : "bg-forest-foreground text-cocoa",
                  )}
                >
                  <span className="min-w-[4.5rem] rounded-xl bg-cocoa/10 px-3 py-2 text-center text-2xl font-bold tabular-nums">{s.value}</span>
                  <span className="text-xs leading-snug sm:text-sm">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center lg:justify-end">
            <LossChart />
          </div>
        </div>

        <div className="honeycomb-light mt-4 grid items-center gap-8 rounded-3xl bg-forest p-6 text-forest-foreground sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div>
            <p className="font-script text-4xl text-accent">{d.cambodiaTitle}</p>
            <h3 className="mt-1 max-w-md text-2xl font-bold sm:text-3xl">{d.cambodiaHeading}</h3>
            <p className="mt-3 text-sm leading-relaxed opacity-90 sm:text-base">{d.cambodiaBody}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {d.threats.map((th) => (
                <li key={th} className="lift rounded-full bg-forest-foreground/15 px-3.5 py-1.5 text-xs sm:text-sm">
                  {th}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-2xl border border-accent/50 p-4 text-sm leading-relaxed">
              <span className="font-script text-2xl text-accent">✦ </span>
              {d.hope}
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <NestBars />
          </div>
        </div>

        <div className="mt-14">
          <SectionHead eyebrow={d.helpEyebrow} title={d.helpTitle} align="center" />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.help.map((h, i) => {
              const Icon = helpIcons[i];
              return (
                <li key={h.title} className="lift relative rounded-3xl border bg-card p-6">
                  <span className="hex flex size-14 items-center justify-center bg-orange text-white">
                    <Icon className="size-6" />
                  </span>
                  <h4 className="mt-4 text-lg font-bold">{h.title}</h4>
                  <p className="mt-1.5 text-sm text-muted-foreground">{h.body}</p>
                  {i < d.help.length - 1 && (
                    <ArrowRight className="absolute -right-3.5 top-1/2 hidden size-5 -translate-y-1/2 text-primary lg:block" aria-hidden="true" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <details className="mt-10 text-xs text-muted-foreground">
          <summary className="cursor-pointer font-medium">{d.sources}</summary>
          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer" className="underline underline-offset-4 transition-colors hover:text-primary">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </Container>
    </section>
  );
}
