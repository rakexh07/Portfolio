"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import RotatingWords from "./RotatingWords";

const socials = [
  {
    label: "LinkedIn",
    href: profile.linkedinUrl,
    Icon: Linkedin,
  },
  {
    label: "GitHub",
    href: profile.githubUrl,
    Icon: Github,
  },
];

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        className="relative z-20 overflow-hidden border-t border-burnt/15"
        style={{
          minHeight: "92svh",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 40px)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 28px)",
          background:
            "radial-gradient(ellipse at 10% 0%, rgba(251,146,60,0.10), transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(127,29,29,0.30), transparent 55%), linear-gradient(180deg, #3d1509 0%, #4a1c0d 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-15 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(#fef3c7 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative w-full min-h-[calc(92svh-68px)] flex items-center px-3 sm:px-5 md:px-10 lg:px-[8vw] py-6 sm:py-10 md:py-14 lg:py-16">
          <div className="relative w-full flex flex-col md:flex-row md:items-center md:justify-between gap-8 sm:gap-10 md:gap-14 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:flex-[1.2] w-full max-w-[100%]"
            >
              <div className="flex flex-col items-start justify-center leading-none tracking-tight text-cream w-full">
                <span
                  className="font-display uppercase block"
                  style={{
                    fontSize: "clamp(22px, 5.2vw, 68px)",
                    lineHeight: "1.05",
                    letterSpacing: "-0.01em",
                    textShadow: "0 2px 16px rgba(0,0,0,0.22)",
                  }}
                >
                  Let&apos;s build
                </span>
                <div className="w-full mt-1 sm:mt-1.5 md:mt-2">
                  <RotatingWords
                    wordClassName="font-serif italic font-semibold whitespace-nowrap text-cream"
                    wordStyle={{
                      fontSize: "clamp(22px, 5.2vw, 68px)",
                      lineHeight: "1.05",
                      textShadow: "0 4px 28px rgba(0,0,0,0.28)",
                      letterSpacing: "-0.015em",
                    }}
                    className="leading-none"
                    headlineLayout="stacked"
                  />
                </div>
                <span
                  className="font-display uppercase block mt-1 sm:mt-1.5 md:mt-2"
                  style={{
                    fontSize: "clamp(22px, 5.2vw, 68px)",
                    lineHeight: "1.05",
                    letterSpacing: "-0.01em",
                    textShadow: "0 2px 16px rgba(0,0,0,0.22)",
                  }}
                >
                  together
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
              className="md:flex-1 flex flex-col items-stretch md:items-end w-full gap-2.5 sm:gap-3.5 md:gap-4 max-w-full md:max-w-[440px]"
            >
              <a
                href={`mailto:${profile.email}`}
                className="group relative inline-flex items-center gap-2.5 sm:gap-3 md:gap-4 rounded-xl sm:rounded-2xl border border-cream/20 bg-cream/[0.05] backdrop-blur-sm w-full transition-all duration-350 hover:border-cream/55 hover:bg-cream/12 hover:-translate-y-0.5 hover:shadow-[0_14px_42px_-18px_rgba(224,112,32,0.55)]"
                style={{
                  padding: "clamp(11px, 2.2vw, 18px) clamp(13px, 2.6vw, 22px)",
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none opacity-70"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(251,146,60,0.08), transparent 45%, rgba(127,29,29,0.1) 100%)",
                  }}
                />
                <span
                  className="relative inline-flex items-center justify-center rounded-lg border border-cream/20 bg-burnt/10 text-cream group-hover:border-burnt/55 group-hover:bg-burnt/22 group-hover:text-gold transition-all duration-350 flex-none"
                  style={{
                    width: "clamp(34px, 7vw, 44px)",
                    height: "clamp(34px, 7vw, 44px)",
                  }}
                >
                  <Mail
                    style={{
                      width: "clamp(16px, 3.5vw, 22px)",
                      height: "clamp(16px, 3.5vw, 22px)",
                    }}
                    strokeWidth={1.75}
                    className="transition-all duration-350 group-hover:scale-110 group-hover:-translate-y-0.5"
                  />
                </span>
                <span className="relative flex-col min-w-0 flex-1">
                  <span
                    className="block font-mono uppercase tracking-[0.15em] sm:tracking-[0.16em] text-cream-dim mb-0.5"
                    style={{ fontSize: "clamp(8px, 1.8vw, 11px)" }}
                  >
                    Email
                  </span>
                  <span
                    className="block font-serif italic text-cream truncate group-hover:text-gold transition-colors duration-300"
                    style={{ fontSize: "clamp(13px, 3vw, 19px)" }}
                  >
                    {profile.email}
                  </span>
                </span>
              </a>

              {socials.map((s, i) => {
                const Icon = s.Icon;
                const handle = s.label === "LinkedIn"
                  ? profile.linkedin.replace("linkedin.com/in/", "@")
                  : profile.github.replace("github.com/", "@");
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    className="group relative inline-flex items-center gap-2.5 sm:gap-3 md:gap-4 rounded-xl sm:rounded-2xl border border-cream/20 bg-cream/[0.05] backdrop-blur-sm w-full transition-all duration-350 hover:border-cream/55 hover:bg-cream/12 hover:-translate-y-0.5 hover:shadow-[0_14px_42px_-18px_rgba(224,112,32,0.55)]"
                    style={{
                      padding: "clamp(11px, 2.2vw, 18px) clamp(13px, 2.6vw, 22px)",
                      transitionDelay: `${(i + 1) * 60}ms`,
                    }}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none opacity-70"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(251,146,60,0.08), transparent 45%, rgba(127,29,29,0.1) 100%)",
                      }}
                    />
                    <span
                      className="relative inline-flex items-center justify-center rounded-lg border border-cream/20 bg-burnt/10 text-cream group-hover:border-burnt/55 group-hover:bg-burnt/22 group-hover:text-gold transition-all duration-350 flex-none"
                      style={{
                        width: "clamp(34px, 7vw, 44px)",
                        height: "clamp(34px, 7vw, 44px)",
                      }}
                    >
                      <Icon
                        style={{
                          width: "clamp(16px, 3.5vw, 22px)",
                          height: "clamp(16px, 3.5vw, 22px)",
                        }}
                        strokeWidth={1.75}
                        className="transition-all duration-350 group-hover:scale-110 group-hover:-translate-y-0.5"
                      />
                    </span>
                    <span className="relative flex-col min-w-0 flex-1">
                      <span
                        className="block font-mono uppercase tracking-[0.15em] sm:tracking-[0.16em] text-cream-dim mb-0.5"
                        style={{ fontSize: "clamp(8px, 1.8vw, 11px)" }}
                      >
                        {s.label}
                      </span>
                      <span
                        className="block font-serif italic text-cream truncate group-hover:text-gold transition-colors duration-300"
                        style={{ fontSize: "clamp(13px, 3vw, 19px)" }}
                      >
                        {handle}
                      </span>
                    </span>
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <footer
        className="relative z-20 px-3 sm:px-5 md:px-10 lg:px-[8vw] py-2.5 sm:py-3 md:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-2 font-mono text-cream-muted"
        style={{
          background: "linear-gradient(180deg, #3d1509 0%, #2d1006 100%)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
          fontSize: "clamp(9px, 2vw, 12px)",
        }}
      >
        <div>© 2026 {profile.name}. Built with intent.</div>
        <div>{profile.location}</div>
      </footer>
    </>
  );
}
