"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/layout/language-provider";
import { HexBadge, HoneycombIcon } from "@/components/icons/bee-icons";
import { Container } from "@/components/sections/container";

export function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section id="home" className="relative isolate flex min-h-svh scroll-mt-20 flex-col overflow-hidden bg-cocoa text-white">
      <video
        className="absolute inset-0 -z-20 size-full object-cover"
        src="/video-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-poster.webp"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/30 to-black/60" />

      <Container className="flex flex-1 flex-col items-center justify-center pb-16 pt-28 text-center">
        <p className="font-script text-4xl text-accent sm:text-5xl">{h.eyebrow}</p>
        <h1 className="mt-2 max-w-4xl text-4xl font-bold leading-tight drop-shadow sm:text-6xl lg:text-7xl">{h.title}</h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">{h.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="h-12 bg-cocoa px-7 text-base text-cocoa-foreground hover:bg-cocoa/90" render={<a href="#about" />} nativeButton={false}>
            {t.nav.about}
          </Button>
          <Button size="lg" className="h-12 px-7 text-base" render={<a href="#products" />} nativeButton={false}>
            {t.cta.shop} <ArrowRight />
          </Button>
        </div>

        <div className="mt-12 grid w-full max-w-3xl gap-6 text-left sm:grid-cols-2">
          <div className="flex items-center gap-4">
            <HexBadge tone="honey" className="size-14 shrink-0">
              <HoneycombIcon variant="solid" className="size-7" />
            </HexBadge>
            <div>
              <p className="font-semibold">{h.trust1Title}</p>
              <p className="text-sm text-white/80">{h.trust1Body}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <HexBadge tone="leaf" className="size-14 shrink-0">
              <HoneycombIcon variant="outline" className="size-7" />
            </HexBadge>
            <div>
              <p className="font-semibold">{h.trust2Title}</p>
              <p className="text-sm text-white/80">{h.trust2Body}</p>
            </div>
          </div>
        </div>
      </Container>

    </section>
  );
}
