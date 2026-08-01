import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSettings } from "@/lib/settings";

export const revalidate = 0;

const WEATHER_LABELS: Record<number, string> = {
  0: "Ciel dégagé",
  1: "Plutôt dégagé",
  2: "Partiellement nuageux",
  3: "Couvert",
  45: "Brouillard",
  48: "Brouillard givrant",
  51: "Bruine légère",
  53: "Bruine",
  55: "Bruine dense",
  61: "Pluie légère",
  63: "Pluie",
  65: "Pluie forte",
  71: "Neige légère",
  73: "Neige",
  75: "Neige forte",
  80: "Averses",
  81: "Averses",
  82: "Averses violentes",
  95: "Orage",
  96: "Orage avec grêle",
  99: "Orage avec grêle",
};

async function geocode(city: string): Promise<{ lat: number; lon: number; label: string } | null> {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    const r = data.results?.[0];
    if (!r) return null;
    return { lat: r.latitude, lon: r.longitude, label: r.name };
  } catch {
    return null;
  }
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const settings = await getSettings();
  const cityName = settings.weatherCity || process.env.DASHBOARD_CITY || "Kinshasa";
  const coords = (await geocode(cityName)) || { lat: -4.4419, lon: 15.2663, label: "Kinshasa" };

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;
    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) throw new Error("weather fetch failed");
    const data = await res.json();
    const c = data.current;
    return NextResponse.json({
      city: coords.label,
      temperature: Math.round(c.temperature_2m),
      humidity: c.relative_humidity_2m,
      wind: Math.round(c.wind_speed_10m),
      code: c.weather_code,
      description: WEATHER_LABELS[c.weather_code] ?? "—",
    });
  } catch {
    return NextResponse.json({ error: "Météo indisponible" }, { status: 502 });
  }
}
