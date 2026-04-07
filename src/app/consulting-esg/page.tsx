import { getServiceBySlug } from "@/lib/services";
import ServicePageClient from "./client";
import type { Metadata } from "next";

const service = getServiceBySlug("consulting-esg")!;

export const metadata: Metadata = {
  title: `${service.title} - EE Studio`,
  description: service.fullDesc.slice(0, 160),
};

export default function Page() {
  return <ServicePageClient />;
}
