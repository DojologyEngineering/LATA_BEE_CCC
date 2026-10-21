"use client";

import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useLanguage } from "@/components/layout/language-provider";
import { Container } from "@/components/sections/container";
import { ContactForm } from "@/components/sections/contact-form";
import { contactInfo, telHref } from "@/lib/i18n";

function Row({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 shrink-0 text-primary">{icon}</span>
      <div className="min-w-0">{children}</div>
    </li>
  );
}

const link = "underline decoration-border underline-offset-4 transition-colors hover:text-primary";

export function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const q = encodeURIComponent(contactInfo.mapQuery);

  return (
    <section id="contact" className="scroll-mt-20 py-6 sm:py-12">
      <Container>
        <div className="honeycomb rounded-3xl bg-accent p-4 text-accent-foreground sm:p-8">
          <div className="px-2 pb-6 pt-2 sm:px-0">
            <p className="font-script text-4xl">{c.eyebrow}</p>
            <h2 className="mt-1 text-3xl font-bold sm:text-4xl">{c.title}</h2>
            <p className="mt-3 max-w-xl">{c.body}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div className="rounded-3xl bg-card p-6 text-card-foreground sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-leaf">{c.find}</p>
              <ul className="mt-6 space-y-6">
                <Row icon={<MapPin className="size-6" />}>
                  <p className="text-lg font-bold">{c.visit}</p>
                  <p className="text-muted-foreground">{c.addressValue}</p>
                </Row>
                <Row icon={<Clock className="size-6" />}>
                  <p className="text-muted-foreground">{c.callFirst}</p>
                </Row>
                <Row icon={<Phone className="size-6" />}>
                  <p className="font-bold">
                    <a href={telHref(contactInfo.phone)} className={link}>
                      {contactInfo.phone}
                    </a>
                    <span className="px-1.5 font-normal text-muted-foreground">/</span>
                    <a href={telHref(contactInfo.phoneAlt)} className={link}>
                      {contactInfo.phoneAlt}
                    </a>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <a href={contactInfo.telegram} target="_blank" rel="noreferrer" className={link}>
                      {c.telegram}
                    </a>
                    <span className="px-2">·</span>
                    <a href={contactInfo.facebook} target="_blank" rel="noreferrer" className={link}>
                      {c.facebook}
                    </a>
                  </p>
                </Row>
                <Row icon={<Mail className="size-6" />}>
                  <a href={`mailto:${contactInfo.email}`} className={`${link} break-all`}>
                    {contactInfo.email}
                  </a>
                </Row>
              </ul>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
                target="_blank"
                rel="noreferrer"
                className="press mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 font-semibold text-forest-foreground transition-opacity hover:opacity-90"
              >
                <Navigation className="size-4" /> {c.directions}
              </a>
              <p className="mt-6 text-xs text-muted-foreground">{c.keep}</p>
            </div>

            <div className="min-h-80 overflow-hidden rounded-3xl bg-card lg:min-h-0">
              <iframe
                title={c.mapTitle}
                src={`https://maps.google.com/maps?q=${q}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full min-h-80 border-0"
              />
            </div>
          </div>

          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
