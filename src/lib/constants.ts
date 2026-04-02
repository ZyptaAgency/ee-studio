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
      consulting: "Consulting",
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
    consulting: {
      label: "Marketing Consulting",
      title: "Marketing Consulting",
      subtitle: "Tailored strategic support to grow your brand, optimize your performance and make smarter decisions.",
      services: [
        {
          title: "Strategic Coaching",
          description: "One-on-one sessions to define your brand positioning, communication roadmap and growth strategy.",
          icon: "Compass",
        },
        {
          title: "Data Analysis & Insights",
          description: "Deep analysis of your marketing data — campaigns, audiences, conversions — to turn numbers into actionable decisions.",
          icon: "BarChart3",
        },
        {
          title: "Brand Audit",
          description: "Full assessment of your brand identity, messaging, and market positioning with clear recommendations.",
          icon: "Search",
        },
        {
          title: "Digital Strategy",
          description: "Custom digital roadmap covering SEO, social media, content strategy and paid advertising.",
          icon: "Globe",
        },
        {
          title: "Campaign Management",
          description: "End-to-end campaign planning, execution and optimization across all channels.",
          icon: "Megaphone",
        },
        {
          title: "Training & Workshops",
          description: "Hands-on workshops for your team on marketing tools, content creation, analytics and best practices.",
          icon: "GraduationCap",
        },
      ],
      form: {
        title: "Request more information",
        subtitle: "Tell us about your needs and we'll get back to you within 24 hours.",
        name: "Full name",
        email: "Email address",
        company: "Company / Organization",
        service: "Service of interest",
        servicePlaceholder: "Select a service",
        message: "Tell us about your project",
        send: "Request Info",
        success: "Thank you! We'll be in touch soon.",
      },
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
      consulting: "Consultance",
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
    consulting: {
      label: "Consultance Marketing",
      title: "Consultance Marketing",
      subtitle: "Un accompagnement stratégique sur mesure pour développer votre marque, optimiser vos performances et prendre de meilleures décisions.",
      services: [
        {
          title: "Accompagnement Stratégique",
          description: "Sessions individuelles pour définir votre positionnement, feuille de route communication et stratégie de croissance.",
          icon: "Compass",
        },
        {
          title: "Analyse de Données & Insights",
          description: "Analyse approfondie de vos données marketing — campagnes, audiences, conversions — pour transformer les chiffres en décisions.",
          icon: "BarChart3",
        },
        {
          title: "Audit de Marque",
          description: "Évaluation complète de votre identité de marque, messaging et positionnement marché avec recommandations claires.",
          icon: "Search",
        },
        {
          title: "Stratégie Digitale",
          description: "Feuille de route digitale sur mesure couvrant SEO, réseaux sociaux, stratégie de contenu et publicité payante.",
          icon: "Globe",
        },
        {
          title: "Gestion de Campagnes",
          description: "Planification, exécution et optimisation de campagnes de bout en bout sur tous les canaux.",
          icon: "Megaphone",
        },
        {
          title: "Formation & Ateliers",
          description: "Ateliers pratiques pour votre équipe sur les outils marketing, création de contenu, analytics et bonnes pratiques.",
          icon: "GraduationCap",
        },
      ],
      form: {
        title: "Demander plus d'informations",
        subtitle: "Parlez-nous de vos besoins et nous vous recontacterons sous 24 heures.",
        name: "Nom complet",
        email: "Adresse email",
        company: "Entreprise / Organisation",
        service: "Service souhaité",
        servicePlaceholder: "Sélectionner un service",
        message: "Décrivez votre projet",
        send: "Demander des infos",
        success: "Merci ! Nous vous recontacterons très vite.",
      },
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
