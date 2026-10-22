import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Building2, MapPin, Compass } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import CustomTooltip from '../components/CustomTooltip';
import { useAnalytics } from '../context/AnalyticsContext';

const CITY_COLORS = ['#38D9F8', '#8B7CFF', '#FB7185'];

export default function CityAnalysis() {
  const { datasets } = useAnalytics();
  const cityData = (datasets.city || []).slice().sort((a, b) => a.Avg_Delivery_Minutes - b.Avg_Delivery_Minutes);

  const totalCityOrders = cityData.reduce((acc, c) => acc + (c.Total_Orders || 0), 0);

  return (
    <div className="space-y-6">
      {/* City Latency and Volume Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Average Delivery Latency by Urban Density Zone"
          subtitle="Semi-urban corridors exhibit significantly higher travel durations"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                <XAxis dataKey="City" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="m" domain={[0, 60]} />
                <Tooltip content={<CustomTooltip unit="min" />} />
                <Bar dataKey="Avg_Delivery_Minutes" name="Avg Delivery" radius={[4, 4, 0, 0]}>
                  {cityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CITY_COLORS[index % CITY_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Order Concentration Across Urban Classifications"
          subtitle="Metropolitan corridors account for 76.8% of aggregate volume"
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
                <Legend wrapperStyle={{ fontSize: '11px', color: '#A6B3C8', paddingTop: '10px' }} iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Urban Performance Matrix Table */}
      <div className="bg-[#141D32] border border-[#233152] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-[#F1F5F9] mb-3">Urban Zone Operational Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0E1528] text-[#A6B3C8] uppercase font-mono border-b border-[#233152]">
              <tr>
                <th className="py-2.5 px-4">Urban Classification</th>
                <th className="py-2.5 px-4">Orders Handled (N)</th>
                <th className="py-2.5 px-4">Volume Share (%)</th>
                <th className="py-2.5 px-4">Mean Delivery Time</th>
                <th className="py-2.5 px-4">Delta vs Urban Base</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#233152] text-[#F1F5F9]">
              {cityData.map((row, idx) => {
                const share = totalCityOrders > 0 ? ((row.Total_Orders / totalCityOrders) * 100).toFixed(2) : '0.00';
                const delta = (row.Avg_Delivery_Minutes - 22.98).toFixed(2);
                return (
                  <tr key={idx} className="hover:bg-[#1A2540] transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-[#38D9F8]">{row.City}</td>
                    <td className="py-2.5 px-4 font-mono">{row.Total_Orders?.toLocaleString()}</td>
                    <td className="py-2.5 px-4 font-mono">{share}%</td>
                    <td className="py-2.5 px-4 font-mono">{row.Avg_Delivery_Minutes} min</td>
                    <td className="py-2.5 px-4 font-mono">
                      {parseFloat(delta) > 0 ? (
                        <span className="text-[#FB7185]">+{delta} min</span>
                      ) : (
                        <span className="text-[#34D399]">Baseline</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Spatial Notes */}
      <div className="bg-[#141D32] border-l-4 border-l-[#38D9F8] border border-[#233152] rounded-lg p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#38D9F8] mb-2 flex items-center gap-1.5">
          <MapPin size={15} /> Spatial Geography Observations
        </h4>
        <ul className="text-xs text-[#CBD5E1] space-y-1.5 list-disc list-inside">
          <li><strong>Semi-Urban Extended Radius (49.73 min):</strong> While capturing only 164 orders, Semi-Urban deliveries require more than double the transit time of Urban routes (22.98 min). This reflects larger customer service perimeters and sparse restaurant networks.</li>
          <li><strong>Urban Density Optimization:</strong> Dense Urban zones achieve the lowest delivery duration (22.98 min), taking advantage of tight delivery clusters and shorter point-to-point distances.</li>
          <li><strong>Metropolitan Dominance:</strong> Metropolitan orders form the majority (34,093 orders, 76.8% share) averaging 27.32 minutes.</li>
        </ul>
      </div>
    </div>
  );
}
