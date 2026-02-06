// Geocoding service for Calgary addresses using Mapbox Geocoding API

export interface GeocodingResult {
  address: string;
  coordinates: [number, number]; // [lng, lat]
  placeName: string;
  community?: string;
}

export async function geocodeAddress(
  address: string,
  token: string
): Promise<GeocodingResult | null> {
  try {
    // Add "Calgary, Alberta" to improve results
    const query = encodeURIComponent(`${address}, Calgary, Alberta, Canada`);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}&country=CA&proximity=-114.0719,51.0447&limit=1`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      return null;
    }

    const feature = data.features[0];
    
    return {
      address: address,
      coordinates: feature.center as [number, number],
      placeName: feature.place_name,
      community: extractCommunity(feature.context),
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

function extractCommunity(context?: Array<{ id: string; text: string }>): string | undefined {
  if (!context) return undefined;
  
  // Look for neighborhood or locality in context
  const neighborhood = context.find(c => c.id.startsWith('neighborhood'));
  if (neighborhood) return neighborhood.text;
  
  const locality = context.find(c => c.id.startsWith('locality'));
  if (locality) return locality.text;
  
  return undefined;
}
