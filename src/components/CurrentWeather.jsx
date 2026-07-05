import { useWeather } from "../context/WeatherContext";

function CurrentWeather() {
  const { weatherData, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="bg-white/90 rounded-2xl shadow-lg p-8 text-center max-w-md w-full mx-auto">
        <p className="text-gray-500">Chargement de la météo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/90 rounded-2xl shadow-lg p-8 text-center max-w-md w-full mx-auto">
        <p className="text-red-600 font-medium">Erreur : {error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  const { location, current } = weatherData;

  return (
    <div className="bg-white/90 rounded-2xl shadow-lg p-8 max-w-md w-full mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-800">
        {location.name}, {location.country}
      </h2>
      <p className="text-sm text-gray-500 mb-4">{location.localtime}</p>

      <div className="flex items-center justify-center gap-4">
        <img
          src={`https:${current.condition.icon}`}
          alt={current.condition.text}
          className="w-20 h-20"
        />
        <div className="text-left">
          <p className="text-5xl font-bold text-gray-800">
            {Math.round(current.temp_c)}°C
          </p>
          <p className="text-gray-500">{current.condition.text}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-600">
        <div className="bg-cyan-50 rounded-lg p-3">
          <p className="font-medium">Ressenti</p>
          <p>{Math.round(current.feelslike_c)}°C</p>
        </div>
        <div className="bg-cyan-50 rounded-lg p-3">
          <p className="font-medium">Humidité</p>
          <p>{current.humidity}%</p>
        </div>
        <div className="bg-cyan-50 rounded-lg p-3">
          <p className="font-medium">Vent</p>
          <p>{current.wind_kph} km/h</p>
        </div>
        <div className="bg-cyan-50 rounded-lg p-3">
          <p className="font-medium">Pression</p>
          <p>{current.pressure_mb} mb</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;