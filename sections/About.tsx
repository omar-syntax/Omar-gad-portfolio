"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function About() {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <section id="about" className="min-h-screen flex items-center px-6 md:px-20 py-24 md:py-32">
      <div ref={ref} className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* Left: Bold Statement */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-widest text-white/40 mb-6">About</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            I don&apos;t just write code.<br />
            <span className="text-white/40">I build systems</span><br />
            that matter.
          </h2>
        </motion.div>

        {/* Right: Story */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-lg text-white/60 leading-relaxed">
            At 18, I&apos;ve already shipped software that&apos;s running in real environments — a student grading system and a violations management platform, both used daily inside my school.
          </p>
          <p className="text-lg text-white/60 leading-relaxed">
            My journey started at age 9 out of pure curiosity. Since then, I&apos;ve specialized in AI & Data Analysis, led teams, appeared on television, and met with representatives from the European Union at age 17.
          </p>
          <p className="text-lg text-white/60 leading-relaxed">
            I combine deep technical skill with a leadership mindset. My goal is to build an AI startup that creates technology with real, positive impact.
          </p>

          <div className="pt-4 flex flex-wrap gap-8 md:gap-12">
            {[["9", "Age I Started Coding"], ["2", "Real Systems Built"], ["1", "TV Appearance"]].map(([num, label]) => (
              <div key={label} className="min-w-[100px]">
                <p className="text-2xl md:text-3xl font-bold text-white">{num}</p>
                <p className="text-[10px] md:text-xs text-white/40 mt-1 max-w-[80px] leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
