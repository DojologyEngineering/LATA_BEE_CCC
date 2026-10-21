"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/components/layout/language-provider";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error" | "invalid";

const purposeKeys = ["order", "price", "visit", "partner", "other"] as const;

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

export function ContactForm() {
  const { t, locale } = useLanguage();
  const f = t.contact.form;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus(res.status === 400 ? "invalid" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  const field = "h-11 bg-background";

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-card p-6 text-card-foreground sm:p-8" noValidate={false}>
      <h3 className="text-2xl font-bold">{f.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label={f.name} htmlFor="cf-name">
          <Input id="cf-name" name="name" required minLength={2} maxLength={80} autoComplete="name" className={field} />
        </Field>
        <Field label={f.phone} htmlFor="cf-phone">
          <Input id="cf-phone" name="phone" type="tel" required inputMode="tel" autoComplete="tel" maxLength={25} className={field} />
        </Field>
        <Field label={f.email} htmlFor="cf-email">
          <Input id="cf-email" name="email" type="email" required maxLength={120} autoComplete="email" className={field} />
        </Field>
        <Field label={f.purpose} htmlFor="cf-purpose">
          <select
            id="cf-purpose"
            name="purpose"
            required
            defaultValue=""
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="" disabled>
              {f.purposePlaceholder}
            </option>
            {purposeKeys.map((k) => (
              <option key={k} value={k}>
                {f.purposes[k]}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label={f.message} htmlFor="cf-message">
            <Textarea id="cf-message" name="message" rows={4} maxLength={1000} className="bg-background" />
          </Field>
        </div>
        {/* Honeypot for bots; hidden from people and screen readers. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" className="h-11 px-6 text-base" disabled={status === "sending"}>
          <Send /> {status === "sending" ? f.sending : f.send}
        </Button>
        <p
          role="status"
          className={cn("text-sm", status === "success" ? "text-leaf" : "text-destructive", status === "idle" || status === "sending" ? "hidden" : "")}
        >
          {status === "success" ? f.success : status === "invalid" ? f.invalid : f.error}
        </p>
      </div>
    </form>
  );
}
