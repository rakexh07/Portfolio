"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { internships } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function BuildLog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const cards = gsap.utils.toArray<HTMLElement>(".internship-card", track);
    if (cards.length === 0) return;

    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      const containerWidth = container.offsetWidth;
      return Math.max(trackWidth - containerWidth, 1);
    };

    const mm = gsap.matchMedia();
    let cleanupFns: (() => void)[] = [];

    mm.add(
      {
        isMobile: "(max-width: 639px)",
        isTablet: "(min-width: 640px) and (max-width: 1023px)",
        isDesktop: "(min-width: 1024px)",
      },
      (context) => {
        const scrollAmount = getScrollAmount();
        const multiplier =
          context.conditions?.isMobile ? 1.8 : context.conditions?.isTablet ? 1.5 : 1.4;

        const tween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => {
              const amount = getScrollAmount();
              return "+=" + Math.max(amount * multiplier, 300);
            },
            pin: true,
            pinSpacing: "margin",
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            fastScrollEnd: false,
          },
        });

        ScrollTrigger.refresh();

        let resizeTimer: NodeJS.Timeout;
        const handleResize = () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
          }, 150);
        };
        window.addEventListener("resize", handleResize);

        const cleanup = () => {
          window.removeEventListener("resize", handleResize);
          clearTimeout(resizeTimer);
          if (tween) tween.kill();
          ScrollTrigger.getAll().forEach((st) => {
            if (st.vars.trigger === container) st.kill();
          });
        };
        cleanupFns.push(cleanup);

        return cleanup;
      }
    );

    return () => {
      mm.revert();
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <div id="buildlog" className="relative border-t border-line z-10 bg-bg">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: "min(88svh, 780px)" }}
      >
        <div className="absolute inset-0 flex flex-col">
          <div
            className="shrink-0 px-4 sm:px-6 md:px-[8vw] pt-[calc(env(safe-area-inset-top,0px)+48px)] pb-2 sm:pb-3 md:pb-4"
          >
            <span className="block font-mono text-accent text-[10px] sm:text-[11px] md:text-[13px] tracking-[1.3px] sm:tracking-[1.5px] md:tracking-[2px] mb-0.5 sm:mb-1 md:mb-2">
              01 — Build Log
            </span>
            <h2
              className="font-display uppercase leading-[0.95] tracking-[-0.5px] sm:tracking-[-1px]"
              style={{ fontSize: "clamp(24px, 5.5vw, 64px)" }}
            >
              Internships
            </h2>
            <p className="max-w-[540px] text-muted mt-1 sm:mt-1.5 md:mt-2.5 text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed">
              Three roles, three layers of the stack — CMS &amp; LMS platforms, full
              MERN applications, and cloud-native deployment.
            </p>
          </div>

          <div className="flex-1 min-h-0 w-full relative">
            <div
              className="absolute inset-0"
              style={{ padding: "1svh 0 3svh" }}
            >
              <div
                ref={trackRef}
                className="flex items-stretch h-full px-4 sm:px-6 md:px-[8vw]"
              >
                {internships.map((job) => (
                  <div
                    key={job.num}
                    className="internship-card flex-none flex flex-col h-full mr-2 sm:mr-3 md:mr-[1.5vw] border border-line bg-panel rounded-lg shadow-[0_0_0_1px_rgba(255,255,255,0.02)] w-[86vw] sm:w-[62vw] md:w-[min(46vw,480px)] lg:w-[min(32vw,480px)]"
                  >
                    <div className="p-1.5 sm:p-2 md:p-2.5 flex flex-col h-full w-full gap-0">
                      <div className="flex items-center justify-between shrink-0">
                        <div className="font-display text-line text-xs sm:text-sm md:text-base leading-none">
                          {job.num}
                        </div>
                        <div className="font-mono text-muted text-[7px] sm:text-[7.5px] md:text-[8.5px] text-right leading-tight">
                          {job.when}
                        </div>
                      </div>
                      <div className="font-mono text-accent text-[7.5px] sm:text-[8px] md:text-[9px] mt-0.5 tracking-wide shrink-0">
                        {job.company.toUpperCase()}
                      </div>
                      <h3 className="text-[10.5px] sm:text-[11px] md:text-[13px] mt-0.5 shrink-0 leading-snug font-semibold">
                        {job.title}
                      </h3>
                      <ul className="mt-0.5 pl-2 sm:pl-2.5 list-disc marker:text-accent pr-0.5 flex-1 min-h-0">
                        {job.bullets.map((b, i) => (
                          <li
                            key={i}
                            className="text-muted text-[8.5px] sm:text-[9px] md:text-[10px] leading-relaxed mb-0.25 sm:mb-0.5"
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                <div className="internship-card flex-none flex flex-col justify-center h-full mr-2 sm:mr-3 md:mr-[1.5vw] border border-line bg-panel rounded-lg items-center text-center shadow-[0_0_0_1px_rgba(255,255,255,0.02)] w-[86vw] sm:w-[62vw] md:w-[min(46vw,480px)] lg:w-[min(32vw,480px)]">
                  <div className="p-2 sm:p-2.5 md:p-3">
                    <div className="font-display text-accent/40 text-sm sm:text-base md:text-lg">
                      //
                    </div>
                    <h3 className="mt-0.5 sm:mt-1 text-[10.5px] sm:text-[11px] md:text-xs">
                      End of log
                    </h3>
                    <p className="text-muted mt-0.5 sm:mt-1 text-[8.5px] sm:text-[9px] md:text-[10px]">
                      Keep scrolling for the stack.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
