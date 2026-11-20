import { NextRequest, NextResponse } from "next/server";
import { getAirQuality } from "@/lib/air-quality/service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") || "Delhi";
    const latParam = searchParams.get("lat");
    const lonParam = searchParams.get("lon");

    const lat = latParam ? parseFloat(latParam) : undefined;
    const lon = lonParam ? parseFloat(lonParam) : undefined;

    const data = await getAirQuality(city, lat, lon);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("[API AirQuality] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch air quality data. Using local baseline.",
      },
      { status: 500 }
    );
  }
}
