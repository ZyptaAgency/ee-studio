import type { Metadata } from "next";
import { Outfit, Sora } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "EE Studio — Stratégie. Création. Impact.",
  description:
    "EE Studio accompagne les marques dans leur développement marketing, de la stratégie à la production de contenu, avec une approche créative, opérationnelle et durable. Basé à Kinshasa, RDC.",
  keywords: [
    "EE Studio",
    "marketing",
    "production audiovisuelle",
    "création visuelle",
    "consulting ESG",
    "Kinshasa",
    "agence créative",
    "stratégie de marque",
  ],
  openGraph: {
    title: "EE Studio — Stratégie. Création. Impact.",
    description:
      "Studio créatif, stratégique et opérationnel basé à Kinshasa. Marketing, production audiovisuelle, création visuelle et consulting en développement durable.",
    type: "website",
    locale: "fr_FR",
    url: "https://ee-studio.info",
    siteName: "EE Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "EE Studio — Stratégie. Création. Impact.",
    description:
      "Studio créatif, stratégique et opérationnel basé à Kinshasa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${sora.variable}`}>
      <body className="antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
