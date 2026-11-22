export type HouseholdType = 
  | 'individual' 
  | 'couple' 
  | 'family' 
  | 'family_children' 
  | 'household_seniors';

export type LifestyleType = 
  | 'student' 
  | 'office_commuter' 
  | 'remote_worker' 
  | 'outdoor_worker' 
  | 'fitness_enthusiast';

export type CommuteMethod = 
  | 'walking' 
  | 'bicycle' 
  | 'public_transport' 
  | 'two_wheeler' 
  | 'car' 
  | 'work_from_home';

export type CookingFuel = 
  | 'lpg' 
  | 'piped_gas' 
  | 'electric_induction' 
  | 'biomass_wood';

export interface IndoorEnvironment {
  hasAirPurifier: boolean;
  purifierRoomType?: 'bedroom' | 'living' | 'whole_house';
  hasIndoorPlants: boolean;
  windowsFrequentlyOpen: boolean;
  cookingFuel: CookingFuel;
  ventilationQuality: 'good' | 'moderate' | 'poor';
}

export type SustainabilityPriority = 
  | 'low_emissions' 
  | 'cost_saving' 
  | 'maximum_protection' 
  | 'active_lifestyle';

export interface UserPreferences {
  dailyNotifications: boolean;
  sustainabilityPriorities: SustainabilityPriority[];
  budgetPreference: 'zero_cost' | 'low_cost' | 'flexible';
}

export interface UserProfile {
  id: string;
  city: string;
  locality?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  household: HouseholdType;
  lifestyle: LifestyleType;
  commuteMethod: CommuteMethod;
  commuteDistanceKm: number;
  indoorEnvironment: IndoorEnvironment;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: "default-user",
  city: "Delhi",
  coordinates: { latitude: 28.6139, longitude: 77.2090 },
  household: "family_children",
  lifestyle: "office_commuter",
  commuteMethod: "public_transport",
  commuteDistanceKm: 12,
  indoorEnvironment: {
    hasAirPurifier: false,
    hasIndoorPlants: true,
    windowsFrequentlyOpen: false,
    cookingFuel: "lpg",
    ventilationQuality: "moderate",
  },
  preferences: {
    dailyNotifications: true,
    sustainabilityPriorities: ["low_emissions", "maximum_protection"],
    budgetPreference: "low_cost",
  },
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};
