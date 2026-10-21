"use client";

import { Eye, Target } from "lucide-react";
import { useLanguage } from "@/components/layout/language-provider";
import { RotatingBadge } from "@/components/sections/rotating-badge";
import { ArchPhoto, Container } from "@/components/sections/container";

export function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className="scroll-mt-20 py-6 sm:py-12">
      <Container>
        <div className="honeycomb-light grid items-center gap-8 rounded-3xl bg-forest p-6 text-forest-foreground sm:p-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <ArchPhoto src="/images/lata1.jpg" alt={t.process.alt[0]} className="aspect-[4/5] w-full" />
            <RotatingBadge className="absolute -bottom-8 right-3 size-32 sm:size-36 lg:-right-14 lg:bottom-20 lg:size-44" />
          </div>
          <div>
            <p className="font-script text-4xl text-accent">{a.eyebrow}</p>
            <h2 className="mt-1 text-3xl font-bold sm:text-4xl">{a.title}</h2>
            <div className="mt-4 space-y-3 leading-relaxed opacity-90">
              {a.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Eye, title: a.visionTitle, body: a.vision },
                { icon: Target, title: a.missionTitle, body: a.mission },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl bg-forest-foreground/10 p-4">
                  <Icon className="size-5 text-accent" />
                  <h3 className="mt-2 font-bold">{title}</h3>
                  <p className="mt-1 text-sm opacity-90">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
