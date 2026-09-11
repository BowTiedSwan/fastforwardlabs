"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackFormStart, trackInquirySubmit } from "@/lib/analytics";
import { inquiryOptions, type InquiryFields } from "@/lib/inquiry-options";

type FormSession = { token: string; loadedAt: number };

async function loadSession(): Promise<FormSession> {
  const response = await fetch("/api/inquiries", { cache: "no-store" });
  const result = await response.json();
  if (!response.ok || typeof result.token !== "string") throw new Error("Session unavailable");
  return { token: result.token, loadedAt: Date.now() };
}

export function InquiryForm({ initialService }: { initialService: string }) {
  const [session, setSession] = useState<FormSession | null>(null);
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Partial<Record<InquiryFields, string>>>({});
  const statusRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    let active = true;
    loadSession().then((value) => { if (active) setSession(value); }).catch(() => {
      if (active) setError("The form couldn’t connect. You can try again when you send your inquiry.");
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (sent) statusRef.current?.focus();
  }, [sent]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setPending(true);
    setError("");
    setErrors({});
    try {
      const current = !session || Date.now() - session.loadedAt > 55 * 60 * 1000 ? await loadSession() : session;
      setSession(current);
      // Autofill remains usable while the server rejects instant bot posts.
      const delay = 2200 - (Date.now() - current.loadedAt);
      if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, token: current.token }),
      });
      if (response.status === 429) {
        setError("You’ve sent several requests recently. Please wait 10 minutes before trying again.");
        return;
      }
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.error || "We couldn’t send your inquiry. Please try again.");
        if (result.errors) {
          setErrors(result.errors);
          const field = form.elements.namedItem(Object.keys(result.errors)[0]);
          if (field instanceof HTMLElement) field.focus();
        }
        if (result.refreshToken) setSession(await loadSession());
        return;
      }
      setSent(true);
      const service = typeof values.service === "string" ? values.service : "general";
      trackInquirySubmit(service);
    } catch {
      setError("We couldn’t connect to send your inquiry. Your message is still here; please try again.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return <div ref={statusRef} tabIndex={-1} role="status" className="border border-line bg-panel p-8 sm:p-10"><Check aria-hidden="true" className="mb-6 size-8 text-accent" /><h2 className="text-3xl font-medium tracking-[-0.04em]">Your inquiry is on its way.</h2><p className="mt-4 text-base leading-7 text-muted">Thanks for telling us about your project. We’ll review it and reply to the email address you provided to discuss the next step.</p></div>;
  }

  const errorFor = (name: InquiryFields) => errors[name] ? <p id={`${name}-error`} className="mt-2 text-sm text-red-800">{errors[name]}</p> : null;

  return (
    <form onSubmit={submit} onFocusCapture={() => { if (startedRef.current) return; startedRef.current = true; trackFormStart(); }} className="relative space-y-6 border border-line bg-panel p-6 sm:p-9" aria-label="Service inquiry" aria-busy={pending}>
      <div><label htmlFor="name" className="form-label">Your name</label><input className="form-input" id="name" name="name" autoComplete="name" required maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errorFor("name")}</div>
      <div><label htmlFor="email" className="form-label">Your email</label><input className="form-input" id="email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{errorFor("email")}</div>
      <div><label htmlFor="company" className="form-label">Company <span className="font-normal text-muted">(optional)</span></label><input className="form-input" id="company" name="company" autoComplete="organization" maxLength={150} aria-invalid={!!errors.company} aria-describedby={errors.company ? "company-error" : undefined} />{errorFor("company")}</div>
      <div><label htmlFor="service" className="form-label">What can we help with?</label><select className="form-input" id="service" name="service" defaultValue={initialService} aria-invalid={!!errors.service} aria-describedby={errors.service ? "service-error" : undefined}>{inquiryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{errorFor("service")}</div>
      <div><label htmlFor="message" className="form-label">Tell us about the work you want to improve</label><p id="message-hint" className="mb-3 text-sm leading-6 text-muted">A few sentences about the process, project, or team is enough to start.</p><textarea className="form-input min-h-36 resize-y" id="message" name="message" required minLength={10} maxLength={5000} rows={5} aria-invalid={!!errors.message} aria-describedby={`message-hint${errors.message ? " message-error" : ""}`} />{errorFor("message")}</div>
      <div className="form-honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" type="text" /></div>
      {error ? <p role="alert" className="border-l-2 border-red-700 pl-4 text-sm leading-6 text-red-800">{error}</p> : null}
      <Button disabled={pending} type="submit" size="lg" className="w-full sm:w-auto">{pending ? "Sending inquiry…" : "Send your inquiry"}<ArrowUpRight aria-hidden="true" className="size-4" /></Button>
      <p className="text-xs leading-6 text-muted">We’ll use these details to respond to your inquiry.</p>
    </form>
  );
}
