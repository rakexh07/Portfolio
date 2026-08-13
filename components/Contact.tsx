"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";

export default function Contact() {
  const links = [
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: profile.linkedin, href: profile.linkedinUrl },
    { label: profile.github, href: profile.githubUrl },
  ];

  return (
    <>
      <section
        id="contact"
        className="relative z-20 bg-bg px-4 sm:px-6 md:px-[8vw] pt-14 sm:pt-18 md:pt-20 lg:pt-24 pb-10 sm:pb-14 md:pb-16 border-t border-line"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 56px)",
        }}
      >
        <span className="font-mono text-accent text-[10px] sm:text-[11px] md:text-[13px] tracking-[1.3px] sm:tracking-[1.5px] md:tracking-[2px]">
          05 — Contact
        </span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="font-display uppercase leading-[0.92] tracking-[-1px] sm:tracking-[-2px] mt-3.5 sm:mt-4 md:mt-5"
          style={{ fontSize: "clamp(32px, 8.5vw, 120px)" }}
        >
          Let&apos;s <span className="text-accent">build</span>
          <br />
          something.
        </motion.h2>
        <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 flex-wrap mt-5 sm:mt-7 md:mt-10 lg:mt-12">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noreferrer" : undefined}
              className="font-mono text-[12px] sm:text-[13px] md:text-sm border-b border-line pb-1 sm:pb-1.5 hover:border-accent hover:text-accent transition-colors break-all max-w-full"
            >
              {l.label}
            </a>
          ))}
        </div>
      </section>
      <footer
        className="relative z-20 bg-bg px-4 sm:px-6 md:px-[8vw] py-4 sm:py-5 md:py-6 md:py-8 flex justify-between font-mono text-[9.5px] sm:text-[10.5px] md:text-[11.5px] text-muted border-t border-line flex-wrap gap-2 sm:gap-3"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
        }}
      >
        <div>© 2026 {profile.name}. Built with intent.</div>
        <div>{profile.location}</div>
      </footer>
    </>
  );
}
