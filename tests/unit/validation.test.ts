import { describe, it, expect } from "vitest";
import { ProfileFormSchema, ChatRequestSchema, CommuteQuerySchema } from "@/lib/types/validation";

describe("Zod Validation Schemas", () => {
  it("should validate a valid user profile payload", () => {
    const validProfile = {
      city: "Kolkata",
      household: "family_children",
      lifestyle: "student",
      commuteMethod: "public_transport",
      commuteDistanceKm: 6,
      indoorEnvironment: {
        hasAirPurifier: true,
        hasIndoorPlants: true,
        windowsFrequentlyOpen: false,
        cookingFuel: "piped_gas",
        ventilationQuality: "good",
      },
      preferences: {
        dailyNotifications: true,
        sustainabilityPriorities: ["low_emissions"],
        budgetPreference: "low_cost",
      },
    };

    const parsed = ProfileFormSchema.safeParse(validProfile);
    expect(parsed.success).toBe(true);
  });

  it("should reject an invalid commute distance or missing city", () => {
    const invalidProfile = {
      city: "", // Invalid: min 2 chars
      household: "individual",
      lifestyle: "student",
      commuteMethod: "walking",
      commuteDistanceKm: 500, // Invalid: max 100
      indoorEnvironment: {},
      preferences: {},
    };

    const parsed = ProfileFormSchema.safeParse(invalidProfile);
    expect(parsed.success).toBe(false);
  });

  it("should validate a valid AI chat request payload", () => {
    const validChatRequest = {
      query: "Can my toddler play in the park this evening?",
      context: {
        location: "Delhi",
        aqi: 240,
        category: "Poor",
        pm25: 110,
        pm10: 220,
        mainPollutant: "PM2.5",
        household: "family_children",
        lifestyle: "remote_worker",
        commute: "work_from_home",
        indoorEnvironment: {
          hasAirPurifier: false,
          windowsOpen: false,
          cookingFuel: "lpg",
          ventilation: "moderate",
        },
        preferences: {
          budgetPreference: "zero_cost",
          sustainabilityPriorities: ["maximum_protection"],
        },
      },
    };

    const parsed = ChatRequestSchema.safeParse(validChatRequest);
    expect(parsed.success).toBe(true);
  });
});
