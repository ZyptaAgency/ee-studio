import { getSettings } from "@/lib/settings";
import SettingsForm, { type SettingsData } from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function ParametresPage() {
  const s = await getSettings();
  const data: SettingsData = {
    companyName: s.companyName,
    companyEmail: s.companyEmail ?? "",
    companyPhone: s.companyPhone ?? "",
    companyAddress: s.companyAddress ?? "",
    taxId: s.taxId ?? "",
    logo: s.logo ?? "",
    defaultCurrency: s.defaultCurrency,
    defaultTaxRate: s.defaultTaxRate,
    invoiceNotes: s.invoiceNotes ?? "",
    weatherCity: s.weatherCity,
    revenueGoal: s.revenueGoal,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-['Outfit'] font-semibold">Paramètres</h1>
        <p className="text-sm text-[#777] mt-1">Coordonnées, facturation, objectifs — utilisés dans les factures et le dashboard</p>
      </div>
      <SettingsForm initial={data} />
    </div>
  );
}
