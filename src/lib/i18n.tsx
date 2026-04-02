"use client";
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Lang = "fr" | "en";

const translations = {
  fr: {
    nav: {
      about: "À propos",
      services: "Services",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    hero: {
      subtitle: "Stratégie. Création. Impact.",
      cta: "Découvrir",
      scroll: "Scroll",
    },
    about: {
      label: "À propos",
      title_prefix: "Un studio ",
      keywords: ["créatif", "stratégique", "opérationnel", "durable"],
      and: " et ",
      p1: "EE Studio est un studio créatif et stratégique basé à Kinshasa, fondé par Lise-Laure. Nous accompagnons les marques dans leur développement marketing — de la réflexion stratégique à la production de contenu, en passant par l'exécution terrain.",
      p2: "Notre différence : une approche 360° qui combine marketing, production audiovisuelle et consulting en développement durable. On ne conseille pas seulement — on produit, on livre, on exécute.",
    },
    services: {
      label: "Nos expertises",
      title: "Services",
    },
    differentiators: {
      label: "Pourquoi nous",
      title_prefix: "Ce qui nous ",
      title_highlight: "différencie",
      items: [
        { label: "360°", title: "Approche globale", desc: "De la stratégie à la création, jusqu'au terrain." },
        { label: "100%", title: "Production interne", desc: "Matériel audiovisuel pro intégré, sans intermédiaire." },
        { label: "2 en 1", title: "Marketing + ESG", desc: "Double compétence rare, une vision unique." },
        { label: "Action", title: "On exécute", desc: "Pas seulement du conseil — on produit et on livre." },
      ],
    },
    portfolio: {
      label: "Réalisations",
      title: "Portfolio",
      projects: [
        { title: "Campagne Digitale", category: "Marketing" },
        { title: "Identité Visuelle", category: "Branding" },
        { title: "Couverture Événement", category: "Audiovisuel" },
        { title: "Stratégie ESG", category: "Consulting" },
      ],
      coming: "Plus de projets à venir —",
      stay: "Restez connectés",
    },
    contact: {
      label: "Contact",
      title_prefix: "Travaillons ",
      title_highlight: "ensemble",
      name: "Votre nom",
      email: "Votre email",
      message: "Votre message",
      send: "Envoyer",
      location_label: "Localisation",
    },
    footer: {
      desc: "Studio créatif, stratégique et opérationnel basé à Kinshasa.",
      rights: "Tous droits réservés",
    },
    cookies: {
      text: "Ce site utilise des cookies pour améliorer votre expérience.",
      accept: "Tout accepter",
      essential: "Essentiels uniquement",
      customize: "Personnaliser",
      hide: "Masquer les détails",
      essentials_title: "Essentiels",
      essentials_desc: "Fonctionnement du site",
      always: "TOUJOURS ACTIFS",
      analytics_title: "Analytiques",
      analytics_desc: "Comprendre l'utilisation du site",
      optional: "OPTIONNELS",
    },
    servicePage: {
      back: "Retour",
      whatWeDo: "Ce que nous faisons",
      projectInMind: "Un projet en tête ?",
      contactUs: "Nous contacter",
    },
  },
  en: {
    nav: {
      about: "About",
      services: "Services",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    hero: {
      subtitle: "Strategy. Creation. Impact.",
      cta: "Discover",
      scroll: "Scroll",
    },
    about: {
      label: "About",
      title_prefix: "A ",
      keywords: ["creative", "strategic", "operational", "sustainable"],
      and: " and ",
      p1: "EE Studio is a creative and strategic studio based in Kinshasa, founded by Lise-Laure. We support brands in their marketing development — from strategic thinking to content production and field execution.",
      p2: "Our difference: a 360° approach combining marketing, audiovisual production and sustainable development consulting. We don't just advise — we produce, deliver and execute.",
    },
    services: {
      label: "Our expertise",
      title: "Services",
    },
    differentiators: {
      label: "Why us",
      title_prefix: "What makes us ",
      title_highlight: "different",
      items: [
        { label: "360°", title: "Global approach", desc: "From strategy to creation, all the way to the field." },
        { label: "100%", title: "In-house production", desc: "Professional audiovisual equipment, no middleman." },
        { label: "2 in 1", title: "Marketing + ESG", desc: "A rare dual expertise, a unique vision." },
        { label: "Action", title: "We execute", desc: "Not just advice — we produce and deliver." },
      ],
    },
    portfolio: {
      label: "Work",
      title: "Portfolio",
      projects: [
        { title: "Digital Campaign", category: "Marketing" },
        { title: "Visual Identity", category: "Branding" },
        { title: "Event Coverage", category: "Audiovisual" },
        { title: "ESG Strategy", category: "Consulting" },
      ],
      coming: "More projects coming soon —",
      stay: "Stay connected",
    },
    contact: {
      label: "Contact",
      title_prefix: "Let's work ",
      title_highlight: "together",
      name: "Your name",
      email: "Your email",
      message: "Your message",
      send: "Send",
      location_label: "Location",
    },
    footer: {
      desc: "Creative, strategic and operational studio based in Kinshasa.",
      rights: "All rights reserved",
    },
    cookies: {
      text: "This site uses cookies to improve your experience.",
      accept: "Accept all",
      essential: "Essentials only",
      customize: "Customize",
      hide: "Hide details",
      essentials_title: "Essentials",
      essentials_desc: "Site functionality",
      always: "ALWAYS ACTIVE",
      analytics_title: "Analytics",
      analytics_desc: "Understand site usage",
      optional: "OPTIONAL",
    },
    servicePage: {
      back: "Back",
      whatWeDo: "What we do",
      projectInMind: "Have a project in mind?",
      contactUs: "Contact us",
    },
  },
};

type DeepStringify<T> = T extends readonly (infer U)[]
  ? DeepStringify<U>[]
  : T extends object
  ? { [K in keyof T]: DeepStringify<T[K]> }
  : T extends string
  ? string
  : T;

export type Translations = DeepStringify<typeof translations.fr>;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  lang: "fr",
  setLang: () => {},
  t: translations.fr,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("ee-lang") as Lang | null;
    if (saved && (saved === "fr" || saved === "en")) {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("ee-lang", l);
    document.documentElement.lang = l;
  }, []);

  const t = translations[lang];

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
