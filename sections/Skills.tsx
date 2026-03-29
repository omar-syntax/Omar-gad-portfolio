"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiBootstrap, SiHtml5, SiCss,
  SiPython, SiPandas, SiNumpy, SiScikitlearn, SiMysql, SiFirebase, SiSupabase, SiGit, SiGithub
} from "react-icons/si";
import { LucideIcon, Code2, Brain, Database, Wrench } from "lucide-react";

interface Skill {
  name: string;
  proficiency: number;
  icon: any;
}

interface SkillCategory {
  category: string;
  icon: LucideIcon;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Frontend Development",
    icon: Code2,
    skills: [
      { name: "React", proficiency: 90, icon: SiReact },
      { name: "Next.js", proficiency: 85, icon: SiNextdotjs },
      { name: "TypeScript", proficiency: 88, icon: SiTypescript },
      { name: "Tailwind CSS", proficiency: 92, icon: SiTailwindcss },
      { name: "HTML/CSS", proficiency: 95, icon: SiCss },
      { name: "Bootstrap", proficiency: 80, icon: SiBootstrap },
    ],
  },
  {
    category: "AI & Data Analysis",
    icon: Brain,
    skills: [
      { name: "Python", proficiency: 90, icon: SiPython },
      { name: "Pandas", proficiency: 85, icon: SiPandas },
      { name: "NumPy", proficiency: 80, icon: SiNumpy },
      { name: "Machine Learning", proficiency: 75, icon: SiScikitlearn },
      { name: "Web Scraping", proficiency: 85, icon: SiPython },
      { name: "Data Visualization", proficiency: 88, icon: SiPython },
    ],
  },
  {
    category: "Backend & Tools",
    icon: Database,
    skills: [
      { name: "Firebase", proficiency: 80, icon: SiFirebase },
      { name: "Supabase", proficiency: 75, icon: SiSupabase },
      { name: "MySQL / SQL", proficiency: 85, icon: SiMysql },
      { name: "REST APIs", proficiency: 88, icon: Database },
      { name: "Git / GitHub", proficiency: 90, icon: SiGit },
      { name: "Google Apps Script", proficiency: 82, icon: SiTypescript },
    ],
  },
  {
    category: "Development Tools",
    icon: Wrench,
    skills: [
      { name: "Antigravity (AI)", proficiency: 98, icon: Brain },
      { name: "VS Code", proficiency: 95, icon: Code2 },
      { name: "Data Analysis Tools", proficiency: 85, icon: Wrench },
      { name: "Version Control", proficiency: 90, icon: SiGithub },
      { name: "CI/CD Basics", proficiency: 70, icon: SiGit },
    ],
  },
];

const SkillBar = ({ proficiency, isInView }: { proficiency: number, isInView: boolean }) => (
  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
    <motion.div
      initial={{ width: 0 }}
      animate={isInView ? { width: `${proficiency}%` } : { width: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
    />
  </div>
);

export default function Skills() {
  const { ref, isInView } = useScrollAnimation(0.1);

  return (
    <section id="skills" className="min-h-screen px-6 md:px-20 py-24 md:py-32 border-t border-white/5">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Expertise</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            The tools behind<br />
            <span className="text-white/30">the digital craft.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:border-white/20 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-white/10 text-white group-hover:scale-110 transition-transform duration-500">
                  <cat.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white tracking-tight">{cat.category}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <skill.icon className="text-white/50 group-hover:text-white transition-colors duration-300" size={16} />
                        <span className="text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-white/30 font-mono">{skill.proficiency}%</span>
                    </div>
                    <SkillBar proficiency={skill.proficiency} isInView={isInView} />
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
