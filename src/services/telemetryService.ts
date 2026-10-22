import { MetricCardData, TrendDataPoint, PopularRoute, AirlineFareLeader } from '../data/historicalData';

export interface LiveTelemetryTick {
  id: string | number;
  route: string;
  airline: string;
  price: number;
  change: number;
  time: string;
}

export interface LiveTelemetryPayload {
  success: boolean;
  timestamp: string;
  formattedTime: string;
  lastSyncTime: string;
  nextScheduledRun: string;
  recordsToday: number;
  dataSource: string;
  isLiveDataActive: boolean;
  metrics: MetricCardData[];
  trendData7D: TrendDataPoint[];
  trendData30D: TrendDataPoint[];
  airlineFareLeaders: AirlineFareLeader[];
  popularRoutes: PopularRoute[];
  recentTicks: LiveTelemetryTick[];
  currentIndex: number;
}

export class TelemetryService {
  private static instance: TelemetryService;

  public static getInstance(): TelemetryService {
    if (!TelemetryService.instance) {
      TelemetryService.instance = new TelemetryService();
    }
    return TelemetryService.instance;
  }

  /**
   * Fetch latest live airfare telemetry from the server
   */
  async fetchLiveTelemetry(signal?: AbortSignal): Promise<LiveTelemetryPayload> {
    const response = await fetch('/api/telemetry/live', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
      signal
    });

    if (!response.ok) {
      throw new Error(`Telemetry server responded with status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Server indicated unsuccessful telemetry response');
    }

    return data as LiveTelemetryPayload;
  }

  /**
   * Force an immediate observation sweep on the backend
   */
  async triggerImmediateRefresh(): Promise<LiveTelemetryPayload> {
    const response = await fetch('/api/telemetry/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Manual refresh failed with status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Manual telemetry sweep failed');
    }

    return data as LiveTelemetryPayload;
  }
}

export const telemetryService = TelemetryService.getInstance();
