import { z } from "zod";

export const ProfileFormSchema = z.object({
  city: z.string().min(2, "City name must be at least 2 characters").max(50),
  locality: z.string().max(100).optional(),
  household: z.enum([
    "individual",
    "couple",
    "family",
    "family_children",
    "household_seniors",
  ]),
  lifestyle: z.enum([
    "student",
    "office_commuter",
    "remote_worker",
    "outdoor_worker",
    "fitness_enthusiast",
  ]),
  commuteMethod: z.enum([
    "walking",
    "bicycle",
    "public_transport",
    "two_wheeler",
    "car",
    "work_from_home",
  ]),
  commuteDistanceKm: z.number().min(0).max(100).default(5),
  indoorEnvironment: z.object({
    hasAirPurifier: z.boolean().default(false),
    purifierRoomType: z.enum(["bedroom", "living", "whole_house"]).optional(),
    hasIndoorPlants: z.boolean().default(false),
    windowsFrequentlyOpen: z.boolean().default(false),
    cookingFuel: z.enum(["lpg", "piped_gas", "electric_induction", "biomass_wood"]).default("lpg"),
    ventilationQuality: z.enum(["good", "moderate", "poor"]).default("moderate"),
  }),
  preferences: z.object({
    dailyNotifications: z.boolean().default(true),
    sustainabilityPriorities: z.array(z.string()).default(["low_emissions", "maximum_protection"]),
    budgetPreference: z.enum(["zero_cost", "low_cost", "flexible"]).default("low_cost"),
  }),
});

export type ProfileFormData = z.infer<typeof ProfileFormSchema>;

export const ChatRequestSchema = z.object({
  query: z.string().min(1, "Question cannot be empty").max(500, "Question too long"),
  context: z.object({
    location: z.string(),
    aqi: z.number(),
    category: z.string(),
    pm25: z.number(),
    pm10: z.number(),
    mainPollutant: z.string(),
    household: z.string(),
    lifestyle: z.string(),
    commute: z.string(),
    commuteDistanceKm: z.number().optional(),
    indoorEnvironment: z.object({
      hasAirPurifier: z.boolean(),
      windowsOpen: z.boolean(),
      cookingFuel: z.string(),
      ventilation: z.string(),
    }),
    preferences: z.object({
      budgetPreference: z.string(),
      sustainabilityPriorities: z.array(z.string()),
    }),
  }),
});

export const CommuteQuerySchema = z.object({
  origin: z.string().min(1),
  destination: z.string().min(1),
  distanceKm: z.number().min(0.5).max(150),
  currentAqi: z.number().min(0).max(1000),
});
