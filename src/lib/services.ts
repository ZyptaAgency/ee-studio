import {
  Video,
  Palette,
  TrendingUp,
  Leaf,
  Users,
  PartyPopper,
  Trophy,
} from "lucide-react";
import type { Lang } from "./i18n";

interface ServiceDetail {
  title: string;
  desc: string;
}

interface ServiceData {
  slug: string;
  icon: typeof Video;
  title: string;
  shortDesc: string;
  heroLine: string;
  fullDesc: string;
  details: ServiceDetail[];
  result: string;
}

const SERVICES_FR: ServiceData[] = [
  {
    slug: "production-audiovisuelle",
    icon: Video,
    title: "Production Audiovisuelle",
    shortDesc: "Shooting photo & vidéo, captation événementielle, Reels & TikTok, direction artistique sur tournage.",
    heroLine: "On capte, on filme, on produit.",
    fullDesc:
      "EE Studio dispose de matériel professionnel intégré - caméras, éclairages, appareils photo - pour produire du contenu visuel de haute qualité sans intermédiaire. De la publicité au contenu social, du branding corporate à la captation événementielle, nous maîtrisons toute la chaîne de production.",
    details: [
      { title: "Shooting Photo", desc: "Branding, corporate, lifestyle, produits : des images pensées avec une direction artistique forte." },
      { title: "Tournage Vidéo", desc: "Publicités, contenus digitaux, interviews, films promotionnels avec une approche créative et structurée." },
      { title: "Captation Événementielle", desc: "Couverture complète de vos événements, avant, pendant et après, afin de prolonger leur impact dans le temps." },
      { title: "Contenus Dynamiques", desc: "Formats courts, reels, contenus sociaux : tous conçus pour capter l'attention et maximiser l'engagement." },
    ],
    result: "Des contenus visuels professionnels, cohérents et performants, qui renforcent votre image et soutiennent votre communication.",
  },
  {
    slug: "creation-visuelle",
    icon: Palette,
    title: "Création Visuelle",
    shortDesc: "Infographie, identité visuelle, montage vidéo, branding complet et direction artistique.",
    heroLine: "L'image qui marque les esprits.",
    fullDesc:
      "Chaque marque mérite une identité visuelle forte et cohérente. Chez EE Studio, nous créons des univers graphiques complets - du logo aux supports de communication, des visuels réseaux sociaux à l'habillage vidéo - avec une exigence esthétique constante.",
    details: [
      { title: "Identité Visuelle", desc: "Logo et déclinaisons, charte graphique, univers de marque : une identité unique et immédiatement reconnaissable." },
      { title: "Infographie", desc: "Affiches, visuels réseaux sociaux, animations 2D de logos, supports print : des créations à la fois esthétiques et stratégiques." },
      { title: "Montage Vidéo", desc: "Clips, contenus digitaux, formats courts : un montage dynamique avec une direction artistique maîtrisée." },
      { title: "Branding Global", desc: "Habillage visuel complet : du print au digital, pour une image alignée sur tous vos supports." },
    ],
    result: "Une image cohérente, professionnelle et impactante, capable de capter l'attention et de rester en mémoire.",
  },
  {
    slug: "marketing-strategique",
    icon: TrendingUp,
    title: "Marketing Stratégique",
    shortDesc: "Positionnement de marque, stratégie de communication online & offline, campagnes et activation terrain.",
    heroLine: "La stratégie avant tout.",
    fullDesc:
      "Le marketing, c'est bien plus que des posts sur les réseaux. EE Studio accompagne les entreprises dans leur développement marketing global - en ligne et hors ligne. Positionnement, ciblage, structuration d'offre, campagnes, activation terrain : on construit une présence et une influence.",
    details: [
      { title: "Positionnement de Marque", desc: "Définition de votre identité, de votre cible et de votre proposition de valeur." },
      { title: "Stratégie de Communication & Parcours Client", desc: "Plan de communication structuré, online et offline, avec des objectifs clairs et mesurables." },
      { title: "Campagnes & Activation", desc: "Conception et déploiement de campagnes, actions terrain et lancements de projets." },
      { title: "Analyse & Optimisation", desc: "Audit de marque, suivi des performances et ajustements stratégiques continus." },
    ],
    result: "Une stratégie structurée, pertinente et évolutive, qui renforce votre positionnement et soutient votre développement.",
  },
  {
    slug: "consulting-esg",
    icon: Leaf,
    title: "Consulting ESG",
    shortDesc: "Intégration des enjeux ESG, communication responsable, accompagnement vers un développement durable.",
    heroLine: "Impact durable, vision responsable.",
    fullDesc:
      "Le développement durable n'est plus une option - c'est un levier de différenciation. EE Studio combine expertise marketing et consulting ESG pour aider les entreprises à intégrer les enjeux environnementaux, sociaux et de gouvernance dans leur stratégie et leur communication.",
    details: [
      { title: "Intégration ESG", desc: "Analyse et intégration des enjeux environnementaux, sociaux et de gouvernance dans votre stratégie globale et votre communication." },
      { title: "Communication Responsable", desc: "Construction d'un discours crédible, cohérent et aligné avec vos engagements." },
      { title: "Structuration Durable", desc: "Mise en place de pratiques durables concrètes, adaptées à votre activité et mesurables dans le temps." },
      { title: "Sensibilisation", desc: "Accompagnement et formation de vos équipes aux enjeux du développement durable." },
    ],
    result: "Une stratégie responsable, crédible et différenciante, qui renforce votre image et votre impact à long terme.",
  },
  {
    slug: "facilitation",
    icon: Users,
    title: "Facilitation & Liaison",
    shortDesc: "Coordination d'équipes, mise en relation stratégique, suivi de projet, simplification des processus.",
    heroLine: "Le pont entre vos équipes.",
    fullDesc:
      "Un projet ne repose pas uniquement sur les idées, mais sur la capacité à les faire circuler efficacement. Nous coordonnons les acteurs, structurons les échanges et assurons un suivi rigoureux pour transformer les intentions en résultats concrets.",
    details: [
      { title: "Coordination d'Équipes", desc: "Interface entre les pôles créatif, technique et décisionnel pour garantir un workflow fluide et aligné." },
      { title: "Mise en Relation", desc: "Connexion stratégique entre les bons interlocuteurs pour accélérer les projets et créer des opportunités." },
      { title: "Suivi de Projet", desc: "Pilotage des étapes, respect des délais et gestion des livrables avec précision." },
      { title: "Simplification des Processus", desc: "Optimisation des échanges et des méthodes de travail pour des décisions plus rapides et efficaces." },
    ],
    result: "Des projets structurés, des échanges fluides et une exécution plus rapide et maîtrisée.",
  },
  {
    slug: "evenementiel",
    icon: PartyPopper,
    title: "Événementiel",
    shortDesc: "Conseil stratégique, captation live, contenu et mise en valeur avant, pendant et après l'événement.",
    heroLine: "Vos événements, amplifiés.",
    fullDesc:
      "Un événement ne dure qu'un instant - son impact peut durer bien plus longtemps. EE Studio intervient en amont pour la stratégie, pendant pour la captation et la création de contenu en temps réel, et après pour la valorisation et la diffusion. Chaque moment compte.",
    details: [
      { title: "Conseil Stratégique", desc: "Conception et structuration de votre événement pour maximiser sa portée et son impact." },
      { title: "Captation Live", desc: "Production photo et vidéo professionnelle sur place, des contenus exploitables immédiatement." },
      { title: "Contenu en Temps Réel", desc: "Stories, lives, publications pour engager votre audience pendant l'événement." },
      { title: "Valorisation Post-Événement", desc: "Montage, récapitulatif vidéo, sélection photo pour prolonger l'impact dans le temps." },
    ],
    result: "Un événement structuré, visible et valorisé, dont l'impact dépasse largement le jour J.",
  },
  {
    slug: "sport",
    icon: Trophy,
    title: "Sport",
    shortDesc: "Stratégie et conception d'événements sportifs, production de contenu, valorisation des partenaires et développement d'écosystèmes.",
    heroLine: "Le sport, vecteur de visibilité et de transformation.",
    fullDesc:
      "Nous intervenons à la croisée du marketing, de la production et de l'événementiel pour créer des formats modernes, engageants et alignés avec les standards internationaux. Le sport est un vecteur puissant de visibilité, de connexion et de transformation.",
    details: [
      { title: "Stratégie & Conception d'Événements Sportifs", desc: "Structuration de concepts, positionnement, expérience globale pour des événements cohérents et impactants." },
      { title: "Production de Contenu Sportif", desc: "Captation, storytelling, interviews, formats digitaux pour valoriser les athlètes, les partenaires et l'événement." },
      { title: "Expérience & Valorisation des Partenaires", desc: "Mise en place d'espaces, activation de marque, amélioration de l'expérience invités et sponsors." },
      { title: "Développement d'Écosystèmes Sportifs", desc: "Contribution à des projets structurants visant à accompagner les talents, développer des opportunités et professionnaliser le secteur." },
    ],
    result: "Des expériences sportives modernes, visibles et structurées, capables de renforcer l'image, d'engager les audiences et de créer de nouvelles opportunités.",
  },
];

const SERVICES_EN: ServiceData[] = [
  {
    slug: "production-audiovisuelle",
    icon: Video,
    title: "Audiovisual Production",
    shortDesc: "Photo & video shoots, event coverage, Reels & TikTok, on-set artistic direction.",
    heroLine: "We capture, we film, we produce.",
    fullDesc:
      "EE Studio has integrated professional equipment - cameras, lighting, photography gear - to produce high-quality visual content without middlemen. From advertising to social content, corporate branding to event coverage, we master the entire production chain.",
    details: [
      { title: "Photo Shoots", desc: "Branding, corporate, lifestyle, products: images crafted with a strong artistic direction." },
      { title: "Video Production", desc: "Ads, digital content, interviews, promotional films with a creative and structured approach." },
      { title: "Event Coverage", desc: "Complete coverage of your events, before, during and after, to extend their impact over time." },
      { title: "Dynamic Content", desc: "Short formats, reels, social content: all designed to grab attention and maximize engagement." },
    ],
    result: "Professional, coherent and high-performing visual content that strengthens your image and supports your communication.",
  },
  {
    slug: "creation-visuelle",
    icon: Palette,
    title: "Visual Creation",
    shortDesc: "Graphic design, visual identity, video editing, complete branding and artistic direction.",
    heroLine: "The image that sticks.",
    fullDesc:
      "Every brand deserves a strong and coherent visual identity. At EE Studio, we create complete graphic universes - from logo to communication materials, social media visuals to video overlays - with a constant aesthetic standard.",
    details: [
      { title: "Visual Identity", desc: "Logo and variations, brand guidelines, brand universe: a unique and instantly recognizable identity." },
      { title: "Graphic Design", desc: "Posters, social media visuals, 2D logo animations, print materials: creations that are both aesthetic and strategic." },
      { title: "Video Editing", desc: "Clips, digital content, short formats: dynamic editing with mastered artistic direction." },
      { title: "Global Branding", desc: "Complete visual packaging: from print to digital, for an image aligned across all your media." },
    ],
    result: "A coherent, professional and impactful image, able to grab attention and stay in memory.",
  },
  {
    slug: "marketing-strategique",
    icon: TrendingUp,
    title: "Strategic Marketing",
    shortDesc: "Brand positioning, online & offline communication strategy, campaigns and field activation.",
    heroLine: "Strategy first.",
    fullDesc:
      "Marketing is much more than social media posts. EE Studio supports businesses in their overall marketing development - online and offline. Positioning, targeting, offer structuring, campaigns, field activation: we build presence and influence.",
    details: [
      { title: "Brand Positioning", desc: "Defining your identity, target audience and value proposition." },
      { title: "Communication Strategy & Customer Journey", desc: "Structured online and offline communication plan with clear, measurable objectives." },
      { title: "Campaigns & Activation", desc: "Design and deployment of campaigns, field actions and project launches." },
      { title: "Analysis & Optimization", desc: "Brand audit, performance tracking and continuous strategic adjustments." },
    ],
    result: "A structured, relevant and evolving strategy that strengthens your positioning and supports your growth.",
  },
  {
    slug: "consulting-esg",
    icon: Leaf,
    title: "ESG Consulting",
    shortDesc: "ESG integration, responsible communication, guidance towards sustainable development.",
    heroLine: "Lasting impact, responsible vision.",
    fullDesc:
      "Sustainable development is no longer optional - it's a differentiating lever. EE Studio combines marketing expertise and ESG consulting to help businesses integrate environmental, social and governance issues into their strategy and communication.",
    details: [
      { title: "ESG Integration", desc: "Analysis and integration of environmental, social and governance issues into your global strategy and communication." },
      { title: "Responsible Communication", desc: "Building a credible, coherent narrative aligned with your commitments." },
      { title: "Sustainable Structuring", desc: "Implementing concrete sustainable practices, adapted to your activity and measurable over time." },
      { title: "Awareness", desc: "Supporting and training your teams on sustainable development issues." },
    ],
    result: "A responsible, credible and differentiating strategy that strengthens your image and your long-term impact.",
  },
  {
    slug: "facilitation",
    icon: Users,
    title: "Facilitation & Liaison",
    shortDesc: "Team coordination, strategic networking, project management, process simplification.",
    heroLine: "The bridge between your teams.",
    fullDesc:
      "A project doesn't rely solely on ideas, but on the ability to circulate them effectively. We coordinate the players, structure exchanges and ensure rigorous follow-up to turn intentions into concrete results.",
    details: [
      { title: "Team Coordination", desc: "Interface between creative, technical and decision-making poles to ensure a smooth, aligned workflow." },
      { title: "Networking", desc: "Strategic connection between the right people to accelerate projects and create opportunities." },
      { title: "Project Follow-up", desc: "Steering stages, meeting deadlines and managing deliverables with precision." },
      { title: "Process Simplification", desc: "Optimizing exchanges and working methods for faster, more effective decisions." },
    ],
    result: "Structured projects, smooth exchanges and faster, more controlled execution.",
  },
  {
    slug: "evenementiel",
    icon: PartyPopper,
    title: "Events",
    shortDesc: "Strategic consulting, live coverage, content creation and enhancement before, during and after the event.",
    heroLine: "Your events, amplified.",
    fullDesc:
      "An event only lasts a moment - its impact can last much longer. EE Studio steps in upstream for strategy, during for coverage and real-time content creation, and after for promotion and distribution. Every moment counts.",
    details: [
      { title: "Strategic Consulting", desc: "Design and structuring of your event to maximize its reach and impact." },
      { title: "Live Coverage", desc: "Professional photo and video production on site, with content usable immediately." },
      { title: "Real-time Content", desc: "Stories, lives, posts to engage your audience during the event." },
      { title: "Post-event Enhancement", desc: "Editing, video recap, photo selection to extend the impact over time." },
    ],
    result: "A structured, visible and enhanced event whose impact goes far beyond the day itself.",
  },
  {
    slug: "sport",
    icon: Trophy,
    title: "Sports",
    shortDesc: "Sports event strategy and design, content production, partner enhancement and sports ecosystem development.",
    heroLine: "Sport, a driver of visibility and transformation.",
    fullDesc:
      "We work at the crossroads of marketing, production and events to create modern, engaging formats aligned with international standards. Sport is a powerful driver of visibility, connection and transformation.",
    details: [
      { title: "Sports Event Strategy & Design", desc: "Concept structuring, positioning, global experience for coherent and impactful events." },
      { title: "Sports Content Production", desc: "Coverage, storytelling, interviews, digital formats to showcase athletes, partners and the event." },
      { title: "Partner Experience & Enhancement", desc: "Setting up spaces, brand activation, improving the guest and sponsor experience." },
      { title: "Sports Ecosystem Development", desc: "Contributing to structuring projects to support talent, develop opportunities and professionalize the sector." },
    ],
    result: "Modern, visible and structured sports experiences, able to strengthen image, engage audiences and create new opportunities.",
  },
];

export function getServices(lang: Lang): ServiceData[] {
  return lang === "en" ? SERVICES_EN : SERVICES_FR;
}

export function getServiceBySlug(slug: string, lang: Lang = "fr") {
  const services = getServices(lang);
  return services.find((s) => s.slug === slug) || null;
}

export const SERVICES = SERVICES_FR;
