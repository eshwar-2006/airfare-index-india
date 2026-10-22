export interface Airport {
  code: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  terminals: string[];
  isMetro: boolean;
}

export const AIRPORTS: Airport[] = [
  {
    code: 'DEL',
    name: 'Indira Gandhi International Airport',
    city: 'Delhi',
    state: 'Delhi NCR',
    lat: 28.5562,
    lng: 77.1000,
    terminals: ['T1 (Low-Cost Domestic)', 'T2 (Domestic)', 'T3 (International & Domestic)'],
    isMetro: true,
  },
  {
    code: 'BOM',
    name: 'Chhatrapati Shivaji Maharaj International Airport',
    city: 'Mumbai',
    state: 'Maharashtra',
    lat: 19.0896,
    lng: 72.8656,
    terminals: ['T1 (Domestic)', 'T2 (International & Domestic)'],
    isMetro: true,
  },
  {
    code: 'BLR',
    name: 'Kempegowda International Airport',
    city: 'Bengaluru',
    state: 'Karnataka',
    lat: 13.1986,
    lng: 77.7066,
    terminals: ['T1 (Domestic)', 'T2 (Garden Terminal - Intl & Domestic)'],
    isMetro: true,
  },
  {
    code: 'HYD',
    name: 'Rajiv Gandhi International Airport',
    city: 'Hyderabad',
    state: 'Telangana',
    lat: 17.2403,
    lng: 78.4294,
    terminals: ['Main Terminal (Domestic & International)'],
    isMetro: true,
  },
  {
    code: 'MAA',
    name: 'Chennai International Airport',
    city: 'Chennai',
    state: 'Tamil Nadu',
    lat: 12.9941,
    lng: 80.1709,
    terminals: ['T1 (Kamaraj Domestic)', 'T2 (Anna International)', 'T4 (Domestic)'],
    isMetro: true,
  },
  {
    code: 'CCU',
    name: 'Netaji Subhash Chandra Bose International Airport',
    city: 'Kolkata',
    state: 'West Bengal',
    lat: 22.6547,
    lng: 88.4467,
    terminals: ['Integrated Terminal (Domestic & International)'],
    isMetro: true,
  },
  {
    code: 'GOI',
    name: 'Dabolim Airport',
    city: 'Goa (South)',
    state: 'Goa',
    lat: 15.3800,
    lng: 73.8314,
    terminals: ['Integrated Terminal'],
    isMetro: false,
  },
  {
    code: 'GOX',
    name: 'Manohar International Airport (Mopa)',
    city: 'Goa (North)',
    state: 'Goa',
    lat: 15.7667,
    lng: 73.8667,
    terminals: ['Passenger Terminal'],
    isMetro: false,
  },
  {
    code: 'JAI',
    name: 'Jaipur International Airport',
    city: 'Jaipur',
    state: 'Rajasthan',
    lat: 26.8242,
    lng: 75.8122,
    terminals: ['Terminal 1', 'Terminal 2'],
    isMetro: false,
  },
  {
    code: 'COK',
    name: 'Cochin International Airport',
    city: 'Kochi',
    state: 'Kerala',
    lat: 10.1556,
    lng: 76.3908,
    terminals: ['T1 (Domestic)', 'T3 (International)'],
    isMetro: false,
  },
  {
    code: 'AMD',
    name: 'Sardar Vallabhbhai Patel International Airport',
    city: 'Ahmedabad',
    state: 'Gujarat',
    lat: 23.0734,
    lng: 72.6266,
    terminals: ['T1 (Domestic)', 'T2 (International)'],
    isMetro: false,
  },
  {
    code: 'PNQ',
    name: 'Pune International Airport',
    city: 'Pune',
    state: 'Maharashtra',
    lat: 18.5822,
    lng: 73.9197,
    terminals: ['New Integrated Terminal'],
    isMetro: false,
  },
  {
    code: 'IXC',
    name: 'Shaheed Bhagat Singh International Airport',
    city: 'Chandigarh',
    state: 'Punjab / Haryana',
    lat: 30.6735,
    lng: 76.7885,
    terminals: ['Integrated Terminal'],
    isMetro: false,
  },
  {
    code: 'SXR',
    name: 'Sheikh ul-Alam International Airport',
    city: 'Srinagar',
    state: 'Jammu and Kashmir',
    lat: 33.9871,
    lng: 74.7741,
    terminals: ['Main Terminal'],
    isMetro: false,
  },
  {
    code: 'GAU',
    name: 'Lokpriya Gopinath Bordoloi International Airport',
    city: 'Guwahati',
    state: 'Assam',
    lat: 26.1061,
    lng: 91.5859,
    terminals: ['Passenger Terminal'],
    isMetro: false,
  }
];

export function getAirport(code: string): Airport | undefined {
  return AIRPORTS.find(a => a.code.toUpperCase() === code.toUpperCase());
}
