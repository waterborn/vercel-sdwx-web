import { RfqTrigger } from "@/components/RfqProvider";
const steps = [
  { title: "Select & Sample", text: "Build your shortlist and request a Sample Box. Confirm the materials and specifications before taking the next step." },
  { title: "Brand Customization", text: "Explore laser engraving, woven branding, silicone embossing and Pantone color matching. The suitable process is confirmed for your chosen materials." },
  { title: "Studio-Grade QA", text: "Define incoming, in-process, finished-product and outgoing checks around your approved sample and requirements." },
  { title: "Delivery Planning", text: "DDP quoted per destination. Plan door-to-door delivery with agreed freight and duty terms; worldwide coverage is not assumed." },
];
export default function ProcessSection() {
  return <section id="oem" className="section-space bg-glintic-linen"><div className="studio-container"><div className="flex flex-col sm:flex-row justify-between gap-6 sm:items-end"><div><p className="overline text-glintic-sage-dark mb-4">OEM / ODM · Made around you</p><h2 className="section-title">From your vision to your studio.</h2></div><RfqTrigger type="OEM Project" className="btn btn-secondary">Start an OEM Project ↗</RfqTrigger></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">{steps.map((step, index) => <article key={step.title} className="relative border-t border-dashed border-glintic-sage pt-6"><span className="step-number">0{index + 1}</span><h3 className="card-title mt-5 mb-4">{step.title}</h3><p className="text-glintic-slate text-sm">{step.text}</p></article>)}</div></div></section>;
}
