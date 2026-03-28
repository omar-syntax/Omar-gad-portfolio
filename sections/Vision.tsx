"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Vision() {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <section id="vision" className="min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-24 md:py-32 border-t border-white/5 relative overflow-hidden">

      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <p className="text-[20vw] font-bold text-white/[0.025] whitespace-nowrap">FUTURE</p>
      </div>

      <div ref={ref} className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-widest text-white/30"
        >
          Vision
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-3xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
        >
          I&apos;m building toward<br />
          <span className="text-white/30">something bigger.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
        >
          My goal is to build an AI startup that solves real, meaningful problems — the kind of problems that affect millions of people but haven&apos;t yet been solved by technology.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base text-white/30 max-w-xl mx-auto leading-relaxed"
        >
          I&apos;m 18. I&apos;ve already shipped software used by real people. I&apos;ve led teams. I&apos;ve appeared on television. And I&apos;m just getting started.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-16 h-px bg-white/30 mx-auto"
        />
      </div>
    </section>
  );
}
