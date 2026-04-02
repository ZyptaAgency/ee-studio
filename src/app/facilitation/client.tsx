"use client";
import ServicePage from "@/components/ServicePage";
import { getServiceBySlug } from "@/lib/services";

const service = getServiceBySlug("facilitation")!;

export default function ServicePageClient() {
  return (
    <ServicePage
      icon={service.icon}
      title={service.title}
      heroLine={service.heroLine}
      fullDesc={service.fullDesc}
      details={service.details}
    />
  );
}
