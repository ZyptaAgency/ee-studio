"use client";
import ServicePage from "@/components/ServicePage";
import { getServiceBySlug } from "@/lib/services";

const service = getServiceBySlug("marketing-strategique")!;

export default function ServicePageClient() {
  return (
    <ServicePage
      slug="marketing-strategique"
      icon={service.icon}
      title={service.title}
      heroLine={service.heroLine}
      fullDesc={service.fullDesc}
      details={service.details}
    />
  );
}
