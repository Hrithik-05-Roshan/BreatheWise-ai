"use client";

import React, { useState } from "react";
import { compareCommuteOptions } from "@/lib/commute/calculator";
import { CommuteComparisonResult, TransportMode } from "@/lib/types/commute";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bike,
  Footprints,
  Train,
  Car,
  ShieldCheck,
  AlertTriangle,
  Leaf,
  Clock,
  Coins,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export function CommuteComparison({ currentAqi }: { currentAqi: number }) {
  const [distanceKm, setDistanceKm] = useState(12);
  const [origin, setOrigin] = useState("Home (Residential)");
  const [destination, setDestination] = useState("Tech Park / Office");

  const comparison: CommuteComparisonResult = compareCommuteOptions(
    origin,
    destination,
    distanceKm,
    currentAqi
  );

  const getModeIcon = (mode: TransportMode) => {
    switch (mode) {
      case "public_transport":
        return <Train className="h-5 w-5" />;
      case "bicycle":
        return <Bike className="h-5 w-5" />;
      case "walking":
        return <Footprints className="h-5 w-5" />;
      case "two_wheeler":
        return <span className="font-bold text-xs">2W</span>;
      default:
        return <Car className="h-5 w-5" />;
    }
  };

  const getExposureBadge = (level: string) => {
    switch (level) {
      case "Low":
      case "Very Low":
        return <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">Low Exposure</Badge>;
      case "Moderate":
        return <Badge className="bg-amber-100 text-amber-800 text-[10px]">Moderate Exposure</Badge>;
      default:
        return <Badge className="bg-rose-100 text-rose-800 text-[10px]">High Direct Intake</Badge>;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Train className="h-3.5 w-3.5 text-emerald-600" />
            Smart Commute Intelligence
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mt-0.5">
            Exposure vs. Carbon Trade-Off Matrix
          </h3>
        </div>
        <Badge variant="outline" className="text-xs text-slate-600 dark:text-slate-400">
          Evaluated at AQI: {currentAqi}
        </Badge>
      </div>

      {/* Distance Slider Input */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>One-Way Route Distance:</span>
          <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">
            {distanceKm} km
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={35}
          value={distanceKm}
          onChange={(e) => setDistanceKm(Number(e.target.value))}
          className="w-full accent-emerald-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>1 km (Hyperlocal)</span>
          <span>15 km (Suburban)</span>
          <span>35 km (Regional Corridor)</span>
        </div>
      </div>

      {/* Primary Smart Recommendation Highlight */}
      <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-900/10 dark:border-emerald-500/20 space-y-2">
        <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Optimal Route Decision Today: Take Public Transit (Metro / AC Bus)</span>
        </div>
        <p className="text-xs text-emerald-950 dark:text-emerald-300 leading-relaxed">
          {comparison.summaryReason}
        </p>
      </div>

      {/* 5-Mode Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparison.options.map((opt) => (
          <div
            key={opt.mode}
            className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
              opt.isRecommendedToday
                ? "border-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/20 ring-2 ring-emerald-600/20"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                  <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                    {getModeIcon(opt.mode)}
                  </div>
                  <span>{opt.title}</span>
                </div>
                {getExposureBadge(opt.estimatedExposureLevel)}
              </div>

              {/* Stats: Time, Emissions, Cost */}
              <div className="grid grid-cols-3 gap-1.5 py-2 border-y border-slate-100 dark:border-slate-800 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Duration</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{opt.durationMinutes}m</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Carbon</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{opt.emissionsKgCO2} kg</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Est. Cost</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">₹{opt.costInr}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {opt.exposureExplanation}
              </p>
            </div>

            {opt.advisoryNote && (
              <div className="text-[11px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-900/30">
                Notice: {opt.advisoryNote}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Route Disclaimer */}
      <div className="text-[11px] text-slate-400 italic pt-2">
        {comparison.disclaimer}
      </div>
    </div>
  );
}
