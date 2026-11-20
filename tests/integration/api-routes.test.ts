import { describe, it, expect } from "vitest";
import { GET as airQualityHandler } from "@/app/api/air-quality/route";
import { POST as chatHandler } from "@/app/api/chat/route";
import { POST as recommendationsHandler } from "@/app/api/recommendations/route";
import { NextRequest } from "next/server";

describe("API Route Integration Tests", () => {
  it("GET /api/air-quality should return 200 with air quality data for Delhi", async () => {
    const req = new NextRequest("http://localhost:3000/api/air-quality?city=Delhi");
    const res = await airQualityHandler(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.city).toBe("Delhi");
    expect(json.data.aqi).toBeGreaterThan(0);
    expect(res.headers.get("Cache-Control")).toContain("s-maxage=900");
  });

  it("GET /api/air-quality should return 400 when invalid coordinate latitude is passed", async () => {
    const req = new NextRequest("http://localhost:3000/api/air-quality?city=Delhi&lat=999");
    const res = await airQualityHandler(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.success).toBe(false);
  });

  it("POST /api/chat should accept valid request and return structured advisory", async () => {
    const payload = {
      query: "Should I let my 5-year-old child play outside this morning?",
      context: {
        location: "Delhi",
        aqi: 280,
        category: "Poor",
        pm25: 140,
        pm10: 260,
        mainPollutant: "PM2.5",
        household: "family_children",
        lifestyle: "office_commuter",
        commute: "public_transport",
        indoorEnvironment: {
          hasAirPurifier: false,
          windowsOpen: false,
          cookingFuel: "lpg",
          ventilation: "moderate",
        },
        preferences: {
          budgetPreference: "low_cost",
          sustainabilityPriorities: ["maximum_protection"],
        },
      },
    };

    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "192.168.1.101" },
      body: JSON.stringify(payload),
    });

    const res = await chatHandler(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.response.situationAssessment).toBeDefined();
    expect(json.response.recommendedActions.length).toBeGreaterThan(0);
  });

  it("POST /api/chat should reject invalid payload with 400", async () => {
    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "" }), // empty query violates min(1)
    });

    const res = await chatHandler(req);
    expect(res.status).toBe(400);
  });

  it("POST /api/recommendations should return 200 with personalized items", async () => {
    const payload = {
      aqi: 290,
      pm25: 140,
      pm10: 260,
      city: "Kolkata",
      household: "family_children",
      lifestyle: "student",
      commuteMethod: "walking",
      commuteDistanceKm: 3,
      hasAirPurifier: false,
      windowsOpen: false,
      cookingFuel: "piped_gas",
      budgetPreference: "zero_cost",
    };

    const req = new NextRequest("http://localhost:3000/api/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await recommendationsHandler(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.recommendations.length).toBeGreaterThan(0);
    expect(json.diurnalPlan.length).toBe(4);
  });
});
