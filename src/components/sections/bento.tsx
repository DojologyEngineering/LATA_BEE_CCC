"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/layout/language-provider";
import { BeeInIcon, FlowerIcon, HiveIcon, HoneyDropIcon, HoneycombIcon, JarIcon } from "@/components/icons/bee-icons";
import { Container, SectionHead } from "@/components/sections/container";
import { cn } from "@/lib/utils";

function Tile({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("dust lift relative overflow-hidden rounded-3xl p-6 sm:p-8", className)}>{children}</div>;
}

export function BentoGrid({ headline, body, label }: { headline: string; body: string; label: string }) {
  const { t } = useLanguage();
  const b = t.bento;

  return (
    <div className="grid auto-rows-[minmax(11rem,auto)] gap-4 sm:grid-cols-2 md:grid-cols-4">
      <Tile className="honeycomb-light flex flex-col justify-between bg-forest text-forest-foreground sm:col-span-2 md:row-span-2">
        <div>
          <p className="font-script text-3xl text-accent">{b.eyebrow}</p>
          <h3 className="mt-2 max-w-md text-3xl font-bold sm:text-4xl">{headline}</h3>
          <p className="mt-4 max-w-md leading-relaxed opacity-90">{body}</p>
        </div>
        <a
          href="#products"
          className="press mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
        >
          {t.cta.learn} <ArrowUpRight className="size-4" />
        </a>
      </Tile>

      <Tile className="flex min-h-80 items-end bg-muted p-0 sm:p-0 md:row-span-2">
        <Image src="/images/lata2.jpg" alt={label} fill sizes="(min-width: 768px) 25vw, 90vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 via-transparent to-transparent" />
        <Image src="/brand/logo.png" alt="" width={72} height={81} className="relative m-5 h-20 w-auto drop-shadow-lg" />
      </Tile>

      <Tile className="flex flex-col justify-between bg-accent text-accent-foreground">
        <HoneycombIcon className="size-12" />
        <div>
          <p className="text-5xl font-bold">80+</p>
          <p className="text-sm font-medium">{b.stat1}</p>
        </div>
      </Tile>

      <Tile className="flex flex-col justify-between bg-cocoa text-cocoa-foreground">
        <JarIcon className="size-12 text-accent" level={0.75} />
        <div>
          <p className="text-2xl font-bold">{b.stat2Title}</p>
          <p className="text-sm opacity-80">{b.stat2Body}</p>
        </div>
      </Tile>

      <Tile className="flex flex-col justify-between bg-secondary sm:col-span-2">
        <div className="flex items-start justify-between">
          <Badge className="bg-leaf text-leaf-foreground">{b.qualityBadge}</Badge>
          <HoneyDropIcon className="size-12 text-primary" />
        </div>
        <div>
          <p className="font-script text-3xl text-primary">{b.qualityScript}</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">{b.qualityBody}</p>
        </div>
      </Tile>

      <Tile className="flex flex-col items-start justify-between border bg-card">
        <HiveIcon className="size-12 text-primary" />
        <p className="font-semibold">{b.home}</p>
      </Tile>

      <Tile className="flex flex-col items-start justify-between border bg-card">
        <FlowerIcon className="size-12 text-leaf" />
        <p className="font-semibold">{b.flowers}</p>
      </Tile>

      <Tile className="flex items-center gap-4 border bg-card sm:col-span-2">
        <BeeInIcon className="size-14 shrink-0 text-primary" />
        <div>
          <p className="font-semibold">{b.habitat}</p>
          <p className="text-sm text-muted-foreground">{b.habitatBody}</p>
        </div>
      </Tile>

      <Tile className="flex items-center justify-between gap-4 bg-primary text-primary-foreground sm:col-span-2">
        <div>
          <p className="font-script text-3xl">{b.jars}</p>
          <p className="mt-1 text-sm opacity-90">{b.jarsBody}</p>
        </div>
        <div className="flex shrink-0 gap-1">
          <JarIcon level={1} className="size-10" />
          <JarIcon level={0.5} className="size-10" />
          <JarIcon level={0} className="size-10" />
        </div>
      </Tile>
    </div>
  );
}

export function WhySection() {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHead eyebrow={t.bento.eyebrow} title={t.bento.title} className="mb-8" />
        <BentoGrid headline={t.sample.heading} body={t.sample.body} label={t.process.alt[1]} />
      </Container>
    </section>
  );
}
