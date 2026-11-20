"use client";

import React, { useState } from "react";
import { DEFAULT_SUSTAINABLE_ACTIONS, calculateImpactSummary } from "@/lib/impact/tracker";
import { SustainableActionItem } from "@/lib/types/impact";
import { Leaf, Check, Plus, Award, ShieldCheck, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SustainableActionsList() {
  const [actions, setActions] = useState<SustainableActionItem[]>(DEFAULT_SUSTAINABLE_ACTIONS);

  const toggleAction = (id: string) => {
    setActions(
      actions.map((a) =>
        a.id === id
          ? { ...a, isCompleted: !a.isCompleted, completedAt: !a.isCompleted ? new Date().toISOString() : undefined }
          : a
      )
    );
  };

  const summary = calculateImpactSummary(actions);

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Leaf className="h-3.5 w-3.5 text-emerald-600" />
            Sustainable Habit Tracker
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mt-0.5">
            Low-Emission Urban Actions
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-700 text-white text-xs font-bold px-3 py-1">
            {summary.totalCo2SavedKg} kg CO2 Avoided Today
          </Badge>
        </div>
      </div>

      {/* Action List */}
      <div className="space-y-3">
        {actions.map((act) => (
          <div
            key={act.id}
            onClick={() => toggleAction(act.id)}
            className={`p-4 rounded-xl border cursor-pointer flex items-start gap-4 transition-all ${
              act.isCompleted
                ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20"
                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-850"
            }`}
          >
            <div
              className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                act.isCompleted
                  ? "bg-emerald-700 text-white"
                  : "border-2 border-slate-300 dark:border-slate-600"
              }`}
            >
              {act.isCompleted && <Check className="h-4 w-4 stroke-[3]" />}
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className={`font-semibold text-sm ${act.isCompleted ? "line-through text-slate-500" : "text-slate-900 dark:text-white"}`}>
                  {act.title}
                </span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  +{act.co2SavedKg} kg CO2
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {act.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sustainable Trip Chaining Guide */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <TrendingDown className="h-4 w-4 text-emerald-600" />
          <span>Trip Chaining: Why It Multiplies Impact</span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          When an automobile engine starts cold, its catalytic converter takes up to 5 kilometers to reach 400°C operating temperature. Cold-start trips emit up to 4x higher carbon monoxide and unburnt hydrocarbons per km. Grouping errands reduces these high-emission cycles by 65%.
        </p>
      </div>
    </div>
  );
}
