import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Sidebar from "@/components/ui/Sidebar";
import Hero from "@/components/Hero";
import About from "@/sections/About";
import Journey from "@/sections/Journey";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Leadership from "@/sections/Leadership";
import Media from "@/sections/Media";
import Vision from "@/sections/Vision";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <main className="relative text-white">
      {/* Fixed background geo-pattern */}
      <AnimatedBackground />
      {/* Fixed left sidebar — appears after scrolling past Hero */}
      <Sidebar />

      {/* All sections */}
      <div id="hero">
        <Hero />
      </div>
      <About />
      <Journey />
      <Projects />
      <Skills />
      <Leadership />
      <Media />
      <Vision />
      <Contact />
    </main>
  );
}
