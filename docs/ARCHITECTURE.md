# System Architecture & Technical Specifications

```mermaid
graph TD
    subgraph Client Layer
        Browser[Client Browser / Desktop / Mobile]
        LocalStorage[(Browser LocalStorage)]
    end

    subgraph Presentation & Routing
        NextApp[Next.js 14 App Router]
        LandingPage["/ (Landing Page)"]
        OnboardingPage["/onboarding (6-Step Wizard)"]
        DashboardPage["/dashboard (Command Center)"]
        IndoorPage["/indoor-air"]
        CommutePage["/commute"]
        ImpactPage["/impact"]
    end

    subgraph API & Edge Middleware
        EdgeHeaders[Security Headers & CSP]
        RateLimiter[Sliding-Window IP Rate Limiter]
        AirQualityAPI["/api/air-quality (GET)"]
        ChatAPI["/api/chat (POST)"]
        RecsAPI["/api/recommendations (POST)"]
    end

    subgraph Domain Engine Services
        AqiService[Air Quality Service & Cache]
        CalcEngine[CPCB NAQI Interpolation Engine]
        RecEngine[Deterministic Recommendation Engine]
        AiService[AI Assistant Adapter & Fallback]
        CommuteEngine[Commute & CEA Emissions Calculator]
    end

    subgraph External Providers
        OpenMeteo[Open-Meteo Air Quality API]
        Gemini[Google Gemini Generative AI]
    end

    Browser <--> NextApp
    Browser <--> LocalStorage
    NextApp --> LandingPage
    NextApp --> OnboardingPage
    NextApp --> DashboardPage
    NextApp --> IndoorPage
    NextApp --> CommutePage
    NextApp --> ImpactPage

    DashboardPage --> AirQualityAPI
    DashboardPage --> ChatAPI
    DashboardPage --> RecsAPI

    AirQualityAPI --> AqiService
    AqiService --> CalcEngine
    AqiService -.-> OpenMeteo

    ChatAPI --> RateLimiter
    RateLimiter --> AiService
    AiService -.-> Gemini

    RecsAPI --> RecEngine
    CommutePage --> CommuteEngine
```

## Architectural Characteristics
- **Framework:** Next.js 14 (App Router) with React Server & Client Components
- **Data Fetching:** Incremental Static Regeneration with 15-minute in-memory caching
- **Dynamic Bundling:** Dynamic imports for heavy SVG charting elements
- **Defensive Edge:** Rate limiting, CSP, X-Frame-Options, and origin validation
