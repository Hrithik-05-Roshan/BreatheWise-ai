import { describe, it, expect } from "vitest";
import { getAqiCategory, formatNumber, cn } from "@/lib/utils";

describe("Utility Functions (lib/utils.ts)", () => {
  describe("getAqiCategory - CPCB NAQI Breakpoint Mapping", () => {
    it("should classify 0-50 as Good", () => {
      expect(getAqiCategory(0).category).toBe("good");
      expect(getAqiCategory(25).category).toBe("good");
      expect(getAqiCategory(50).category).toBe("good");
      expect(getAqiCategory(50).label).toBe("Good");
    });

    it("should classify 51-100 as Satisfactory", () => {
      expect(getAqiCategory(51).category).toBe("satisfactory");
      expect(getAqiCategory(75).category).toBe("satisfactory");
      expect(getAqiCategory(100).category).toBe("satisfactory");
      expect(getAqiCategory(100).label).toBe("Satisfactory");
    });

    it("should classify 101-200 as Moderate", () => {
      expect(getAqiCategory(101).category).toBe("moderate");
      expect(getAqiCategory(150).category).toBe("moderate");
      expect(getAqiCategory(200).category).toBe("moderate");
      expect(getAqiCategory(200).label).toBe("Moderate");
    });

    it("should classify 201-300 as Poor", () => {
      expect(getAqiCategory(201).category).toBe("poor");
      expect(getAqiCategory(250).category).toBe("poor");
      expect(getAqiCategory(300).category).toBe("poor");
      expect(getAqiCategory(300).label).toBe("Poor");
    });

    it("should classify 301-400 as Very Poor", () => {
      expect(getAqiCategory(301).category).toBe("veryPoor");
      expect(getAqiCategory(350).category).toBe("veryPoor");
      expect(getAqiCategory(400).category).toBe("veryPoor");
      expect(getAqiCategory(400).label).toBe("Very Poor");
    });

    it("should classify 401+ as Severe", () => {
      expect(getAqiCategory(401).category).toBe("severe");
      expect(getAqiCategory(500).category).toBe("severe");
      expect(getAqiCategory(750).category).toBe("severe");
      expect(getAqiCategory(500).label).toBe("Severe");
    });

    it("should provide consistent health advisories and styling tokens for each tier", () => {
      const res = getAqiCategory(350);
      expect(res.healthAdvisory).toContain("Substantially reduce outdoor exposure");
      expect(res.colorClass).toContain("text-red-700");
      expect(res.badgeBg).toContain("bg-red-600");
    });
  });

  describe("formatNumber - Numeric String Localization", () => {
    it("should format integers with thousand separators", () => {
      expect(formatNumber(12500)).toBe("12,500");
      expect(formatNumber(0)).toBe("0");
    });

    it("should format with specified decimal precision", () => {
      expect(formatNumber(12.3456, 2)).toBe("12.35");
      expect(formatNumber(12.3, 2)).toBe("12.30");
    });

    it("should handle edge cases safely", () => {
      expect(formatNumber(NaN)).toBe("0");
    });
  });

  describe("cn - ClassName Merging", () => {
    it("should combine simple and conditional class names", () => {
      expect(cn("px-4", "py-2")).toBe("px-4 py-2");
      expect(cn("px-4", false && "hidden", "py-2")).toBe("px-4 py-2");
    });

    it("should resolve conflicting Tailwind utilities", () => {
      expect(cn("px-2", "px-4")).toBe("px-4");
      expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });
  });
});
