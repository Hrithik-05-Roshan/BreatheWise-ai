"use client";

import React from "react";
import { Home } from "lucide-react";
import { CookingFuel } from "@/lib/types/profile";

interface StepIndoorProps {
  hasAirPurifier: boolean;
  setHasAirPurifier: (has: boolean) => void;
  cookingFuel: CookingFuel;
  setCookingFuel: (fuel: CookingFuel) => void;
  windowsFrequentlyOpen: boolean;
  setWindowsFrequentlyOpen: (open: boolean) => void;
}

const COOKING_FUEL_OPTIONS: { id: CookingFuel; label: string }[] = [
  { id: "lpg", label: "LPG Gas" },
  { id: "piped_gas", label: "Piped Natural Gas" },
  { id: "electric_induction", label: "Induction / Electric" },
  { id: "biomass_wood", label: "Biomass / Solid Fuel" },
];

export function StepIndoor({
  hasAirPurifier,
  setHasAirPurifier,
  cookingFuel,
  setCookingFuel,
  windowsFrequentlyOpen,
  setWindowsFrequentlyOpen,
}: StepIndoorProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          <Home className="h-4 w-4" /> Indoor Environment
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Your Home Living Conditions
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Indoor air is often 2-5x dirtier than outdoor air when closed cooking fumes and incense accumulate.
        </p>
      </div>

      <div className="space-y-4">
        {/* Air Purifier Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white block">
              Do you own an active HEPA air purifier?
            </span>
            <span className="text-xs text-slate-500">
              If no, we will provide proven zero-cost clean room sealing strategies.
            </span>
          </div>
          <button
            type="button"
            aria-label="Toggle air purifier ownership"
            onClick={() => setHasAirPurifier(!hasAirPurifier)}
            className={`h-6 w-11 rounded-full transition-colors relative ${
              hasAirPurifier ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-700"
            }`}
          >
            <span
              className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                hasAirPurifier ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Cooking Fuel Type */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
            Primary Cooking Fuel
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {COOKING_FUEL_OPTIONS.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setCookingFuel(item.id)}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                  cookingFuel === item.id
                    ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold"
                    : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Window ventilation toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white block">
              Are windows kept open during morning hours?
            </span>
            <span className="text-xs text-slate-500">
              Morning windows allow ground inversion smoke to enter living areas.
            </span>
          </div>
          <button
            type="button"
            aria-label="Toggle morning window ventilation"
            onClick={() => setWindowsFrequentlyOpen(!windowsFrequentlyOpen)}
            className={`h-6 w-11 rounded-full transition-colors relative ${
              windowsFrequentlyOpen ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-700"
            }`}
          >
            <span
              className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                windowsFrequentlyOpen ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
