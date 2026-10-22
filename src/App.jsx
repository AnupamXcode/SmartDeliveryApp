import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalyticsProvider, useAnalytics } from './context/AnalyticsContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Overview from './pages/Overview';
import DeliveryPerformance from './pages/DeliveryPerformance';
import TrafficWeather from './pages/TrafficWeather';
import CityVehicleAnalysis from './pages/CityVehicleAnalysis';
import FestivalBatching from './pages/FestivalBatching';
import DataExplorer from './pages/DataExplorer';
import Methodology from './pages/Methodology';

function DashboardContent() {
  const [collapsed, setCollapsed] = useState(false);
  const { activeTab, loading } = useAnalytics();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview key="overview" />;
      case 'performance':
        return <DeliveryPerformance key="performance" />;
      case 'traffic-weather':
        return <TrafficWeather key="traffic-weather" />;
      case 'city-vehicle':
      case 'city-analysis':
      case 'vehicle-analysis':
        return <CityVehicleAnalysis key="city-vehicle" />;
      case 'festival-batching':
        return <FestivalBatching key="festival-batching" />;
      case 'data-explorer':
        return <DataExplorer key="data-explorer" />;
      case 'methodology':
        return <Methodology key="methodology" />;
      default:
        return <Overview key="default" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#10101B] text-[#F8F7FF] flex font-sans antialiased selection:bg-[#D6FF3F] selection:text-[#10101B]">
      {/* Sidebar Navigation */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center gap-3 text-xs text-[#B8B6CC]">
              <div className="w-9 h-9 border-2 border-[#D6FF3F] border-t-transparent rounded-full animate-spin" />
              <span className="font-mono">Loading PySpark Analytical Marts...</span>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {renderActiveView()}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Academic Footer */}
          <footer className="mt-14 pt-6 border-t border-[#34334B] text-center text-xs text-[#8E8CA6] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
            <span>
              Food Delivery Order Trends and Delivery Time Analysis • Big Data Analytics
            </span>
            <span className="text-[11px] text-[#D6FF3F] bg-[#D6FF3F]/10 px-2.5 py-1 rounded border border-[#D6FF3F]/20">
              Apache Hadoop HDFS • PySpark SQL • React 19 + Vite
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AnalyticsProvider>
      <DashboardContent />
    </AnalyticsProvider>
  );
}
