import React, { useState } from 'react';
import {
  BookmarkCheck,
  Plane,
  Palmtree,
  Hotel,
  Calendar,
  IndianRupee,
  Trash2,
  ExternalLink,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { BackToDashboard } from './BackToDashboard';

interface SavedTripsViewProps {
  onBackToDashboard: () => void;
  onExploreFlights: () => void;
  onExplorePackages: () => void;
}

interface SavedItem {
  id: string;
  type: 'flight' | 'package' | 'hotel';
  title: string;
  subtitle: string;
  date: string;
  price: number;
  tags: string[];
  carrierOrLocation: string;
  bookingUrl: string;
}

const INITIAL_SAVED_ITEMS: SavedItem[] = [
  {
    id: 'save-1',
    type: 'flight',
    title: 'IndiGo 6E-2045 (New Delhi → Mumbai)',
    subtitle: 'DEL 06:00 → BOM 08:15 (2h 15m) • Non-stop Economy',
    date: '20 Oct 2026',
    price: 3840,
    tags: ['Cheapest Pick', 'Morning Departure'],
    carrierOrLocation: 'IndiGo Airlines',
    bookingUrl: 'https://www.goindigo.in'
  },
  {
    id: 'save-2',
    type: 'package',
    title: 'Goa Coastal Serenity & Sunset Cruise',
    subtitle: '4 Days / 3 Nights • Beachside Boutique Resort + Sightseeing',
    date: 'Flexible (Nov 2026)',
    price: 18999,
    tags: ['Best Value', 'Couple Getaway'],
    carrierOrLocation: 'North Goa (Calangute)',
    bookingUrl: 'https://www.makemytrip.com/holidays-india/'
  },
  {
    id: 'save-3',
    type: 'hotel',
    title: 'JW Marriott Hotel New Delhi Aerocity',
    subtitle: 'Luxury 5-Star Hotel within 2.8 km of DEL Terminal 3',
    date: 'Instant Confirmation',
    price: 11500,
    tags: ['5km Radius Pick', 'Top Rated 4.8★'],
    carrierOrLocation: 'Aerocity, New Delhi',
    bookingUrl: 'https://www.marriott.com'
  }
];

export const SavedTripsView: React.FC<SavedTripsViewProps> = ({
  onBackToDashboard,
  onExploreFlights,
  onExplorePackages
}) => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>(INITIAL_SAVED_ITEMS);
  const [filterType, setFilterType] = useState<'all' | 'flight' | 'package' | 'hotel'>('all');

  const filteredItems = savedItems.filter(
    item => filterType === 'all' || item.type === filterType
  );

  const removeItem = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const totalEstimatedCost = filteredItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <BookmarkCheck className="w-4 h-4 text-blue-600" />
            <span>Personal Bookmarks • {savedItems.length} Items Saved</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Your Saved Trips &amp; Itineraries</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track price changes on your bookmarked flights, holiday getaways, and transit hotels.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-right">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Estimated Total
          </span>
          <span className="text-2xl font-extrabold text-blue-700">
            ₹ {totalEstimatedCost.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        {(['all', 'flight', 'package', 'hotel'] as const).map(type => (
          <button
            key={type}
            type="button"
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
              filterType === type
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {type === 'all' ? 'All Items' : `${type}s`}
          </button>
        ))}
      </div>

      {/* Items List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 space-y-4">
          <BookmarkCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-700">No saved items found</h3>
          <p className="text-xs max-w-sm mx-auto">
            Bookmark flights or holiday packages while browsing to track live fares and lock in plans.
          </p>
          <div className="flex justify-center space-x-3 pt-2">
            <button
              onClick={onExploreFlights}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 cursor-pointer"
            >
              Search Flights
            </button>
            <button
              onClick={onExplorePackages}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 cursor-pointer"
            >
              Explore Packages
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                  {item.type === 'flight' && <Plane className="w-5 h-5" />}
                  {item.type === 'package' && <Palmtree className="w-5 h-5" />}
                  {item.type === 'hotel' && <Hotel className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {item.type}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">{item.subtitle}</p>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </span>
                    <span>•</span>
                    <span>{item.carrierOrLocation}</span>
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end space-x-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 block font-medium">Verified Fare</span>
                  <span className="text-lg font-bold text-slate-900">
                    ₹ {item.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href={item.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <span>Book</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer"
                    title="Remove item"
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
