"use client";

import React from "react";
import { Users, CheckCircle2 } from "lucide-react";
import { HouseholdType } from "@/lib/types/profile";

interface StepHouseholdProps {
  household: HouseholdType;
  setHousehold: (household: HouseholdType) => void;
}

const HOUSEHOLD_OPTIONS: { id: HouseholdType; title: string; desc: string }[] = [
  {
    id: "individual",
    title: "Individual Living Alone",
    desc: "Focus on personal workout routines, commuting exposure, and single room air quality.",
  },
  {
    id: "couple",
    title: "Couple / Dual Professional Household",
    desc: "Balanced indoor routines, shared commute scheduling, and household energy optimization.",
  },
  {
    id: "family_children",
    title: "Family with Children (High Priority)",
    desc: "Specialized advisories for school commutes, playground play windows, and pediatric lung safety.",
  },
  {
    id: "household_seniors",
    title: "Household with Senior Citizens (High Priority)",
    desc: "Cardiovascular and pulmonary protection, indoor morning walking alternatives, and strict sealing.",
  },
  {
    id: "family",
    title: "Multi-generation General Family",
    desc: "Comprehensive multi-room air management and community trip chaining.",
  },
];

export function StepHousehold({ household, setHousehold }: StepHouseholdProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          <Users className="h-4 w-4" /> Household Vulnerability
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Who lives in your home?
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Personalization directly prioritizes health advisories for high-vulnerability respiratory groups.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {HOUSEHOLD_OPTIONS.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setHousehold(item.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              household === item.id
                ? "border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 ring-2 ring-emerald-600/20"
                : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
            }`}
          >
            <div className="font-semibold text-sm text-slate-900 dark:text-white flex items-center justify-between">
              {item.title}
              {household === item.id && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
