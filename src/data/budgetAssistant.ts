import { searchFlights, Flight } from './flights';
import { getNearbyPlacesWithin5Km, NearbyPlace } from './nearbyPlaces';

export interface BudgetPreferences {
  fromCity: string;
  toCity: string;
  departDate: string;
  returnDate?: string;
  isRoundTrip: boolean;
  travelers: number;
  durationDays: number;
  totalBudget: number;
  hotelCategory: 'budget' | 'standard' | 'premium' | 'luxury';
  foodPreference: 'all' | 'veg' | 'seafood' | 'continental';
  travelStyle: 'relaxed' | 'fast-paced' | 'business' | 'family';
  maxDistanceKm: number;
}

export interface TravelPlanItemization {
  title: string;
  badge: string;
  isRecommended: boolean;
  outboundFlight: Flight;
  returnFlight?: Flight;
  totalFlightCost: number;
  recommendedHotel: NearbyPlace;
  hotelNights: number;
  hotelRooms: number;
  totalHotelCost: number;
  recommendedRestaurants: NearbyPlace[];
  dailyFoodCostPerPerson: number;
  totalFoodCost: number;
  localTransportCost: number;
  activitiesCost: number;
  totalTripCost: number;
  budgetStatus: 'within-budget' | 'surplus' | 'over-budget';
  differenceAmount: number; // positive = saved/surplus, negative = over-budget
  whyRecommended: string;
  moneySavingTips: string[];
}

export function generateSmartTravelPlans(prefs: BudgetPreferences): {
  plans: TravelPlanItemization[];
  summaryAnalysis: string;
} {
  const travelers = Math.max(1, prefs.travelers);
  const nights = Math.max(1, prefs.durationDays - 1);
  const rooms = Math.ceil(travelers / 2);

  // 1. Fetch available flights
  const outboundFlights = searchFlights(prefs.fromCity, prefs.toCity, prefs.departDate, travelers, 'Economy');
  const returnFlights = prefs.isRoundTrip && prefs.returnDate
    ? searchFlights(prefs.toCity, prefs.fromCity, prefs.returnDate, travelers, 'Economy')
    : [];

  // 2. Fetch nearby hotels and restaurants within 5 km of arrival airport
  const { places } = getNearbyPlacesWithin5Km(prefs.toCity, undefined, undefined, 'all');
  const hotels = places.filter(p => p.type === 'hotel');
  const restaurants = places.filter(p => p.type === 'restaurant');

  // Fallbacks if list is empty
  const defaultHotel: NearbyPlace = hotels[0] || {
    id: 'def-h',
    airportCode: prefs.toCity,
    name: 'Airport Comfort Stay',
    type: 'hotel',
    lat: 0,
    lng: 0,
    distanceKm: 2.1,
    rating: 4.4,
    reviewCount: 950,
    address: 'Near Airport Circle',
    priceLevel: '₹₹',
    estimatedCost: '₹ 3,500 / night',
    numericCost: 3500,
    cuisineOrCategory: 'Comfort Airport Transit Rooms',
    amenitiesOrSpecialty: ['Free WiFi', 'Breakfast Included', 'Airport Drop'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
    isOpenNow: true,
    openingHours: '24 Hours Open',
    officialWebsite: 'https://www.google.com/travel/hotels',
    directionsUrl: 'https://maps.google.com'
  };

  // Sort flights by fare
  const flightsAsc = [...outboundFlights].sort((a, b) => a.totalFare - b.totalFare);
  const returnAsc = [...returnFlights].sort((a, b) => a.totalFare - b.totalFare);

  // Plan 1: "Budget Saver" Plan
  const p1FlightOut = flightsAsc[0] || outboundFlights[0];
  const p1FlightRet = returnAsc[0] || returnFlights[0];
  const p1FlightTotal = (p1FlightOut?.totalFare || 0) + (p1FlightRet?.totalFare || 0);

  const budgetHotels = [...hotels].sort((a, b) => a.numericCost - b.numericCost);
  const p1Hotel = budgetHotels[0] || defaultHotel;
  const p1HotelTotal = p1Hotel.numericCost * nights * rooms;

  const p1FoodPerDay = 500;
  const p1FoodTotal = p1FoodPerDay * travelers * prefs.durationDays;
  const p1Transport = 800 * prefs.durationDays;
  const p1Activities = 600 * travelers;
  const p1Total = p1FlightTotal + p1HotelTotal + p1FoodTotal + p1Transport + p1Activities;
  const p1Diff = prefs.totalBudget - p1Total;

  // Plan 2: "Balanced Best Value" Plan (Recommended)
  const p2FlightOut = outboundFlights.find(f => f.stops === 0 && f.onTimeRating > 85) || outboundFlights[1] || flightsAsc[0];
  const p2FlightRet = returnFlights.find(f => f.stops === 0) || returnFlights[0];
  const p2FlightTotal = (p2FlightOut?.totalFare || 0) + (p2FlightRet?.totalFare || 0);

  const valueHotels = [...hotels].sort((a, b) => b.rating - a.rating);
  const p2Hotel = valueHotels.find(h => h.numericCost <= 6000) || hotels[1] || defaultHotel;
  const p2HotelTotal = p2Hotel.numericCost * nights * rooms;

  const p2FoodPerDay = 900;
  const p2FoodTotal = p2FoodPerDay * travelers * prefs.durationDays;
  const p2Transport = 1400 * prefs.durationDays;
  const p2Activities = 1500 * travelers;
  const p2Total = p2FlightTotal + p2HotelTotal + p2FoodTotal + p2Transport + p2Activities;
  const p2Diff = prefs.totalBudget - p2Total;

  // Plan 3: "Premium Comfort" Plan
  const p3FlightOut = outboundFlights.find(f => f.mealIncluded || f.airlineId === 'air-india') || outboundFlights[outboundFlights.length - 1];
  const p3FlightRet = returnFlights.find(f => f.airlineId === 'air-india') || returnFlights[returnFlights.length - 1];
  const p3FlightTotal = (p3FlightOut?.totalFare || 0) + (p3FlightRet?.totalFare || 0);

  const premiumHotels = [...hotels].sort((a, b) => b.numericCost - a.numericCost);
  const p3Hotel = premiumHotels[0] || defaultHotel;
  const p3HotelTotal = p3Hotel.numericCost * nights * rooms;

  const p3FoodPerDay = 1800;
  const p3FoodTotal = p3FoodPerDay * travelers * prefs.durationDays;
  const p3Transport = 2500 * prefs.durationDays;
  const p3Activities = 3000 * travelers;
  const p3Total = p3FlightTotal + p3HotelTotal + p3FoodTotal + p3Transport + p3Activities;
  const p3Diff = prefs.totalBudget - p3Total;

  const plans: TravelPlanItemization[] = [
    {
      title: 'Pocket-Friendly Saver',
      badge: 'Maximum Savings',
      isRecommended: p1Diff >= 0 && p2Diff < 0,
      outboundFlight: p1FlightOut,
      returnFlight: p1FlightRet,
      totalFlightCost: p1FlightTotal,
      recommendedHotel: p1Hotel,
      hotelNights: nights,
      hotelRooms: rooms,
      totalHotelCost: p1HotelTotal,
      recommendedRestaurants: restaurants.slice(0, 2),
      dailyFoodCostPerPerson: p1FoodPerDay,
      totalFoodCost: p1FoodTotal,
      localTransportCost: p1Transport,
      activitiesCost: p1Activities,
      totalTripCost: p1Total,
      budgetStatus: p1Diff >= 0 ? 'within-budget' : 'over-budget',
      differenceAmount: p1Diff,
      whyRecommended: `Minimizes non-essential costs by pairing the lowest available flight tier with a vetted hotel just ${p1Hotel.distanceKm} km from the runway.`,
      moneySavingTips: [
        'Booking departure flights during off-peak morning or late evening saves up to ₹1,200.',
        `Hotel ${p1Hotel.name} provides complimentary breakfast and free airport shuttle.`,
        'Utilize Airport Metro Express / app cabs instead of airport private counters to save 40% on transit.'
      ]
    },
    {
      title: 'Balanced Smart Value',
      badge: 'Best Value Recommendation',
      isRecommended: p2Diff >= 0 || (p1Diff < 0 && p2Diff >= p1Diff),
      outboundFlight: p2FlightOut,
      returnFlight: p2FlightRet,
      totalFlightCost: p2FlightTotal,
      recommendedHotel: p2Hotel,
      hotelNights: nights,
      hotelRooms: rooms,
      totalHotelCost: p2HotelTotal,
      recommendedRestaurants: restaurants.slice(0, 3),
      dailyFoodCostPerPerson: p2FoodPerDay,
      totalFoodCost: p2FoodTotal,
      localTransportCost: p2Transport,
      activitiesCost: p2Activities,
      totalTripCost: p2Total,
      budgetStatus: p2Diff >= 0 ? 'within-budget' : 'over-budget',
      differenceAmount: p2Diff,
      whyRecommended: `Optimal equilibrium between flight timings (non-stop direct on-time flight), high-rated hotel accommodation (${p2Hotel.rating}★ rating, ${p2Hotel.distanceKm} km away), and flexible dining.`,
      moneySavingTips: [
        'Selected flight has zero layovers saving 3 hours of transit downtime.',
        'Includes dining options at verified authentic eateries within 3 km of your stay.',
        'Total budget leaves ample buffer for unexpected city travel.'
      ]
    },
    {
      title: 'Premium Comfort Experience',
      badge: 'Luxury & Convenience',
      isRecommended: false,
      outboundFlight: p3FlightOut,
      returnFlight: p3FlightRet,
      totalFlightCost: p3FlightTotal,
      recommendedHotel: p3Hotel,
      hotelNights: nights,
      hotelRooms: rooms,
      totalHotelCost: p3HotelTotal,
      recommendedRestaurants: restaurants,
      dailyFoodCostPerPerson: p3FoodPerDay,
      totalFoodCost: p3FoodTotal,
      localTransportCost: p3Transport,
      activitiesCost: p3Activities,
      totalTripCost: p3Total,
      budgetStatus: p3Diff >= 0 ? 'within-budget' : 'over-budget',
      differenceAmount: p3Diff,
      whyRecommended: `First-class travel experience featuring full-service carriers with meal allowances, 5-star hotel luxury with spa amenities, and premier airport hospitality.`,
      moneySavingTips: [
        'Full baggage allowance (25-30kg) and in-flight hot meals included at no extra cost.',
        `Executive airport lounge and spa access at ${p3Hotel.name}.`
      ]
    }
  ];

  const recommendedPlan = plans.find(p => p.isRecommended) || plans[1];
  const summaryAnalysis = `For ${travelers} traveler${travelers > 1 ? 's' : ''} visiting ${prefs.toCity} from ${prefs.fromCity} for ${prefs.durationDays} days: The "${recommendedPlan.title}" delivers optimal value at an estimated total of ₹ ${recommendedPlan.totalTripCost.toLocaleString('en-IN')}. ${
    recommendedPlan.differenceAmount >= 0
      ? `This leaves you with a comfortable safety cushion of ₹ ${recommendedPlan.differenceAmount.toLocaleString('en-IN')} under your ₹ ${prefs.totalBudget.toLocaleString('en-IN')} target budget.`
      : `This is ₹ ${Math.abs(recommendedPlan.differenceAmount).toLocaleString('en-IN')} over your budget. You can choose the Pocket-Friendly Saver plan or adjust hotel tiers to fit your target.`
  }`;

  return { plans, summaryAnalysis };
}
