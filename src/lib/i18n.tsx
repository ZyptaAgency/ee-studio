"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { TRANSLATIONS, type Lang } from "./constants";

type TranslationType = (typeof TRANSLATIONS)[Lang];

interface I18nContextType {
  lang: Lang;
  t: TranslationType;
  toggle: () => void;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  t: TRANSLATIONS.en as TranslationType,
  toggle: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "en" ? "fr" : "en"));
  }, []);

  const t = TRANSLATIONS[lang] as TranslationType;

  return (
    <I18nContext.Provider value={{ lang, t, toggle }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
