"use client";

import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { stack } from "@/lib/data";

export default function Stack() {
  return (
    <section
      id="stack"
      className="relative z-20 bg-bg px-4 sm:px-6 md:px-[8vw] pb-14 sm:pb-18 md:pb-24 lg:pb-28 border-t border-line"
    >
      <SectionHead
        idx="02 — Stack"
        title="Everything I ship with"
        description="Layered like a real application — interface down to infrastructure."
        className="px-0"
      />
      <div
        className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-2 sm:mt-3 md:mt-6"
        style={{ perspective: 1600 }}
      >
        {stack.map((s, i) => (
          <motion.div
            key={s.layer}
            initial={{
              opacity: 0,
              x: i % 2 === 0 ? -40 : 40,
              rotateY: i % 2 === 0 ? -8 : 8,
            }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="border border-line bg-gradient-to-b from-panel to-[#0f1113] px-4 sm:px-5 md:px-6 lg:px-9 py-3.5 sm:py-4 md:py-5 lg:py-7 rounded-sm flex justify-between items-start sm:items-center flex-wrap gap-2.5 sm:gap-3 md:gap-4 hover:border-accentDim transition-colors"
          >
            <div className="font-display text-[11.5px] sm:text-[12.5px] md:text-sm tracking-wide uppercase text-accent w-full sm:w-[140px] md:w-[160px] flex-none">
              {s.layer}
            </div>
            <div className="flex gap-1 sm:gap-1.5 md:gap-2.5 flex-wrap flex-1 min-w-0">
              {s.chips.map((c) => (
                <span key={c} className="chip font-mono text-fg">
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
