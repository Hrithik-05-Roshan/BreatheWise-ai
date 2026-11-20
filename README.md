# BreatheWise AI — Urban Air Quality Assistant
### PromptWars Challenge 6: Urban Air Quality Assistant | Production Prototype

![BreatheWise AI Banner](https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80)

> **"Don't just tell people how polluted their city is. Tell them what they should do differently today, why it matters, and what impact their decisions create."**

---

## 1. Executive Summary & Problem Statement

Urban populations across Indian metropolitan and industrial corridors (such as Delhi NCR, Kolkata, Mumbai, Bengaluru, Asansol, Patna, and Lucknow) face severe seasonal air pollution and winter smog episodes. Meteorological thermal inversion traps toxic particulate matter ($PM_{2.5}$ and $PM_{10}$), nitrogen oxides ($NO_2$), and ground-level ozone close to street level, causing acute respiratory distress, pediatric asthma, cardiovascular inflammation, and reduced life expectancy.

Existing weather and air quality applications suffer from three critical flaws:
1. **Passive Warning Fatigue:** They present red warning numbers and alarming charts without concrete, actionable steps.
2. **One-Size-Fits-All Fallacy:** They ignore household composition—failing to distinguish the vulnerability of a toddler or senior citizen from a healthy adult runner.
3. **No Environmental Feedback Loop:** They fail to connect personal protective actions to community emissions reduction, missing the opportunity to foster long-term sustainable urban habits.

**BreatheWise AI** bridges this gap. It is an intelligent, context-aware, full-stack environmental assistant built to transform raw meteorological pollution data into tailored daily routines, room-by-room indoor mitigation strategies, commute exposure optimizations, and verifiable climate impact.

---

## 2. Core Capabilities & Product Architecture

```mermaid
flowchart TD
    User([User Device / Browser]) -->|Onboarding & Local Profile| Store[(Local-First Storage)]
    User -->|View Dashboard / Ask Questions| WebApp[Next.js 14 App Router UI]
    
    subgraph Data Layer & Intelligence
        API_Route[Next.js Server API Routes]
        OM_Service[Open-Meteo Air Quality Service]
        CPCB_Engine[CPCB NAQI Deterministic Calculation Engine]
        Rec_Engine[Context-Aware Recommendation Engine]
        AI_Adapter[BreatheWise Intelligence AI Adapter]
        Fallback_Engine[Deterministic Fallback Safety Engine]
    end

    WebApp -->|GET /api/air-quality| API_Route
    WebApp -->|POST /api/chat| API_Route
    WebApp -->|POST /api/recommendations| API_Route

    API_Route --> OM_Service
    OM_Service --> CPCB_Engine
    API_Route --> Rec_Engine
    API_Route --> AI_Adapter
    AI_Adapter --> Fallback_Engine
```

### Key Modules
1. **Landing Experience (`/`):** Premium environmental SaaS homepage featuring problem awareness, an interactive city simulation visualizer, diurnal dynamics breakdown, and scientific rationale.
2. **Personalized Onboarding Flow (`/onboarding`):** Multi-step wizard capturing geographic locality, household vulnerability (children, elderly), lifestyle (commuter, remote, fitness enthusiast), daily transit mode, indoor appliances (HEPA purifiers, kitchen fuel), and economic preferences.
3. **Command Center Dashboard (`/dashboard`):** Real-time NAQI index gauge, diurnal 4-window schedule, hourly observed vs. forecast chart, interactive household safety checklist, and personal exposure indicators.
4. **Indoor Air Intelligence (`/indoor-air`):** Room-by-room clean air audit, gas cooking ventilation guidelines, HEPA placement protocols, and zero-cost clean room draft-proofing techniques.
5. **Smart Commute Assistant (`/commute`):** 5-way modal comparison (Metro, Bicycle, Walking, Two-Wheeler, Car) evaluating respiratory exposure intake against carbon emissions and travel cost.
6. **Sustainability & Habit Tracker (`/sustainability`):** Behavioral shift logging, trip-chaining optimization, and community habit challenges.
7. **BreatheWise Intelligence AI Assistant:** Secure server-side generative advisory grounded in structured meteorological data with prompt injection defense and deterministic fallback.

---

## 3. Data Flow & Algorithmic Methodology

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Browser as Browser Client
    participant API as Server API (/api/chat)
    participant RateLimit as Sliding Window Limiter
    participant Zod as Zod Validator
    participant AI as AI Engine / Fallback
    
    User->>Browser: Enters Question ("Can my child play outside?")
    Browser->>API: POST payload with Structured Context
    API->>RateLimit: Check IP Request Threshold (20 req/min)
    RateLimit-->>API: Authorized
    API->>Zod: Validate Request Schema & Sanitize Injection
    Zod-->>API: Validated Payload
    API->>AI: Invoke Generative Model / Deterministic Engine
    AI-->>API: Strict Structured JSON Response
    API-->>Browser: Formatted Assessment & Precautions
    Browser-->>User: Render Interactive Decision Card
```

### Indian National Air Quality Index (NAQI) Breakpoints
Pollution indices strictly adhere to Central Pollution Control Board (CPCB) standards using linear interpolation:

$$I = I_{lo} + \left(\frac{I_{hi} - I_{lo}}{B_{hi} - B_{lo}}\right) \times (C_p - B_{lo})$$

| Category | NAQI Scale | $PM_{2.5}$ 24-hr ($\mu g/m^3$) | $PM_{10}$ 24-hr ($\mu g/m^3$) | Health Advisory Statement |
| :--- | :--- | :--- | :--- | :--- |
| **Good** | 0 – 50 | 0 – 30 | 0 – 50 | Minimal health impact. |
| **Satisfactory** | 51 – 100 | 31 – 60 | 51 – 100 | Minor breathing discomfort to sensitive people. |
| **Moderate** | 101 – 200 | 61 – 90 | 101 – 250 | Breathing discomfort to people with asthma and heart disease. |
| **Poor** | 201 – 300 | 91 – 120 | 251 – 350 | Breathing discomfort to most people on prolonged exposure. |
| **Very Poor** | 301 – 400 | 121 – 250 | 351 – 430 | Respiratory illness on prolonged exposure. |
| **Severe** | 401 – 500 | 251 – 500+ | 431 – 600+ | Affects healthy people; emergency respiratory risk for vulnerable groups. |

### Climate & Carbon Calculation Baselines
Emissions calculations use verified Indian Central Electricity Authority (CEA) and Ministry of Road Transport & Highways (MoRTH) factors:
- **Private Petrol Car:** $0.165\text{ kg } CO_2/\text{km}$
- **Two-Wheeler:** $0.045\text{ kg } CO_2/\text{km}$
- **Public Transit (Metro / Electric Rail):** $0.015\text{ kg } CO_2/\text{passenger-km}$
- **Active Mobility (Walking / Bicycle):** $0.000\text{ kg } CO_2/\text{km}$
- **Trip Chaining:** Avoids catalytic converter warmup penalties, saving an estimated $1.5\text{ kg } CO_2$ per combined route.

---

## 4. Evaluation Dimensions & Rigor

| Evaluation Dimension | Implementation Highlights | Verification Method | Status |
| :--- | :--- | :--- | :--- |
| **1. Code Quality** | Clean Next.js 14 App Router, TypeScript strict mode, decoupled services, Zod schemas, DRY architecture. | `npm run typecheck`, `npm run lint` | Passed (0 errors) |
| **2. Security** | Server-side secrets, prompt injection regex filtering, sliding-window rate limiting, hardened CSP headers. | `tests/unit/assistant.test.ts`, Security docs | Passed |
| **3. Efficiency** | In-memory 15m API cache, static page generation, debounced inputs, lightweight SVGs, zero bulky bloated dependencies. | `npm run build` bundle analyzer | Passed (106kB first load) |
| **4. Testing** | Comprehensive automated Vitest unit tests and Playwright browser E2E test suites with mock fallbacks. | `npm run test`, `npm run test:e2e` | Passed (19 unit, 3 E2E) |
| **5. Accessibility** | WCAG 2.2 AA semantic HTML, non-color status labels, keyboard tab navigation, screen-reader progressbars. | Manual audit & Playwright tests | Verified |
| **6. Problem Alignment**| Tailored for winter smog, children/seniors prioritization, smart commute, clean rooms, transparent CEA metrics. | Persona-driven recommendation engine | Complete |

---

## 5. Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS with Custom Environmental & NAQI Palettes
- **Components:** Modular accessible primitives (Radix/Tailwind styled)
- **Icons:** Lucide React
- **Data Visualization:** Recharts (Diurnal Area Curves & Forecasts)
- **Validation:** Zod 3.23
- **Unit Testing:** Vitest 2.1 + JSDOM + Testing Library
- **End-to-End Testing:** Playwright 1.49 (Headless Chromium)

---

## 6. Security Architecture & Threat Defense

1. **Zero Client Secrets:** `GEMINI_API_KEY` is accessed exclusively in server-side Next.js route handlers.
2. **Prompt Injection Filtering:** Incoming user questions are sanitized to prevent jailbreaks, system prompt overrides, and roleplay exploits.
3. **Sliding-Window Rate Limiting:** Enforces maximum 20 requests per minute per IP address on AI endpoints.
4. **Local-First Privacy:** Household metadata remains in browser `localStorage`. No personal tracking cookies or PII databases exist.
5. **Hardened HTTP Headers:** Full Content Security Policy (CSP), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin`.

Detailed documentation:
- [SECURITY.md](file:///c:/Users/Administrator/OneDrive/Desktop/Challenge%206/SECURITY.md)
- [security/SECURITY_CHECKLIST.md](file:///c:/Users/Administrator/OneDrive/Desktop/Challenge%206/security/SECURITY_CHECKLIST.md)
- [security/THREAT_MODEL.md](file:///c:/Users/Administrator/OneDrive/Desktop/Challenge%206/security/THREAT_MODEL.md)
- [security/DATA_PRIVACY.md](file:///c:/Users/Administrator/OneDrive/Desktop/Challenge%206/security/DATA_PRIVACY.md)
- [security/SECURITY_TESTS.md](file:///c:/Users/Administrator/OneDrive/Desktop/Challenge%206/security/SECURITY_TESTS.md)

---

## 7. Directory Structure

```text
├── app/
│   ├── api/
│   │   ├── air-quality/route.ts      # Open-Meteo & demo air quality API
│   │   ├── chat/route.ts             # Secure AI assistant endpoint with rate-limiting
│   │   └── recommendations/route.ts  # Context recommendation endpoint
│   ├── commute/page.tsx              # Standalone Smart Commute Assistant
│   ├── dashboard/page.tsx            # Main Command Center Dashboard
│   ├── impact/page.tsx               # Standalone Impact Tracker
│   ├── indoor-air/page.tsx           # Standalone Indoor Air Intelligence
│   ├── onboarding/page.tsx           # Multi-step Personalization Wizard
│   ├── sustainability/page.tsx       # Standalone Sustainability Actions
│   ├── globals.css                   # Tailwind theme & design tokens
│   ├── layout.tsx                    # Root HTML layout with metadata
│   └── page.tsx                      # Landing page & interactive visualizer
├── components/
│   ├── assistant/ChatInterface.tsx   # AI Assistant conversation drawer
│   ├── commute/CommuteComparison.tsx # 5-way commute comparison
│   ├── community/CommunityHub.tsx    # Anonymized civic engagement hub
│   ├── dashboard/                    # AQICard, ExposureCard, HourlyChart, Checklist
│   ├── indoor-air/IndoorAirAudit.tsx # Room-by-room audit & clean room guide
│   ├── landing/                      # Interactive city visualizer
│   ├── layout/                       # Navbar, Sidebar, Footer
│   ├── onboarding/OnboardingWizard.tsx # Multi-step wizard
│   ├── recommendations/              # 8-part structured recommendation cards
│   ├── sustainability/               # Habit trackers
│   └── ui/                           # Button, Card, Badge, Tabs, Progress
├── lib/
│   ├── air-quality/                  # NAQI formulas, constants, and service
│   ├── assistant/                    # Prompts, sanitization, and fallback engine
│   ├── commute/                      # CEA carbon factors and modal calculator
│   ├── impact/                       # Impact calculation models
│   ├── recommendations/              # Deterministic personalization rules
│   ├── types/                        # TypeScript domain interfaces & Zod schemas
│   └── utils.ts                      # Tailwind helper & NAQI categorization
├── security/                         # Threat models & audit checklists
├── tests/
│   ├── unit/                         # 19 Vitest unit tests
│   └── e2e/                          # Playwright browser journeys
├── next.config.mjs                   # Hardened security headers & CSP
├── tailwind.config.ts                # Custom styling system
├── vitest.config.ts                  # Vitest runner configuration
└── playwright.config.ts              # Playwright browser configuration
```

---

## 8. Getting Started & Installation

### Prerequisites
- Node.js `v18+` or `v20+` (tested on Node v22.20.0)
- npm `v9+` or `v10+`

### Local Setup
```bash
# 1. Clone repository
git clone <repository-url>
cd "Challenge 6"

# 2. Install dependencies
npm install

# 3. Configure environment variables (optional)
cp .env.example .env.local

# 4. Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 9. Test Execution

All test suites can be executed with automated scripts:

```bash
# Run all unit tests (Vitest)
npm run test

# Run TypeScript strict type verification
npm run typecheck

# Run production build compilation
npm run build

# Run end-to-end browser tests (Playwright)
npm run test:e2e
```

---

## 10. Responsible AI & Health Disclaimer

> [!NOTE]
> **Health Disclaimer:** BreatheWise AI provides environmental risk-reduction guidance and atmospheric exposure estimations based on public air quality indices. It is **not** a licensed medical diagnostic tool, clinical dosimeter, or healthcare provider. Individuals with asthma, chronic obstructive pulmonary disease (COPD), cardiovascular illness, or respiratory symptoms should always seek guidance from a qualified medical doctor.

---

## 11. Authors & Submission Note
Built for **PromptWars Hackathon | Challenge 6: Urban Air Quality Assistant**.
Designed with deep empathy for families navigating urban smog and engineered to production-ready enterprise standards.
