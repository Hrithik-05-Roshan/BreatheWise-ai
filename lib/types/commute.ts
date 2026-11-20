export type TransportMode = 'walking' | 'bicycle' | 'public_transport' | 'two_wheeler' | 'car';

export interface CommuteOption {
  mode: TransportMode;
  title: string;
  iconName: string;
  durationMinutes: number;
  estimatedExposureLevel: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
  exposureExplanation: string;
  emissionsKgCO2: number;
  costInr: number;
  healthRecommendation: string;
  isRecommendedToday: boolean;
  advisoryNote?: string;
}

export interface CommuteComparisonResult {
  origin: string;
  destination: string;
  distanceKm: number;
  currentAqi: number;
  options: CommuteOption[];
  primaryRecommendation: TransportMode;
  summaryReason: string;
  disclaimer: string;
}
