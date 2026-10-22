import React, { useState } from 'react';
import {
  Palmtree,
  Calendar,
  Clock,
  Users,
  Star,
  Check,
  ChevronRight,
  ArrowRight,
  X,
  Compass,
  CreditCard,
  Send,
  Scale
} from 'lucide-react';
import { HOLIDAY_PACKAGES, HolidayPackage, calculatePackageCost } from '../data/packages';
import { AIRPORTS } from '../data/airports';

interface HolidayPackagesViewProps {
  onSearchFlightsForDestination?: (destAirport: string) => void;
  onBackToDashboard?: () => void;
}

export const HolidayPackagesView: React.FC<HolidayPackagesViewProps> = ({
  onSearchFlightsForDestination,
  onBackToDashboard
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPackage, setSelectedPackage] = useState<HolidayPackage | null>(null);

  // Comparison feature state
  const [compareList, setCompareList] = useState<HolidayPackage[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Package customizer modal state
  const [customTravelers, setCustomTravelers] = useState<number>(2);
  const [customTier, setCustomTier] = useState<'budget' | 'standard' | 'premium' | 'luxury'>('standard');
  const [customOrigin, setCustomOrigin] = useState<string>('DEL');
  const [enquirySuccess, setEnquirySuccess] = useState<boolean>(false);

  const categories = [
    'All',
    'Beach Holidays',
    'Family Trips',
    'Weekend Getaways',
    'Hill Stations',
    'International Holidays',
    'Budget Holidays'
  ];

  const filteredPackages = HOLIDAY_PACKAGES.filter(pkg => {
    if (selectedCategory === 'All') return true;
    return pkg.category === selectedCategory;
  });

  const activeCost = selectedPackage
    ? calculatePackageCost(selectedPackage, customTravelers, customTier, true)
    : null;

  const toggleCompare = (pkg: HolidayPackage) => {
    if (compareList.some(p => p.id === pkg.id)) {
      setCompareList(compareList.filter(p => p.id !== pkg.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare up to 3 holiday packages simultaneously.');
        return;
      }
      setCompareList([...compareList, pkg]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Holiday Packages & Trip Planner
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Curated Itineraries
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Handcrafted travel experiences with real-time flight estimates, day-by-day itineraries, and customizable budget tiers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {compareList.length > 0 && (
            <button
              type="button"
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare Selected ({compareList.length})</span>
            </button>
          )}

          {/* Categories Carousel */}
          <div className="flex items-center overflow-x-auto pb-1 max-w-full gap-2 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPackages.map(pkg => {
          const quickCost = calculatePackageCost(pkg, 2, 'standard', true);
          const isSelectedForCompare = compareList.some(p => p.id === pkg.id);

          return (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl border overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group ${
                isSelectedForCompare ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-slate-200/90'
              }`}
            >
              {/* Photo & Duration Badge */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.destination}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold">
                  {pkg.category}
                </div>
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-blue-400" />
                  <span>{pkg.durationDays}D / {pkg.durationNights}N</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-slate-900 text-xs font-bold flex items-center space-x-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span>{pkg.rating} ({pkg.reviewCount} reviews)</span>
                </div>

                {/* Compare Checkbox Button */}
                <button
                  type="button"
                  onClick={() => toggleCompare(pkg)}
                  className={`absolute bottom-3 right-3 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 backdrop-blur-md shadow-sm transition-colors ${
                    isSelectedForCompare
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-900/80 text-white hover:bg-slate-900'
                  }`}
                >
                  <Scale className="w-3 h-3" />
                  <span>{isSelectedForCompare ? 'Selected' : '+ Compare'}</span>
                </button>
              </div>

              {/* Package Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {pkg.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {pkg.highlightTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200 text-[10px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Inclusions checklist preview */}
                  <div className="mt-3.5 space-y-1 text-xs text-slate-600">
                    {pkg.inclusions.slice(0, 2).map((inc, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Pricing & Explore Action */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Starting from
                    </span>
                    <div className="text-lg font-extrabold text-slate-900">
                      ₹ {quickCost.perPersonCost.toLocaleString('en-IN')}{' '}
                      <span className="text-xs font-normal text-slate-500">/ person</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setEnquirySuccess(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center space-x-1 shadow-sm shadow-blue-500/20 transition-colors"
                  >
                    <span>Explore Package</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Package Comparison Modal */}
      {isCompareModalOpen && compareList.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Scale className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  Compare Holiday Packages ({compareList.length} Selected)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {compareList.map(pkg => {
                const cost = calculatePackageCost(pkg, 2, 'standard', true);
                return (
                  <div key={pkg.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 flex flex-col justify-between">
                    <div>
                      <img src={pkg.imageUrl} alt={pkg.destination} className="h-32 w-full object-cover rounded-lg mb-2" />
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                        {pkg.category}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 mt-1">{pkg.title}</h3>
                      <div className="text-xs text-slate-500 mt-1">
                        {pkg.durationDays} Days / {pkg.durationNights} Nights • Nearest: {pkg.nearestAirportCode}
                      </div>

                      <div className="mt-3 p-2.5 bg-white rounded-lg border border-slate-200 text-xs">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Est. Cost (2 Travelers)</span>
                        <div className="text-base font-extrabold text-blue-700">
                          ₹ {cost.totalEstimatedTripCost.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-slate-500">₹ {cost.perPersonCost.toLocaleString('en-IN')} / person</span>
                      </div>

                      <div className="mt-3 space-y-1 text-xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Top Inclusions</span>
                        {pkg.inclusions.slice(0, 3).map((inc, i) => (
                          <div key={i} className="flex items-center space-x-1 text-slate-600">
                            <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate">{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setIsCompareModalOpen(false);
                      }}
                      className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700"
                    >
                      Customize This Plan
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Package Detail & Customizer Modal */}
      {selectedPackage && activeCost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {selectedPackage.category}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  {selectedPackage.title}
                </h2>
                <p className="text-xs text-slate-500">
                  {selectedPackage.stateOrCountry} • Nearest Airport: {selectedPackage.nearestAirportCode}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                {onBackToDashboard && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPackage(null);
                      onBackToDashboard();
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                  >
                    <span>← Back to Dashboard</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedPackage(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Dynamic Customizer Controls */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Customize Your Trip
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">
                    Departure City
                  </label>
                  <select
                    value={customOrigin}
                    onChange={e => setCustomOrigin(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800"
                  >
                    {AIRPORTS.map(a => (
                      <option key={a.code} value={a.code}>
                        {a.city} ({a.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">
                    Travelers Count
                  </label>
                  <select
                    value={customTravelers}
                    onChange={e => setCustomTravelers(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800"
                  >
                    <option value={1}>1 Solo Traveler</option>
                    <option value={2}>2 Adults (1 Room)</option>
                    <option value={3}>3 Adults (2 Rooms)</option>
                    <option value={4}>4 Adults (2 Rooms)</option>
                    <option value={6}>6 Adults (3 Rooms)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">
                    Hotel Category
                  </label>
                  <select
                    value={customTier}
                    onChange={e => setCustomTier(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800"
                  >
                    <option value="budget">Budget (₹{selectedPackage.estimatedHotelCostPerNight.budget}/nt)</option>
                    <option value="standard">Standard (₹{selectedPackage.estimatedHotelCostPerNight.standard}/nt)</option>
                    <option value="premium">Premium (₹{selectedPackage.estimatedHotelCostPerNight.premium}/nt)</option>
                    <option value="luxury">Luxury (₹{selectedPackage.estimatedHotelCostPerNight.luxury}/nt)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Itemized Budget Breakdown Card */}
            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                  Itemized Transparent Estimate ({customTravelers} Travelers, {selectedPackage.durationDays}D/{selectedPackage.durationNights}N)
                </span>
                <span className="text-base font-extrabold text-blue-700">
                  ₹ {activeCost.totalEstimatedTripCost.toLocaleString('en-IN')} Total
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs divide-x divide-blue-200/50">
                <div className="p-1">
                  <span className="text-slate-500 text-[10px] block">Flights Est.</span>
                  <span className="font-bold text-slate-800">
                    ₹ {activeCost.totalFlights.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-1 pl-3">
                  <span className="text-slate-500 text-[10px] block">Hotel ({activeCost.roomsNeeded} R, {selectedPackage.durationNights} N)</span>
                  <span className="font-bold text-slate-800">
                    ₹ {activeCost.totalHotel.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-1 pl-3">
                  <span className="text-slate-500 text-[10px] block">Meals & Sightseeing</span>
                  <span className="font-bold text-slate-800">
                    ₹ {activeCost.totalFoodAndActivities.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-1 pl-3">
                  <span className="text-slate-500 text-[10px] block">Per Person</span>
                  <span className="font-bold text-emerald-700">
                    ₹ {activeCost.perPersonCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-3">
                Day-by-Day Itinerary
              </h3>
              <div className="space-y-3">
                {selectedPackage.itinerary.map(day => (
                  <div
                    key={day.day}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>Day {day.day}: {day.title}</span>
                      <span className="text-[10px] text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded-md">
                        Stay: {day.stayLocation}
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1 text-slate-600">
                      {day.activities.map((act, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions and Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <span className="font-bold text-emerald-900 block mb-1">What's Included:</span>
                <ul className="space-y-1 text-slate-600">
                  {selectedPackage.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-center space-x-1">
                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                <span className="font-bold text-rose-900 block mb-1">Exclusions:</span>
                <ul className="space-y-1 text-slate-600">
                  {selectedPackage.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-center space-x-1">
                      <span className="text-rose-500 font-bold shrink-0">✕</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Confirmation Banner */}
            {enquirySuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-semibold space-y-1">
                <p>✓ Customized itinerary saved! Estimated booking quote sent for {customTravelers} guests.</p>
                <p className="text-[11px] font-normal text-emerald-700">
                  You can now book flights from {customOrigin} to {selectedPackage.nearestAirportCode} on our official portal.
                </p>
              </div>
            ) : null}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
              {onSearchFlightsForDestination && (
                <button
                  type="button"
                  onClick={() => {
                    onSearchFlightsForDestination(selectedPackage.nearestAirportCode);
                    setSelectedPackage(null);
                  }}
                  className="w-full sm:flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Search Flights to {selectedPackage.nearestAirportCode}
                </button>
              )}

              <button
                type="button"
                onClick={() => setEnquirySuccess(true)}
                className="w-full sm:flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 flex items-center justify-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm & Plan This Package</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
