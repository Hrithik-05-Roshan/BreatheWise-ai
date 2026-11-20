import { StructuredUserContext, StructuredAiResponse } from "../types/chat";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompts";

/**
 * Sanitizes user input against prompt injection vectors, jailbreak attempts, and oversized payloads.
 *
 * @param input - Raw prompt string from the client
 * @returns Sanitized string safe for downstream context injection
 */
export function sanitizeUserInput(input: string): string {
  if (!input || typeof input !== "string") return "";
  
  // Truncate to reasonable length
  let sanitized = input.slice(0, 500);

  // Strip obvious prompt injection triggers
  const disallowedPatterns = [
    /ignore (all )?(previous|above) instructions/gi,
    /you are now (in )?developer mode/gi,
    /system prompt/gi,
    /jailbreak/gi,
    /roleplay as/gi,
  ];

  for (const pattern of disallowedPatterns) {
    sanitized = sanitized.replace(pattern, "[filtered-directive]");
  }

  return sanitized.trim();
}

/**
 * Generates an evidence-based, deterministic air quality intelligence response
 * when GEMINI_API_KEY is unset or during external provider downtime.
 *
 * @param query - Sanitized user inquiry string
 * @param ctx - Structured environmental and lifestyle user context
 * @returns StructuredAiResponse object conforming to the UI response schema
 */
export function generateDeterministicFallbackResponse(
  query: string,
  ctx: StructuredUserContext
): StructuredAiResponse {
  const isSevere = ctx.aqi > 300;
  const isPoor = ctx.aqi > 200;
  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  let situation = `Current air quality in ${ctx.location} is at AQI ${ctx.aqi} (${ctx.category}), driven predominantly by ${ctx.mainPollutant} (${ctx.pm25} µg/m³ PM2.5, which is ${Math.round((ctx.pm25 / 60) * 100)}% of the national safe standard).`;

  let whatItMeans = `As a ${ctx.lifestyle.replace("_", " ")} with a ${ctx.household.replace("_", " ")} household, `;
  if (isSevere) {
    whatItMeans += `ambient conditions pose an acute respiratory burden. Outdoor breathing rates will directly draw hazardous fine combustion soot into pulmonary tissue.`;
  } else if (isPoor) {
    whatItMeans += `unfiltered outdoor exposure during your ${ctx.commute.replace("_", " ")} routine could trigger bronchial irritation, eye watering, and prolonged fatigue.`;
  } else {
    whatItMeans += `pollution levels are moderate; healthy routines can continue with minor precautions during morning inversion periods.`;
  }

  const actions = [];
  if (ctx.commute === "bicycle" || ctx.commute === "walking") {
    actions.push({
      action: isPoor ? "Shift active commute to enclosed public transit (Metro/Bus) today" : "Wear a snug N95 respirator during commute",
      timing: "Morning rush hour (07:30 - 10:00 AM)",
      benefit: "Reduces peak respiratory toxic particulate intake by 70%",
      difficulty: "Easy" as const,
      cost: "Low" as const,
    });
  } else if (ctx.commute === "two_wheeler") {
    actions.push({
      action: "Wear a certified N95 particulate respirator beneath your helmet visor",
      timing: "Commute windows",
      benefit: "Filters out over 95% of direct diesel exhaust soot",
      difficulty: "Easy" as const,
      cost: "Low" as const,
    });
  } else {
    actions.push({
      action: "Set car climate system to internal recirculation mode",
      timing: "While driving",
      benefit: "Reduces cabin PM2.5 infiltration by up to 75%",
      difficulty: "Easy" as const,
      cost: "Free" as const,
    });
  }

  if (ctx.indoorEnvironment.hasAirPurifier) {
    actions.push({
      action: "Run HEPA air purifier on continuous auto mode in the main bedroom",
      timing: "Throughout the day and night",
      benefit: "Maintains indoor PM2.5 under 15 µg/m³",
      difficulty: "Easy" as const,
      cost: "Low" as const,
    });
  } else {
    actions.push({
      action: "Create a sealed bedroom buffer zone: seal door gaps with a damp cloth or draft snake",
      timing: "Keep windows closed 06:00 - 11:00 AM",
      benefit: "Cuts indoor particulate infiltration by up to 40% without electricity cost",
      difficulty: "Easy" as const,
      cost: "Free" as const,
    });
  }

  if (ctx.household.includes("children") || ctx.household.includes("seniors")) {
    actions.push({
      action: "Relocate physical play and exercise to indoor living spaces",
      timing: "Peak morning & evening hours",
      benefit: "Protects developing and sensitive pulmonary pathways from irreversible micro-damage",
      difficulty: "Easy" as const,
      cost: "Free" as const,
    });
  }

  return {
    situationAssessment: situation,
    whatThisMeansForYou: whatItMeans,
    recommendedActions: actions,
    whyTheseActionsMatter:
      "Microscopic PM2.5 particles penetrate deep into alveolar sacs and cross into the bloodstream. During temperature inversion, particulate concentration near ground level spikes by up to 130%. Physical mitigation prevents acute vascular and respiratory inflammation.",
    estimatedImpact:
      "Adopting these recommendations eliminates up to 65% of your household's daily toxic particle inhalation while conserving ~2.4 kg of CO2 emissions.",
    importantPrecautions: [
      "Ensure facial respirators (N95) have a snug seal around the nasal bridge; cloth masks and handkerchiefs do not filter PM2.5.",
      "Never burn incense, dhoop, or mosquito coils inside closed bedrooms during high outdoor pollution.",
      "Check on vulnerable household members for cough, throat irritation, or shortness of breath.",
    ],
    dataSourceAndTimestamp: `BreatheWise Deterministic Intelligence Engine • ${now} IST`,
    disclaimer:
      "This guidance is for environmental risk mitigation and informational purposes only. Consult healthcare professionals for specific clinical advice.",
  };
}

/**
 * Dispatches an air quality inquiry to the Google Gemini Generative AI API with
 * strict structured outputs, falling back to the deterministic engine upon failure.
 *
 * @param userQuery - Raw user query prompt
 * @param context - Structured user environmental context (AQI, commute, vulnerabilities)
 * @returns Promise resolving to a structured AI response object
 */
export async function askBreatheWiseIntelligence(
  userQuery: string,
  context: StructuredUserContext
): Promise<StructuredAiResponse> {
  const sanitizedQuery = sanitizeUserInput(userQuery);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Graceful, deterministic fallback
    return generateDeterministicFallbackResponse(sanitizedQuery, context);
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const userPromptText = buildUserPrompt(sanitizedQuery, context);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${SYSTEM_PROMPT}\n\n${userPromptText}` }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      throw new Error("Empty response from AI provider");
    }

    const parsed: StructuredAiResponse = JSON.parse(rawText);
    return parsed;
  } catch (error) {
    console.warn("[AssistantService] Gemini invocation failed, falling back to deterministic engine:", (error as Error).message);
    return generateDeterministicFallbackResponse(sanitizedQuery, context);
  }
}
