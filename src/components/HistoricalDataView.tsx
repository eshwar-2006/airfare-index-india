import React, { useState } from 'react';
import { Download, Calendar, Filter, Database, TrendingDown, ArrowUpRight } from 'lucide-react';
import { TREND_DATA_30D } from '../data/historicalData';

export const HistoricalDataView: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<'30D' | '90D'>('30D');
  const [selectedRoute, setSelectedRoute] = useState<string>('ALL');

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Date,Index,AverageFare,LowestFare']
        .concat(
          TREND_DATA_30D.map(
            r => `${r.date},${r.index},${r.avgFare},${r.lowFare}`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `airfare_index_historical_${selectedRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Historical Airfare Data
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Archived Telemetry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Historical fare distribution, benchmark indices, and longitudinal airfare volatility archives.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <div className="flex bg-slate-100 rounded-xl p-1 text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setSelectedRange('30D')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedRange === '30D' ? 'bg-white text-blue-600 shadow-xs' : ''
              }`}
            >
              Last 30 Days
            </button>
            <button
              type="button"
              onClick={() => setSelectedRange('90D')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedRange === '90D' ? 'bg-white text-blue-600 shadow-xs' : ''
              }`}
            >
              Last 90 Days
            </button>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-sm shadow-blue-500/20 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 3 Summary metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Period Benchmark Index</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">98.4</div>
          <p className="text-[11px] text-slate-400 mt-1">Historical baseline normalized at 100.0</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Period Mean Ticket Price</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">₹ 5,230</div>
          <p className="text-[11px] text-emerald-600 mt-1">Stabilizing following post-monsoon dips</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Samples Analyzed</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">248,566</div>
          <p className="text-[11px] text-slate-400 mt-1">Across GDS & direct carrier APIs</p>
        </div>
      </div>

      {/* Historical Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800">
            Recorded Daily Price Indices
          </h2>
          <span className="text-xs text-slate-400">Showing all stored records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Composite Airfare Index</th>
                <th className="py-3 px-4">Average Fare</th>
                <th className="py-3 px-4">Lowest Observed Fare</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TREND_DATA_30D.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-800">{item.date} 2026</td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">{item.index}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">₹ {item.avgFare.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-600">₹ {item.lowFare.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Verified
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
