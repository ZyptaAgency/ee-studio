import {
  Video,
  Palette,
  TrendingUp,
  Leaf,
  Users,
  PartyPopper,
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
}

const SERVICES_FR: ServiceData[] = [
  {
    slug: "production-audiovisuelle",
    icon: Video,
    title: "Production Audiovisuelle",
    shortDesc: "Shooting photo & vidéo, captation événementielle, Reels & TikTok, direction artistique sur tournage.",
    heroLine: "On capte, on filme, on produit.",
    fullDesc:
      "EE Studio dispose de matériel professionnel intégré — caméras, éclairages, appareils photo — pour produire du contenu visuel de haute qualité sans intermédiaire. De la publicité au contenu social, du branding corporate à la captation événementielle, nous maîtrisons toute la chaîne de production.",
    details: [
      { title: "Shooting Photo", desc: "Branding, corporate, lifestyle, produits — chaque image raconte votre histoire avec un regard artistique affirmé." },
      { title: "Tournage Vidéo", desc: "Publicités, contenus réseaux, interviews, films promotionnels — avec direction artistique intégrée." },
      { title: "Captation Événementielle", desc: "Couverture complète de vos événements : avant, pendant, après. Photos, vidéos, contenu live." },
      { title: "Contenus Dynamiques", desc: "Reels, TikTok, formats courts optimisés pour les algorithmes et l'engagement." },
    ],
  },
  {
    slug: "creation-visuelle",
    icon: Palette,
    title: "Création Visuelle",
    shortDesc: "Infographie, identité visuelle, montage vidéo, branding complet et direction artistique.",
    heroLine: "L'image qui marque les esprits.",
    fullDesc:
      "Chaque marque mérite une identité visuelle forte et cohérente. Chez EE Studio, nous créons des univers graphiques complets — du logo aux supports de communication, des visuels réseaux sociaux à l'habillage vidéo — avec une exigence esthétique constante.",
    details: [
      { title: "Identité Visuelle", desc: "Logo, charte graphique, univers de marque — une identité unique qui vous distingue." },
      { title: "Infographie", desc: "Affiches, visuels réseaux sociaux, supports print — chaque création est pensée stratégiquement." },
      { title: "Montage Vidéo", desc: "Clips, promos, formats courts — montage dynamique avec direction artistique soignée." },
      { title: "Branding Complet", desc: "Habillage visuel global : de la carte de visite au site web, tout est aligné." },
    ],
  },
  {
    slug: "marketing-strategique",
    icon: TrendingUp,
    title: "Marketing Stratégique",
    shortDesc: "Positionnement de marque, stratégie de communication online & offline, campagnes et activation terrain.",
    heroLine: "La stratégie avant tout.",
    fullDesc:
      "Le marketing, c'est bien plus que des posts sur les réseaux. EE Studio accompagne les entreprises dans leur développement marketing global — en ligne et hors ligne. Positionnement, ciblage, structuration d'offre, campagnes, activation terrain : on construit une présence et une influence.",
    details: [
      { title: "Positionnement de Marque", desc: "Définition de votre identité, de votre cible et de votre proposition de valeur unique." },
      { title: "Stratégie de Communication", desc: "Plan de communication online & offline structuré, avec des objectifs clairs et mesurables." },
      { title: "Campagnes & Activation", desc: "Conception et déploiement de campagnes promotionnelles, actions terrain, lancement de produits." },
      { title: "Analyse & Optimisation", desc: "Audit d'image de marque, analyse des performances, ajustements stratégiques continus." },
    ],
  },
  {
    slug: "consulting-esg",
    icon: Leaf,
    title: "Consulting ESG",
    shortDesc: "Intégration des enjeux ESG, communication responsable, accompagnement vers un développement durable.",
    heroLine: "Impact durable, vision responsable.",
    fullDesc:
      "Le développement durable n'est plus une option — c'est un levier de différenciation. EE Studio combine expertise marketing et consulting ESG pour aider les entreprises à intégrer les enjeux environnementaux, sociaux et de gouvernance dans leur stratégie et leur communication.",
    details: [
      { title: "Intégration ESG", desc: "Analyse et intégration des enjeux ESG dans votre stratégie d'entreprise et de communication." },
      { title: "Communication Responsable", desc: "Construire un discours authentique et aligné avec vos engagements durables." },
      { title: "Structuration Durable", desc: "Accompagnement à la mise en place de pratiques durables concrètes et mesurables." },
      { title: "Sensibilisation", desc: "Formation et sensibilisation de vos équipes aux enjeux du développement durable." },
    ],
  },
  {
    slug: "facilitation",
    icon: Users,
    title: "Facilitation & Liaison",
    shortDesc: "Coordination d'équipes, mise en relation stratégique, suivi de projet, simplification des processus.",
    heroLine: "Le pont entre vos équipes.",
    fullDesc:
      "Un projet avance quand les bonnes personnes se parlent au bon moment. EE Studio agit comme facilitateur : coordination entre équipes créatives, techniques et direction, mise en relation stratégique, suivi de projet rigoureux. On simplifie les échanges pour accélérer les résultats.",
    details: [
      { title: "Coordination d'Équipes", desc: "Interface entre les départements créatif, technique et direction pour un workflow fluide." },
      { title: "Mise en Relation", desc: "Connexion stratégique entre les acteurs clés de votre écosystème professionnel." },
      { title: "Suivi de Projet", desc: "Gestion rigoureuse de l'avancement, des délais et des livrables à chaque étape." },
      { title: "Simplification", desc: "Optimisation des processus pour des échanges plus rapides et des décisions plus claires." },
    ],
  },
  {
    slug: "evenementiel",
    icon: PartyPopper,
    title: "Événementiel",
    shortDesc: "Conseil stratégique, captation live, contenu et mise en valeur avant, pendant et après l'événement.",
    heroLine: "Vos événements, amplifiés.",
    fullDesc:
      "Un événement ne dure qu'un instant — son impact peut durer bien plus longtemps. EE Studio intervient en amont pour la stratégie, pendant pour la captation et la création de contenu en temps réel, et après pour la valorisation et la diffusion. Chaque moment compte.",
    details: [
      { title: "Conseil Stratégique", desc: "Conception et structuration de votre événement pour maximiser son impact." },
      { title: "Captation Live", desc: "Photo et vidéo professionnelles pendant l'événement — contenu prêt à publier." },
      { title: "Contenu Temps Réel", desc: "Stories, lives, posts en direct pour engager votre audience pendant l'événement." },
      { title: "Valorisation Post-Événement", desc: "Montage, récap vidéo, galerie photo — prolonger l'impact après le jour J." },
    ],
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
      "EE Studio has integrated professional equipment — cameras, lighting, photography gear — to produce high-quality visual content without middlemen. From advertising to social content, corporate branding to event coverage, we master the entire production chain.",
    details: [
      { title: "Photo Shoots", desc: "Branding, corporate, lifestyle, products — every image tells your story with a bold artistic eye." },
      { title: "Video Production", desc: "Ads, social content, interviews, promotional films — with integrated artistic direction." },
      { title: "Event Coverage", desc: "Complete coverage of your events: before, during, after. Photos, videos, live content." },
      { title: "Dynamic Content", desc: "Reels, TikTok, short formats optimized for algorithms and engagement." },
    ],
  },
  {
    slug: "creation-visuelle",
    icon: Palette,
    title: "Visual Creation",
    shortDesc: "Graphic design, visual identity, video editing, complete branding and artistic direction.",
    heroLine: "The image that sticks.",
    fullDesc:
      "Every brand deserves a strong and coherent visual identity. At EE Studio, we create complete graphic universes — from logo to communication materials, social media visuals to video overlays — with a constant aesthetic standard.",
    details: [
      { title: "Visual Identity", desc: "Logo, brand guidelines, brand universe — a unique identity that sets you apart." },
      { title: "Graphic Design", desc: "Posters, social media visuals, print materials — every creation is strategically designed." },
      { title: "Video Editing", desc: "Clips, promos, short formats — dynamic editing with polished artistic direction." },
      { title: "Complete Branding", desc: "Full visual packaging: from business cards to websites, everything is aligned." },
    ],
  },
  {
    slug: "marketing-strategique",
    icon: TrendingUp,
    title: "Strategic Marketing",
    shortDesc: "Brand positioning, online & offline communication strategy, campaigns and field activation.",
    heroLine: "Strategy first.",
    fullDesc:
      "Marketing is much more than social media posts. EE Studio supports businesses in their overall marketing development — online and offline. Positioning, targeting, offer structuring, campaigns, field activation: we build presence and influence.",
    details: [
      { title: "Brand Positioning", desc: "Defining your identity, target audience and unique value proposition." },
      { title: "Communication Strategy", desc: "Structured online & offline communication plan with clear, measurable objectives." },
      { title: "Campaigns & Activation", desc: "Design and deployment of promotional campaigns, field actions, product launches." },
      { title: "Analysis & Optimization", desc: "Brand image audit, performance analysis, continuous strategic adjustments." },
    ],
  },
  {
    slug: "consulting-esg",
    icon: Leaf,
    title: "ESG Consulting",
    shortDesc: "ESG integration, responsible communication, guidance towards sustainable development.",
    heroLine: "Lasting impact, responsible vision.",
    fullDesc:
      "Sustainable development is no longer optional — it's a differentiating lever. EE Studio combines marketing expertise and ESG consulting to help businesses integrate environmental, social and governance issues into their strategy and communication.",
    details: [
      { title: "ESG Integration", desc: "Analysis and integration of ESG issues into your business and communication strategy." },
      { title: "Responsible Communication", desc: "Building an authentic narrative aligned with your sustainability commitments." },
      { title: "Sustainable Structuring", desc: "Support in implementing concrete and measurable sustainable practices." },
      { title: "Awareness", desc: "Training and raising awareness among your teams on sustainability issues." },
    ],
  },
  {
    slug: "facilitation",
    icon: Users,
    title: "Facilitation & Liaison",
    shortDesc: "Team coordination, strategic networking, project management, process simplification.",
    heroLine: "The bridge between your teams.",
    fullDesc:
      "A project moves forward when the right people talk at the right time. EE Studio acts as a facilitator: coordination between creative, technical and management teams, strategic networking, rigorous project follow-up. We simplify exchanges to accelerate results.",
    details: [
      { title: "Team Coordination", desc: "Interface between creative, technical and management departments for a smooth workflow." },
      { title: "Networking", desc: "Strategic connection between key players in your professional ecosystem." },
      { title: "Project Follow-up", desc: "Rigorous management of progress, deadlines and deliverables at every stage." },
      { title: "Simplification", desc: "Process optimization for faster exchanges and clearer decisions." },
    ],
  },
  {
    slug: "evenementiel",
    icon: PartyPopper,
    title: "Events",
    shortDesc: "Strategic consulting, live coverage, content creation and enhancement before, during and after the event.",
    heroLine: "Your events, amplified.",
    fullDesc:
      "An event only lasts a moment — its impact can last much longer. EE Studio steps in upstream for strategy, during for coverage and real-time content creation, and after for promotion and distribution. Every moment counts.",
    details: [
      { title: "Strategic Consulting", desc: "Design and structuring of your event to maximize its impact." },
      { title: "Live Coverage", desc: "Professional photo and video during the event — content ready to publish." },
      { title: "Real-time Content", desc: "Stories, lives, live posts to engage your audience during the event." },
      { title: "Post-event Enhancement", desc: "Editing, video recap, photo gallery — extending the impact after the big day." },
    ],
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
