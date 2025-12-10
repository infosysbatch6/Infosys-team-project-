// src/components/Dashboard.js
import React, { useEffect, useState, useRef } from "react";
import AQIChart from "./AQIChart";          
import AQIPieChart from "./AQIPieChart";    
import AQIBarChart from "./AQIBarChart";    
import "../styles.css";
import axios from "axios";

const HAZARD_AQI = 300; 

const LOCATIONS = [
    'Gachibowli',
    'Begumpet',
    'Jubilee Hills',
    'Charminar',
    'HITEC City',
];

const getLocationBaseAqi = (location) => {
    switch(location) {
        case 'Gachibowli': return 75;
        case 'Begumpet': return 110;
        case 'Jubilee Hills': return 60;
        case 'Charminar': return 130;
        case 'HITEC City': return 80;
        default: return 90;
    }
};

const generateMockData = (locationBaseAqi, hours = 24) => {
    const historical = Array.from({ length: 5 }, (_, i) => {
        const aqi = Math.round(locationBaseAqi * (1 - (5 - i) * 0.05) + (Math.random() * 20 - 10));
        return { year: 2020 + i, aqi: Math.max(50, aqi), co2: 380 + Math.random() * 20, pm: 50 + Math.random() * 20, n2: 80 + Math.random() * 5 };
    });

    const hourly = Array.from({ length: hours }, (_, i) => {
        const actual = Math.round(locationBaseAqi + 20 * Math.sin(i / hours * Math.PI * 2) + Math.random() * 10);
        const predicted = actual + Math.round((Math.random() - 0.5) * 8);
        const label = `${String(i).padStart(2, "0")}:00`;
        return { ts: label, actual: Math.max(10, actual), predicted: Math.max(10, predicted) };
    });
    return { historical, hourly };
};

export default function Dashboard() {
  const [hourlyData, setHourlyData] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [oneYearPrediction, setOneYearPrediction] = useState(100);
  const [fiveYearPrediction, setFiveYearPrediction] = useState(125);

  const pollRef = useRef(null);

  const lastYearAQI = dataset[dataset.length - 2]?.aqi ?? 110;
  const currentAQI = dataset[dataset.length - 1]?.aqi ?? 108;
  const minAQI = dataset.length ? Math.min(...dataset.map(d => d.aqi)) : 80;
  const maxAQI = dataset.length ? Math.max(...dataset.map(d => d.aqi)) : 130;
  const latestAQI = currentAQI;

  const hazardous = latestAQI >= HAZARD_AQI;

  // ---------------- API Call for Prediction ----------------
  const fetchPredictedAQI = async (pm25, pm10, co2, no2) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", { pm25, pm10, co2, no2 });
      return response.data.predicted_aqi;
    } catch (err) {
      console.error("Prediction API error:", err);
      return null;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const pm25 = 70, pm10 = 80, co2 = 400, no2 = 70;
      const predictedAQI = await fetchPredictedAQI(pm25, pm10, co2, no2);
      const mockData = generateMockData(getLocationBaseAqi(selectedLocation));
      setDataset(mockData.historical);
      setHourlyData(mockData.hourly);
      setOneYearPrediction(predictedAQI ?? 100);
      setFiveYearPrediction(predictedAQI ? predictedAQI + 10 : 125);
      setLoading(false);
    };

    loadData();

    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(() => {}, 60000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [selectedLocation]);

  const Card = ({ title, value, subtext, className = "" }) => (
    <div className={`card dashboard-card h-100 ${className}`}>
      <div className="card-body text-center d-flex flex-column justify-content-center">
        <div className="card-title text-muted small fw-bold text-uppercase mb-1">{title}</div>
        <div className="display-value">{value}</div>
        {subtext && <div className="small text-muted">{subtext}</div>}
      </div>
    </div>
  );

  return (
    <div className="container-fluid dashboard-root dashboard-full-height">

      {/* Top Row: Stat Cards */}
      <div className="row g-4 mb-4 top-stat-cards">
        <div className="col-lg-4 col-md-4">
          <Card title="Latest AQI Reading" value={currentAQI} subtext={currentAQI <= 100 ? "Good/Moderate" : "High/Unhealthy"} className={`shadow-lg border-top-${currentAQI <= 100 ? "success" : "danger"}`} />
        </div>
        <div className="col-lg-4 col-md-4">
          <Card title="Last Year AQI" value={lastYearAQI} subtext={`At ${selectedLocation}`} className="shadow-lg border-top-info" />
        </div>
        <div className="col-lg-4 col-md-4">
          <Card title="Alert Status" value={hazardous ? "HAZARD" : "NORMAL"} subtext="Email System Active" className={`shadow-lg border-top-${hazardous ? "danger" : "success"}`} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="row g-4 flex-grow-1" style={{ minHeight: 0 }}>
        <div className="col-lg-8 d-flex flex-column h-100">
          <div className="card chart-card flex-grow-1 h-100 shadow-lg">
            <div className="card-header chart-header d-flex justify-content-between align-items-center">
              <div className="h5 mb-0 fw-bold">AQI Trend & Prediction</div>

              {/* Right-side controls: Location only */}
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="location-select" className="small text-muted mb-0 fw-bold">LOCATION:</label>
                <select id="location-select" className="form-select form-select-sm" style={{ width: '170px' }} value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                  {LOCATIONS.map(loc => (<option key={loc} value={loc}>{loc}</option>))}
                </select>
              </div>
            </div>

            <div className="card-body">
              <div style={{ height: '100%' }}>
                {loading ? <div className="text-center text-muted py-5">Loading data...</div> : <AQIChart data={hourlyData} />}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-4 d-flex flex-column h-100 gap-4">
          <div className="card shadow-lg flex-grow-1 d-flex flex-column" style={{ minHeight: '45%' }}>
            <div className="card-header chart-header">Future AQI Forecast</div>
            <div className="card-body d-flex flex-column justify-content-center">
              <div style={{ height: '120px' }}>
                <AQIBarChart currentAqi={currentAQI} oneYearAqi={oneYearPrediction} fiveYearAqi={fiveYearPrediction} />
              </div>
            </div>
          </div>

          <div className="card shadow-lg flex-grow-1 d-flex flex-column" style={{ minHeight: '45%' }}>
            <div className="card-header chart-header">AQI Range & Alert System</div>
            <div className="card-body d-flex flex-column justify-content-between">
              <div style={{ flexGrow: 1, minHeight: '120px', marginBottom: '15px' }}>
                <AQIPieChart min={minAQI} max={maxAQI} latest={latestAQI} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
