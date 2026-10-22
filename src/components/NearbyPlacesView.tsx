import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Utensils,
  Hotel,
  Compass,
  Star,
  Clock,
  ExternalLink,
  Navigation,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { AIRPORTS, getAirport } from '../data/airports';
import { getNearbyPlacesWithin5Km, NearbyPlace } from '../data/nearbyPlaces';

interface NearbyPlacesViewProps {
  initialAirportCode?: string;
}

export const NearbyPlacesView: React.FC<NearbyPlacesViewProps> = ({
  initialAirportCode = 'DEL'
}) => {
  const [selectedAirportCode, setSelectedAirportCode] = useState<string>(initialAirportCode);
  const [filterType, setFilterType] = useState<'all' | 'hotel' | 'restaurant'>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [activePlace, setActivePlace] = useState<NearbyPlace | null>(null);
  const [userLocationStatus, setUserLocationStatus] = useState<string | null>(null);
  const [customCenter, setCustomCenter] = useState<{ lat: number; lng: number } | null>(null);

  const selectedAirport = useMemo(() => {
    return getAirport(selectedAirportCode) || AIRPORTS[0];
  }, [selectedAirportCode]);

  const { places, center } = useMemo(() => {
    return getNearbyPlacesWithin5Km(
      selectedAirportCode,
      customCenter?.lat,
      customCenter?.lng,
      filterType
    );
  }, [selectedAirportCode, customCenter, filterType]);

  const filteredPlaces = useMemo(() => {
    if (dietaryFilter === 'all') return places;
    return places.filter(p =>
      p.dietaryTags?.some(t => t.toLowerCase().includes(dietaryFilter.toLowerCase()))
    );
  }, [places, dietaryFilter]);

  // Request real user geolocation if they wish to center around their live position
  const handleRequestUserLocation = () => {
    if (!navigator.geolocation) {
      setUserLocationStatus('Geolocation is not supported by your browser.');
      return;
    }

    setUserLocationStatus('Detecting coordinates...');
    navigator.geolocation.getCurrentPosition(
      pos => {
        setCustomCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setUserLocationStatus(`Live GPS locked (${pos.coords.latitude.toFixed(3)}°, ${pos.coords.longitude.toFixed(3)}°)`);
      },
      err => {
        setUserLocationStatus('Location permission denied. Using selected airport coordinates.');
        setCustomCenter(null);
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Location Selector */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Nearby Hotels & Restaurants
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Strict 5 km Radius
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover verified accommodation and authentic dining within 5.0 km of your arrival airport.
          </p>
        </div>

        {/* Airport Picker & GPS Button */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <div className="w-full sm:w-60">
            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
              Select Airport Center
            </label>
            <select
              value={selectedAirportCode}
              onChange={e => {
                setSelectedAirportCode(e.target.value);
                setCustomCenter(null);
                setUserLocationStatus(null);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {AIRPORTS.map(a => (
                <option key={a.code} value={a.code}>
                  {a.city} ({a.code}) — {a.name.slice(0, 24)}...
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleRequestUserLocation}
            className="w-full sm:w-auto mt-4 sm:mt-4 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold border border-slate-200 flex items-center justify-center space-x-1.5 transition-colors"
            title="Use current GPS location"
          >
            <Compass className="w-4 h-4 text-blue-600" />
            <span>Use My GPS</span>
          </button>
        </div>
      </div>

      {userLocationStatus && (
        <div className="px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-center justify-between">
          <span>{userLocationStatus}</span>
          {customCenter && (
            <button
              onClick={() => {
                setCustomCenter(null);
                setUserLocationStatus(null);
              }}
              className="text-blue-600 underline text-[11px] font-semibold"
            >
              Reset to Airport
            </button>
          )}
        </div>
      )}

      {/* Interactive Map Visualizer */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Navigation className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-800">
              Interactive 5 km Geographic Radar Map
            </h2>
          </div>
          <span className="text-[11px] text-slate-400">
            Center: {selectedAirport.name} ({center.lat.toFixed(4)}° N, {center.lng.toFixed(4)}° E)
          </span>
        </div>

        {/* Radar Map Canvas Representation */}
        <div className="relative w-full h-64 sm:h-80 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
          {/* Concentric distance rings (1km, 3km, 5km) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 320">
            <defs>
              <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
              </radialGradient>
            </defs>

            {/* Radar glow */}
            <rect width="600" height="320" fill="url(#radarGlow)" />

            {/* Crosshairs */}
            <line x1="300" y1="20" x2="300" y2="300" stroke="#334155" strokeDasharray="3 3" />
            <line x1="40" y1="160" x2="560" y2="160" stroke="#334155" strokeDasharray="3 3" />

            {/* 1 km circle */}
            <circle cx="300" cy="160" r="40" fill="none" stroke="#1e293b" strokeWidth="1" />
            <text x="345" y="155" fill="#64748b" fontSize="9">1.5 km</text>

            {/* 3 km circle */}
            <circle cx="300" cy="160" r="85" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
            <text x="390" y="155" fill="#64748b" fontSize="9">3.0 km</text>

            {/* 5 km Maximum Radius Perimeter */}
            <circle cx="300" cy="160" r="130" fill="#3b82f6" fillOpacity="0.05" stroke="#3b82f6" strokeWidth="2" />
            <text x="435" y="155" fill="#60a5fa" fontSize="10" fontWeight="bold">5.0 km Boundary</text>

            {/* Airport Runway Center Marker */}
            <g transform="translate(300, 160)">
              <circle r="10" fill="#2563eb" className="animate-ping opacity-30" />
              <circle r="7" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="20" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                {selectedAirportCode} Terminal
              </text>
            </g>

            {/* Place Markers plotted proportionally from center */}
            {filteredPlaces.map((p, idx) => {
              // Plot coordinates relative to center
              const dLat = (p.lat - center.lat) * 111; // ~111 km per degree lat
              const dLng = (p.lng - center.lng) * 111 * Math.cos((center.lat * Math.PI) / 180);
              // Scale to radar radius (130px = 5.0km => 26px per km)
              const scale = 24;
              const posX = 300 + dLng * scale;
              const posY = 160 - dLat * scale;

              const isHotel = p.type === 'hotel';
              const markerColor = isHotel ? '#8b5cf6' : '#f59e0b';

              return (
                <g
                  key={p.id}
                  transform={`translate(${posX}, ${posY})`}
                  className="cursor-pointer group"
                  onClick={() => setActivePlace(p)}
                >
                  <circle
                    r={activePlace?.id === p.id ? '8' : '5'}
                    fill={markerColor}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="transition-all group-hover:scale-125"
                  />
                  <text
                    x="0"
                    y="-8"
                    fill="#e2e8f0"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="opacity-80 group-hover:opacity-100"
                  >
                    {p.name.slice(0, 14)}.. ({p.distanceKm} km)
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map floating controls */}
          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] text-slate-300 flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              <span>Hotels</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Restaurants</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Airport</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Count */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex bg-white rounded-xl p-1 border border-slate-200 text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            All within 5 km ({places.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('hotel')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'hotel'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Hotels Only ({places.filter(p => p.type === 'hotel').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('restaurant')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'restaurant'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Restaurants Only ({places.filter(p => p.type === 'restaurant').length})
          </button>
        </div>

        {/* Dietary tags */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-medium">Dietary:</span>
          <select
            value={dietaryFilter}
            onChange={e => setDietaryFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 outline-none"
          >
            <option value="all">All Cuisines</option>
            <option value="veg">Pure Vegetarian</option>
            <option value="seafood">Coastal Seafood</option>
            <option value="halal">Halal</option>
          </select>
        </div>
      </div>

      {/* Places Cards Grid */}
      {filteredPlaces.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border border-slate-200/90 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No places found within 5 km for this filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No establishments strictly within 5.0 km matched your active filter. Try switching between Hotels and Restaurants or resetting dietary filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilterType('all');
              setDietaryFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors"
          >
            Show All Places within 5 km
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlaces.map(place => (
            <div
              key={place.id}
              className={`bg-white rounded-2xl border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                activePlace?.id === place.id
                  ? 'border-blue-500 ring-2 ring-blue-500/20'
                  : 'border-slate-200/90'
              }`}
            >
            {/* Image Header with Distance & Rating Badges */}
            <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
              <img
                src={place.imageUrl}
                alt={place.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {/* Type Badge */}
              <div className="absolute top-3 left-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${
                    place.type === 'hotel' ? 'bg-purple-600' : 'bg-amber-600'
                  }`}
                >
                  {place.type === 'hotel' ? 'Hotel' : 'Restaurant'}
                </span>
              </div>

              {/* Strict Distance Badge */}
              <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold flex items-center space-x-1 shadow-sm">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>{place.distanceKm} km from runway</span>
              </div>

              {/* Cost Badge */}
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-slate-900 text-xs font-bold shadow-sm">
                {place.estimatedCost}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {place.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs font-bold text-amber-500 ml-2">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{place.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {place.cuisineOrCategory}
                </p>

                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {place.address}
                </p>

                {/* Amenities or Dietary Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {place.amenitiesOrSpecialty.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200 text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {place.dietaryTags?.map((d, idx) => (
                    <span
                      key={`d-${idx}`}
                      className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-2">
                <a
                  href={place.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center space-x-1 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-600" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={place.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center space-x-1 shadow-xs transition-colors"
                >
                  <span>{place.type === 'hotel' ? 'Official Booking' : 'Menu & Reserve'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};
