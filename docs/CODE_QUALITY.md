# Code Quality & Software Architecture Documentation

## 1. Architectural Philosophy & Principles
BreatheWise AI is designed with **Clean Architecture**, **SOLID principles**, and **High Cohesion, Low Coupling**:

- **Separation of Concerns:**
  - `lib/air-quality/`: Encapsulates pure meteorological data fetching, CPCB NAQI formula calculations, and breakpoint tables.
  - `lib/recommendations/`: Houses deterministic rule engines that evaluate risk, feasibility, and user context.
  - `lib/assistant/`: Manages AI prompt engineering, sanitization, and fallback engines.
  - `lib/commute/` & `lib/impact/`: Handle mathematical models for transit emissions and CEA baseline tracking.
  - `components/`: UI presentation components organized by domain (`dashboard`, `commute`, `indoor-air`, `assistant`, `ui`).
  - `app/api/`: Strict HTTP boundaries with schema validation, rate limiting, and caching headers.

- **Single Responsibility Principle (SRP):**
  Monolithic dashboard views were decomposed into `OverviewTab`, `DailyPlanTab`, `HourlyChart`, `AQICard`, and `HouseholdChecklist`, each having a single well-defined reason to change.

- **DRY (Don't Repeat Yourself):**
  Pollutant measurement transformations, CPCB sub-index interpolations, and NAQI category derivations are centralized into reusable utility functions (`calculateSubIndex`, `calculateOverallAQI`, `buildPollutantMeasurement`).

---

## 2. Type Safety & TypeScript Strict Mode
The application enforces strict TypeScript configuration (`tsconfig.json`):
- `strict: true`
- `noEmit: true`
- Zero implicit `any` types across the entire codebase.
- Domain models are explicitly typed in `lib/types/` (`air-quality.ts`, `profile.ts`, `recommendations.ts`, `chat.ts`, `commute.ts`, `impact.ts`, `validation.ts`).

---

## 3. Resilience & Error Boundaries
- **Client Resilience:** Wrapped using a custom React class `ErrorBoundary` (`components/ui/error-boundary.tsx`). When unexpected errors occur in visual sub-elements (like third-party SVG charts), the error boundary isolates the failure with a friendly retry button, keeping the rest of the application functional.
- **Server Resilience:** All Next.js route handlers implement standardized `try...catch` blocks that log technical diagnostics privately and return sanitized error schemas (e.g. `HTTP 400`, `HTTP 429`, `HTTP 500`) to the client without leaking internal stack traces.

---

## 4. Quality Validation Commands
- Strict Typecheck: `npm run typecheck`
- Linting: `npm run lint`
- Automated Unit & Integration Tests: `npm run test`
- End-to-End Browser Tests: `npm run test:e2e`
- Production Build Compilation: `npm run build`
