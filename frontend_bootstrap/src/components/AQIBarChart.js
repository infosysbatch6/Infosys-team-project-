// src/components/AQIBarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Helper function to color the bars based on AQI value (Green/Yellow/Red)
const getBarColor = (aqi) => {
    if (aqi <= 50) return "#10b981"; // Good (Green)
    if (aqi <= 100) return "#facc15"; // Moderate (Yellow)
    if (aqi <= 150) return "#f97316"; // Unhealthy (Orange)
    return "#dc2626"; // Hazardous (Red)
};

export default function AQIBarChart({ currentAqi, oneYearAqi, fiveYearAqi }) {
  
  const labels = ["Current", "1 Year", "5 Year"];
  const dataValues = [currentAqi, oneYearAqi, fiveYearAqi];
  const backgroundColors = dataValues.map(getBarColor);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Predicted AQI Level",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 0, // No borders for a cleaner look
        borderRadius: 6, // Rounded bars
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { mode: "index", intersect: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { display: false }, // Hide Y-axis ticks for minimalism
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 } }
      }
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
}