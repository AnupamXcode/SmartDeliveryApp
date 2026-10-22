import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Package, Clock, Zap, AlertTriangle, Layers, ArrowUpRight, Cpu, Server, Activity } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import KpiCard from '../components/KpiCard';
import ChartCard from '../components/ChartCard';
import CustomTooltip from '../components/CustomTooltip';
import { useAnalytics } from '../context/AnalyticsContext';

const PIE_COLORS = ['#D6FF3F', '#48E5E0', '#FF6B57', '#A78BFA'];

export default function Overview() {
  const { datasets, kpis } = useAnalytics();

  const trafficData = datasets.traffic || [];
  const vehicleData = datasets.vehicle || [];
  const weatherData = datasets.weather || [];

  return (
    <div className="space-y-8">
      {/* Editorial Hero Section with 3D Visual Asset */}
      <HeroSection />

      {/* 4 Luxury KPI Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold font-display uppercase tracking-wider text-[#B8B6CC] flex items-center gap-2">
            <Activity size={16} className="text-[#D6FF3F]" />
            Fleet Benchmark Metrics (HDFS Ingest)
          </h3>
          <span className="text-xs font-mono text-[#D6FF3F] bg-[#D6FF3F]/10 px-2 py-0.5 rounded border border-[#D6FF3F]/20">
            N = 45,593 Trips
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Deliveries Analyzed"
            value={kpis.totalOrders}
            subtitle="Verified transactions ingested into HDFS"
            icon={Package}
            color="lime"
            index={0}
          />
          <KpiCard
            title="Mean Delivery Duration"
            value={kpis.avgDeliveryMinutes}
            unit="min"
            subtitle="Overall fleet average latency"
            icon={Clock}
            color="cyan"
            index={1}
          />
          <KpiCard
            title="Minimum Recorded Trip"
            value={kpis.minDeliveryMinutes}
            unit="min"
            subtitle="Optimal local transit scenario"
            icon={Zap}
            color="violet"
            index={2}
          />
          <KpiCard
            title="Peak Latency Threshold"
            value={kpis.maxDeliveryMinutes}
            unit="min"
            subtitle="Severe gridlock / weather delays"
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
                  fill="#D6FF3F" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Vehicle Volume Distribution */}
        <ChartCard
          title="Fleet Order Volume by Transportation Modality"
          subtitle="Proportional demand handled across courier vehicle types"
          interpretation={{
            measuring: 'Total orders completed per vehicle category across 45,593 records.',
            shows: 'Motorcycles dominate with 26,429 orders (58%), followed by Scooters (15,273) and Electric Scooters (3,823).',
            whyMatters: 'Identifies modal capacity and targets transitions toward high-efficiency electric scooters.'
          }}
        >
          <div className="h-72 w-full flex items-center justify-center">
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
                  {vehicleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
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
