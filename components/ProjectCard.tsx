"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  // Use the first image from imageFiles as cover, or a fallback
  const coverImage = project.imageFiles && project.imageFiles.length > 0 
    ? `${project.images}${project.imageFiles[0]}`
    : "/images/placeholder-project.jpg"; // Fallback placeholder

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
      className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] cursor-default"
    >
      {/* Background Image */}
      <Image
        src={coverImage}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark Overlay on Hover */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-8 text-center"
      >
        <h3 className="text-2xl font-bold mb-3 tracking-tight text-white">{project.title}</h3>
        <p className="text-sm text-white/60 mb-8 max-w-[280px] leading-relaxed">
          {project.shortDescription}
        </p>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen(project);
          }}
          className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold active:scale-95 transition-transform cursor-pointer"
        >
          Show Details
        </button>
      </motion.div>

      {/* Subtle Title Badge (Visible when not hovered) */}
      <div className="absolute top-4 left-4 flex gap-2 group-hover:opacity-0 transition-opacity">
        <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/70">
          {project.year}
        </span>
        <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/50">
          {project.type}
        </span>
      </div>

      <div className="absolute bottom-4 left-4 group-hover:opacity-0 transition-opacity">
        <h3 className="text-lg font-bold text-white drop-shadow-lg">{project.title}</h3>
      </div>
    </motion.div>
  );
}
