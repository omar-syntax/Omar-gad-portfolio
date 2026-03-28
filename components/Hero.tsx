"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const PHRASES = [
  "Software Engineer & Future AI Founder.",
  "Building systems that matter.",
  "Driven by impact, not just code.",
  "Turning complex problems into elegant solutions.",
];

import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);

  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && text === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 2000); // Pause at end of phrase
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      timeout = setTimeout(() => { }, 500); // Small pause before typing next
    } else {
      const nextText = isDeleting
        ? currentPhrase.substring(0, text.length - 1)
        : currentPhrase.substring(0, text.length + 1);

      // Typing speed: normal when typing, slightly faster when deleting
      const speed = isDeleting ? 30 : 60;

      timeout = setTimeout(() => setText(nextText), speed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-end">
      <div className="flex-1 w-full max-w-7xl px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10 pb-12 min-h-0">

        {/* Left Side: Content */}
        <div className="flex flex-col items-start gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Engineering <br />
              <span className="text-white">
                ideas into reality.
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="min-h-[80px] md:min-h-[60px]"
          >
            <p className="text-lg md:text-xl text-white/50 max-w-lg leading-relaxed font-mono">
              <span className="text-white">{text}</span>
              <span className="inline-block w-[8px] h-[1.2em] bg-white ml-1 animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite] align-text-bottom"></span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link
              href="/about"
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none group border border-white/30 hover:border-white transition-colors duration-300"
            >
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-8 py-1 text-sm font-medium text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
                Explore My Journey
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Professional Image */}
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative w-full h-[40vh] md:h-full min-h-0 flex items-end justify-center"
        >
          <motion.div
            style={{ y: imageY, opacity: imageOpacity }}
            className="w-full h-full relative border-none flex items-end justify-center"
          >
            <Image
              src="/images/profile.png"
              alt="Omar Mohamed Gad"
              fill
              className="object-contain object-bottom pointer-events-none drop-shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
