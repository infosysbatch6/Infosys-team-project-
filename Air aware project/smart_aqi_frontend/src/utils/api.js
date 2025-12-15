export const fetchCurrentAQI = async (location) => {
  return {
    location,
    aqi: Math.floor(Math.random() * 200),
    pm25: Math.floor(Math.random() * 100),
    pm10: Math.floor(Math.random() * 100),
    co: Math.floor(Math.random() * 10),
    no2: Math.floor(Math.random() * 50),
    so2: Math.floor(Math.random() * 20),
    o3: Math.floor(Math.random() * 60)
  };
};

export const fetchPredictionAQI = async (location, period) => {
  return {
    location,
    period,
    predicted_aqi: Array.from({ length: 12 }, () => Math.floor(Math.random() * 200))
  };
};
