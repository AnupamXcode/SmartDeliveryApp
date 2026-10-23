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

    const hasVehicle = filters.vehicle && filters.vehicle !== 'All';
    const hasTraffic = filters.traffic && filters.traffic !== 'All';
    const hasCity = filters.city && filters.city !== 'All';
    const hasWeather = filters.weather && filters.weather !== 'All';
    const hasFestival = filters.festival && filters.festival !== 'All';

    const isFiltered = hasVehicle || hasTraffic || hasCity || hasWeather || hasFestival;

    if (!isFiltered) {
      return {
        totalOrders: summary.Total_Orders,
        avgDeliveryMinutes: summary.Avg_Delivery_Minutes,
        minDeliveryMinutes: summary.Min_Delivery_Minutes,
        maxDeliveryMinutes: summary.Max_Delivery_Minutes,
        isFiltered: false,
        filterDescription: 'All Fleet Orders',
        activeFiltersList: [],
        vehicleSharePercent: null,
        trafficSharePercent: null,
        deltaVsFleetSLA: 0,
        selectedVehicle: null,
        selectedTraffic: null,
        operationalStatus: 'Baseline Fleet SLA'
      };
    }

    const activeFiltersList = [];
    let total = summary.Total_Orders;
    let avg = summary.Avg_Delivery_Minutes;
    let vehicleSharePercent = null;
    let trafficSharePercent = null;
    let selectedVehicle = null;
    let selectedTraffic = null;
    let operationalStatus = 'Optimal';

    // 1. Single filter: ONLY Vehicle selected
    if (hasVehicle && !hasTraffic && !hasCity && !hasWeather && !hasFestival) {
      const vMatch = datasets.vehicle?.find(v => 
        v.Type_of_vehicle?.trim().toLowerCase() === filters.vehicle.trim().toLowerCase()
      );
      if (vMatch) {
        total = vMatch.Total_Orders;
        avg = vMatch.Avg_Delivery_Minutes;
        vehicleSharePercent = Number(((vMatch.Total_Orders / summary.Total_Orders) * 100).toFixed(1));
        selectedVehicle = vMatch.Type_of_vehicle;
        activeFiltersList.push(`Vehicle: ${vMatch.Type_of_vehicle}`);
        
        if (vMatch.Avg_Delivery_Minutes < 25.0) {
          operationalStatus = 'Optimal';
        } else if (vMatch.Avg_Delivery_Minutes > 27.0) {
          operationalStatus = 'High Friction';
        } else {
          operationalStatus = 'Moderate';
        }
      }
    } 
    // 2. Single filter: ONLY Traffic selected
    else if (hasTraffic && !hasVehicle && !hasCity && !hasWeather && !hasFestival) {
      const tMatch = datasets.traffic?.find(t => 
        t.Road_traffic_density?.trim().toLowerCase() === filters.traffic.trim().toLowerCase()
      );
      if (tMatch) {
        total = tMatch.Total_Orders;
        avg = tMatch.Avg_Delivery_Minutes;
        trafficSharePercent = Number(((tMatch.Total_Orders / summary.Total_Orders) * 100).toFixed(1));
        selectedTraffic = tMatch.Road_traffic_density;
        activeFiltersList.push(`Traffic: ${tMatch.Road_traffic_density}`);

        if (tMatch.Road_traffic_density === 'Jam') {
          operationalStatus = 'Severe Gridlock';
        } else if (tMatch.Road_traffic_density === 'Low') {
          operationalStatus = 'Optimal Flow';
        } else {
          operationalStatus = 'Moderate Traffic';
        }
      }
    }
    // 3. Single filter: ONLY City selected
    else if (hasCity && !hasVehicle && !hasTraffic && !hasWeather && !hasFestival) {
      const cMatch = datasets.city?.find(c => 
        c.City?.trim().toLowerCase() === filters.city.trim().toLowerCase()
      );
      if (cMatch) {
        total = cMatch.Total_Orders;
        avg = cMatch.Avg_Delivery_Minutes;
        activeFiltersList.push(`City: ${cMatch.City}`);

        if (cMatch.City === 'Semi-Urban') {
          operationalStatus = 'Critical Delay Corridor';
        } else if (cMatch.City === 'Urban') {
          operationalStatus = 'High Density Speed';
        } else {
          operationalStatus = 'Standard Metro';
        }
      }
    }
    // 4. Combined / Multi-dimensional filtering
    else {
      let combinedMultiplier = 1.0;
      let latencyAdjustment = 0;

      if (hasVehicle) {
        const vMatch = datasets.vehicle?.find(v => 
          v.Type_of_vehicle?.trim().toLowerCase() === filters.vehicle.trim().toLowerCase()
        );
        if (vMatch) {
          combinedMultiplier *= (vMatch.Total_Orders / summary.Total_Orders);
          latencyAdjustment += (vMatch.Avg_Delivery_Minutes - summary.Avg_Delivery_Minutes);
          vehicleSharePercent = Number(((vMatch.Total_Orders / summary.Total_Orders) * 100).toFixed(1));
          selectedVehicle = vMatch.Type_of_vehicle;
          activeFiltersList.push(`Vehicle: ${vMatch.Type_of_vehicle}`);
        }
      }

      if (hasTraffic) {
        const tMatch = datasets.traffic?.find(t => 
          t.Road_traffic_density?.trim().toLowerCase() === filters.traffic.trim().toLowerCase()
        );
        if (tMatch) {
          combinedMultiplier *= (tMatch.Total_Orders / summary.Total_Orders);
          latencyAdjustment += (tMatch.Avg_Delivery_Minutes - summary.Avg_Delivery_Minutes);
          trafficSharePercent = Number(((tMatch.Total_Orders / summary.Total_Orders) * 100).toFixed(1));
          selectedTraffic = tMatch.Road_traffic_density;
          activeFiltersList.push(`Traffic: ${tMatch.Road_traffic_density}`);
        }
      }

      if (hasCity) {
        const cMatch = datasets.city?.find(c => 
          c.City?.trim().toLowerCase() === filters.city.trim().toLowerCase()
        );
        if (cMatch) {
          combinedMultiplier *= (cMatch.Total_Orders / summary.Total_Orders);
          latencyAdjustment += (cMatch.Avg_Delivery_Minutes - summary.Avg_Delivery_Minutes);
          activeFiltersList.push(`City: ${cMatch.City}`);
        }
      }

      total = Math.max(1, Math.round(summary.Total_Orders * combinedMultiplier));
      avg = Math.max(10.0, Math.min(54.0, summary.Avg_Delivery_Minutes + latencyAdjustment));
      operationalStatus = avg > 27.5 ? 'High Friction' : 'Optimal Cohort';
    }

    const deltaVsFleetSLA = Number((avg - summary.Avg_Delivery_Minutes).toFixed(2));

    return {
      totalOrders: total,
      avgDeliveryMinutes: Number(avg.toFixed(2)),
      minDeliveryMinutes: summary.Min_Delivery_Minutes,
      maxDeliveryMinutes: summary.Max_Delivery_Minutes,
      isFiltered: true,
      filterDescription: activeFiltersList.join(' • '),
      activeFiltersList,
      vehicleSharePercent,
      trafficSharePercent,
      deltaVsFleetSLA,
      selectedVehicle,
      selectedTraffic,
      operationalStatus
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
