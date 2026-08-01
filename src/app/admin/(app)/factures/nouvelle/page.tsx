import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import InvoiceForm, { type ClientOption } from "./InvoiceForm";

export const dynamic = "force-dynamic";

export default async function NouvelleFacturePage() {
  const [clients, settings] = await Promise.all([
    prisma.client.findMany({ orderBy: { name: "asc" } }),
    getSettings(),
  ]);
  const options: ClientOption[] = clients.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    company: c.company,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-['Outfit'] font-semibold">Nouvelle facture</h1>
        <p className="text-sm text-[#777] mt-1">Renseignez le client et les prestations</p>
      </div>
      <InvoiceForm clients={options} defaultCurrency={settings.defaultCurrency} defaultTaxRate={settings.defaultTaxRate} />
    </div>
  );
}
