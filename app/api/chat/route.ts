import { NextRequest, NextResponse } from "next/server";
import { ChatRequestSchema } from "@/lib/types/validation";
import { askBreatheWiseIntelligence } from "@/lib/assistant/service";

// Simple sliding window rate-limiting tracker per IP for prototype safety
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS_PER_MINUTE = 20;

function extractClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0]?.trim();
    if (firstIp) return firstIp.slice(0, 45); // Limit to IPv6 max length
  }
  return "local-client";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Prune expired entries if map reaches threshold
  if (rateLimitMap.size > 500) {
    rateLimitMap.forEach((record, key) => {
      if (now > record.resetTime) {
        rateLimitMap.delete(key);
      }
    });
  }

  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_MINUTE) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip = extractClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait a moment before sending another query.",
        },
        { status: 429 }
      );
    }

    // 2. Payload Size Limit Check
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 25000) {
      return NextResponse.json(
        { error: "Payload size too large (exceeds 25KB)" },
        { status: 413 }
      );
    }

    // 3. Body Parsing Check
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    // 3. Schema Validation with Zod
    const validationResult = ChatRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request format",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { query, context } = validationResult.data;

    // 4. Query AI Service (with deterministic fallback)
    const aiResponse = await askBreatheWiseIntelligence(query, context);

    return NextResponse.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[API Chat] Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error occurred while processing your air quality advisory.",
      },
      { status: 500 }
    );
  }
}
