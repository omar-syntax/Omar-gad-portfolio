"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "hero",       label: "Home",        icon: "⌂" },
  { id: "about",      label: "About",       icon: "◉" },
  { id: "journey",    label: "Journey",     icon: "◈" },
  { id: "projects",   label: "Projects",    icon: "◧" },
  { id: "skills",     label: "Skills",      icon: "◎" },
  { id: "leadership", label: "Leadership",  icon: "◆" },
  { id: "media",      label: "Media",       icon: "◻" },
  { id: "vision",     label: "Vision",      icon: "◌" },
  { id: "contact",    label: "Contact",     icon: "◈" },
];

export default function Sidebar() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setVisible(window.scrollY > heroHeight * 0.7);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="sidebar"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
        >
          {navItems.map(({ id, label, icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                title={label}
                className={`group relative flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "border-white bg-white text-black"
                    : "border-white/20 bg-black/50 text-white/40 hover:border-white/60 hover:text-white"
                }`}
              >
                <span className="text-xs leading-none">{icon}</span>
                {/* Tooltip */}
                <span className="pointer-events-none absolute left-11 whitespace-nowrap rounded-md bg-white text-black text-xs font-medium px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {label}
                </span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
