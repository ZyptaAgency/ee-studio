import type { Metadata } from "next";
import PrivacyClient from "./client";

export const metadata: Metadata = {
  title: "Politique de confidentialité — EE Studio",
  description: "Politique de confidentialité et gestion des cookies du site EE Studio.",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
