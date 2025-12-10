// src/components/LocationSelector.js
import React from 'react';

// Mock location data including typical AQI values for a realistic demo
const MOCK_LOCATIONS = [
    { id: 1, name: 'Gachibowli', aqi: 78, level: 'Good' },
    { id: 2, name: 'Begumpet', aqi: 112, level: 'Moderate' },
    { id: 3, name: 'Jubilee Hills', aqi: 65, level: 'Good' },
    { id: 4, name: 'Charminar', aqi: 135, level: 'Unhealthy' },
    { id: 5, name: 'HITEC City', aqi: 85, level: 'Good' },
];

export default function LocationSelector({ selected, onSelect }) {
    return (
        <div className="card h-100 location-selector-card shadow-sm">
            <div className="card-header chart-header">
                📍 **AQI Monitoring Stations**
            </div>
            <div className="list-group list-group-flush location-list flex-grow-1">
                {MOCK_LOCATIONS.map((loc) => (
                    <button
                        key={loc.id}
                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                            selected === loc.name ? 'active-location' : ''
                        }`}
                        onClick={() => onSelect(loc.name)}
                    >
                        <span className="location-name">{loc.name}</span>
                        <span className={`badge rounded-pill aqi-badge aqi-${loc.level.toLowerCase().replace(/\s/g, '-')}`}>
                            {loc.aqi} {loc.level}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}