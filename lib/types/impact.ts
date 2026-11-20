export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  description: string;
  baselineComparison: string;
}

export interface SustainableActionItem {
  id: string;
  title: string;
  category: 'commute' | 'energy' | 'consumption' | 'clean_air';
  co2SavedKg: number;
  exposureReductionPoints: number;
  description: string;
  frequency: 'daily' | 'one_time' | 'weekly';
  isCompleted: boolean;
  completedAt?: string;
}

export interface ImpactSummaryData {
  totalCo2SavedKg: number;
  actionsCompletedCount: number;
  streakDays: number;
  sustainableTripKm: number;
  estimatedCleanerAirHours: number;
  weeklyTrend: {
    day: string;
    co2SavedKg: number;
    actionsCount: number;
  }[];
  methodologyNote: string;
}
