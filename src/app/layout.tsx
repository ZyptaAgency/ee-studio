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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
  },
  title: "EE Studio — Strategy. Creation. Impact.",
  description:
    "EE Studio supports brands in their marketing development, from strategy to content production, with a creative, operational, and sustainable approach. Based in Kinshasa, DRC.",
  keywords: [
    "EE Studio",
    "marketing",
    "video production",
    "visual creation",
    "ESG consulting",
    "Kinshasa",
    "creative agency",
    "brand strategy",
  ],
  openGraph: {
    title: "EE Studio — Strategy. Creation. Impact.",
    description:
      "Creative, strategic, and operational studio based in Kinshasa. Marketing, video production, visual creation, and sustainability consulting.",
    type: "website",
    locale: "en_US",
    url: "https://ee-studio.info",
    siteName: "EE Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "EE Studio — Strategy. Creation. Impact.",
    description:
      "Creative, strategic, and operational studio based in Kinshasa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${sora.variable}`}>
      <body className="antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
