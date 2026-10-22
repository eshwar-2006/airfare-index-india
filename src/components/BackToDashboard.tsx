import React from 'react';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';

interface BackToDashboardProps {
  onBack: () => void;
  currentPageTitle?: string;
  className?: string;
}

export const BackToDashboard: React.FC<BackToDashboardProps> = ({
  onBack,
  currentPageTitle,
  className = ''
}) => {
  return (
    <div className={`mb-4 flex items-center justify-between ${className}`}>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/90 hover:border-blue-300 text-xs font-semibold shadow-2xs transition-all group active:scale-95 cursor-pointer"
        title="Return to the main Airfare Index India dashboard"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-blue-600 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Dashboard</span>
      </button>

      {currentPageTitle && (
        <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">
          Airfare Index India &rsaquo; {currentPageTitle}
        </span>
      )}
    </div>
  );
};
