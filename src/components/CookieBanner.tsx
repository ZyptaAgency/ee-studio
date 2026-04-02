"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function CookieBanner() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ee-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("ee-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("ee-cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[60] bg-[#111111] border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
        >
          <p className="font-body text-sm text-[#F5F5F0]/70 leading-relaxed mb-4">
            {t.cookies.text}
          </p>
          <div className="flex gap-3">
            <button
              onClick={accept}
              className="px-5 py-2 rounded-full bg-[#C3B1E1] text-[#0A0A0A] font-body text-xs font-medium tracking-wider uppercase hover:bg-[#d4c6ec] transition-colors"
            >
              {t.cookies.accept}
            </button>
            <button
              onClick={decline}
              className="px-5 py-2 rounded-full border border-white/10 text-[#F5F5F0]/60 font-body text-xs tracking-wider uppercase hover:text-[#F5F5F0] hover:border-white/20 transition-all"
            >
              {t.cookies.decline}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
