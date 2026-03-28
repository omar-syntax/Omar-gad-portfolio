"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const skillCategories = [
  {
    category: "Frontend",
    skills: ["HTML & CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    category: "AI & Data",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Machine Learning", "Linear Regression", "Web Scraping"],
  },
  {
    category: "Tools & Backend",
    skills: ["MySQL", "SQL", "Git & GitHub", "Data Analysis", "REST APIs", "VS Code"],
  },
];

export default function Skills() {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <section id="skills" className="min-h-screen px-6 md:px-20 py-24 md:py-32 border-t border-white/5">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-widest text-white/40 mb-4"
        >
          Skills
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold text-white mb-12 md:mb-20"
        >
          The tools behind<br />
          <span className="text-white/30">the work.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-6 pb-4 border-b border-white/10">
                {cat.category}
              </p>
              <div className="flex flex-col gap-4">
                {cat.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3 group">
                    <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-white transition-colors duration-300" />
                    <span className="text-white/60 group-hover:text-white transition-colors duration-300 text-sm">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
