"use client";

import { useScroll, motion } from "framer-motion";

export default function ProgressRail() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed right-[max(12px,env(safe-area-inset-right))] sm:right-[max(16px,env(safe-area-inset-right))] top-1/2 -translate-y-1/2 w-[2px] h-24 sm:h-28 md:h-32 lg:h-40 bg-line z-[100] hidden sm:block">
      <motion.div
        className="w-full bg-accent origin-top"
        style={{ scaleY: scrollYProgress, height: "100%" }}
      />
    </div>
  );
}
