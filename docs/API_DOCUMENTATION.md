# API Documentation & Endpoint Specification

---

## 1. GET `/api/air-quality`
Fetches real-world meteorological air quality data for a specified city or coordinates.

### Query Parameters
- `city` (string, optional, default: `"Delhi"`): City name preset.
- `lat` (float, optional): Latitude coordinate (-90 to +90).
- `lon` (float, optional): Longitude coordinate (-180 to +180).

### Response Schema (`HTTP 200`)
```json
{
  "success": true,
  "data": {
    "city": "Delhi",
    "latitude": 28.6139,
    "longitude": 77.209,
    "aqi": 320,
    "category": "veryPoor",
    "categoryLabel": "Very Poor",
    "mainPollutant": "PM2.5",
    "pollutants": {
      "pm25": { "value": 180, "unit": "µg/m³", "ratioOfStandard": 3.0 },
      "pm10": { "value": 290, "unit": "µg/m³", "ratioOfStandard": 2.9 }
    },
    "hourly": [ ... ],
    "source": "Open-Meteo European Environment Agency & CPCB Synced Data",
    "isSimulatedDemo": false,
    "healthAdvisory": "Substantially reduce outdoor exposure..."
  }
}
```

---

## 2. POST `/api/chat`
Conversational advisory endpoint backed by Google Gemini API with deterministic fallback.

### Request Headers
- `Content-Type: application/json`
- `Content-Length`: Maximum 25,000 bytes

### Request Body Schema
```json
{
  "query": "Is it safe to go jogging today?",
  "context": {
    "location": "Delhi",
    "aqi": 320,
    "category": "Very Poor",
    "pm25": 180,
    "pm10": 290,
    "mainPollutant": "PM2.5",
    "household": "family_children",
    "lifestyle": "fitness_enthusiast",
    "commute": "bicycle",
    "indoorEnvironment": {
      "hasAirPurifier": false,
      "windowsOpen": false,
      "cookingFuel": "lpg",
      "ventilation": "moderate"
    },
    "preferences": {
      "budgetPreference": "low_cost",
      "sustainabilityPriorities": ["maximum_protection"]
    }
  }
}
```

### Rate Limiting & Errors
- `HTTP 400`: Invalid payload schema
- `HTTP 413`: Payload exceeds 25 KB
- `HTTP 429`: Exceeded 20 requests per minute limit
