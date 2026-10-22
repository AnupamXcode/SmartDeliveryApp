import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  Cell 
} from 'recharts';
import { AlertTriangle, CloudSun } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import CustomTooltip from '../components/CustomTooltip';
import { useAnalytics } from '../context/AnalyticsContext';

const TRAFFIC_COLORS = {
  Low: '#34D399',
  Medium: '#38D9F8',
  High: '#FBBF24',
  Jam: '#FB7185',
  Unspecified: '#64748B'
};

export default function TrafficWeather() {
  const { datasets } = useAnalytics();

  const trafficData = datasets.traffic || [];
  const weatherData = (datasets.weather || []).slice().sort((a, b) => a.Avg_Delivery_Minutes - b.Avg_Delivery_Minutes);

  return (
    <div className="space-y-6">
      {/* Traffic Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Roadway Traffic Congestion Latency Penalty"
          subtitle="Mean minutes to deliver under escalating traffic congestion"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                <XAxis dataKey="Road_traffic_density" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="m" domain={[0, 36]} />
                <Tooltip content={<CustomTooltip unit="min" />} />
                <Bar dataKey="Avg_Delivery_Minutes" name="Avg Delivery" radius={[4, 4, 0, 0]}>
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={TRAFFIC_COLORS[entry.Road_traffic_density] || '#38D9F8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Order Exposure Across Traffic Levels"
          subtitle="Volume of transactions completed within each congestion tier"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 15, right: 15, left: -5, bottom: 5 }}>
                <XAxis dataKey="Road_traffic_density" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip unit="orders" />} />
                <Bar dataKey="Total_Orders" name="Orders" fill="#64748B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Weather Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Meteorological Conditions vs Average Delivery Minutes"
          subtitle="Atmospheric factors sorted from swiftest to most delayed"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weatherData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                <XAxis dataKey="Weatherconditions" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="m" domain={[0, 35]} />
                <Tooltip content={<CustomTooltip unit="min" />} />
                <Bar dataKey="Avg_Delivery_Minutes" name="Avg Delivery" fill="#8B7CFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Order Demand Inelasticity by Weather Type"
          subtitle="Consumer ordering consistency regardless of outdoor conditions"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weatherData} margin={{ top: 15, right: 15, left: -5, bottom: 5 }}>
                <XAxis dataKey="Weatherconditions" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip unit="orders" />} />
                <Bar dataKey="Total_Orders" name="Orders" fill="#34D399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Analytical Callout */}
      <div className="bg-[#141D32] border-l-4 border-l-[#FBBF24] border border-[#233152] rounded-lg p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#FBBF24] mb-2 flex items-center gap-1.5">
          <AlertTriangle size={15} /> Environmental Delay Benchmarks
        </h4>
        <ul className="text-xs text-[#CBD5E1] space-y-1.5 list-disc list-inside">
          <li><strong>Traffic Jam Friction (+9.91 min delay):</strong> Jam conditions require 31.18 minutes on average compared to 21.27 min in low traffic (+46.6% increase). 14,143 deliveries suffer through this bottleneck.</li>
          <li><strong>Fog and Cloud Visibility Impact:</strong> Adverse atmospheric conditions (Fog: 28.92 min, Cloudy: 28.92 min) extend deliveries by +7.06 minutes (+32.3%) compared to Sunny conditions (21.86 min).</li>
          <li><strong>Consumer Order Inelasticity:</strong> Order volume remains remarkably constant across all 6 weather states (~7,284 to 7,654 orders), proving weather affects transport velocity rather than consumer appetite.</li>
        </ul>
      </div>
    </div>
  );
}
