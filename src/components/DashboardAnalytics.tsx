import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, RefreshCw, ChevronRight } from 'lucide-react';
import {
  TREND_DATA_7D,
  TREND_DATA_30D,
  POPULAR_ROUTES,
  AIRLINE_FARE_LEADERS,
  RECENT_INSIGHTS,
  PopularRoute,
  TrendDataPoint,
  AirlineFareLeader
} from '../data/historicalData';

interface DashboardAnalyticsProps {
  onSelectRoute?: (from: string, to: string) => void;
  onViewAirlines?: () => void;
  currentIndex?: number;
  lastSyncTime?: string;
  nextScheduledRun?: string;
  trendData7D?: TrendDataPoint[];
  trendData30D?: TrendDataPoint[];
  popularRoutes?: PopularRoute[];
  airlineFareLeaders?: AirlineFareLeader[];
}

export const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({
  onSelectRoute,
  onViewAirlines,
  currentIndex = 96.62,
  lastSyncTime = '10:31:02 AM',
  nextScheduledRun = '10:31:32 AM',
  trendData7D = TREND_DATA_7D,
  trendData30D = TREND_DATA_30D,
  popularRoutes = POPULAR_ROUTES,
  airlineFareLeaders = AIRLINE_FARE_LEADERS
}) => {
  const [trendRange, setTrendRange] = useState<'7D' | '30D'>('7D');
  const trendData = trendRange === '7D' ? trendData7D : trendData30D;

  // Calculate SVG curve path for trend chart
  const minIndex = 95.0;
  const maxIndex = 106.0;
  const chartHeight = 150;
  const chartWidth = 520;

  const points = trendData.map((d, i) => {
    const x = (i / (trendData.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - ((d.index - minIndex) / (maxIndex - minIndex)) * (chartHeight - 30) - 15;
    return { x, y, data: d };
  });

  const svgLinePath = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cp1x = prev.x + (p.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (p.x - prev.x) / 2;
    const cp2y = p.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
  }, '');

  const svgAreaPath = `${svgLinePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
      {/* Left Column (8 cols): Airfare Index Trend + Top Airlines + Latest Insights */}
      <div className="lg:col-span-7 xl:col-span-8 space-y-5 sm:space-y-6">
        {/* Trend Chart Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Airfare Index Trend
              </h2>
              <p className="text-xs text-slate-400">
                National composite price baseline across domestic corridors
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex bg-slate-100 rounded-lg p-0.5 text-xs font-medium text-slate-600">
                <button
                  type="button"
                  onClick={() => setTrendRange('7D')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    trendRange === '7D'
                      ? 'bg-white text-blue-600 shadow-xs font-semibold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  7 Days
                </button>
                <button
                  type="button"
                  onClick={() => setTrendRange('30D')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    trendRange === '30D'
                      ? 'bg-white text-blue-600 shadow-xs font-semibold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  30 Days
                </button>
              </div>

              <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline hidden sm:inline">
                View All &gt;
              </span>
            </div>
          </div>

          {/* SVG Line / Area Graph */}
          <div className="mt-4 overflow-x-auto">
            <div className="min-w-[480px]">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`}
                className="w-full h-44 sm:h-48 overflow-visible"
              >
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference grid lines */}
                {[104, 100, 96].map((gridVal, idx) => {
                  const y =
                    chartHeight -
                    ((gridVal - minIndex) / (maxIndex - minIndex)) *
                      (chartHeight - 30) -
                    15;
                  return (
                    <g key={gridVal}>
                      <line
                        x1="20"
                        y1={y}
                        x2={chartWidth - 20}
                        y2={y}
                        stroke="#f1f5f9"
                        strokeDasharray="4 4"
                      />
                      <text
                        x="10"
                        y={y + 3}
                        fontSize="9"
                        fill="#94a3b8"
                        textAnchor="end"
                      >
                        {gridVal}
                      </text>
                    </g>
                  );
                })}

                {/* Filled Area */}
                <path d={svgAreaPath} fill="url(#trendGradient)" />

                {/* Line Path */}
                <path
                  d={svgLinePath}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Interactive Data Point Dots */}
                {points.map((p, i) => (
                  <g key={i} className="group cursor-pointer">
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill="#2563eb"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="transition-transform group-hover:scale-150"
                    />
                    {/* Tooltip on hover */}
                    <text
                      x={p.x}
                      y={p.y - 10}
                      fontSize="10"
                      fontWeight="bold"
                      fill="#1e293b"
                      textAnchor="middle"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {p.data.index}
                    </text>
                    {/* X axis labels */}
                    <text
                      x={p.x}
                      y={chartHeight + 18}
                      fontSize="9.5"
                      fill="#64748b"
                      textAnchor="middle"
                    >
                      {p.data.date}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Top Airlines by Average Fare */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Top Airlines by Average Fare
              </h2>
              <p className="text-xs text-slate-400">
                Calculated across scheduled flights in the past 24 hours
              </p>
            </div>
            {onViewAirlines && (
              <button
                type="button"
                onClick={onViewAirlines}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center"
              >
                <span>Directory</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {airlineFareLeaders.map(airline => (
              <div
                key={airline.id}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ backgroundColor: airline.color }}
                  >
                    {airline.iata}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 truncate">
                    {airline.name}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="text-sm font-bold text-slate-900">
                    ₹ {airline.avgFare.toLocaleString('en-IN')}
                  </div>
                  <div
                    className={`text-[10px] font-medium flex items-center mt-0.5 ${
                      airline.isUp ? 'text-rose-500' : 'text-emerald-600'
                    }`}
                  >
                    {airline.isUp ? (
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-0.5" />
                    )}
                    <span>{airline.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Aviation Insights */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <h2 className="text-base font-bold text-slate-800 mb-3">
            Latest Market Insights
          </h2>
          <div className="space-y-3">
            {RECENT_INSIGHTS.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                      {item.tag}
                    </span>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-800">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    {item.description}
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column (4 cols): Route Type Donut + Live Data Status + Popular Routes */}
      <div className="lg:col-span-5 xl:col-span-4 space-y-5 sm:space-y-6">
        {/* Index by Route Type (Donut) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <h2 className="text-base font-bold text-slate-800 mb-1">
            Index by Route Type
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Volume and fare share composition
          </p>

          <div className="flex items-center justify-between">
            {/* SVG Donut */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth="12"
                />
                {/* Domestic Segment (62%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#2563eb"
                  strokeWidth="12"
                  strokeDasharray={`${(62 / 100) * 238.76} 238.76`}
                  strokeDashoffset="0"
                />
                {/* International Segment (24%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="12"
                  strokeDasharray={`${(24 / 100) * 238.76} 238.76`}
                  strokeDashoffset={`-${(62 / 100) * 238.76}`}
                />
                {/* Metro-Metro Segment (14%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="12"
                  strokeDasharray={`${(14 / 100) * 238.76} 238.76`}
                  strokeDashoffset={`-${((62 + 24) / 100) * 238.76}`}
                />
              </svg>
              {/* Inner Center Label */}
              <div className="absolute text-center leading-tight">
                <span className="text-lg font-bold text-slate-800">{currentIndex.toFixed(2)}</span>
                <p className="text-[9px] text-slate-400">Total Index</p>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <span className="font-medium text-slate-700">Domestic:</span>
                <span className="font-bold text-slate-900">62%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="font-medium text-slate-700">International:</span>
                <span className="font-bold text-slate-900">24%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="font-medium text-slate-700">Metro-Metro:</span>
                <span className="font-bold text-slate-900">14%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Data Status Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-800">
              Live Data Status
            </h2>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>ACTIVE</span>
            </span>
          </div>

          <div className="space-y-2 text-xs divide-y divide-slate-100">
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Last sync time:</span>
              <span className="font-semibold text-slate-800">{lastSyncTime}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Next scheduled run:</span>
              <span className="font-semibold text-slate-800">{nextScheduledRun}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Active data sources:</span>
              <span className="font-semibold text-emerald-600">12 / 12 Online</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Coverage:</span>
              <span className="font-semibold text-slate-800">92 Indian Airports</span>
            </div>
          </div>
        </div>

        {/* Popular Routes List */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-800">
              Popular Routes
            </h2>
            <span className="text-[11px] text-slate-400">Lowest Today</span>
          </div>

          <div className="space-y-2.5">
            {popularRoutes.map((item: PopularRoute, idx: number) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectRoute && onSelectRoute(item.from, item.to)}
                className="w-full p-2.5 rounded-xl bg-slate-50/70 hover:bg-blue-50/70 border border-slate-100 hover:border-blue-200 text-left transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600">
                    {item.route}
                  </span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <span className="text-xs font-bold text-slate-900">
                    {item.fare}
                  </span>
                  <span
                    className={`text-[10px] font-semibold flex items-center ${
                      item.isUp ? 'text-rose-500' : 'text-emerald-600'
                    }`}
                  >
                    {item.isUp ? '▲' : '▼'} {item.change}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
