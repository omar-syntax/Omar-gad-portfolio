"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const mediaItems = [
  {
    type: "Television",
    label: "TV Interview",
    description: "Appeared on Egyptian national television discussing my journey, projects, and vision as a young software engineer and student leader.",
    date: "2024",
  },
  {
    type: "Event",
    label: "EduTech Conference",
    description: "Attended and participated in Cairo's EduTech event, connecting with educators, technologists, and policy makers driving Egypt's digital transformation.",
    date: "2024",
  },
  {
    type: "International",
    label: "EU Representatives Meeting",
    description: "Met with representatives from the European Union at a national education initiative event. A formative experience in international exposure at age 18.",
    date: "2024",
  },
];

export default function Media() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section id="media" className="min-h-screen px-8 md:px-20 py-32 border-t border-white/5">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-widest text-white/40 mb-4"
        >
          Media & Recognition
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-white mb-20"
        >
          The world is<br />
          <span className="text-white/30">starting to notice.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mediaItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative border border-white/10 rounded-2xl p-8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/25 transition-all duration-400"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs uppercase tracking-widest text-white/30 border border-white/15 rounded-full px-3 py-1">
                  {item.type}
                </span>
                <span className="text-xs text-white/25">{item.date}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{item.label}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
