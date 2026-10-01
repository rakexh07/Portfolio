"use client";

import { motion } from "framer-motion";

export default function SectionHead({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`px-4 sm:px-6 md:px-[8vw] pt-10 sm:pt-12 md:pt-16 pb-4 sm:pb-5 md:pb-7 text-left ${className}`}
    >
      {eyebrow && (
        <div className="font-mono text-cream-muted text-[9.5px] sm:text-[10px] md:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] uppercase mb-1.5 sm:mb-2 md:mb-3 eyebrow">
          {eyebrow}
        </div>
      )}
      <h2
        className="font-display text-cream tracking-tight"
        style={{
          fontSize: "clamp(26px, 6vw, 64px)",
          lineHeight: "0.97",
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="max-w-[560px] text-cream-muted mt-2 sm:mt-3 md:mt-4 leading-relaxed opacity-90"
          style={{ fontSize: "clamp(12px, 2.2vw, 16px)" }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
