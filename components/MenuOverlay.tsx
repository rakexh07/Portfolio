"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/data";

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const overlayVariants = {
  closed: {
    clipPath: "circle(0% at 0% 0%)",
    transition: {
      duration: 0.65,
      ease: [0.76, 0, 0.24, 1],
      when: "afterChildren",
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  open: {
    clipPath: "circle(170% at 0% 0%)",
    transition: {
      duration: 0.65,
      ease: [0.76, 0, 0.24, 1],
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
    x: -44,
    y: -28,
    skewX: -5,
    skewY: 3,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  open: {
    opacity: 1,
    x: 0,
    y: 0,
    skewX: 0,
    skewY: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function handleLinkClick(href: string) {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-[200] bg-bg-cream overflow-hidden"
          style={{ willChange: "clip-path" }}
        >
          <div className="min-h-[100svh] flex flex-col relative">
            <div
              className="absolute inset-0 pointer-events-none opacity-50"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 10%, rgba(224,112,32,0.12), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(194,65,12,0.08), transparent 55%)",
              }}
            />

            <div className="relative w-full flex justify-start px-4 sm:px-6 md:px-8 lg:px-[6vw]"
              style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)" }}>
              <motion.button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                variants={itemVariants}
                className="group inline-flex items-center gap-1 sm:gap-1.5 font-mono uppercase tracking-[0.18em] font-semibold text-[10.5px] sm:text-[11.5px] text-burnt hover:text-burnt-deep transition-colors py-1.5"
              >
                <span className="text-[15px] sm:text-[17px] leading-none group-hover:rotate-90 transition-transform duration-300 font-bold">
                  ✕
                </span>
                <span className="relative">
                  Close
                  <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-burnt group-hover:w-full transition-all duration-300" />
                </span>
              </motion.button>
            </div>

            <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-[6vw] py-4 sm:py-6 md:py-8">
              <motion.nav
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
                aria-label="Primary navigation"
                className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 w-full"
              >
                {menuItems.map((item) => (
                  <motion.a
                    key={item.href}
                    variants={itemVariants}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className="group relative block text-center"
                  >
                    <span
                      className="font-display uppercase leading-[0.95] text-burnt hover:text-burnt-deep transition-colors duration-300 block"
                      style={{
                        fontSize: "clamp(30px, 7vw, 72px)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {item.label}
                    </span>
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-0 h-[2px] bg-burnt group-hover:w-[60%] transition-all duration-400 ease-out rounded-full" />
                  </motion.a>
                ))}
              </motion.nav>
            </div>

            <motion.div
              variants={itemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="relative w-full px-4 sm:px-6 md:px-8 lg:px-[6vw] pt-3 sm:pt-4 md:pt-5 pb-5 sm:pb-6 md:pb-8 text-center"
              style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)" }}
            >
              <div className="font-mono text-[8.5px] sm:text-[9.5px] md:text-[10.5px] tracking-[0.22em] uppercase text-burnt/75 mb-1 sm:mb-1.5">
                Reach out to me
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="inline-block font-serif italic text-burnt hover:text-burnt-deep transition-colors duration-300 hover:-translate-y-0.5 break-words"
                style={{ fontSize: "clamp(12px, 2vw, 20px)" }}
              >
                {profile.email}
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
