"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { next } = usePastelRotation();
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
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:max-w-md z-[9998] rounded-2xl border border-white/10 bg-[#111]/95 backdrop-blur-xl p-6 shadow-2xl"
        >
          <p className="text-sm text-[#CCC] font-light leading-relaxed mb-1">
            Ce site utilise des cookies pour améliorer votre expérience.
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
                      <p className="text-sm text-[#F5F5F0] font-medium">Essentiels</p>
                      <p className="text-xs text-[#666] font-light">Fonctionnement du site</p>
                    </div>
                    <span className="text-xs text-[#555] tracking-wider">TOUJOURS ACTIFS</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#F5F5F0] font-medium">Analytiques</p>
                      <p className="text-xs text-[#666] font-light">Comprendre l&apos;utilisation du site</p>
                    </div>
                    <span className="text-xs text-[#555] tracking-wider">OPTIONNELS</span>
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
              Tout accepter
            </button>
            <button
              onClick={handleEssentialOnly}
              className="flex-1 py-2.5 rounded-full text-xs tracking-[0.1em] uppercase font-light border border-white/15 text-[#999] hover:text-[#CCC] hover:border-white/25 transition-all duration-300"
            >
              Essentiels uniquement
            </button>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-center mt-3 text-[11px] text-[#555] hover:text-[#888] transition-colors duration-300 tracking-wider"
          >
            {expanded ? "Masquer les détails" : "Personnaliser"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
