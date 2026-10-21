"use client";

import { HeartPulse, Wind, Zap } from "lucide-react";
import { useLanguage } from "@/components/layout/language-provider";
import { HexBadge } from "@/components/icons/bee-icons";
import { Container, SectionHead } from "@/components/sections/container";

const icons = [Zap, Wind, HeartPulse];
const tones = ["orange", "leaf", "bark"] as const;

export function Benefits() {
  const { t } = useLanguage();
  const b = t.benefits;

  return (
    <section className="py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div>
          <SectionHead eyebrow={b.eyebrow} title={b.title} />
          <ul className="mt-8 space-y-5">
            {b.items.map((item, i) => (
              <li key={item.title} className="lift flex items-start gap-4 rounded-2xl p-3 -m-3">
                <HexBadge icon={icons[i]} tone={tones[i]} className="size-14 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="dust rounded-3xl bg-accent p-6 text-accent-foreground sm:p-8">
          <p className="font-script text-3xl">{b.useTitle}</p>
          <ol className="mt-4 space-y-4">
            {b.use.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-cocoa text-sm font-bold text-cocoa-foreground">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
