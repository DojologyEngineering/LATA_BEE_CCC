"use client";

import Image from "next/image";
import { ArrowRight, Droplets, Leaf, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/components/layout/language-provider";
import { BentoGrid } from "@/components/sections/bento";
import { customIcons, webIcons } from "@/components/icons/bee-icons";
import { SiteHeader } from "@/components/layout/site-header";

const colors = [
  { name: "Background", token: "background", note: "Page canvas, warm cream" },
  { name: "Card", token: "card", note: "Raised surfaces" },
  { name: "Primary", token: "primary", note: "Honey orange, main actions" },
  { name: "Accent", token: "accent", note: "Honey yellow, highlights" },
  { name: "Leaf", token: "leaf", note: "Nature green, sustainability" },
  { name: "Bark", token: "bark", note: "Bee brown, supporting" },
  { name: "Forest", token: "forest", note: "Deep green section blocks" },
  { name: "Cocoa", token: "cocoa", note: "Dark brown blocks, footer" },
  { name: "Secondary", token: "secondary", note: "Soft honey tint" },
  { name: "Muted", token: "muted", note: "Quiet sections" },
  { name: "Border", token: "border", note: "Dividers and outlines" },
  { name: "Foreground", token: "foreground", note: "Text, warm dark brown" },
];

function Section({ id, title, hint, children }: { id: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t py-12 first:border-t-0">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        {hint && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const { t } = useLanguage();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <header className="mb-4">
          <Badge variant="secondary">Design system · for review</Badge>
          <h1 className="mt-4 text-4xl tracking-tight sm:text-5xl">LATA Bee design system</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Warm, clean and natural. Use the language switch and the sun/moon button in the header to preview Khmer, English, light and dark.
          </p>
        </header>

        <Section id="logo" title="Logo & favicon" hint="Logo is used in the header and as the favicon / Apple touch icon.">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="items-center justify-center py-8">
              <Image src="/brand/logo.png" alt="LATA Bee logo" width={134} height={150} />
            </Card>
            <Card className="items-center justify-center gap-3 py-8">
              <div className="flex items-center gap-2.5">
                <Image src="/brand/logo.png" alt="" width={36} height={40} className="h-10 w-auto" />
                <span className="text-lg font-semibold">{t.brand}</span>
              </div>
              <p className="text-xs text-muted-foreground">Header lockup</p>
            </Card>
            <Card className="items-center justify-center gap-3 py-8">
              <Image src="/brand/logo.png" alt="" width={32} height={36} className="h-9 w-auto" />
              <p className="text-xs text-muted-foreground">Favicon</p>
            </Card>
          </div>
        </Section>

        <Section id="color" title="Colour" hint="Taken from the logo: honey orange, honey yellow, leaf green and bee brown. Tokens switch automatically in dark mode.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {colors.map((c) => (
              <div key={c.token} className="overflow-hidden rounded-xl border bg-card">
                <div className="h-20 border-b" style={{ background: `var(--${c.token})` }} />
                <div className="p-3">
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">--{c.token}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="type" title="Typography" hint="Inconsolata is the primary font for almost everything: headings, body, buttons, nav. Sacramento script is a secondary font, used sparingly as a decorative touch (small eyebrows, a word in a heading). Kantumruy Pro covers Khmer.">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardDescription>English · Inconsolata (primary) + script accent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-script text-6xl" lang="en">Naturally sourced Cambodian honey</p>
                <p className="text-2xl font-semibold" lang="en">Supporting rural beekeepers</p>
                <p className="text-base text-muted-foreground" lang="en">
                  A locally sourced honey solution that supports rural beekeepers, protects bee habitats, and promotes sustainable production.
                </p>
                <p className="font-script text-3xl text-primary" lang="en">A rather useful section</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>ខ្មែរ · Kantumruy Pro</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 leading-loose">
                <p className="text-4xl font-bold" lang="km">រាជនីឃ្មុំ</p>
                <p className="text-2xl font-semibold" lang="km">ដើម្បីសុខភាព និងសម្រស់</p>
                <p className="text-base text-muted-foreground" lang="km">
                  ទឹកឃ្មុំក្នុងស្រុក ផលិតដោយការយកចិត្តទុកដាក់សម្រាប់មនុស្ស និងធម្មជាតិ។
                </p>
                <p className="font-script text-2xl text-primary" lang="km">ផ្នែកដ៏មានប្រយោជន៍</p>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section id="blocks" title="Colour blocks" hint="Clean cream stays the base. Full-width sections alternate between honey yellow, forest green, cocoa brown and soft peach to add rhythm without clutter.">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="dust rounded-3xl bg-honey p-8 text-honey-foreground">
              <p className="font-script text-3xl">Honey yellow</p>
              <h3 className="mt-1 text-3xl">Our honey</h3>
              <p className="mt-3 text-sm opacity-85">Bright, for product highlights and key calls to action.</p>
              <Button className="mt-5 bg-cocoa text-cocoa-foreground hover:bg-cocoa/90" size="lg">{t.cta.shop}</Button>
            </div>
            <div className="honeycomb-light rounded-3xl bg-forest p-8 text-forest-foreground">
              <p className="font-script text-3xl text-accent">Forest green</p>
              <h3 className="mt-1 text-3xl">Step into their world</h3>
              <p className="mt-3 text-sm opacity-85">Calm, for story, sustainability and SDG sections.</p>
              <Button className="mt-5" size="lg">{t.cta.contact}</Button>
            </div>
            <div className="dust rounded-3xl bg-cocoa p-8 text-cocoa-foreground">
              <p className="font-script text-3xl text-accent">Cocoa brown</p>
              <h3 className="mt-1 text-3xl">Beekeepers</h3>
              <p className="mt-3 text-sm opacity-85">Grounded, for footer and contrast bands.</p>
            </div>
            <div className="rounded-3xl bg-secondary p-8">
              <p className="font-script text-3xl text-primary">Soft peach</p>
              <h3 className="mt-1 text-3xl">Products</h3>
              <p className="mt-3 text-sm text-muted-foreground">Gentle, for product cards and forms.</p>
            </div>
          </div>

          <div className="mt-6 grid items-center gap-8 rounded-3xl bg-forest p-6 text-forest-foreground sm:p-10 md:grid-cols-2">
            <div className="relative">
              <div className="flex aspect-[4/5] items-center justify-center rounded-[2rem] bg-forest-foreground/10 text-sm opacity-80">Photo placeholder</div>
              <Image src="/brand/logo.png" alt="" width={90} height={101} className="absolute -right-3 bottom-6 h-24 w-auto drop-shadow-lg sm:-right-6 sm:h-28" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-widest opacity-80">Siem Reap, Cambodia</p>
              <h3 className="mt-2 text-4xl sm:text-5xl">{t.brand}</h3>
              <p className="mt-4 leading-relaxed opacity-90">{t.sample.body}</p>
              <Button className="mt-6 bg-cocoa text-cocoa-foreground hover:bg-cocoa/90" size="lg">{t.cta.contact}</Button>
            </div>
          </div>
        </Section>

        <Section id="icons" title="Icons" hint="Custom honey icons use currentColor, so they recolour per section and in dark mode. Web icons sit in the brand hexagon.">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {customIcons.map(({ label, node }) => (
              <div key={label} className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-4 text-primary">
                {node}
                <span className="text-center text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
          <h3 className="mb-3 mt-8 text-lg">Web icons</h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
            {webIcons.map(({ label, node }) => (
              <div key={label} className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-4">
                {node}
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
          <h3 className="mb-3 mt-8 text-lg">Icon tiles</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["bg-accent text-accent-foreground"],
              ["bg-leaf text-leaf-foreground"],
              ["bg-primary text-primary-foreground"],
            ].map(([tone]) => (
              <div key={tone} className="grid grid-cols-4 gap-2">
                {customIcons.slice(0, 12).map(({ label, node }) => (
                  <div key={label} className={`flex aspect-square items-center justify-center rounded-lg ${tone} [&_svg]:size-8`}>
                    {node}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Section>

        <Section id="bento" title="Bento grid" hint="Mixed-size tiles in the brand colours. 4 columns on desktop, 2 on tablet, stacked on mobile.">
          <BentoGrid headline={t.sample.heading} body={t.sample.body} label={t.about.photo} />
        </Section>

        <Section id="buttons" title="Buttons, badges & inputs" hint="shadcn/ui components themed with the brand tokens.">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button size="lg">{t.cta.shop} <ArrowRight /></Button>
                <Button size="lg" variant="secondary">{t.cta.contact}</Button>
                <Button size="lg" variant="outline">Outline</Button>
                <Button size="lg" variant="ghost">Ghost</Button>
                <Button size="lg" disabled>Disabled</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge>100% Natural</Badge>
                <Badge variant="secondary">Hygiene &amp; Quality</Badge>
                <Badge variant="outline">500 ml</Badge>
                <Badge className="bg-leaf text-leaf-foreground">SDG 15</Badge>
                <Badge className="bg-accent text-accent-foreground">New</Badge>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Form fields</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                <Input placeholder="Name" className="h-10" />
                <Input placeholder="Phone / Telegram" className="h-10" />
                <Textarea placeholder="Message" className="sm:col-span-2" />
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section id="cards" title="Cards & shapes" hint="Honeycomb hexagon is the recurring motif (from the brochure). Clean cream surfaces, soft peach panels, generous spacing.">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Leaf, title: "Sustainably sourced", body: "Harvested with care for bees and forests." },
              { icon: ShieldCheck, title: "Hygiene & quality", body: "Clean handling from hive to jar." },
              { icon: Droplets, title: "100% natural", body: "Raw honey, nothing added." },
            ].map(({ icon: Icon, title, body }) => (
              <Card key={title} className="transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col gap-4">
                  <div className="hex flex size-14 items-center justify-center bg-accent text-accent-foreground">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-lg">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="honeycomb mt-6 overflow-hidden rounded-3xl border bg-secondary px-6 py-12 text-center sm:py-16">
            <p className="font-script text-3xl text-primary">Pure &amp; golden</p>
            <h3 className="mx-auto mt-4 max-w-2xl text-3xl sm:text-5xl">{t.sample.heading}</h3>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t.sample.body}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="lg">{t.cta.shop}</Button>
              <Button size="lg" variant="outline">{t.cta.contact}</Button>
            </div>
          </div>
        </Section>

        <Section id="layout" title="Layout & spacing" hint="Mobile first. Same layout works on iOS and Android browsers.">
          <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <li>Content width: max 1152px, 16px gutters on mobile, 24px from tablet up.</li>
            <li>Section rhythm: 64px mobile, 96px desktop vertical padding.</li>
            <li>Radius: 12px base; cards 16px; hero panels 24px; pills for toggles.</li>
            <li>Touch targets: at least 40px high; sticky header with slide-in menu on mobile.</li>
          </ul>
        </Section>
      </main>
    </>
  );
}
