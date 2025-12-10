// src/components/YearlyAQIBlocks.js
import React from "react";

export default function YearlyAQIBlocks({ lastYear, current }) {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card text-center p-3">
          <h5>Last Year AQI</h5>
          <h3>{lastYear}</h3>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card text-center p-3">
          <h5>Current AQI</h5>
          <h3>{current}</h3>
        </div>
      </div>
    </div>
  );
}
