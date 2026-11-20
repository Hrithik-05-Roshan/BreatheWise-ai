import { describe, it, expect } from "vitest";
import { calculateSubIndex, calculateOverallAQI, buildPollutantMeasurement } from "@/lib/air-quality/calculations";
import { CPCB_BREAKPOINTS } from "@/lib/air-quality/constants";
import { getAqiCategory } from "@/lib/utils";

describe("Air Quality NAQI Calculations & Breakpoints", () => {
  it("should calculate correct sub-index for PM2.5 at standard breakpoints", () => {
    // 0 ug/m3 -> 0 AQI
    expect(calculateSubIndex(0, CPCB_BREAKPOINTS.pm25)).toBe(0);

    // 30 ug/m3 -> 50 AQI (Good boundary)
    expect(calculateSubIndex(30, CPCB_BREAKPOINTS.pm25)).toBe(50);

    // 60 ug/m3 -> 100 AQI (Satisfactory boundary)
    expect(calculateSubIndex(60, CPCB_BREAKPOINTS.pm25)).toBe(100);

    // 90 ug/m3 -> 200 AQI (Moderate boundary)
    expect(calculateSubIndex(90, CPCB_BREAKPOINTS.pm25)).toBe(200);

    // 120 ug/m3 -> 300 AQI (Poor boundary)
    expect(calculateSubIndex(120, CPCB_BREAKPOINTS.pm25)).toBe(300);

    // 250 ug/m3 -> 400 AQI (Very Poor boundary)
    expect(calculateSubIndex(250, CPCB_BREAKPOINTS.pm25)).toBe(400);

    // Extreme winter smog: 380 ug/m3 -> Severe (>400)
    const severeIndex = calculateSubIndex(380, CPCB_BREAKPOINTS.pm25);
    expect(severeIndex).toBeGreaterThan(400);
    expect(severeIndex).toBeLessThanOrEqual(500);
  });

  it("should assign correct NAQI category labels according to CPCB scale", () => {
    expect(getAqiCategory(35).category).toBe("good");
    expect(getAqiCategory(35).label).toBe("Good");

    expect(getAqiCategory(75).category).toBe("satisfactory");
    expect(getAqiCategory(75).label).toBe("Satisfactory");

    expect(getAqiCategory(140).category).toBe("moderate");
    expect(getAqiCategory(140).label).toBe("Moderate");

    expect(getAqiCategory(260).category).toBe("poor");
    expect(getAqiCategory(260).label).toBe("Poor");

    expect(getAqiCategory(340).category).toBe("veryPoor");
    expect(getAqiCategory(340).label).toBe("Very Poor");

    expect(getAqiCategory(450).category).toBe("severe");
    expect(getAqiCategory(450).label).toBe("Severe");
  });

  it("should determine overall AQI by taking the maximum critical sub-index", () => {
    // PM2.5 is higher: PM2.5 = 120 ug/m3 (AQI ~300), PM10 = 100 ug/m3 (AQI ~100)
    const res1 = calculateOverallAQI(120, 100);
    expect(res1.mainPollutant).toBe("PM2.5");
    expect(res1.aqi).toBe(300);

    // PM10 is higher: PM2.5 = 20 ug/m3, PM10 = 300 ug/m3 (AQI ~250)
    const res2 = calculateOverallAQI(20, 300);
    expect(res2.mainPollutant).toBe("PM10");
    expect(res2.aqi).toBeGreaterThan(200);
  });

  it("should correctly compute standard ratio for pollutants", () => {
    // CPCB standard for PM2.5 is 60 ug/m3
    const measurement = buildPollutantMeasurement("pm25", 120);
    expect(measurement.ratioOfStandard).toBe(2.0);
    expect(measurement.unit).toBe("µg/m³");
  });
});
