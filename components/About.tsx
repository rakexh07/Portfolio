"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHead from "./SectionHead";
import { profile, aboutText, internships } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="relative z-20 border-t border-burnt/15"
      style={{
        background:
          "radial-gradient(ellipse at 10% 0%, rgba(251,146,60,0.10), transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(127,29,29,0.30), transparent 55%), linear-gradient(180deg, #3d1509 0%, #4a1c0d 100%)",
      }}
    >
      <SectionHead title="About" />

      <div className="px-4 sm:px-5 md:px-[8vw] pb-10 sm:pb-12 md:pb-20 space-y-4 sm:space-y-5 md:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,300px)] gap-4 sm:gap-5 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-bg-warm-2/60 border border-line-warm/60 p-4 sm:p-5 md:p-8 relative rounded-xl backdrop-blur-sm"
          >
            <h3
              className="font-serif italic text-cream mb-3 sm:mb-4 md:mb-5"
              style={{ fontSize: "clamp(16px, 4vw, 22px)" }}
            >
              Some context
            </h3>
            <p
              className="text-cream-muted leading-relaxed"
              style={{ fontSize: "clamp(13px, 2.6vw, 16px)" }}
            >
              {aboutText}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mt-5 sm:mt-6 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t border-line-warm/50">
              {[
                { label: "Role", value: profile.role },
                { label: "Focus", value: profile.focus },
                { label: "Location", value: profile.location },
              ].map((m) => (
                <div key={m.label}>
                  <div
                    className="font-mono text-cream-dim tracking-[0.15em] uppercase mb-1 sm:mb-1.5"
                    style={{ fontSize: "clamp(9px, 1.8vw, 11px)" }}
                  >
                    {m.label}
                  </div>
                  <div
                    className="font-semibold text-cream leading-snug"
                    style={{ fontSize: "clamp(13px, 2.8vw, 17px)" }}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
            className="bg-bg-warm-2/60 border border-line-warm/60 overflow-hidden mx-auto lg:mx-0 w-full max-w-[240px] sm:max-w-[280px] md:max-w-[300px] rounded-xl backdrop-blur-sm shadow-[0_8px_35px_-18px_rgba(224,112,32,0.45)]"
          >
            <div className="relative w-full aspect-[4/5]">
              <Image
                src="/rakesh.jpeg"
                alt="Portrait"
                fill
                className="object-cover transition-all duration-500 hover:brightness-112"
                priority
                sizes="(max-width: 1024px) 260px, 300px"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bg-warm-2/85 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
          className="bg-bg-warm-2/60 border border-line-warm/60 p-4 sm:p-5 md:p-8 relative rounded-xl backdrop-blur-sm"
        >
          <div className="flex items-start justify-between flex-wrap gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8">
            <h3
              className="font-serif italic text-cream"
              style={{ fontSize: "clamp(16px, 4vw, 22px)" }}
            >
              Work experience
            </h3>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-cream/85 hover:text-burnt-hover transition-colors border border-burnt/40 hover:border-burnt/80 px-3 sm:px-3.5 py-1.5 hover:bg-burnt/10 uppercase tracking-wider rounded-md"
              style={{ fontSize: "clamp(9.5px, 1.9vw, 11.5px)" }}
            >
              Resume
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute top-2.5 left-0 right-0 h-px bg-line-warm/60" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4 md:gap-5 lg:gap-6 relative">
              {internships.map((job, idx) => (
                <div key={job.title} className="relative">
                  <div className="hidden sm:block absolute top-0 left-0 right-0 -translate-y-1/2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-burnt border-[3px] border-bg-warm-2 rounded-full shadow-[0_0_10px_rgba(224,112,32,0.7)]" style={{ boxShadow: "0 0 0 1px #8a4022" }} />
                  </div>
                  <div className="sm:hidden absolute left-0 top-1 bottom-0 w-px bg-line-warm/60" />
                  <div className="sm:hidden absolute left-0 top-2.5 -translate-x-1/2 w-2.5 h-2.5 bg-burnt border-[3px] border-bg-warm-2 rounded-full shadow-[0_0_8px_rgba(224,112,32,0.7)]" style={{ boxShadow: "0 0 0 1px #8a4022" }} />
                  <div className="sm:pt-7 pl-6 sm:pl-0">
                    <div
                      className="font-mono text-cream-dim mb-1.5 sm:mb-2 tracking-wide"
                      style={{ fontSize: "clamp(10px, 2vw, 13px)" }}
                    >
                      {job.when}
                    </div>
                    <div
                      className="font-semibold text-cream mb-0.5 sm:mb-1 leading-snug"
                      style={{ fontSize: "clamp(13px, 2.8vw, 17px)" }}
                    >
                      {job.title}
                    </div>
                    <div
                      className="text-cream-muted"
                      style={{ fontSize: "clamp(12px, 2.4vw, 15px)" }}
                    >
                      {job.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
