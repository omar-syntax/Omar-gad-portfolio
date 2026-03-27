"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface ProjectWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export default function ProjectWindow({
  isOpen,
  onClose,
  title,
  children,
  isFullscreen,
  onToggleFullscreen
}: ProjectWindowProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />

          {/* Window Container */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] p-4 md:p-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                width: isFullscreen ? "100%" : "min(1200px, 95vw)",
                height: isFullscreen ? "100%" : "min(800px, 85vh)",
              }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`bg-[#1c1c1e] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col pointer-events-auto transition-all duration-300`}
            >
              {/* Title Bar */}
              <div className="h-10 bg-[#2c2c2e] flex items-center px-4 relative flex-shrink-0 select-none">
                {/* Traffic Lights */}
                <div className="flex gap-2 group/lights">
                  <button 
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center relative overflow-hidden active:brightness-75 transition-all"
                  >
                     <span className="opacity-0 group-hover/lights:opacity-100 text-[8px] text-black/60 font-bold">×</span>
                  </button>
                  <button 
                    className="w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center relative overflow-hidden active:brightness-75 transition-all"
                  >
                    <span className="opacity-0 group-hover/lights:opacity-100 text-[10px] text-black/60 font-bold mb-1">−</span>
                  </button>
                  <button 
                    onClick={onToggleFullscreen}
                    className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center relative overflow-hidden active:brightness-75 transition-all"
                  >
                    <span className="opacity-0 group-hover/lights:opacity-100 text-[6px] text-black/60 font-bold">↗</span>
                  </button>
                </div>

                {/* Centered Title */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-xs font-medium text-white/50 tracking-wide">{title}</span>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-auto custom-scrollbar">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
