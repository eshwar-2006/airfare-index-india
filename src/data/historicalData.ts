export interface MetricCardData {
  id: string;
  label: string;
  value: string;
  subValue?: string;
  change: string;
  isPositive: boolean;
  timestamp: string;
  iconType: 'gauge' | 'rupee' | 'lowest' | 'highest' | 'plane' | 'database';
  colorTheme: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'cyan';
}

export const MAIN_DASHBOARD_METRICS: MetricCardData[] = [
  {
    id: 'airfare-index',
    label: 'Airfare Index',
    value: '96.62',
    change: '↘ 0.5% vs previous 7 days',
    isPositive: false,
    timestamp: 'Updated: 10:31 am',
    iconType: 'gauge',
    colorTheme: 'blue'
  },
  {
    id: 'average-fare',
    label: 'Average Fare',
    value: '₹ 5,092',
    change: '↘ 1.2% vs previous 7 days',
    isPositive: false,
    timestamp: 'Updated: 10:31 am',
    iconType: 'rupee',
    colorTheme: 'purple'
  },
  {
    id: 'lowest-fare',
    label: 'Lowest Fare',
    value: '₹ 2,516',
    change: '↗ 20.3% vs previous 7 days',
    isPositive: true,
    timestamp: 'Updated: 10:31 am',
    iconType: 'lowest',
    colorTheme: 'green'
  },
  {
    id: 'highest-fare',
    label: 'Highest Fare',
    value: '₹ 11,652',
    change: '↘ 9.9% vs previous 7 days',
    isPositive: false,
    timestamp: 'Updated: 10:31 am',
    iconType: 'highest',
    colorTheme: 'red'
  },
  {
    id: 'flights-tracked',
    label: 'Flights Tracked',
    value: '173',
    subValue: '4,892 total',
    change: '↘ 50.1% vs previous 7 days',
    isPositive: false,
    timestamp: 'Updated: 10:31 am',
    iconType: 'plane',
    colorTheme: 'orange'
  },
  {
    id: 'data-points',
    label: 'Data Points',
    value: '858',
    subValue: '248,566 total',
    change: '↘ 48.7% vs previous 7 days',
    isPositive: false,
    timestamp: 'Updated: 10:31 am',
    iconType: 'database',
    colorTheme: 'cyan'
  }
];

export interface TrendDataPoint {
  date: string;
  index: number;
  avgFare: number;
  lowFare: number;
}

export const TREND_DATA_7D: TrendDataPoint[] = [
  { date: '13 Oct', index: 98.2, avgFare: 5210, lowFare: 2650 },
  { date: '14 Oct', index: 97.8, avgFare: 5180, lowFare: 2600 },
  { date: '15 Oct', index: 98.4, avgFare: 5250, lowFare: 2700 },
  { date: '16 Oct', index: 97.1, avgFare: 5120, lowFare: 2580 },
  { date: '17 Oct', index: 96.9, avgFare: 5100, lowFare: 2540 },
  { date: '18 Oct', index: 97.4, avgFare: 5140, lowFare: 2550 },
  { date: '19 Oct', index: 96.62, avgFare: 5092, lowFare: 2516 }
];

export const TREND_DATA_30D: TrendDataPoint[] = [
  { date: '21 Sep', index: 104.5, avgFare: 5600, lowFare: 2800 },
  { date: '25 Sep', index: 102.8, avgFare: 5450, lowFare: 2750 },
  { date: '29 Sep', index: 100.2, avgFare: 5320, lowFare: 2680 },
  { date: '03 Oct', index: 99.4, avgFare: 5280, lowFare: 2650 },
  { date: '07 Oct', index: 98.1, avgFare: 5200, lowFare: 2600 },
  { date: '11 Oct', index: 98.5, avgFare: 5230, lowFare: 2620 },
  { date: '15 Oct', index: 97.9, avgFare: 5170, lowFare: 2590 },
  { date: '19 Oct', index: 96.62, avgFare: 5092, lowFare: 2516 }
];

export interface PopularRoute {
  route: string;
  from: string;
  to: string;
  fare: string;
  change: string;
  isUp: boolean;
}

export const POPULAR_ROUTES: PopularRoute[] = [
  { route: 'DEL → BOM', from: 'DEL', to: 'BOM', fare: '₹ 4,250', change: '+2.4%', isUp: true },
  { route: 'BLR → DEL', from: 'BLR', to: 'DEL', fare: '₹ 5,120', change: '-1.8%', isUp: false },
  { route: 'HYD → BOM', from: 'HYD', to: 'BOM', fare: '₹ 3,680', change: '+0.5%', isUp: true },
  { route: 'DEL → GOI', from: 'DEL', to: 'GOI', fare: '₹ 5,400', change: '+3.8%', isUp: true },
  { route: 'MAA → CCU', from: 'MAA', to: 'CCU', fare: '₹ 4,910', change: '-3.1%', isUp: false },
  { route: 'BLR → HYD', from: 'BLR', to: 'HYD', fare: '₹ 2,750', change: '-0.9%', isUp: false }
];

export interface AirlineFareLeader {
  id: string;
  name: string;
  iata: string;
  avgFare: number;
  change: string;
  isUp: boolean;
  color: string;
}

export const AIRLINE_FARE_LEADERS: AirlineFareLeader[] = [
  { id: 'indigo', name: 'IndiGo', iata: '6E', avgFare: 4820, change: '+3.2%', isUp: true, color: '#001b94' },
  { id: 'air-india', name: 'Air India', iata: 'AI', avgFare: 6150, change: '-1.4%', isUp: false, color: '#d91b24' },
  { id: 'akasa-air', name: 'Akasa Air', iata: 'QP', avgFare: 4650, change: '+2.1%', isUp: true, color: '#ff6200' },
  { id: 'spicejet', name: 'SpiceJet', iata: 'SG', avgFare: 4320, change: '-4.5%', isUp: false, color: '#e6241a' },
  { id: 'air-india-express', name: 'AI Express', iata: 'IX', avgFare: 4410, change: '+1.8%', isUp: true, color: '#f36f21' }
];

export const RECENT_INSIGHTS = [
  {
    title: 'Mid-week fares soften on Delhi-Mumbai',
    description: 'Average ticket prices on DEL-BOM dropped by 12% for Tuesday and Wednesday departures.',
    time: '45 mins ago',
    tag: 'Fare Drop'
  },
  {
    title: 'Early morning capacity added on BLR-DEL',
    description: 'IndiGo and Akasa Air launched 2 additional morning departures reducing early slot premiums.',
    time: '2 hours ago',
    tag: 'Capacity'
  },
  {
    title: 'Diwali festive surge moderating',
    description: 'Advance booking index shows stabilized fares on major holiday corridors including Goa and Kerala.',
    time: '5 hours ago',
    tag: 'Seasonal'
  }
];

export const ADMIN_STATS = {
  systemHealth: {
    api: { status: 'Healthy', uptime: '99.98%' },
    scrapers: { status: 'Active', rate: '42 req/min' },
    cache: { status: 'Optimal', hitRate: '94.2%' },
    database: { status: 'Healthy', latency: '12ms' }
  },
  keyMetrics: {
    scrapesToday: 1245,
    activeRoutes: 4196,
    alertsSent: 12184,
    totalDataPoints: 248566
  },
  recentJobs: [
    { id: 'JOB-9024', route: 'DEL-BOM (All carriers)', records: 84, duration: '1.4s', status: 'Success', time: '10:31:02 AM' },
    { id: 'JOB-9023', route: 'BLR-DEL (Metro)', records: 76, duration: '1.8s', status: 'Success', time: '10:28:15 AM' },
    { id: 'JOB-9022', route: 'BOM-GOI (Leisure)', records: 52, duration: '1.1s', status: 'Success', time: '10:25:40 AM' },
    { id: 'JOB-9021', route: 'HYD-MAA (Regional)', records: 39, duration: '0.9s', status: 'Success', time: '10:20:05 AM' }
  ]
};
