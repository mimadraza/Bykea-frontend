import { LatLng } from "../Component/LeafletMap";

export interface SuggestionItem {
  title: string;   // Short formatted title (Option 3)
  full: string;    // Full display_name
  lat: number;
  lng: number;
}

/**
 * Live autosuggest using Nominatim
 * Fully free
 * Supports Urdu and multilingual input
 */
export async function searchAddress(query: string): Promise<SuggestionItem[]> {
  if (!query.trim()) return [];

  try {
    const url =
      "https://nominatim.openstreetmap.org/search?" +
      new URLSearchParams({
        q: query,
        format: "json",
        addressdetails: "1",
        limit: "8"
      }).toString();

    const res = await fetch(url, {
      headers: {
        "User-Agent": "RideApp/1.0"
      }
    });

    const data = await res.json();

    return data.map((item: any) => {
      const fullName = item.display_name || "";

      // Build the Option 3 short title
      const addr = item.address || {};
      const shortName =
        addr.amenity ||
        addr.building ||
        addr.neighbourhood ||
        addr.suburb ||
        addr.village ||
        addr.city ||
        addr.town ||
        addr.road ||
        fullName.split(",")[0];

      const area =
        addr.suburb ||
        addr.neighbourhood ||
        addr.city ||
        addr.town ||
        addr.county ||
        "Pakistan";

      return {
        title: `${shortName} — ${area}`,
        full: fullName,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon)
      } as SuggestionItem;
    });
  } catch (err) {
    console.warn("Autosuggest error:", err);
    return [];
  }
}
