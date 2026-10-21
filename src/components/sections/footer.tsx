"use client";

import Image from "next/image";
import { ArrowUp, Mail, MapPin, Phone, Send } from "lucide-react";
import { useLanguage } from "@/components/layout/language-provider";
import { FacebookGlyph } from "@/components/icons/bee-icons";
import { Container } from "@/components/sections/container";
import { contactInfo, telHref } from "@/lib/i18n";
import { onNavClick } from "@/lib/team-visibility";

const links = ["home", "about", "products", "impact", "team", "contact"] as const;

const hover = "transition-colors hover:text-accent";

export function SiteFooter() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="honeycomb-light relative mt-16 overflow-hidden rounded-t-[2.5rem] bg-cocoa text-cocoa-foreground">
      {/* Oversized wordmark as a quiet decorative layer */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center text-[22vw] font-bold leading-none tracking-tighter text-white/[0.04] sm:text-[16vw]"
      >
        {t.brand}
      </p>

      <Container className="relative pb-8 pt-14 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/brand/logo.png" alt="" width={56} height={63} className="h-16 w-auto" />
              <div>
                <p className="text-xl font-bold">{t.brand}</p>
                <p className="text-sm opacity-70">{t.tagline}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed opacity-80">{f.about}</p>
            <p className="mt-4 font-script text-3xl text-accent">{t.hero.eyebrow}</p>
          </div>

          <nav aria-label={f.explore}>
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent">{f.explore}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {links.map((k) => (
                <li key={k}>
                  <a href={`#${k}`} onClick={onNavClick(k)} className={`opacity-85 ${hover}`}>
                    {t.nav[k]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent">{f.reach}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  <a href={telHref(contactInfo.phone)} className={hover}>
                    {contactInfo.phone}
                  </a>
                  <span className="px-1.5 opacity-50">/</span>
                  <a href={telHref(contactInfo.phoneAlt)} className={hover}>
                    {contactInfo.phoneAlt}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
                <a href={`mailto:${contactInfo.email}`} className={`break-all ${hover}`}>
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                <span className="opacity-85">{t.contact.addressValue}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent">{f.follow}</h3>
            <div className="mt-4 flex items-center gap-3">
              <a href={contactInfo.facebook} target="_blank" rel="noreferrer" aria-label={t.contact.facebook} className="press flex size-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-accent-foreground">
                <FacebookGlyph className="size-5" />
              </a>
              <a href={contactInfo.telegram} target="_blank" rel="noreferrer" aria-label={t.contact.telegram} className="press flex size-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-accent-foreground">
                <Send className="size-5" />
              </a>
            </div>
            <a
              href="#home"
              className="press mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm transition-colors hover:bg-white/10"
            >
              <ArrowUp className="size-4" /> {f.top}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/15 pt-6 text-xs opacity-70 sm:flex-row">
          <p>
            © 2026 {t.brand}. {f.rights}
          </p>
          <p>
            {f.powered}{" "}
            <a
              href="https://techstudio.dojology.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Dojology Tech Studio
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
