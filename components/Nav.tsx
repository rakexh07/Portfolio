"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "#hero", label: "Home", active: true },
    { href: "#buildlog", label: "Build Log", active: false },
    { href: "#stack", label: "Stack", active: false },
    { href: "#projects", label: "Projects", active: false },
    { href: "#education", label: "Education", active: false },
    { href: "#contact", label: "Contact", active: false },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
      style={{ paddingTop: "env(safe-area-inset-top, 12px)" }}
    >
      <div className="pointer-events-none px-3 sm:px-5 md:px-8 pt-[18px]">
        <div className="flex items-start justify-between gap-3">
          <div className="hidden lg:flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-wide text-muted pt-1.5 min-w-[180px]">
            <div className="w-5 h-5 rounded-full border border-line flex items-center justify-center flex-none">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <div className="text-fg uppercase font-semibold text-[10px] tracking-[1.5px]">Location</div>
              <div className="truncate max-w-[150px]">{profile.location}</div>
            </div>
          </div>

          <div className="relative flex-1 flex flex-col items-center pointer-events-auto">
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              onMouseEnter={() => setIsOpen(true)}
              className="font-display text-[11px] sm:text-xs md:text-sm tracking-wider px-4 sm:px-5 md:px-6 py-1.5 sm:py-1.75 md:py-2 rounded-full bg-panel border border-line shadow-[0_4px_24px_rgba(0,0,0,0.4)] cursor-pointer relative z-20 hover:bg-bg2"
            >
              RAKESH<span className="text-accent">.</span>DEV
            </button>

            <div
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              className={`mt-[-6px] pt-[6px] w-full max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-5xl transition-all duration-400 ease-out origin-top ${
                isOpen
                  ? "opacity-100 translate-y-0 scale-y-100"
                  : "opacity-0 -translate-y-3 scale-y-95 pointer-events-none"
              }`}
            >
              <nav className="w-full rounded-lg sm:rounded-xl md:rounded-2xl bg-panel border border-line shadow-[0_8px_28px_rgba(0,0,0,0.5)] px-1.5 sm:px-2 md:px-3.5 lg:px-3.5 py-1.5 sm:py-2 md:py-3 lg:py-2.5">
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 sm:gap-1 md:gap-1.5 lg:gap-1">
                  {links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex flex-col items-center justify-center gap-0.5 sm:gap-0.5 md:gap-1 lg:gap-0.5 px-1 sm:px-1.5 md:px-2 lg:px-1.5 py-1.5 sm:py-1.5 md:py-2.5 lg:py-2 rounded-md sm:rounded-lg md:rounded-xl lg:rounded-lg transition-all duration-200 ${
                          l.active
                            ? "bg-accent text-bg shadow-[0_2px_10px_rgba(198,255,61,0.22)]"
                            : "text-fg hover:bg-line/50"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 sm:w-1.75 sm:h-1.75 md:w-2 md:h-2 rounded-full transition-all duration-200 ${
                            l.active ? "bg-bg" : "bg-muted hover:bg-fg"
                          }`}
                        />
                        <span
                          className={`font-mono uppercase tracking-[0.5px] sm:tracking-[1px] md:tracking-[1.25px] lg:tracking-[1px] font-semibold text-[8px] sm:text-[8.5px] md:text-[10.5px] lg:text-[9.5px] whitespace-nowrap text-center leading-tight ${
                            l.active ? "text-bg" : "text-fg/90"
                          }`}
                        >
                          {l.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-end gap-2 font-mono text-[9px] sm:text-[10px] tracking-wide text-muted pt-1.5 min-w-[180px]">
            <div className="text-right">
              <div className="text-fg uppercase font-semibold text-[10px] tracking-[1.5px]">Get in Touch</div>
              <div className="truncate max-w-[150px]">{profile.email}</div>
            </div>
            <div className="w-5 h-5 rounded-full border border-line flex items-center justify-center flex-none">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
