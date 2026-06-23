"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Typewriter from "typewriter-effect";

import Link from "next/link";

const scrollToJourney = () => {
  document.getElementById("journey")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      <div className="relative w-full max-w-7xl px-6 md:px-20 flex flex-col md:flex-row items-center justify-between z-10 gap-12 md:gap-16 text-center md:text-left">

        {/* Left: Content */}
        <div className="flex flex-col items-center md:items-start gap-6 max-w-3xl flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Engineering <br />
              <span className="text-white/60">
                ideas into reality.
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="min-h-[48px] flex items-center"
          >
            <div className="text-xl md:text-2xl font-medium font-mono text-white/80">
              <Typewriter
                options={{
                  strings: [
                    "Software Engineer",
                    "Full Stack Developer",
                    "React & TypeScript Specialist",
                    "AI Solutions Builder",
                    "System Architect",
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 100,
                  cursor: "|",
                  wrapperClassName: "typewriter-text",
                  cursorClassName: "typewriter-cursor",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap justify-center md:justify-start gap-4"
          >
            <motion.button
              onClick={scrollToJourney}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none group border border-white/30 hover:border-white transition-colors duration-300"
            >
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-8 py-1 text-sm font-medium text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
                Explore My Journey
              </span>
            </motion.button>

            <motion.a
              href="/resume.pdf"
              download="Omar_Mohamed_Gad_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none group border border-white/10 hover:border-white/40 transition-colors duration-300"
            >
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white/5 backdrop-blur-sm px-8 py-1 text-sm font-medium text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
                Download Resume
              </span>
            </motion.a>
          </motion.div>
        </div>

        {/* Right: Professional Image */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-[400px] aspect-square md:aspect-[4/3] flex-shrink-0"
        >
          <motion.div
            style={{ y: imageY, opacity: imageOpacity }}
            className="w-full h-full relative border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/profile.jpg"
              alt="Omar Mohamed Gad"
              fill
              className="object-cover pointer-events-none"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
