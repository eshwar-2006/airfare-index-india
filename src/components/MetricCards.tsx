import React from 'react';
import {
  Gauge,
  IndianRupee,
  ArrowDownToLine,
  ArrowUpToLine,
  PlaneTakeoff,
  Database
} from 'lucide-react';
import { MAIN_DASHBOARD_METRICS, MetricCardData } from '../data/historicalData';

interface MetricCardsProps {
  metrics?: MetricCardData[];
  isRefreshing?: boolean;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  metrics = MAIN_DASHBOARD_METRICS,
  isRefreshing = false
}) => {
  const displayMetrics = metrics && metrics.length > 0 ? metrics : MAIN_DASHBOARD_METRICS;

  const getIcon = (type: MetricCardData['iconType'], colorTheme: MetricCardData['colorTheme']) => {
    switch (type) {
      case 'gauge':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Gauge className="w-5 h-5" />
          </div>
        );
      case 'rupee':
        return (
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <IndianRupee className="w-5 h-5" />
          </div>
        );
      case 'lowest':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ArrowDownToLine className="w-5 h-5" />
          </div>
        );
      case 'highest':
        return (
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <ArrowUpToLine className="w-5 h-5" />
          </div>
        );
      case 'plane':
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <PlaneTakeoff className="w-5 h-5" />
          </div>
        );
      case 'database':
        return (
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4 transition-opacity duration-300 ${isRefreshing ? 'opacity-90' : 'opacity-100'}`}>
      {displayMetrics.map(metric => {
        return (
          <div
            key={metric.id}
            className="bg-white rounded-xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between relative group"
          >
            {/* Header: Icon & Label */}
            <div className="flex items-center space-x-2.5">
              {getIcon(metric.iconType, metric.colorTheme)}
              <span className="text-xs font-medium text-slate-500 leading-snug">
                {metric.label}
              </span>
            </div>

            {/* Main Value */}
            <div className="mt-3">
              <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {metric.value}
              </div>

              {/* Trend Rate */}
              <div
                className={`mt-1 text-[11px] font-medium flex items-center ${
                  metric.isPositive ? 'text-emerald-600' : 'text-rose-500'
                }`}
              >
                <span>{metric.change}</span>
              </div>
            </div>

            {/* Footer / Timestamp */}
            <div className="mt-2.5 pt-2 border-t border-slate-50 text-[10px] text-slate-400">
              {metric.timestamp}
            </div>
          </div>
        );
      })}
    </div>
  );
};
