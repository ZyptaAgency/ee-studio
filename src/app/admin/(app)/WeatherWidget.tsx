"use client";
import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, CloudSnow, CloudFog, Wind, Droplets, Zap } from "lucide-react";

type Weather = {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  code: number;
  description: string;
};

function iconFor(code: number) {
  if (code === 0 || code === 1) return Sun;
  if (code === 2 || code === 3) return Cloud;
  if (code >= 45 && code <= 48) return CloudFog;
  if (code >= 51 && code <= 67) return CloudRain;
  if (code >= 71 && code <= 77) return CloudSnow;
  if (code >= 80 && code <= 82) return CloudRain;
  if (code >= 95) return Zap;
  return Cloud;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/admin/weather")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setWeather)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 h-full flex items-center justify-center">
        <p className="text-sm text-[#666]">Météo indisponible</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 h-full animate-pulse">
        <div className="h-4 w-24 bg-white/5 rounded mb-4" />
        <div className="h-10 w-20 bg-white/5 rounded" />
      </div>
    );
  }

  const Icon = iconFor(weather.code);

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#141414] to-[#0f0f0f] p-6 h-full flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#666]">{weather.city}</p>
          <p className="text-4xl font-['Outfit'] font-semibold mt-2">{weather.temperature}°C</p>
          <p className="text-sm text-[#999] mt-1">{weather.description}</p>
        </div>
        <div className="text-[#A8D8C8]">
          <Icon size={40} strokeWidth={1.5} />
        </div>
      </div>
      <div className="flex gap-6 mt-6 text-sm text-[#888]">
        <span className="flex items-center gap-2">
          <Droplets size={15} className="text-[#A8D8C8]" /> {weather.humidity}%
        </span>
        <span className="flex items-center gap-2">
          <Wind size={15} className="text-[#C3B1E1]" /> {weather.wind} km/h
        </span>
      </div>
    </div>
  );
}
