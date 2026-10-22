import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Star, Utensils, AlertCircle } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import CustomTooltip from '../components/CustomTooltip';
import { useAnalytics } from '../context/AnalyticsContext';

const PIE_COLORS = ['#38D9F8', '#8B7CFF', '#34D399', '#FBBF24'];

export default function DeliveryPerformance() {
  const { datasets } = useAnalytics();

  const ratingData = (datasets.rating || [])
    .filter(r => r.Rating_Numeric !== null)
    .sort((a, b) => a.Rating_Numeric - b.Rating_Numeric);

  const topRatings = ratingData.filter(r => r.Rating_Numeric >= 4.0);
  const orderData = datasets.order || [];

  return (
    <div className="space-y-6">
      {/* Top Row: Driver Ratings Correlation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Courier Service Rating vs Average Delivery Latency"
            subtitle="Evaluating relationship between driver ratings (1.0 to 5.0) and fulfillment minutes"
            headerRight={
              <span className="text-[11px] font-mono text-[#38D9F8] bg-[#38D9F8]/10 px-2 py-0.5 rounded border border-[#38D9F8]/20">
                Negative Correlation
              </span>
            }
          >
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ratingData} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
                  <XAxis 
                    dataKey="Delivery_person_Ratings" 
                    stroke="#64748B" 
                    fontSize={11} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#64748B" 
                    fontSize={11} 
                    tickLine={false} 
                    unit="m" 
                    domain={[20, 42]}
                  />
                  <Tooltip content={<CustomTooltip unit="min" />} />
                  <Line 
                    type="monotone" 
                    dataKey="Avg_Delivery_Minutes" 
                    name="Avg Latency" 
                    stroke="#38D9F8" 
                    strokeWidth={2.5}
                    dot={{ fill: '#38D9F8', r: 3 }}
                    activeDot={{ r: 6, fill: '#8B7CFF' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div>
          <ChartCard
            title="High Performer Volume (Rating >= 4.0)"
            subtitle="Order counts completed by top-rated couriers"
          >
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topRatings} margin={{ top: 15, right: 10, left: -10, bottom: 5 }}>
                  <XAxis dataKey="Delivery_person_Ratings" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomTooltip unit="orders" />} />
                  <Bar dataKey="Total_Orders" name="Orders" fill="#34D399" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Second Row: Food Categories Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Average Delivery Latency by Order Category"
          subtitle="Assessing impact of meal types: Drinks, Buffet, Snack, and Meal"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                <XAxis dataKey="Type_of_order" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="m" domain={[20, 30]} />
                <Tooltip content={<CustomTooltip unit="min" />} />
                <Bar dataKey="Avg_Delivery_Minutes" name="Avg Delivery" fill="#8B7CFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Demand Volume Share Across Categories"
          subtitle="Even distribution across all four product classifications"
        >
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderData}
                  dataKey="Total_Orders"
                  nameKey="Type_of_order"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {orderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip unit="orders" />} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#A6B3C8', paddingTop: '10px' }} iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Correlation vs Causation Note */}
      <div className="bg-[#141D32] border-l-4 border-l-[#8B7CFF] border border-[#233152] rounded-lg p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B7CFF] mb-2 flex items-center gap-1.5">
          <AlertCircle size={15} /> Academic Note: Correlation vs Causation
        </h4>
        <div className="text-xs text-[#CBD5E1] space-y-1.5 leading-relaxed">
          <p>
            <strong>Rating & Latency Inversion:</strong> Couriers rated 4.5 to 5.0 consistently average 23.65 to 25.53 minutes, whereas couriers rated 2.5 to 3.9 average 36.0 to 38.6 minutes. 
            However, correlation does not demonstrate that courier skill alone drives these delays. External factors such as restaurant preparation backlogs, mechanical breakdowns, or challenging routes directly lengthen delivery times, prompting dissatisfied customers to assign lower ratings.
          </p>
          <p>
            <strong>Category Uniformity:</strong> Drinks (26.19m), Buffet (26.28m), Snack (26.29m), and Meal (26.42m) fluctuate by less than 14 seconds across categories, demonstrating that food category has negligible influence on transit speed compared to external road and dispatch variables.
          </p>
        </div>
      </div>
    </div>
  );
}
