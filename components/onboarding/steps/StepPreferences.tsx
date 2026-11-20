"use client";

import React from "react";
import { Sliders, ShieldCheck } from "lucide-react";

interface StepPreferencesProps {
  budgetPreference: "zero_cost" | "low_cost" | "flexible";
  setBudgetPreference: (budget: "zero_cost" | "low_cost" | "flexible") => void;
}

const BUDGET_OPTIONS: {
  id: "zero_cost" | "low_cost" | "flexible";
  label: string;
  desc: string;
}[] = [
  { id: "zero_cost", label: "Zero-Cost Only", desc: "Sealing, behavior shifts, timing" },
  { id: "low_cost", label: "Low-Cost ($)", desc: "N95 masks, DIY filters, draft stoppers" },
  { id: "flexible", label: "Flexible", desc: "HEPA purifiers, smart sensors, transit passes" },
];

export function StepPreferences({
  budgetPreference,
  setBudgetPreference,
}: StepPreferencesProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          <Sliders className="h-4 w-4" /> Priorities & Budget
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Recommendation Preferences
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Tailor advice to your economic constraints and climate goals.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
            Preferred Action Budget
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {BUDGET_OPTIONS.map((b) => (
              <button
                type="button"
                key={b.id}
                onClick={() => setBudgetPreference(b.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  budgetPreference === b.id
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold ring-2 ring-emerald-600/20"
                    : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="text-sm font-semibold">{b.label}</div>
                <div className="text-[11px] text-slate-500 mt-1">{b.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-900/10 dark:border-emerald-500/20 text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-200">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Zero Tracking & Local Storage Privacy</span>
          </div>
          <p className="text-emerald-950 dark:text-emerald-300 leading-relaxed">
            Your profile preferences are stored exclusively on your device browser. No sensitive identity information is transmitted or sold.
          </p>
        </div>
      </div>
    </div>
  );
}
