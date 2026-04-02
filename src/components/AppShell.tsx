"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import CookieBanner from "./CookieBanner";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [cookiesReady, setCookiesReady] = useState(false);

  const handleLoadingComplete = () => {
    setLoading(false);
    setShowContent(true);
  };

  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => setCookiesReady(true), 800);
      return () => clearTimeout(timer);
    }
  }, [showContent]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {showContent && children}
      {cookiesReady && <CookieBanner />}
    </>
  );
}
