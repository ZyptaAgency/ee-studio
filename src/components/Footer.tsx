"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, ArrowUpRight, AtSign } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative py-16 md:py-24 px-6 md:px-12 border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Image
              src="/logo.png"
              alt="EE Studio"
              width={60}
              height={60}
              className="w-14 h-14 object-contain"
            />
            <p className="font-body text-sm text-[#F5F5F0]/40 leading-relaxed max-w-xs">
              Creative, strategic, and operational studio. From strategy to
              impact.
            </p>
          </div>

          {/* Links */}
          <div>
            <span className="text-xs font-body tracking-[0.2em] uppercase text-[#F5F5F0]/30 block mb-6">
              Navigation
            </span>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-[#F5F5F0]/50 hover:text-[#F5F5F0] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <span className="text-xs font-body tracking-[0.2em] uppercase text-[#F5F5F0]/30 block mb-6">
              Social
            </span>
            <div className="flex gap-4">
              {[
                { Icon: AtSign, label: "Instagram", href: "#" },
                { Icon: Globe, label: "LinkedIn", href: "#" },
                { Icon: ArrowUpRight, label: "Twitter / X", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#F5F5F0]/40 hover:text-[#F5F5F0] hover:border-white/30 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[#F5F5F0]/30">
            © {new Date().getFullYear()} EE Studio SARL — All rights reserved
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-[10px] text-[#F5F5F0]/20 tracking-wider"
          >
            Crafted by Zypta
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
