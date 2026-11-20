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

export interface UserPreferences {
  dailyNotifications: boolean;
  sustainabilityPriorities: ('low_emissions' | 'cost_saving' | 'maximum_protection' | 'active_lifestyle')[];
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
