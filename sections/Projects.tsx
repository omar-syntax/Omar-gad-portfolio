"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const projects = [
  {
    number: "01",
    title: "Student Grades System",
    problem: "Manual grade entry was error-prone and time-consuming for teachers.",
    impact: "Deployed inside WE ATS school. Used by staff and students every semester.",
    stack: ["Python", "MySQL", "HTML/CSS"],
  },
  {
    number: "02",
    title: "Violations Management System",
    problem: "School leaders had no efficient way to track, log, and review student violations.",
    impact: "Replaced a fully manual paper-based process. Adopted by school administration.",
    stack: ["Python", "MySQL", "Bootstrap"],
  },
  {
    number: "03",
    title: "Boostly",
    problem: "Students lacked a centralized productivity and task management platform tailored to their needs.",
    impact: "A full productivity platform built from scratch with a focus on deep work and focus sessions.",
    stack: ["Next.js", "Tailwind CSS", "JavaScript"],
  },
];

export default function Projects() {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <section id="projects" className="min-h-screen px-8 md:px-20 py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto"
      >
        <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Projects</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-20">
          Built for real people,<br />
          <span className="text-white/30">with real impact.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-500 hover:-translate-y-1 bg-white/[0.02] hover:bg-white/[0.04]"
            >
              <p className="text-4xl font-bold text-white/10 mb-6 group-hover:text-white/20 transition-colors">{project.number}</p>
              <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
              
              <p className="text-sm text-white/40 mb-4 leading-relaxed">
                <span className="text-white/20 uppercase tracking-wider text-xs">Problem: </span>
                {project.problem}
              </p>
              <p className="text-sm text-white/60 mb-6 leading-relaxed">
                <span className="text-white/30 uppercase tracking-wider text-xs">Impact: </span>
                {project.impact}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map(tech => (
                  <span key={tech} className="text-xs border border-white/15 text-white/40 px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
