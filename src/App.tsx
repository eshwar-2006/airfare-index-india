import React, { useState, useEffect } from 'react';
import { Sidebar, NavTab } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { HeroBanner } from './components/HeroBanner';
import { MetricCards } from './components/MetricCards';
import { FlightSearchCard, FlightSearchParams } from './components/FlightSearchCard';
import { DashboardAnalytics } from './components/DashboardAnalytics';
import { FlightResultsView } from './components/FlightResultsView';
import { AirlinesView } from './components/AirlinesView';
import { NearbyPlacesView } from './components/NearbyPlacesView';
import { HolidayPackagesView } from './components/HolidayPackagesView';
import { SmartBudgetView } from './components/SmartBudgetView';
import { RouteAnalysisView } from './components/RouteAnalysisView';
import { HistoricalDataView } from './components/HistoricalDataView';
import { PriceAlertsView } from './components/PriceAlertsView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { AirportsView } from './components/AirportsView';
import { MobileAppView } from './components/MobileAppView';
import { BackToDashboard } from './components/BackToDashboard';
import { VerifiedRafiView } from './components/VerifiedRafiView';
import { SavedTripsView } from './components/SavedTripsView';
import { SearchHistoryView } from './components/SearchHistoryView';
import { LiveIndexView } from './components/LiveIndexView';
import { AuthModal } from './components/AuthModal';
import { searchFlights, Flight } from './data/flights';
import { authService, User } from './services/authService';
import { useLiveTelemetry } from './hooks/useLiveTelemetry';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileDeviceMode, setIsMobileDeviceMode] = useState(false);

  // Real-Time Airfare Telemetry Engine & Automatic 30s Polling
  const {
    telemetry,
    isInitialLoading,
    isRefreshing,
    error: telemetryError,
    lastUpdated,
    isStale,
    manualRefresh
  } = useLiveTelemetry();

  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const existing = authService.getCurrentUser();
    if (existing) return existing;
    // Default logged in user matching reference screenshots (Kathroth Eeshwar, Admin)
    return {
      id: 'usr-admin-1',
      email: 'admin@airfareindex.in',
      name: 'Kathroth Eeshwar',
      role: 'admin',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      lastLogin: 'Today, 10:31 AM'
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'profile'>('login');
  const [adminAuthPrompt, setAdminAuthPrompt] = useState(false);

  // Validate active session token against server on load
  useEffect(() => {
    authService.verifySession().then(verifiedUser => {
      if (verifiedUser) {
        setCurrentUser(verifiedUser);
      }
    });
  }, []);

  // Flight search active query and results
  const [currentSearchParams, setCurrentSearchParams] = useState<FlightSearchParams>({
    tripType: 'one-way',
    from: 'DEL',
    to: 'BOM',
    departDate: '2026-10-20',
    returnDate: '2026-10-24',
    passengers: 1,
    cabinClass: 'Economy'
  });
  const [currentSearchResults, setCurrentSearchResults] = useState<Flight[]>(() =>
    searchFlights('DEL', 'BOM', '2026-10-20', 1, 'Economy')
  );
  const [showFlightResults, setShowFlightResults] = useState(false);

  // Contextual destination airport for Nearby 5km feature
  const [nearbyTargetAirport, setNearbyTargetAirport] = useState<string>('DEL');

  const handleFlightSearch = (params: FlightSearchParams) => {
    setCurrentSearchParams(params);
    const results = searchFlights(
      params.from,
      params.to,
      params.departDate,
      params.passengers,
      params.cabinClass
    );
    setCurrentSearchResults(results);
    setShowFlightResults(true);
    setActiveTab('search-flights');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreNearby5Km = (airportCode: string) => {
    setNearbyTargetAirport(airportCode);
    setActiveTab('nearby-5km');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPopularRoute = (from: string, to: string) => {
    const params: FlightSearchParams = {
      tripType: 'one-way',
      from,
      to,
      departDate: '2026-10-20',
      passengers: 1,
      cabinClass: 'Economy'
    };
    handleFlightSearch(params);
  };

  const handleBackToDashboard = () => {
    setActiveTab('home');
    setShowFlightResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (tab: 'login' | 'register' | 'profile' = 'login') => {
    setAuthModalTab(tab);
    setAdminAuthPrompt(false);
    setIsAuthModalOpen(true);
  };

  const handleRequireAdminAuth = () => {
    setAuthModalTab('login');
    setAdminAuthPrompt(true);
    setIsAuthModalOpen(true);
  };

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  const getPageTitle = (tab: NavTab, hasFlightResults: boolean): string => {
    switch (tab) {
      case 'live-index':
        return 'Live Airfare Index / Demo Index';
      case 'verified-rafi':
        return 'Verified RAFI (Real-Time Airfare Price Index)';
      case 'search-flights':
        return hasFlightResults ? 'Flight Search Results' : 'Search Flights';
      case 'route-analysis':
        return 'Route Analysis & Corridor Trends';
      case 'airlines':
        return 'Indian & International Airlines Directory';
      case 'airports':
        return 'Airports & Terminal Directory';
      case 'trends':
        return 'Market Trends & Aviation Insights';
      case 'historical':
        return 'Historical Airfare Data & Indices';
      case 'packages':
        return 'Holiday Packages & Trip Planner';
      case 'nearby-5km':
        return 'Nearby Hotels & Restaurants (5km Radius)';
      case 'smart-budget':
        return 'Smart Budget AI Travel Assistant';
      case 'price-alerts':
        return 'Price Alerts & Drop Monitors';
      case 'saved-trips':
        return 'Saved Trips & Bookmarked Itineraries';
      case 'search-history':
        return 'Search History & Recent Queries';
      case 'admin-dashboard':
        return 'Admin & Pipeline Health Dashboard';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans antialiased">
      {/* Dark Navy Sidebar matching screenshots */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={tab => {
          setActiveTab(tab);
          if (tab === 'search-flights') {
            setShowFlightResults(false);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isMobileOpen={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
        isMobileDeviceMode={isMobileDeviceMode}
        onToggleDeviceMode={() => setIsMobileDeviceMode(!isMobileDeviceMode)}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        lastUpdated={lastUpdated}
      />

      {/* Main Container (offset by sidebar width on desktop) */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <TopBar
          onToggleMobileMenu={() => setIsMobileNavOpen(!isMobileNavOpen)}
          isMobileDeviceMode={isMobileDeviceMode}
          onToggleDeviceMode={() => setIsMobileDeviceMode(!isMobileDeviceMode)}
          onOpenNotifications={() => setActiveTab('price-alerts')}
          currentUser={currentUser}
          onOpenAuth={handleOpenAuth}
          onLogout={handleLogout}
          lastUpdated={lastUpdated}
          onRefresh={manualRefresh}
          isRefreshing={isRefreshing}
          isStale={isStale}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Mobile App View Simulator (matching reference screenshots 1 & 2) */}
          {isMobileDeviceMode ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-center justify-between">
                <span>
                  <strong>Mobile App View Mode:</strong> Interactive mockup of the native mobile phone application featured in Reference Screenshots 1 &amp; 2.
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileDeviceMode(false)}
                  className="px-3 py-1 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 cursor-pointer"
                >
                  Exit to Desktop View
                </button>
              </div>
              <MobileAppView lastUpdated={lastUpdated} />
            </div>
          ) : (
            <>
              {/* Universal "Back to Dashboard" button rendered at top-left of every feature page
                  (Placed immediately below top navigation bar and before the page title.
                   Excluded from the home dashboard itself as requested) */}
              {activeTab !== 'home' && (
                <BackToDashboard
                  onBack={handleBackToDashboard}
                  currentPageTitle={getPageTitle(activeTab, showFlightResults)}
                />
              )}

              {/* HOME DASHBOARD VIEW (Screenshot 3 & Screenshot 1 Desktop) */}
              {activeTab === 'home' && (
                <div className="space-y-6">
                  {/* Hero Banner with Gradient & Airplane Silhouette */}
                  <HeroBanner
                    lastUpdated={lastUpdated}
                    recordsToday={telemetry.recordsToday}
                    onRefresh={manualRefresh}
                    isRefreshing={isRefreshing}
                    isStale={isStale}
                  />

                  {/* 6 Metric Stat Cards */}
                  <MetricCards
                    metrics={telemetry.metrics}
                    isRefreshing={isRefreshing}
                  />

                  {/* Flight Quick Search Panel */}
                  <FlightSearchCard onSearch={handleFlightSearch} />

                  {/* Airfare Index Trend, Donut, Airline Leaders & Insights */}
                  <DashboardAnalytics
                    onSelectRoute={handleSelectPopularRoute}
                    onViewAirlines={() => setActiveTab('airlines')}
                    currentIndex={telemetry.currentIndex}
                    lastSyncTime={telemetry.lastSyncTime}
                    nextScheduledRun={telemetry.nextScheduledRun}
                    trendData7D={telemetry.trendData7D}
                    trendData30D={telemetry.trendData30D}
                    popularRoutes={telemetry.popularRoutes}
                    airlineFareLeaders={telemetry.airlineFareLeaders}
                  />
                </div>
              )}

              {/* LIVE AIRFARE INDEX / DEMO INDEX VIEW */}
              {activeTab === 'live-index' && (
                <LiveIndexView
                  onBackToDashboard={handleBackToDashboard}
                  onSearchRoute={(from, to) => handleSelectPopularRoute(from, to)}
                  telemetry={telemetry}
                  lastUpdated={lastUpdated}
                  onRefresh={manualRefresh}
                  isRefreshing={isRefreshing}
                />
              )}

              {/* VERIFIED RAFI VIEW */}
              {activeTab === 'verified-rafi' && (
                <VerifiedRafiView onBackToDashboard={handleBackToDashboard} />
              )}

              {/* SEARCH FLIGHTS VIEW */}
              {activeTab === 'search-flights' && (
                <div className="space-y-6">
                  {showFlightResults ? (
                    <FlightResultsView
                      searchParams={currentSearchParams}
                      flights={currentSearchResults}
                      onModifySearch={() => setShowFlightResults(false)}
                      onExploreNearby5Km={handleExploreNearby5Km}
                    />
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                          Search Flights across India
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                          Real-time flight search with verified official carrier booking redirects.
                        </p>
                      </div>
                      <FlightSearchCard
                        onSearch={handleFlightSearch}
                        initialParams={currentSearchParams}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* ROUTE ANALYSIS VIEW */}
              {activeTab === 'route-analysis' && <RouteAnalysisView />}

              {/* AIRLINES DIRECTORY VIEW */}
              {activeTab === 'airlines' && (
                <AirlinesView onBackToDashboard={handleBackToDashboard} />
              )}

              {/* AIRPORTS DIRECTORY VIEW */}
              {activeTab === 'airports' && (
                <AirportsView
                  onExploreNearby={handleExploreNearby5Km}
                  onSearchFlightsFrom={code => {
                    handleFlightSearch({
                      tripType: 'one-way',
                      from: code,
                      to: code === 'BOM' ? 'DEL' : 'BOM',
                      departDate: '2026-10-20',
                      passengers: 1,
                      cabinClass: 'Economy'
                    });
                  }}
                />
              )}

              {/* TRENDS & INSIGHTS VIEW */}
              {activeTab === 'trends' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Market Trends &amp; Aviation Insights
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Macro airfare pricing index trends and slot pricing movements.
                    </p>
                  </div>
                  <DashboardAnalytics
                    onSelectRoute={handleSelectPopularRoute}
                    onViewAirlines={() => setActiveTab('airlines')}
                    currentIndex={telemetry.currentIndex}
                    lastSyncTime={telemetry.lastSyncTime}
                    nextScheduledRun={telemetry.nextScheduledRun}
                    trendData7D={telemetry.trendData7D}
                    trendData30D={telemetry.trendData30D}
                    popularRoutes={telemetry.popularRoutes}
                    airlineFareLeaders={telemetry.airlineFareLeaders}
                  />
                </div>
              )}

              {/* HISTORICAL DATA VIEW */}
              {activeTab === 'historical' && <HistoricalDataView />}

              {/* HOLIDAY PACKAGES & TRIP PLANNER */}
              {activeTab === 'packages' && (
                <HolidayPackagesView
                  onSearchFlightsForDestination={destCode => {
                    handleFlightSearch({
                      tripType: 'one-way',
                      from: 'DEL',
                      to: destCode,
                      departDate: '2026-10-22',
                      passengers: 2,
                      cabinClass: 'Economy'
                    });
                  }}
                  onBackToDashboard={handleBackToDashboard}
                />
              )}

              {/* NEARBY 5KM HOTELS & RESTAURANTS */}
              {activeTab === 'nearby-5km' && (
                <NearbyPlacesView initialAirportCode={nearbyTargetAirport} />
              )}

              {/* SMART BUDGET AI RECOMMENDER */}
              {activeTab === 'smart-budget' && <SmartBudgetView />}

              {/* PRICE ALERTS VIEW */}
              {activeTab === 'price-alerts' && <PriceAlertsView />}

              {/* SAVED TRIPS VIEW */}
              {activeTab === 'saved-trips' && (
                <SavedTripsView
                  onBackToDashboard={handleBackToDashboard}
                  onExploreFlights={() => setActiveTab('search-flights')}
                  onExplorePackages={() => setActiveTab('packages')}
                />
              )}

              {/* SEARCH HISTORY VIEW */}
              {activeTab === 'search-history' && (
                <SearchHistoryView
                  onBackToDashboard={handleBackToDashboard}
                  onRepeatSearch={handleFlightSearch}
                />
              )}

              {/* ADMIN DASHBOARD VIEW */}
              {activeTab === 'admin-dashboard' && (
                <AdminDashboardView
                  currentUser={currentUser}
                  onRequireAdminAuth={handleRequireAdminAuth}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onUserChange={user => setCurrentUser(user)}
        initialTab={authModalTab}
        adminRequiredPrompt={adminAuthPrompt}
      />
    </div>
  );
}
