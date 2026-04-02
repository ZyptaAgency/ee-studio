"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { usePastelRotation } from "@/hooks/usePastelRotation";
import { useI18n } from "@/lib/i18n";
import Image from "next/image";
import { useState } from "react";

const SECTIONS_FR = [
  {
    title: "1. Introduction",
    content:
      "EE Studio SARL (ci-après « EE Studio », « nous ») s'engage à protéger la vie privée des visiteurs de son site web ee-studio.info. La présente politique de confidentialité explique quelles données nous collectons, pourquoi et comment nous les utilisons.",
  },
  {
    title: "2. Données collectées",
    content:
      "Nous collectons uniquement les données strictement nécessaires au bon fonctionnement du site :\n\n• Cookies essentiels : préférence de langue, consentement aux cookies.\n• Cookies analytiques (optionnels) : données anonymisées de navigation pour comprendre l'utilisation du site.\n• Formulaire de contact : nom, adresse email et message que vous nous transmettez volontairement.",
  },
  {
    title: "3. Utilisation des données",
    content:
      "Les données collectées sont utilisées exclusivement pour :\n\n• Assurer le fonctionnement technique du site.\n• Répondre à vos demandes via le formulaire de contact.\n• Améliorer l'expérience utilisateur grâce aux données analytiques anonymisées.",
  },
  {
    title: "4. Cookies",
    content:
      "Ce site utilise des cookies. Lors de votre première visite, un bandeau vous permet d'accepter ou de refuser les cookies non essentiels. Vous pouvez modifier vos préférences à tout moment.\n\n• Cookies essentiels : nécessaires au fonctionnement du site (toujours actifs).\n• Cookies analytiques : optionnels, utilisés pour comprendre l'utilisation du site.",
  },
  {
    title: "5. Partage des données",
    content:
      "Nous ne vendons, n'échangeons ni ne transférons vos données personnelles à des tiers, sauf obligation légale.",
  },
  {
    title: "6. Conservation des données",
    content:
      "Les données du formulaire de contact sont conservées le temps nécessaire au traitement de votre demande. Les cookies ont une durée de vie maximale de 12 mois.",
  },
  {
    title: "7. Vos droits",
    content:
      "Conformément à la législation en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, contactez-nous à contact@ee-studio.info.",
  },
  {
    title: "8. Contact",
    content:
      "Pour toute question relative à cette politique de confidentialité :\n\nEE Studio SARL\nKinshasa, RDC\nEmail : contact@ee-studio.info",
  },
];

const SECTIONS_EN = [
  {
    title: "1. Introduction",
    content:
      "EE Studio SARL (hereinafter \"EE Studio\", \"we\") is committed to protecting the privacy of visitors to its website ee-studio.info. This privacy policy explains what data we collect, why and how we use it.",
  },
  {
    title: "2. Data collected",
    content:
      "We only collect data strictly necessary for the proper functioning of the site:\n\n• Essential cookies: language preference, cookie consent.\n• Analytical cookies (optional): anonymized browsing data to understand site usage.\n• Contact form: name, email address and message that you voluntarily provide.",
  },
  {
    title: "3. Use of data",
    content:
      "The data collected is used exclusively to:\n\n• Ensure the technical operation of the site.\n• Respond to your requests via the contact form.\n• Improve the user experience through anonymized analytical data.",
  },
  {
    title: "4. Cookies",
    content:
      "This site uses cookies. On your first visit, a banner allows you to accept or refuse non-essential cookies. You can change your preferences at any time.\n\n• Essential cookies: necessary for the site to function (always active).\n• Analytical cookies: optional, used to understand site usage.",
  },
  {
    title: "5. Data sharing",
    content:
      "We do not sell, trade or transfer your personal data to third parties, except as required by law.",
  },
  {
    title: "6. Data retention",
    content:
      "Contact form data is retained for the time necessary to process your request. Cookies have a maximum lifespan of 12 months.",
  },
  {
    title: "7. Your rights",
    content:
      "In accordance with applicable legislation, you have the right to access, rectify and delete your personal data. To exercise these rights, contact us at contact@ee-studio.info.",
  },
  {
    title: "8. Contact",
    content:
      "For any questions regarding this privacy policy:\n\nEE Studio SARL\nKinshasa, DRC\nEmail: contact@ee-studio.info",
  },
];

export default function PrivacyClient() {
  const { next } = usePastelRotation();
  const { lang, t } = useI18n();
  const [backColor, setBackColor] = useState("#666");

  const sections = lang === "en" ? SECTIONS_EN : SECTIONS_FR;
  const title = lang === "en" ? "Privacy Policy" : "Politique de confidentialité";
  const updated = lang === "en" ? "Last updated: April 2026" : "Dernière mise à jour : Avril 2026";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 py-5 backdrop-blur-xl bg-[#0A0A0A]/90 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-3 text-sm tracking-wide transition-colors duration-300"
            style={{ color: backColor }}
            onMouseEnter={() => setBackColor(next())}
            onMouseLeave={() => setBackColor("#666")}
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            {t.servicePage.back}
          </a>
          <a href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="EE Studio"
              width={200}
              height={141}
              className="h-14 w-auto object-contain"
            />
          </a>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-8 md:px-16 lg:px-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl lg:text-5xl font-['Outfit'] mb-4"
            style={{ fontWeight: 800 }}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm text-[#666] font-light mb-16"
          >
            {updated}
          </motion.p>

          <div className="space-y-12">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <h2 className="text-lg font-['Outfit'] text-[#F5F5F0] mb-4" style={{ fontWeight: 600 }}>
                  {section.title}
                </h2>
                <p className="text-sm text-[#AAA] font-light leading-[2] whitespace-pre-line">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-8 px-8 md:px-16 text-center space-y-2">
        <p className="text-[11px] text-[#555] font-light">
          © {new Date().getFullYear()} EE Studio SARL — {t.footer.rights}
        </p>
        <a
          href="https://zypta.be"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] hover:opacity-80 transition-opacity duration-300 tracking-wider inline-block"
        >
          <span className="text-[#555]">{lang === "fr" ? "Développé par " : "Developed by "}</span>
          <span className="zypta-brand">Zypta</span>
          <span className="text-[#555]">.be</span>
        </a>
      </footer>
    </>
  );
}
