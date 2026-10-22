import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  ExternalLink,
  ShieldCheck,
  Compass,
  MapPin,
  Utensils
} from 'lucide-react';
import { AIRPORTS } from '../data/airports';
import { generateSmartTravelPlans, BudgetPreferences } from '../data/budgetAssistant';

export const SmartBudgetView: React.FC = () => {
  const [prefs, setPrefs] = useState<BudgetPreferences>({
    fromCity: 'DEL',
    toCity: 'BOM',
    departDate: '2026-10-22',
    returnDate: '2026-10-25',
    isRoundTrip: true,
    travelers: 2,
    durationDays: 4,
    totalBudget: 35000,
    hotelCategory: 'standard',
    foodPreference: 'all',
    travelStyle: 'relaxed',
    maxDistanceKm: 5
  });

  const [hasCalculated, setHasCalculated] = useState<boolean>(true);

  const { plans, summaryAnalysis } = useMemo(() => {
    return generateSmartTravelPlans(prefs);
  }, [prefs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              AI Budget-Friendly Travel Recommender
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Optimizer</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Combines verified airfares, vetted hotels within 5 km, and local dining to build 3 side-by-side plans matched to your exact spending budget.
          </p>
        </div>
      </div>

      {/* Input Parameters Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Origin */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                From (Origin)
              </label>
              <select
                value={prefs.fromCity}
                onChange={e => setPrefs({ ...prefs, fromCity: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                {AIRPORTS.map(a => (
                  <option key={`b-from-${a.code}`} value={a.code}>
                    {a.city} ({a.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                To (Destination)
              </label>
              <select
                value={prefs.toCity}
                onChange={e => setPrefs({ ...prefs, toCity: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                {AIRPORTS.filter(a => a.code !== prefs.fromCity).map(a => (
                  <option key={`b-to-${a.code}`} value={a.code}>
                    {a.city} ({a.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Total Budget in INR */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Total Budget (INR ₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xs font-bold text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  min="5000"
                  step="1000"
                  value={prefs.totalBudget}
                  onChange={e => setPrefs({ ...prefs, totalBudget: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-2 text-xs font-bold text-slate-900"
                  required
                />
              </div>
            </div>

            {/* Travelers Count */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Travelers
              </label>
              <select
                value={prefs.travelers}
                onChange={e => setPrefs({ ...prefs, travelers: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                <option value={1}>1 Traveler (Solo)</option>
                <option value={2}>2 Travelers (Couple/Friends)</option>
                <option value={3}>3 Travelers</option>
                <option value={4}>4 Travelers (Family)</option>
              </select>
            </div>

            {/* Trip Duration */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Trip Duration (Days)
              </label>
              <select
                value={prefs.durationDays}
                onChange={e => setPrefs({ ...prefs, durationDays: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                <option value={2}>2 Days / 1 Night (Weekend)</option>
                <option value={3}>3 Days / 2 Nights</option>
                <option value={4}>4 Days / 3 Nights</option>
                <option value={5}>5 Days / 4 Nights</option>
                <option value={7}>7 Days / 6 Nights (Week)</option>
              </select>
            </div>

            {/* Departure Date */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Departure Date
              </label>
              <input
                type="date"
                value={prefs.departDate}
                onChange={e => setPrefs({ ...prefs, departDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
              />
            </div>

            {/* Trip Type */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Flight Journey
              </label>
              <select
                value={prefs.isRoundTrip ? 'round' : 'one-way'}
                onChange={e => setPrefs({ ...prefs, isRoundTrip: e.target.value === 'round' })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                <option value="round">Round Trip (Both ways included)</option>
                <option value="one-way">One Way</option>
              </select>
            </div>

            {/* Hotel Preference */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Hotel Tier (within 5km)
              </label>
              <select
                value={prefs.hotelCategory}
                onChange={e => setPrefs({ ...prefs, hotelCategory: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                <option value="budget">Budget Transit</option>
                <option value="standard">Standard 3-4 Star</option>
                <option value="premium">Premium 5 Star</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-sm shadow-purple-500/30 transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>Optimize Budget Plans</span>
            </button>
          </div>
        </form>
      </div>

      {/* AI Analysis Narrative */}
      <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-white rounded-2xl p-4 sm:p-5 border border-purple-200/80 shadow-xs flex items-start space-x-3">
        <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="text-xs text-slate-700 leading-relaxed">
          <div className="font-bold text-slate-900 mb-0.5">
            Smart Travel Intelligence Summary
          </div>
          <p>{summaryAnalysis}</p>
        </div>
      </div>

      {/* 3 Side-by-Side Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all relative ${
              plan.isRecommended
                ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                : 'border-slate-200/90'
            }`}
          >
            {plan.isRecommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                Recommended Plan
              </div>
            )}

            <div>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {plan.title}
                  </h3>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {plan.badge}
                  </span>
                </div>

                <div className="text-right">
                  <div className="text-xl font-extrabold text-slate-900">
                    ₹ {plan.totalTripCost.toLocaleString('en-IN')}
                  </div>
                  <div
                    className={`text-[10px] font-bold flex items-center justify-end ${
                      plan.budgetStatus === 'within-budget'
                        ? 'text-emerald-600'
                        : 'text-rose-500'
                    }`}
                  >
                    {plan.budgetStatus === 'within-budget' ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-0.5" />
                        <span>Surplus: +₹ {plan.differenceAmount.toLocaleString('en-IN')}</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3 h-3 mr-0.5" />
                        <span>Deficit: -₹ {Math.abs(plan.differenceAmount).toLocaleString('en-IN')}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Itemized Cost Breakdown */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase text-slate-400 block border-b border-slate-200 pb-1">
                  Itemized Cost Breakdown
                </span>

                <div className="flex justify-between">
                  <span className="text-slate-600">
                    Flights ({prefs.travelers} pax{prefs.isRoundTrip ? ', round-trip' : ''}):
                  </span>
                  <span className="font-semibold text-slate-800">
                    ₹ {plan.totalFlightCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">
                    Hotel ({plan.hotelNights} nights, {plan.hotelRooms} room):
                  </span>
                  <span className="font-semibold text-slate-800">
                    ₹ {plan.totalHotelCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">
                    Dining (₹{plan.dailyFoodCostPerPerson}/day/pax):
                  </span>
                  <span className="font-semibold text-slate-800">
                    ₹ {plan.totalFoodCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Local Cabs & Transfers:</span>
                  <span className="font-semibold text-slate-800">
                    ₹ {plan.localTransportCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Sightseeing & Entry Fees:</span>
                  <span className="font-semibold text-slate-800">
                    ₹ {plan.activitiesCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Recommended Components */}
              <div className="mt-3.5 space-y-2.5 text-xs">
                {/* Flight Choice */}
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100">
                  <span className="text-[10px] font-bold uppercase text-blue-600 block">
                    Recommended Flight
                  </span>
                  <div className="font-semibold text-slate-800 mt-0.5">
                    {plan.outboundFlight.airlineName} ({plan.outboundFlight.departureTime} → {plan.outboundFlight.arrivalTime})
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {plan.outboundFlight.duration} • {plan.outboundFlight.stops === 0 ? 'Direct Non-stop' : '1 Stop'}
                  </div>
                </div>

                {/* Hotel Choice within 5km */}
                <div className="p-2.5 rounded-lg bg-purple-50/50 border border-purple-100">
                  <span className="text-[10px] font-bold uppercase text-purple-600 block">
                    Recommended Hotel (&lt; 5 km of Airport)
                  </span>
                  <div className="font-semibold text-slate-800 mt-0.5">
                    {plan.recommendedHotel.name}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-purple-500" />
                    <span>{plan.recommendedHotel.distanceKm} km from runway • {plan.recommendedHotel.rating}★ rating</span>
                  </div>
                </div>
              </div>

              {/* Why Recommended Explanation */}
              <div className="mt-3.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-snug">
                <strong>Why this fits:</strong> {plan.whyRecommended}
              </div>

              {/* Money Saving Tips */}
              <div className="mt-3 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Actionable Tips
                </span>
                <ul className="text-[11px] text-slate-600 space-y-1">
                  {plan.moneySavingTips.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start space-x-1">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
              <a
                href={plan.outboundFlight.verifiedOfficialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center space-x-1 shadow-xs transition-colors"
              >
                <span>Book Flight on Official Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={plan.recommendedHotel.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center space-x-1 transition-colors"
              >
                <span>View {plan.recommendedHotel.name.slice(0, 20)}...</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
