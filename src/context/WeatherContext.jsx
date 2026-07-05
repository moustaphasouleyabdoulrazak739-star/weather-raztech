import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getWeatherByCity, getWeatherByCoords } from "../services/weatherService";

const WeatherContext = createContext();
const HISTORY_KEY = "weather-raztech-history";
const MAX_HISTORY = 5;

export function WeatherProvider({ children }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Niamey");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const addToHistory = useCallback((cityName) => {
    setHistory((prev) => {
      const filtered = prev.filter(
        (c) => c.toLowerCase() !== cityName.toLowerCase()
      );
      const updated = [cityName, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const searchCity = useCallback(
    async (cityName) => {
      if (!cityName || !cityName.trim()) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getWeatherByCity(cityName.trim(), 5);
        setWeatherData(data);
        setCity(data.location.name);
        addToHistory(data.location.name);
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    },
    [addToHistory]
  );

  const searchByCoords = useCallback(
    async (lat, lon) => {
      setLoading(true);
      setError(null);

      try {
        const data = await getWeatherByCoords(lat, lon, 5);
        setWeatherData(data);
        setCity(data.location.name);
        addToHistory(data.location.name);
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    },
    [addToHistory]
  );

  const value = {
    weatherData,
    loading,
    error,
    city,
    history,
    searchCity,
    searchByCoords,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error(
      "useWeather doit être utilisé à l'intérieur d'un WeatherProvider"
    );
  }
  return context;
}