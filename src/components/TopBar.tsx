import React from 'react';
import { Menu, Bell, LogOut, Radio, Smartphone, Monitor, User as UserIcon, ShieldCheck, RefreshCw, AlertTriangle } from 'lucide-react';
import { User } from '../services/authService';

interface TopBarProps {
  onToggleMobileMenu: () => void;
  isMobileDeviceMode: boolean;
  onToggleDeviceMode: () => void;
  activeNotificationsCount?: number;
  onOpenNotifications?: () => void;
  currentUser: User | null;
  onOpenAuth: (tab?: 'login' | 'register' | 'profile') => void;
  onLogout: () => void;
  lastUpdated?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  isStale?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  onToggleMobileMenu,
  isMobileDeviceMode,
  onToggleDeviceMode,
  activeNotificationsCount = 2,
  onOpenNotifications,
  currentUser,
  onOpenAuth,
  onLogout,
  lastUpdated = '10:31 am',
  onRefresh,
  isRefreshing = false,
  isStale = false
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Left side: Hamburger for mobile + Live indicator */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Live Data Badge matching Screenshot 3 */}
        <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide text-[11px]">LIVE DATA</span>
          <span className="text-[10px] text-emerald-600/80 hidden md:inline font-normal">
            — {lastUpdated}
          </span>
        </div>

        {isStale && (
          <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-medium">
            <AlertTriangle className="w-3 h-3 text-amber-500" />
            <span>Retaining cached feed</span>
          </span>
        )}

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Force immediate telemetry sync"
            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
            aria-label="Refresh telemetry data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        )}
      </div>

      {/* Right side: Device preview toggle, Notifications, User profile */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Device View switcher button */}
        <button
          onClick={onToggleDeviceMode}
          title={isMobileDeviceMode ? 'Switch to Desktop Layout' : 'View Mobile App Layout (Screenshots 1 & 2)'}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors cursor-pointer"
        >
          {isMobileDeviceMode ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-blue-600" />
              <span>Desktop View</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-blue-600" />
              <span>Mobile App Preview</span>
            </>
          )}
        </button>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Price Alert Notifications"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          {activeNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          )}
        </button>

        {/* Vertical divider */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

        {/* User Account Info or Sign In button */}
        {currentUser ? (
          <div className="flex items-center space-x-2.5">
            <button
              type="button"
              onClick={() => onOpenAuth('profile')}
              className="flex items-center space-x-2.5 text-left hover:opacity-90 transition-opacity cursor-pointer group"
              title="View Account Profile"
            >
              <div className="relative">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20 group-hover:ring-blue-500"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              </div>

              <div className="hidden md:block text-left text-xs leading-tight">
                <div className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {currentUser.name}
                </div>
                <div className="text-[11px] text-slate-400 capitalize flex items-center space-x-1">
                  <span>{currentUser.role}</span>
                  {currentUser.role === 'admin' && (
                    <ShieldCheck className="w-3 h-3 text-blue-600 inline" />
                  )}
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={onLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onOpenAuth('login')}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
