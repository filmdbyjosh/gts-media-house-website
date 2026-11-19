import { NextResponse } from "next/server";
import { quoteTravelFromMiles, TRAVEL_ORIGIN } from "@/lib/booking/travel";

type TravelBody = {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
};

type GeoPoint = { lat: number; lng: number };

function haversineMiles(a: GeoPoint, b: GeoPoint): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h =
    sinLat * sinLat +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

async function geocodeAddress(body: TravelBody): Promise<GeoPoint | null> {
  const params = new URLSearchParams({
    format: "json",
    limit: "1",
    country: "US",
  });
  if (body.street?.trim()) params.set("street", body.street.trim());
  if (body.city?.trim()) params.set("city", body.city.trim());
  if (body.state?.trim()) params.set("state", body.state.trim());
  if (body.zip?.trim()) params.set("postalcode", body.zip.trim());

  const headers = {
    "User-Agent": "GTSMediaHouseBooking/1.0 (https://gtsmediahouse.com)",
    Accept: "application/json",
  };

  const structured = await fetch(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`,
    { headers, cache: "no-store" }
  );

  if (structured.ok) {
    const data = (await structured.json()) as Array<{
      lat: string;
      lon: string;
    }>;
    if (data[0]) {
      return { lat: Number(data[0].lat), lng: Number(data[0].lon) };
    }
  }

  const q = [body.street, body.city, body.state, body.zip, "USA"]
    .map((p) => p?.trim())
    .filter(Boolean)
    .join(", ");

  const fallback = await fetch(
    `https://nominatim.openstreetmap.org/search?${new URLSearchParams({
      format: "json",
      limit: "1",
      q,
    }).toString()}`,
    { headers, cache: "no-store" }
  );

  if (!fallback.ok) return null;
  const data = (await fallback.json()) as Array<{ lat: string; lon: string }>;
  if (!data[0]) return null;
  return { lat: Number(data[0].lat), lng: Number(data[0].lon) };
}

async function drivingMiles(dest: GeoPoint): Promise<number | null> {
  const url =
    `https://router.project-osrm.org/route/v1/driving/` +
    `${TRAVEL_ORIGIN.lng},${TRAVEL_ORIGIN.lat};${dest.lng},${dest.lat}` +
    `?overview=false`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      code?: string;
      routes?: Array<{ distance: number }>;
    };
    if (data.code !== "Ok" || !data.routes?.[0]) return null;
    return data.routes[0].distance / 1609.344;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as TravelBody;
    if (!body.street?.trim() || !body.city?.trim() || !body.zip?.trim()) {
      return NextResponse.json(
        { error: "Street, city, and ZIP are required." },
        { status: 400 }
      );
    }

    const dest = await geocodeAddress(body);
    if (!dest || Number.isNaN(dest.lat) || Number.isNaN(dest.lng)) {
      return NextResponse.json(
        { error: "We couldn’t find that address. Check it and try again." },
        { status: 404 }
      );
    }

    const driven = await drivingMiles(dest);
    const miles =
      driven ??
      haversineMiles(
        { lat: TRAVEL_ORIGIN.lat, lng: TRAVEL_ORIGIN.lng },
        dest
      );
    const quote = quoteTravelFromMiles(miles);

    return NextResponse.json({
      ...quote,
      origin: TRAVEL_ORIGIN.label,
      estimated: driven == null,
    });
  } catch (err) {
    console.error("TRAVEL QUOTE ERROR:", err);
    return NextResponse.json(
      { error: "Could not calculate travel from that address." },
      { status: 500 }
    );
  }
}
