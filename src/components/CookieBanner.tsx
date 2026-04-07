"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { next } = usePastelRotation();
  const { t } = useI18n();
  const [acceptColor, setAcceptColor] = useState("#F5F5F0");

  useEffect(() => {
    const consent = localStorage.getItem("ee-cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("ee-cookie-consent", "all");
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("ee-cookie-consent", "essential");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-lg z-[9998] rounded-2xl border border-white/10 bg-[#111]/95 backdrop-blur-xl p-7 shadow-2xl"
        >
          <p className="text-sm text-[#CCC] font-light leading-relaxed mb-1">
            {t.cookies.text}{" "}
            <Link href="/confidentialite" className="underline text-[#999] hover:text-[#F5F5F0] transition-colors duration-300">
              {t.cookies.privacy}
            </Link>
          </p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 space-y-3 border-t border-white/5 mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#F5F5F0] font-medium">{t.cookies.essentials_title}</p>
                      <p className="text-xs text-[#666] font-light">{t.cookies.essentials_desc}</p>
                    </div>
                    <span className="text-xs text-[#555] tracking-wider">{t.cookies.always}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#F5F5F0] font-medium">{t.cookies.analytics_title}</p>
                      <p className="text-xs text-[#666] font-light">{t.cookies.analytics_desc}</p>
                    </div>
                    <span className="text-xs text-[#555] tracking-wider">{t.cookies.optional}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={handleAcceptAll}
              onMouseEnter={() => setAcceptColor(next())}
              onMouseLeave={() => setAcceptColor("#F5F5F0")}
              className="flex-1 py-2.5 rounded-full text-xs tracking-[0.1em] uppercase font-medium transition-all duration-300"
              style={{
                backgroundColor: acceptColor,
                color: "#0A0A0A",
              }}
            >
              {t.cookies.accept}
            </button>
            <button
              onClick={handleEssentialOnly}
              className="flex-1 py-2.5 rounded-full text-xs tracking-[0.1em] uppercase font-light border border-white/15 text-[#999] hover:text-[#CCC] hover:border-white/25 transition-all duration-300"
            >
              {t.cookies.essential}
            </button>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-center mt-3 text-[11px] text-[#555] hover:text-[#888] transition-colors duration-300 tracking-wider"
          >
            {expanded ? t.cookies.hide : t.cookies.customize}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
