"use client";

import { motion } from "framer-motion";

export default function SectionHead({
  idx,
  title,
  description,
  className = "",
}: {
  idx: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`px-4 sm:px-6 md:px-[8vw] pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-6 sm:pb-8 md:pb-10 lg:pb-14 ${className}`}
    >
      <span className="block font-mono text-accent text-[10px] sm:text-[11px] md:text-[13px] tracking-[1.3px] sm:tracking-[1.5px] md:tracking-[2px] mb-1 sm:mb-1.5 md:mb-3">
        {idx}
      </span>
      <h2
        className="font-display uppercase leading-[0.95] tracking-[-0.5px] sm:tracking-[-1px]"
        style={{ fontSize: "clamp(26px, 6.5vw, 84px)" }}
      >
        {title}
      </h2>
      {description && (
        <p className="max-w-[560px] text-muted mt-2 sm:mt-2.5 md:mt-5 text-[12px] sm:text-[13px] md:text-base leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
