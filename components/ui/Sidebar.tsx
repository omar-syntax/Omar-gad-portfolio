"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { path: "/",          label: "Home",        icon: "⌂" },
  { path: "/about",     label: "About",       icon: "◉" },
  { path: "/journey",   label: "Journey",     icon: "◈" },
  { path: "/projects",  label: "Projects",    icon: "◧" },
  { path: "/media",     label: "Media",       icon: "◻" },
  { path: "/contact",    label: "Contact",     icon: "◈" },
];

export default function Sidebar() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Show sidebar immediately if not on the home page hero section
    if (pathname !== "/") {
      setVisible(true);
      return;
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setVisible(window.scrollY > heroHeight * 0.7);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="sidebar"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-1/2 -translate-x-1/2 bottom-8 md:left-5 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:bottom-auto z-[100] flex flex-row md:flex-col gap-2 md:gap-2 p-2 md:p-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          {navItems.map(({ path, label, icon }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={`group relative flex items-center justify-center w-10 h-10 md:w-9 md:h-9 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black shadow-lg shadow-white/20 scale-110"
                    : "text-white/40 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-sm md:text-sm leading-none">{icon}</span>
                {/* Tooltip - Desktop Only or refined for mobile */}
                <span className="pointer-events-none absolute bottom-14 md:bottom-auto md:left-11 whitespace-nowrap rounded-md bg-white text-black text-[10px] md:text-xs font-bold px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 md:translate-y-0 md:-translate-x-2 md:group-hover:translate-x-0 shadow-xl">
                  {label}
                </span>
                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute -bottom-1 w-1 h-1 bg-white rounded-full md:hidden"
                  />
                )}
              </Link>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
