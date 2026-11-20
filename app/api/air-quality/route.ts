import { NextRequest, NextResponse } from "next/server";
import { getAirQuality } from "@/lib/air-quality/service";
import { AirQualityQuerySchema } from "@/lib/types/validation";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsedQuery = AirQualityQuerySchema.safeParse({
      city: searchParams.get("city") || "Delhi",
      lat: searchParams.get("lat") || undefined,
      lon: searchParams.get("lon") || undefined,
    });

    if (!parsedQuery.success) {
      return NextResponse.json(
        { success: false, error: "Invalid query parameters" },
        { status: 400 }
      );
    }

    const { city, lat, lon } = parsedQuery.data;
    const data = await getAirQuality(city, lat, lon);

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
        },
      }
    );
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
