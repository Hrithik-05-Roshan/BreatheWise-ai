export interface StructuredUserContext {
  location: string;
  aqi: number;
  category: string;
  pm25: number;
  pm10: number;
  mainPollutant: string;
  household: string;
  lifestyle: string;
  commute: string;
  commuteDistanceKm?: number;
  indoorEnvironment: {
    hasAirPurifier: boolean;
    windowsOpen: boolean;
    cookingFuel: string;
    ventilation: string;
  };
  preferences: {
    budgetPreference: string;
    sustainabilityPriorities: string[];
  };
}

export interface StructuredAiResponse {
  situationAssessment: string;
  whatThisMeansForYou: string;
  recommendedActions: {
    action: string;
    timing: string;
    benefit: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    cost: 'Free' | 'Low' | 'Medium' | 'High';
  }[];
  whyTheseActionsMatter: string;
  estimatedImpact: string;
  importantPrecautions: string[];
  dataSourceAndTimestamp: string;
  disclaimer: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  structuredResponse?: StructuredAiResponse;
  timestamp: string;
  isFallback?: boolean;
}
