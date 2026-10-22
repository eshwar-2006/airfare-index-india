export interface Airline {
  id: string;
  name: string;
  iataCode: string;
  icaoCode: string;
  country: string;
  category: 'Domestic' | 'International';
  status: 'Active' | 'Under Restructuring';
  logoColor: string;
  logoBg: string;
  shortName: string;
  hubs: string[];
  destinationsCount: number;
  averageFare: number;
  changeRate: number; // e.g. +3.2%
  lowestFare: number;
  onTimePerformance: number; // e.g. 88.5%
  fleetSize: number;
  baggagePolicy: {
    cabin: string;
    checkIn: string;
  };
  officialWebsite: string;
  bookingUrl: string;
  customerCare: string;
  description: string;
}

export const AIRLINES: Airline[] = [
  {
    id: 'indigo',
    name: 'IndiGo (InterGlobe Aviation)',
    iataCode: '6E',
    icaoCode: 'IGO',
    country: 'India',
    category: 'Domestic',
    status: 'Active',
    logoColor: '#ffffff',
    logoBg: '#001b94',
    shortName: 'IndiGo',
    hubs: ['Delhi (DEL)', 'Mumbai (BOM)', 'Bengaluru (BLR)', 'Hyderabad (HYD)'],
    destinationsCount: 110,
    averageFare: 4820,
    changeRate: 3.2,
    lowestFare: 2450,
    onTimePerformance: 88.4,
    fleetSize: 370,
    baggagePolicy: {
      cabin: '7 kg (1 personal item + 1 bag)',
      checkIn: '15 kg per passenger'
    },
    officialWebsite: 'https://www.goindigo.in',
    bookingUrl: 'https://www.goindigo.in/flight-booking.html',
    customerCare: '+91 124 6173838',
    description: "India's largest passenger airline by fleet size and market share, operating over 2,000 daily flights across domestic and international routes."
  },
  {
    id: 'air-india',
    name: 'Air India',
    iataCode: 'AI',
    icaoCode: 'AIC',
    country: 'India',
    category: 'Domestic',
    status: 'Active',
    logoColor: '#ffffff',
    logoBg: '#d91b24',
    shortName: 'Air India',
    hubs: ['Delhi (DEL)', 'Mumbai (BOM)'],
    destinationsCount: 84,
    averageFare: 6150,
    changeRate: -1.4,
    lowestFare: 3200,
    onTimePerformance: 82.1,
    fleetSize: 140,
    baggagePolicy: {
      cabin: '7 kg (Economy) / 10 kg (Business)',
      checkIn: '15 kg (Domestic Economy) / 25 kg (Premium)'
    },
    officialWebsite: 'https://www.airindia.com',
    bookingUrl: 'https://www.airindia.com/in/en/book-flights.html',
    customerCare: '+91 11 6932 9333',
    description: 'The flag carrier airline of India under the Tata Group, offering full-service domestic and long-haul international flights with complimentary meals.'
  },
  {
    id: 'akasa-air',
    name: 'Akasa Air (SNV Aviation)',
    iataCode: 'QP',
    icaoCode: 'AKJ',
    country: 'India',
    category: 'Domestic',
    status: 'Active',
    logoColor: '#ffffff',
    logoBg: '#ff6200',
    shortName: 'Akasa Air',
    hubs: ['Mumbai (BOM)', 'Bengaluru (BLR)', 'Delhi (DEL)'],
    destinationsCount: 26,
    averageFare: 4650,
    changeRate: 2.1,
    lowestFare: 2390,
    onTimePerformance: 86.9,
    fleetSize: 26,
    baggagePolicy: {
      cabin: '7 kg (hand luggage)',
      checkIn: '15 kg per standard ticket'
    },
    officialWebsite: 'https://www.akasaair.com',
    bookingUrl: 'https://www.akasaair.com/fly/book-flights',
    customerCare: '+91 9606 112131',
    description: "India's newest greenest and tech-enabled low-cost carrier, operating a modern Boeing 737 MAX fleet across key Indian hubs."
  },
  {
    id: 'spicejet',
    name: 'SpiceJet',
    iataCode: 'SG',
    icaoCode: 'SEJ',
    country: 'India',
    category: 'Domestic',
    status: 'Active',
    logoColor: '#ffffff',
    logoBg: '#e6241a',
    shortName: 'SpiceJet',
    hubs: ['Delhi (DEL)', 'Hyderabad (HYD)'],
    destinationsCount: 48,
    averageFare: 4320,
    changeRate: -4.5,
    lowestFare: 2210,
    onTimePerformance: 74.2,
    fleetSize: 38,
    baggagePolicy: {
      cabin: '7 kg (hand baggage)',
      checkIn: '15 kg per person'
    },
    officialWebsite: 'https://www.spicejet.com',
    bookingUrl: 'https://www.spicejet.com',
    customerCare: '+91 124 4983410',
    description: 'Prominent Indian budget carrier connecting major commercial centres with regional UDAN destinations.'
  },
  {
    id: 'air-india-express',
    name: 'Air India Express',
    iataCode: 'IX',
    icaoCode: 'AXB',
    country: 'India',
    category: 'Domestic',
    status: 'Active',
    logoColor: '#ffffff',
    logoBg: '#f36f21',
    shortName: 'AI Express',
    hubs: ['Kochi (COK)', 'Kozhikode (CCJ)', 'Delhi (DEL)', 'Bengaluru (BLR)'],
    destinationsCount: 52,
    averageFare: 4410,
    changeRate: 1.8,
    lowestFare: 2516,
    onTimePerformance: 84.6,
    fleetSize: 85,
    baggagePolicy: {
      cabin: '7 kg cabin baggage',
      checkIn: '15 kg domestic / 20-30 kg international'
    },
    officialWebsite: 'https://www.airindiaexpress.com',
    bookingUrl: 'https://www.airindiaexpress.com/home',
    customerCare: '+91 124 4872288',
    description: "Subsidiary of Air India under Tata Group providing low-cost domestic connectivity and high-frequency Middle East/Gulf routes."
  },
  {
    id: 'alliance-air',
    name: 'Alliance Air',
    iataCode: '9I',
    icaoCode: 'LLR',
    country: 'India',
    category: 'Domestic',
    status: 'Active',
    logoColor: '#ffffff',
    logoBg: '#0284c7',
    shortName: 'Alliance Air',
    hubs: ['Delhi (DEL)', 'Kolkata (CCU)', 'Hyderabad (HYD)', 'Bengaluru (BLR)'],
    destinationsCount: 75,
    averageFare: 3850,
    changeRate: 0.8,
    lowestFare: 1890,
    onTimePerformance: 79.5,
    fleetSize: 21,
    baggagePolicy: {
      cabin: '5 kg on ATR aircraft',
      checkIn: '15 kg standard'
    },
    officialWebsite: 'https://allianceair.in',
    bookingUrl: 'https://allianceair.in',
    customerCare: '+91 11 2567 5121',
    description: 'Government of India regional airline operating turboprop ATR-72 aircraft connecting tier-2, tier-3, and remote Himalayan and Northeast airports.'
  },
  {
    id: 'star-air',
    name: 'Star Air (Ghodawat Enterprises)',
    iataCode: 'S5',
    icaoCode: 'SDG',
    country: 'India',
    category: 'Domestic',
    status: 'Active',
    logoColor: '#ffffff',
    logoBg: '#1e3a8a',
    shortName: 'Star Air',
    hubs: ['Bengaluru (BLR)', 'Belagavi (IXG)'],
    destinationsCount: 22,
    averageFare: 4100,
    changeRate: 1.1,
    lowestFare: 2650,
    onTimePerformance: 85.0,
    fleetSize: 9,
    baggagePolicy: {
      cabin: '7 kg',
      checkIn: '15 kg'
    },
    officialWebsite: 'https://www.starair.in',
    bookingUrl: 'https://www.starair.in',
    customerCare: '+91 99705 55111',
    description: 'Regional airline operating Embraer jetliners connecting business hubs with non-metro destinations under UDAN.'
  },
  {
    id: 'fly91',
    name: 'Fly91 (Just Udo Aviation)',
    iataCode: 'IC',
    icaoCode: 'GOA',
    country: 'India',
    category: 'Domestic',
    status: 'Active',
    logoColor: '#ffffff',
    logoBg: '#059669',
    shortName: 'Fly91',
    hubs: ['Goa Mopa (GOX)', 'Hyderabad (HYD)'],
    destinationsCount: 10,
    averageFare: 3499,
    changeRate: -2.0,
    lowestFare: 1999,
    onTimePerformance: 87.2,
    fleetSize: 4,
    baggagePolicy: {
      cabin: '7 kg',
      checkIn: '15 kg'
    },
    officialWebsite: 'https://www.fly91.in',
    bookingUrl: 'https://www.fly91.in',
    customerCare: '+91 832 690 9191',
    description: 'Pure regional carrier based out of Goa Mopa airport connecting regional India with seamless short-haul flights.'
  },
  {
    id: 'emirates',
    name: 'Emirates',
    iataCode: 'EK',
    icaoCode: 'UAE',
    country: 'United Arab Emirates',
    category: 'International',
    status: 'Active',
    logoColor: '#ffffff',
    logoBg: '#d71920',
    shortName: 'Emirates',
    hubs: ['Dubai (DXB)'],
    destinationsCount: 150,
    averageFare: 24500,
    changeRate: 1.5,
    lowestFare: 17800,
    onTimePerformance: 91.2,
    fleetSize: 260,
    baggagePolicy: {
      cabin: '7 kg Economy / 14 kg Business',
      checkIn: '25-35 kg standard'
    },
    officialWebsite: 'https://www.emirates.com/in/english/',
    bookingUrl: 'https://www.emirates.com/in/english/book/',
    customerCare: '+91 91670 03333',
    description: 'Premier international airline operating wide-body aircraft connecting major Indian metros to Dubai and global destinations.'
  },
  {
    id: 'singapore-airlines',
    name: 'Singapore Airlines',
    iataCode: 'SQ',
    icaoCode: 'SIA',
    country: 'Singapore',
    category: 'International',
    status: 'Active',
    logoColor: '#ffffff',
    logoBg: '#00256c',
    shortName: 'Singapore Air',
    hubs: ['Singapore Changi (SIN)'],
    destinationsCount: 130,
    averageFare: 28900,
    changeRate: -0.6,
    lowestFare: 19500,
    onTimePerformance: 93.4,
    fleetSize: 155,
    baggagePolicy: {
      cabin: '7 kg Economy / 14 kg Suites',
      checkIn: '30 kg Economy'
    },
    officialWebsite: 'https://www.singaporeair.com',
    bookingUrl: 'https://www.singaporeair.com/en_UK/in/home',
    customerCare: '+91 22 5064 1111',
    description: 'World-renowned 5-star airline connecting Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and Kochi to East Asia, Australasia, and the Americas.'
  }
];

export function getAirline(idOrCode: string): Airline | undefined {
  return AIRLINES.find(
    a => a.id === idOrCode || a.iataCode.toUpperCase() === idOrCode.toUpperCase()
  );
}

export function buildOfficialBookingUrl(airline: Airline, fromCode?: string, toCode?: string, date?: string): string {
  // Generates verified official URL preserving route and travel date where supported:
  if (airline.id === 'indigo' && fromCode && toCode) {
    return `https://www.goindigo.in/booking/flight-select.html?origin=${fromCode}&destination=${toCode}${date ? `&date=${date}` : ''}`;
  }
  if (airline.id === 'air-india' && fromCode && toCode) {
    return `https://www.airindia.com/in/en/book-flights.html?origin=${fromCode}&destination=${toCode}${date ? `&departureDate=${date}` : ''}`;
  }
  if (airline.id === 'akasa-air' && fromCode && toCode) {
    return `https://www.akasaair.com/fly/book-flights?from=${fromCode}&to=${toCode}${date ? `&departDate=${date}` : ''}`;
  }
  if (airline.id === 'spicejet' && fromCode && toCode) {
    return `https://www.spicejet.com?origin=${fromCode}&dest=${toCode}${date ? `&date=${date}` : ''}`;
  }
  if (airline.id === 'air-india-express' && fromCode && toCode) {
    return `https://www.airindiaexpress.com/home?origin=${fromCode}&destination=${toCode}${date ? `&departureDate=${date}` : ''}`;
  }
  if (airline.id === 'alliance-air' && fromCode && toCode) {
    return `https://allianceair.in?from=${fromCode}&to=${toCode}`;
  }
  if (airline.id === 'star-air' && fromCode && toCode) {
    return `https://www.starair.in?from=${fromCode}&to=${toCode}`;
  }
  if (airline.id === 'fly91' && fromCode && toCode) {
    return `https://www.fly91.in?from=${fromCode}&to=${toCode}`;
  }
  if (airline.id === 'emirates' && fromCode && toCode) {
    return `https://www.emirates.com/in/english/book/?origin=${fromCode}&destination=${toCode}`;
  }
  if (airline.id === 'singapore-airlines' && fromCode && toCode) {
    return `https://www.singaporeair.com/en_UK/in/home?origin=${fromCode}&dest=${toCode}`;
  }
  return airline.bookingUrl || airline.officialWebsite;
}
