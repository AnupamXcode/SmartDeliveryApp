import React from 'react';
import { RotateCcw, Filter, CheckCircle2 } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

const VIEW_TITLES = {
  overview: {
    category: 'Big Data Analytics • College Project',
    title: 'Executive Logistics Overview',
    subtitle: 'High-level macroscopic benchmarks across 45,593 delivery transactions processed via PySpark and Hadoop HDFS.'
  },
  performance: {
    category: 'Courier Diagnostics',
    title: 'Driver Rating Correlation & Menu Analytics',
    subtitle: 'Evaluating correlations between courier service ratings, food preparation classifications, and transit latency.'
  },
  'traffic-weather': {
    category: 'Environmental Stress Testing',
    title: 'Traffic Density & Meteorological Impact',
    subtitle: 'Quantifying delivery delay variances induced by roadway congestion tiers and adverse weather conditions.'
  },
  'city-vehicle': {
    category: 'Spatial & Fleet Operations',
    title: 'City Density & Vehicle Modality Dynamics',
    subtitle: 'Comparative transit time analysis between urban zones and fleet velocity across scooters, e-scooters, and motorcycles.'
  },
  'festival-batching': {
    category: 'Bottleneck Diagnostics',
    title: 'Festival Surges & Multiple Delivery Compounding',
    subtitle: 'Impact of cultural calendar surges and the compounding latency curve from multi-order courier bundling.'
  },
  'data-explorer': {
    category: 'HDFS Data Lake Inspector',
    title: 'PySpark Aggregated Data Explorer',
    subtitle: 'Interactive schema inspection, tabular data search, and direct CSV exports for all 9 analytical data marts.'
  },
  methodology: {
    category: 'Academic Defense Guide',
    title: 'Methodology, Big Data Pipeline & Limitations',
    subtitle: 'Technical defense documentation detailing the Hadoop HDFS architecture, PySpark MapReduce transformations, and analytical constraints.'
  }
};

export default function Topbar() {
  const { activeTab, filters, updateFilter, resetFilters, kpis } = useAnalytics();
  const currentView = VIEW_TITLES[activeTab] || VIEW_TITLES.overview;

  return (
    <header className="bg-[#10101B]/95 backdrop-blur-md border-b border-[#34334B] sticky top-0 z-30 px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title & Context */}
        <div>
          <div className="text-[11px] font-semibold text-[#D6FF3F] uppercase tracking-wider mb-0.5 font-mono">
            {currentView.category}
          </div>
          <h1 className="text-xl font-bold font-display text-[#F8F7FF] tracking-tight">
            {currentView.title}
          </h1>
          <p className="text-xs text-[#B8B6CC] mt-0.5 max-w-2xl">
            {currentView.subtitle}
          </p>
        </div>

        {/* Global Controls & Status */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Filters */}
          <div className="flex items-center gap-2 bg-[#19192A] border border-[#34334B] rounded-xl px-3 py-1.5 text-xs">
            <Filter size={13} className="text-[#D6FF3F]" />
            <select
              value={filters.traffic}
              onChange={(e) => updateFilter('traffic', e.target.value)}
              className="bg-transparent text-xs text-[#F8F7FF] focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#19192A]">Traffic: All</option>
              <option value="Low" className="bg-[#19192A]">Traffic: Low</option>
              <option value="Medium" className="bg-[#19192A]">Traffic: Medium</option>
              <option value="High" className="bg-[#19192A]">Traffic: High</option>
              <option value="Jam" className="bg-[#19192A]">Traffic: Jam</option>
            </select>

            <span className="text-[#34334B]">|</span>

            <select
              value={filters.vehicle}
              onChange={(e) => updateFilter('vehicle', e.target.value)}
              className="bg-transparent text-xs text-[#F8F7FF] focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#19192A]">Vehicle: All</option>
              <option value="Motorcycle" className="bg-[#19192A]">Motorcycle</option>
              <option value="Scooter" className="bg-[#19192A]">Scooter</option>
              <option value="Electric Scooter" className="bg-[#19192A]">Electric Scooter</option>
              <option value="Bicycle" className="bg-[#19192A]">Bicycle</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          {kpis.isFiltered && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B57]/10 border border-[#FF6B57]/30 text-[#FF6B57] rounded-xl text-xs font-semibold hover:bg-[#FF6B57]/20 transition-colors"
              title="Reset active filters"
            >
              <RotateCcw size={13} />
              Reset
            </button>
          )}

          {/* Dataset Status */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#19192A] border border-[#34334B] rounded-xl text-xs font-mono text-[#D6FF3F]">
            <CheckCircle2 size={13} />
            <span>45,593 TRANSACTIONS</span>
          </div>
        </div>
      </div>
    </header>
  );
}
