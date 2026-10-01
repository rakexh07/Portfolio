"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import ProgressRail from "@/components/ProgressRail";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Loader from "@/components/Loader";

const LOADER_SESSION_KEY = "rakesh-portfolio-seen-loader-v1";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const seen = window.sessionStorage.getItem(LOADER_SESSION_KEY);
      if (seen === "1") {
        setLoading(false);
      }
    } catch {
    }
  }, []);

  function handleLoaderComplete() {
    setLoading(false);
    try {
      window.sessionStorage.setItem(LOADER_SESSION_KEY, "1");
    } catch {
    }
  }

  return (
    <>
      {mounted && loading && <Loader onComplete={handleLoaderComplete} />}
      <div
        className={`transition-opacity duration-500 ${
          mounted && loading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Nav />
        <ProgressRail />
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </div>
    </>
  );
}
