import Papa from 'papaparse';

// Direct fallback datasets matching the PySpark exported aggregates
export const FALLBACK_DATA = {
  summary: [
    { Total_Orders: 45593, Avg_Delivery_Minutes: 26.29, Min_Delivery_Minutes: 10.0, Max_Delivery_Minutes: 54.0 }
  ],
  vehicle: [
    { Type_of_vehicle: 'Motorcycle', Total_Orders: 26435, Avg_Delivery_Minutes: 27.61 },
    { Type_of_vehicle: 'Scooter', Total_Orders: 15276, Avg_Delivery_Minutes: 24.48 },
    { Type_of_vehicle: 'Electric Scooter', Total_Orders: 3814, Avg_Delivery_Minutes: 24.47 },
    { Type_of_vehicle: 'Bicycle', Total_Orders: 68, Avg_Delivery_Minutes: 26.43 }
  ],
  traffic: [
    { Road_traffic_density: 'Low', Total_Orders: 15477, Avg_Delivery_Minutes: 21.27 },
    { Road_traffic_density: 'Medium', Total_Orders: 10947, Avg_Delivery_Minutes: 26.70 },
    { Road_traffic_density: 'High', Total_Orders: 4425, Avg_Delivery_Minutes: 27.24 },
    { Road_traffic_density: 'Jam', Total_Orders: 14143, Avg_Delivery_Minutes: 31.18 },
    { Road_traffic_density: 'Unspecified', Total_Orders: 601, Avg_Delivery_Minutes: 26.54 }
  ],
  weather: [
    { Weatherconditions: 'Sunny', Total_Orders: 7284, Avg_Delivery_Minutes: 21.86 },
    { Weatherconditions: 'Stormy', Total_Orders: 7586, Avg_Delivery_Minutes: 25.87 },
    { Weatherconditions: 'Sandstorms', Total_Orders: 7495, Avg_Delivery_Minutes: 25.88 },
    { Weatherconditions: 'Windy', Total_Orders: 7422, Avg_Delivery_Minutes: 26.12 },
    { Weatherconditions: 'Fog', Total_Orders: 7654, Avg_Delivery_Minutes: 28.92 },
    { Weatherconditions: 'Cloudy', Total_Orders: 7536, Avg_Delivery_Minutes: 28.92 }
  ],
  rating: [
    { Delivery_person_Ratings: '1.0', Rating_Numeric: 1.0, Total_Orders: 38, Avg_Delivery_Minutes: 26.0 },
    { Delivery_person_Ratings: '2.5', Rating_Numeric: 2.5, Total_Orders: 20, Avg_Delivery_Minutes: 37.3 },
    { Delivery_person_Ratings: '2.6', Rating_Numeric: 2.6, Total_Orders: 22, Avg_Delivery_Minutes: 38.59 },
    { Delivery_person_Ratings: '2.7', Rating_Numeric: 2.7, Total_Orders: 22, Avg_Delivery_Minutes: 35.86 },
    { Delivery_person_Ratings: '2.8', Rating_Numeric: 2.8, Total_Orders: 19, Avg_Delivery_Minutes: 36.63 },
    { Delivery_person_Ratings: '2.9', Rating_Numeric: 2.9, Total_Orders: 19, Avg_Delivery_Minutes: 38.53 },
    { Delivery_person_Ratings: '3.0', Rating_Numeric: 3.0, Total_Orders: 6, Avg_Delivery_Minutes: 32.67 },
    { Delivery_person_Ratings: '3.1', Rating_Numeric: 3.1, Total_Orders: 29, Avg_Delivery_Minutes: 36.55 },
    { Delivery_person_Ratings: '3.2', Rating_Numeric: 3.2, Total_Orders: 29, Avg_Delivery_Minutes: 36.34 },
    { Delivery_person_Ratings: '3.3', Rating_Numeric: 3.3, Total_Orders: 25, Avg_Delivery_Minutes: 36.04 },
    { Delivery_person_Ratings: '3.4', Rating_Numeric: 3.4, Total_Orders: 32, Avg_Delivery_Minutes: 35.72 },
    { Delivery_person_Ratings: '3.5', Rating_Numeric: 3.5, Total_Orders: 249, Avg_Delivery_Minutes: 37.06 },
    { Delivery_person_Ratings: '3.6', Rating_Numeric: 3.6, Total_Orders: 207, Avg_Delivery_Minutes: 37.29 },
    { Delivery_person_Ratings: '3.7', Rating_Numeric: 3.7, Total_Orders: 225, Avg_Delivery_Minutes: 37.36 },
    { Delivery_person_Ratings: '3.8', Rating_Numeric: 3.8, Total_Orders: 228, Avg_Delivery_Minutes: 37.1 },
    { Delivery_person_Ratings: '3.9', Rating_Numeric: 3.9, Total_Orders: 197, Avg_Delivery_Minutes: 37.49 },
    { Delivery_person_Ratings: '4.0', Rating_Numeric: 4.0, Total_Orders: 1077, Avg_Delivery_Minutes: 34.74 },
    { Delivery_person_Ratings: '4.1', Rating_Numeric: 4.1, Total_Orders: 1430, Avg_Delivery_Minutes: 34.53 },
    { Delivery_person_Ratings: '4.2', Rating_Numeric: 4.2, Total_Orders: 1418, Avg_Delivery_Minutes: 34.53 },
    { Delivery_person_Ratings: '4.3', Rating_Numeric: 4.3, Total_Orders: 1409, Avg_Delivery_Minutes: 34.63 },
    { Delivery_person_Ratings: '4.4', Rating_Numeric: 4.4, Total_Orders: 1361, Avg_Delivery_Minutes: 34.83 },
    { Delivery_person_Ratings: '4.5', Rating_Numeric: 4.5, Total_Orders: 3303, Avg_Delivery_Minutes: 23.65 },
    { Delivery_person_Ratings: '4.6', Rating_Numeric: 4.6, Total_Orders: 6940, Avg_Delivery_Minutes: 24.57 },
    { Delivery_person_Ratings: '4.7', Rating_Numeric: 4.7, Total_Orders: 7142, Avg_Delivery_Minutes: 24.17 },
    { Delivery_person_Ratings: '4.8', Rating_Numeric: 4.8, Total_Orders: 7148, Avg_Delivery_Minutes: 24.03 },
    { Delivery_person_Ratings: '4.9', Rating_Numeric: 4.9, Total_Orders: 7041, Avg_Delivery_Minutes: 24.12 },
    { Delivery_person_Ratings: '5.0', Rating_Numeric: 5.0, Total_Orders: 3996, Avg_Delivery_Minutes: 25.53 },
    { Delivery_person_Ratings: '6.0', Rating_Numeric: 6.0, Total_Orders: 53, Avg_Delivery_Minutes: 23.94 },
    { Delivery_person_Ratings: 'Unrated', Rating_Numeric: null, Total_Orders: 1908, Avg_Delivery_Minutes: 26.42 }
  ],
  order: [
    { Type_of_order: 'Snack', Total_Orders: 11533, Avg_Delivery_Minutes: 26.29 },
    { Type_of_order: 'Meal', Total_Orders: 11458, Avg_Delivery_Minutes: 26.42 },
    { Type_of_order: 'Drinks', Total_Orders: 11322, Avg_Delivery_Minutes: 26.19 },
    { Type_of_order: 'Buffet', Total_Orders: 11280, Avg_Delivery_Minutes: 26.28 }
  ],
  city: [
    { City: 'Urban', Total_Orders: 10136, Avg_Delivery_Minutes: 22.98 },
    { City: 'Metropolitian', Total_Orders: 34093, Avg_Delivery_Minutes: 27.32 },
    { City: 'Semi-Urban', Total_Orders: 164, Avg_Delivery_Minutes: 49.73 }
  ],
  festival: [
    { Festival: 'No', Total_Orders: 44469, Avg_Delivery_Minutes: 25.98 },
    { Festival: 'Yes', Total_Orders: 896, Avg_Delivery_Minutes: 45.52 }
  ],
  multiple_delivery: [
    { multiple_deliveries: '0.0', Deliveries_Label: '0 Direct Deliveries', Total_Orders: 14095, Avg_Delivery_Minutes: 22.88 },
    { multiple_deliveries: '1.0', Deliveries_Label: '1 Stacked Delivery', Total_Orders: 28159, Avg_Delivery_Minutes: 26.86 },
    { multiple_deliveries: '2.0', Deliveries_Label: '2 Stacked Deliveries', Total_Orders: 1985, Avg_Delivery_Minutes: 40.45 },
    { multiple_deliveries: '3.0', Deliveries_Label: '3 Stacked Deliveries', Total_Orders: 361, Avg_Delivery_Minutes: 47.82 },
    { multiple_deliveries: 'Unspecified', Deliveries_Label: 'Unspecified', Total_Orders: 993, Avg_Delivery_Minutes: 22.77 }
  ]
};

export const DATASET_METADATA = {
  summary: { filename: 'overall_summary.csv', title: 'Overall Summary', description: 'Fleet-wide high-level delivery benchmarks and bounds.' },
  vehicle: { filename: 'vehicle_analysis.csv', title: 'Vehicle Modality', description: 'Delivery duration and order volume across vehicle types.' },
  traffic: { filename: 'traffic_analysis.csv', title: 'Traffic Density', description: 'Roadway congestion impact on delivery latency.' },
  weather: { filename: 'weather_analysis.csv', title: 'Weather Conditions', description: 'Atmospheric conditions and delivery speed tradeoffs.' },
  rating: { filename: 'rating_analysis.csv', title: 'Driver Ratings', description: 'Courier performance rating score vs fulfillment latency.' },
  order: { filename: 'order_analysis.csv', title: 'Order Categories', description: 'Food classification demand and duration metrics.' },
  city: { filename: 'city_analysis.csv', title: 'City Categories', description: 'Urban, metropolitan, and semi-urban transit latency.' },
  festival: { filename: 'festival_analysis.csv', title: 'Festival Impact', description: 'Fulfillment latency surge during festival seasons.' },
  multiple_delivery: { filename: 'multiple_delivery_analysis.csv', title: 'Multiple Deliveries', description: 'Compounding delays from stacked multi-order dispatching.' }
};

// Clean helper to parse raw CSV strings
function sanitizeAndParseCsv(csvText, key) {
  const parsed = Papa.parse(csvText.trim(), { header: true, skipEmptyLines: true });
  if (!parsed.data || parsed.data.length === 0) return FALLBACK_DATA[key];

  return parsed.data.map((row) => {
    const cleaned = {};
    for (const [k, v] of Object.entries(row)) {
      const cleanKey = k.trim();
      let val = typeof v === 'string' ? v.trim() : v;

      // Handle numbers
      if (cleanKey.includes('Minutes') || cleanKey.includes('Ratings') || cleanKey === 'Total_Orders') {
        const num = parseFloat(val);
        cleaned[cleanKey] = isNaN(num) ? val : num;
      } else {
        cleaned[cleanKey] = val || 'Unspecified';
      }
    }

    // Special cleanups
    if (cleaned.Type_of_vehicle) {
      cleaned.Type_of_vehicle = cleaned.Type_of_vehicle
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
    }
    if (cleaned.Road_traffic_density === '') cleaned.Road_traffic_density = 'Unspecified';
    if (cleaned.Weatherconditions === '') cleaned.Weatherconditions = 'Unspecified';
    if (cleaned.Delivery_person_Ratings !== undefined) {
      cleaned.Rating_Numeric = parseFloat(cleaned.Delivery_person_Ratings) || null;
    }
    if (cleaned.multiple_deliveries !== undefined) {
      const num = parseFloat(cleaned.multiple_deliveries);
      cleaned.Deliveries_Label = isNaN(num) ? 'Unspecified' : `${num.toFixed(0)} Stacked Deliveries`;
    }

    return cleaned;
  });
}

// Fetch all CSV datasets
export async function loadDatasets() {
  const datasets = {};

  for (const [key, meta] of Object.entries(DATASET_METADATA)) {
    try {
      const res = await fetch(`/data/${meta.filename}`);
      if (res.ok) {
        const text = await res.text();
        datasets[key] = sanitizeAndParseCsv(text, key);
      } else {
        datasets[key] = FALLBACK_DATA[key];
      }
    } catch {
      datasets[key] = FALLBACK_DATA[key];
    }
  }

  return datasets;
}
