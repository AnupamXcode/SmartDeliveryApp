import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalyticsProvider, useAnalytics } from './context/AnalyticsContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Overview from './pages/Overview';
import DeliveryPerformance from './pages/DeliveryPerformance';
import TrafficWeather from './pages/TrafficWeather';
import CityAnalysis from './pages/CityAnalysis';
import VehicleAnalysis from './pages/VehicleAnalysis';
import FestivalBatching from './pages/FestivalBatching';
import DataExplorer from './pages/DataExplorer';

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
      case 'city-analysis':
        return <CityAnalysis key="city-analysis" />;
      case 'vehicle-analysis':
        return <VehicleAnalysis key="vehicle-analysis" />;
      case 'festival-batching':
        return <FestivalBatching key="festival-batching" />;
      case 'data-explorer':
        return <DataExplorer key="data-explorer" />;
      default:
        return <Overview key="default" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#F1F5F9] flex">
      {/* Sidebar Navigation */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center gap-3 text-xs text-[#A6B3C8]">
              <div className="w-8 h-8 border-2 border-[#38D9F8] border-t-transparent rounded-full animate-spin" />
              <span>Loading PySpark Data Marts...</span>
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
          <footer className="mt-12 pt-6 border-t border-[#233152] text-center text-xs text-[#64748B] flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              Food Delivery Order Trends and Delivery Time Analysis • Big Data Analytics
            </span>
            <span className="font-mono text-[11px] text-[#A6B3C8]">
              Apache Hadoop HDFS • PySpark SQL • React+Vite
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
