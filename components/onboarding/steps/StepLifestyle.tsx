"use client";

import React from "react";
import { Briefcase } from "lucide-react";
import { LifestyleType } from "@/lib/types/profile";

interface StepLifestyleProps {
  lifestyle: LifestyleType;
  setLifestyle: (lifestyle: LifestyleType) => void;
}

const LIFESTYLE_OPTIONS: { id: LifestyleType; title: string; desc: string }[] = [
  { id: "office_commuter", title: "Office Commuter", desc: "Daily morning and evening rush hour transit." },
  { id: "remote_worker", title: "Work From Home / Remote", desc: "Continuous indoor air quality and mid-day ventilation." },
  { id: "fitness_enthusiast", title: "Fitness Enthusiast / Runner", desc: "Cardio timing, outdoor jogging alerts, and indoor alternatives." },
  { id: "student", title: "Student (School / University)", desc: "Campus transit, library air quality, and outdoor recreation." },
  { id: "outdoor_worker", title: "Outdoor Worker / Field Professional", desc: "Long continuous outdoor exposure protection and hydration." },
];

export function StepLifestyle({ lifestyle, setLifestyle }: StepLifestyleProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          <Briefcase className="h-4 w-4" /> Daily Lifestyle
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          What is your primary daily routine?
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Helps us adjust your diurnal schedule for morning exercises and peak exposure hours.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {LIFESTYLE_OPTIONS.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setLifestyle(item.id)}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              lifestyle === item.id
                ? "border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 ring-2 ring-emerald-600/20"
                : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
            }`}
          >
            <div className="font-semibold text-sm text-slate-900 dark:text-white">{item.title}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
