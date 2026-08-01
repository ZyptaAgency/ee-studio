"use client";
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Lang = "fr" | "en";

const translations = {
  fr: {
    nav: {
      about: "À propos",
      approach: "Approche",
      services: "Services",
      portfolio: "Portfolio",
      booking: "Rendez-vous",
      contact: "Contact",
    },
    hero: {
      subtitle: "Stratégie. Création. Impact.",
      cta: "Découvrir",
      cta_secondary: "Réserver un appel",
      scroll: "Scroll",
    },
    about: {
      label: "À propos",
      title_prefix: "Un studio ",
      keywords: ["créatif", "stratégique", "opérationnel", "durable"],
      and: " et ",
      p1: "E.E Studio SARL est une société basée à Kinshasa (RDC) qui accompagne les marques et les personnes dans la construction, le développement et l'expression de leur image, du positionnement stratégique à l'activation opérationnelle.",
      p2: "De la réflexion à la mise en œuvre, nous assurons un accompagnement global et une facilitation à chaque étape : cadrage, stratégie, création, production et exécution terrain. Une structure qui articule conseil, création et production pour transformer les idées en réalisations tangibles.",
      mission_label: "Notre mission",
      mission: "Accompagner les marques dans la création d'une image cohérente, impactante et durable, en reliant stratégie, création et exécution.",
    },
    founder: {
      label: "La fondatrice",
      name: "Lise-Laure Nzuzi Ntumba",
      role: "Fondatrice & CEO",
      quote: "Je ne voulais pas créer un studio qui se contente de conseiller. Je voulais un studio qui imagine, qui produit, qui transforme et qui rend réel.",
      p1: "Un studio capable de penser une stratégie, mais surtout de la faire exister. E.E Studio, c'est ça : une vision, des idées… et leur exécution. Sans attendre les conditions parfaites, sans dépendre d'un outil. Juste la capacité de faire exister ce qui n'existait pas encore.",
      p2: "E.E, c'est aussi mon prénom à l'envers. Une manière de ne jamais oublier qui je suis, d'où je viens et où je vais.",
      cta: "Échanger avec nous",
    },
    approach: {
      label: "Notre approche",
      title_prefix: "Comment ",
      title_highlight: "travaillons-nous",
      intro: "Chaque projet est pensé comme un ensemble cohérent, où stratégie, création et production avancent ensemble.",
      phases: [
        {
          num: "01",
          tag: "Vision",
          title: "Comprendre & Structurer",
          points: [
            "Nous analysons votre marque, vos besoins et vos objectifs pour poser des bases solides.",
            "Nous définissons une stratégie claire : positionnement, message, direction.",
          ],
        },
        {
          num: "02",
          tag: "Exécution",
          title: "Concevoir & Produire",
          points: [
            "Nous imaginons et développons les concepts créatifs adaptés à votre univers.",
            "Nous réalisons les contenus et supports nécessaires avec une exigence de qualité constante.",
          ],
        },
        {
          num: "03",
          tag: "Résultat",
          title: "Déployer & Optimiser",
          points: [
            "Nous déployons concrètement les actions, en ligne et sur le terrain.",
            "Nous analysons, optimisons et faisons évoluer les actions pour maximiser leur impact.",
          ],
        },
      ],
    },
    cta_band: {
      title: "Transformons vos idées en réalisations tangibles.",
      subtitle: "Une vision, des idées… et leur exécution.",
      primary: "Réserver un rendez-vous",
      secondary: "Nous écrire",
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
        { label: "Action", title: "On exécute", desc: "Pas seulement du conseil - on produit et on livre." },
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
      coming: "Plus de projets à venir -",
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
      service: "Service concerné",
      service_placeholder: "Sélectionnez un service",
      attachment: "Pièce jointe",
      attachment_label: "Joindre un fichier",
      file_selected: "fichier(s) sélectionné(s)",
    },
    booking: {
      label: "Rendez-vous",
      title_prefix: "Réservez un ",
      title_highlight: "rendez-vous",
      desc: "Planifiez un appel de découverte avec notre équipe. Choisissez la date et l'heure qui vous conviennent.",
      name: "Votre nom",
      email: "Votre email",
      service: "Service",
      service_placeholder: "Sélectionnez un service",
      date: "Date",
      time: "Heure",
      confirm: "Confirmer le rendez-vous",
      error: "Une erreur est survenue. Veuillez réessayer.",
      success: "Rendez-vous confirmé !",
      success_desc: "Ajoutez-le à votre calendrier :",
      google: "Google Calendar",
      ical: "iCal / Apple",
    },
    footer: {
      desc: "Studio créatif, stratégique et opérationnel basé à Kinshasa.",
      rights: "Tous droits réservés",
      privacy: "Politique de confidentialité",
    },
    cookies: {
      text: "Ce site utilise des cookies pour améliorer votre expérience.",
      privacy: "Politique de confidentialité",
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
      result_label: "Le résultat",
      projectInMind: "Un projet en tête ?",
      contactUs: "Nous contacter",
      book: "Réserver un rendez-vous",
    },
  },
  en: {
    nav: {
      about: "About",
      approach: "Approach",
      services: "Services",
      portfolio: "Portfolio",
      booking: "Booking",
      contact: "Contact",
    },
    hero: {
      subtitle: "Strategy. Creation. Impact.",
      cta: "Discover",
      cta_secondary: "Book a call",
      scroll: "Scroll",
    },
    about: {
      label: "About",
      title_prefix: "A ",
      keywords: ["creative", "strategic", "operational", "sustainable"],
      and: " and ",
      p1: "E.E Studio SARL is a company based in Kinshasa (DRC) that supports brands and people in building, developing and expressing their image, from strategic positioning to operational activation.",
      p2: "From reflection to execution, we provide global support and facilitation at every stage: framing, strategy, creation, production and field execution. A structure that connects consulting, creation and production to turn ideas into tangible outcomes.",
      mission_label: "Our mission",
      mission: "Supporting brands in creating a coherent, impactful and lasting image, by connecting strategy, creation and execution.",
    },
    founder: {
      label: "The founder",
      name: "Lise-Laure Nzuzi Ntumba",
      role: "Founder & CEO",
      quote: "I didn't want to create a studio that just gives advice. I wanted a studio that imagines, produces, transforms and makes things real.",
      p1: "A studio able to think a strategy, but above all to make it exist. That's what E.E Studio is: a vision, ideas… and their execution. Without waiting for perfect conditions, without depending on a single tool. Just the ability to bring into existence what did not yet exist.",
      p2: "E.E is also my first name reversed. A way to never forget who I am, where I come from and where I'm going.",
      cta: "Talk with us",
    },
    approach: {
      label: "Our approach",
      title_prefix: "How do we ",
      title_highlight: "work",
      intro: "Every project is designed as a coherent whole, where strategy, creation and production move forward together.",
      phases: [
        {
          num: "01",
          tag: "Vision",
          title: "Understand & Structure",
          points: [
            "We analyze your brand, needs and objectives to build solid foundations.",
            "We define a clear strategy: positioning, message, direction.",
          ],
        },
        {
          num: "02",
          tag: "Execution",
          title: "Design & Produce",
          points: [
            "We imagine and develop creative concepts tailored to your universe.",
            "We create the necessary content and assets with a constant standard of quality.",
          ],
        },
        {
          num: "03",
          tag: "Result",
          title: "Deploy & Optimize",
          points: [
            "We concretely deploy actions, online and in the field.",
            "We analyze, optimize and evolve actions to maximize their impact.",
          ],
        },
      ],
    },
    cta_band: {
      title: "Let's turn your ideas into tangible outcomes.",
      subtitle: "A vision, ideas… and their execution.",
      primary: "Book an appointment",
      secondary: "Write to us",
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
        { label: "Action", title: "We execute", desc: "Not just advice - we produce and deliver." },
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
      coming: "More projects coming soon -",
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
      service: "Service",
      service_placeholder: "Select a service",
      attachment: "Attachment",
      attachment_label: "Attach a file",
      file_selected: "file(s) selected",
    },
    booking: {
      label: "Appointment",
      title_prefix: "Book an ",
      title_highlight: "appointment",
      desc: "Schedule a discovery call with our team. Choose the date and time that suits you.",
      name: "Your name",
      email: "Your email",
      service: "Service",
      service_placeholder: "Select a service",
      date: "Date",
      time: "Heure",
      confirm: "Confirm appointment",
      error: "Something went wrong. Please try again.",
      success: "Appointment confirmed!",
      success_desc: "Add it to your calendar:",
      google: "Google Calendar",
      ical: "iCal / Apple",
    },
    footer: {
      desc: "Creative, strategic and operational studio based in Kinshasa.",
      rights: "All rights reserved",
      privacy: "Privacy Policy",
    },
    cookies: {
      text: "This site uses cookies to improve your experience.",
      privacy: "Privacy Policy",
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
      result_label: "The result",
      projectInMind: "Have a project in mind?",
      contactUs: "Contact us",
      book: "Book an appointment",
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
