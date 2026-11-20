import React from "react";
import { DailyPlanSlot } from "@/lib/types/recommendations";
import { Clock, Sun, Sunrise, Sunset, Moon, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DailyStatusCard({ slots }: { slots: DailyPlanSlot[] }) {
  const getSlotIcon = (slot: string) => {
    switch (slot) {
      case "morning":
        return <Sunrise className="h-4 w-4 text-amber-500" />;
      case "afternoon":
        return <Sun className="h-4 w-4 text-emerald-500" />;
      case "evening":
        return <Sunset className="h-4 w-4 text-orange-500" />;
      default:
        return <Moon className="h-4 w-4 text-indigo-500" />;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-emerald-600" />
          Diurnal Action Schedule
        </span>
        <h3 className="font-bold text-slate-900 dark:text-white text-lg mt-0.5">
          Today&apos;s Four Diurnal Windows
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {slots.map((slot) => (
          <div
            key={slot.timeSlot}
            className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900 dark:text-white">
                  {getSlotIcon(slot.timeSlot)}
                  <span>{slot.label.split(" ")[0]}</span>
                </div>
                <Badge variant="outline" className="text-[10px] font-medium">
                  AQI ~{slot.expectedAqiRange}
                </Badge>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 block mb-2">
                {slot.timeRange}
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {slot.conditionSummary}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px]">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Top Priority Action:
              </span>
              <span className="text-slate-600 dark:text-slate-400 block">
                {slot.recommendations[0]?.title || "Seal rooms and avoid peak transit"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
