"use client";

import Image from "next/image";
import { useLanguage } from "@/components/layout/language-provider";
import { Container } from "@/components/sections/container";

const sdgImages: Record<string, { src: string; w: number; h: number }> = {
  "8": { src: "/images/sdg-8.png", w: 554, h: 554 },
  "12": { src: "/images/sdg-12.png", w: 296, h: 296 },
  "15": { src: "/images/sdg-15.png", w: 554, h: 554 },
};

export function Impact() {
  const { t } = useLanguage();
  const i = t.impact;

  return (
    <section className="py-6 sm:py-12">
      <Container>
        <div className="dust rounded-3xl bg-cocoa p-6 text-cocoa-foreground sm:p-10">
          <p className="font-script text-4xl text-accent">{i.eyebrow}</p>
          <h2 className="mt-1 max-w-2xl text-3xl font-bold sm:text-4xl">{i.title}</h2>
          <div className="mt-6 grid gap-6 text-sm leading-relaxed opacity-90 md:grid-cols-2 md:gap-10">
            <p>{i.problem}</p>
            <p>{i.solution}</p>
          </div>
          <h3 className="mt-10 text-sm font-bold uppercase tracking-widest text-accent">{i.sdgTitle}</h3>
          <div className="mt-4 flex flex-wrap items-end gap-3 sm:gap-4">
            {i.sdgs.map((s) => {
              const img = sdgImages[s.n];
              return (
                <Image
                  key={s.n}
                  src={img.src}
                  alt={`SDG ${s.n}: ${s.label}`}
                  width={img.w}
                  height={img.h}
                  sizes="(min-width: 640px) 200px, 30vw"
                  className="lift h-auto w-[30%] max-w-[200px] rounded-xl shadow-md sm:w-48"
                  style={{ aspectRatio: `${img.w} / ${img.h}` }}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
