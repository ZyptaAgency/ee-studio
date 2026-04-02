import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
  },
  title: "EE Studio — Stratégie. Création. Impact.",
  description:
    "EE Studio accompagne les marques dans leur développement marketing, de la stratégie à la production de contenu, avec une approche créative, opérationnelle et durable. Basé à Kinshasa.",
  openGraph: {
    title: "EE Studio — Stratégie. Création. Impact.",
    description:
      "Studio créatif, stratégique et opérationnel. Marketing, production audiovisuelle, consulting ESG.",
    type: "website",
    locale: "fr_FR",
    url: "https://ee-studio.info",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <AppShell>{children}</AppShell>
        <div className="noise-overlay" />
      </body>
    </html>
  );
}
