# Environment Configuration & Setup

## Environment Variables (`.env.local`)
BreatheWise AI is designed to run completely functional out-of-the-box without requiring any mandatory external API keys.

| Variable Name | Required | Default Value | Purpose |
| :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | Optional | `""` (Empty) | If provided, activates live Google Gemini Generative AI in the assistant. If omitted, the application operates automatically via its deterministic intelligence engine. |
| `NEXT_PUBLIC_AQI_API_BASE` | Optional | `https://air-quality-api.open-meteo.com/v1/air-quality` | External Open-Meteo Air Quality endpoint. |
| `NODE_ENV` | Automatic | `development` | Runtime environment mode. |

### Configuration Example
Create `.env.local` in the project root:
```env
# Optional Gemini Key (Leave empty to use built-in deterministic intelligence)
GEMINI_API_KEY=

# Public endpoint
NEXT_PUBLIC_AQI_API_BASE=https://air-quality-api.open-meteo.com/v1/air-quality
```
