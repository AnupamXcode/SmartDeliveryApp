import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Building2, Bike, Layers, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import CustomTooltip from '../components/CustomTooltip';
import { useAnalytics } from '../context/AnalyticsContext';

const VEHICLE_COLORS = ['#D6FF3F', '#48E5E0', '#FF6B57', '#A78BFA'];
const CITY_COLORS = ['#48E5E0', '#A78BFA', '#FF6B57'];

export default function CityVehicleAnalysis() {
  const { datasets } = useAnalytics();

  const cityData = (datasets.city || []).slice().sort((a, b) => a.Avg_Delivery_Minutes - b.Avg_Delivery_Minutes);
  const vehicleData = (datasets.vehicle || []).slice().sort((a, b) => a.Avg_Delivery_Minutes - b.Avg_Delivery_Minutes);

  const totalCityOrders = cityData.reduce((acc, c) => acc + (c.Total_Orders || 0), 0);
  const totalVehOrders = vehicleData.reduce((acc, v) => acc + (v.Total_Orders || 0), 0);

  return (
    <div className="space-y-8">
      {/* Editorial Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#19192A] border border-[#34334B] rounded-xl p-5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D6FF3F] uppercase tracking-wider mb-2">
            <Zap size={14} /> Top Modality Efficiency
          </div>
          <div className="text-2xl font-bold font-display text-[#F8F7FF]">
            Electric Scooter
          </div>
          <div className="text-xs text-[#B8B6CC] mt-1">
            Fastest fleet delivery time: <span className="text-[#D6FF3F] font-bold">24.47 min</span> average.
          </div>
        </div>

        <div className="bg-[#19192A] border border-[#34334B] rounded-xl p-5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#48E5E0] uppercase tracking-wider mb-2">
            <Building2 size={14} /> Dominant Geography
          </div>
          <div className="text-2xl font-bold font-display text-[#F8F7FF]">
            Metropolitan (76.8%)
          </div>
          <div className="text-xs text-[#B8B6CC] mt-1">
            Accounts for 34,093 of 45,593 total orders analyzed.
          </div>
        </div>

        <div className="bg-[#19192A] border border-[#34334B] rounded-xl p-5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF6B57] uppercase tracking-wider mb-2">
            <AlertTriangle size={14} /> Latency Outlier
          </div>
          <div className="text-2xl font-bold font-display text-[#F8F7FF]">
            Semi-Urban Zone
          </div>
          <div className="text-xs text-[#B8B6CC] mt-1">
            Mean latency reaches <span className="text-[#FF6B57] font-bold">49.73 min</span> due to sparse coverage.
          </div>
        </div>
      </div>

      {/* City Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Building2 size={18} className="text-[#48E5E0]" />
          <h3 className="text-lg font-bold font-display text-[#F8F7FF]">
            Urban Density & Territorial Latency Analysis
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Average Delivery Latency by Urban Classification"
            subtitle="Transit duration across Urban, Metropolitan, and Semi-Urban areas"
            interpretation={{
              measuring: 'Average delivery duration (in minutes) broken down by regional urbanization tier.',
              shows: 'Urban deliveries average 22.98 min, Metropolitan averages 27.32 min, while Semi-Urban zones jump to 49.73 min (+116% longer).',
              whyMatters: 'Identifies geographic zones requiring decentralized dark stores or higher driver dispatch density to reduce long-tail delays.'
            }}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cityData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                  <XAxis dataKey="City" stroke="#8E8CA6" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8E8CA6" fontSize={11} tickLine={false} unit="m" domain={[0, 55]} />
                  <Tooltip content={<CustomTooltip unit="min" />} />
                  <Bar dataKey="Avg_Delivery_Minutes" name="Avg Latency" radius={[4, 4, 0, 0]}>
                    {cityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CITY_COLORS[index % CITY_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Order Volume Distribution by City Tier"
            subtitle="Proportional demand captured across urban classifications"
            interpretation={{
              measuring: 'Total delivery orders fulfilled within each urban classification category.',
              shows: 'Metropolitan accounts for 76.8% (34,093 orders), Urban holds 22.8% (10,136 orders), while Semi-Urban is under 1% (164 orders).',
              whyMatters: 'Validates that the overwhelming majority of fleet operations occur in dense metropolitan hubs.'
            }}
          >
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cityData}
                    dataKey="Total_Orders"
                    nameKey="City"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {cityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CITY_COLORS[index % CITY_COLORS.length]} />
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
      </div>

      {/* Vehicle Modality Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Bike size={18} className="text-[#D6FF3F]" />
          <h3 className="text-lg font-bold font-display text-[#F8F7FF]">
            Fleet Modality & Propulsion Efficiency
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Mean Delivery Latency by Transportation Mode"
            subtitle="Speed benchmark across Electric Scooter, Scooter, Motorcycle, and Bicycle"
            interpretation={{
              measuring: 'Average delivery time (in minutes) for each vehicle type utilized by couriers.',
              shows: 'Electric Scooters (24.47m) and Scooters (24.48m) deliver identical top-tier velocity, beating Motorcycles (27.61m) by over 3.1 minutes.',
              whyMatters: 'Demonstrates that lightweight, agile 2-wheelers outperform heavier motorcycles in congested urban corridors.'
            }}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vehicleData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                  <XAxis dataKey="Type_of_vehicle" stroke="#8E8CA6" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8E8CA6" fontSize={11} tickLine={false} unit="m" domain={[0, 32]} />
                  <Tooltip content={<CustomTooltip unit="min" />} />
                  <Bar dataKey="Avg_Delivery_Minutes" name="Avg Latency" radius={[4, 4, 0, 0]}>
                    {vehicleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={VEHICLE_COLORS[index % VEHICLE_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Fleet Composition & Modality Share"
            subtitle="Distribution of delivery volume fulfilled by vehicle category"
            interpretation={{
              measuring: 'Total delivery orders handled by each vehicle classification in the 45,593-order dataset.',
              shows: 'Motorcycles handle the largest volume (26,429 orders), followed by Scooters (15,273 orders) and Electric Scooters (3,823 orders).',
              whyMatters: 'Highlights the massive efficiency gain possible by transitioning fleet volume from motorcycles to electric scooters.'
            }}
          >
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleData}
                    dataKey="Total_Orders"
                    nameKey="Type_of_vehicle"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {vehicleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={VEHICLE_COLORS[index % VEHICLE_COLORS.length]} />
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
      </div>

      {/* Benchmark Matrix Table */}
      <div className="bg-[#19192A] border border-[#34334B] rounded-xl p-5">
        <h4 className="text-sm font-bold font-display text-[#F8F7FF] mb-3 flex items-center gap-2">
          <Layers size={16} className="text-[#A78BFA]" />
          Combined Modality & Geography Performance Matrix
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#34334B] text-[#8E8CA6] font-mono">
                <th className="pb-2.5 font-medium">Modality / Area</th>
                <th className="pb-2.5 font-medium">Volume (Orders)</th>
                <th className="pb-2.5 font-medium">Mean Transit Time</th>
                <th className="pb-2.5 font-medium">Latency Delta vs SLA</th>
                <th className="pb-2.5 font-medium">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#34334B]/60 text-[#B8B6CC]">
              <tr>
                <td className="py-2.5 font-medium text-[#F8F7FF]">Electric Scooter</td>
                <td className="py-2.5 font-mono">3,823 (8.4%)</td>
                <td className="py-2.5 font-mono text-[#D6FF3F] font-bold">24.47 min</td>
                <td className="py-2.5 font-mono text-[#D6FF3F]">-1.82 min (-6.9%)</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#D6FF3F]/10 text-[#D6FF3F] border border-[#D6FF3F]/30">Optimal</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-[#F8F7FF]">Scooter</td>
                <td className="py-2.5 font-mono">15,273 (33.5%)</td>
                <td className="py-2.5 font-mono text-[#48E5E0] font-bold">24.48 min</td>
                <td className="py-2.5 font-mono text-[#48E5E0]">-1.81 min (-6.9%)</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#48E5E0]/10 text-[#48E5E0] border border-[#48E5E0]/30">Optimal</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-[#F8F7FF]">Motorcycle</td>
                <td className="py-2.5 font-mono">26,429 (58.0%)</td>
                <td className="py-2.5 font-mono text-[#FF6B57] font-bold">27.61 min</td>
                <td className="py-2.5 font-mono text-[#FF6B57]">+1.32 min (+5.0%)</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FF6B57]/10 text-[#FF6B57] border border-[#FF6B57]/30">High Friction</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-[#F8F7FF]">Semi-Urban Corridor</td>
                <td className="py-2.5 font-mono">164 (0.4%)</td>
                <td className="py-2.5 font-mono text-[#FF6B57] font-bold">49.73 min</td>
                <td className="py-2.5 font-mono text-[#FF6B57]">+23.44 min (+89.2%)</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FF6B57]/10 text-[#FF6B57] border border-[#FF6B57]/30">Critical Delay</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
