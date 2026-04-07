"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import CookieBanner from "./CookieBanner";
import { I18nProvider } from "@/lib/i18n";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("ee-loaded");
    }
    return true;
  });
  const [showContent, setShowContent] = useState(() => {
    if (typeof window !== "undefined") {
      return !!sessionStorage.getItem("ee-loaded");
    }
    return false;
  });
  const [cookiesReady, setCookiesReady] = useState(false);

  const handleLoadingComplete = () => {
    setLoading(false);
    setShowContent(true);
    sessionStorage.setItem("ee-loaded", "1");
  };

  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => setCookiesReady(true), loading ? 800 : 200);
      return () => clearTimeout(timer);
    }
  }, [showContent, loading]);

  return (
    <I18nProvider>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {showContent && children}
      {cookiesReady && <CookieBanner />}
    </I18nProvider>
  );
}
