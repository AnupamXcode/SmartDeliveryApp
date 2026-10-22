import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  Cell 
} from 'recharts';
import { AlertTriangle, CloudSun, Wind, Compass, Zap } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import CustomTooltip from '../components/CustomTooltip';
import { useAnalytics } from '../context/AnalyticsContext';

const TRAFFIC_COLORS = {
  Low: '#D6FF3F',
  Medium: '#48E5E0',
  High: '#A78BFA',
  Jam: '#FF6B57',
  Unspecified: '#8E8CA6'
};

export default function TrafficWeather() {
  const { datasets } = useAnalytics();

  const trafficData = datasets.traffic || [];
  const weatherData = (datasets.weather || []).slice().sort((a, b) => a.Avg_Delivery_Minutes - b.Avg_Delivery_Minutes);

  return (
    <div className="space-y-8">
      {/* Visual Header Banner with AI-Generated 3D Artwork */}
      <div className="bg-[#19192A] border border-[#34334B] rounded-2xl p-6 lg:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B57]/10 border border-[#FF6B57]/30 text-[#FF6B57] text-xs font-mono font-bold tracking-wider uppercase">
            <AlertTriangle size={14} /> Environmental Friction Analysis
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold font-display text-[#F8F7FF] tracking-tight">
            Traffic Congestion & Meteorological Impact
          </h2>
          <p className="text-[#B8B6CC] text-sm leading-relaxed">
            Quantifying the empirical impact of urban roadway density and atmospheric conditions 
            on fulfillment duration across 45,593 delivery journeys processed through Apache PySpark.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono">
            <span className="text-[#D6FF3F]">Low Traffic: 21.27 min</span>
            <span className="text-[#8E8CA6]">•</span>
            <span className="text-[#FF6B57]">Traffic Jam: 31.18 min (+46.6%)</span>
            <span className="text-[#8E8CA6]">•</span>
            <span className="text-[#A78BFA]">Fog/Cloudy: 28.92 min</span>
          </div>
        </div>

        {/* 3D Illustration Card */}
        <div className="w-full md:w-80 h-44 rounded-xl overflow-hidden border border-[#34334B] shrink-0 relative shadow-xl">
          <img 
            src="/assets/traffic_weather.jpg" 
            alt="Traffic and Weather Delivery Illustration" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10101B]/80 via-transparent to-transparent flex items-end p-3">
            <span className="text-[11px] font-mono text-[#D6FF3F] bg-[#10101B]/80 px-2 py-0.5 rounded border border-[#34334B]">
              Adverse Weather Dynamics
            </span>
          </div>
        </div>
      </div>

      {/* Traffic Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap size={18} className="text-[#D6FF3F]" />
          <h3 className="text-lg font-bold font-display text-[#F8F7FF]">
            Roadway Congestion vs Delivery Duration
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Roadway Traffic Congestion Latency Penalty"
            subtitle="Mean minutes to deliver under escalating traffic congestion"
            interpretation={{
              measuring: 'Average delivery time (in minutes) under Low, Medium, High, and Jam traffic tiers.',
              shows: 'Transit times increase monotonically from 21.27m (Low) to 26.70m (Medium), 27.24m (High), and 31.18m (Jam).',
              whyMatters: 'Gridlock imposes an average +9.91 minute latency tax per order, requiring proactive courier surge dispatch.'
            }}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                  <XAxis dataKey="Road_traffic_density" stroke="#8E8CA6" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8E8CA6" fontSize={11} tickLine={false} unit="m" domain={[0, 36]} />
                  <Tooltip content={<CustomTooltip unit="min" />} />
                  <Bar dataKey="Avg_Delivery_Minutes" name="Avg Delivery" radius={[4, 4, 0, 0]}>
                    {trafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TRAFFIC_COLORS[entry.Road_traffic_density] || '#D6FF3F'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Order Volume Exposure Across Traffic Tiers"
            subtitle="Number of orders fulfilled within each congestion category"
            interpretation={{
              measuring: 'Total delivery orders completed within each traffic congestion condition.',
              shows: 'Low traffic accounts for 15,477 orders, Jam accounts for 14,143 orders, and Medium/High account for ~15,000 orders.',
              whyMatters: 'Confirms that over 31% of all delivery volume takes place during severe gridlock conditions.'
            }}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} margin={{ top: 15, right: 15, left: -5, bottom: 5 }}>
                  <XAxis dataKey="Road_traffic_density" stroke="#8E8CA6" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8E8CA6" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomTooltip unit="orders" />} />
                  <Bar dataKey="Total_Orders" name="Orders" fill="#48E5E0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Weather Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <CloudSun size={18} className="text-[#A78BFA]" />
          <h3 className="text-lg font-bold font-display text-[#F8F7FF]">
            Meteorological Impact on Transit Duration
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Meteorological Conditions vs Average Delivery Minutes"
            subtitle="Atmospheric factors sorted from swiftest to most delayed"
            interpretation={{
              measuring: 'Average delivery time (in minutes) across Sunny, Stormy, Sandstorms, Windy, Cloudy, and Fog weather.',
              shows: 'Sunny weather averages 21.86 min, whereas Cloudy and Fog conditions average 28.92 min (+32.3% delay).',
              whyMatters: 'Demonstrates that visibility-impairing conditions like fog and cloud cover cause worse delays than pure wind.'
            }}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weatherData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                  <XAxis dataKey="Weatherconditions" stroke="#8E8CA6" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8E8CA6" fontSize={11} tickLine={false} unit="m" domain={[0, 35]} />
                  <Tooltip content={<CustomTooltip unit="min" />} />
                  <Bar dataKey="Avg_Delivery_Minutes" name="Avg Delivery" fill="#A78BFA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Order Demand Inelasticity by Weather Type"
            subtitle="Consumer ordering consistency regardless of outdoor conditions"
            interpretation={{
              measuring: 'Order counts completed across the 6 meteorological conditions.',
              shows: 'Order volumes remain remarkably constant between ~7,400 to ~7,600 orders across all weather types.',
              whyMatters: 'Proves high consumer demand inelasticity: people continue ordering food even during storms and fog.'
            }}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weatherData} margin={{ top: 15, right: 15, left: -5, bottom: 5 }}>
                  <XAxis dataKey="Weatherconditions" stroke="#8E8CA6" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8E8CA6" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomTooltip unit="orders" />} />
                  <Bar dataKey="Total_Orders" name="Orders" fill="#D6FF3F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
