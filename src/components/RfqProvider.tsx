"use client";

import { createContext, useContext, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { collections, products, series, productById, seriesById } from "@/data/products";
import { company } from "@/data/company";
import { customizationOptions, emptyDraft, inquiryTypes, quantityRanges, type InquiryType, type RfqDraft } from "@/data/rfq";

type OpenOptions = { type?: InquiryType; target?: string; };
type RfqContextValue = { open: (options?: OpenOptions) => void; menuOpen: boolean; setMenuOpen: (open: boolean) => void; isOpen: boolean; };
const RfqContext = createContext<RfqContextValue | null>(null);
export function useRfq() {
  const context = useContext(RfqContext);
  if (!context) throw new Error("RfqProvider is required");
  return context;
}
export function RfqTrigger({ children, type, target, className = "btn btn-primary" }: OpenOptions & { children: ReactNode; className?: string; }) {
  const { open } = useRfq();
  // 链接在无脚本环境仍通往联系区域，不依赖隐藏按钮作为唯一入口。
  return <Link href="/#contact" className={className} onClick={(event) => { event.preventDefault(); open({ type, target }); }}>{children}</Link>;
}
function targetLabel(id: string) {
  if (id === "sample-box") return "GLINTIC Sample Box";
  const product = Object.hasOwn(productById, id) ? productById[id] : undefined;
  const group = Object.hasOwn(seriesById, id) ? seriesById[id] : undefined;
  return product ? `${product.seriesId ? `${product.seriesId} · ` : ""}${product.name} · SKU ${product.id}` : group ? `${group.id} · ${group.name}` : id;
}
export default function RfqProvider({ children }: { children: ReactNode; }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const scrollBefore = useRef("");
  const submissionRef = useRef<{ id: string; fingerprint: string; } | null>(null);
  const submittingRef = useRef(false);
  const dirtyRef = useRef(false);
  const [draft, setDraft] = useState<RfqDraft>(emptyDraft);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function open(options: OpenOptions = {}) {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setMenuOpen(false);
    if (options.type || options.target) {
      setDraft((current) => ({ ...current, inquiryType: options.type ?? "Bulk Quote", targets: [...new Set([...current.targets.filter((id) => id !== "sample-box"), ...(options.type === "Sample Box" ? ["sample-box"] : []), ...(options.target ? [options.target] : [])])] }));
    }
    setStatus("idle");
    setMessage("");
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      scrollBefore.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      dialog.showModal();
      setIsOpen(true);
      requestAnimationFrame(() => nameRef.current?.focus());
    }
  }
  function close() {
    if (submittingRef.current) { setMessage("Please wait for the submission result before closing."); return; }
    if (dirtyRef.current && !window.confirm("Close this request? Your draft will be kept while you stay on this website.")) return;
    dialogRef.current?.close();
  }
  function afterClose() {
    setIsOpen(false);
    document.body.style.overflow = scrollBefore.current;
    if (triggerRef.current?.getClientRects().length) triggerRef.current.focus();
    else document.querySelector<HTMLButtonElement>('button[aria-controls="mobile-menu"]')?.focus();
  }
  function update<K extends keyof RfqDraft>(key: K, value: RfqDraft[K]) {
    dirtyRef.current = true;
    setDraft((current) => ({ ...current, [key]: value }));
    if (status !== "sending") { setStatus("idle"); setMessage(""); }
  }
  function toggle(key: "targets" | "customization", value: string) {
    update(key, draft[key].includes(value) ? draft[key].filter((entry) => entry !== value) : [...draft[key], value]);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
    const fingerprint = JSON.stringify(draft);
    if (!submissionRef.current || submissionRef.current.fingerprint !== fingerprint) submissionRef.current = { id: crypto.randomUUID(), fingerprint };
    submittingRef.current = true;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/rfq", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...draft, submissionId: submissionRef.current.id }), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "We could not send your request. Please try again.");
      setStatus("success");
      setMessage("Your request has been accepted for delivery to the GLINTIC team. This is not an order confirmation.");
      dirtyRef.current = false;
      setDraft(emptyDraft());
      submissionRef.current = null;
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error && error.name !== "TimeoutError" ? error.message : "The request timed out. Your draft is safe; please retry with the same details.");
    } finally { submittingRef.current = false; }
  }
  const sending = status === "sending";
  const fallbackBody = `Inquiry type: ${draft.inquiryType}\nName: ${draft.contactName}\nBusiness: ${draft.companyName}\nCountry: ${draft.country}\nPostal code: ${draft.noPostalCode ? "Not applicable" : draft.postalCode}\nItems: ${draft.targets.map(targetLabel).join("; ")}\nQuantity: ${draft.quantityRange} / ${draft.exactQuantity}\nCustomization: ${draft.customization.join(", ")}\nNotes: ${draft.notes}`;
  return (
    <RfqContext.Provider value={{ open, menuOpen, setMenuOpen, isOpen }}>
      {children}
      <dialog ref={dialogRef} className="rfq-drawer" aria-labelledby="rfq-title" aria-modal="true" onCancel={(event) => { event.preventDefault(); close(); }} onClose={afterClose} onClick={(event) => { if (event.target === dialogRef.current) { const bounds = dialogRef.current.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right) close(); } }} onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const elements = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex="0"]') ?? []).filter((element) => element.getClientRects().length > 0 && !element.closest("[inert]"));
        const first = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}>
        <div className="flex items-center justify-between border-b border-glintic-line p-6 shrink-0 bg-glintic-cream">
          <div><p className="overline text-glintic-muted mb-2">Let’s shape your studio</p><h2 id="rfq-title" className="card-title">Request a Quote</h2></div>
          <button type="button" className="icon-btn hover:bg-glintic-sage-light" aria-label="Close quote request" onClick={close}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
        </div>
        <div className="rfq-scroll">
          {status === "success" ? <div ref={successRef} tabIndex={-1} role="status" className="py-8"><span className="step-number">Thank you.</span><p className="mt-5">{message}</p><button type="button" className="btn btn-primary mt-7" onClick={() => { setStatus("idle"); setMessage(""); requestAnimationFrame(() => nameRef.current?.focus()); }}>Start another request</button></div> : <form onSubmit={submit} className="space-y-5">
            <p className="text-glintic-muted text-sm">Tell us what you have in mind. Specifications, availability, MOQ, lead time and shipping are confirmed in a written quotation. * Required fields.</p>
            <fieldset disabled={sending} className="space-y-5 disabled:opacity-70">
              <label className="field">Inquiry Type *<select value={draft.inquiryType} onChange={(event) => { update("inquiryType", event.target.value as InquiryType); update("targets", event.target.value === "Sample Box" ? [...new Set([...draft.targets, "sample-box"])] : draft.targets.filter((id) => id !== "sample-box")); }}>{inquiryTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
              <label className="field">Contact Name *<input ref={nameRef} name="name" autoComplete="name" required maxLength={100} value={draft.contactName} onChange={(event) => update("contactName", event.target.value)} /></label>
              <label className="field">Business Email *<input name="email" type="email" autoComplete="email" required maxLength={254} value={draft.email} onChange={(event) => update("email", event.target.value)} /></label>
              <label className="field">Company / Studio Name *<input name="organization" autoComplete="organization" required maxLength={150} value={draft.companyName} onChange={(event) => update("companyName", event.target.value)} /></label>
              <div className="grid grid-cols-2 gap-3">
                <label className="field">Country *<input name="country" autoComplete="country-name" required maxLength={80} value={draft.country} onChange={(event) => update("country", event.target.value)} /></label>
                <label className="field">Zip / Postal Code{!draft.noPostalCode && " *"}<input name="postal-code" autoComplete="postal-code" required={!draft.noPostalCode} disabled={draft.noPostalCode} maxLength={24} value={draft.postalCode} onChange={(event) => update("postalCode", event.target.value)} /></label>
              </div>
              <label className="check-option"><input type="checkbox" checked={draft.noPostalCode} onChange={(event) => update("noPostalCode", event.target.checked)} />My destination does not use postal codes.</label>
              {draft.inquiryType === "Sample Box" && <p className="rounded-lg bg-glintic-cork-light p-4 text-sm">Sample Box reference: US$39. Contents, shipping and any refund terms require confirmation. A PayPal invoice is issued offline after the details are agreed.</p>}
              <fieldset><legend className="font-medium text-[13px] mb-2">Target Products <span className="font-normal">(optional)</span></legend>
                {draft.targets.length > 0 && <ul className="space-y-2 mb-3">{draft.targets.map((id) => <li key={id} className="bg-glintic-sage-light rounded-lg px-3 py-2 flex items-center gap-2 text-xs"><span className="flex-1 break-words">{targetLabel(id)}</span><button type="button" className="icon-btn" aria-label={`Remove ${targetLabel(id)}`} onClick={() => toggle("targets", id)}>×</button></li>)}</ul>}
                <details className="rounded-lg border border-glintic-sage px-3"><summary className="min-h-11 flex items-center cursor-pointer text-sm">Choose series or catalog items</summary><div className="max-h-72 overflow-y-auto pb-3"><label className="check-option"><input type="checkbox" checked={draft.targets.includes("sample-box")} onChange={() => toggle("targets", "sample-box")} />GLINTIC Sample Box</label>{collections.map((collection) => <div key={collection.slug}><p className="overline mt-5 mb-2 text-glintic-sage-dark">{collection.name}</p>{series.filter((entry) => entry.collection === collection.slug).map((entry) => <label className="check-option" key={entry.id}><input type="checkbox" checked={draft.targets.includes(entry.id)} onChange={() => toggle("targets", entry.id)} />{entry.id} · {entry.name}</label>)}</div>)}<p className="overline mt-5 mb-2">Individual SKUs</p>{products.map((product) => <label className="check-option" key={product.id}><input type="checkbox" checked={draft.targets.includes(product.id)} onChange={() => toggle("targets", product.id)} /><span>{product.name}<span className="block text-glintic-muted text-xs">{product.id}</span></span></label>)}</div></details>
              </fieldset>
              {draft.inquiryType !== "Sample Box" && <div className="space-y-4"><label className="field">Order Quantity *<select required value={draft.quantityRange} onChange={(event) => update("quantityRange", event.target.value)}><option value="">Select a quantity range</option>{quantityRanges.map((range) => <option key={range} value={range}>{range} pcs</option>)}</select></label><label className="field">Exact Quantity (optional)<input type="number" min={10} max={10000000} step={10} inputMode="numeric" value={draft.exactQuantity} onChange={(event) => update("exactQuantity", event.target.value)} /><span className="text-glintic-muted text-xs font-normal">Use multiples of 10. This is a planning quantity, not a confirmed MOQ.</span></label></div>}
              <fieldset><legend className="text-[13px] font-medium mb-1">Customization Options</legend><div className="grid grid-cols-2 gap-x-3">{customizationOptions.map((option) => <label className="check-option" key={option}><input type="checkbox" checked={draft.customization.includes(option)} onChange={() => toggle("customization", option)} />{option}</label>)}</div></fieldset>
              <label className="field">Project Details &amp; Notes<textarea rows={4} maxLength={2000} value={draft.notes} onChange={(event) => update("notes", event.target.value)} placeholder="Sizes, color references, launch plans or delivery requirements…" /><span className="text-glintic-muted text-xs font-normal">{draft.notes.length} / 2,000 characters</span></label>
              <div hidden inert aria-hidden="true"><label>Website<input name="website" autoComplete="off" tabIndex={-1} value={draft.website} onChange={(event) => update("website", event.target.value)} /></label></div>
            </fieldset>
            <p className="text-xs text-glintic-muted">We use these details to handle your inquiry, through our business email and Resend. This is not a marketing signup. Read our <Link href="/legal#privacy" className="underline" target="_blank" rel="noopener noreferrer">privacy notice (opens a new tab)</Link>.</p>
            {message && <p role="alert" className="text-sm bg-glintic-peach-light border border-glintic-slate rounded-lg p-4">{message}</p>}
            <button type="submit" className="btn btn-primary w-full" disabled={sending}>{sending ? "Sending your request…" : draft.inquiryType === "Sample Box" ? "Send Sample Box Request" : "Send Quote Request"}</button>
            {company.email && <a className="link-underline text-xs" href={`mailto:${company.email}?subject=${encodeURIComponent(`GLINTIC ${draft.inquiryType}`)}&body=${encodeURIComponent(fallbackBody)}`}>Prefer email? Send your request directly.</a>}
          </form>}
        </div>
      </dialog>
      {company.whatsapp && /^\d{8,15}$/.test(company.whatsapp) && !isOpen && !menuOpen && <a href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent("Hi GLINTIC team, I am interested in bulk studio supply for our facility. Could you please share the latest wholesale catalog and quotation?")}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with GLINTIC on WhatsApp (opens a new tab)" className="floating-contact fixed z-30 right-5 bottom-[max(20px,env(safe-area-inset-bottom))] flex items-center justify-center w-14 h-14 bg-glintic-sage-dark text-glintic-surface rounded-full shadow-glintic-hover"><svg aria-hidden="true" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M20 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.1-4.3A8.5 8.5 0 1 1 20 11.5Z" /><path d="M8 7c0 4 3 7 7 7l1-2-3-1-1 1-2-2 1-1-1-3-2 1Z" /></svg></a>}
    </RfqContext.Provider>
  );
}
