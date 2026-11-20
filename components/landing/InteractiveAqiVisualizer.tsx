"use client";

import React, { useState } from "react";
import { INDIAN_CITY_PRESETS } from "@/lib/air-quality/constants";
import { generateDemonstrationData } from "@/lib/air-quality/service";
import { getAqiCategory } from "@/lib/utils";
import { ShieldCheck, Wind, AlertTriangle, ArrowRight, Activity, MapPin } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function InteractiveAqiVisualizer() {
  const cities = ["Delhi", "Kolkata", "Mumbai", "Bengaluru", "Asansol"];
  const [selectedCity, setSelectedCity] = useState("Delhi");

  const preset = INDIAN_CITY_PRESETS[selectedCity];
  // Determine realistic default scenario based on city profile
  const scenario = selectedCity === "Delhi" || selectedCity === "Asansol" || selectedCity === "Kolkata"
    ? "severe_winter"
    : selectedCity === "Mumbai"
    ? "moderate"
    : "good";

  const aqiData = generateDemonstrationData(selectedCity, preset.latitude, preset.longitude, scenario);
  const cat = getAqiCategory(aqiData.aqi);

  return (
    <div className="relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-xl shadow-emerald-950/5 backdrop-blur-xl">
      {/* City Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-5">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <MapPin className="h-3.5 w-3.5 text-emerald-600" />
          <span>Interactive City Simulation</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                selectedCity === city
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Main AQI Meter Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left: AQI Number & Gauge */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
            Current AQI (India NAQI)
          </div>
          <div className="relative flex items-center justify-center my-2">
            <span
              className={`text-6xl font-black tracking-tight ${cat.colorClass}`}
              aria-label={`Air Quality Index: ${aqiData.aqi}, Status: ${cat.label}`}
            >
              {aqiData.aqi}
            </span>
          </div>
          <Badge className={`px-3 py-1 font-semibold text-xs ${cat.badgeBg}`}>
            {cat.label}
          </Badge>
          <span className="text-[11px] text-slate-500 mt-2">
            Dominant: <strong className="text-slate-700 dark:text-slate-300">{aqiData.mainPollutant}</strong>
          </span>
        </div>

        {/* Right: Key Pollutant Metrics & Micro Advisory */}
        <div className="md:col-span-7 space-y-3">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 block">PM2.5 (Fine particulate)</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {aqiData.pollutants.pm25.value} <span className="text-xs font-normal text-slate-500">µg/m³</span>
              </span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 block mt-0.5 font-medium">
                {aqiData.pollutants.pm25.ratioOfStandard}x safe 24h standard
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 block">PM10 (Inhalable dust)</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {aqiData.pollutants.pm10.value} <span className="text-xs font-normal text-slate-500">µg/m³</span>
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Standard: 100 µg/m³
              </span>
            </div>
          </div>

          {/* Actionable Insight Box */}
          <div className="rounded-lg border border-emerald-900/10 dark:border-emerald-500/20 bg-emerald-50/70 dark:bg-emerald-950/30 p-3 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-900 dark:text-emerald-300 mb-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Today&apos;s Immediate Action:</span>
            </div>
            <p className="text-emerald-950 dark:text-emerald-200 leading-relaxed">
              {aqiData.aqi > 250
                ? "Thermal inversion is severe. Switch morning bike/walk commute to Metro and seal bedroom gaps."
                : aqiData.aqi > 120
                ? "Moderate particulates. Wear an N95 mask on two-wheeler commute and ventilate home mid-afternoon."
                : "Air quality allows regular outdoor workouts and natural cross-ventilation."}
            </p>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Activity className="h-3 w-3 text-emerald-600 animate-pulse" />
          Live NAQI standard calculation
        </span>
        <Link
          href={`/dashboard?city=${selectedCity}`}
          className="font-medium text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
        >
          View Full Dashboard Analysis <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
