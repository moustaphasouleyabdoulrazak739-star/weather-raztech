import { useState } from "react";
import { useWeather } from "../context/WeatherContext";

function SearchBar() {
  const [input, setInput] = useState("");
  const { searchCity, searchByCoords, loading, history } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      searchCity(input);
      setInput("");
    }
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par ton navigateur.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        searchByCoords(latitude, longitude);
      },
      () => {
        alert("Impossible de récupérer ta position. Vérifie les permissions.");
      }
    );
  };

  const handleHistoryClick = (cityName) => {
    searchCity(cityName);
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Rechercher une ville..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition disabled:opacity-50"
        >
          Rechercher
        </button>
        <button
          type="button"
          onClick={handleGeolocation}
          disabled={loading}
          title="Utiliser ma position"
          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          📍
        </button>
      </form>

      {history.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 justify-center">
          {history.map((cityName) => (
            <button
              key={cityName}
              onClick={() => handleHistoryClick(cityName)}
              className="text-xs px-3 py-1 bg-white/80 text-gray-700 rounded-full hover:bg-white transition"
            >
              {cityName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;