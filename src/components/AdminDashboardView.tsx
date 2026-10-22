import React, { useState } from 'react';
import { ShieldCheck, Server, RefreshCw, CheckCircle, Activity, HardDrive, Cpu, Terminal } from 'lucide-react';
import { ADMIN_STATS } from '../data/historicalData';

import { authService, User } from '../services/authService';

interface AdminDashboardViewProps {
  currentUser?: User | null;
  onRequireAdminAuth?: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  currentUser,
  onRequireAdminAuth
}) => {
  const [jobs, setJobs] = useState(ADMIN_STATS.recentJobs);
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestionMessage, setIngestionMessage] = useState<string | null>(null);

  const isAdmin = currentUser?.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs text-center max-w-xl mx-auto space-y-4 my-8">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-bold text-slate-900">Administrator Access Required</h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            The Airfare Index India Administrative &amp; Pipeline Dashboard is restricted to authenticated
            system engineers and aviation data administrators. Unauthorized requests to server pipeline endpoints are rejected with HTTP 401/403.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={onRequireAdminAuth}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              Authenticate as Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleRunIngestion = async () => {
    setIsIngesting(true);
    setIngestionMessage('Ingestion pipeline initiated via server-authorized API...');

    try {
      const res = await authService.triggerAdminIngest();
      if (res.success && res.job) {
        setJobs(prev => [res.job, ...prev]);
        setIngestionMessage(`✓ ${res.message}`);
      } else {
        setIngestionMessage(`✕ Operation failed: ${res.error || 'Server rejected ingestion request.'}`);
      }
    } catch {
      setIngestionMessage('✕ Network error executing ingestion sweep.');
    } finally {
      setIsIngesting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Admin & Pipeline Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Super Admin Mode
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            System uptime, airfare ingestion telemetry, caching layers, and scheduled crawler workers.
          </p>
        </div>

        <button
          type="button"
          disabled={isIngesting}
          onClick={handleRunIngestion}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-sm shadow-blue-500/20 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isIngesting ? 'animate-spin' : ''}`} />
          <span>{isIngesting ? 'Ingesting Data...' : 'Run Ingestion Now'}</span>
        </button>
      </div>

      {ingestionMessage && (
        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 font-semibold flex items-center justify-between">
          <span>{ingestionMessage}</span>
        </div>
      )}

      {/* System Health Cards */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
          System Health & Services
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500">API Gateway</div>
              <div className="text-sm font-bold text-slate-800">{ADMIN_STATS.systemHealth.api.status}</div>
              <div className="text-[10px] text-emerald-600">{ADMIN_STATS.systemHealth.api.uptime} uptime</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Data Scrapers</div>
              <div className="text-sm font-bold text-slate-800">{ADMIN_STATS.systemHealth.scrapers.status}</div>
              <div className="text-[10px] text-blue-600">{ADMIN_STATS.systemHealth.scrapers.rate}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Redis Cache</div>
              <div className="text-sm font-bold text-slate-800">{ADMIN_STATS.systemHealth.cache.status}</div>
              <div className="text-[10px] text-purple-600">{ADMIN_STATS.systemHealth.cache.hitRate} hit rate</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500">Index Database</div>
              <div className="text-sm font-bold text-slate-800">{ADMIN_STATS.systemHealth.database.status}</div>
              <div className="text-[10px] text-cyan-600">{ADMIN_STATS.systemHealth.database.latency} latency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Scrapes Completed Today</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {ADMIN_STATS.keyMetrics.scrapesToday.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Active Monitored Routes</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {ADMIN_STATS.keyMetrics.activeRoutes.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Fare Drop Alerts Sent</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {ADMIN_STATS.keyMetrics.alertsSent.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Telemetry Points</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {ADMIN_STATS.keyMetrics.totalDataPoints.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Data Collection Jobs Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800">
            Recent Data Ingestion Tasks
          </h2>
          <span className="text-xs text-slate-400">Auto-polls every 15 mins</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Job ID</th>
                <th className="py-3 px-4">Route Sweep</th>
                <th className="py-3 px-4">Records Added</th>
                <th className="py-3 px-4">Execution Time</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map(job => (
                <tr key={job.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{job.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{job.route}</td>
                  <td className="py-3 px-4 font-bold text-blue-600">{job.records} fares</td>
                  <td className="py-3 px-4 text-slate-500">{job.duration}</td>
                  <td className="py-3 px-4 text-slate-500">{job.time}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
