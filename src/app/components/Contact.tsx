import { ArrowUpRight, FlowerMark } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="site-container contact-grid">
        <div className="contact-copy"><FlowerMark /><p className="eyebrow">FOR STUDIOS, RETAILERS & YOUR NEXT IDEA</p><h2 id="contact-heading">Good things start<br /><em>with a conversation.</em></h2><p>Building a studio collection or sourcing for your business? Explore product options and discuss quantities, samples and customisation with our supplier team.</p><a className="button-light" href="https://shandongwuxian.m.en.alibaba.com/index.html" target="_blank" rel="noopener noreferrer">Visit supplier storefront <ArrowUpRight /></a><p className="external-note">Opens our external marketplace in a new tab.<br />Use “Contact supplier” there to send your enquiry.</p></div>
        <div className="contact-faq"><p className="eyebrow">A FEW THINGS TO KNOW</p><details><summary>How do I enquire about a product?<span>+</span></summary><p>Open a product’s detail page, then select “View supplier listing”. You can ask about the latest options and availability directly on the external marketplace.</p></details><details><summary>Can I place a bulk or custom order?<span>+</span></summary><p>Listed minimum quantities vary by product. Custom printing is listed for selected items, including our Pilates bar set. Ask the supplier to confirm samples, customisation and order requirements before purchasing.</p></details><details><summary>Where can I check pricing and delivery?<span>+</span></summary><p>Current quotes, shipping costs, delivery times and order terms are confirmed on the supplier listing. This website is a product collection, not an online checkout.</p></details><div className="contact-footnote"><span className="contact-status" /> A considered collection. A personal conversation.</div></div>
      </div>
    </section>
  );
}
