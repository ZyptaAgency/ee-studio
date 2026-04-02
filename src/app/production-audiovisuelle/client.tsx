"use client";
import ServicePage from "@/components/ServicePage";
import { getServiceBySlug } from "@/lib/services";

const service = getServiceBySlug("production-audiovisuelle")!;

export default function ServicePageClient() {
  return (
    <ServicePage
      slug="production-audiovisuelle"
      icon={service.icon}
      title={service.title}
      heroLine={service.heroLine}
      fullDesc={service.fullDesc}
      details={service.details}
    />
  );
}
