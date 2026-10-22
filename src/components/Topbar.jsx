import React from 'react';
import { RotateCcw, Filter, CheckCircle2 } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

const VIEW_TITLES = {
  overview: {
    category: 'Big Data Analytics Platform',
    title: 'Executive Logistics Overview',
    subtitle: 'Macroscopic delivery time and transaction volume benchmarks computed with PySpark over Hadoop HDFS.'
  },
  performance: {
    category: 'Courier Diagnostics',
    title: 'Driver Rating & Order Performance',
    subtitle: 'Evaluating correlations between driver service ratings, food preparation classifications, and fulfillment latency.'
  },
  'traffic-weather': {
    category: 'Environmental Stress Testing',
    title: 'Traffic Density & Weather Impact',
    subtitle: 'Quantifying delivery delay variances induced by roadway congestion and adverse meteorological conditions.'
  },
  'city-analysis': {
    category: 'Spatial Geography',
    title: 'Urban Density & Zone Latency',
    subtitle: 'Comparative transit time analysis between urban centers, metropolitan regions, and semi-urban corridors.'
  },
  'vehicle-analysis': {
    category: 'Fleet Operations',
    title: 'Vehicle Modality Dynamics',
    subtitle: 'Speed efficiency, volume allocation, and transit duration across electric scooters, scooters, and motorcycles.'
  },
  'festival-batching': {
    category: 'Bottleneck Diagnostics',
    title: 'Festival Surges & Multiple Deliveries',
    subtitle: 'Impact of cultural calendar surges and the compounding latency curve from multi-order courier bundling.'
  },
  'data-explorer': {
    category: 'HDFS Data Lake Inspector',
    title: 'PySpark Aggregated Data Explorer',
    subtitle: 'Interactive schema inspection, tabular data search, and direct CSV exports for all 9 analytical data marts.'
  }
};

export default function Topbar() {
  const { activeTab, filters, updateFilter, resetFilters, kpis } = useAnalytics();
  const currentView = VIEW_TITLES[activeTab] || VIEW_TITLES.overview;

  return (
    <header className="bg-[#0B1020]/90 backdrop-blur-md border-b border-[#233152] sticky top-0 z-30 px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title & Context */}
        <div>
          <div className="text-[11px] font-semibold text-[#38D9F8] uppercase tracking-wider mb-0.5">
            {currentView.category}
          </div>
          <h1 className="text-xl font-bold text-[#F1F5F9] tracking-tight">
            {currentView.title}
          </h1>
          <p className="text-xs text-[#A6B3C8] mt-0.5 max-w-2xl">
            {currentView.subtitle}
          </p>
        </div>

        {/* Global Controls & Status */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Filters */}
          <div className="flex items-center gap-2 bg-[#141D32] border border-[#233152] rounded-lg px-2.5 py-1.5 text-xs">
            <Filter size={14} className="text-[#38D9F8]" />
            <select
              value={filters.traffic}
              onChange={(e) => updateFilter('traffic', e.target.value)}
              className="bg-transparent text-xs text-[#F1F5F9] focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#141D32]">Traffic: All</option>
              <option value="Low" className="bg-[#141D32]">Traffic: Low</option>
              <option value="Medium" className="bg-[#141D32]">Traffic: Medium</option>
              <option value="High" className="bg-[#141D32]">Traffic: High</option>
              <option value="Jam" className="bg-[#141D32]">Traffic: Jam</option>
            </select>

            <span className="text-[#233152]">|</span>

            <select
              value={filters.vehicle}
              onChange={(e) => updateFilter('vehicle', e.target.value)}
              className="bg-transparent text-xs text-[#F1F5F9] focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#141D32]">Vehicle: All</option>
              <option value="Motorcycle" className="bg-[#141D32]">Motorcycle</option>
              <option value="Scooter" className="bg-[#141D32]">Scooter</option>
              <option value="Electric Scooter" className="bg-[#141D32]">Electric Scooter</option>
              <option value="Bicycle" className="bg-[#141D32]">Bicycle</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          {kpis.isFiltered && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#8B7CFF]/10 border border-[#8B7CFF]/30 text-[#8B7CFF] rounded-lg text-xs font-medium hover:bg-[#8B7CFF]/20 transition-colors"
              title="Reset all active filters"
            >
              <RotateCcw size={13} />
              Reset
            </button>
          )}

          {/* Data Status Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#141D32] border border-[#233152] rounded-lg text-xs font-mono text-[#34D399]">
            <CheckCircle2 size={13} />
            <span>45,593 EVENTS</span>
          </div>
        </div>
      </div>
    </header>
  );
}
