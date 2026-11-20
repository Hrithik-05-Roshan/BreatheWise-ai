import { describe, it, expect } from "vitest";
import { generateDemonstrationData } from "@/lib/air-quality/service";
import { calculatePersonalizedVulnerability } from "@/lib/air-quality/calculations";
import { UserProfile } from "@/lib/types/profile";

describe("Air Quality Service & Modeling Engine", () => {
  describe("generateDemonstrationData", () => {
    it("should generate severe winter smog scenario with elevated particulates", () => {
      const data = generateDemonstrationData("Delhi", 28.6139, 77.2090, "severe_winter");
      expect(data.city).toBe("Delhi");
      expect(data.aqi).toBeGreaterThan(150);
      expect(data.pollutants.pm25.value).toBeGreaterThan(100);
      expect(data.pollutants.pm10.value).toBeGreaterThan(150);
      expect(data.isSimulatedDemo).toBe(true);
    });

    it("should generate moderate scenario within expected lower ranges", () => {
      const data = generateDemonstrationData("Mumbai", 19.0760, 72.8777, "moderate");
      expect(data.city).toBe("Mumbai");
      expect(data.pollutants.pm25.value).toBeLessThan(120);
      expect(data.pollutants.pm10.value).toBeLessThan(200);
    });

    it("should generate clean/good scenario within safe limits", () => {
      const data = generateDemonstrationData("Bengaluru", 12.9716, 77.5946, "good");
      expect(data.pollutants.pm25.value).toBeLessThan(50);
      expect(data.pollutants.pm10.value).toBeLessThan(70);
    });

    it("should always generate exactly 24 hourly data points with observed and forecast labels", () => {
      const data = generateDemonstrationData("Kolkata", 22.5726, 88.3639);
      expect(data.hourly).toHaveLength(24);
      expect(data.hourly[0]).toHaveProperty("time");
      expect(data.hourly[0]).toHaveProperty("aqi");
      expect(data.hourly[0]).toHaveProperty("pm25");
      expect(data.hourly[0]).toHaveProperty("pm10");
      expect(["observed", "forecast"]).toContain(data.hourly[0].type);
    });
  });

  describe("calculatePersonalizedVulnerability", () => {
    it("should score higher vulnerability for pediatric household with active commute and no purifier", () => {
      const highRiskProfile: UserProfile = {
        id: "test-user-1",
        city: "Delhi",
        coordinates: { latitude: 28.61, longitude: 77.2 },
        household: "family_children",
        lifestyle: "office_commuter",
        commuteMethod: "bicycle",
        commuteDistanceKm: 10,
        indoorEnvironment: {
          hasAirPurifier: false,
          hasIndoorPlants: true,
          windowsFrequentlyOpen: false,
          cookingFuel: "lpg",
          ventilationQuality: "moderate",
        },
        preferences: {
          dailyNotifications: true,
          sustainabilityPriorities: ["maximum_protection"],
          budgetPreference: "flexible",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = calculatePersonalizedVulnerability(highRiskProfile);
      // Baseline 40 + children 30 + bike 25 + no purifier 15 = 110 -> clamped to 100
      expect(result.vulnerabilityScore).toBe(100);
      expect(result.factors).toContain("Pediatric lung development vulnerability");
      expect(result.factors).toContain("Active exertion during commute (10 km)");
      expect(result.factors).toContain("No active indoor HEPA filtration");
    });

    it("should score lower vulnerability for an individual with car commute and air purifier", () => {
      const lowRiskProfile: UserProfile = {
        id: "test-user-2",
        city: "Mumbai",
        coordinates: { latitude: 19.07, longitude: 72.87 },
        household: "individual",
        lifestyle: "remote_worker",
        commuteMethod: "work_from_home",
        commuteDistanceKm: 0,
        indoorEnvironment: {
          hasAirPurifier: true,
          hasIndoorPlants: true,
          windowsFrequentlyOpen: false,
          cookingFuel: "electric_induction",
          ventilationQuality: "good",
        },
        preferences: {
          dailyNotifications: true,
          sustainabilityPriorities: ["low_emissions"],
          budgetPreference: "low_cost",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = calculatePersonalizedVulnerability(lowRiskProfile);
      // Baseline 40 + 0 = 40
      expect(result.vulnerabilityScore).toBe(40);
      expect(result.factors).toHaveLength(0);
    });
  });
});
