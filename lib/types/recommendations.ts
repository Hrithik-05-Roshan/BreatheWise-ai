export type ActionDifficulty = 'easy' | 'medium' | 'hard';
export type CostLevel = 'free' | 'low' | 'medium' | 'high';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night' | 'all_day';
export type RecommendationDomain = 'outdoor' | 'commute' | 'indoor' | 'sustainability' | 'health_routine';

export interface Recommendation {
  id: string;
  title: string;
  whatToDo: string;
  whyItMatters: string;
  whenToDoIt: TimeOfDay;
  expectedBenefit: string;
  difficulty: ActionDifficulty;
  cost: CostLevel;
  environmentalImpact: string;
  supportingData: string;
  domain: RecommendationDomain;
  priorityScore: number; // 1 (highest) to 10
  tags: string[];
  isCompleted?: boolean;
}

export interface DailyPlanSlot {
  timeSlot: TimeOfDay;
  label: string;
  timeRange: string;
  expectedAqiRange: string;
  conditionSummary: string;
  recommendations: Recommendation[];
}

export interface RecommendationContext {
  aqi: number;
  pm25: number;
  pm10: number;
  city: string;
  household: string;
  lifestyle: string;
  commuteMethod: string;
  commuteDistanceKm: number;
  hasAirPurifier: boolean;
  windowsOpen: boolean;
  cookingFuel: string;
  budgetPreference: string;
}
