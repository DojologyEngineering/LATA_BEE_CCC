"use client";

import { locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/layout/language-provider";

export function LanguageSwitch() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div role="group" aria-label={t.language} className="inline-flex rounded-full border bg-card p-0.5">
      {locales.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLocale(l.code)}
          aria-pressed={locale === l.code}
          className={cn(
            "press rounded-full px-3 py-1 text-xs font-medium transition-colors",
            locale === l.code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}
