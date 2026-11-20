"use client";

import React from "react";
import { AirQualityData } from "@/lib/types/air-quality";
import { getAqiCategory } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, Database, ShieldAlert, Sparkles } from "lucide-react";

export function AQICard({ data }: { data: AirQualityData }) {
  const cat = getAqiCategory(data.aqi);

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-emerald-600" />
            Current Air Quality (NAQI India)
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            {data.city} Air Quality Index
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {data.isSimulatedDemo ? (
            <Badge variant="outline" className="border-amber-400 bg-amber-50 text-amber-800 text-[11px]">
              Offline Simulation Mode
            </Badge>
          ) : (
            <Badge variant="outline" className="border-emerald-400 bg-emerald-50 text-emerald-800 text-[11px] flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live Synced Data
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
        {/* Main Score Gauge */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
          <span className="text-xs uppercase font-semibold text-slate-500">CPCB Sub-Index</span>
          <span className={`text-6xl sm:text-7xl font-black tracking-tight my-2 ${cat.colorClass}`}>
            {data.aqi}
          </span>
          <Badge className={`px-4 py-1 text-sm font-bold ${cat.badgeBg}`}>
            {cat.label}
          </Badge>
          <span className="text-xs text-slate-500 mt-3 font-medium">
            Primary Pollutant: <strong className="text-slate-800 dark:text-slate-200">{data.mainPollutant}</strong>
          </span>
        </div>

        {/* Health Advisory & Pollutant Grid */}
        <div className="md:col-span-8 space-y-4">
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <ShieldAlert className="h-4 w-4 text-emerald-600" />
              <span>Official Health Advisory:</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {data.healthAdvisory}
            </p>
          </div>

          {/* Pollutant Breakdown Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40">
              <span className="text-[11px] text-slate-500 block">PM2.5 (Fine Soot)</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                {data.pollutants.pm25.value} <span className="text-[10px] text-slate-400 font-normal">µg/m³</span>
              </span>
              <span className="text-[10px] text-amber-600 block mt-0.5 font-medium">
                {data.pollutants.pm25.ratioOfStandard}x CPCB limit
              </span>
            </div>

            <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40">
              <span className="text-[11px] text-slate-500 block">PM10 (Coarse Dust)</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                {data.pollutants.pm10.value} <span className="text-[10px] text-slate-400 font-normal">µg/m³</span>
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Limit: 100 µg/m³
              </span>
            </div>

            <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40">
              <span className="text-[11px] text-slate-500 block">NO2 (Vehicular)</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                {data.pollutants.no2?.value ?? 32} <span className="text-[10px] text-slate-400 font-normal">µg/m³</span>
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Limit: 80 µg/m³
              </span>
            </div>

            <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40">
              <span className="text-[11px] text-slate-500 block">Ozone (O3)</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                {data.pollutants.o3?.value ?? 45} <span className="text-[10px] text-slate-400 font-normal">µg/m³</span>
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Limit: 100 µg/m³
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Provenance and Timestamp */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
        <span className="flex items-center gap-1.5">
          <Database className="h-3 w-3 text-slate-400" />
          Source: {data.source}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3 w-3 text-slate-400" />
          Updated: {new Date(data.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}
