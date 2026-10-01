"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import MenuOverlay from "./MenuOverlay";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300`}
        style={{ paddingTop: "env(safe-area-inset-top, 12px)" }}
      >
        <div
          className={`mx-2 sm:mx-4 md:mx-8 mt-1 sm:mt-2 md:mt-2.5 rounded-2xl px-2.5 sm:px-4 md:px-7 py-2 sm:py-2.5 md:py-3.5 transition-all duration-300 ${
            scrolled
              ? "bg-bg-cream-2/85 backdrop-blur-xl border border-border-cream shadow-[0_10px_45px_-20px_rgba(138,64,34,0.45)]"
              : "bg-transparent"
          }`}
        >
          <nav className={`flex items-center justify-between transition-all duration-300 gap-1 sm:gap-2`}>
            <div className="flex items-center shrink-0">
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className={`inline-flex flex-col justify-center items-center gap-[4px] sm:gap-[5px] p-1 sm:p-1.5 md:p-2 rounded-lg transition-colors group ${
                  scrolled
                    ? "text-fg-warm hover:text-burnt hover:bg-burnt/8"
                    : "text-cream hover:text-gold hover:bg-cream/10"
                }`}
              >
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 group-hover:w-7 sm:group-hover:w-8 ${scrolled ? "bg-fg-warm" : "bg-cream"}`}
                  style={{ width: "clamp(18px, 5vw, 24px)" }}
                />
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 ${scrolled ? "bg-fg-warm" : "bg-cream"}`}
                  style={{ width: "clamp(18px, 5vw, 24px)" }}
                />
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 group-hover:w-7 sm:group-hover:w-8 ${scrolled ? "bg-fg-warm" : "bg-cream"}`}
                  style={{ width: "clamp(18px, 5vw, 24px)" }}
                />
              </button>
            </div>

            <div className="flex-1 flex justify-center pointer-events-none min-w-0 px-0.5 sm:px-1 md:px-2">
              <a
                href="#hero"
                className={`font-serif italic font-semibold transition-colors tracking-tight pointer-events-auto truncate ${
                  scrolled
                    ? "text-fg-warm hover:text-burnt"
                    : "text-cream hover:text-gold"
                }`}
                style={{ fontSize: "clamp(16px, 4.5vw, 32px)" }}
              >
                {profile.name}
              </a>
            </div>

            <div className="flex items-center justify-end shrink-0">
              <a
                href="#contact"
                className={`font-mono uppercase tracking-widest font-semibold transition-all flex items-center gap-0.5 sm:gap-1 md:gap-1.5 group rounded-full border ${
                  scrolled
                    ? "text-fg-warm hover:text-burnt border-border-cream hover:border-burnt/80 hover:bg-burnt/8"
                    : "text-cream hover:text-gold border-cream/30 hover:border-cream/70 hover:bg-cream/10"
                }`}
                style={{
                  fontSize: "clamp(8.5px, 2vw, 12.5px)",
                  padding: "clamp(4px, 1vw, 7px) clamp(8px, 1.8vw, 16px)",
                }}
              >
                <span className="hidden sm:inline">Let&apos;s chat</span>
                <span className="sm:hidden">Chat</span>
                <span className={`transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${scrolled ? "text-burnt" : "text-cream"}`}>
                  →
                </span>
              </a>
            </div>
          </nav>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
