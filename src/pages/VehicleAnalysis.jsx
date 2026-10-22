import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Bike, Zap, CheckCircle } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import CustomTooltip from '../components/CustomTooltip';
import { useAnalytics } from '../context/AnalyticsContext';

const VEH_COLORS = ['#38D9F8', '#34D399', '#8B7CFF', '#FBBF24'];

export default function VehicleAnalysis() {
  const { datasets } = useAnalytics();
  const vehicleData = (datasets.vehicle || []).slice().sort((a, b) => a.Avg_Delivery_Minutes - b.Avg_Delivery_Minutes);

  const totalVehOrders = vehicleData.reduce((acc, v) => acc + (v.Total_Orders || 0), 0);

  return (
    <div className="space-y-6">
      {/* Vehicle Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Fulfillment Velocity by Transportation Modality"
          subtitle="Electric scooters and scooters deliver ~3.14 minutes faster than motorcycles"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vehicleData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                <XAxis dataKey="Type_of_vehicle" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="m" domain={[0, 35]} />
                <Tooltip content={<CustomTooltip unit="min" />} />
                <Bar dataKey="Avg_Delivery_Minutes" name="Avg Delivery" radius={[4, 4, 0, 0]}>
                  {vehicleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={VEH_COLORS[index % VEH_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Fleet Capacity & Volume Allocation"
          subtitle="Motorcycles carry 58% of all delivery transactions"
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
                    <Cell key={`cell-${index}`} fill={VEH_COLORS[index % VEH_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip unit="orders" />} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#A6B3C8', paddingTop: '10px' }} iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Fleet Benchmark Matrix */}
      <div className="bg-[#141D32] border border-[#233152] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-[#F1F5F9] mb-3">Modality Benchmark Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0E1528] text-[#A6B3C8] uppercase font-mono border-b border-[#233152]">
              <tr>
                <th className="py-2.5 px-4">Vehicle Modality</th>
                <th className="py-2.5 px-4">Orders Handled (N)</th>
                <th className="py-2.5 px-4">Volume Share (%)</th>
                <th className="py-2.5 px-4">Mean Delivery Time</th>
                <th className="py-2.5 px-4">Time Delta vs Motorcycle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#233152] text-[#F1F5F9]">
              {vehicleData.map((row, idx) => {
                const share = totalVehOrders > 0 ? ((row.Total_Orders / totalVehOrders) * 100).toFixed(2) : '0.00';
                const diff = (row.Avg_Delivery_Minutes - 27.61).toFixed(2);
                return (
                  <tr key={idx} className="hover:bg-[#1A2540] transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-[#38D9F8]">{row.Type_of_vehicle}</td>
                    <td className="py-2.5 px-4 font-mono">{row.Total_Orders?.toLocaleString()}</td>
                    <td className="py-2.5 px-4 font-mono">{share}%</td>
                    <td className="py-2.5 px-4 font-mono">{row.Avg_Delivery_Minutes} min</td>
                    <td className="py-2.5 px-4 font-mono">
                      {parseFloat(diff) < 0 ? (
                        <span className="text-[#34D399] font-medium">{diff} min (Faster)</span>
                      ) : (
                        <span className="text-[#A6B3C8]">Baseline</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fleet Takeaways */}
      <div className="bg-[#141D32] border-l-4 border-l-[#34D399] border border-[#233152] rounded-lg p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#34D399] mb-2 flex items-center gap-1.5">
          <Zap size={15} /> Fleet Electrification & Modality Insights
        </h4>
        <ul className="text-xs text-[#CBD5E1] space-y-1.5 list-disc list-inside">
          <li><strong>Electric Two-Wheelers:</strong> Electric scooters match conventional scooters with an average delivery duration of ~24.47 min, delivering significant speed and operational efficiency over motorcycles (27.61 min).</li>
          <li><strong>Fleet Distribution Imbalance:</strong> 58.0% of orders are currently serviced by motorcycles, meaning fleet transition towards scooters and e-scooters can directly reduce delivery latency across tens of thousands of orders.</li>
          <li><strong>Bicycles:</strong> Account for only 68 orders (0.15%), serving ultra-compact delivery zones with an average time of 26.43 minutes.</li>
        </ul>
      </div>
    </div>
  );
}
