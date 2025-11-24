// src/services/openRouteService.ts
// FINAL VERSION — clean, stable, no env variables

import { LatLng } from "../Component/LeafletMap";

// YOUR REAL ORS KEY GOES HERE:
const OPENROUTESERVICE_API_KEY = "Enter_API_KEY_HERE";

const ORS_BASE = "https://api.openrouteservice.org";

//
// ---------------------------------------------------------------
// 1. GEOCODING (search an address → get {lat,lng})
// ---------------------------------------------------------------
//
export async function geocodeAddress(address: string): Promise<LatLng | null> {
  try {
    const url =
      `${ORS_BASE}/geocode/search?api_key=${OPENROUTESERVICE_API_KEY}` +
      `&text=${encodeURIComponent(address)}`;

    const resp = await fetch(url);
    const json = await resp.json();

    if (
      !json.features ||
      !json.features.length ||
      !json.features[0].geometry ||
      !json.features[0].geometry.coordinates
    ) {
      return null;
    }

    const [lng, lat] = json.features[0].geometry.coordinates;
    return { lat, lng };
  } catch (err) {
    console.warn("Geocode error:", err);
    return null;
  }
}

//
// ---------------------------------------------------------------
// 2. DIRECTIONS (start → end → route geometry)
// ---------------------------------------------------------------
//
export async function getRoute(
  start: LatLng,
  end: LatLng
): Promise<{ geometry: LatLng[] }> {
  try {
    const body = {
      coordinates: [
        [start.lng, start.lat],
        [end.lng, end.lat]
      ]
    };

    const resp = await fetch(`${ORS_BASE}/v2/directions/driving-car/geojson`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: OPENROUTESERVICE_API_KEY
      },
      body: JSON.stringify(body)
    });

    const json = await resp.json();

    if (!json.features || !json.features.length) {
      throw new Error("Route not found");
    }

    // Convert ORS geometry → {lat,lng}[]
    const coords = json.features[0].geometry.coordinates.map((c: number[]) => ({
      lng: c[0],
      lat: c[1]
    }));

    return { geometry: coords };
  } catch (err) {
    console.warn("Directions error:", err);
    throw err;
  }
}
