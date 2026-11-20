import { ImpactSummaryData, SustainableActionItem } from "../types/impact";

export const DEFAULT_SUSTAINABLE_ACTIONS: SustainableActionItem[] = [
  {
    id: "act-metro-commute",
    title: "Commute via Metro instead of Private Car",
    category: "commute",
    co2SavedKg: 2.7,
    exposureReductionPoints: 35,
    description: "Replaced 15 km solo drive with underground electric transit",
    frequency: "daily",
    isCompleted: false,
  },
  {
    id: "act-seal-gaps",
    title: "Draft-proof Bedroom Windows during Peak Smog",
    category: "clean_air",
    co2SavedKg: 0.3,
    exposureReductionPoints: 40,
    description: "Prevented toxic outdoor PM2.5 infiltration during nocturnal inversion",
    frequency: "daily",
    isCompleted: false,
  },
  {
    id: "act-trip-chain",
    title: "Chain Errands into a Single Trip",
    category: "commute",
    co2SavedKg: 1.5,
    exposureReductionPoints: 20,
    description: "Eliminated 2 cold engine starts by combining grocery and pharmacy runs",
    frequency: "daily",
    isCompleted: false,
  },
  {
    id: "act-hepa-maintain",
    title: "Clean / Vacuum Purifier Pre-Filter Mesh",
    category: "energy",
    co2SavedKg: 0.4,
    exposureReductionPoints: 30,
    description: "Restores purifier CADR efficiency by 18% while lowering motor wattage",
    frequency: "weekly",
    isCompleted: false,
  },
  {
    id: "act-no-incense",
    title: "Eliminate Indoor Incense / Scented Candles",
    category: "clean_air",
    co2SavedKg: 0.2,
    exposureReductionPoints: 45,
    description: "Avoided generating up to 250 µg/m³ of ultrafine indoor volatile organic soot",
    frequency: "daily",
    isCompleted: false,
  },
];

export function calculateImpactSummary(
  actions: SustainableActionItem[],
  streakDays: number = 5
): ImpactSummaryData {
  const completed = actions.filter((a) => a.isCompleted);
  const totalCo2SavedKg = completed.reduce((sum, a) => sum + a.co2SavedKg, 0);
  const sustainableTripKm = completed
    .filter((a) => a.category === "commute")
    .length * 12; // approximate average trip distance

  // Clean air hours estimated from indoor actions
  const indoorCleanAirActions = completed.filter(
    (a) => a.category === "clean_air" || a.category === "energy"
  ).length;
  const estimatedCleanerAirHours = indoorCleanAirActions * 6;

  // 7-day trend
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyTrend = days.map((day, idx) => {
    const factor = (idx + 1) / 7;
    return {
      day,
      co2SavedKg: Math.round((totalCo2SavedKg * 0.4 + factor * 2.2) * 10) / 10,
      actionsCount: Math.round(1 + factor * 3),
    };
  });

  return {
    totalCo2SavedKg: Math.round(totalCo2SavedKg * 10) / 10,
    actionsCompletedCount: completed.length,
    streakDays,
    sustainableTripKm,
    estimatedCleanerAirHours,
    weeklyTrend,
    methodologyNote:
      "Calculations use CPCB & Central Electricity Authority (CEA) emission baselines: 0.165 kg CO2/km for private cars vs 0.015 kg CO2/passenger-km for metro rail transit. Clean air hours assume 6h protected exposure per room draft-proofing or HEPA cycle.",
  };
}
