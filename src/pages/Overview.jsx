import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Package, Clock, Zap, AlertTriangle, Layers, ArrowUpRight } from 'lucide-react';
import KpiCard from '../components/KpiCard';
import ChartCard from '../components/ChartCard';
import CustomTooltip from '../components/CustomTooltip';
import { useAnalytics } from '../context/AnalyticsContext';

const PIE_COLORS = ['#38D9F8', '#8B7CFF', '#34D399', '#FBBF24'];

export default function Overview() {
  const { datasets, kpis } = useAnalytics();

  const trafficData = datasets.traffic || [];
  const vehicleData = datasets.vehicle || [];
  const weatherData = datasets.weather || [];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Orders Analyzed"
          value={kpis.totalOrders}
          subtitle="Processed via Hadoop HDFS"
          icon={Package}
          color="cyan"
          index={0}
        />
        <KpiCard
          title="Mean Delivery Latency"
          value={kpis.avgDeliveryMinutes}
          unit="min"
          subtitle="Fleet-wide weighted average"
          icon={Clock}
          color="emerald"
          index={1}
        />
        <KpiCard
          title="Fastest Recorded Trip"
          value={kpis.minDeliveryMinutes}
          unit="min"
          subtitle="Optimal local route conditions"
          icon={Zap}
          color="violet"
          index={2}
        />
        <KpiCard
          title="Peak Delay Threshold"
          value={kpis.maxDeliveryMinutes}
          unit="min"
          subtitle="Severe traffic / weather events"
          icon={AlertTriangle}
          color="rose"
          index={3}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Density Latency */}
        <ChartCard
          title="Delivery Latency by Traffic Congestion Level"
          subtitle="Mean transit minutes across roadway congestion categories"
        >
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 15, right: 10, left: -10, bottom: 5 }}>
                <XAxis 
                  dataKey="Road_traffic_density" 
                  stroke="#64748B" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={11} 
                  tickLine={false}
                  unit="m"
                  domain={[0, 36]}
                />
                <Tooltip content={<CustomTooltip unit="min" />} />
                <Bar 
                  dataKey="Avg_Delivery_Minutes" 
                  name="Avg Delivery" 
                  fill="#38D9F8" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Vehicle Volume Distribution */}
        <ChartCard
          title="Fleet Order Volume by Modality"
          subtitle="Proportional demand handled across transportation categories"
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
                  wrapperStyle={{ fontSize: '11px', color: '#A6B3C8', paddingTop: '10px' }} 
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
            subtitle="Comparing clear weather vs adverse conditions"
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={weatherData} 
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 15, bottom: 5 }}
                >
                  <XAxis type="number" stroke="#64748B" fontSize={11} unit="m" domain={[0, 35]} />
                  <YAxis type="category" dataKey="Weatherconditions" stroke="#64748B" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomTooltip unit="min" />} />
                  <Bar dataKey="Avg_Delivery_Minutes" name="Avg Delivery" fill="#8B7CFF" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Architecture Pipeline Flow Card (1 Col) */}
        <div className="bg-[#141D32] border border-[#233152] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#38D9F8] uppercase tracking-wider mb-2">
              <Layers size={14} /> Pipeline Architecture
            </div>
            <h4 className="text-sm font-semibold text-[#F1F5F9] mb-3">
              HDFS ➔ PySpark ➔ React
            </h4>
            <div className="space-y-2.5 text-xs text-[#A6B3C8]">
              <div className="p-2.5 rounded-lg bg-[#0E1528] border border-[#233152]">
                <div className="font-semibold text-[#F1F5F9] flex items-center justify-between">
                  <span>1. Ingestion Layer</span>
                  <span className="text-[10px] text-[#34D399] font-mono">HDFS</span>
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5">45,593 transactional records partitioned.</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0E1528] border border-[#233152]">
                <div className="font-semibold text-[#F1F5F9] flex items-center justify-between">
                  <span>2. Processing Engine</span>
                  <span className="text-[10px] text-[#38D9F8] font-mono">PySpark</span>
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5">Distributed multi-dimensional aggregations.</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0E1528] border border-[#233152]">
                <div className="font-semibold text-[#F1F5F9] flex items-center justify-between">
                  <span>3. Presentation UI</span>
                  <span className="text-[10px] text-[#8B7CFF] font-mono">React+Vite</span>
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5">High-contrast Recharts analytics client.</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#233152] flex items-center justify-between text-xs text-[#64748B]">
            <span>Latency SLA: 26.29m benchmark</span>
            <span className="text-[#34D399]">9 Data Marts</span>
          </div>
        </div>
      </div>

      {/* Critical Findings Callout */}
      <div className="bg-[#141D32] border-l-4 border-l-[#38D9F8] border border-[#233152] rounded-lg p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#38D9F8] mb-2 flex items-center gap-1.5">
          <span>⚡</span> Empirical Key Observations
        </h4>
        <ul className="text-xs text-[#CBD5E1] space-y-1.5 list-disc list-inside">
          <li><strong>Electric Scooters & Scooters lead transit velocity:</strong> Delivering in ~24.47–24.48 min, outpacing conventional motorcycles (27.61 min) by over 3.1 minutes per order.</li>
          <li><strong>Traffic Jam Delay (+46.6%):</strong> Severe congestion adds roughly 10 minutes to transit times compared to low-traffic conditions (31.18m vs 21.27m), accounting for 31.0% of demand.</li>
          <li><strong>Atmospheric Resilience:</strong> Fog and cloudy conditions introduce +32.3% delay over clear sunny days (28.92m vs 21.86m), while consumer demand remains highly stable.</li>
        </ul>
      </div>
    </div>
  );
}
