"use client";

import { useLanguage } from "@/components/layout/language-provider";
import { ArchPhoto, Container, SectionHead } from "@/components/sections/container";

export function Process() {
  const { t } = useLanguage();
  const p = t.process;

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHead eyebrow={p.eyebrow} title={p.title} body={p.body} />
            <ol className="mt-8 grid gap-5 sm:grid-cols-2">
              {p.steps.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span className="hex flex size-11 shrink-0 items-center justify-center bg-orange text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid grid-cols-2 items-start gap-3 sm:gap-5">
            <ArchPhoto src="/images/lata3.jpg" alt={p.alt[2]} sizes="(min-width: 1024px) 28vw, 45vw" className="aspect-[3/5]" />
            <ArchPhoto src="/images/lata4.jpg" alt={p.alt[3]} sizes="(min-width: 1024px) 28vw, 45vw" className="mt-10 aspect-[3/5] sm:mt-16" />
          </div>
        </div>
      </Container>
    </section>
  );
}
