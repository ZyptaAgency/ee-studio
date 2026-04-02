"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import Image from "next/image";

const NAV_LINKS = [
  { label: "À propos", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { next } = usePastelRotation();
  const [hoverColors, setHoverColors] = useState<Record<string, string>>({});

  const handleHover = (key: string) => {
    setHoverColors((prev) => ({ ...prev, [key]: next() }));
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between backdrop-blur-md bg-[#0A0A0A]/80 border-b border-white/5">
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="EE Studio"
            width={140}
            height={99}
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-light tracking-wide text-[#999] hover:text-[#F5F5F0] transition-colors duration-300"
              onMouseEnter={() => handleHover(link.href)}
              style={{
                textDecorationColor: hoverColors[link.href] || "transparent",
                textDecoration: "underline",
                textUnderlineOffset: "6px",
                textDecorationThickness: "2px",
                transition: "all 0.3s ease",
              }}
              onMouseLeave={() =>
                setHoverColors((prev) => ({ ...prev, [link.href]: "transparent" }))
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-[#F5F5F0]"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col items-center justify-center gap-10"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-3xl font-['Outfit'] font-light tracking-wide"
                onClick={() => setOpen(false)}
                onMouseEnter={() => handleHover(link.href)}
                style={{ color: hoverColors[link.href] || "#F5F5F0" }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
