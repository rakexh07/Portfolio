"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";

export default function Quote() {
  const meta = [
    { label: "role", value: "Computer Science Engineering Graduate" },
    { label: "focus", value: "Full-Stack · Cloud · Machine Learning" },
    { label: "location", value: profile.location },
  ];

  return (
    <section className="px-4 sm:px-6 md:px-[8vw] pt-10 sm:pt-14 md:pt-18 lg:pt-20 pb-14 sm:pb-18 md:pb-24 lg:pb-28 border-t border-line">
      <motion.blockquote
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="font-display leading-[1.25] max-w-[1100px]"
        style={{ fontSize: "clamp(18px, 3.8vw, 52px)" }}
      >
        &ldquo;I build <span className="text-accent">scalable</span> systems
        end to end — from a React interface, through a Node API, down to the{" "}
        <span className="text-accent">container</span> it ships in.&rdquo;
      </motion.blockquote>

      <div className="flex gap-4 sm:gap-6 md:gap-10 flex-wrap mt-5 sm:mt-7 md:mt-10">
        {meta.map((m) => (
          <div key={m.label} className="font-mono text-[10.5px] sm:text-[11px] md:text-xs text-muted">
            {m.label}
            <span className="block text-fg text-[12px] sm:text-[13px] md:text-sm mt-0.75 sm:mt-1">
              {m.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
