"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { company } from "@/data/company";
import { emptyDraft, type InquiryType } from "@/data/rfq";

const types: { value: InquiryType; label: string }[] = [
  { value: "Bulk Quote", label: "Bulk Quote" },
  { value: "Sample Box", label: "Sample Box ($39)" },
  { value: "OEM Project", label: "OEM/Custom Project" },
];
const initial = { inquiryType: "Bulk Quote" as InquiryType, contactName: "", email: "", notes: "", website: "" };

export default function QuickInquiry() {
  const [draft, setDraft] = useState(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);
  const submissionRef = useRef<{ id: string; fingerprint: string } | null>(null);
  const resetFocusRef = useRef(false);
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "idle" && resetFocusRef.current) {
      resetFocusRef.current = false;
      nameRef.current?.focus();
    }
  }, [status]);

  function update<K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setStatus("idle");
    setMessage("");
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;
    if (!draft.contactName.trim() || !draft.notes.trim()) {
      setStatus("error");
      setMessage("Please enter your contact name and project notes.");
      return;
    }
    const payload = { ...emptyDraft(), ...draft, noPostalCode: true, source: "quick" };
    const fingerprint = JSON.stringify(payload);
    if (submissionRef.current?.fingerprint !== fingerprint) submissionRef.current = { fingerprint, id: crypto.randomUUID() };
    sendingRef.current = true;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/rfq", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, submissionId: submissionRef.current.id }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.accepted !== true) throw new Error(result.error ?? "We could not confirm your inquiry. Please retry with the same details.");
      setStatus("success");
      setDraft(initial);
      submissionRef.current = null;
      // 成功面板挂载后由 effect 聚焦，避免异步提交与 DOM 更新竞争。
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error && !["TimeoutError", "AbortError"].includes(error.name)
        ? error.message : "The request timed out. Your draft is safe; please retry with the same details.");
    } finally { sendingRef.current = false; }
  }

  return (
    <section id="contact" className="section-space bg-glintic-linen">
      <div className="studio-container grid lg:grid-cols-12 items-start gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="overline text-glintic-sage-dark mb-5">Your brief, beautifully simple</p>
          <h2 className="section-title">A few details.<br />A considered next step.</h2>
          <p className="lead text-glintic-slate mt-6">Samples, a studio refresh or your own private-label collection. Tell us what you have in mind — no long product checklist required.</p>
          <p className="text-sm text-glintic-muted mt-5">Share a G-series reference, quantity, branding idea and destination in your notes. Our team will confirm the details before quoting.</p>
          {company.email && <a href={`mailto:${company.email}`} className="link-underline text-sm mt-5">{company.email}</a>}
        </div>
        <div className="lg:col-span-7 quick-inquiry-panel">
          {status === "success" ? (
            <div ref={successRef} role="status" tabIndex={-1} className="py-5">
              <h3 className="font-serif text-4xl">Thank you!</h3>
              <p className="mt-5">Our sourcing team aims to reply within 12 business hours.*</p>
              <p className="text-xs text-glintic-muted mt-3">*Target response time, not a contractual SLA. Your inquiry was accepted by the email service; it is not an order confirmation.</p>
              <button type="button" className="btn btn-primary mt-7" onClick={() => { resetFocusRef.current = true; setStatus("idle"); }}>Send another inquiry</button>
            </div>
          ) : (
            <form id="quick-inquiry-form" onSubmit={submit} className="space-y-5">
              <p className="text-xs text-glintic-muted">Four essentials to start. * Required fields.</p>
              <fieldset disabled={status === "sending"} className="space-y-5 disabled:opacity-70">
                <fieldset>
                  <legend className="field mb-3">Inquiry Type *</legend>
                  <div className="flex flex-wrap gap-2">{types.map((type) => (
                    <label className="segmented-pill" key={type.value}>
                      <input type="radio" name="inquiryType" value={type.value} required checked={draft.inquiryType === type.value} onChange={() => update("inquiryType", type.value)} />
                      {type.label}
                    </label>
                  ))}</div>
                </fieldset>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="field">Contact Name *<input ref={nameRef} name="contactName" autoComplete="name" required maxLength={100} value={draft.contactName} onChange={(event) => update("contactName", event.target.value)} /></label>
                  <label className="field">Business Email *<input name="email" type="email" autoComplete="email" required maxLength={254} value={draft.email} onChange={(event) => update("email", event.target.value)} /></label>
                </div>
                <label className="field">Target Products &amp; Notes *<textarea name="notes" rows={5} required maxLength={2000} value={draft.notes} onChange={(event) => update("notes", event.target.value)} placeholder="e.g., G-01 Foldable Mat 100 pcs with custom laser logo, shipping to California 90210" /><span className="text-xs font-normal text-glintic-muted">{draft.notes.length} / 2,000 characters</span></label>
                <div hidden inert aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" value={draft.website} onChange={(event) => update("website", event.target.value)} /></label></div>
              </fieldset>
              <p className="text-xs text-glintic-muted">These details are used to handle your inquiry via business email and Resend, not for marketing. Read our <Link href="/legal#privacy" className="underline" target="_blank" rel="noopener noreferrer">privacy notice (opens a new tab)</Link>.</p>
              {message && <p role="alert" className="text-sm bg-glintic-peach-light rounded-lg border border-glintic-slate p-4">{message}</p>}
              <button type="submit" className="btn btn-primary w-full" disabled={status === "sending"}>{status === "sending" ? "Sending your inquiry…" : "Send Inquiry →"}</button>
            </form>
          )}
          <noscript><p className="text-sm mt-5">JavaScript is required to submit this form.{company.email ? " Please use the contact email shown alongside it." : " Direct email contact is pending setup; inquiry submission is unavailable without JavaScript."}</p></noscript>
        </div>
      </div>
    </section>
  );
}
