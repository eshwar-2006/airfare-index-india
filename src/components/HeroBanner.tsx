import React from 'react';
import { Plane, RefreshCw, AlertTriangle } from 'lucide-react';

interface HeroBannerProps {
  lastUpdated?: string;
  recordsToday?: number;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  isStale?: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  lastUpdated = '10:31 am',
  recordsToday = 300,
  onRefresh,
  isRefreshing = false,
  isStale = false
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d3b85] via-[#154db0] to-[#1e61d5] text-white p-6 sm:p-8 shadow-sm">
      {/* Background Jetliner Silhouette Watermark */}
      <div className="absolute -right-6 -bottom-10 pointer-events-none opacity-15 transform rotate-[-8deg] scale-125">
        <svg
          width="420"
          height="240"
          viewBox="0 0 500 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 140 C120 135, 220 120, 310 90 L420 30 C435 22, 455 35, 445 52 L370 120 L480 135 C495 137, 498 152, 485 158 L370 180 L350 250 C345 262, 330 265, 325 252 L285 190 L160 200 L90 240 C80 246, 68 238, 72 226 L90 195 C60 180, 45 160, 50 140 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold tracking-tight text-white leading-tight">
            India's Real-Time Airfare Price Index
          </h1>
          <p className="mt-1 text-sm sm:text-base text-blue-100 font-normal">
            Track fares. Compare airlines. Plan smarter.
          </p>
        </div>

        {/* Live status tags & Manual refresh action */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/60 backdrop-blur-md border border-blue-400/30 text-xs font-medium text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>LIVE DATA — Last updated: {lastUpdated}</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-900/40 backdrop-blur-md border border-blue-400/20 text-xs font-medium text-blue-100">
            <span>Records today:</span>
            <span className="font-semibold text-white">{recordsToday.toLocaleString('en-IN')}</span>
          </div>

          {isStale && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-900/60 backdrop-blur-md border border-amber-400/40 text-xs font-medium text-amber-200">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              <span>Offline / Stale (Retaining last good data)</span>
            </div>
          )}

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Force immediate observation sweep"
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-md border border-white/20 text-xs font-medium text-white transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Refresh Data'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
