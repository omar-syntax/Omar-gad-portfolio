"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

const milestones = [
  {
    year: "2015",
    phase: "The Spark",
    title: "A nine-year-old watches a video about programming",
    story:
      "Everything changed with a single YouTube video. I was 9 years old when I first understood that the screen in front of me wasn't just for consuming — it could create. I started with Python and HTML, building a calculator, breaking things, and learning obsessively.",
    tag: "Age 9 · Cairo, Egypt",
    image: null,
  },
  {
    year: "2022",
    phase: "The Turning Point",
    title: "Joining Digital Egypt Cubs Initiative (DECI)",
    story:
      "I passed the admission exams at Benha University and entered directly at Level 2. DECI exposed me to five fields in one year: Web Development, Cybersecurity, AI & Data Analysis, Embedded Systems, and UI/UX. It was the most intense, defining period of my learning.",
    tag: "Ministry of Communications × Udacity",
    image: "/images/DECI-L2-email.jpeg",
  },
  {
    year: "2023",
    phase: "Specialization",
    title: "Choosing AI despite loving Web Development",
    story:
      "When it was time to specialize, I chose AI & Data Analysis — not because it was easiest, but because it was harder and more impactful. I worked with real datasets, learned SQL, web scraping, Pandas, NumPy, Matplotlib, and built my first ML model with Linear Regression.",
    tag: "DECI Level 3 & 4 · 2023–2024",
    image: "/images/DECI-L3-email.jpeg",
  },
  {
    year: "2024",
    phase: "Real Impact",
    title: "Building systems used by real people, every day",
    story:
      "I shipped a Student Grades System and a Violations Management System — both running inside my school. I became a student leader, organized orientation days, appeared on Egyptian television, and met European Union representatives at an EduTech event in Cairo.",
    tag: "WE Applied Technology School",
    image: "/images/DECI-L4-email.jpeg",
  },
];

function MilestoneSection({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 md:px-20 py-20 relative border-t border-white/5"
    >
      {/* Large background year */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.04 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute right-8 md:right-20 top-1/2 -translate-y-1/2 text-[20vw] font-bold text-white select-none pointer-events-none leading-none"
      >
        {milestone.year}
      </motion.div>

      <div className="max-w-4xl w-full space-y-8 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-widest text-white/30"
        >
          {String(index + 1).padStart(2, "0")} / {milestones.length.toString().padStart(2, "0")} — {milestone.phase}
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl"
        >
          {milestone.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-white/50 leading-relaxed max-w-xl"
        >
          {milestone.story}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-block border border-white/20 text-white/40 text-xs px-4 py-2 rounded-full"
        >
          {milestone.tag}
        </motion.div>

        {/* Image for milestones that have one */}
        {milestone.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 relative w-full max-w-4xl mx-auto"
          >
            <div className="relative rounded-lg overflow-hidden border border-white/10 max-h-[60vh]">
              <Image
                src={milestone.image}
                alt={`${milestone.phase} - ${milestone.title}`}
                width={800}
                height={600}
                className="w-full h-auto object-contain max-w-full max-h-[60vh]"
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="relative">
      {/* Header */}
      <div className="sticky top-0 z-10 px-8 md:px-20 py-6 bg-black/80 backdrop-blur-sm border-b border-white/5">
        <p className="text-xs uppercase tracking-widest text-white/30">Journey</p>
      </div>

      {milestones.map((m, i) => (
        <MilestoneSection key={i} milestone={m} index={i} />
      ))}
    </section>
  );
}
