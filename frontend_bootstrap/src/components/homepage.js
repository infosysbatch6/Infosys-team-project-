
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1 className="homepage-title"> Smart AQI Prediction System</h1>
      <p className="homepage-subtitle">
        Monitor air quality in real-time and predict PM2.5 levels easily.
        Get insights, take actions, and stay safe with accurate air quality data.
      </p>
      <div className="homepage-buttons">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
        <button
          className="btn btn-outline-light"
          onClick={() => alert("More features coming soon!")}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
