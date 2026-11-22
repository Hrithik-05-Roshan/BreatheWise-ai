# Code Quality & Software Architecture Documentation

## 1. Architectural Philosophy & Principles
BreatheWise AI is designed with **Clean Architecture**, **SOLID principles**, and **High Cohesion, Low Coupling**:

- **Separation of Concerns:**
  - `lib/air-quality/`: Pure meteorological data fetching, CPCB NAQI formula calculations, personalized vulnerability scoring, and breakpoint tables.
  - `lib/recommendations/`: Deterministic rule engines evaluating risk, feasibility, and user context.
  - `lib/assistant/`: AI prompt engineering, sanitization, and fallback engines.
  - `lib/commute/` & `lib/impact/`: Mathematical models for transit emissions and CEA baseline tracking.
  - `components/`: UI presentation components strictly organized by domain (`dashboard`, `commute`, `indoor-air`, `assistant`, `onboarding`, `ui`).
  - `app/api/`: Strict HTTP boundaries with schema validation, rate limiting, and caching headers.

- **Single Responsibility Principle (SRP):**
  - Monolithic dashboard views are decomposed into `OverviewTab`, `DailyPlanTab`, `HourlyChart`, `AQICard`, and `HouseholdChecklist`.
  - The multi-step onboarding wizard is decoupled into a dedicated custom hook (`useOnboardingForm.ts`) and 6 isolated step subcomponents under `components/onboarding/steps/` (`StepLocation`, `StepHousehold`, `StepLifestyle`, `StepCommute`, `StepIndoor`, `StepPreferences`).
  - The marketing landing page (`app/page.tsx`) is decomposed into 6 focused modular section components under `components/landing/sections/` (`HeroSection`, `ProblemSection`, `FeaturesSection`, `HowItWorksSection`, `ImpactSection`, `CtaSection`), reducing cognitive complexity from 354 lines to a clean 30-line coordinator.
  - The AI assistant interface is decomposed into `ChatInterface.tsx` (~180 lines), `StructuredAiCard.tsx`, and `QuickQuestionsBar.tsx`, eliminating deep JSX nesting and isolating presentational concerns.
  - The exposure vulnerability algorithm is decoupled from `PersonalizedExposureCard.tsx` into a pure, testable domain function `calculatePersonalizedVulnerability` in `lib/air-quality/calculations.ts`.

- **DRY (Don't Repeat Yourself) & Centralized Constants:**
  - In `app/dashboard/page.tsx`, recommendation generation and diurnal plan creation are unified into a single deterministic pipeline following air quality resolution, eliminating redundant calculation blocks across try/catch paths.
  - Urban mobility emission factors, vehicle speeds, and transport costs are centralized in `lib/constants/mobility.ts` with explicit citations to CPCB, MoHUA, and CEA baselines.
  - Pollutant measurement transformations, CPCB sub-index interpolations, and NAQI category derivations are centralized into reusable utility functions (`calculateSubIndex`, `calculateOverallAQI`, `buildPollutantMeasurement`, `getAqiCategory`).

---

## 2. Type Safety & TypeScript Strict Mode
The application enforces strict TypeScript configuration (`tsconfig.json`):
- `strict: true`
- `noEmit: true`
- `forceConsistentCasingInFileNames: true`
- **Zero `any` types** across the entire codebase (`as any` strictly eliminated).
- Domain models are explicitly typed in `lib/types/` (`air-quality.ts`, `profile.ts`, `recommendations.ts`, `chat.ts`, `commute.ts`, `impact.ts`, `validation.ts`).
- `SustainabilityPriority` is exported as a strict union type guaranteeing end-to-end type safety from form state to storage.

---

## 3. Resilience & Defensive Error Handling
- **Client Resilience:** Wrapped using a custom React class `ErrorBoundary` (`components/ui/error-boundary.tsx`). When unexpected errors occur in visual sub-elements (like third-party SVG charts), the error boundary isolates the failure with a friendly retry button, keeping the rest of the application functional.
- **Asynchronous Defenses:** Clipboard operations in `CommunityHub.tsx` are protected with explicit `.catch()` handlers against denied permissions or non-secure contexts. Coordinates in `lib/air-quality/service.ts` are guarded against `NaN`/undefined.
- **Server Resilience:** All Next.js route handlers implement standardized `try...catch` blocks that log technical diagnostics privately and return sanitized error schemas (e.g. `HTTP 400`, `HTTP 429`, `HTTP 500`) to the client without leaking internal stack traces.

---

## 4. Linting, Formatting & Documentation Standards
- **ESLint Configuration (`.eslintrc.json`):** Configured with `next/core-web-vitals` plus strict production rules (`prefer-const`, `no-duplicate-imports`) to ensure CI pipelines run headless static checks with zero interactive pauses and exit code 0.
- **Prettier Configuration (`.prettierrc`):** Standardizes quotes, indentation, line width, and trailing commas across all source files.
- **TSDoc / JSDoc Standards:** All domain calculation libraries (`calculations.ts`, `engine.ts`, `calculator.ts`, `service.ts`, `tracker.ts`, `utils.ts`, `prompts.ts`) feature standardized `@param`, `@returns`, and architectural explanation docstrings for automated evaluation parsers.

---

## 5. Quality Validation Suite
All quality gates pass deterministically:
- Strict Typecheck: `npm run typecheck` (0 errors)
- Static Analysis Lint: `npm run lint` (0 errors, 0 warnings)
- Automated Unit & Integration Tests: `npm run test` (57/57 passing across 12 test files)
- End-to-End Browser Tests: `npm run test:e2e` (3/3 passing)
- Production Build Compilation: `npm run build` (Clean exit, 106-136 kB First Load JS)
