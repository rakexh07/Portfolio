"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SectionHead from "./SectionHead";
import { projects } from "@/lib/data";

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 15 });
  const sy = useSpring(my, { stiffness: 150, damping: 15 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="border border-line bg-panel px-3.5 sm:px-4 md:px-6 lg:px-7 pt-4 sm:pt-5 md:pt-7 lg:pt-8 pb-3.5 sm:pb-4 md:pb-6 lg:pb-7 rounded-sm flex flex-col min-h-[210px] sm:min-h-[240px] md:min-h-[290px] lg:min-h-[310px] hover:border-accentDim transition-colors"
    >
      <span className="font-mono text-[10.5px] sm:text-[11px] md:text-xs text-accent tracking-wide uppercase">
        {project.tag}
      </span>
      <h3 className="text-[14px] sm:text-[15px] md:text-base lg:text-lg mt-2 sm:mt-2.5 md:mt-3.5 leading-snug font-semibold">
        {project.title}
      </h3>
      <p className="text-muted text-[12px] sm:text-[12.5px] md:text-sm leading-relaxed mt-2 sm:mt-2.5 md:mt-3.5 flex-1">
        {project.description}
      </p>
      <div className="mt-3 sm:mt-4 md:mt-5 pt-2.5 sm:pt-3 md:pt-4 border-t border-line flex items-center justify-between gap-2.5 sm:gap-3 min-w-0">
        <span className="font-mono text-[10.5px] sm:text-[11px] md:text-[11.5px] text-muted truncate min-w-0">
          {project.stackLine}
        </span>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none w-7 h-7 sm:w-8 sm:h-8 rounded-md border border-line flex items-center justify-center text-muted hover:text-accent hover:border-accent/60 hover:bg-accent/5 transition-all duration-200"
          aria-label="View source on GitHub"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-20 bg-bg px-4 sm:px-6 md:px-[8vw] pb-14 sm:pb-18 md:pb-24 lg:pb-28 border-t border-line"
    >
      <SectionHead
        idx="03 — Projects"
        title="Selected builds"
        description="Computer vision, applied ML, and full-stack web systems."
        className="px-0"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-2 sm:mt-3 md:mt-6 lg:mt-8">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}
