import React from 'react';
import { 
  LayoutDashboard, 
  Gauge, 
  CloudRain, 
  Building2, 
  Bike, 
  CalendarDays, 
  Database, 
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
  { id: 'city-analysis', label: 'City Analysis', icon: Building2 },
  { id: 'vehicle-analysis', label: 'Vehicle Analysis', icon: Bike },
  { id: 'festival-batching', label: 'Festival & Batching', icon: CalendarDays },
  { id: 'data-explorer', label: 'Data Explorer', icon: Database },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const { activeTab, setActiveTab } = useAnalytics();

  return (
    <aside 
      className={`bg-[#0E1528] border-r border-[#233152] transition-all duration-300 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#233152]">
          {!collapsed && (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#38D9F8] to-[#8B7CFF] flex items-center justify-center font-bold text-navy-950 text-sm shadow-md shadow-[#38D9F8]/20 shrink-0">
                ⚡
              </div>
              <div className="truncate">
                <div className="text-sm font-bold text-[#F1F5F9] tracking-tight leading-tight">
                  Food Delivery
                </div>
                <div className="text-[10px] font-semibold text-[#38D9F8] tracking-wider uppercase">
                  Analytics Platform
                </div>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-tr from-[#38D9F8] to-[#8B7CFF] flex items-center justify-center font-bold text-navy-950 text-sm">
              ⚡
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-[#A6B3C8] hover:text-[#F1F5F9] hover:bg-[#1A2540] transition-colors duration-150 hidden md:block"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Technology Pill */}
        {!collapsed && (
          <div className="px-4 py-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#141D32] border border-[#233152] rounded-md text-[11px] font-mono text-[#A6B3C8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
              <span className="truncate">HDFS • PySpark SQL</span>
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
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#1A2540] text-[#38D9F8] font-semibold shadow-inner border border-[#38D9F8]/30'
                    : 'text-[#A6B3C8] hover:text-[#F1F5F9] hover:bg-[#141D32]/80'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} className={isActive ? 'text-[#38D9F8]' : 'text-[#64748B]'} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Cluster Telemetry Footer */}
      {!collapsed ? (
        <div className="p-3 m-3 rounded-lg bg-[#141D32] border border-[#233152] text-[11px]">
          <div className="flex items-center justify-between text-[#A6B3C8] font-semibold uppercase tracking-wider text-[10px] mb-1.5">
            <span className="flex items-center gap-1">
              <Activity size={12} className="text-[#34D399]" /> Cluster Telemetry
            </span>
            <span className="text-[#34D399]">Online</span>
          </div>
          <div className="space-y-1 font-mono text-[#64748B]">
            <div className="flex justify-between">
              <span>Ingested:</span>
              <span className="text-[#F1F5F9]">45,593 rows</span>
            </div>
            <div className="flex justify-between">
              <span>Marts:</span>
              <span className="text-[#F1F5F9]">9 CSV partitions</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 text-center text-[#64748B]" title="Cluster Telemetry Online">
          <Server size={18} className="mx-auto text-[#34D399]" />
        </div>
      )}
    </aside>
  );
}
