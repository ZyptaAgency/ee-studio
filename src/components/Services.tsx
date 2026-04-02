"use client";
import { motion } from "framer-motion";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useState } from "react";
import {
  Video,
  Palette,
  TrendingUp,
  Leaf,
  Users,
  PartyPopper,
} from "lucide-react";

const SERVICES = [
  {
    icon: Video,
    title: "Production Audiovisuelle",
    desc: "Shooting photo & vidéo, captation événementielle, Reels & TikTok, direction artistique sur tournage.",
  },
  {
    icon: Palette,
    title: "Création Visuelle",
    desc: "Infographie, identité visuelle, montage vidéo, branding complet et direction artistique.",
  },
  {
    icon: TrendingUp,
    title: "Marketing Stratégique",
    desc: "Positionnement de marque, stratégie de communication online & offline, campagnes et activation terrain.",
  },
  {
    icon: Leaf,
    title: "Consulting ESG",
    desc: "Intégration des enjeux ESG, communication responsable, accompagnement vers un développement durable.",
  },
  {
    icon: Users,
    title: "Facilitation & Liaison",
    desc: "Coordination d'équipes, mise en relation stratégique, suivi de projet, simplification des processus.",
  },
  {
    icon: PartyPopper,
    title: "Événementiel",
    desc: "Conseil stratégique, captation live, contenu et mise en valeur avant, pendant et après l'événement.",
  },
];

export default function Services() {
  const { next } = usePastelRotation();
  const [activeColors, setActiveColors] = useState<Record<number, string>>({});

  const handleHover = (i: number) => {
    setActiveColors((prev) => ({ ...prev, [i]: next() }));
  };

  const handleLeave = (i: number) => {
    setActiveColors((prev) => {
      const copy = { ...prev };
      delete copy[i];
      return copy;
    });
  };

  return (
    <section id="services" className="py-32 md:py-40 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-sm tracking-[0.2em] uppercase text-[#666] mb-4"
      >
        Nos expertises
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-['Outfit'] mb-20"
        style={{ fontWeight: 700 }}
      >
        Services
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          const color = activeColors[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={() => handleLeave(i)}
              className="group relative p-8 md:p-10 rounded-2xl border border-white/5 bg-[#111] hover:bg-[#161616] transition-all duration-500 cursor-default"
              style={{
                borderColor: color ? `${color}30` : "rgba(255,255,255,0.05)",
                transform: color ? "translateY(-4px)" : "translateY(0)",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <Icon
                size={28}
                strokeWidth={1.5}
                className="mb-6 transition-colors duration-300"
                style={{ color: color || "#666" }}
              />
              <h3
                className="text-lg font-['Outfit'] mb-3 transition-colors duration-300"
                style={{ color: color || "#F5F5F0", fontWeight: 600 }}
              >
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#888] font-light">
                {service.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
