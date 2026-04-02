"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { lang, toggle } = useI18n();

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 font-body text-xs tracking-wider uppercase text-[#F5F5F0]/60 hover:text-[#F5F5F0] hover:border-white/25 transition-all"
      aria-label={lang === "en" ? "Switch to French" : "Passer en anglais"}
    >
      <span className={lang === "en" ? "text-[#F5F5F0]" : "text-[#F5F5F0]/40"}>
        EN
      </span>
      <span className="text-[#F5F5F0]/20">/</span>
      <span className={lang === "fr" ? "text-[#F5F5F0]" : "text-[#F5F5F0]/40"}>
        FR
      </span>
    </motion.button>
  );
}
