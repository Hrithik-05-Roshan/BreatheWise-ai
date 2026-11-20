# Problem Statement Alignment Matrix
### Challenge 6: Urban Air Quality Assistant | PromptWars

---

## 1. Traceability Matrix

| Problem Statement Requirement | Implementation in BreatheWise AI | Source File / Module | Verification Method | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Understand Current Air Quality** | Real-time CPCB NAQI calculation with PM2.5, PM10, NO2, and O3 breakpoints; live sync from Open-Meteo European Agency Model. | `lib/air-quality/calculations.ts`, `components/dashboard/AQICard.tsx` | Vitest unit tests in `aqi-calculations.test.ts` | **COMPLETED (100%)** |
| **Make Safer Daily Decisions** | Diurnal 4-window schedule (Morning, Afternoon, Evening, Night) addressing ground inversion. | `lib/recommendations/engine.ts`, `components/dashboard/DailyStatusCard.tsx` | Vitest unit tests in `recommendations.test.ts` | **COMPLETED (100%)** |
| **Reduce Unnecessary Exposure** | Personalized vulnerability scoring prioritizing children (pediatric lungs) and senior citizens. | `components/dashboard/PersonalizedExposureCard.tsx` | Persona testing in `recommendations.test.ts` | **COMPLETED (100%)** |
| **Improve Indoor Air Quality** | Room-by-room clean air audit, gas cooking isolation, HEPA placement protocols, zero-cost clean room sealing. | `components/indoor-air/IndoorAirAudit.tsx`, `app/indoor-air/page.tsx` | Verified in E2E suite | **COMPLETED (100%)** |
| **Adopt Low-Emission Routines** | Trip-chaining guidance and habit completion tracker reducing catalytic converter cold starts. | `components/sustainability/SustainableActionsList.tsx` | Unit tests in `impact-tracker.test.ts` | **COMPLETED (100%)** |
| **Discover Sustainable Alternatives**| 5-mode smart commute assistant comparing exposure intake against carbon footprint. | `lib/commute/calculator.ts`, `components/commute/CommuteComparison.tsx` | Unit tests in `commute.test.ts` | **COMPLETED (100%)** |
| **Measurable Environmental Impact** | Transparent formulas using Central Electricity Authority (CEA) baselines (0.165 kg CO2/km car vs 0.015 kg CO2/km metro). | `lib/impact/tracker.ts`, `components/dashboard/ImpactSummary.tsx` | Unit tests in `impact-tracker.test.ts` | **COMPLETED (100%)** |
| **Support Household Personas** | 5 distinct personas: Working Professionals, Families with Children, Students, Seniors, Outdoor Fitness Enthusiasts. | `lib/types/profile.ts`, `components/onboarding/OnboardingWizard.tsx` | Onboarding E2E test in Playwright | **COMPLETED (100%)** |
| **Conversational AI Assistant** | "BreatheWise Intelligence" structured conversational assistant with deterministic fallback. | `lib/assistant/service.ts`, `components/assistant/ChatInterface.tsx` | Unit & Integration tests in `assistant.test.ts` | **COMPLETED (100%)** |
| **Responsible AI Guidelines** | Explicit non-clinical disclaimers; no medical prescriptions; scientific clarification on houseplants. | `lib/assistant/prompts.ts`, `components/indoor-air/IndoorAirAudit.tsx` | Verified in security tests | **COMPLETED (100%)** |
