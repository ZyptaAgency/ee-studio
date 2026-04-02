"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { InstagramIcon, LinkedInIcon, TwitterXIcon } from "./SocialIcons";

export default function Footer() {
  const { t } = useI18n();

  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.consulting, href: "#consulting" },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="relative py-14 md:py-20 px-6 md:px-12 border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Image
              src="/logo.png"
              alt="EE Studio"
              width={160}
              height={113}
              className="h-12 w-auto object-contain"
            />
            <p className="font-body text-xs text-[#F5F5F0]/35 leading-relaxed max-w-xs text-center md:text-left">
              {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="text-center md:text-left">
            <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#F5F5F0]/25 block mb-5">
              {t.footer.navigation}
            </span>
            <nav className="flex flex-col gap-2.5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-xs text-[#F5F5F0]/45 hover:text-[#F5F5F0] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="text-center md:text-left">
            <span className="text-[10px] font-body tracking-[0.2em] uppercase text-[#F5F5F0]/25 block mb-5">
              {t.footer.social}
            </span>
            <div className="flex gap-3 justify-center md:justify-start">
              {[
                { icon: <InstagramIcon size={16} />, label: "Instagram", href: "#", color: "#E1306C", borderHover: "#E1306C" },
                { icon: <LinkedInIcon size={16} />, label: "LinkedIn", href: "#", color: "#0A66C2", borderHover: "#0A66C2" },
                { icon: <TwitterXIcon size={16} />, label: "X / Twitter", href: "#", color: "#FFFFFF", borderHover: "#FFFFFF" },
              ].map(({ icon, label, href, color, borderHover }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300"
                  style={{ color: `${color}60` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.borderColor = `${borderHover}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = `${color}60`;
                    e.currentTarget.style.borderColor = "";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
          <p className="font-body text-[11px] text-[#F5F5F0]/25">
            © {new Date().getFullYear()} EE Studio SARL — {t.footer.rights}
          </p>

          {/* Developed by Zypta.be */}
          <motion.a
            href="https://zypta.be"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2 group"
          >
            <span className="font-body text-[10px] text-[#F5F5F0]/20 tracking-wider">
              Developed by
            </span>
            <span className="font-ethnocentric text-[13px] text-[#F5F5F0]/30 group-hover:text-[#C3B1E1] transition-colors tracking-wider">
              ZYPTA
            </span>
            <span className="font-supernova text-[13px] text-[#F5F5F0]/20 group-hover:text-[#F5F5F0]/40 transition-colors">
              .be
            </span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
