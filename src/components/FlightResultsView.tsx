import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Tag,
  ExternalLink,
  Luggage,
  MapPin,
  UtensilsCrossed,
  Info,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Flight, evaluateRecommendations, searchFlights } from '../data/flights';
import { FlightSearchParams } from './FlightSearchCard';
import { getAirline } from '../data/airlines';

interface FlightResultsViewProps {
  searchParams: FlightSearchParams;
  flights: Flight[];
  onModifySearch: () => void;
  onExploreNearby5Km: (airportCode: string) => void;
}

export const FlightResultsView: React.FC<FlightResultsViewProps> = ({
  searchParams,
  flights,
  onModifySearch,
  onExploreNearby5Km
}) => {
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [nonStopOnly, setNonStopOnly] = useState<boolean>(false);
  const [selectedAirlineFilter, setSelectedAirlineFilter] = useState<string>('all');
  const [redirectNotice, setRedirectNotice] = useState<{ airline: string; url: string; flightNumber?: string } | null>(null);

  // Round-trip journey selection state
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState<Flight | null>(flights[0] || null);
  
  // Return flights for round-trip
  const returnFlights = useMemo(() => {
    if (searchParams.tripType === 'round-trip' && searchParams.returnDate) {
      return searchFlights(
        searchParams.to,
        searchParams.from,
        searchParams.returnDate,
        searchParams.passengers,
        searchParams.cabinClass
      );
    }
    return [];
  }, [searchParams]);

  const [selectedReturnFlight, setSelectedReturnFlight] = useState<Flight | null>(returnFlights[0] || null);
  const [activeLegTab, setActiveLegTab] = useState<'outbound' | 'return'>('outbound');

  // Active flights to display depending on leg
  const activeFlightSet = activeLegTab === 'outbound' ? flights : returnFlights;

  // Recommendations for active leg
  const recommendations = useMemo(() => {
    return evaluateRecommendations(activeFlightSet);
  }, [activeFlightSet]);

  // Filter & Sort
  const processedFlights = useMemo(() => {
    let result = [...activeFlightSet];

    if (nonStopOnly) {
      result = result.filter(f => f.stops === 0);
    }

    if (selectedAirlineFilter !== 'all') {
      result = result.filter(f => f.airlineId === selectedAirlineFilter);
    }

    if (sortBy === 'price') {
      result.sort((a, b) => a.totalFare - b.totalFare);
    } else if (sortBy === 'duration') {
      result.sort((a, b) => a.durationMinutes - b.durationMinutes);
    } else if (sortBy === 'departure') {
      result.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }

    return result;
  }, [activeFlightSet, nonStopOnly, selectedAirlineFilter, sortBy]);

  const handleBookOfficial = (flight: Flight) => {
    setRedirectNotice({
      airline: flight.airlineName,
      flightNumber: flight.flightNumber,
      url: flight.verifiedOfficialUrl
    });
  };

  const confirmRedirect = () => {
    if (redirectNotice) {
      window.open(redirectNotice.url, '_blank', 'noopener,noreferrer');
      setRedirectNotice(null);
    }
  };

  const totalCombinedFare =
    searchParams.tripType === 'round-trip' && selectedOutboundFlight && selectedReturnFlight
      ? selectedOutboundFlight.totalFare + selectedReturnFlight.totalFare
      : selectedOutboundFlight?.totalFare || processedFlights[0]?.totalFare || 0;

  return (
    <div className="space-y-6">
      {/* Search Header Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <button
            type="button"
            onClick={onModifySearch}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Modify Search"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                {searchParams.from} → {searchParams.to}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {searchParams.tripType === 'round-trip'
                  ? 'Round Trip'
                  : searchParams.tripType === 'multi-city'
                  ? 'Multi-City'
                  : 'One Way'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Depart: <span className="font-medium text-slate-700">{searchParams.departDate}</span>
              {searchParams.returnDate && (
                <> • Return: <span className="font-medium text-slate-700">{searchParams.returnDate}</span></>
              )}
              {' '}• {searchParams.passengers} Traveler{searchParams.passengers > 1 ? 's' : ''} • {searchParams.cabinClass}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={() => onExploreNearby5Km(searchParams.to)}
            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs border border-amber-200/80 flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" />
            <span>Hotels & Food within 5km of {searchParams.to}</span>
          </button>

          <button
            type="button"
            onClick={onModifySearch}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
          >
            Modify Search
          </button>
        </div>
      </div>

      {/* Round-Trip Leg Switcher & Combined Fare Banner */}
      {searchParams.tripType === 'round-trip' && (
        <div className="bg-white rounded-2xl p-4 border border-blue-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveLegTab('outbound')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5 ${
                activeLegTab === 'outbound'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>1. Outbound ({searchParams.from} → {searchParams.to})</span>
              {selectedOutboundFlight && (
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                  ✓ Selected
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveLegTab('return')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5 ${
                activeLegTab === 'return'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>2. Return ({searchParams.to} → {searchParams.from})</span>
              {selectedReturnFlight && (
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                  ✓ Selected
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Total Combined Fare (Round Trip)
              </span>
              <div className="text-lg font-extrabold text-blue-700">
                ₹ {totalCombinedFare.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal text-slate-500">
                  for {searchParams.passengers} traveler{searchParams.passengers > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {selectedOutboundFlight && selectedReturnFlight && (
              <button
                type="button"
                onClick={() => handleBookOfficial(selectedOutboundFlight)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center space-x-1 shadow-sm shadow-blue-500/20"
              >
                <span>Book Round Trip</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Multi-City Itinerary Summary (if multi-city) */}
      {searchParams.tripType === 'multi-city' && searchParams.multiCitySegments && (
        <div className="bg-white rounded-2xl p-4 border border-blue-200 shadow-xs space-y-2">
          <div className="text-xs font-bold text-slate-800">
            Multi-City Itinerary Legs ({searchParams.multiCitySegments.length} Segments)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {searchParams.multiCitySegments.map((seg, idx) => (
              <div key={seg.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
                <div>
                  <span className="font-bold text-blue-600 block">Leg {idx + 1}: {seg.from} → {seg.to}</span>
                  <span className="text-[11px] text-slate-500">{seg.date}</span>
                </div>
                <span className="text-xs font-bold text-slate-900">₹ {(4200 * searchParams.passengers).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Flight for You Showcase */}
      {recommendations && (
        <div className="space-y-2.5">
          <div className="flex items-center space-x-2 px-1">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-800">
              Best Flights for You ({activeLegTab === 'outbound' ? 'Outbound Leg' : 'Return Leg'})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* 1. Best Value */}
            <div className="bg-gradient-to-br from-blue-50/80 to-white rounded-xl p-4 border border-blue-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Best Value</span>
                </span>
                <span className="text-base font-extrabold text-blue-700">
                  ₹ {recommendations.bestValue.totalFare.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-800">
                {recommendations.bestValue.airlineName} ({recommendations.bestValue.flightNumber})
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {recommendations.bestValue.departureTime} → {recommendations.bestValue.arrivalTime} ({recommendations.bestValue.duration})
              </div>
              <p className="text-[11px] text-slate-600 mt-2 bg-white/70 p-2 rounded-lg border border-blue-100 leading-snug">
                {recommendations.bestValueReason}
              </p>
              <button
                type="button"
                onClick={() => {
                  if (activeLegTab === 'outbound') setSelectedOutboundFlight(recommendations.bestValue);
                  else setSelectedReturnFlight(recommendations.bestValue);
                  handleBookOfficial(recommendations.bestValue);
                }}
                className="mt-3 w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
              >
                <span>Select & Book Official</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* 2. Cheapest */}
            <div className="bg-gradient-to-br from-emerald-50/80 to-white rounded-xl p-4 border border-emerald-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white flex items-center space-x-1">
                  <Tag className="w-3 h-3" />
                  <span>Cheapest Flight</span>
                </span>
                <span className="text-base font-extrabold text-emerald-700">
                  ₹ {recommendations.cheapest.totalFare.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-800">
                {recommendations.cheapest.airlineName} ({recommendations.cheapest.flightNumber})
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {recommendations.cheapest.departureTime} → {recommendations.cheapest.arrivalTime} ({recommendations.cheapest.duration})
              </div>
              <p className="text-[11px] text-slate-600 mt-2 bg-white/70 p-2 rounded-lg border border-emerald-100 leading-snug">
                {recommendations.cheapestReason}
              </p>
              <button
                type="button"
                onClick={() => {
                  if (activeLegTab === 'outbound') setSelectedOutboundFlight(recommendations.cheapest);
                  else setSelectedReturnFlight(recommendations.cheapest);
                  handleBookOfficial(recommendations.cheapest);
                }}
                className="mt-3 w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
              >
                <span>Select & Book Official</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* 3. Fastest */}
            <div className="bg-gradient-to-br from-amber-50/80 to-white rounded-xl p-4 border border-amber-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>Fastest Flight</span>
                </span>
                <span className="text-base font-extrabold text-amber-800">
                  ₹ {recommendations.fastest.totalFare.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-800">
                {recommendations.fastest.airlineName} ({recommendations.fastest.flightNumber})
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {recommendations.fastest.departureTime} → {recommendations.fastest.arrivalTime} ({recommendations.fastest.duration})
              </div>
              <p className="text-[11px] text-slate-600 mt-2 bg-white/70 p-2 rounded-lg border border-amber-100 leading-snug">
                {recommendations.fastestReason}
              </p>
              <button
                type="button"
                onClick={() => {
                  if (activeLegTab === 'outbound') setSelectedOutboundFlight(recommendations.fastest);
                  else setSelectedReturnFlight(recommendations.fastest);
                  handleBookOfficial(recommendations.fastest);
                }}
                className="mt-3 w-full py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
              >
                <span>Select & Book Official</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Sort Toolbar */}
      <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-500">Sort by:</span>
          <button
            type="button"
            onClick={() => setSortBy('price')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              sortBy === 'price'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Lowest Price
          </button>
          <button
            type="button"
            onClick={() => setSortBy('duration')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              sortBy === 'duration'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Duration
          </button>
          <button
            type="button"
            onClick={() => setSortBy('departure')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              sortBy === 'departure'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Departure Time
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-1.5 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={nonStopOnly}
              onChange={e => setNonStopOnly(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Non-stop flights only</span>
          </label>

          <select
            value={selectedAirlineFilter}
            onChange={e => setSelectedAirlineFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 outline-none"
          >
            <option value="all">All Airlines</option>
            <option value="indigo">IndiGo</option>
            <option value="air-india">Air India</option>
            <option value="akasa-air">Akasa Air</option>
            <option value="spicejet">SpiceJet</option>
            <option value="air-india-express">Air India Express</option>
          </select>
        </div>
      </div>

      {/* Flight Cards List */}
      <div className="space-y-3">
        {processedFlights.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200/90 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No flights match the selected filters</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are no available flights matching your active combination of airline and non-stop criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setNonStopOnly(false);
                setSelectedAirlineFilter('all');
                setSortBy('price');
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          processedFlights.map(flight => {
          const airlineObj = getAirline(flight.airlineId);
          const isSelectedLeg =
            (activeLegTab === 'outbound' && selectedOutboundFlight?.id === flight.id) ||
            (activeLegTab === 'return' && selectedReturnFlight?.id === flight.id);

          return (
            <div
              key={flight.id}
              className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isSelectedLeg
                  ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                  : 'border-slate-200/80 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Left: Airline Branding & Number */}
              <div className="flex items-center space-x-3.5 min-w-[170px]">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-xs"
                  style={{ backgroundColor: airlineObj?.logoBg || '#2563eb' }}
                >
                  {flight.airlineCode}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">
                    {flight.airlineName}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {flight.flightNumber} • {flight.aircraft}
                  </div>
                </div>
              </div>

              {/* Middle: Departure, Flight Duration Line, Arrival */}
              <div className="flex-1 flex items-center justify-between max-w-md px-2">
                <div className="text-left">
                  <div className="text-lg font-bold text-slate-900 leading-none">
                    {flight.departureTime}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">
                    {flight.from}
                  </div>
                </div>

                <div className="flex-1 px-4 text-center">
                  <div className="text-[11px] font-medium text-slate-500 mb-1">
                    {flight.duration}
                  </div>
                  <div className="relative flex items-center justify-center">
                    <div className="h-0.5 w-full bg-slate-200"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-blue-600"></div>
                  </div>
                  <div className="text-[10px] font-semibold mt-1">
                    {flight.stops === 0 ? (
                      <span className="text-emerald-600">Non-stop</span>
                    ) : (
                      <span className="text-amber-600">{flight.stopDetails || '1 Stop'}</span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900 leading-none">
                    {flight.arrivalTime}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">
                    {flight.to}
                  </div>
                </div>
              </div>

              {/* Baggage & Extras */}
              <div className="hidden lg:flex flex-col text-[11px] text-slate-500 space-y-1">
                <span className="flex items-center space-x-1">
                  <Luggage className="w-3.5 h-3.5 text-slate-400" />
                  <span>Cabin: {flight.baggage.cabin}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Luggage className="w-3.5 h-3.5 text-slate-400" />
                  <span>Check-in: {flight.baggage.checkIn}</span>
                </span>
                {flight.mealIncluded && (
                  <span className="text-emerald-600 font-medium">
                    ✓ Complimentary Meal
                  </span>
                )}
              </div>

              {/* Right: Fare & Official Book Button */}
              <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 min-w-[150px]">
                <div className="text-left md:text-right">
                  <div className="text-xl font-extrabold text-slate-900 leading-tight">
                    ₹ {flight.totalFare.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Total for {searchParams.passengers} pax (incl. taxes)
                  </div>
                </div>

                <div className="mt-2 flex items-center space-x-2">
                  {searchParams.tripType === 'round-trip' && (
                    <button
                      type="button"
                      onClick={() => {
                        if (activeLegTab === 'outbound') setSelectedOutboundFlight(flight);
                        else setSelectedReturnFlight(flight);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        isSelectedLeg
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isSelectedLeg ? '✓ Selected' : 'Select'}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleBookOfficial(flight)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-sm shadow-blue-500/20 flex items-center space-x-1.5 transition-all"
                  >
                    <span>Book Official</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        }))}
      </div>

      {/* Official Booking Confirmation Modal */}
      {redirectNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-base font-bold text-slate-900">
                Official Booking Redirect
              </h3>
              <p className="text-xs text-slate-600 mt-2">
                You are being safely redirected to the verified official booking site of{' '}
                <strong className="text-slate-900">{redirectNotice.airline}</strong>.
              </p>
              <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-mono break-all text-left">
                {redirectNotice.url}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-amber-50 border border-amber-200/80 p-2.5 rounded-xl">
              <p>
                <strong>Transparency Guarantee:</strong> Airfare Index India never charges booking commissions or sells tickets directly. Your route and dates are preserved.
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setRedirectNotice(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmRedirect}
                className="flex-1 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-md shadow-blue-500/20"
              >
                Proceed to Official Site
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
