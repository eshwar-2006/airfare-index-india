import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  Bookmark,
  History,
  Plane,
  Palmtree,
  ExternalLink
} from 'lucide-react';
import { AIRPORTS } from '../data/airports';

export interface PriceAlert {
  id: string;
  from: string;
  to: string;
  targetFare: number;
  currentFare: number;
  departDate: string;
  createdDate: string;
  isActive: boolean;
  isTriggered: boolean;
}

export interface SavedTrip {
  id: string;
  type: 'flight' | 'package';
  title: string;
  routeOrDest: string;
  date: string;
  fare: string;
  airlineOrDuration: string;
  link: string;
}

export const PriceAlertsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'alerts' | 'saved' | 'history'>('alerts');

  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: 'alert-1',
      from: 'DEL',
      to: 'BOM',
      targetFare: 3500,
      currentFare: 4250,
      departDate: '2026-10-25',
      createdDate: '15 Oct 2026',
      isActive: true,
      isTriggered: false
    },
    {
      id: 'alert-2',
      from: 'BLR',
      to: 'GOI',
      targetFare: 3200,
      currentFare: 2950,
      departDate: '2026-10-28',
      createdDate: '17 Oct 2026',
      isActive: true,
      isTriggered: true
    },
    {
      id: 'alert-3',
      from: 'DEL',
      to: 'BLR',
      targetFare: 4500,
      currentFare: 5120,
      departDate: '2026-11-04',
      createdDate: '18 Oct 2026',
      isActive: false,
      isTriggered: false
    }
  ]);

  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([
    {
      id: 'saved-1',
      type: 'flight',
      title: 'IndiGo 6E-2041 (Non-stop Morning)',
      routeOrDest: 'DEL → BOM',
      date: '20 Oct 2026',
      fare: '₹ 4,250',
      airlineOrDuration: '2h 10m • Airbus A321neo',
      link: 'https://www.goindigo.in'
    },
    {
      id: 'saved-2',
      type: 'package',
      title: 'Sun, Sand & Sunset Serenity',
      routeOrDest: 'Goa (North & South)',
      date: 'Flexible Nov 2026',
      fare: '₹ 11,800 / person',
      airlineOrDuration: '4D / 3N • Standard Tier',
      link: 'https://www.goatourism.gov.in'
    }
  ]);

  const recentSearches = [
    { from: 'DEL', to: 'BOM', date: '20 Oct 2026', pax: 1, class: 'Economy', time: '10 mins ago' },
    { from: 'BLR', to: 'DEL', date: '24 Oct 2026', pax: 2, class: 'Economy', time: '2 hours ago' },
    { from: 'HYD', to: 'GOI', date: '28 Oct 2026', pax: 1, class: 'Business', time: 'Yesterday' }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFrom, setNewFrom] = useState('DEL');
  const [newTo, setNewTo] = useState('HYD');
  const [newTarget, setNewTarget] = useState(4000);
  const [newDate, setNewDate] = useState('2026-10-30');

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert: PriceAlert = {
      id: `alert-${Date.now()}`,
      from: newFrom,
      to: newTo,
      targetFare: newTarget,
      currentFare: 4400,
      departDate: newDate,
      createdDate: '19 Oct 2026',
      isActive: true,
      isTriggered: 4400 <= newTarget
    };
    setAlerts([newAlert, ...alerts]);
    setIsModalOpen(false);
  };

  const toggleAlert = (id: string) => {
    setAlerts(
      alerts.map(a => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const deleteSavedTrip = (id: string) => {
    setSavedTrips(savedTrips.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Price Alerts & Saved Travel
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              15-Min Scheduled Sweeps
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Automated fare drop monitors, bookmarked flight options, and previous search histories.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-sm shadow-blue-500/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Alert</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-xl p-1 border border-slate-200 text-xs font-semibold text-slate-600 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('alerts')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5 ${
            activeTab === 'alerts' ? 'bg-blue-600 text-white shadow-xs' : 'hover:text-slate-900'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Active Price Alerts ({alerts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5 ${
            activeTab === 'saved' ? 'bg-blue-600 text-white shadow-xs' : 'hover:text-slate-900'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Saved Flights & Packages ({savedTrips.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5 ${
            activeTab === 'history' ? 'bg-blue-600 text-white shadow-xs' : 'hover:text-slate-900'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Search History</span>
        </button>
      </div>

      {/* Tab 1: Active Alerts */}
      {activeTab === 'alerts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`bg-white rounded-2xl p-5 border shadow-xs flex flex-col justify-between transition-all ${
                alert.isTriggered
                  ? 'border-emerald-400 ring-2 ring-emerald-400/20'
                  : 'border-slate-200/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-base font-bold text-slate-900">
                    {alert.from} → {alert.to}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => toggleAlert(alert.id)}
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                      title={alert.isActive ? 'Pause Tracker' : 'Resume Tracker'}
                    >
                      {alert.isActive ? (
                        <ToggleRight className="w-6 h-6 text-blue-600" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-slate-300" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteAlert(alert.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 rounded-md transition-colors"
                      title="Delete Alert"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-500 mt-1">
                  Travel Date: <span className="font-semibold text-slate-700">{alert.departDate}</span>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Threshold:</span>
                    <span className="font-bold text-slate-800">
                      ₹ {alert.targetFare.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current Lowest Live Fare:</span>
                    <span className="font-extrabold text-slate-900">
                      ₹ {alert.currentFare.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  {alert.isTriggered ? (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Target Reached! Fare dropped to ₹ {alert.currentFare}</span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium flex items-center space-x-1.5">
                      <Bell className="w-4 h-4 text-blue-600 shrink-0 animate-bounce" />
                      <span>Checking every 15 min. ₹ {alert.currentFare - alert.targetFare} above threshold.</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
                <span>Created {alert.createdDate}</span>
                <span>Status: {alert.isActive ? 'Active Scheduler' : 'Paused'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Saved Trips */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedTrips.map(trip => (
            <div
              key={trip.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    trip.type === 'flight' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {trip.type === 'flight' ? 'Saved Flight' : 'Saved Holiday Package'}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteSavedTrip(trip.id)}
                    className="p-1 text-slate-400 hover:text-rose-500 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-2">{trip.title}</h3>
                <div className="text-xs text-slate-600 mt-1">{trip.routeOrDest} • {trip.date}</div>
                <div className="text-xs text-slate-400 mt-0.5">{trip.airlineOrDuration}</div>

                <div className="mt-3 text-lg font-extrabold text-blue-700">
                  {trip.fare}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <a
                  href={trip.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold flex items-center space-x-1 hover:bg-blue-700"
                >
                  <span>Open Official Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Search History */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-800">Recent Search Activity</h2>
          <div className="divide-y divide-slate-100 text-xs">
            {recentSearches.map((s, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{s.from} → {s.to}</div>
                    <div className="text-[11px] text-slate-500">{s.date} • {s.pax} Pax • {s.class}</div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400">{s.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Alert Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Create Fare Drop Alert
            </h3>

            <form onSubmit={handleCreateAlert} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    From
                  </label>
                  <select
                    value={newFrom}
                    onChange={e => setNewFrom(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-semibold text-slate-800"
                  >
                    {AIRPORTS.map(a => (
                      <option key={`af-${a.code}`} value={a.code}>
                        {a.city} ({a.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    To
                  </label>
                  <select
                    value={newTo}
                    onChange={e => setNewTo(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-semibold text-slate-800"
                  >
                    {AIRPORTS.filter(a => a.code !== newFrom).map(a => (
                      <option key={`at-${a.code}`} value={a.code}>
                        {a.city} ({a.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Target Price Threshold (INR ₹)
                </label>
                <input
                  type="number"
                  step="200"
                  value={newTarget}
                  onChange={e => setNewTarget(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-bold text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium text-slate-800"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                >
                  Save Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
