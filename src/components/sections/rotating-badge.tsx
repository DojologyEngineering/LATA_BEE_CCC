"use client";

import { useId } from "react";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";

/** Clean line icon: a leaf with a honey drop, for "sustainable". */
function LeafDropIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M24 42C10 36 7 18 24 6c17 12 14 30 0 36z" />
      <path d="M24 42V22" />
      <path d="M24 33l-6-5M24 28l5-4" />
      <path d="M24 12c-2 2.600-3 4.2-3 5.800a3 3 0 006 0c0-1.600-1-3.200-3-5.800z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Round badge with text running around a circle. Position it half over an image. */
export function RotatingBadge({ className }: { className?: string }) {
  const { t, locale } = useLanguage();
  const id = useId();
  const pathId = `badge-path-${id.replace(/:/g, "")}`;
  const r = 78;
  // Khmer text can't take letter-spacing without breaking its shaping.
  const text = locale === "km" ? t.badge.repeat(2) : t.badge.toUpperCase();

  return (
    <div className={cn("relative aspect-square rounded-full bg-forest-foreground text-forest shadow-xl", className)} role="img" aria-label={t.badge}>
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <path id={pathId} d={`M100 100m-${r} 0a${r} ${r} 0 1 1 ${2 * r} 0a${r} ${r} 0 1 1 -${2 * r} 0`} />
        </defs>
        <text fill="currentColor" fontSize={locale === "km" ? 15 : 13} fontWeight="600" {...(locale === "km" ? {} : { letterSpacing: "2.2" })}>
          <textPath href={`#${pathId}`} {...(locale === "km" ? {} : { textLength: String(2 * Math.PI * r - 4), lengthAdjust: "spacing" })}>
            {text}
          </textPath>
        </text>
      </svg>
      <LeafDropIcon className="absolute left-1/2 top-1/2 size-[34%] -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
