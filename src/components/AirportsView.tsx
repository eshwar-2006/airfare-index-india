import React, { useState } from 'react';
import { MapPin, Search, Plane, UtensilsCrossed, ExternalLink, Building2 } from 'lucide-react';
import { AIRPORTS, Airport } from '../data/airports';

interface AirportsViewProps {
  onExploreNearby: (airportCode: string) => void;
  onSearchFlightsFrom: (airportCode: string) => void;
}

export const AirportsView: React.FC<AirportsViewProps> = ({
  onExploreNearby,
  onSearchFlightsFrom
}) => {
  const [search, setSearch] = useState('');

  const filteredAirports = AIRPORTS.filter(
    a =>
      a.city.toLowerCase().includes(search.toLowerCase()) ||
      a.code.toLowerCase().includes(search.toLowerCase()) ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Indian Airports Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              92 Hubs Tracked
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Terminals, geographic coordinates, and direct 5 km radius hotel & restaurant discovery.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search airport, city or state..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAirports.map(airport => (
          <div
            key={airport.code}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shadow-2xs">
                    {airport.code}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-tight">
                      {airport.city}
                    </h3>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {airport.state}
                    </div>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    airport.isMetro
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {airport.isMetro ? 'Metro Hub' : 'Regional'}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-3 font-medium">
                {airport.name}
              </p>

              {/* Terminals */}
              <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Active Terminals
                </span>
                <div className="space-y-0.5 text-slate-600 text-[11px]">
                  {airport.terminals.map((t, i) => (
                    <div key={i}>• {t}</div>
                  ))}
                </div>
              </div>

              {/* Coordinates */}
              <div className="mt-2 text-[10px] text-slate-400 flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>GPS: {airport.lat.toFixed(4)}° N, {airport.lng.toFixed(4)}° E</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-2 text-xs">
              <button
                type="button"
                onClick={() => onExploreNearby(airport.code)}
                className="flex-1 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold flex items-center justify-center space-x-1 border border-amber-200/80 transition-colors"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" />
                <span>Nearby 5 km</span>
              </button>

              <button
                type="button"
                onClick={() => onSearchFlightsFrom(airport.code)}
                className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center space-x-1 shadow-xs transition-colors"
              >
                <Plane className="w-3.5 h-3.5" />
                <span>Flights From</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
