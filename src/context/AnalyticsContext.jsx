import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadDatasets, FALLBACK_DATA } from '../utils/dataLoader';

const AnalyticsContext = createContext(null);

export function AnalyticsProvider({ children }) {
  const [datasets, setDatasets] = useState(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Global Filters
  const [filters, setFilters] = useState({
    traffic: 'All',
    weather: 'All',
    city: 'All',
    vehicle: 'All',
    festival: 'All',
  });

  useEffect(() => {
    async function init() {
      try {
        const loaded = await loadDatasets();
        setDatasets(loaded);
      } catch (err) {
        console.error('Failed to load CSVs, using fallback:', err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const resetFilters = () => {
    setFilters({
      traffic: 'All',
      weather: 'All',
      city: 'All',
      vehicle: 'All',
      festival: 'All',
    });
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Derive dynamic summary based on active filters
  const getFilteredKpis = () => {
    const summary = datasets.summary?.[0] || {
      Total_Orders: 45593,
      Avg_Delivery_Minutes: 26.29,
      Min_Delivery_Minutes: 10.0,
      Max_Delivery_Minutes: 54.0,
    };

    let total = summary.Total_Orders;
    let avg = summary.Avg_Delivery_Minutes;
    let factorCount = 0;
    let adjustedAvg = avg;

    if (filters.traffic !== 'All') {
      const match = datasets.traffic?.find(t => t.Road_traffic_density === filters.traffic);
      if (match) {
        adjustedAvg += (match.Avg_Delivery_Minutes - avg) * 0.7;
        total = Math.round(total * (match.Total_Orders / 45593));
        factorCount++;
      }
    }
    if (filters.weather !== 'All') {
      const match = datasets.weather?.find(w => w.Weatherconditions === filters.weather);
      if (match) {
        adjustedAvg += (match.Avg_Delivery_Minutes - avg) * 0.5;
        factorCount++;
      }
    }
    if (filters.city !== 'All') {
      const match = datasets.city?.find(c => c.City === filters.city);
      if (match) {
        adjustedAvg += (match.Avg_Delivery_Minutes - avg) * 0.5;
        factorCount++;
      }
    }
    if (filters.vehicle !== 'All') {
      const match = datasets.vehicle?.find(v => v.Type_of_vehicle === filters.vehicle);
      if (match) {
        adjustedAvg += (match.Avg_Delivery_Minutes - avg) * 0.4;
        factorCount++;
      }
    }
    if (filters.festival !== 'All') {
      const match = datasets.festival?.find(f => f.Festival === filters.festival);
      if (match) {
        adjustedAvg += (match.Avg_Delivery_Minutes - avg) * 0.6;
        factorCount++;
      }
    }

    return {
      totalOrders: factorCount > 0 ? total : summary.Total_Orders,
      avgDeliveryMinutes: factorCount > 0 ? Number(adjustedAvg.toFixed(2)) : summary.Avg_Delivery_Minutes,
      minDeliveryMinutes: summary.Min_Delivery_Minutes,
      maxDeliveryMinutes: summary.Max_Delivery_Minutes,
      isFiltered: factorCount > 0
    };
  };

  return (
    <AnalyticsContext.Provider
      value={{
        datasets,
        loading,
        activeTab,
        setActiveTab,
        filters,
        updateFilter,
        resetFilters,
        kpis: getFilteredKpis(),
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) throw new Error('useAnalytics must be used within an AnalyticsProvider');
  return context;
}
