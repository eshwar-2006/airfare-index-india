import { useState, useEffect, useRef, useCallback } from 'react';
import {
  telemetryService,
  LiveTelemetryPayload
} from '../services/telemetryService';
import {
  MAIN_DASHBOARD_METRICS,
  TREND_DATA_7D,
  TREND_DATA_30D,
  POPULAR_ROUTES,
  AIRLINE_FARE_LEADERS
} from '../data/historicalData';

export interface UseLiveTelemetryResult {
  telemetry: LiveTelemetryPayload;
  isInitialLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  lastUpdated: string;
  isStale: boolean;
  manualRefresh: () => Promise<void>;
  secondsUntilNextRefresh: number;
}

const DEFAULT_INITIAL_STATE: LiveTelemetryPayload = {
  success: true,
  timestamp: new Date().toISOString(),
  formattedTime: '10:31 am',
  lastSyncTime: '10:31:02 AM',
  nextScheduledRun: '10:31:32 AM',
  recordsToday: 300,
  dataSource: 'Calibrated Indian Aviation Index & DGCA Route Radar',
  isLiveDataActive: true,
  metrics: MAIN_DASHBOARD_METRICS,
  trendData7D: TREND_DATA_7D,
  trendData30D: TREND_DATA_30D,
  airlineFareLeaders: AIRLINE_FARE_LEADERS,
  popularRoutes: POPULAR_ROUTES,
  recentTicks: [
    { id: 1, route: 'DEL → BOM', airline: 'IndiGo 6E-2045', price: 3840, change: -120, time: '10:31:04 AM' },
    { id: 2, route: 'BOM → BLR', airline: 'Air India AI-671', price: 4210, change: 80, time: '10:30:58 AM' },
    { id: 3, route: 'DEL → CCU', airline: 'Akasa Air QP-1382', price: 4690, change: -210, time: '10:30:42 AM' },
    { id: 4, route: 'BLR → HYD', airline: 'SpiceJet SG-102', price: 2890, change: 0, time: '10:30:15 AM' },
    { id: 5, route: 'DEL → GOI', airline: 'Air India Express IX-142', price: 5120, change: -350, time: '10:29:50 AM' }
  ],
  currentIndex: 96.62
};

const REFRESH_INTERVAL_MS = 30000; // 30 seconds

export function useLiveTelemetry(): UseLiveTelemetryResult {
  const [telemetry, setTelemetry] = useState<LiveTelemetryPayload>(DEFAULT_INITIAL_STATE);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('10:31 am');
  const [secondsUntilNextRefresh, setSecondsUntilNextRefresh] = useState<number>(30);

  // References to prevent overlapping requests and manage abort controllers
  const isFetchingRef = useRef<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Fetch latest data from backend API with overlap prevention.
   * STRICT GUARANTEE: Timestamp updates ONLY if fetch succeeds with valid payload.
   */
  const performFetch = useCallback(async (isManual: boolean = false) => {
    // Prevent overlapping requests if a fetch is already in flight
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;
    if (isManual) {
      setIsRefreshing(true);
    }

    // Cancel any previous pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      let data: LiveTelemetryPayload;
      if (isManual) {
        data = await telemetryService.triggerImmediateRefresh();
      } else {
        data = await telemetryService.fetchLiveTelemetry(controller.signal);
      }

      // CRITICAL: Only update state & timestamp upon receiving valid, successful data
      if (data && data.success && Array.isArray(data.metrics) && data.metrics.length > 0) {
        setTelemetry(data);
        setLastUpdated(data.formattedTime);
        setError(null);
        setSecondsUntilNextRefresh(30);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Request was aborted (component unmounted or new request started); ignore
        return;
      }
      console.warn('[Airfare Telemetry] Live update failed, preserving last known good data:', err.message);
      // NOTE: Timestamp is intentionally NOT updated on failure
      setError(err.message || 'Unable to reach real-time telemetry feed');
    } finally {
      isFetchingRef.current = false;
      setIsInitialLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Manual refresh trigger invoked by user action
  const manualRefresh = useCallback(async () => {
    await performFetch(true);
  }, [performFetch]);

  // Main polling effect: runs on mount and every 30 seconds
  useEffect(() => {
    // Immediate initial fetch on mount
    performFetch(false);

    // Setup 30-second interval timer
    timerRef.current = setInterval(() => {
      performFetch(false);
    }, REFRESH_INTERVAL_MS);

    // Setup 1-second countdown ticker for UX display
    countdownTimerRef.current = setInterval(() => {
      setSecondsUntilNextRefresh(prev => (prev <= 1 ? 30 : prev - 1));
    }, 1000);

    // Clean up timers and abort pending requests when component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [performFetch]);

  return {
    telemetry,
    isInitialLoading,
    isRefreshing,
    error,
    lastUpdated,
    isStale: error !== null,
    manualRefresh,
    secondsUntilNextRefresh
  };
}
