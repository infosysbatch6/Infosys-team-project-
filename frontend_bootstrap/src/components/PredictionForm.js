import React, { useState } from 'react';

export default function PredictionForm({ onResult }) {
  const [actual, setActual] = useState('');
  const [predicted, setPredicted] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const res = {
      aqi: actual ? Number(actual) : 0,
      pm25_prediction: predicted ? Number(predicted) : 0,
    };
    if (onResult) onResult(res);
    setActual('');
    setPredicted('');
  };

  return (
    <form onSubmit={submit}>
      <div className="mb-2">
        <label className="form-label small">Actual AQI</label>
        <input type="number" className="form-control" value={actual} onChange={e => setActual(e.target.value)} placeholder="e.g., 50" />
      </div>
      <div className="mb-2">
        <label className="form-label small">Predicted AQI</label>
        <input type="number" className="form-control" value={predicted} onChange={e => setPredicted(e.target.value)} placeholder="e.g., 55" />
      </div>
      <button className="btn btn-primary w-100" type="submit">Submit Prediction</button>
    </form>
  );
}



