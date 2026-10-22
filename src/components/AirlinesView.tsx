import React, { useState } from 'react';
import { Search, ExternalLink, ShieldCheck, Phone, CheckCircle, ChevronRight, X, Plane, Info, ArrowLeft } from 'lucide-react';
import { AIRLINES, Airline, buildOfficialBookingUrl } from '../data/airlines';

interface AirlinesViewProps {
  onBackToDashboard?: () => void;
}

export const AirlinesView: React.FC<AirlinesViewProps> = ({ onBackToDashboard }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Domestic' | 'International'>('All');
  const [selectedAirline, setSelectedAirline] = useState<Airline | null>(null);

  const filteredAirlines = AIRLINES.filter(airline => {
    const matchesSearch =
      airline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      airline.iataCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      airline.hubs.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || airline.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Airlines Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Verified Carriers
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comprehensive directory of airlines operating across India with official booking gateways and fleet data.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search airline or hub..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex bg-slate-100 rounded-xl p-1 text-xs font-medium text-slate-600 w-full sm:w-auto">
            {(['All', 'Domestic', 'International'] as const).map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg transition-colors ${
                  categoryFilter === cat
                    ? 'bg-white text-blue-600 shadow-xs font-semibold'
                    : 'hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Airlines Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Airline</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Primary Hubs</th>
                <th className="py-3 px-4">Fleet</th>
                <th className="py-3 px-4">On-Time (OTP)</th>
                <th className="py-3 px-4">Avg Fare</th>
                <th className="py-3 px-4 text-right">Official Booking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAirlines.map(airline => (
                <tr
                  key={airline.id}
                  className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                  onClick={() => setSelectedAirline(airline)}
                >
                  {/* Airline Name & Logo */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-2xs"
                        style={{ backgroundColor: airline.logoBg }}
                      >
                        {airline.iataCode}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {airline.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {airline.category} • {airline.country}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* IATA / ICAO */}
                  <td className="py-4 px-4 font-mono font-semibold text-slate-700">
                    {airline.iataCode} / {airline.icaoCode}
                  </td>

                  {/* Hubs */}
                  <td className="py-4 px-4 text-slate-600">
                    <div className="truncate max-w-[200px]" title={airline.hubs.join(', ')}>
                      {airline.hubs.join(', ')}
                    </div>
                  </td>

                  {/* Fleet Size */}
                  <td className="py-4 px-4 font-semibold text-slate-800">
                    {airline.fleetSize} aircraft
                  </td>

                  {/* On-Time Performance */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>{airline.onTimePerformance}%</span>
                    </span>
                  </td>

                  {/* Avg Fare */}
                  <td className="py-4 px-4 font-bold text-slate-900">
                    ₹ {airline.averageFare.toLocaleString('en-IN')}
                  </td>

                  {/* Booking Action */}
                  <td className="py-4 px-4 text-right" onClick={e => e.stopPropagation()}>
                    <a
                      href={airline.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
                      title={`Open official booking website for ${airline.name}`}
                    >
                      <span>Book on Official Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Airline Details Modal */}
      {selectedAirline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm"
                  style={{ backgroundColor: selectedAirline.logoBg }}
                >
                  {selectedAirline.iataCode}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedAirline.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    IATA: {selectedAirline.iataCode} | ICAO: {selectedAirline.icaoCode} | Status: {selectedAirline.status}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAirline(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedAirline.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Baggage Policy
                </span>
                <p className="font-semibold text-slate-800">Cabin: {selectedAirline.baggagePolicy.cabin}</p>
                <p className="text-slate-600 mt-0.5">Check-in: {selectedAirline.baggagePolicy.checkIn}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Customer Helpline
                </span>
                <div className="flex items-center space-x-1.5 font-bold text-blue-600 mt-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{selectedAirline.customerCare}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">24/7 Verified Support</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Major Hubs & Bases
              </span>
              <p className="font-medium text-slate-700">
                {selectedAirline.hubs.join(' • ')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-3 border-t border-slate-100">
              {onBackToDashboard && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAirline(null);
                    onBackToDashboard();
                  }}
                  className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Dashboard</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedAirline(null)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <a
                href={selectedAirline.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 text-center flex items-center justify-center space-x-1 shadow-md shadow-blue-500/20"
              >
                <span>Book on Official Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
