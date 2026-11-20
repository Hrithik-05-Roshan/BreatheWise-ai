"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { INDIAN_CITY_PRESETS } from "@/lib/air-quality/constants";

interface StepLocationProps {
  city: string;
  setCity: (city: string) => void;
  customCity: string;
  setCustomCity: (customCity: string) => void;
}

export function StepLocation({
  city,
  setCity,
  customCity,
  setCustomCity,
}: StepLocationProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          <MapPin className="h-4 w-4" /> Location Context
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Where is your household located?
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Air quality, wind inversion, and regional pollutants vary significantly between geographic zones.
        </p>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">
          Select City Preset
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {Object.keys(INDIAN_CITY_PRESETS).slice(0, 6).map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => {
                setCity(c);
                setCustomCity("");
              }}
              className={`p-3 rounded-xl border text-sm font-medium text-left transition-all ${
                city === c && !customCity
                  ? "border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-2 ring-emerald-600/20"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="pt-2">
          <label htmlFor="custom-city" className="text-xs font-medium text-slate-500 block mb-1">
            Or enter custom locality / other city
          </label>
          <input
            id="custom-city"
            type="text"
            placeholder="e.g. Asansol, Howrah, Gurugram"
            value={customCity}
            onChange={(e) => setCustomCity(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}
