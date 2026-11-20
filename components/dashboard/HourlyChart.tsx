"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Layers } from "lucide-react";

interface HourlyPoint {
  time: string;
  aqi: number;
  pm25: number;
  pm10: number;
  type: "observed" | "forecast" | "simulated";
}

export function HourlyChart({ data }: { data: HourlyPoint[] }) {
  const [metric, setMetric] = useState<"aqi" | "pm25">("aqi");

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
            24-Hour Diurnal Dynamics
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">
            Observed & Forecast Trend
          </h3>
        </div>

        {/* Metric Switcher */}
        <div className="flex items-center space-x-2">
          <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 text-xs">
            <button
              onClick={() => setMetric("aqi")}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                metric === "aqi"
                  ? "bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 font-semibold shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              NAQI Index
            </button>
            <button
              onClick={() => setMetric("pm25")}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                metric === "pm25"
                  ? "bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 font-semibold shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              PM2.5 (µg/m³)
            </button>
          </div>
        </div>
      </div>

      {/* Legend & Clarification */}
      <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
          <span>Observed Sensor History (Past 6 hrs)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-teal-400" />
          <span>Diurnal Forecast Window</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pt = payload[0].payload as HourlyPoint;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white dark:bg-slate-800 p-3 shadow-lg text-xs space-y-1">
                      <span className="font-bold text-slate-900 dark:text-white block">
                        Time: {pt.time}
                      </span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold block">
                        {metric === "aqi" ? `AQI: ${pt.aqi}` : `PM2.5: ${pt.pm25} µg/m³`}
                      </span>
                      <span className="text-slate-400 text-[10px] uppercase font-medium">
                        Type: {pt.type}
                      </span>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey={metric}
              stroke="#059669"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorMetric)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2 flex items-center justify-between">
        <span>Typical diurnal pattern: Inversion peak at morning (07:00-09:30), optimal dispersion at mid-afternoon (13:00-16:00).</span>
      </div>
    </div>
  );
}
