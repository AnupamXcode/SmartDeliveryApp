import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  Cell 
} from 'recharts';
import { Calendar, Layers, Sliders, AlertOctagon, Sparkles, Clock, Calculator } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import CustomTooltip from '../components/CustomTooltip';
import { useAnalytics } from '../context/AnalyticsContext';

export default function FestivalBatching() {
  const { datasets } = useAnalytics();
  const festivalData = datasets.festival || [];
  const multipleData = datasets.multiple_delivery || [];

  // Heuristic Simulation State
  const [simCity, setSimCity] = useState('Urban');
  const [simVehicle, setSimVehicle] = useState('Electric Scooter');
  const [simTraffic, setSimTraffic] = useState('Low');
  const [simWeather, setSimWeather] = useState('Sunny');
  const [simMulti, setSimMulti] = useState('0');
  const [simFestival, setSimFestival] = useState('No');

  // Empirical factor weights derived from PySpark analysis
  const cityDeltas = { Urban: 0.0, Metropolitian: 4.34, 'Semi-Urban': 26.75 };
  const vehDeltas = { 'Electric Scooter': 0.0, Scooter: 0.01, Bicycle: 1.96, Motorcycle: 3.14 };
  const trafficDeltas = { Low: 0.0, Medium: 5.43, High: 5.97, Jam: 9.91 };
  const weatherDeltas = { Sunny: 0.0, Stormy: 4.01, Sandstorms: 4.02, Windy: 4.26, Cloudy: 7.06, Fog: 7.06 };
  const multiDeltas = { '0': 0.0, '1': 3.98, '2': 17.57, '3': 24.94 };
  const festDelta = simFestival === 'Yes' ? 19.54 : 0.0;

  const cCity = cityDeltas[simCity] || 0;
  const cVeh = vehDeltas[simVehicle] || 0;
  const cTraffic = trafficDeltas[simTraffic] || 0;
  const cWeather = weatherDeltas[simWeather] || 0;
  const cMulti = multiDeltas[simMulti] || 0;

  const predictedLatency = Math.max(
    10.0,
    Math.min(56.0, 20.0 + cCity * 0.45 + cVeh * 0.25 + cTraffic * 0.7 + cWeather * 0.5 + cMulti * 0.75 + festDelta * 0.6)
  );

  const factorContributions = [
    { factor: 'Base Transit', delay: 20.0 },
    { factor: 'Urban Zone', delay: Number((cCity * 0.45).toFixed(1)) },
    { factor: 'Vehicle Modality', delay: Number((cVeh * 0.25).toFixed(1)) },
    { factor: 'Traffic Delay', delay: Number((cTraffic * 0.7).toFixed(1)) },
    { factor: 'Weather Friction', delay: Number((cWeather * 0.5).toFixed(1)) },
    { factor: 'Order Stacking', delay: Number((cMulti * 0.75).toFixed(1)) },
    { factor: 'Festival Surge', delay: Number((festDelta * 0.6).toFixed(1)) },
  ];

  return (
    <div className="space-y-8">
      {/* Top Row: Festival and Multiple Delivery Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Festival Season Delivery Latency Surge"
          subtitle="Festival events trigger an acute +75.2% expansion in fulfillment time"
          interpretation={{
            measuring: 'Average delivery time during standard operational days vs. major festival periods.',
            shows: 'Non-festival days average 25.99 min, while festival events surge to 45.52 min (+19.54 min delay).',
            whyMatters: 'Demonstrates the severe operational strain on restaurants and road networks during cultural events.'
          }}
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={festivalData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                <XAxis dataKey="Festival" stroke="#8E8CA6" fontSize={11} tickLine={false} />
                <YAxis stroke="#8E8CA6" fontSize={11} tickLine={false} unit="m" domain={[0, 52]} />
                <Tooltip content={<CustomTooltip unit="min" />} />
                <Bar dataKey="Avg_Delivery_Minutes" name="Avg Latency" radius={[4, 4, 0, 0]}>
                  {festivalData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.Festival === 'Yes' ? '#FF6B57' : '#D6FF3F'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Multiple Delivery Batching Delay Escalation"
          subtitle="Compounding latency tax as couriers stack 0, 1, 2, or 3 simultaneous drop-offs"
          interpretation={{
            measuring: 'Average delivery minutes as a function of simultaneous multi-order batching.',
            shows: '0 batches = 23.32 min; 1 batch = 27.30 min; 2 batches = 40.89 min; 3 batches = 48.26 min (+107% delay).',
            whyMatters: 'Reveals that stacking more than 1 delivery per driver degrades customer experience exponentially.'
          }}
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={multipleData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                <XAxis 
                  dataKey="multiple_deliveries" 
                  stroke="#8E8CA6" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <YAxis stroke="#8E8CA6" fontSize={11} tickLine={false} unit="m" domain={[0, 55]} />
                <Tooltip content={<CustomTooltip unit="min" />} />
                <Bar dataKey="Avg_Delivery_Minutes" name="Avg Latency" fill="#48E5E0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Heuristic Latency Simulator */}
      <div className="bg-[#19192A] border border-[#34334B] rounded-2xl p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#34334B]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6FF3F]/10 border border-[#D6FF3F]/30 text-[#D6FF3F] text-xs font-mono font-bold tracking-wider uppercase mb-2">
              <Calculator size={14} /> Interactive PySpark Simulation Model
            </div>
            <h3 className="text-xl font-bold font-display text-[#F8F7FF] tracking-tight">
              Dynamic Trip Latency Heuristic Calculator
            </h3>
            <p className="text-xs text-[#B8B6CC] mt-1">
              Select environmental and operational parameters to project expected fulfillment latency based on empirical Spark weights.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#10101B] border border-[#34334B] px-5 py-3 rounded-xl shrink-0">
            <div>
              <div className="text-[11px] font-mono text-[#8E8CA6] uppercase">Predicted SLA</div>
              <div className="text-2xl font-bold font-display text-[#D6FF3F]">
                {predictedLatency.toFixed(1)} <span className="text-xs font-sans text-[#B8B6CC]">minutes</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#D6FF3F]/10 border border-[#D6FF3F]/30 flex items-center justify-center text-[#D6FF3F]">
              <Clock size={20} />
            </div>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {/* City */}
          <div>
            <label className="block text-[11px] font-mono text-[#8E8CA6] mb-1.5 uppercase">Urban Zone</label>
            <select
              value={simCity}
              onChange={(e) => setSimCity(e.target.value)}
              className="w-full bg-[#10101B] border border-[#34334B] rounded-lg px-2.5 py-2 text-xs text-[#F8F7FF] focus:outline-none focus:border-[#D6FF3F]"
            >
              <option value="Urban">Urban</option>
              <option value="Metropolitian">Metropolitan</option>
              <option value="Semi-Urban">Semi-Urban</option>
            </select>
          </div>

          {/* Vehicle */}
          <div>
            <label className="block text-[11px] font-mono text-[#8E8CA6] mb-1.5 uppercase">Vehicle Modality</label>
            <select
              value={simVehicle}
              onChange={(e) => setSimVehicle(e.target.value)}
              className="w-full bg-[#10101B] border border-[#34334B] rounded-lg px-2.5 py-2 text-xs text-[#F8F7FF] focus:outline-none focus:border-[#D6FF3F]"
            >
              <option value="Electric Scooter">Electric Scooter</option>
              <option value="Scooter">Scooter</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Bicycle">Bicycle</option>
            </select>
          </div>

          {/* Traffic */}
          <div>
            <label className="block text-[11px] font-mono text-[#8E8CA6] mb-1.5 uppercase">Traffic Density</label>
            <select
              value={simTraffic}
              onChange={(e) => setSimTraffic(e.target.value)}
              className="w-full bg-[#10101B] border border-[#34334B] rounded-lg px-2.5 py-2 text-xs text-[#F8F7FF] focus:outline-none focus:border-[#D6FF3F]"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Jam">Jam (Gridlock)</option>
            </select>
          </div>

          {/* Weather */}
          <div>
            <label className="block text-[11px] font-mono text-[#8E8CA6] mb-1.5 uppercase">Weather</label>
            <select
              value={simWeather}
              onChange={(e) => setSimWeather(e.target.value)}
              className="w-full bg-[#10101B] border border-[#34334B] rounded-lg px-2.5 py-2 text-xs text-[#F8F7FF] focus:outline-none focus:border-[#D6FF3F]"
            >
              <option value="Sunny">Sunny</option>
              <option value="Stormy">Stormy</option>
              <option value="Sandstorms">Sandstorms</option>
              <option value="Windy">Windy</option>
              <option value="Cloudy">Cloudy</option>
              <option value="Fog">Fog</option>
            </select>
          </div>

          {/* Multiple Deliveries */}
          <div>
            <label className="block text-[11px] font-mono text-[#8E8CA6] mb-1.5 uppercase">Stacked Drops</label>
            <select
              value={simMulti}
              onChange={(e) => setSimMulti(e.target.value)}
              className="w-full bg-[#10101B] border border-[#34334B] rounded-lg px-2.5 py-2 text-xs text-[#F8F7FF] focus:outline-none focus:border-[#D6FF3F]"
            >
              <option value="0">0 Batched (Direct)</option>
              <option value="1">1 Multi-Drop</option>
              <option value="2">2 Multi-Drops</option>
              <option value="3">3 Multi-Drops</option>
            </select>
          </div>

          {/* Festival */}
          <div>
            <label className="block text-[11px] font-mono text-[#8E8CA6] mb-1.5 uppercase">Festival Surge</label>
            <select
              value={simFestival}
              onChange={(e) => setSimFestival(e.target.value)}
              className="w-full bg-[#10101B] border border-[#34334B] rounded-lg px-2.5 py-2 text-xs text-[#F8F7FF] focus:outline-none focus:border-[#D6FF3F]"
            >
              <option value="No">No (Normal)</option>
              <option value="Yes">Yes (Festival Event)</option>
            </select>
          </div>
        </div>

        {/* Contributing Factor Breakdown Chart */}
        <div>
          <div className="text-xs font-mono text-[#8E8CA6] uppercase mb-2">
            Decomposed Factor Latency Contributions (Minutes)
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={factorContributions} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <XAxis dataKey="factor" stroke="#8E8CA6" fontSize={11} tickLine={false} />
                <YAxis stroke="#8E8CA6" fontSize={11} tickLine={false} unit="m" />
                <Tooltip content={<CustomTooltip unit="min" />} />
                <Bar dataKey="delay" name="Delay Contribution" fill="#48E5E0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
