const BASE_URL = "http://127.0.0.1:5000/api/aqi";

export const fetchCurrentAQI = async (location) => {
  const res = await fetch(`${BASE_URL}/current?location=${location}`);
  return await res.json();
};

export const fetchPredictionAQI = async (location) => {
  const res = await fetch(`${BASE_URL}/predict?location=${location}`);
  return await res.json();
};
