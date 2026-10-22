# Airfare Index India — Architecture & API Configuration Guide

This guide documents the architecture, data sources, environment variables, and third-party integrations for **Airfare Index India**.

---

## 1. System Architecture

The application is structured into modular layers:

- **Frontend Core (`src/App.tsx`)**: Responsive single-page application with dark navy sidebar (`#0B132B`), topbar, and desktop/tablet/mobile responsiveness.
- **Flight Search & Fare Engine (`src/data/flights.ts`)**: Supports One-Way, Round-Trip (with combined fare calculation), and Multi-City travel across 92 Indian airports.
- **AI Recommendation Engine (`evaluateRecommendations`)**: Analyzes total fare, duration, non-stop connection, baggage allowance, and time slots to evaluate **Cheapest**, **Fastest**, and **Best Value** flights.
- **Airlines Directory (`src/data/airlines.ts`)**: Configurable directory of verified carriers operating in India (IndiGo, Air India, Akasa Air, SpiceJet, Air India Express, Alliance Air, Star Air, Fly91, Emirates, Singapore Airlines) with deep-linked official booking redirects.
- **Strict 5 km Nearby Discovery (`src/data/nearbyPlaces.ts`)**: Calculates accurate geodesic distance using the Haversine formula from airport coordinates (or user consented GPS). Displays interactive radar map and filtered hotels/restaurants.
- **AI Budget Recommender (`src/data/budgetAssistant.ts`)**: Itemizes total trip cost (`Outbound + Return Flights + Hotel Nights + Food + Local Cabs + Sightseeing`) and creates 3 comparison plans (*Pocket-Friendly Saver, Balanced Smart Value, Premium Comfort*).
- **Holiday Packages & Trip Planner (`src/data/packages.ts`)**: 10 travel categories with day-by-day itineraries and multi-package comparison.

---

## 2. Environment Variables Configuration

Configure the following variables in your `.env` or deployment runtime environment:

| Variable | Description | Default / Fallback Behavior |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Google Gemini AI SDK key for dynamic itinerary intelligence. | Pre-injected by Google AI Studio. |
| `FLIGHT_API_KEY` | Client ID / API key for authorized flight data providers (e.g., Amadeus for Developers or Duffel). | When omitted, the app runs on calibrated regional benchmark indices and scheduled carrier flight times with transparent data notices. |
| `FLIGHT_API_SECRET` | Client Secret for OAuth 2.0 flight API token exchanges. | Optional. |
| `PLACES_API_KEY` | Google Maps Platform Places API key for real-time live business discovery. | When omitted, vetted geographic coordinates within 5.0 km are used with Google Maps directions deep-links. |
| `MAPS_API_KEY` | Google Maps Platform JavaScript API key. | When omitted, interactive SVG vector radar map is displayed. |

---

## 3. Official Booking Redirects Policy

To ensure user trust and compliance with airline terms:
- **No Direct Ticket Sales**: Airfare Index India never claims a ticket is booked inside the app.
- **Verified Deep Links**: All "Book on Official Website" buttons redirect directly to official carrier portals (e.g., `https://www.goindigo.in`, `https://www.airindia.com`, `https://www.akasaair.com`, `https://www.spicejet.com`, `https://www.airindiaexpress.com`) with route and date parameters preserved.
- **Transparency Guarantee**: Users are provided an informational confirmation modal explaining that they are transferring to the carrier's verified booking engine without booking markups.

---

## 4. Verification & Testing Checklist

- [x] **Desktop Dashboard**: Hero banner, 6 stat cards, Quick Search, Spline trend chart, Donut chart, Leaderboard, Insights, Popular routes.
- [x] **Trip Types**: One-Way, Round-Trip (outbound + return leg picker with combined fare), and Multi-City (dynamic leg addition/removal).
- [x] **Airlines Directory**: 10 verified carriers with IATA codes, fleets, OTP ratings, and official booking redirects.
- [x] **Nearby 5 km Discovery**: Haversine distance calculations around DEL, BOM, BLR, HYD, GOI with interactive radar map, dietary filters, and Google Maps directions.
- [x] **Smart Budget Planner**: Itemized total calculations, side-by-side 3-tier plans, surplus/deficit tracking.
- [x] **Holiday Packages**: Multi-category travel, customizer, and 3-package side-by-side comparison modal.
- [x] **Price Alerts**: Threshold monitors, saved trips/flights, and search history.
- [x] **Admin Dashboard**: System health indicators, telemetry stats, and working manual ingestion trigger.
- [x] **Mobile App Simulator**: Recreates the exact mobile views from Reference Screenshots 1 & 2.
