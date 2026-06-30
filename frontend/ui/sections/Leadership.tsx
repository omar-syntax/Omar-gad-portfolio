"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const impacts = [
  {
    title: "Student Leader",
    description:
      "Appointed as a student leader at WE Applied Technology School. Responsible for welcoming and onboarding new students, organizing school events, and participating in key decision-making processes.",
  },
  {
    title: "Real Systems, Real Users",
    description:
      "Built and deployed two internal systems — a Student Grades System and a Violations Management System — that replaced fully manual processes and are used by staff and students every day.",
  },
  {
    title: "Television Appearance",
    description:
      "Was interviewed on Egyptian television about my journey, projects, and vision. Shared my story with a national audience as an 18-year-old builder making real impact.",
  },
];

export default function Leadership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section id="leadership" className="min-h-screen px-8 md:px-20 py-32 border-t border-white/5">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-widest text-white/40 mb-4"
        >
          Leadership & Impact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-white mb-20 max-w-xl"
        >
          Leading by doing.<br />
          <span className="text-white/30">Not just titles.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impacts.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="border-t-2 border-white/20 pt-8 space-y-4 hover:border-white transition-colors duration-500 group"
            >
              <h3 className="text-lg font-bold text-white group-hover:text-white">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
