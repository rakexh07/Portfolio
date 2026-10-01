"use client";

import { motion } from "framer-motion";
import SectionHead from "./SectionHead";

const stackGroups = [
  {
    layer: "Frontend",
    items: [
      { name: "React.js" },
      { name: "JavaScript" },
      { name: "Next.js" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    layer: "Backend",
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Java" },
      { name: "C" },
      { name: "Python" },
      { name: "REST APIs" },
    ],
  },
  {
    layer: "Data",
    items: [
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "OpenCV" },
    ],
  },
  {
    layer: "Cloud & DevOps",
    items: [
      { name: "AWS" },
      { name: "GitHub" },
      { name: "GitLab" },
      { name: "Docker" },
      { name: "Linux" },
    ],
  },
];

export default function Stack() {
  return (
    <section
      id="stack"
      className="relative z-20 border-t border-burnt/15"
      style={{
        background:
          "radial-gradient(ellipse at 90% 10%, rgba(249,115,22,0.12), transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(127,29,29,0.28), transparent 55%), linear-gradient(180deg, #3d1509 0%, #4a1c0d 100%)",
      }}
    >
      <SectionHead
        title="Tech Stack"
        description="Layered like a real application — interface down to infrastructure."
      />

      <div className="px-4 sm:px-5 md:px-[8vw] pb-10 sm:pb-12 md:pb-20 space-y-6 sm:space-y-7 md:space-y-9">
        {stackGroups.map((g, gi) => (
          <motion.div
            key={g.layer}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: gi * 0.06 }}
            className="space-y-3 sm:space-y-4 md:space-y-5"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <h3
                className="font-serif italic text-cream tracking-wide"
                style={{ fontSize: "clamp(17px, 4.2vw, 28px)" }}
              >
                {g.layer}
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-line-warm/70 to-burnt/40" />
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
              {g.items.map((it) => (
                <motion.span
                  key={it.name}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center rounded-full border border-burnt/35 bg-burnt/10 hover:bg-burnt/20 hover:border-burnt/80 hover:shadow-[0_6px_22px_-10px_rgba(224,112,32,0.65)] transition-all duration-300 cursor-default backdrop-blur-sm font-medium text-cream"
                  style={{
                    fontSize: "clamp(12px, 2.8vw, 16px)",
                    padding: "clamp(7px, 1.6vw, 10px) clamp(13px, 3vw, 20px)",
                  }}
                >
                  {it.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
