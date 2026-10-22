import React from 'react';
import { 
  LayoutDashboard, 
  Gauge, 
  CloudRain, 
  Layers, 
  CalendarDays, 
  Database, 
  BookOpen,
  ChevronLeft, 
  ChevronRight,
  Server,
  Activity
} from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'performance', label: 'Delivery Performance', icon: Gauge },
  { id: 'traffic-weather', label: 'Traffic & Weather', icon: CloudRain },
  { id: 'city-vehicle', label: 'City & Vehicle Analysis', icon: Layers },
  { id: 'festival-batching', label: 'Festival & Batching', icon: CalendarDays },
  { id: 'data-explorer', label: 'Data Explorer', icon: Database },
  { id: 'methodology', label: 'Methodology & Pipeline', icon: BookOpen },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const { activeTab, setActiveTab } = useAnalytics();

  return (
    <aside 
      className={`bg-[#0D0D17] border-r border-[#34334B] transition-all duration-300 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#34334B]">
          {!collapsed && (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-[#D6FF3F] flex items-center justify-center font-bold text-[#10101B] text-sm shadow-md shadow-[#D6FF3F]/20 shrink-0 font-display">
                ⚡
              </div>
              <div className="truncate">
                <div className="text-sm font-bold font-display text-[#F8F7FF] tracking-tight leading-tight">
                  Food Delivery
                </div>
                <div className="text-[10px] font-semibold text-[#D6FF3F] tracking-wider uppercase font-mono">
                  Analytics Platform
                </div>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="w-8 h-8 mx-auto rounded-lg bg-[#D6FF3F] flex items-center justify-center font-bold text-[#10101B] text-sm font-display">
              ⚡
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-[#B8B6CC] hover:text-[#F8F7FF] hover:bg-[#23233A] transition-colors duration-150 hidden md:block"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Technology Pill */}
        {!collapsed && (
          <div className="px-4 py-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#19192A] border border-[#34334B] rounded-md text-[11px] font-mono text-[#B8B6CC]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6FF3F]" />
              <span className="truncate">Apache Hadoop • PySpark</span>
            </div>
          </div>
        )}

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#23233A] text-[#D6FF3F] font-bold border border-[#D6FF3F]/30 shadow-sm'
                    : 'text-[#B8B6CC] hover:text-[#F8F7FF] hover:bg-[#19192A]'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} className={isActive ? 'text-[#D6FF3F]' : 'text-[#64748B]'} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Cluster Telemetry Footer */}
      {!collapsed ? (
        <div className="p-3 m-3 rounded-xl bg-[#19192A] border border-[#34334B] text-[11px]">
          <div className="flex items-center justify-between text-[#B8B6CC] font-semibold uppercase tracking-wider text-[10px] mb-1.5">
            <span className="flex items-center gap-1 font-mono">
              <Activity size={12} className="text-[#D6FF3F]" /> HDFS CLUSTER
            </span>
            <span className="text-[#D6FF3F] font-mono">ACTIVE</span>
          </div>
          <div className="space-y-1 font-mono text-[#8C8A9F]">
            <div className="flex justify-between">
              <span>Ingested Records:</span>
              <span className="text-[#F8F7FF]">45,593</span>
            </div>
            <div className="flex justify-between">
              <span>Data Marts:</span>
              <span className="text-[#F8F7FF]">9 Exported CSVs</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 text-center text-[#8C8A9F]" title="HDFS Ingestion Complete">
          <Server size={18} className="mx-auto text-[#D6FF3F]" />
        </div>
      )}
    </aside>
  );
}
