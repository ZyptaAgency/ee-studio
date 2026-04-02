export const PASTEL_COLORS = [
  "#F2B5D4",
  "#C3B1E1",
  "#A8D8C8",
  "#FADADD",
  "#B5D8EB",
  "#F5E6C8",
] as const;

export type Lang = "en" | "fr";

export const TRANSLATIONS = {
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
    },
    about: {
      label: "About",
      text: "EE Studio is a creative, strategic and operational studio based in Kinshasa. Founded by Lise-Laure, the studio supports brands in their marketing development, from strategy to audiovisual content production, with a creative, operational and sustainable approach.",
      col1: "Lise-Laure doesn't just advise — she executes. With an integrated team and professional equipment, EE Studio handles every step, from strategic thinking to final delivery.",
      col2: "The studio combines sharp marketing expertise with a responsible vision, integrating ESG considerations into every project for lasting impact.",
    },
    services: {
      label: "Our expertise",
      title: "Services",
      items: [
        {
          title: "Video Production",
          description: "Photo shoots, video production, event coverage, Reels/TikTok content, art direction.",
        },
        {
          title: "Visual Creation",
          description: "Graphic design, visual identity, art direction, video editing, full branding.",
        },
        {
          title: "Strategic Marketing",
          description: "Brand positioning, online & offline communication strategy, campaigns, field activation.",
        },
        {
          title: "ESG & Sustainability Consulting",
          description: "ESG integration, responsible communication, sustainable development support.",
        },
        {
          title: "Facilitation & Liaison",
          description: "Team coordination, networking, project management, process simplification.",
        },
        {
          title: "Events",
          description: "Strategic consulting, live coverage, content before/during/after events.",
        },
      ],
    },
    differentiators: {
      label: "Why us",
      title: "What sets us apart",
      items: [
        { title: "360° Approach", description: "From strategy to creation, all the way to the field.", stat: "360°" },
        { title: "In-House Production", description: "Professional equipment fully integrated in-house.", stat: "100%" },
        { title: "Dual Expertise", description: "Marketing & ESG united in a single vision.", stat: "2 in 1" },
        { title: "Real Execution", description: "Not just advice — we produce, we deliver.", stat: "Action" },
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
        { title: "Social Media Content", category: "Creation" },
        { title: "Art Direction", category: "Production" },
      ],
      coming: "More projects coming soon — Stay connected",
    },
    marquee: ["STRATEGY", "CREATION", "CONTENT", "IMPACT", "SUSTAINABLE", "MARKETING", "VISION"],
    contact: {
      label: "Contact",
      title: "Let's work together",
      subtitle: "An idea, a project, a collaboration? Let's talk about it.",
      name: "Your name",
      email: "Your email",
      message: "Your message",
      send: "Send",
      location: "Location",
      locationValue: "Kinshasa, Democratic Republic of the Congo",
    },
    footer: {
      tagline: "Creative, strategic, and operational studio. From strategy to impact.",
      navigation: "Navigation",
      social: "Social",
      rights: "All rights reserved",
    },
    cookies: {
      text: "This site uses cookies to enhance your experience.",
      accept: "Accept",
      decline: "Decline",
    },
  },
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
    },
    about: {
      label: "À propos",
      text: "EE Studio est un studio créatif, stratégique et opérationnel basé à Kinshasa. Fondé par Lise-Laure, le studio accompagne les marques dans leur développement marketing, de la stratégie à la production de contenu audiovisuel, avec une approche créative, opérationnelle et durable.",
      col1: "Lise-Laure ne se contente pas de conseiller — elle exécute. Avec une équipe intégrée et du matériel professionnel, EE Studio prend en charge chaque étape, de la réflexion stratégique à la livraison finale.",
      col2: "Le studio combine une expertise marketing pointue avec une vision responsable, intégrant les enjeux ESG dans chaque projet pour un impact qui dure.",
    },
    services: {
      label: "Nos expertises",
      title: "Services",
      items: [
        {
          title: "Production Audiovisuelle",
          description: "Shooting photo, tournage vidéo, captation événementielle, Reels/TikTok, direction artistique.",
        },
        {
          title: "Création Visuelle",
          description: "Infographie, identité visuelle, direction artistique, montage vidéo, branding complet.",
        },
        {
          title: "Marketing Stratégique",
          description: "Positionnement de marque, stratégie de communication online & offline, campagnes, activation terrain.",
        },
        {
          title: "Consulting ESG & Développement Durable",
          description: "Intégration ESG, communication responsable, accompagnement durable.",
        },
        {
          title: "Facilitation & Liaison",
          description: "Coordination d'équipes, mise en relation, suivi de projet, simplification des processus.",
        },
        {
          title: "Événementiel",
          description: "Conseil stratégique, captation, contenu avant/pendant/après événement.",
        },
      ],
    },
    differentiators: {
      label: "Pourquoi nous",
      title: "Ce qui nous distingue",
      items: [
        { title: "Approche 360°", description: "De la stratégie à la création, jusqu'au terrain.", stat: "360°" },
        { title: "Autonomie Audiovisuelle", description: "Matériel professionnel intégré au studio.", stat: "100%" },
        { title: "Double Compétence", description: "Marketing & ESG réunis dans une même vision.", stat: "2 en 1" },
        { title: "Exécution Concrète", description: "Pas seulement du conseil — on produit, on livre.", stat: "Action" },
      ],
    },
    portfolio: {
      label: "Réalisations",
      title: "Portfolio",
      projects: [
        { title: "Campagne Digitale", category: "Marketing" },
        { title: "Identité Visuelle", category: "Branding" },
        { title: "Captation Événementielle", category: "Audiovisuel" },
        { title: "Stratégie ESG", category: "Consulting" },
        { title: "Contenu Réseaux Sociaux", category: "Création" },
        { title: "Direction Artistique", category: "Production" },
      ],
      coming: "Projets à venir — Restez connectés",
    },
    marquee: ["STRATÉGIE", "CRÉATION", "CONTENU", "IMPACT", "DURABLE", "MARKETING", "VISION"],
    contact: {
      label: "Contact",
      title: "Travaillons ensemble",
      subtitle: "Une idée, un projet, une collaboration ? Parlons-en.",
      name: "Votre nom",
      email: "Votre email",
      message: "Votre message",
      send: "Envoyer",
      location: "Localisation",
      locationValue: "Kinshasa, République Démocratique du Congo",
    },
    footer: {
      tagline: "Studio créatif, stratégique et opérationnel. De la stratégie à l'impact.",
      navigation: "Navigation",
      social: "Réseaux",
      rights: "Tous droits réservés",
    },
    cookies: {
      text: "Ce site utilise des cookies pour améliorer votre expérience.",
      accept: "Accepter",
      decline: "Refuser",
    },
  },
} as const;

export const SERVICE_ICONS = [
  "Video",
  "Palette",
  "Target",
  "Leaf",
  "Link",
  "CalendarDays",
] as const;
