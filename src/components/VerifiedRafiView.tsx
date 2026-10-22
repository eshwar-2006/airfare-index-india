import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  TrendingDown,
  BarChart2,
  Scale,
  Award,
  Layers,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { BackToDashboard } from './BackToDashboard';

interface VerifiedRafiViewProps {
  onBackToDashboard: () => void;
}

export const VerifiedRafiView: React.FC<VerifiedRafiViewProps> = () => {
  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>DGCA Compliant Methodology • Version 3.4</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Verified Real-Time Airfare Price Index (RAFI)
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed">
            The Verified RAFI is India's statistical benchmark for domestic passenger aviation tariffs.
            Calculated across 4,890+ scheduled flights daily, RAFI weights base fares, fuel surcharges,
            and capacity seat factors across Metro Trunk, Regional Tier-2, and Remote UDAN corridors.
          </p>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-blue-50/60 to-transparent pointer-events-none hidden md:block" />
      </div>

      {/* Methodology Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Current RAFI Score</span>
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">96.62</div>
          <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center space-x-1">
            <TrendingDown className="w-3.5 h-3.5 inline" />
            <span>0.5% below 100-baseline</span>
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Trunk Route Weight</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">62.0%</div>
          <p className="text-xs text-slate-500 mt-1">DEL, BOM, BLR, HYD, MAA, CCU</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Confidence Level</span>
            <Scale className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">99.8%</div>
          <p className="text-xs text-slate-500 mt-1">Interquartile trimmed mean filter</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Sample Size</span>
            <BarChart2 className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">248,566</div>
          <p className="text-xs text-slate-500 mt-1">Verified fare points indexed</p>
        </div>
      </div>

      {/* Index Formula & Breakdown */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Mathematical Index Formula</h2>
          <p className="text-xs text-slate-500 mt-1">
            Standardized Paasche-Laspeyres hybrid consumer index adjusted for dynamic airline bucket allocations.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 text-blue-200 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>
            RAFI(t) = 100 × [ Σ ( W_r × P_r,t ) ] / [ Σ ( W_r × P_r,0 ) ]<br />
            Where: W_r = DGCA Route Passenger Volume Weight (2025-2026)<br />
            P_r,t = 10% Trimmed Harmonic Mean Fare for route r on day t<br />
            P_r,0 = Baseline Domestic Reference Fare (₹ 5,270.00)
          </code>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 font-semibold text-slate-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Outlier Elimination</span>
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              Extreme surges caused by last-minute VIP charters or misfiled fare codes are automatically filtered
              using Grubbs' test with an alpha threshold of 0.01.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 font-semibold text-slate-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Real Seat Inventory</span>
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              All prices represent bookable GDS and direct airline web fares including Passenger Service Fees (PSF)
              and User Development Fees (UDF).
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 font-semibold text-slate-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Independent & Unbiased</span>
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              Airfare Index India does not receive commissions or affiliate kickbacks that distort index calculation
              order or weighting algorithms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
