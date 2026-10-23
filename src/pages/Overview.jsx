import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  Package, 
  Clock, 
  Zap, 
  AlertTriangle, 
  Layers, 
  Cpu, 
  Activity, 
  RotateCcw, 
  CheckCircle2, 
  Filter, 
  Sparkles 
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import KpiCard from '../components/KpiCard';
import ChartCard from '../components/ChartCard';
import CustomTooltip from '../components/CustomTooltip';
import { useAnalytics } from '../context/AnalyticsContext';

const PIE_COLORS = ['#D6FF3F', '#48E5E0', '#FF6B57', '#A78BFA'];

// Verified dataset benchmarks matching PySpark aggregates
const BENCHMARK_MATRIX = [
  {
    key: 'Electric Scooter',
    type: 'vehicle',
    name: 'Electric Scooter',
    volume: '3,814 (8.4%)',
    orders: 3814,
    meanTime: '24.47 min',
    delta: '-1.82 min (-6.9%)',
    status: 'Optimal',
    statusColor: 'bg-[#D6FF3F]/10 text-[#D6FF3F] border-[#D6FF3F]/30',
    deltaColor: 'text-[#D6FF3F]'
  },
  {
    key: 'Scooter',
    type: 'vehicle',
    name: 'Scooter',
    volume: '15,276 (33.5%)',
    orders: 15276,
    meanTime: '24.48 min',
    delta: '-1.81 min (-6.9%)',
    status: 'Optimal',
    statusColor: 'bg-[#48E5E0]/10 text-[#48E5E0] border-[#48E5E0]/30',
    deltaColor: 'text-[#48E5E0]'
  },
  {
    key: 'Motorcycle',
    type: 'vehicle',
    name: 'Motorcycle',
    volume: '26,435 (58.0%)',
    orders: 26435,
    meanTime: '27.61 min',
    delta: '+1.32 min (+5.0%)',
    status: 'High Friction',
    statusColor: 'bg-[#FF6B57]/10 text-[#FF6B57] border-[#FF6B57]/30',
    deltaColor: 'text-[#FF6B57]'
  },
  {
    key: 'Bicycle',
    type: 'vehicle',
    name: 'Bicycle',
    volume: '68 (0.15%)',
    orders: 68,
    meanTime: '26.43 min',
    delta: '+0.14 min (+0.5%)',
    status: 'Eco Direct',
    statusColor: 'bg-[#A78BFA]/10 text-[#A78BFA] border-[#A78BFA]/30',
    deltaColor: 'text-[#A78BFA]'
  },
  {
    key: 'Semi-Urban',
    type: 'city',
    name: 'Semi-Urban Corridor',
    volume: '164 (0.4%)',
    orders: 164,
    meanTime: '49.73 min',
    delta: '+23.44 min (+89.2%)',
    status: 'Critical Delay',
    statusColor: 'bg-[#FF6B57]/10 text-[#FF6B57] border-[#FF6B57]/30',
    deltaColor: 'text-[#FF6B57]'
  }
];

export default function Overview() {
  const { datasets, kpis, filters, updateFilter, resetFilters } = useAnalytics();

  const trafficData = datasets.traffic || [];
  const vehicleData = datasets.vehicle || [];
  const weatherData = datasets.weather || [];

  const activeVehicle = filters.vehicle !== 'All' ? filters.vehicle : null;
  const activeTraffic = filters.traffic !== 'All' ? filters.traffic : null;

  return (
    <div className="space-y-8">
      {/* Editorial Hero Section with 3D Visual Asset */}
      <HeroSection />

      {/* Active Filter Feedback Banner (Shows when navbar filter is applied) */}
      {kpis.isFiltered && (
        <div className="bg-[#19192A] border-2 border-[#D6FF3F]/50 rounded-2xl p-4 sm:p-5 shadow-xl shadow-[#D6FF3F]/10 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#D6FF3F] text-[#10101B] font-bold flex items-center justify-center font-display text-lg shrink-0 shadow-md shadow-[#D6FF3F]/20">
              ⚡
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#D6FF3F] uppercase tracking-wider">
                  Active Navbar Filter Applied:
                </span>
                <span className="text-xs font-bold font-display px-2.5 py-0.5 rounded-full bg-[#D6FF3F]/20 text-[#D6FF3F] border border-[#D6FF3F]/40">
                  {kpis.filterDescription}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#23233A] text-[#B8B6CC] border border-[#34334B]">
                  Status: {kpis.operationalStatus}
                </span>
              </div>
              <p className="text-xs text-[#B8B6CC] mt-1 leading-relaxed">
                Overview metrics updated from real dataset records: <strong className="text-[#F8F7FF]">{kpis.totalOrders.toLocaleString()} orders</strong>
                {kpis.vehicleSharePercent ? ` (${kpis.vehicleSharePercent}% of total fleet)` : ''} with a mean transit time of{' '}
                <strong className="text-[#D6FF3F] font-mono">{kpis.avgDeliveryMinutes} min</strong>{' '}
                ({kpis.deltaVsFleetSLA >= 0 ? `+${kpis.deltaVsFleetSLA}m delay` : `${kpis.deltaVsFleetSLA}m speed gain`} vs 26.29m baseline).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#23233A] hover:bg-[#FF6B57]/20 border border-[#34334B] hover:border-[#FF6B57]/40 text-[#F8F7FF] hover:text-[#FF6B57] rounded-xl text-xs font-mono font-semibold transition-all duration-150"
              title="Clear active navbar filters"
            >
              <RotateCcw size={14} />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      )}

      {/* 4 Luxury KPI Cards — Dynamically reflect filtered cohort */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <h3 className="text-sm font-bold font-display uppercase tracking-wider text-[#B8B6CC] flex items-center gap-2">
            <Activity size={16} className="text-[#D6FF3F]" />
            {kpis.isFiltered ? `Filtered Analytics (${kpis.filterDescription})` : 'Fleet Benchmark Metrics (HDFS Ingest)'}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#D6FF3F] bg-[#D6FF3F]/10 px-2.5 py-1 rounded-lg border border-[#D6FF3F]/20">
              {kpis.isFiltered ? `Cohort N = ${kpis.totalOrders.toLocaleString()} Trips` : 'Total N = 45,593 Trips'}
            </span>
            {kpis.isFiltered && (
              <span className="text-[11px] font-mono text-[#48E5E0] bg-[#48E5E0]/10 px-2 py-1 rounded-lg border border-[#48E5E0]/20">
                {kpis.vehicleSharePercent ? `${kpis.vehicleSharePercent}% of Fleet` : 'Filtered Slice'}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title={kpis.isFiltered ? `${kpis.filterDescription} Volume` : "Total Deliveries Analyzed"}
            value={kpis.totalOrders}
            subtitle={kpis.isFiltered ? `Verified ${kpis.filterDescription} transactions` : "Verified transactions ingested into HDFS"}
            icon={Package}
            color="lime"
            index={0}
          />
          <KpiCard
            title={kpis.isFiltered ? `${kpis.filterDescription} Mean Time` : "Mean Delivery Duration"}
            value={kpis.avgDeliveryMinutes}
            unit="min"
            subtitle={kpis.isFiltered ? `${kpis.deltaVsFleetSLA >= 0 ? '+' : ''}${kpis.deltaVsFleetSLA}m vs 26.29m baseline` : "Overall fleet average latency"}
            icon={Clock}
            color={kpis.deltaVsFleetSLA > 0 ? "coral" : "cyan"}
            index={1}
          />
          <KpiCard
            title="Fastest Recorded Trip"
            value={kpis.minDeliveryMinutes}
            unit="min"
            subtitle={kpis.isFiltered ? `${kpis.filterDescription} fastest boundary` : "Optimal local transit scenario"}
            icon={Zap}
            color="violet"
            index={2}
          />
          <KpiCard
            title="Peak Latency Threshold"
            value={kpis.maxDeliveryMinutes}
            unit="min"
            subtitle={kpis.isFiltered ? `${kpis.filterDescription} ceiling boundary` : "Severe gridlock / weather delays"}
            icon={AlertTriangle}
            color="coral"
            index={3}
          />
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Density Latency */}
        <ChartCard
          title="Delivery Duration by Traffic Congestion Tier"
          subtitle="Mean minutes across roadway congestion levels"
          headerRight={
            activeTraffic ? (
              <span className="text-[11px] font-mono text-[#D6FF3F] bg-[#D6FF3F]/10 px-2 py-0.5 rounded border border-[#D6FF3F]/30">
                Selected: {activeTraffic}
              </span>
            ) : null
          }
          interpretation={{
            measuring: 'Average delivery time (in minutes) under Low, Medium, High, and Jam traffic conditions.',
            shows: 'Delivery times rise from 21.27 min in Low traffic to 31.18 min during Jams (+46.6% delay).',
            whyMatters: 'Demonstrates the quantitative penalty of gridlock and guides dynamic courier dispatching.'
          }}
        >
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 15, right: 10, left: -10, bottom: 5 }}>
                <XAxis 
                  dataKey="Road_traffic_density" 
                  stroke="#8E8CA6" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <YAxis 
                  stroke="#8E8CA6" 
                  fontSize={11} 
                  tickLine={false}
                  unit="m"
                  domain={[0, 36]}
                />
                <Tooltip content={<CustomTooltip unit="min" />} />
                <Bar 
                  dataKey="Avg_Delivery_Minutes" 
                  name="Avg Delivery" 
                  radius={[4, 4, 0, 0]} 
                >
                  {trafficData.map((entry, index) => {
                    const isSelected = activeTraffic && entry.Road_traffic_density.toLowerCase() === activeTraffic.toLowerCase();
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={isSelected ? '#D6FF3F' : (activeTraffic ? '#34334B' : '#D6FF3F')} 
                        stroke={isSelected ? '#FFFFFF' : 'none'}
                        strokeWidth={isSelected ? 1.5 : 0}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Vehicle Volume Distribution */}
        <ChartCard
          title="Fleet Order Volume by Transportation Modality"
          subtitle="Proportional demand handled across courier vehicle types"
          headerRight={
            activeVehicle ? (
              <span className="text-[11px] font-mono text-[#D6FF3F] bg-[#D6FF3F]/10 px-2 py-0.5 rounded border border-[#D6FF3F]/30">
                Selected: {activeVehicle}
              </span>
            ) : null
          }
          interpretation={{
            measuring: 'Total orders completed per vehicle category across 45,593 records.',
            shows: 'Motorcycles dominate with 26,435 orders (58%), followed by Scooters (15,276) and Electric Scooters (3,814).',
            whyMatters: 'Identifies modal capacity and targets transitions toward high-efficiency electric scooters.'
          }}
        >
          <div className="h-72 w-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vehicleData}
                  dataKey="Total_Orders"
                  nameKey="Type_of_vehicle"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {vehicleData.map((entry, index) => {
                    const isSelected = activeVehicle && entry.Type_of_vehicle.toLowerCase() === activeVehicle.toLowerCase();
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                        stroke={isSelected ? '#FFFFFF' : '#19192A'}
                        strokeWidth={isSelected ? 3 : 1}
                        style={{
                          filter: isSelected ? 'drop-shadow(0 0 8px rgba(214, 255, 63, 0.6))' : 'none',
                          transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                          transformOrigin: 'center center',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    );
                  })}
                </Pie>
                <Tooltip content={<CustomTooltip unit="orders" />} />
                <Legend 
                  wrapperStyle={{ fontSize: '11px', color: '#B8B6CC', paddingTop: '10px' }} 
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Benchmark Matrix Table — Directly reflecting real dataset findings */}
      <div className="bg-[#19192A] border border-[#34334B] rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="text-base font-bold font-display text-[#F8F7FF] flex items-center gap-2">
              <Layers size={18} className="text-[#A78BFA]" />
              Combined Modality & Geography Performance Matrix
            </h4>
            <p className="text-xs text-[#B8B6CC] mt-0.5">
              Exact analytical findings from PySpark aggregations. Click any row or use the top navbar to filter overview metrics.
            </p>
          </div>

          {activeVehicle && (
            <div className="text-xs font-mono text-[#D6FF3F] bg-[#D6FF3F]/10 px-3 py-1 rounded-lg border border-[#D6FF3F]/30 shrink-0">
              Filtered: {activeVehicle}
            </div>
          )}
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#34334B]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#10101B] border-b border-[#34334B] text-[#8E8CA6] font-mono">
                <th className="p-3 font-medium">Modality / Area</th>
                <th className="p-3 font-medium">Volume (Orders)</th>
                <th className="p-3 font-medium">Mean Transit Time</th>
                <th className="p-3 font-medium">Latency Delta vs SLA</th>
                <th className="p-3 font-medium">Operational Status</th>
                <th className="p-3 font-medium text-right">Quick Filter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#34334B]/60 text-[#B8B6CC]">
              {BENCHMARK_MATRIX.map((row) => {
                const isSelected = activeVehicle && row.name.toLowerCase() === activeVehicle.toLowerCase();
                return (
                  <tr 
                    key={row.key}
                    onClick={() => {
                      if (row.type === 'vehicle') {
                        updateFilter('vehicle', isSelected ? 'All' : row.name);
                      } else if (row.type === 'city') {
                        updateFilter('city', filters.city === 'Semi-Urban' ? 'All' : 'Semi-Urban');
                      }
                    }}
                    className={`cursor-pointer transition-all duration-150 ${
                      isSelected 
                        ? 'bg-[#23233A] border-l-4 border-l-[#D6FF3F] text-[#F8F7FF]' 
                        : 'hover:bg-[#23233A]/50'
                    }`}
                  >
                    <td className="p-3 font-semibold text-[#F8F7FF] flex items-center gap-2">
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#D6FF3F] animate-pulse" />}
                      <span>{row.name}</span>
                    </td>
                    <td className="p-3 font-mono">{row.volume}</td>
                    <td className="p-3 font-mono font-bold text-[#F8F7FF]">{row.meanTime}</td>
                    <td className={`p-3 font-mono font-semibold ${row.deltaColor}`}>{row.delta}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${row.statusColor}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button 
                        className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors ${
                          isSelected 
                            ? 'bg-[#D6FF3F] text-[#10101B] font-bold border-[#D6FF3F]' 
                            : 'bg-[#10101B] text-[#8E8CA6] hover:text-[#F8F7FF] border-[#34334B]'
                        }`}
                      >
                        {isSelected ? 'Active ✕' : 'Filter ➔'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Secondary Row: Weather Speed vs Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Breakdown (2 Cols) */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Atmospheric Conditions vs Delivery Latency"
            subtitle="Comparing clear weather against rain, fog, storms, and sandstorms"
            interpretation={{
              measuring: 'Average delivery duration across 6 meteorological states.',
              shows: 'Sunny weather averages 21.86 min, while Fog and Cloudy conditions peak at 28.92 min (+32.3% delay).',
              whyMatters: 'Enables weather-adaptive delivery SLAs and surge incentive modeling for couriers.'
            }}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={weatherData} 
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 15, bottom: 5 }}
                >
                  <XAxis type="number" stroke="#8E8CA6" fontSize={11} unit="m" domain={[0, 35]} />
                  <YAxis type="category" dataKey="Weatherconditions" stroke="#8E8CA6" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomTooltip unit="min" />} />
                  <Bar dataKey="Avg_Delivery_Minutes" name="Avg Delivery" fill="#A78BFA" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Architecture Pipeline Flow Card (1 Col) */}
        <div className="bg-[#19192A] border border-[#34334B] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D6FF3F] uppercase tracking-wider mb-2 font-mono">
              <Cpu size={14} /> Pipeline Architecture
            </div>
            <h4 className="text-base font-bold font-display text-[#F8F7FF] mb-3">
              HDFS ➔ PySpark ➔ React
            </h4>
            <div className="space-y-2.5 text-xs text-[#B8B6CC]">
              <div className="p-2.5 rounded-lg bg-[#10101B] border border-[#34334B]">
                <div className="font-semibold text-[#F8F7FF] flex items-center justify-between">
                  <span>1. Ingestion Layer</span>
                  <span className="text-[10px] text-[#48E5E0] font-mono">Hadoop HDFS</span>
                </div>
                <div className="text-[11px] text-[#8E8CA6] mt-0.5">45,593 distributed transactional records.</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#10101B] border border-[#34334B]">
                <div className="font-semibold text-[#F8F7FF] flex items-center justify-between">
                  <span>2. Processing Engine</span>
                  <span className="text-[10px] text-[#D6FF3F] font-mono">Apache PySpark</span>
                </div>
                <div className="text-[11px] text-[#8E8CA6] mt-0.5">Distributed MapReduce aggregate computations.</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#10101B] border border-[#34334B]">
                <div className="font-semibold text-[#F8F7FF] flex items-center justify-between">
                  <span>3. Presentation UI</span>
                  <span className="text-[10px] text-[#FF6B57] font-mono">React 19 + Vite</span>
                </div>
                <div className="text-[11px] text-[#8E8CA6] mt-0.5">Sub-second interactive client analytics.</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#34334B] flex items-center justify-between text-xs text-[#8E8CA6]">
            <span>Mean SLA: 26.29m benchmark</span>
            <span className="text-[#D6FF3F] font-mono font-bold">9 Data Marts</span>
          </div>
        </div>
      </div>

      {/* Critical Findings Callout */}
      <div className="bg-[#19192A] border-l-4 border-l-[#D6FF3F] border border-[#34334B] rounded-xl p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#D6FF3F] mb-2 flex items-center gap-1.5 font-mono">
          <span>⚡</span> Faculty Presentation — Key Empirical Findings
        </h4>
        <ul className="text-xs text-[#B8B6CC] space-y-1.5 list-disc list-inside leading-relaxed">
          <li><strong>Electric Scooters & Scooters lead transit velocity:</strong> Delivering in ~24.47–24.48 min, outpacing conventional motorcycles (27.61 min) by over 3.1 minutes per order.</li>
          <li><strong>Traffic Jam Delay (+46.6%):</strong> Severe congestion adds roughly 10 minutes to transit times compared to low-traffic conditions (31.18m vs 21.27m), accounting for 31.0% of demand.</li>
          <li><strong>Atmospheric Resilience:</strong> Fog and cloudy conditions introduce +32.3% delay over clear sunny days (28.92m vs 21.86m), while consumer demand remains highly stable.</li>
        </ul>
      </div>
    </div>
  );
}
