"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface RotatingWordsProps {
  words?: string[];
  interval?: number;
  className?: string;
  wordClassName?: string;
  wordStyle?: React.CSSProperties;
  headlineLayout?: "inline" | "stacked";
}

const DEFAULT_WORDS = ["systems", "ideas", "visions", "impact"];

export default function RotatingWords({
  words = DEFAULT_WORDS,
  interval = 2500,
  className = "",
  wordClassName = "",
  wordStyle,
  headlineLayout = "inline",
}: RotatingWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [words, interval]);

  if (headlineLayout === "stacked") {
    return (
      <div className={`relative block min-h-[1em] w-full ${className}`} style={wordStyle}>
        <span className="invisible block whitespace-nowrap leading-[inherit]">
          {words.reduce((a, b) => (a.length > b.length ? a : b))}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: "40%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-40%" }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={wordStyle}
            className={`absolute left-0 top-0 block whitespace-nowrap leading-[inherit] ${wordClassName}`}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <span className={`inline-flex relative align-baseline shrink-0 ${className}`} style={wordStyle}>
      <span className="invisible whitespace-nowrap leading-[inherit]">{words.reduce((a, b) => (a.length > b.length ? a : b))}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: "55%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-55%" }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={wordStyle}
          className={`absolute left-0 top-0 whitespace-nowrap leading-[inherit] ${wordClassName}`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
