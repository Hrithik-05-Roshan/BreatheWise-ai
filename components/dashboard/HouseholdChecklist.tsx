"use client";

import React, { useState } from "react";
import { CheckSquare, Check, Sparkles, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChecklistItem {
  id: string;
  title: string;
  category: "home" | "commute" | "health";
  points: number;
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: "c1", title: "Keep bedroom windows closed until 11:00 AM inversion clears", category: "home", points: 15 },
  { id: "c2", title: "Wear tight-fitting N95 respirator during morning commute", category: "commute", points: 20 },
  { id: "c3", title: "Turn on kitchen exhaust fan while cooking to vent combustion gases", category: "home", points: 15 },
  { id: "c4", title: "Avoid strenuous outdoor cardio before 10:00 AM", category: "health", points: 20 },
  { id: "c5", title: "Clean or vacuum air purifier mesh pre-filter", category: "home", points: 10 },
  { id: "c6", title: "Chain 2 or more errands into one continuous trip", category: "commute", points: 20 },
];

export function HouseholdChecklist() {
  const [items, setItems] = useState<string[]>(["c1", "c3"]);

  const toggleItem = (id: string) => {
    if (items.includes(id)) {
      setItems(items.filter((i) => i !== id));
    } else {
      setItems([...items, id]);
    }
  };

  const totalPoints = items.reduce((sum, id) => {
    const item = DEFAULT_CHECKLIST.find((i) => i.id === id);
    return sum + (item?.points || 0);
  }, 0);

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <CheckSquare className="h-3.5 w-3.5 text-emerald-600" />
            Interactive Daily Safety Routine
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mt-0.5">
            Household Exposure Checklist
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-900/10 text-xs font-bold text-emerald-800 dark:text-emerald-300">
          <Award className="h-3.5 w-3.5" />
          <span>{totalPoints} / 100 Pts</span>
        </div>
      </div>

      <div className="space-y-2.5">
        {DEFAULT_CHECKLIST.map((item) => {
          const isDone = items.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                isDone
                  ? "border-emerald-600/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-850"
              }`}
            >
              <div
                className={`h-5 w-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isDone
                    ? "bg-emerald-700 text-white"
                    : "border border-slate-300 dark:border-slate-600"
                }`}
              >
                {isDone && <Check className="h-3.5 w-3.5 stroke-[3]" />}
              </div>
              <div className="flex-1">
                <span className={`text-sm font-medium block ${isDone ? "line-through text-slate-500" : ""}`}>
                  {item.title}
                </span>
                <span className="text-[10px] uppercase font-semibold text-emerald-700 dark:text-emerald-400">
                  +{item.points} Exposure Mitigation Pts
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
