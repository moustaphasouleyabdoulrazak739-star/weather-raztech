import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import ForecastList from "./components/ForecastList";
import { useWeather } from "./context/WeatherContext";
import { useEffect } from "react";

function App() {
  const { searchCity } = useWeather();

  useEffect(() => {
    searchCity("Niamey");
  }, [searchCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600 py-10 px-4">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        🌤️ Weather Raz-Tech
      </h1>

      <div className="mb-8">
        <SearchBar />
      </div>

      <CurrentWeather />
      <ForecastList />
    </div>
  );
}

export default App;