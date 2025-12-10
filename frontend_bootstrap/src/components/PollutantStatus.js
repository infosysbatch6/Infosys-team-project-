// src/components/PollutantStatus.js
// src/components/PollutantStatus.js
import React from "react";

export default function PollutantStatus({ pm25 = 0, pm10 = 0, co = 0, no2 = 0, so2 = 0, o3 = 0 }) {
  const items = [
    { name: "PM2.5", value: pm25, unit: "µg/m³" },
    { name: "PM10", value: pm10, unit: "µg/m³" },
    { name: "CO", value: co, unit: "ppm" },
    { name: "NO₂", value: no2, unit: "ppb" },
    { name: "SO₂", value: so2, unit: "ppb" },
    { name: "O₃", value: o3, unit: "ppb" }
  ];

  return (
    <div className="pollutant-card">
      <div className="row g-2">
        {items.map(it => (
          <div key={it.name} className="col-6">
            <div className="pollutant-box p-2 text-center">
              <div className="small text-muted">{it.name}</div>
              <div className="h6 fw-bold">{it.value}{it.unit}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
