import React, { useState } from 'react';
import {
  History,
  ArrowRight,
  Plane,
  Trash2,
  Calendar,
  Users,
  Search,
  RotateCcw
} from 'lucide-react';
import { BackToDashboard } from './BackToDashboard';
import { FlightSearchParams } from './FlightSearchCard';

interface SearchHistoryItem {
  id: string;
  from: string;
  to: string;
  fromCity: string;
  toCity: string;
  departDate: string;
  returnDate?: string;
  tripType: 'one-way' | 'round-trip';
  passengers: number;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business';
  searchedAt: string;
  lowestFareFound: number;
}

const INITIAL_HISTORY: SearchHistoryItem[] = [
  {
    id: 'hist-1',
    from: 'DEL',
    to: 'BOM',
    fromCity: 'New Delhi',
    toCity: 'Mumbai',
    departDate: '2026-10-20',
    tripType: 'one-way',
    passengers: 1,
    cabinClass: 'Economy',
    searchedAt: '12 mins ago',
    lowestFareFound: 3840
  },
  {
    id: 'hist-2',
    from: 'BLR',
    to: 'GOI',
    fromCity: 'Bengaluru',
    toCity: 'Goa',
    departDate: '2026-10-24',
    returnDate: '2026-10-28',
    tripType: 'round-trip',
    passengers: 2,
    cabinClass: 'Economy',
    searchedAt: '2 hours ago',
    lowestFareFound: 5420
  },
  {
    id: 'hist-3',
    from: 'HYD',
    to: 'DEL',
    fromCity: 'Hyderabad',
    toCity: 'New Delhi',
    departDate: '2026-10-22',
    tripType: 'one-way',
    passengers: 1,
    cabinClass: 'Business',
    searchedAt: 'Yesterday',
    lowestFareFound: 14200
  }
];

interface SearchHistoryViewProps {
  onBackToDashboard: () => void;
  onRepeatSearch: (params: FlightSearchParams) => void;
}

export const SearchHistoryView: React.FC<SearchHistoryViewProps> = ({
  onBackToDashboard,
  onRepeatSearch
}) => {
  const [historyItems, setHistoryItems] = useState<SearchHistoryItem[]>(INITIAL_HISTORY);

  const clearAll = () => {
    setHistoryItems([]);
  };

  const removeSingle = (id: string) => {
    setHistoryItems(prev => prev.filter(item => item.id !== id));
  };

  const handleReRun = (item: SearchHistoryItem) => {
    onRepeatSearch({
      tripType: item.tripType,
      from: item.from,
      to: item.to,
      departDate: item.departDate,
      returnDate: item.returnDate,
      passengers: item.passengers,
      cabinClass: item.cabinClass
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <History className="w-4 h-4 text-blue-600" />
            <span>Telemetry Search Logs • {historyItems.length} Searches</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Recent Search Activity</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Quickly re-execute previous airfare queries with current live rates and availability.
          </p>
        </div>

        {historyItems.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors self-start md:self-auto cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* History List */}
      {historyItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 space-y-3">
          <History className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-700">No search logs found</h3>
          <p className="text-xs max-w-sm mx-auto">
            Your flight search queries across domestic routes will automatically appear here for easy one-click retrieval.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {historyItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Plane className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-base text-slate-900">{item.from}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <span className="font-extrabold text-base text-slate-900">{item.to}</span>
                    <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                      ({item.fromCity} to {item.toCity})
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.departDate}</span>
                      {item.returnDate && <span> - {item.returnDate}</span>}
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.passengers} pax</span>
                    </span>
                    <span>•</span>
                    <span className="font-medium text-slate-700">{item.cabinClass}</span>
                    <span>•</span>
                    <span className="text-slate-400">{item.searchedAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 block font-medium">Lowest at search</span>
                  <span className="text-sm font-bold text-slate-900">
                    ₹ {item.lowestFareFound.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleReRun(item)}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Search Again</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => removeSingle(item.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer"
                    title="Remove from history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
