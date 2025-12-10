// src/components/AQIChart.js
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function AQIChart({ data = [] }) {
  // data: [{ts: '09:00', actual: num, predicted: num}, ...]
  const labels = data.map((d) => d.ts);
  const actual = data.map((d) => d.actual);
  const predicted = data.map((d) => d.predicted);

  const chartData = useMemo(() => ({
    labels,
    datasets: [
      {
        label: "Actual AQI",
        data: actual,
        fill: true,
        tension: 0.4, // Increased tension for smoother lines
        borderColor: "#0ea5e9", // Primary Blue
        backgroundColor: "rgba(14, 165, 233, 0.15)", // Light blue fill
        pointRadius: 4,
        pointBackgroundColor: "#0ea5e9",
        pointHoverRadius: 7,
      },
      {
        label: "Predicted AQI",
        data: predicted,
        fill: false,
        tension: 0.4, 
        borderColor: "#10b981", // Success Green
        borderDash: [8, 6], // Dotted line for prediction
        pointRadius: 3,
        pointBackgroundColor: "#10b981",
        pointHoverRadius: 6,
      }
    ]
  }), [labels, actual, predicted]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
          position: "top",
          labels: {
              usePointStyle: true,
          }
      },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "nearest", intersect: false },
    scales: {
      x: {
        grid: {
            display: false, // Hide vertical grid lines
        },
        ticks: {
            maxRotation: 0,
            minRotation: 0,
            autoSkip: true, 
            maxTicksLimit: 12
        }
      },
      y: {
        beginAtZero: true,
        grid: {
            color: 'rgba(0, 0, 0, 0.05)', // Very light gray horizontal grid lines
            borderDash: [5, 5],
        }
      }
    }
  };

  return (
    <Line data={chartData} options={options} />
  );
}