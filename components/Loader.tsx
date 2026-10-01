"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

const TARGET_NAME = "Rakesh";
const TYPE_INTERVAL = 210;
const PAUSE_AFTER_COMPLETE = 900;
const FADE_OUT_DURATION = 600;

export default function Loader({ onComplete }: LoaderProps) {
  const [typed, setTyped] = useState("");
  const [stage, setStage] = useState<"typing" | "paused" | "fading">("typing");

  useEffect(() => {
    if (stage !== "typing") return;
    if (typed.length >= TARGET_NAME.length) {
      setStage("paused");
      return;
    }
    const id = window.setTimeout(() => {
      setTyped(TARGET_NAME.slice(0, typed.length + 1));
    }, TYPE_INTERVAL);
    return () => window.clearTimeout(id);
  }, [typed, stage]);

  useEffect(() => {
    if (stage !== "paused") return;
    const id = window.setTimeout(() => {
      setStage("fading");
    }, PAUSE_AFTER_COMPLETE);
    return () => window.clearTimeout(id);
  }, [stage]);

  useEffect(() => {
    if (stage !== "fading") return;
    const id = window.setTimeout(() => {
      onComplete();
    }, FADE_OUT_DURATION);
    return () => window.clearTimeout(id);
  }, [stage, onComplete]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === "fading" ? 0 : 1 }}
        transition={{ duration: FADE_OUT_DURATION / 1000, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden"
        style={{ background: "#000000" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative flex items-baseline justify-center px-6 sm:px-8"
        >
          <span
            className="font-script leading-none tracking-wide select-none"
            style={{
              color: "#d4af37",
              fontSize: "clamp(40px, 11vw, 104px)",
              fontWeight: 500,
            }}
          >
            {typed}
          </span>
          <span
            className="ml-0.5 sm:ml-1 inline-block w-[1.2px] sm:w-[1.5px] rounded-full caret-blink align-middle"
            style={{
              background: "#d4af37",
              height: "0.8em",
              marginTop: "-0.02em",
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
