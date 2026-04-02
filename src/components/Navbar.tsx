"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PASTEL_COLORS } from "@/lib/constants";

function NavLink({
  href,
  label,
  getColor,
}: {
  href: string;
  label: string;
  getColor: () => string;
}) {
  const [color, setColor] = useState("transparent");

  return (
    <a
      href={href}
      className="relative text-sm font-body tracking-wide text-[#F5F5F0]/70 hover:text-[#F5F5F0] transition-colors"
      onMouseEnter={() => setColor(getColor())}
      onMouseLeave={() => setColor("transparent")}
    >
      {label}
      <span
        className="absolute -bottom-1 left-0 h-[2px] w-full transition-all duration-300 origin-left"
        style={{
          backgroundColor: color,
          transform: color === "transparent" ? "scaleX(0)" : "scaleX(1)",
        }}
      />
    </a>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getNextPastel = useCallback(() => {
    const color = PASTEL_COLORS[hoverIndex % PASTEL_COLORS.length];
    setHoverIndex((i) => i + 1);
    return color;
  }, [hoverIndex]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="EE Studio"
            width={40}
            height={40}
            className="w-9 h-9 object-contain"
          />
          <span className="font-heading text-xl font-bold tracking-wider text-[#F5F5F0]">
            EE<span className="font-light">STUDIO</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              getColor={getNextPastel}
            />
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#F5F5F0]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-white/5"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-lg font-body text-[#F5F5F0]/80 hover:text-[#F5F5F0]"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
