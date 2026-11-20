"use client";

import React from "react";
import { Bike } from "lucide-react";
import { CommuteMethod } from "@/lib/types/profile";

interface StepCommuteProps {
  commuteMethod: CommuteMethod;
  setCommuteMethod: (method: CommuteMethod) => void;
  commuteDistanceKm: number;
  setCommuteDistanceKm: (dist: number) => void;
}

const COMMUTE_OPTIONS: { id: CommuteMethod; label: string }[] = [
  { id: "public_transport", label: "Metro / Bus" },
  { id: "two_wheeler", label: "Two-Wheeler (Bike/Scooter)" },
  { id: "car", label: "Private Car" },
  { id: "bicycle", label: "Bicycle" },
  { id: "walking", label: "Walking" },
  { id: "work_from_home", label: "No Commute (WFH)" },
];

export function StepCommute({
  commuteMethod,
  setCommuteMethod,
  commuteDistanceKm,
  setCommuteDistanceKm,
}: StepCommuteProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          <Bike className="h-4 w-4" /> Commute & Mobility
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          How do you usually travel?
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          We calculate respiratory particulate intake versus carbon emissions for your route.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {COMMUTE_OPTIONS.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setCommuteMethod(item.id)}
            className={`p-3 rounded-xl border text-sm font-medium text-center transition-all ${
              commuteMethod === item.id
                ? "border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-2 ring-emerald-600/20"
                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
          <span>Estimated One-Way Commute Distance:</span>
          <strong className="text-emerald-700 dark:text-emerald-400 font-bold">
            {commuteDistanceKm} km
          </strong>
        </div>
        <input
          type="range"
          min={1}
          max={40}
          value={commuteDistanceKm}
          onChange={(e) => setCommuteDistanceKm(Number(e.target.value))}
          className="w-full accent-emerald-600 cursor-pointer"
        />
      </div>
    </div>
  );
}
