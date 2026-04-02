"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/project";
import { projects } from "@/lib/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectWindow from "@/components/macOS/Window";
import ImageSlider from "@/components/ImageSlider";
import TerminalEmulator from "@/components/macOS/Terminal";
import NotebookViewer from "@/components/macOS/Notebook";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  useMotionValue, 
  useAnimationFrame, 
  useTransform, 
  useSpring,
  wrap 
} from "framer-motion";
import { useRef, useEffect } from "react";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { ref, isInView } = useScrollAnimation(0.2);

  const baseX = useMotionValue(0);
  const scrollVelocity = useMotionValue(0);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  const isDragging = useRef<boolean>(false);
  const isHovered = useRef<boolean>(false);

  useAnimationFrame((t, delta) => {
    // Only move if not dragging and not hovered
    if (isDragging.current || isHovered.current) return;
    
    let moveBy = directionFactor.current * -0.15 * (delta / 1000) * 10; // Even slower base speed
    
    // Add velocity momentum factor (e.g. after a scroll release)
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const handleWheel = (e: React.WheelEvent) => {
    // Only handle horizontal or heavy vertical scroll on the track
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        baseX.set(baseX.get() + e.deltaX * 0.05);
        scrollVelocity.set(e.deltaX);
    } else if (Math.abs(e.deltaY) > 5) {
        // Allow vertical scroll to also move it slightly for that "interactive" feel
        baseX.set(baseX.get() - e.deltaY * 0.05);
        scrollVelocity.set(-e.deltaY);
    }
  };

  const handleOpenProject = (project: Project) => {
    setActiveProject(project);
    setShowPreview(false);
    setIsFullscreen(false);
  };

  const handleCloseProject = () => {
    setActiveProject(null);
  };

  return (
    <section id="projects" className="min-h-screen px-6 md:px-20 py-24 md:py-32 bg-transparent">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4 font-bold">Featured Portfolio</p>
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">
            Building digital <br />
            <span className="text-white/20 italic">excellence.</span>
          </h2>
          <p className="text-white/40 max-w-2xl text-lg leading-relaxed">
            A collection of enterprise systems, productivity platforms, and data investigations
            built with a focus on performance, scalability, and user experience.
          </p>
        </div>

        {/* Infinite Horizontal Scroll */}
        <div 
            className="relative mt-12 overflow-hidden py-10 cursor-grab active:cursor-grabbing"
            onWheel={handleWheel}
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseLeave={() => { isHovered.current = false; }}
        >
          <motion.div 
            className="flex w-fit"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => { isDragging.current = true; }}
            onDragEnd={() => { isDragging.current = false; }}
            onDrag={(e, info) => {
                // Update baseX based on drag delta (normalized to percentage roughly)
                // Since we don't know the exact px width here without a ref, 
                // we can just use a constant factor for now or measure it.
                baseX.set(baseX.get() + info.delta.x * 0.05); 
                scrollVelocity.set(info.velocity.x);
            }}
          >
            {/* First Set */}
            <div className="flex gap-8 pr-8">
              {projects.map((project, index) => (
                <div key={`set1-${project.id}-${index}`} className="flex-shrink-0 w-[350px] md:w-[450px]">
                  <ProjectCard
                    project={project}
                    onOpen={handleOpenProject}
                  />
                </div>
              ))}
            </div>
            {/* Second Set */}
            <div className="flex gap-8 pr-8">
              {projects.map((project, index) => (
                <div key={`set2-${project.id}-${index}`} className="flex-shrink-0 w-[350px] md:w-[450px]">
                  <ProjectCard
                    project={project}
                    onOpen={handleOpenProject}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Gradient Overlays for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/50 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/50 to-transparent pointer-events-none z-10" />
        </div>
      </motion.div>

      {/* macOS Project Window */}
      <ProjectWindow
        isOpen={!!activeProject}
        onClose={handleCloseProject}
        title={activeProject?.title || ""}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
      >
        {activeProject && (
          <div className="flex flex-col h-full bg-[#1c1c1e] text-white overflow-y-auto">
            {/* Toggle Preview Button (Mobile Sticky) */}
            <div className="md:hidden sticky top-0 z-50 p-4 bg-[#1c1c1e]/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center">
              <span className="font-bold text-sm tracking-tight">{activeProject.title}</span>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full"
              >
                {showPreview ? "View Details" : "View Preview"}
              </button>
            </div>

            <div className={`flex flex-col ${isFullscreen ? "h-full" : ""}`}>
              {/* Top Section: Toggle between Slider and Preview */}
              <div className="relative border-b border-white/5 bg-black/20">
                <AnimatePresence mode="wait">
                  {!showPreview ? (
                    <motion.div
                      key="slider"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full"
                    >
                      <ImageSlider
                        images={activeProject.imageFiles ? activeProject.imageFiles.map(f => `${activeProject.images}${f}`) : []}
                        title={activeProject.title}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full aspect-video md:h-[500px]"
                    >
                      {activeProject.preview.type === "iframe" && (
                        <iframe
                          src={activeProject.preview.url}
                          className="w-full h-full border-none bg-white"
                          title={`${activeProject.title} Preview`}
                        />
                      )}
                      {activeProject.preview.type === "terminal" && <TerminalEmulator />}
                      {activeProject.preview.type === "notebook" && (
                        <div className="h-full overflow-auto custom-scrollbar">
                          <NotebookViewer fileUrl={activeProject.preview.file || ""} />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Desktop Toggle Preview */}
                <div className="hidden md:flex absolute bottom-6 right-6 gap-3 z-30">
                  <button
                    onClick={() => setShowPreview(false)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${!showPreview ? "bg-white text-black border-white" : "bg-black/60 text-white border-white/20 backdrop-blur-md hover:border-white/40"}`}
                  >
                    Screenshots
                  </button>
                  <button
                    onClick={() => setShowPreview(true)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${showPreview ? "bg-white text-black border-white" : "bg-black/60 text-white border-white/20 backdrop-blur-md hover:border-white/40"}`}
                  >
                    Interactive Preview
                  </button>
                </div>
              </div>

              {/* Bottom Section: Details */}
              <div className="p-6 md:p-12 max-w-4xl">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-white/40 font-mono text-sm tracking-widest">{activeProject.year} · {activeProject.type}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border ${activeProject.status === "Live" ? "text-green-400 border-green-500/30 bg-green-500/5" :
                      activeProject.status === "In Development" ? "text-yellow-400 border-yellow-500/30 bg-yellow-500/5" :
                        "text-blue-400 border-blue-500/30 bg-blue-500/5"
                    }`}>
                    {activeProject.status}
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">{activeProject.title}</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-10">
                  <div className="md:col-span-2 space-y-8">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-4">Description</h4>
                      <p className="text-white/60 leading-relaxed text-lg italic tracking-tight font-light font-serif">
                        "{activeProject.description}"
                      </p>
                    </div>

                    <div className="flex gap-4">
                      {activeProject.links.site && (
                        <a
                          href={activeProject.links.site}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-white text-black px-8 py-3 rounded-xl font-bold text-sm tracking-tight active:scale-95 transition-transform"
                        >
                          Visit Live Site
                        </a>
                      )}
                      {activeProject.links.github && (
                        <a
                          href={activeProject.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="border border-white/10 hover:border-white/30 px-8 py-3 rounded-xl font-bold text-sm tracking-tight active:scale-95 transition-transform"
                        >
                          View Repository
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-4">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tech.map(t => (
                          <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/70">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ProjectWindow>
    </section>
  );
}
