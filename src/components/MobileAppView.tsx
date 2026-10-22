import React, { useState } from 'react';
import {
  Plane,
  Search,
  Tag,
  Bell,
  User,
  ArrowRight,
  Filter,
  Calendar,
  Users,
  Briefcase,
  ExternalLink,
  Luggage,
  Sparkles
} from 'lucide-react';
import { searchFlights } from '../data/flights';
import { POPULAR_ROUTES } from '../data/historicalData';
import { AIRPORTS } from '../data/airports';

interface MobileAppViewProps {
  lastUpdated?: string;
}

export const MobileAppView: React.FC<MobileAppViewProps> = ({
  lastUpdated = '10:31 am'
}) => {
  const [mobileTab, setMobileTab] = useState<'home' | 'search' | 'results'>('home');
  const [fromCode, setFromCode] = useState('DEL');
  const [toCode, setToCode] = useState('BOM');
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');

  const flights = searchFlights(fromCode, toCode, '2026-10-20', 1, 'Economy');

  return (
    <div className="flex flex-col items-center justify-center py-4">
      {/* Phone Frame Simulator */}
      <div className="w-[375px] h-[780px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700 relative overflow-hidden flex flex-col">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-30"></div>

        {/* Screen Content Wrapper */}
        <div className="flex-1 bg-slate-50 rounded-[34px] overflow-hidden flex flex-col relative text-slate-800">
          {/* Top Status Bar */}
          <div className="pt-3 px-6 flex justify-between items-center text-[10px] font-bold text-slate-800 z-20">
            <span>9:41</span>
            <div className="flex items-center space-x-1 text-[9px]">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>

          {/* Screen Body depending on sub-tab */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {mobileTab === 'home' && (
              <div className="space-y-3.5">
                {/* App Brand Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <Plane className="w-4 h-4 transform -rotate-45" />
                    </div>
                    <div>
                      <h2 className="text-xs font-bold text-slate-900 leading-tight">
                        Airfare Index India
                      </h2>
                      <p className="text-[9px] text-slate-400">Real-time aviation feed</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                    • LIVE
                  </span>
                </div>

                {/* Index Card from Screenshot 1 */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-md">
                  <span className="text-[10px] text-blue-200 uppercase font-semibold">
                    Composite Airfare Index
                  </span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-3xl font-extrabold">104.27</span>
                    <span className="text-xs font-semibold text-emerald-300">↗ 1.6%</span>
                  </div>
                  <p className="text-[9px] text-blue-200 mt-1">
                    Updated {lastUpdated} • 4,892 flights indexed
                  </p>
                </div>

                {/* 4 Mini Stat Cards */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-400">Avg Fare</span>
                    <div className="text-sm font-bold text-slate-900">₹ 6,654</div>
                    <span className="text-[9px] text-emerald-600">↘ 1.2%</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-400">Lowest Fare</span>
                    <div className="text-sm font-bold text-slate-900">₹ 3,892</div>
                    <span className="text-[9px] text-emerald-600">↗ 20.3%</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-400">Flights Tracked</span>
                    <div className="text-sm font-bold text-slate-900">4,892</div>
                    <span className="text-[9px] text-slate-400">92 Airports</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-400">Data Points</span>
                    <div className="text-sm font-bold text-slate-900">248,566</div>
                    <span className="text-[9px] text-blue-600">Live Sync</span>
                  </div>
                </div>

                {/* Quick Search Trigger */}
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                  <span className="text-[11px] font-bold text-slate-800 block">
                    Quick Flight Search
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[9px] text-slate-400 uppercase block">From</span>
                      <span className="font-bold text-slate-800">Delhi (DEL)</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[9px] text-slate-400 uppercase block">To</span>
                      <span className="font-bold text-slate-800">Mumbai (BOM)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileTab('results')}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-sm hover:bg-blue-700"
                  >
                    Search Flights
                  </button>
                </div>

                {/* Popular Routes */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                    <span>Popular Routes</span>
                    <button
                      onClick={() => setMobileTab('results')}
                      className="text-[10px] text-blue-600 font-semibold"
                    >
                      View All
                    </button>
                  </div>
                  {POPULAR_ROUTES.slice(0, 3).map((r, i) => (
                    <div
                      key={i}
                      onClick={() => setMobileTab('results')}
                      className="p-2.5 bg-white rounded-xl border border-slate-200 flex justify-between items-center text-xs cursor-pointer"
                    >
                      <span className="font-bold text-slate-800">{r.route}</span>
                      <span className="font-extrabold text-blue-600">{r.fare}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mobileTab === 'search' && (
              <div className="space-y-3.5">
                <h2 className="text-sm font-bold text-slate-900">Search Flights</h2>

                <div className="flex bg-slate-200/80 p-0.5 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setTripType('one-way')}
                    className={`flex-1 py-1.5 rounded-lg ${
                      tripType === 'one-way' ? 'bg-blue-600 text-white' : 'text-slate-600'
                    }`}
                  >
                    One Way
                  </button>
                  <button
                    onClick={() => setTripType('round-trip')}
                    className={`flex-1 py-1.5 rounded-lg ${
                      tripType === 'round-trip' ? 'bg-blue-600 text-white' : 'text-slate-600'
                    }`}
                  >
                    Round Trip
                  </button>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                      From
                    </label>
                    <select
                      value={fromCode}
                      onChange={e => setFromCode(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                    >
                      {AIRPORTS.map(a => (
                        <option key={a.code} value={a.code}>
                          {a.city} ({a.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                      To
                    </label>
                    <select
                      value={toCode}
                      onChange={e => setToCode(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                    >
                      {AIRPORTS.map(a => (
                        <option key={a.code} value={a.code}>
                          {a.city} ({a.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                      Departure Date
                    </label>
                    <input
                      type="date"
                      defaultValue="2026-10-20"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                    />
                  </div>

                  <button
                    onClick={() => setMobileTab('results')}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-sm hover:bg-blue-700"
                  >
                    Search Flights
                  </button>
                </div>
              </div>
            )}

            {mobileTab === 'results' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {fromCode} → {toCode}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      20 Oct 2026 • 1 Traveler • Economy
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileTab('search')}
                    className="text-[10px] font-bold text-blue-600 underline"
                  >
                    Edit
                  </button>
                </div>

                {/* Best Deal Pill */}
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-bold text-blue-900 text-[11px]">Best Value Pick</span>
                  </div>
                  <span className="font-extrabold text-blue-700">₹ 4,250</span>
                </div>

                {/* Flight Cards matching screenshot 1 mobile results */}
                {flights.slice(0, 4).map((f, idx) => (
                  <div
                    key={f.id}
                    className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-md bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                          {f.airlineCode}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block leading-none">
                            {f.airlineName}
                          </span>
                          <span className="text-[9px] text-slate-400">{f.flightNumber}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-extrabold text-slate-900">
                          ₹ {f.totalFare.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[9px] text-emerald-600 font-semibold">
                          Verified fare
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-slate-600 pt-1 border-t border-slate-50 text-[11px]">
                      <span>{f.departureTime} ({f.from})</span>
                      <span className="text-[9px] text-slate-400">{f.duration} • Non-stop</span>
                      <span>{f.arrivalTime} ({f.to})</span>
                    </div>

                    <a
                      href={f.verifiedOfficialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-[10px] flex items-center justify-center space-x-1 hover:bg-blue-700"
                    >
                      <span>Book on Official Website</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Mobile Navigation Bar */}
          <div className="bg-white border-t border-slate-200 px-6 py-2.5 flex justify-between items-center text-slate-500 z-20">
            <button
              onClick={() => setMobileTab('home')}
              className={`flex flex-col items-center space-y-0.5 ${
                mobileTab === 'home' ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span className="text-[9px] font-semibold">Home</span>
            </button>

            <button
              onClick={() => setMobileTab('search')}
              className={`flex flex-col items-center space-y-0.5 ${
                mobileTab === 'search' || mobileTab === 'results'
                  ? 'text-blue-600'
                  : 'text-slate-400'
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="text-[9px] font-semibold">Search</span>
            </button>

            <button
              onClick={() => setMobileTab('results')}
              className="flex flex-col items-center space-y-0.5 text-slate-400 hover:text-blue-600"
            >
              <Tag className="w-4 h-4" />
              <span className="text-[9px] font-semibold">Deals</span>
            </button>

            <button
              onClick={() => setMobileTab('home')}
              className="flex flex-col items-center space-y-0.5 text-slate-400 hover:text-blue-600"
            >
              <Bell className="w-4 h-4" />
              <span className="text-[9px] font-semibold">Alerts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
