"use client";
import ServicePage from "@/components/ServicePage";
import { getServiceBySlug } from "@/lib/services";

const service = getServiceBySlug("sport")!;

export default function ServicePageClient() {
  return (
    <ServicePage
      slug="sport"
      icon={service.icon}
      title={service.title}
      heroLine={service.heroLine}
      fullDesc={service.fullDesc}
      details={service.details}
      result={service.result}
    />
  );
}
