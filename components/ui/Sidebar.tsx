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
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
        >
          {navItems.map(({ path, label, icon }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
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
              </Link>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
