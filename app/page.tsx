import Nav from "@/components/Nav";
import ProgressRail from "@/components/ProgressRail";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import BuildLog from "@/components/BuildLog";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import Ticker from "@/components/Ticker";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Nav />
      <ProgressRail />
      <Hero />
      <Quote />
      <BuildLog />
      <Stack />
      <Projects />
      <Ticker />
      <Education />
      <Contact />
    </main>
  );
}
