"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/layout/language-provider";
import { HoneycombIcon, HoneyStickIcon, JarIcon } from "@/components/icons/bee-icons";
import { Container, PhotoSlot, SectionHead } from "@/components/sections/container";
import { contactInfo, telHref } from "@/lib/i18n";

const icons = [JarIcon, HoneycombIcon, HoneyStickIcon];
const tints = ["bg-accent/40", "bg-leaf/20", "bg-primary/15"];

export function Products() {
  const { t } = useLanguage();
  const p = t.products;

  return (
    <section id="products" className="scroll-mt-20 py-6 sm:py-12">
      <Container>
        <div className="dust rounded-3xl bg-secondary p-6 sm:p-10">
          <SectionHead eyebrow={p.eyebrow} title={p.title} body={p.body} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {p.items.map((item, i) => {
              const Icon = icons[i];
              return (
                <article key={item.name} className="lift flex flex-col overflow-hidden rounded-3xl bg-card shadow-sm">
                  <PhotoSlot label={p.photo} className={`relative aspect-[4/3] ${tints[i]} text-foreground/60`} />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3">
                      <span className="hex flex size-11 shrink-0 items-center justify-center bg-accent text-accent-foreground">
                        <Icon className="size-6" />
                      </span>
                      <h3 className="text-xl font-bold">{item.name}</h3>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
                      <span className="text-muted-foreground">{p.size}</span>
                      <span className="font-bold">{item.price || p.askPrice}</span>
                    </div>
                    <Button className="mt-4" render={<a href={telHref(contactInfo.phone)} />} nativeButton={false}>
                      {p.order}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">{p.note}</p>
        </div>
      </Container>
    </section>
  );
}
