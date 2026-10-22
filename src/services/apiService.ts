/**
 * Airfare Index India — API Integration & Telemetry Service
 * 
 * Handles flight search APIs, Google Maps/Places API configuration,
 * and AI Smart Assistant endpoints with transparent status reporting.
 */

export interface ApiConfigurationStatus {
  flightApiConfigured: boolean;
  placesApiConfigured: boolean;
  mapsApiConfigured: boolean;
  geminiApiConfigured: boolean;
  dataSourceLabel: string;
}

export function getApiConfigurationStatus(): ApiConfigurationStatus {
  // Safely check runtime environment variables in both Vite client and Node.js environments
  const getEnv = (name: string): string | undefined => {
    try {
      if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
        const clientVal = (import.meta as any).env[name] || (import.meta as any).env[`VITE_${name}`];
        if (clientVal) return clientVal;
      }
    } catch (e) {
      // ignore
    }
    try {
      if (typeof process !== 'undefined' && process.env) {
        return process.env[name];
      }
    } catch (e) {
      // ignore
    }
    return undefined;
  };

  const flightKey = getEnv('FLIGHT_API_KEY');
  const placesKey = getEnv('PLACES_API_KEY');
  const mapsKey = getEnv('MAPS_API_KEY');
  const geminiKey = getEnv('GEMINI_API_KEY');

  const isFlightLive = Boolean(flightKey && flightKey !== 'MY_FLIGHT_API_KEY');
  const isPlacesLive = Boolean(placesKey && placesKey !== 'MY_PLACES_API_KEY');
  const isMapsLive = Boolean(mapsKey && mapsKey !== 'MY_MAPS_API_KEY');
  const isGeminiLive = Boolean(geminiKey && geminiKey !== 'MY_GEMINI_API_KEY');

  return {
    flightApiConfigured: isFlightLive,
    placesApiConfigured: isPlacesLive,
    mapsApiConfigured: isMapsLive,
    geminiApiConfigured: isGeminiLive,
    dataSourceLabel: isFlightLive
      ? 'Live Carrier & GDS Ingestion Feed'
      : 'Calibrated Indian Aviation Index & Official Carrier Schedules'
  };
}

export const API_DOCS = {
  envVariables: [
    {
      name: 'FLIGHT_API_KEY',
      purpose: 'Authorized flight data provider API key (e.g. Amadeus / Duffel / AviationStack)',
      status: 'Optional for live production feeds; graceful calibrated fallback enabled'
    },
    {
      name: 'FLIGHT_API_SECRET',
      purpose: 'Client secret for OAuth 2.0 flight API token exchanges',
      status: 'Optional'
    },
    {
      name: 'PLACES_API_KEY',
      purpose: 'Google Places API key for real-time live airport radius business discovery',
      status: 'Optional; validated GPS Haversine radar enabled'
    },
    {
      name: 'MAPS_API_KEY',
      purpose: 'Google Maps JavaScript API key for interactive satellite & street layers',
      status: 'Optional; interactive SVG vector radar active'
    },
    {
      name: 'GEMINI_API_KEY',
      purpose: 'Google Gemini AI API key for dynamic contextual itinerary generation',
      status: 'Pre-configured in environment'
    }
  ]
};
