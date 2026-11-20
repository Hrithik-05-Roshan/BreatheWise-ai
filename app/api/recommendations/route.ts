import { NextRequest, NextResponse } from "next/server";
import { generatePersonalizedRecommendations, buildDiurnalPlan } from "@/lib/recommendations/engine";
import { RecommendationsRequestSchema } from "@/lib/types/validation";
import { RecommendationContext } from "@/lib/types/recommendations";

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const validation = RecommendationsRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid recommendation context parameters",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const context: RecommendationContext = validation.data;
    const recommendations = generatePersonalizedRecommendations(context);
    const diurnalPlan = buildDiurnalPlan(recommendations, context.aqi);

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
