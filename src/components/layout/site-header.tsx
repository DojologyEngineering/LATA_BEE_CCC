"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/components/layout/language-provider";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useActiveSection } from "@/lib/use-active-section";
import { onNavClick } from "@/lib/team-visibility";
import { cn } from "@/lib/utils";

const links = ["home", "about", "products", "impact", "team", "contact"] as const;

/** `overlay`: transparent over a full-bleed hero until the page is scrolled. */
export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(links);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const clear = overlay && !scrolled;

  return (
    <header
      className={cn(
        "top-0 z-40 w-full transition-colors",
        overlay ? "fixed" : "sticky",
        clear ? "border-b border-transparent text-white" : "border-b bg-background/85 backdrop-blur",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="press flex items-center gap-2.5">
          <Image src="/brand/logo.png" alt="" width={36} height={40} priority className="h-10 w-auto" />
          <span className="text-lg font-semibold tracking-tight">{t.brand}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              onClick={onNavClick(key)}
              aria-current={active === key ? "location" : undefined}
              className={cn(
                "relative py-1 text-sm font-medium transition-colors",
                "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:transition-transform after:duration-300 after:ease-out",
                clear ? "after:bg-accent" : "after:bg-primary",
                active === key
                  ? clear
                    ? "text-white after:scale-x-100"
                    : "text-foreground after:scale-x-100"
                  : clear
                    ? "text-white/80 after:scale-x-0 hover:text-white hover:after:scale-x-100"
                    : "text-muted-foreground after:scale-x-0 hover:text-foreground hover:after:scale-x-100",
              )}
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSwitch />
          <ThemeToggle className={clear ? "text-white hover:bg-white/15 hover:text-white" : undefined} />
          <Sheet>
            <SheetTrigger
              aria-label={t.menu}
              className={cn(
                "press inline-flex size-9 items-center justify-center rounded-lg hover:bg-muted md:hidden",
                clear && "text-white hover:bg-white/15",
              )}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">{t.menu}</SheetTitle>
              <nav className="mt-10 flex flex-col gap-1 px-4">
                {links.map((key) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    onClick={onNavClick(key)}
                    aria-current={active === key ? "location" : undefined}
                    className={cn(
                      "press rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-muted",
                      active === key && "bg-secondary text-primary",
                    )}
                  >
                    {t.nav[key]}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
