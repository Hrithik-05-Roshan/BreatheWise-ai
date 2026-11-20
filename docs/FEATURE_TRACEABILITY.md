# Feature Traceability Matrix
### Detailed Requirement to Component to Test Mapping

```mermaid
graph LR
    Req1[1. Real-time AQI] --> Impl1[lib/air-quality/calculations.ts] --> Test1[tests/unit/aqi-calculations.test.ts]
    Req2[2. Diurnal Schedule] --> Impl2[lib/recommendations/engine.ts] --> Test2[tests/unit/recommendations.test.ts]
    Req3[3. Commute Exposure] --> Impl3[lib/commute/calculator.ts] --> Test3[tests/unit/commute.test.ts]
    Req4[4. AI Assistant] --> Impl4[lib/assistant/service.ts] --> Test4[tests/unit/assistant.test.ts]
    Req5[5. Impact Tracking] --> Impl5[lib/impact/tracker.ts] --> Test5[tests/unit/impact-tracker.test.ts]
    Req6[6. API Endpoints] --> Impl6[app/api/route.ts] --> Test6[tests/integration/api-routes.test.ts]
    Req7[7. Security Defense] --> Impl7[lib/assistant/service.ts] --> Test7[tests/security/security-defenses.test.ts]
    Req8[8. User Journey] --> Impl8[app/onboarding & app/dashboard] --> Test8[tests/e2e/landing-and-onboarding.spec.ts]
```

### Traceability Breakdown

1. **Air Quality Calculations:**
   - Requirement: Compute CPCB NAQI compliant values.
   - Code: `lib/air-quality/calculations.ts` (lines 10-65)
   - Test: `tests/unit/aqi-calculations.test.ts` (lines 7-52)

2. **Personalized Health Logic:**
   - Requirement: Pediatric and senior citizen prioritization.
   - Code: `lib/recommendations/engine.ts` (lines 75-105)
   - Test: `tests/unit/recommendations.test.ts` (lines 32-41)

3. **Commute Comparison:**
   - Requirement: Active transit warning when AQI > 200.
   - Code: `lib/commute/calculator.ts` (lines 60-78)
   - Test: `tests/unit/commute.test.ts` (lines 31-40)

4. **AI Generative Assistant:**
   - Requirement: Prompt injection defense & structured non-medical advice.
   - Code: `lib/assistant/service.ts` (lines 10-120)
   - Test: `tests/unit/assistant.test.ts` (lines 8-50)

5. **Impact Methodology:**
   - Requirement: CEA emissions factor calculation.
   - Code: `lib/impact/tracker.ts` (lines 45-80)
   - Test: `tests/unit/impact-tracker.test.ts` (lines 14-35)
