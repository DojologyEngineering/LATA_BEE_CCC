"use client";

import Image from "next/image";
import { useLanguage } from "@/components/layout/language-provider";
import { Container, SectionHead } from "@/components/sections/container";
import { useTeamOpen } from "@/lib/team-visibility";
import { cn } from "@/lib/utils";

type Key = "narith" | "koucheata" | "channy" | "kanthean" | "sengon" | "kimsreu";

function Person({ id, size = "md" }: { id: Key; size?: "md" | "lg" }) {
  const { t } = useLanguage();
  const p = t.team.people[id];

  return (
    <figure className="group lift flex min-w-0 flex-col items-center rounded-2xl p-2 text-center">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-muted ring-4 ring-secondary",
          size === "lg" ? "aspect-[3/4] w-40 sm:w-48" : "aspect-[3/4] w-28 sm:w-32",
        )}
      >
        <Image src={`/images/team/${id}.jpg`} alt={p.name} fill sizes="200px" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
      </div>
      <figcaption className="mt-3">
        <p className={cn("font-bold", size === "lg" && "text-lg")}>{p.name}</p>
        <p className="mx-auto max-w-[10rem] text-sm text-muted-foreground">{p.role}</p>
      </figcaption>
    </figure>
  );
}

function Branch({ label, cols, children }: { label: string; cols: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border bg-card p-6 sm:p-8">
      <p className="text-center font-script text-3xl text-primary">{label}</p>
      <div className={cn("mt-5 grid items-start gap-x-4 gap-y-8", cols)}>{children}</div>
    </div>
  );
}

export function Team() {
  const { t } = useLanguage();
  const m = t.team;
  const open = useTeamOpen();

  if (!open) return null;

  return (
    <section id="team" className="scroll-mt-20 py-12 sm:py-16">
      <Container>
        <SectionHead eyebrow={m.eyebrow} title={m.title} body={m.body} align="center" />

        <div className="mt-10 flex justify-center">
          <Person id="narith" size="lg" />
        </div>
        <div className="mx-auto h-8 w-px bg-border" aria-hidden="true" />

        <div className="grid gap-5 lg:grid-cols-2">
          <Branch label={m.sales} cols="grid-cols-2">
            <Person id="koucheata" />
            <Person id="channy" />
          </Branch>
          <Branch label={m.farm} cols="grid-cols-2 sm:grid-cols-3">
            <Person id="kanthean" />
            <Person id="sengon" />
            <Person id="kimsreu" />
          </Branch>
        </div>
      </Container>
    </section>
  );
}
