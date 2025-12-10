// src/components/AQIPieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AQIPieChart({ min, max, latest }) {
  const data = {
    labels: ["Min AQI", "Max AQI", "Latest AQI"],
    datasets: [
      {
        data: [min, max, latest],
        backgroundColor: ["#10b981", "#dc2626", "#0ea5e9"] // Updated colors for better theme integration (Green, Red, Blue)
      }
    ]
  };
  
  const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          legend: { position: "bottom" },
          tooltip: { mode: "index", intersect: false }
      }
  };

  return (
    // REMOVED redundant card wrapper. The parent component (Dashboard.js) now provides the card styling.
    <div style={{ height: '100%' }}> 
        <Pie data={data} options={options} />
    </div>
  );
}