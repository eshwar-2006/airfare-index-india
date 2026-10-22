export interface PackageItineraryDay {
  day: number;
  title: string;
  activities: string[];
  mealsIncluded: string[];
  stayLocation: string;
}

export interface HolidayPackage {
  id: string;
  title: string;
  destination: string;
  stateOrCountry: string;
  category: 
    | 'Weekend Getaways'
    | 'Budget Holidays'
    | 'Family Trips'
    | 'Honeymoon Packages'
    | 'Adventure Trips'
    | 'Beach Holidays'
    | 'Hill Stations'
    | 'Pilgrimage Trips'
    | 'International Holidays'
    | 'Customized Trips';
  durationDays: number;
  durationNights: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  nearestAirportCode: string;
  estimatedFlightCost: number; // Base per person
  estimatedHotelCostPerNight: {
    budget: number;
    standard: number;
    premium: number;
    luxury: number;
  };
  inclusions: string[];
  exclusions: string[];
  itinerary: PackageItineraryDay[];
  highlightTags: string[];
  lastUpdated: string;
}

export const HOLIDAY_PACKAGES: HolidayPackage[] = [
  {
    id: 'pkg-goa-beach',
    title: 'Sun, Sand & Sunset Serenity: North & South Goa',
    destination: 'Goa',
    stateOrCountry: 'Goa, India',
    category: 'Beach Holidays',
    durationDays: 4,
    durationNights: 3,
    rating: 4.8,
    reviewCount: 342,
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80',
    description: 'Experience pristine golden beaches, Portuguese heritage churches, lively beach shacks, and exhilarating sunset cruises.',
    nearestAirportCode: 'GOI',
    estimatedFlightCost: 5400,
    estimatedHotelCostPerNight: {
      budget: 1800,
      standard: 3200,
      premium: 6500,
      luxury: 14000
    },
    inclusions: [
      'Airport pickup and drop via private AC cab',
      'Daily breakfast buffet at chosen hotel',
      'South Goa heritage & church tour with private guide',
      'Mandovi River sunset cruise pass',
      'Water sports voucher (Parasailing & Jet ski)'
    ],
    exclusions: ['Airfare (estimated separately)', 'Personal expenses and shopping', 'Alcoholic beverages'],
    highlightTags: ['Beaches', 'Nightlife', 'Seafood', 'Watersports'],
    lastUpdated: '18 Oct 2026',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Goa & North Beach Vibe',
        activities: ['Arrive at Dabolim / Mopa airport, transfer to resort', 'Check-in and relax by the pool', 'Evening stroll at Calangute and Baga beach shacks with fresh seafood'],
        mealsIncluded: ['Dinner'],
        stayLocation: 'North Goa (Candolim / Calangute)'
      },
      {
        day: 2,
        title: 'Historic Forts & Watersports Adventure',
        activities: ['Morning visit to Aguada Fort & lighthouse panoramic view', 'Afternoon jet ski and parasailing at Anjuna beach', 'Sunset at Chapora Fort (Dil Chahta Hai point)'],
        mealsIncluded: ['Breakfast'],
        stayLocation: 'North Goa'
      },
      {
        day: 3,
        title: 'South Goa Heritage & Mandovi River Cruise',
        activities: ['Explore Basilica of Bom Jesus and Se Cathedral in Old Goa', 'Spice plantation walk with authentic Goan lunch', 'Sunset catamaran cruise along the Mandovi river with cultural dance'],
        mealsIncluded: ['Breakfast', 'Traditional Goan Lunch'],
        stayLocation: 'South Goa (Cavelossim / Colva)'
      },
      {
        day: 4,
        title: 'Souvenir Shopping & Airport Departure',
        activities: ['Morning leisure swim at pristine Palolem or Colva beach', 'Pick up Goan feni, cashew nuts, and handicrafts in Panaji Latin Quarter (Fontainhas)', 'Private cab transfer to airport for return flight'],
        mealsIncluded: ['Breakfast'],
        stayLocation: 'Departure'
      }
    ]
  },
  {
    id: 'pkg-kerala-backwaters',
    title: 'God’s Own Country: Munnar Mist & Alleppey Houseboat',
    destination: 'Kerala',
    stateOrCountry: 'Kerala, India',
    category: 'Family Trips',
    durationDays: 5,
    durationNights: 4,
    rating: 4.9,
    reviewCount: 418,
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80',
    description: 'Breathe in lush tea gardens of Munnar, observe wild elephants in Periyar, and drift peacefully in a luxury houseboat on Vembanad Lake.',
    nearestAirportCode: 'COK',
    estimatedFlightCost: 6100,
    estimatedHotelCostPerNight: {
      budget: 2000,
      standard: 3800,
      premium: 7200,
      luxury: 16500
    },
    inclusions: [
      'Private AC vehicle for all 5 days with chauffeur',
      'Exclusive traditional Kettuvallam houseboat stay with all meals',
      'Tea museum and plantation guided tour',
      'Kathakali cultural dance show tickets'
    ],
    exclusions: ['Airfare', 'Ayurvedic wellness treatments (optional add-on)', 'Monument entrance fees'],
    highlightTags: ['Tea Gardens', 'Houseboat', 'Backwaters', 'Ayurveda'],
    lastUpdated: '18 Oct 2026',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kochi & Drive to Munnar',
        activities: ['Pickup from Cochin Airport', 'Scenic drive through Cheeyappara & Valara waterfalls', 'Check-in at Munnar resort overlooking rolling hills'],
        mealsIncluded: ['Dinner'],
        stayLocation: 'Munnar'
      },
      {
        day: 2,
        title: 'Munnar Tea Estate Exploration',
        activities: ['Visit Eravikulam National Park (Nilgiri Tahr habitat)', 'Tata Tea Museum & tea tasting workshop', 'Mattupetty Dam boat ride and Echo Point'],
        mealsIncluded: ['Breakfast', 'Dinner'],
        stayLocation: 'Munnar'
      },
      {
        day: 3,
        title: 'Spice Sanctuaries of Thekkady',
        activities: ['Drive through scenic cardamom hills to Thekkady', 'Guided spice plantation tour with aroma sampling', 'Evening traditional martial arts (Kalaripayattu) presentation'],
        mealsIncluded: ['Breakfast', 'Dinner'],
        stayLocation: 'Thekkady'
      },
      {
        day: 4,
        title: 'Alleppey Backwaters Houseboat Cruise',
        activities: ['Board your private houseboat in Alleppey by 12:00 noon', 'Cruise through tranquil canals, paddy fields, and coir villages', 'Overnight stay on the water with authentic Kerala fish curry dinner'],
        mealsIncluded: ['Breakfast', 'Traditional Lunch', 'Dinner'],
        stayLocation: 'Alleppey Deluxe Houseboat'
      },
      {
        day: 5,
        title: 'Fort Kochi Heritage & Departure',
        activities: ['Morning cruise breakfast', 'Disembark and visit Fort Kochi Chinese Fishing Nets & Jew Town', 'Drop-off at Cochin Airport for flight back home'],
        mealsIncluded: ['Breakfast'],
        stayLocation: 'Departure'
      }
    ]
  },
  {
    id: 'pkg-jaipur-royalty',
    title: 'Royal Rajputana: Jaipur, Amber Fort & Palaces',
    destination: 'Jaipur',
    stateOrCountry: 'Rajasthan, India',
    category: 'Weekend Getaways',
    durationDays: 3,
    durationNights: 2,
    rating: 4.7,
    reviewCount: 280,
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80',
    description: 'Immerse yourself in regal grandeur, majestic sandstone fortresses, vibrant Johri Bazaar gems, and authentic Rajasthani Thali banquets.',
    nearestAirportCode: 'JAI',
    estimatedFlightCost: 3200,
    estimatedHotelCostPerNight: {
      budget: 1500,
      standard: 2900,
      premium: 6200,
      luxury: 18000
    },
    inclusions: [
      'Jaipur airport pickup and drop',
      'Heritage haveli hotel stay with welcome drink',
      'Amber Fort elephant/jeep transfer',
      'Royal Chokhi Dhani village experience with cultural folk show and buffet'
    ],
    exclusions: ['Flight ticket', 'Camera entry fees', 'Personal souvenirs'],
    highlightTags: ['Forts', 'Heritage', 'Palaces', 'Rajasthani Food'],
    lastUpdated: '18 Oct 2026',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Pink City & City Palace',
        activities: ['Arrive at Jaipur Airport and transfer to hotel', 'Visit the opulent City Palace and Jantar Mantar observatory', 'Evening photo-op at illuminated Hawa Mahal'],
        mealsIncluded: ['Dinner'],
        stayLocation: 'Jaipur Heritage Hotel'
      },
      {
        day: 2,
        title: 'Mighty Forts & Chokhi Dhani Gala',
        activities: ['Morning tour of hilltop Amber Fort with Sheesh Mahal', 'Jaigarh Fort (world’s largest wheeled cannon)', 'Evening excursion to Chokhi Dhani ethnic resort for folk dance and dinner'],
        mealsIncluded: ['Breakfast', 'Royal Dinner at Chokhi Dhani'],
        stayLocation: 'Jaipur'
      },
      {
        day: 3,
        title: 'Bapu Bazaar & Return Flight',
        activities: ['Shop for handcrafted quilts, blue pottery, and textiles in Bapu Bazaar', 'Lunch at iconic Lassiwala on MI Road', 'Transfer to Jaipur Airport'],
        mealsIncluded: ['Breakfast'],
        stayLocation: 'Departure'
      }
    ]
  },
  {
    id: 'pkg-manali-snow',
    title: 'Himachal Highlands: Manali, Solang & Rohtang Pass',
    destination: 'Manali',
    stateOrCountry: 'Himachal Pradesh, India',
    category: 'Hill Stations',
    durationDays: 5,
    durationNights: 4,
    rating: 4.8,
    reviewCount: 310,
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format&fit=crop&q=80',
    description: 'Snow-capped Himalayan peaks, roaring Beas river rapids, pine forests, hot water springs, and thrilling adventure sports.',
    nearestAirportCode: 'IXC',
    estimatedFlightCost: 4500,
    estimatedHotelCostPerNight: {
      budget: 1600,
      standard: 2800,
      premium: 5800,
      luxury: 12500
    },
    inclusions: [
      'Chandigarh Airport transfer to Manali via scenic Volvo/Private Cab',
      'Solang Valley adventure permit and transfers',
      'Atal Tunnel excursion to Sissu (Lahaul Valley)',
      'Daily bonfire and buffet dinner'
    ],
    exclusions: ['Skiing and paragliding equipment rental', 'Rohtang Pass NGT green tax permit'],
    highlightTags: ['Snow', 'Himalayas', 'Adventure', 'Solang Valley'],
    lastUpdated: '18 Oct 2026',
    itinerary: [
      {
        day: 1,
        title: 'Chandigarh to Manali Drive',
        activities: ['Pickup at Chandigarh Airport / Railway Station', 'Drive along Pandoh Dam and Kullu Valley', 'Arrive in Manali, check into pine-wood mountain cottage'],
        mealsIncluded: ['Dinner'],
        stayLocation: 'Manali'
      },
      {
        day: 2,
        title: 'Solang Valley & Atal Tunnel to Sissu',
        activities: ['Visit Solang Valley for paragliding and zorbing', 'Drive through architectural marvel Atal Tunnel (9.02 km)', 'Explore snow peaks and waterfalls in Sissu, Lahaul'],
        mealsIncluded: ['Breakfast', 'Dinner'],
        stayLocation: 'Manali'
      },
      {
        day: 3,
        title: 'Manali Local Sightseeing',
        activities: ['Visit 450-year-old wooden Hadimba Devi Temple in cedar forest', 'Vashisht hot sulphur springs bath', 'Stroll through Old Manali cafes and German bakeries'],
        mealsIncluded: ['Breakfast', 'Dinner'],
        stayLocation: 'Manali'
      },
      {
        day: 4,
        title: 'Naggar Castle & River Rafting',
        activities: ['Tour historic wood-and-stone Naggar Castle and Nicholas Roerich Art Gallery', 'White-water rafting on Beas River in Kullu', 'Evening shopping at Mall Road for Kullu shawls'],
        mealsIncluded: ['Breakfast', 'Dinner'],
        stayLocation: 'Manali'
      },
      {
        day: 5,
        title: 'Departure via Chandigarh',
        activities: ['Morning mountain breakfast', 'Transfer back to Chandigarh Airport for evening flight'],
        mealsIncluded: ['Breakfast'],
        stayLocation: 'Departure'
      }
    ]
  },
  {
    id: 'pkg-ooty-nilgiri',
    title: 'Queen of Hill Stations: Ooty & Coonoor Toy Train',
    destination: 'Ooty',
    stateOrCountry: 'Tamil Nadu, India',
    category: 'Weekend Getaways',
    durationDays: 3,
    durationNights: 2,
    rating: 4.6,
    reviewCount: 195,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
    description: 'Crisp eucalyptus mountain air, UNESCO Heritage Nilgiri Mountain Toy Train, rose gardens, and tea tasting in Coonoor.',
    nearestAirportCode: 'BLR',
    estimatedFlightCost: 3800,
    estimatedHotelCostPerNight: {
      budget: 1700,
      standard: 3100,
      premium: 6400,
      luxury: 15000
    },
    inclusions: [
      'Airport transfer from Coimbatore / Bengaluru',
      'Nilgiri Mountain Railway (Toy Train) reserved tickets',
      'Botanical garden and Ooty lake boat ride tickets',
      'Homemade chocolate tasting box'
    ],
    exclusions: ['Airfare', 'Personal lunch/snacks'],
    highlightTags: ['Toy Train', 'Tea Estates', 'Lakes', 'Cool Weather'],
    lastUpdated: '18 Oct 2026',
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Ooty Lake Sunset',
        activities: ['Drive through Mudumalai / Bandipur tiger reserve forest', 'Check into colonial hillside resort in Ooty', 'Evening pedalo boat ride on Ooty Lake and chocolate shopping'],
        mealsIncluded: ['Dinner'],
        stayLocation: 'Ooty'
      },
      {
        day: 2,
        title: 'UNESCO Toy Train to Coonoor & Tea Factories',
        activities: ['Ride historic steam-engine Nilgiri Mountain Toy Train through 16 tunnels to Coonoor', 'Visit Sim’s Park and Dolphin’s Nose viewpoint', 'Tea processing tour at Highfield Tea Factory with fresh brew tasting'],
        mealsIncluded: ['Breakfast', 'Dinner'],
        stayLocation: 'Ooty'
      },
      {
        day: 3,
        title: 'Doddabetta Peak & Departure',
        activities: ['Panoramic view of Nilgiri range from Doddabetta Peak (2,637 m)', 'Walk through 20-acre Government Botanical Gardens', 'Transfer to airport for return flight'],
        mealsIncluded: ['Breakfast'],
        stayLocation: 'Departure'
      }
    ]
  },
  {
    id: 'pkg-dubai-international',
    title: 'Futuristic Wonder: Dubai Skyline & Desert Safari',
    destination: 'Dubai',
    stateOrCountry: 'United Arab Emirates',
    category: 'International Holidays',
    durationDays: 5,
    durationNights: 4,
    rating: 4.9,
    reviewCount: 520,
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80',
    description: 'Stand atop Burj Khalifa, experience thrilling 4x4 desert dune bashing with barbecue dinner, and explore Dubai Mall and Marina.',
    nearestAirportCode: 'BOM',
    estimatedFlightCost: 18500,
    estimatedHotelCostPerNight: {
      budget: 4500,
      standard: 8000,
      premium: 16000,
      luxury: 35000
    },
    inclusions: [
      'Dubai International Airport round-trip transfers',
      'Burj Khalifa 124th & 125th floor non-prime observation deck pass',
      'Desert Safari with 4x4 dune bashing, camel ride, BBQ buffet & belly dance',
      'Dubai Marina luxury Dhow cruise dinner',
      'Single entry UAE tourist visa assistance'
    ],
    exclusions: ['International flight tickets', 'Tourism Dirham city tax paid directly to hotel', 'Travel insurance'],
    highlightTags: ['Burj Khalifa', 'Desert Safari', 'Shopping', 'International'],
    lastUpdated: '18 Oct 2026',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai & Marina Dhow Cruise',
        activities: ['Touch down at DXB Airport, luxury airport transfer to hotel', 'Check-in and evening rest', 'Romantic Marina cruise with illuminated skyscraper views and international buffet'],
        mealsIncluded: ['Dinner'],
        stayLocation: 'Dubai Marina / Downtown'
      },
      {
        day: 2,
        title: 'Burj Khalifa & Dubai Mall Spectacular',
        activities: ['Ascend to 124th floor of Burj Khalifa for 360-degree skyline views', 'Explore giant Dubai Aquarium and underwater zoo', 'Witness the iconic evening Dubai Fountain dancing water show'],
        mealsIncluded: ['Breakfast'],
        stayLocation: 'Dubai'
      },
      {
        day: 3,
        title: 'Red Dunes 4x4 Safari & Bedouin Camp',
        activities: ['Afternoon pickup in Land Cruiser for Lahbab red dune bashing', 'Sandboarding on golden crests & camel riding', 'Barbecue banquet under starlit sky with Tanoura and fire dance'],
        mealsIncluded: ['Breakfast', 'BBQ Dinner'],
        stayLocation: 'Dubai'
      },
      {
        day: 4,
        title: 'Old Dubai Souks & Museum of the Future',
        activities: ['Visit architectural marvel Museum of the Future', 'Abra water taxi ride across Dubai Creek', 'Gold & Spice Souk traditional haggling experience in Deira'],
        mealsIncluded: ['Breakfast'],
        stayLocation: 'Dubai'
      },
      {
        day: 5,
        title: 'Last-minute Shopping & Departure',
        activities: ['Leisure morning for shopping at Mall of the Emirates', 'Checkout and private transfer to Dubai International Airport (DXB)'],
        mealsIncluded: ['Breakfast'],
        stayLocation: 'Departure'
      }
    ]
  }
];

export function calculatePackageCost(
  pkg: HolidayPackage,
  travelers: number = 2,
  tier: 'budget' | 'standard' | 'premium' | 'luxury' = 'standard',
  includeFlights: boolean = true,
  customFlightFare?: number
) {
  const flightFarePerPerson = customFlightFare !== undefined ? customFlightFare : pkg.estimatedFlightCost;
  const totalFlights = includeFlights ? flightFarePerPerson * travelers : 0;
  
  // Hotel rooms needed (1 room for 2 people)
  const roomsNeeded = Math.ceil(travelers / 2);
  const hotelPerNight = pkg.estimatedHotelCostPerNight[tier];
  const totalHotel = hotelPerNight * pkg.durationNights * roomsNeeded;

  // Food and activities calculation with deduction for meals already included in package
  const totalIncludedMealsCount = pkg.itinerary.reduce(
    (acc, day) => acc + (day.mealsIncluded ? day.mealsIncluded.length : 0),
    0
  );
  const mealInclusionCredit = totalIncludedMealsCount * 350 * travelers;
  const baseFoodAndActivities = 1200 * pkg.durationDays * travelers;
  // Prevent double-counting meals included with hotel/resort
  const totalFoodAndActivities = Math.max(
    300 * pkg.durationDays * travelers,
    baseFoodAndActivities - mealInclusionCredit
  );

  // Local transfers (shared AC vehicle)
  const localTransport = 1800 * pkg.durationDays;

  const totalEstimatedTripCost = totalFlights + totalHotel + totalFoodAndActivities + localTransport;
  const perPersonCost = Math.round(totalEstimatedTripCost / travelers);

  return {
    travelers,
    tier,
    flightFarePerPerson,
    totalFlights,
    hotelPerNight,
    roomsNeeded,
    totalHotel,
    totalFoodAndActivities,
    localTransport,
    totalEstimatedTripCost,
    perPersonCost
  };
}
