"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useRfq } from "./RfqProvider";
import { megaColumns } from "@/data/navigation";
import { products } from "@/data/products";

function subscribeLocation(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}
function locationSnapshot() { return window.location.search; }

export default function MegaMenu() {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const { isOpen, menuOpen } = useRfq();
  // 打开面板时的重渲染也会同步目录筛选；不使用 useSearchParams，保留静态渲染。
  const query = useSyncExternalStore(subscribeLocation, locationSnapshot, () => "");
  const params = new URLSearchParams(query);
  const activeCat = pathname === "/products" ? params.get("cat") : null;
  const activeSeries = pathname === "/products" ? params.get("series") : null;

  function clearTimer() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }
  function close(restoreFocus = false) {
    clearTimer();
    setOpen(false);
    if (restoreFocus) trigger.current?.focus();
  }
  function openWithFocus() {
    clearTimer();
    setOpen(true);
    requestAnimationFrame(() => wrapper.current?.querySelector<HTMLElement>(".mega-panel a")?.focus());
  }

  useEffect(() => {
    function outside(event: PointerEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    }
    function dismiss() { setOpen(false); }
    document.addEventListener("pointerdown", outside);
    window.addEventListener("popstate", dismiss);
    window.addEventListener("resize", dismiss);
    return () => {
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("popstate", dismiss);
      window.removeEventListener("resize", dismiss);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // 路由切换时重建组件；RFQ 或移动导航开启时隐藏面板，不抢占焦点。
  const visible = open && !isOpen && !menuOpen;
  return (
    <div ref={wrapper} className="mega-wrapper"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") { clearTimer(); setOpen(true); } }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        clearTimer();
        timer.current = setTimeout(() => {
          if (!wrapper.current?.contains(document.activeElement) || document.activeElement === trigger.current) setOpen(false);
        }, 150);
      }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close(); }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && visible) { event.preventDefault(); close(true); }
      }}>
      <button ref={trigger} type="button" className="nav-link collections-trigger"
        aria-expanded={visible} aria-controls="collections-mega-panel" aria-haspopup="dialog"
        onClick={() => { if (visible) close(); else openWithFocus(); }}
        onKeyDown={(event) => {
          if (["ArrowDown", "Enter", " "].includes(event.key)) { event.preventDefault(); openWithFocus(); }
        }}>
        Collections <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor"><path d="m3 4.5 3 3 3-3" /></svg>
      </button>
      <div id="collections-mega-panel" className="mega-panel" role="dialog" aria-label="Collections" hidden={!visible}>
        <div className="mega-grid">
          {megaColumns.map((column) => (
            <div className="mega-col" key={column.slug}>
              <a href={column.href} className="mega-heading" aria-current={activeCat === column.slug && !activeSeries ? "page" : undefined} onClick={() => close()}>
                <span className="overline text-glintic-sage-dark">Collection {column.number}</span>
                <span className="mt-2 block font-medium">{column.name}</span>
              </a>
              <ul className="mt-4 space-y-1">
                {column.items.map((item) => (
                  <li key={item.id}>
                    <a href={item.href} onClick={() => close()} className="mega-item" aria-current={activeCat === column.slug && activeSeries === item.id ? "page" : undefined}>
                      <span className="overline text-glintic-sage-dark">{item.id}</span>
                      <span>{item.name}</span>
                      {item.skuIds.length === 0 && <span className="mega-note">Made-to-Order</span>}
                      {item.id === "G-02" && <span className="mega-note">Cork option on request</span>}
                      {item.id === "G-04" && <span className="mega-note">Catalog candidates: silicone; neoprene to confirm</span>}
                    </a>
                  </li>
                ))}
              </ul>
              {column.slug === "fascia-recovery" && <p className="mega-note mt-5">Cork &amp; EVA recovery tools</p>}
            </div>
          ))}
        </div>
        <a href="/products" onClick={() => close()} aria-current={pathname === "/products" && (!activeCat || activeCat === "all") && !activeSeries ? "page" : undefined} className="mega-footer">
          Browse All {products.length} Catalog Items <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
