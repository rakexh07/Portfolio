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

  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);

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
          "radial-gradient(ellipse at 50% 10%, rgba(251,146,60,0.28), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(127,29,29,0.35), transparent 55%), linear-gradient(180deg, #3d1509 0%, #4a1c0d 45%, #5a2612 100%)",
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 120px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        className="absolute inset-0 hero-grid-bg pointer-events-none"
        style={{ transform: "translateZ(-200px) scale(1.2)" }}
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-[8vw] pt-0 pb-16 sm:pb-20 md:pb-10 lg:pb-6 z-10"
      >
        <div className="flex flex-col-reverse lg:flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left flex-1 w-full lg:min-w-0">
            <h1
              className="font-display uppercase w-full text-cream"
              style={{
                fontSize: "clamp(38px, 12.5vw, 116px)",
                lineHeight: "0.88",
                letterSpacing: "clamp(-0.5px, -0.25vw, -3px)",
                transform: "translateZ(60px)",
                textShadow: "0 4px 30px rgba(224,112,32,0.18)",
              }}
            >
              {profile.name.split("").map((ch, i) => (
                <span
                  key={i}
                  className="inline-block transition-all duration-300 ease-out hover:opacity-70 hover:-translate-y-1 hover:text-burnt-hover"
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h1>

            <div
              className="flex items-center justify-center flex-col sm:flex-row gap-1.5 sm:gap-2.5 md:gap-4 mt-3 sm:mt-5 md:mt-8 max-w-full w-full lg:justify-start"
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-burnt flex-none sm:mt-1 shadow-[0_0_10px_rgba(224,112,32,0.6)]" />
              <p
                className="text-cream-muted leading-relaxed max-w-full sm:max-w-[620px] md:max-w-[720px] lg:max-w-none text-center lg:text-left"
                style={{ fontSize: "clamp(13px, 3.2vw, 21px)" }}
              >
                {profile.role}. Based in {profile.location}.
              </p>
            </div>
          </div>

          <div
            className="flex-none w-[min(44vw,180px)] sm:w-[min(34vw,230px)] md:w-[min(30vw,280px)] lg:w-[min(22vw,290px)] opacity-95 pointer-events-none z-0 shrink-0 overflow-hidden border border-burnt/35 rounded-xl shadow-[0_10px_40px_-15px_rgba(224,112,32,0.55)]"
            style={{
              filter: "sepia(15%) saturate(95%) contrast(1.08) brightness(0.96)",
              WebkitMaskImage: "linear-gradient(180deg, black 75%, transparent 98%)",
              maskImage: "linear-gradient(180deg, black 75%, transparent 98%)",
              transform: "translateZ(50px)",
            }}
          >
            <Image
              src="/rakesh.jpeg"
              alt="Portrait"
              width={520}
              height={780}
              className="w-full h-auto block transition-all duration-500 hover:brightness-112"
              priority
            />
          </div>
        </div>
      </motion.div>

      <div
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-[8vw] flex items-center gap-2.5 sm:gap-3 font-mono text-[10px] sm:text-[10.5px] md:text-[11px] tracking-[1.3px] sm:tracking-[1.5px] text-cream-muted/90 uppercase z-20"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
      >
        <div className="scroll-drip relative w-px h-[28px] sm:h-[32px] md:h-[34px] bg-line-warm overflow-hidden" />
        scroll
      </div>
    </section>
  );
}
