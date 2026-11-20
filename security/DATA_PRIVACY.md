# Data Privacy Policy & Architectural Boundaries

## 1. Zero Sensitive Data Collection
BreatheWise AI is architected strictly under the principle of data minimization:
- **No Personal Identifiable Information (PII):** We do not collect names, phone numbers, email addresses, national IDs, or precise GPS tracks.
- **General Location Only:** Location is defined at the city or optional neighborhood level (e.g., "Delhi", "Kolkata", "Asansol").
- **Categorical Lifestyle Metadata:** We collect broad household categories ("Family with children", "Office commuter") rather than specific medical histories.

## 2. Local-First Preference Storage
All onboarding responses, custom city choices, and safety checklists are stored exclusively in the user's browser `localStorage`:
```typescript
localStorage.setItem('breathewise_user_profile', JSON.stringify(profile));
```
Users can purge all data at any time by clearing their browser cache or resetting their profile in the app settings.

## 3. Third-Party API Isolation
- **Air Quality Data:** Fetched from Open-Meteo Air Quality API using city geographic centroids. No client identifiers or user cookies are transmitted.
- **AI Inference:** The AI route transmits only the structured context (AQI, PM2.5, lifestyle category) necessary for decision calculation.
