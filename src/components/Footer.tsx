"use client";
import Image from "next/image";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "À propos", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
];

export default function Footer() {
  const { next } = usePastelRotation();
  const [hoverColors, setHoverColors] = useState<Record<string, string>>({});

  const handleHover = (key: string) => {
    setHoverColors((prev) => ({ ...prev, [key]: next() }));
  };

  return (
    <footer className="border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Top section: logo + nav + socials */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Logo + description */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start">
            <Image
              src="/logo.png"
              alt="EE Studio"
              width={240}
              height={170}
              className="h-16 md:h-20 w-auto object-contain mb-5"
            />
            <p className="text-sm text-[#777] font-light leading-relaxed max-w-xs text-center md:text-left">
              Studio créatif, stratégique et opérationnel basé à Kinshasa. De la stratégie à l&apos;exécution.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#555] mb-5 font-medium">
              Navigation
            </p>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#888] hover:text-[#F5F5F0] transition-colors duration-300 font-light"
                  onMouseEnter={() => handleHover(link.label)}
                  onMouseLeave={() =>
                    setHoverColors((prev) => ({ ...prev, [link.label]: "" }))
                  }
                  style={{
                    color: hoverColors[link.label] || undefined,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials + contact */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#555] mb-5 font-medium">
              Suivez-nous
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-sm text-[#888] hover:text-[#F5F5F0] transition-colors duration-300 font-light"
                  onMouseEnter={() => handleHover(s.label)}
                  onMouseLeave={() =>
                    setHoverColors((prev) => ({ ...prev, [s.label]: "" }))
                  }
                  style={{
                    color: hoverColors[s.label] || undefined,
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#555] mb-3 font-medium">
              Contact
            </p>
            <a
              href="mailto:contact@ee-studio.info"
              className="text-sm text-[#888] hover:text-[#F5F5F0] transition-colors duration-300 font-light"
            >
              contact@ee-studio.info
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#555] font-light">
            © {new Date().getFullYear()} EE Studio SARL — Tous droits réservés
          </p>
          <a
            href="https://zypta.be"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#444] hover:text-[#888] transition-colors duration-300 tracking-wider"
          >
            Developed by{" "}
            <span className="font-ethnocentric">ZYP</span>
            <span className="font-supernova">TA</span>
            <span className="text-[#555]">.be</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
