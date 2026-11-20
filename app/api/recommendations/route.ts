import { NextRequest, NextResponse } from "next/server";
import { generatePersonalizedRecommendations, buildDiurnalPlan } from "@/lib/recommendations/engine";
import { RecommendationContext } from "@/lib/types/recommendations";

export async function POST(request: NextRequest) {
  try {
    const body: RecommendationContext = await request.json();

    if (!body || typeof body.aqi !== "number") {
      return NextResponse.json(
        { error: "Missing required environmental parameters (aqi)" },
        { status: 400 }
      );
    }

    const recommendations = generatePersonalizedRecommendations(body);
    const diurnalPlan = buildDiurnalPlan(recommendations, body.aqi);

    return NextResponse.json({
      success: true,
      recommendations,
      diurnalPlan,
    });
  } catch (error) {
    console.error("[API Recommendations] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
