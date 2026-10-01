"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <>
      <motion.div
        style={{ scaleY }}
        className="fixed right-0 top-0 z-[90] w-[3px] h-[100svh] origin-top bg-gradient-to-b from-orange-bright via-burnt to-red-deep pointer-events-none hidden md:block shadow-[0_0_12px_rgba(224,112,32,0.5)]"
      />
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-[90] h-[3px] w-full origin-left bg-gradient-to-r from-orange-bright via-burnt to-red-deep pointer-events-none md:hidden shadow-[0_0_10px_rgba(224,112,32,0.45)]"
      />
    </>
  );
}
