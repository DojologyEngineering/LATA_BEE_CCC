"use client";

import { useLanguage } from "@/components/layout/language-provider";
import { HoneycombIcon } from "@/components/icons/bee-icons";

export function Ticker() {
  const { t } = useLanguage();
  const items = [...t.ticker, ...t.ticker];

  return (
    <div className="overflow-hidden dust bg-cocoa py-3 text-white" aria-hidden="true">
      <div className="ticker flex w-max items-center gap-8 whitespace-nowrap text-lg font-semibold">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            {item}
            <HoneycombIcon variant="single" className="size-4 text-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
