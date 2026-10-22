import React, { useState, useEffect } from 'react';
import {
  Activity,
  Radio,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Download,
  ShieldCheck,
  Zap,
  Sliders,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { BackToDashboard } from './BackToDashboard';
import { MetricCards } from './MetricCards';
import { TREND_DATA_7D, TREND_DATA_30D } from '../data/historicalData';
import { LiveTelemetryPayload } from '../services/telemetryService';

interface LiveIndexViewProps {
  onBackToDashboard: () => void;
  onSearchRoute: (from: string, to: string) => void;
  telemetry?: LiveTelemetryPayload;
  lastUpdated?: string;
  onRefresh?: () => Promise<void>;
  isRefreshing?: boolean;
}

export const LiveIndexView: React.FC<LiveIndexViewProps> = ({
  onBackToDashboard,
  onSearchRoute,
  telemetry,
  lastUpdated = '10:31 am',
  onRefresh,
  isRefreshing = false
}) => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [simulatedOffset, setSimulatedOffset] = useState<number>(0);
  const [localRefreshing, setLocalRefreshing] = useState(false);

  const displayTime = lastUpdated || telemetry?.formattedTime || '10:31 am';
  const effectiveRefreshing = isRefreshing || localRefreshing;

  const handleManualRefresh = async () => {
    if (onRefresh) {
      await onRefresh();
    } else {
      setLocalRefreshing(true);
      setTimeout(() => {
        setLocalRefreshing(false);
      }, 600);
    }
  };

  const effectiveTicks = telemetry?.recentTicks && telemetry.recentTicks.length > 0
    ? telemetry.recentTicks
    : [
        { id: 1, route: 'DEL → BOM', airline: 'IndiGo 6E-2045', price: 3840, change: -120, time: '10:31:04 AM' },
        { id: 2, route: 'BOM → BLR', airline: 'Air India AI-671', price: 4210, change: 80, time: '10:30:58 AM' },
        { id: 3, route: 'DEL → CCU', airline: 'Akasa Air QP-1382', price: 4690, change: -210, time: '10:30:42 AM' },
        { id: 4, route: 'BLR → HYD', airline: 'SpiceJet SG-102', price: 2890, change: 0, time: '10:30:15 AM' },
        { id: 5, route: 'DEL → GOI', airline: 'Air India Express IX-142', price: 5120, change: -350, time: '10:29:50 AM' }
      ];

  const baseIdx = telemetry?.currentIndex || 96.62;
  const currentIndex = Number((baseIdx + simulatedOffset).toFixed(2));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              {isDemoMode ? 'Interactive Demo Mode' : 'Live Real-Time Index Telemetry'}
            </span>
            <span className="text-xs text-slate-400">• Updated: {displayTime}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            India's Live Airfare Price Index
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time streaming index aggregating domestic airline reservation buckets across 18 key hubs.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Demo toggle */}
          <button
            type="button"
            onClick={() => setIsDemoMode(!isDemoMode)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center space-x-1.5 ${
              isDemoMode
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isDemoMode ? 'Exit Demo' : 'Demo Simulation Mode'}</span>
          </button>

          <button
            type="button"
            onClick={handleManualRefresh}
            disabled={effectiveRefreshing}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${effectiveRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Telemetry</span>
          </button>
        </div>
      </div>

      {/* Demo Controls Bar if active */}
      {isDemoMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-amber-950">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Demo Parameter Simulator:</strong> Adjust market stress or festival surge to observe index recalculations.
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSimulatedOffset(prev => prev - 2.5)}
              className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-800 font-bold hover:bg-amber-100 cursor-pointer"
            >
              -2.5 pts (Fare Drop)
            </button>
            <button
              onClick={() => setSimulatedOffset(0)}
              className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-800 font-bold hover:bg-amber-100 cursor-pointer"
            >
              Reset Normal
            </button>
            <button
              onClick={() => setSimulatedOffset(prev => prev + 3.8)}
              className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-800 font-bold hover:bg-amber-100 cursor-pointer"
            >
              +3.8 pts (Surge)
            </button>
          </div>
        </div>
      )}

      {/* Main Metric Cards */}
      <MetricCards metrics={telemetry?.metrics} isRefreshing={effectiveRefreshing} />

      {/* Live Sub-Indices Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Metro Trunk Corridor
          </span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">98.40</span>
            <span className="text-xs font-semibold text-emerald-600">↘ 0.3%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">High frequency routes (DEL-BOM-BLR)</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Regional Tier-2 Index
          </span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">92.10</span>
            <span className="text-xs font-semibold text-emerald-600">↘ 1.8%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">IXC, PAT, IDR, NAG, LKO</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Leisure &amp; Tourist Index
          </span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">109.80</span>
            <span className="text-xs font-semibold text-rose-600">↗ 4.2%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">GOI, SXR, COK, IXZ holiday routes</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            UDAN Connectivity Index
          </span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">88.50</span>
            <span className="text-xs font-semibold text-emerald-600">↘ 0.9%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Govt-subsidized regional routes</p>
        </div>
      </div>

      {/* Streaming Live Rate Ticker */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
            <h3 className="font-bold text-sm text-slate-900">Live Booking Feed Ticker</h3>
          </div>
          <span className="text-[11px] text-slate-400">Updates every 3-5 seconds</span>
        </div>

        <div className="divide-y divide-slate-100">
          {effectiveTicks.map(tick => (
            <div
              key={tick.id}
              className="py-3 flex items-center justify-between text-xs hover:bg-slate-50 px-2 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="font-mono text-[11px] text-slate-400">{tick.time}</span>
                <span className="font-bold text-slate-800">{tick.route}</span>
                <span className="text-slate-500 hidden sm:inline">{tick.airline}</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-bold text-slate-900">₹ {tick.price.toLocaleString('en-IN')}</span>
                <span
                  className={`text-[11px] font-semibold w-16 text-right ${
                    tick.change < 0
                      ? 'text-emerald-600'
                      : tick.change > 0
                      ? 'text-rose-600'
                      : 'text-slate-400'
                  }`}
                >
                  {tick.change < 0
                    ? `-${Math.abs(tick.change)}`
                    : tick.change > 0
                    ? `+${tick.change}`
                    : 'Unchanged'}
                </span>
                <button
                  onClick={() => {
                    const [from, to] = tick.route.split(' → ');
                    onSearchRoute(from, to);
                  }}
                  className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium text-[11px] transition-colors cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
