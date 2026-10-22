import React, { useState } from 'react';
import { ArrowLeftRight, TrendingDown, Clock, ShieldAlert, BarChart3, ChevronRight } from 'lucide-react';
import { AIRPORTS } from '../data/airports';

export const RouteAnalysisView: React.FC = () => {
  const [fromCode, setFromCode] = useState('DEL');
  const [toCode, setToCode] = useState('BOM');

  const days = ['13 Oct', '14 Oct', '15 Oct', '16 Oct', '17 Oct', '18 Oct', '19 Oct'];
  const avgFareTrend = [4450, 4390, 4520, 4300, 4280, 4310, 4250];

  return (
    <div className="space-y-6">
      {/* Header & Route Selector */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Route Analysis: {fromCode} ⇄ {toCode}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Corridor Analytics
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time supply, demand dynamics, carrier pricing power, and departure slot breakdown.
          </p>
        </div>

        {/* Origin / Dest Selector */}
        <div className="flex items-center space-x-2">
          <select
            value={fromCode}
            onChange={e => setFromCode(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
          >
            {AIRPORTS.map(a => (
              <option key={`ra-from-${a.code}`} value={a.code}>
                {a.code} ({a.city})
              </option>
            ))}
          </select>

          <ArrowLeftRight className="w-4 h-4 text-slate-400" />

          <select
            value={toCode}
            onChange={e => setToCode(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
          >
            {AIRPORTS.filter(a => a.code !== fromCode).map(a => (
              <option key={`ra-to-${a.code}`} value={a.code}>
                {a.code} ({a.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4 Key Corridor Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Average Fare</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">₹ 4,250</div>
          <span className="text-[11px] font-semibold text-emerald-600">↘ 2.4% vs last week</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Lowest Fare Available</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">₹ 2,890</div>
          <span className="text-[11px] font-semibold text-emerald-600">Akasa Air / SpiceJet</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Route Index</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">102.4</div>
          <span className="text-[11px] font-semibold text-blue-600">High Frequency</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Daily Non-Stop Flights</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">124</div>
          <span className="text-[11px] font-semibold text-slate-500">Every 15-20 mins</span>
        </div>
      </div>

      {/* Corridor Fare Trend Chart & Airline Market Share */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <h2 className="text-base font-bold text-slate-800 mb-1">
            7-Day Fare Volatility Curve ({fromCode} → {toCode})
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Mean fare across all scheduled non-stop passenger services
          </p>

          {/* Bar Chart representation */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-slate-100">
            {days.map((d, i) => {
              const fare = avgFareTrend[i];
              const pct = ((fare - 4000) / 700) * 100;
              return (
                <div key={d} className="flex-1 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-700 mb-1">
                    ₹{fare}
                  </span>
                  <div
                    style={{ height: `${Math.max(15, pct)}%` }}
                    className="w-full max-w-[42px] bg-blue-600 hover:bg-blue-700 rounded-t-lg transition-colors cursor-pointer"
                  ></div>
                  <span className="text-[10px] font-medium text-slate-400 mt-2">
                    {d}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-800">
            Airline Capacity Share
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>IndiGo</span>
                <span>54% share (68 daily)</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '54%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Air India</span>
                <span>26% share (32 daily)</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 rounded-full" style={{ width: '26%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Akasa Air</span>
                <span>12% share (15 daily)</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>SpiceJet & AI Express</span>
                <span>8% share (9 daily)</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
