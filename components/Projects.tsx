"use client";

import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { projects } from "@/lib/data";

const previewPalettes = [
  {
    grad: "linear-gradient(135deg, #4a1c0d 0%, #8a4022 40%, #e07020 100%)",
    accent: "#f5ecd7",
  },
  {
    grad: "linear-gradient(160deg, #5a2612 0%, #c2410c 45%, #f97316 100%)",
    accent: "#fff5e0",
  },
  {
    grad: "linear-gradient(150deg, #3d1509 0%, #7f1d1d 50%, #ea580c 100%)",
    accent: "#ffedd5",
  },
];

function projectInitials(title: string): string {
  const words = title.split(/\s+/).filter((w) => w.length > 0);
  const first = words[0]?.[0] ?? "";
  const second = words[1]?.[0] ?? words[2]?.[0] ?? "";
  return (first + second).toUpperCase();
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-20 border-t border-burnt/15"
      style={{
        background:
          "radial-gradient(ellipse at 30% 10%, rgba(251,146,60,0.10), transparent 55%), radial-gradient(ellipse at 70% 100%, rgba(127,29,29,0.30), transparent 55%), linear-gradient(180deg, #3d1509 0%, #4a1c0d 100%)",
      }}
    >
      <SectionHead
        title="FEATURED WORKS"
        description="Computer vision, applied ML, and full-stack web systems."
      />

      <div className="px-4 sm:px-5 md:px-[8vw] pb-10 sm:pb-12 md:pb-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-5 md:gap-x-6 gap-y-4 sm:gap-y-5 md:gap-y-6">
          {projects.map((p, i) => {
            const palette = previewPalettes[i % previewPalettes.length];
            const isFeatured = i === 0;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.85, ease: "easeOut", delay: i * 0.07 }}
                className={`group relative flex flex-col bg-bg-warm-2/55 border border-line-warm/60 overflow-hidden hover:border-burnt/70 transition-all duration-500 rounded-xl backdrop-blur-sm hover:shadow-[0_14px_55px_-18px_rgba(224,112,32,0.65)] ${
                  isFeatured ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className="relative w-full overflow-hidden border-b border-line-warm/50 flex items-center justify-center"
                  style={{
                    background: palette.grad,
                    minHeight: isFeatured
                      ? "clamp(200px, 40vw, 340px)"
                      : "clamp(150px, 32vw, 260px)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(245,236,215,0.85) 1px, transparent 1px), linear-gradient(90deg, rgba(245,236,215,0.85) 1px, transparent 1px)",
                      backgroundSize: "clamp(20px, 4vw, 34px) clamp(20px, 4vw, 34px)",
                    }}
                  />

                  <div className="relative flex items-center gap-3 sm:gap-4 md:gap-6 z-10 px-4 sm:px-6 md:px-8">
                    <div
                      className="font-serif italic font-bold leading-none tracking-tight"
                      style={{
                        fontSize: isFeatured
                          ? "clamp(48px, 8vw, 120px)"
                          : "clamp(36px, 6.5vw, 84px)",
                        color: palette.accent,
                        opacity: 0.93,
                        textShadow: "0 4px 24px rgba(0,0,0,0.35)",
                      }}
                    >
                      {projectInitials(p.title)}
                    </div>
                    <div
                      className="hidden sm:flex flex-col gap-1 border-l pl-3 sm:pl-4 md:pl-6"
                      style={{ borderColor: `${palette.accent}33`, color: palette.accent }}
                    >
                      <div
                        className="font-mono uppercase tracking-[0.18em] sm:tracking-[0.2em] opacity-80"
                        style={{ fontSize: "clamp(9.5px, 1.6vw, 12px)" }}
                      >
                        {p.tag}
                      </div>
                      <div
                        className="font-display uppercase leading-none"
                        style={{
                          fontSize: isFeatured
                            ? "clamp(20px, 3.8vw, 44px)"
                            : "clamp(16px, 3vw, 28px)",
                          color: palette.accent,
                        }}
                      >
                        {p.title.split(" ").slice(0, 2).join(" ")}
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute top-2.5 sm:top-3 md:top-4 left-3 sm:left-4 md:left-5 font-mono uppercase tracking-[0.18em] sm:tracking-[0.2em] z-10"
                    style={{
                      color: palette.accent,
                      opacity: 0.82,
                      fontSize: "clamp(9px, 1.7vw, 11.5px)",
                    }}
                  >
                    {isFeatured ? "Featured" : p.tag}
                  </div>
                </div>

                <div className="flex-1 p-4 sm:p-5 md:p-7 lg:p-8 flex flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
                    <span
                      className="inline-flex items-center font-mono uppercase tracking-[0.14em] sm:tracking-[0.15em] text-cream-muted/95 border border-burnt/40 bg-burnt/10 rounded-md"
                      style={{
                        fontSize: "clamp(9px, 1.8vw, 11.5px)",
                        padding: "clamp(5px, 1.2vw, 7px) clamp(10px, 2.4vw, 14px)",
                      }}
                    >
                      <span className="w-1.5 h-1.5 bg-burnt mr-1.5 sm:mr-2 rounded-full shadow-[0_0_8px_rgba(224,112,32,0.7)]" />
                      {p.tag}
                    </span>
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-cream/80 hover:text-burnt-hover transition-colors uppercase tracking-wider group/link"
                      style={{ fontSize: "clamp(9px, 1.8vw, 11.5px)" }}
                    >
                      View Source
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  </div>

                  <h3
                    className="font-display text-cream tracking-tight group-hover:opacity-100 transition-opacity"
                    style={{
                      fontSize: "clamp(20px, 5vw, 44px)",
                      lineHeight: "1.05",
                    }}
                  >
                    {p.title}
                  </h3>

                  <p
                    className="text-cream-muted leading-relaxed max-w-[760px] opacity-95 mt-2.5 sm:mt-3 md:mt-4"
                    style={{ fontSize: "clamp(12.5px, 2.4vw, 16px)" }}
                  >
                    {p.description}
                  </p>

                  <div className="mt-4 sm:mt-5 md:mt-6 pt-3.5 sm:pt-4 md:pt-5 border-t border-line-warm/50 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {p.stackLine.split(" · ").map((s) => (
                        <span
                          key={s}
                          className="font-mono text-cream-muted tracking-wide border border-line-warm/60 rounded-sm hover:border-burnt/70 hover:text-cream transition-colors"
                          style={{
                            fontSize: "clamp(9.5px, 1.8vw, 12px)",
                            padding: "3px clamp(7px, 1.4vw, 10px)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
