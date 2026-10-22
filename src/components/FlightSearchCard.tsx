import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Trash2, Calendar, Users, Briefcase, ArrowLeftRight, MapPin, AlertCircle } from 'lucide-react';
import { AIRPORTS, Airport } from '../data/airports';

export type TripType = 'one-way' | 'round-trip' | 'multi-city';

export interface MultiCitySegment {
  id: string;
  from: string;
  to: string;
  date: string;
}

export interface FlightSearchParams {
  tripType: TripType;
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: string;
  multiCitySegments?: MultiCitySegment[];
}

interface FlightSearchCardProps {
  onSearch: (params: FlightSearchParams) => void;
  initialParams?: Partial<FlightSearchParams>;
}

export const FlightSearchCard: React.FC<FlightSearchCardProps> = ({
  onSearch,
  initialParams
}) => {
  const [tripType, setTripType] = useState<TripType>(initialParams?.tripType || 'one-way');
  const [fromAirport, setFromAirport] = useState<string>(initialParams?.from || 'DEL');
  const [toAirport, setToAirport] = useState<string>(initialParams?.to || 'BOM');
  const [departDate, setDepartDate] = useState<string>(initialParams?.departDate || '2026-10-20');
  const [returnDate, setReturnDate] = useState<string>(initialParams?.returnDate || '2026-10-24');
  const [passengers, setPassengers] = useState<number>(initialParams?.passengers || 1);
  const [cabinClass, setCabinClass] = useState<string>(initialParams?.cabinClass || 'Economy');

  // Autocomplete UI dropdown states
  const [fromSearch, setFromSearch] = useState<string>('');
  const [toSearch, setToSearch] = useState<string>('');
  const [isFromOpen, setIsFromOpen] = useState<boolean>(false);
  const [isToOpen, setIsToOpen] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  // Multi-City segments
  const [segments, setSegments] = useState<MultiCitySegment[]>(
    initialParams?.multiCitySegments || [
      { id: 'seg-1', from: 'DEL', to: 'BOM', date: '2026-10-20' },
      { id: 'seg-2', from: 'BOM', to: 'BLR', date: '2026-10-23' }
    ]
  );

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(e.target as Node)) {
        setIsFromOpen(false);
      }
      if (toRef.current && !toRef.current.contains(e.target as Node)) {
        setIsToOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addSegment = () => {
    if (segments.length >= 5) return;
    const lastSeg = segments[segments.length - 1];
    setSegments([
      ...segments,
      {
        id: `seg-${Date.now()}`,
        from: lastSeg ? lastSeg.to : 'BLR',
        to: 'DEL',
        date: '2026-10-26'
      }
    ]);
  };

  const removeSegment = (id: string) => {
    if (segments.length <= 2) return;
    setSegments(segments.filter(s => s.id !== id));
  };

  const updateSegment = (id: string, field: keyof MultiCitySegment, val: string) => {
    setSegments(
      segments.map(s => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const handleSwapAirports = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
    setValidationError(null);
  };

  const filteredFromAirports = AIRPORTS.filter(
    a =>
      a.city.toLowerCase().includes(fromSearch.toLowerCase()) ||
      a.code.toLowerCase().includes(fromSearch.toLowerCase()) ||
      a.name.toLowerCase().includes(fromSearch.toLowerCase())
  );

  const filteredToAirports = AIRPORTS.filter(
    a =>
      a.city.toLowerCase().includes(toSearch.toLowerCase()) ||
      a.code.toLowerCase().includes(toSearch.toLowerCase()) ||
      a.name.toLowerCase().includes(toSearch.toLowerCase())
  );

  const currentFrom = AIRPORTS.find(a => a.code === fromAirport) || AIRPORTS[0];
  const currentTo = AIRPORTS.find(a => a.code === toAirport) || AIRPORTS[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Origin and Destination must differ
    if (tripType !== 'multi-city' && fromAirport === toAirport) {
      setValidationError('Origin and destination airport cannot be the same. Please choose different airports.');
      return;
    }

    // Validation: Return date must be >= departure date
    if (tripType === 'round-trip' && returnDate < departDate) {
      setValidationError('Return date cannot be earlier than your departure date.');
      return;
    }

    setValidationError(null);
    onSearch({
      tripType,
      from: fromAirport,
      to: toAirport,
      departDate,
      returnDate: tripType === 'round-trip' ? returnDate : undefined,
      passengers,
      cabinClass,
      multiCitySegments: tripType === 'multi-city' ? segments : undefined
    });
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm">
      {/* Trip Type Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
        <button
          type="button"
          onClick={() => {
            setTripType('one-way');
            setValidationError(null);
          }}
          className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            tripType === 'one-way'
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          One Way
        </button>

        <button
          type="button"
          onClick={() => {
            setTripType('round-trip');
            setValidationError(null);
          }}
          className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            tripType === 'round-trip'
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Round Trip
        </button>

        <button
          type="button"
          onClick={() => {
            setTripType('multi-city');
            setValidationError(null);
          }}
          className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            tripType === 'multi-city'
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Multi-City
        </button>
      </div>

      {validationError && (
        <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {tripType !== 'multi-city' ? (
          /* Standard One-way / Round-trip Grid with Autocomplete */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
            {/* From Airport with Autocomplete Dropdown */}
            <div className="space-y-1.5 relative" ref={fromRef}>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                From
              </label>
              <div
                onClick={() => {
                  setIsFromOpen(!isFromOpen);
                  setIsToOpen(false);
                }}
                className="w-full bg-slate-50 hover:bg-slate-100/80 cursor-pointer border border-slate-200 focus:border-blue-600 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between"
              >
                <div className="truncate">
                  <span className="font-bold text-slate-900">{currentFrom.city}</span>{' '}
                  <span className="text-slate-500">({currentFrom.code})</span>
                </div>
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-1" />
              </div>

              {/* Autocomplete Dropdown */}
              {isFromOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-40 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto p-2 space-y-1">
                  <input
                    type="text"
                    placeholder="Type city or IATA code..."
                    value={fromSearch}
                    onChange={e => setFromSearch(e.target.value)}
                    autoFocus
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 mb-1 outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {filteredFromAirports.map(a => (
                    <div
                      key={`from-opt-${a.code}`}
                      onClick={() => {
                        setFromAirport(a.code);
                        setIsFromOpen(false);
                        setFromSearch('');
                        setValidationError(null);
                      }}
                      className="px-2.5 py-1.5 rounded-lg hover:bg-blue-50 cursor-pointer text-xs flex items-center justify-between transition-colors"
                    >
                      <div>
                        <span className="font-bold text-slate-800">{a.city}</span>{' '}
                        <span className="text-slate-500 font-mono">({a.code})</span>
                        <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{a.name}</div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 font-mono text-slate-600 font-semibold">
                        {a.code}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* To Airport with Autocomplete Dropdown */}
            <div className="space-y-1.5 relative" ref={toRef}>
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  To
                </label>
                <button
                  type="button"
                  onClick={handleSwapAirports}
                  className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-0.5"
                >
                  <ArrowLeftRight className="w-2.5 h-2.5" />
                  <span>Swap</span>
                </button>
              </div>

              <div
                onClick={() => {
                  setIsToOpen(!isToOpen);
                  setIsFromOpen(false);
                }}
                className="w-full bg-slate-50 hover:bg-slate-100/80 cursor-pointer border border-slate-200 focus:border-blue-600 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between"
              >
                <div className="truncate">
                  <span className="font-bold text-slate-900">{currentTo.city}</span>{' '}
                  <span className="text-slate-500">({currentTo.code})</span>
                </div>
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-1" />
              </div>

              {/* Autocomplete Dropdown */}
              {isToOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-40 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto p-2 space-y-1">
                  <input
                    type="text"
                    placeholder="Type city or IATA code..."
                    value={toSearch}
                    onChange={e => setToSearch(e.target.value)}
                    autoFocus
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 mb-1 outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {filteredToAirports.map(a => (
                    <div
                      key={`to-opt-${a.code}`}
                      onClick={() => {
                        setToAirport(a.code);
                        setIsToOpen(false);
                        setToSearch('');
                        setValidationError(null);
                      }}
                      className="px-2.5 py-1.5 rounded-lg hover:bg-blue-50 cursor-pointer text-xs flex items-center justify-between transition-colors"
                    >
                      <div>
                        <span className="font-bold text-slate-800">{a.city}</span>{' '}
                        <span className="text-slate-500 font-mono">({a.code})</span>
                        <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{a.name}</div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 font-mono text-slate-600 font-semibold">
                        {a.code}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Departure Date */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Departure Date</span>
              </label>
              <input
                type="date"
                value={departDate}
                min="2026-10-19"
                onChange={e => {
                  setDepartDate(e.target.value);
                  if (returnDate < e.target.value) {
                    setReturnDate(e.target.value);
                  }
                  setValidationError(null);
                }}
                className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-800 transition-colors outline-none"
                required
              />
            </div>

            {/* Return Date (if Round-trip) or Passengers */}
            {tripType === 'round-trip' ? (
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Return Date</span>
                </label>
                <input
                  type="date"
                  value={returnDate}
                  min={departDate || '2026-10-19'}
                  onChange={e => {
                    setReturnDate(e.target.value);
                    setValidationError(null);
                  }}
                  className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-800 transition-colors outline-none"
                  required
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                  <Users className="w-3 h-3 text-slate-400" />
                  <span>Passengers</span>
                </label>
                <select
                  value={passengers}
                  onChange={e => setPassengers(Number(e.target.value))}
                  className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-800 transition-colors outline-none"
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Adults</option>
                  <option value={4}>4 Adults</option>
                  <option value={5}>5 Adults</option>
                </select>
              </div>
            )}

            {/* Cabin Class */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                <Briefcase className="w-3 h-3 text-slate-400" />
                <span>Cabin Class</span>
              </label>
              <select
                value={cabinClass}
                onChange={e => setCabinClass(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-800 transition-colors outline-none"
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>
        ) : (
          /* Multi-City Form Builder */
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-semibold text-slate-700">
                Multi-City Flight Legs
              </span>
              <button
                type="button"
                onClick={addSegment}
                disabled={segments.length >= 5}
                className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-600 hover:text-blue-800 disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Flight Leg</span>
              </button>
            </div>

            {segments.map((seg, idx) => (
              <div
                key={seg.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
              >
                <div className="sm:col-span-1 text-xs font-bold text-slate-500">
                  Leg {idx + 1}
                </div>

                <div className="sm:col-span-4">
                  <select
                    value={seg.from}
                    onChange={e => updateSegment(seg.id, 'from', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                  >
                    {AIRPORTS.map(a => (
                      <option key={`seg-from-${a.code}`} value={a.code}>
                        {a.city} ({a.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <select
                    value={seg.to}
                    onChange={e => updateSegment(seg.id, 'to', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                  >
                    {AIRPORTS.map(a => (
                      <option key={`seg-to-${a.code}`} value={a.code}>
                        {a.city} ({a.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <input
                    type="date"
                    value={seg.date}
                    onChange={e => updateSegment(seg.id, 'date', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-800"
                  />
                </div>

                <div className="sm:col-span-1 flex justify-end">
                  {segments.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeSegment(seg.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-md transition-colors"
                      title="Remove Leg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Passengers
                </label>
                <select
                  value={passengers}
                  onChange={e => setPassengers(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Adults</option>
                  <option value={4}>4 Adults</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Cabin Class
                </label>
                <select
                  value={cabinClass}
                  onChange={e => setCabinClass(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Big Search Flights Button matching screenshot */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 sm:py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-md shadow-blue-500/20 active:scale-[0.99] transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Search Flights</span>
          </button>
        </div>
      </form>
    </div>
  );
};
