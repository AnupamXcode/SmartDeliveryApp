import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Star, Utensils, AlertCircle, Award, TrendingDown } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import CustomTooltip from '../components/CustomTooltip';
import { useAnalytics } from '../context/AnalyticsContext';

const PIE_COLORS = ['#D6FF3F', '#48E5E0', '#FF6B57', '#A78BFA'];

export default function DeliveryPerformance() {
  const { datasets } = useAnalytics();

  const ratingData = (datasets.rating || [])
    .filter(r => r.Rating_Numeric !== null)
    .sort((a, b) => a.Rating_Numeric - b.Rating_Numeric);

  const topRatings = ratingData.filter(r => r.Rating_Numeric >= 4.0);
  const orderData = datasets.order || [];

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="bg-[#19192A] border border-[#34334B] rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#48E5E0]/10 border border-[#48E5E0]/30 text-[#48E5E0] text-xs font-mono font-bold tracking-wider uppercase mb-2">
              <Award size={14} /> Courier Performance Analytics
            </div>
            <h2 className="text-2xl font-bold font-display text-[#F8F7FF] tracking-tight">
              Courier Ratings & Culinary Order Type Dynamics
            </h2>
            <p className="text-[#B8B6CC] text-xs sm:text-sm mt-1 max-w-2xl">
              Evaluating how courier experience levels and meal categories correlate with overall delivery duration.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3 py-2 bg-[#10101B] border border-[#34334B] rounded-xl text-center">
              <div className="text-xs text-[#8E8CA6] font-mono">Correlation</div>
              <div className="text-sm font-bold font-display text-[#D6FF3F]">-0.33 (Negative)</div>
            </div>
            <div className="px-3 py-2 bg-[#10101B] border border-[#34334B] rounded-xl text-center">
              <div className="text-xs text-[#8E8CA6] font-mono">Top Couriers</div>
              <div className="text-sm font-bold font-display text-[#48E5E0]">Rating &gt;= 4.5</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings Correlation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Courier Service Rating vs Average Delivery Latency"
            subtitle="Evaluating relationship between driver ratings (1.0 to 5.0) and fulfillment minutes"
            interpretation={{
              measuring: 'Average delivery time (in minutes) corresponding to courier star ratings.',
              shows: 'Higher-rated drivers (4.7-5.0) consistently deliver within ~24.5 min, whereas 1.0-rated drivers average 39.5 min.',
              whyMatters: 'Confirms a strong negative correlation: experienced and highly rated drivers navigate routes much faster.'
            }}
            headerRight={
              <span className="text-[11px] font-mono text-[#48E5E0] bg-[#48E5E0]/10 px-2 py-0.5 rounded border border-[#48E5E0]/20">
                Negative Correlation
              </span>
            }
          >
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ratingData} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
                  <XAxis 
                    dataKey="Delivery_person_Ratings" 
                    stroke="#8E8CA6" 
                    fontSize={11} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#8E8CA6" 
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
                    stroke="#48E5E0" 
                    strokeWidth={2.5}
                    dot={{ fill: '#48E5E0', r: 3 }}
                    activeDot={{ r: 6, fill: '#D6FF3F' }}
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
            interpretation={{
              measuring: 'Total delivery orders successfully fulfilled by couriers with ratings of 4.0 or higher.',
              shows: 'Ratings between 4.6 and 4.9 account for over 30,000 orders, forming the core operational backbone.',
              whyMatters: 'Demonstrates high overall fleet quality with the vast majority of orders serviced by 4.5+ couriers.'
            }}
          >
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topRatings} margin={{ top: 15, right: 10, left: -10, bottom: 5 }}>
                  <XAxis dataKey="Delivery_person_Ratings" stroke="#8E8CA6" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8E8CA6" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomTooltip unit="orders" />} />
                  <Bar dataKey="Total_Orders" name="Orders" fill="#D6FF3F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Culinary Category Analysis */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Utensils size={18} className="text-[#FF6B57]" />
          <h3 className="text-lg font-bold font-display text-[#F8F7FF]">
            Culinary Food Order Classification Analysis
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Transit Latency Across Food Order Types"
            subtitle="Snack, Meal, Drinks, and Buffet delivery speed comparison"
            interpretation={{
              measuring: 'Average delivery time (in minutes) broken down by culinary meal type.',
              shows: 'Delivery times remain remarkably flat across all 4 meal types (~26.23 to ~26.35 minutes).',
              whyMatters: 'Proves delivery transit times are largely invariant to meal category; kitchen prep occurs before dispatch.'
            }}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                  <XAxis dataKey="Type_of_order" stroke="#8E8CA6" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8E8CA6" fontSize={11} tickLine={false} unit="m" domain={[0, 32]} />
                  <Tooltip content={<CustomTooltip unit="min" />} />
                  <Bar dataKey="Avg_Delivery_Minutes" name="Avg Delivery" fill="#FF6B57" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Proportional Demand by Meal Type"
            subtitle="Distribution of 45,593 orders across menu categories"
            interpretation={{
              measuring: 'Total orders placed for each food category.',
              shows: 'Evenly distributed across Snack (11,533), Meal (11,458), Drinks (11,322), and Buffet (11,280).',
              whyMatters: 'Demonstrates balanced kitchen demand across meal types throughout the operational dataset.'
            }}
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
    </div>
  );
}
