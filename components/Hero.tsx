"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/lib/data";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      style={{
        perspective: 1200,
        background:
          "radial-gradient(ellipse at 50% 25%, rgba(198,255,61,0.08), transparent 60%), linear-gradient(180deg, #0b0c0e 0%, #0e0f11 100%)",
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 120px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        className="absolute inset-0 hero-grid-bg opacity-30 pointer-events-none"
        style={{ transform: "translateZ(-200px) scale(1.2)" }}
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-[8vw] pt-0 pb-24 sm:pb-20 md:pb-10 lg:pb-6 z-10"
      >
        <div className="flex flex-col-reverse lg:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <div className="flex flex-col items-start text-left flex-1 w-full lg:min-w-0">
            <span
              className="eyebrow font-mono text-[11px] sm:text-[12px] md:text-[14px] tracking-[1.5px] sm:tracking-[2px] md:tracking-[2.5px] text-accent uppercase mb-3 sm:mb-4 md:mb-5"
              style={{ transform: "translateZ(40px)" }}
            >
              full-stack &amp; cloud engineer
            </span>

            <h1
              className="font-display uppercase leading-[0.85] tracking-[-0.5px] sm:tracking-[-1px] md:tracking-[-2px] lg:tracking-[-3px] w-full"
              style={{
                fontSize: "clamp(48px, 14vw, 120px)",
                transform: "translateZ(60px)",
              }}
            >
              {profile.name.split("").map((ch, i) => (
                <span
                  key={i}
                  className="inline-block transition-colors duration-200 ease-out hover:text-accent"
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h1>

            <div
              className="flex items-center justify-start flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 mt-5 sm:mt-6 md:mt-8 max-w-full w-full"
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent flex-none sm:mt-1" />
              <p className="text-muted text-[14px] sm:text-[16px] md:text-[19px] lg:text-[21px] leading-relaxed max-w-full sm:max-w-[620px] md:max-w-[720px] lg:max-w-none text-left">
                {profile.tagline} Based in {profile.location}.
              </p>
            </div>
          </div>

          <div
            className="flex-none w-[min(42vw,220px)] sm:w-[min(38vw,260px)] md:w-[min(34vw,300px)] lg:w-[min(24vw,300px)] opacity-85 rounded-sm pointer-events-none z-0 shrink-0"
            style={{
              filter: "grayscale(1) contrast(1.15) brightness(0.85)",
              WebkitMaskImage: "linear-gradient(180deg, black 65%, transparent 98%)",
              maskImage: "linear-gradient(180deg, black 65%, transparent 98%)",
              mixBlendMode: "luminosity",
              transform: "translateZ(50px)",
            }}
          >
            <Image
              src="/hero.png"
              alt="Portrait"
              width={520}
              height={780}
              className="w-full h-auto block"
              priority
            />
          </div>
        </div>
      </motion.div>

      <div
        className="absolute bottom-5 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-[8vw] flex items-center gap-2.5 sm:gap-3 font-mono text-[10px] sm:text-[10.5px] md:text-[11px] tracking-[1.3px] sm:tracking-[1.5px] text-muted uppercase z-20"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
      >
        <div className="scroll-drip relative w-px h-[28px] sm:h-[32px] md:h-[34px] bg-line overflow-hidden" />
        scroll
      </div>
    </section>
  );
}
