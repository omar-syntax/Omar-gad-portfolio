"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  const dots = Array.from({ length: 50 });
  const circles = Array.from({ length: 4 });
  const lines = Array.from({ length: 6 });

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          x: mousePosition.x * -1,
          y: mousePosition.y * -1,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      >
        {/* Dots */}
        {dots.map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute rounded-full bg-white/30"
            style={{
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              top: `${(i * 7) % 100}%`,
              left: `${(i * 23) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.05, 0.35, 0.05],
            }}
            transition={{
              duration: 5 + (i % 8),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Large Circles */}
        {circles.map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full border border-white/5"
            style={{
              width: `${200 + i * 150}px`,
              height: `${200 + i * 150}px`,
              top: `${(i * 30) % 80}%`,
              left: `${(i * 20) % 80}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Lines */}
        {lines.map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{
              width: `${200 + (i % 3) * 100}px`,
              height: "1px",
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              rotate: `${(i * 45) % 180}deg`,
            }}
            animate={{
              opacity: [0.03, 0.15, 0.03],
            }}
            transition={{
              duration: 8 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
