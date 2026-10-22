import React from 'react';
import {
  Home,
  Activity,
  Search,
  GitCommit,
  Plane,
  MapPin,
  TrendingUp,
  History,
  Bell,
  Palmtree,
  UtensilsCrossed,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Monitor,
  BookmarkCheck,
  Clock,
  Award,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { User } from '../services/authService';

export type NavTab =
  | 'home'
  | 'live-index'
  | 'verified-rafi'
  | 'search-flights'
  | 'route-analysis'
  | 'airlines'
  | 'airports'
  | 'trends'
  | 'historical'
  | 'packages'
  | 'nearby-5km'
  | 'smart-budget'
  | 'price-alerts'
  | 'saved-trips'
  | 'search-history'
  | 'admin-dashboard';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  isMobileDeviceMode: boolean;
  onToggleDeviceMode: () => void;
  currentUser?: User | null;
  onOpenAuth?: (tab?: 'login' | 'register' | 'profile') => void;
  lastUpdated?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isMobileOpen,
  onCloseMobile,
  isMobileDeviceMode,
  onToggleDeviceMode,
  currentUser,
  onOpenAuth,
  lastUpdated = '10:31 am'
}) => {
  const mainNavItems: { id: NavTab; label: string; icon: React.ReactNode; isNew?: boolean }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'live-index', label: 'Live Airfare Index', icon: <Activity className="w-4 h-4" /> },
    { id: 'verified-rafi', label: 'Verified RAFI', icon: <Award className="w-4 h-4" /> },
    { id: 'search-flights', label: 'Search Flights', icon: <Search className="w-4 h-4" /> },
    { id: 'route-analysis', label: 'Route Analysis', icon: <GitCommit className="w-4 h-4" /> },
    { id: 'airlines', label: 'Airlines', icon: <Plane className="w-4 h-4" /> },
    { id: 'airports', label: 'Airports', icon: <MapPin className="w-4 h-4" /> },
    { id: 'trends', label: 'Trends & Insights', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'historical', label: 'Historical Data', icon: <History className="w-4 h-4" /> },
    { id: 'packages', label: 'Holiday Packages', icon: <Palmtree className="w-4 h-4" />, isNew: true },
    { id: 'nearby-5km', label: 'Nearby 5km (Hotels & Food)', icon: <UtensilsCrossed className="w-4 h-4" />, isNew: true },
    { id: 'smart-budget', label: 'Smart Budget AI', icon: <Sparkles className="w-4 h-4" />, isNew: true },
    { id: 'price-alerts', label: 'Price Alerts', icon: <Bell className="w-4 h-4" /> }
  ];

  const userNavItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'saved-trips', label: 'Saved Trips', icon: <BookmarkCheck className="w-4 h-4" /> },
    { id: 'search-history', label: 'Search History', icon: <Clock className="w-4 h-4" /> }
  ];

  const adminNavItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: <ShieldCheck className="w-4 h-4" /> }
  ];

  const handleItemClick = (id: NavTab) => {
    onSelectTab(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B132B] text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-slate-800 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header matching screenshot */}
        <div className="p-4 border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
              <Plane className="w-5 h-5 transform -rotate-45" />
            </div>
            <div className="overflow-hidden">
              <h1 className="text-white font-bold text-sm tracking-tight truncate">
                Airfare Index India
              </h1>
              <p className="text-[11px] text-slate-400 truncate">
                Smarter Data. Better Decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 text-xs custom-scrollbar">
          {mainNavItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors font-medium cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.isNew && (
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/30">
                    NEW
                  </span>
                )}
              </button>
            );
          })}

          {/* User Workspace Section */}
          <div className="pt-4 pb-1 px-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              MY TRAVEL WORKSPACE
            </span>
          </div>

          {userNavItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-left transition-colors font-medium cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Admin Section */}
          <div className="pt-4 pb-1 px-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              ADMIN
            </span>
          </div>

          {adminNavItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-left transition-colors font-medium cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Device Mode Switcher, User Account Quick Bar & Footer Status */}
        <div className="p-3 border-t border-slate-800/80 space-y-2">
          {/* Mobile App Preview toggle */}
          <button
            onClick={onToggleDeviceMode}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-slate-200 text-xs border border-slate-700/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              {isMobileDeviceMode ? (
                <Monitor className="w-3.5 h-3.5 text-blue-400" />
              ) : (
                <Smartphone className="w-3.5 h-3.5 text-blue-400" />
              )}
              <span className="text-[11px] font-medium">
                {isMobileDeviceMode ? 'Switch to Desktop Mode' : 'Mobile App View (Screenshot)'}
              </span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 font-mono">
              {isMobileDeviceMode ? 'WEB' : 'APP'}
            </span>
          </button>

          {/* User Status Bar in Sidebar */}
          {currentUser ? (
            <button
              type="button"
              onClick={() => onOpenAuth && onOpenAuth('profile')}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center space-x-2 overflow-hidden">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-blue-500/40"
                />
                <div className="overflow-hidden text-[11px] leading-tight">
                  <div className="font-semibold text-white truncate">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-400 capitalize">{currentUser.role}</div>
                </div>
              </div>
              <span className="text-[10px] text-blue-400 hover:underline">Manage</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOpenAuth && onOpenAuth('login')}
              className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Sign In / Register</span>
            </button>
          )}

          {/* Bottom Live telemetry badge */}
          <div className="bg-slate-950/70 rounded-xl p-2.5 border border-slate-800/80 flex items-center space-x-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="text-[11px] leading-tight">
              <span className="font-semibold text-white">LIVE</span>
              <p className="text-slate-400 text-[10px]">Last updated: {lastUpdated}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
