import { useWeather } from "../context/WeatherContext";

function ForecastList() {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const days = weatherData.forecast.forecastday;

  const formatDay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-6">
      <h3 className="text-white font-semibold mb-3 text-center">
        Prévisions sur {days.length} jours
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {days.map((day) => (
          <div
            key={day.date}
            className="bg-white/90 rounded-xl p-4 text-center shadow"
          >
            <p className="text-sm font-medium text-gray-700 capitalize">
              {formatDay(day.date)}
            </p>
            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              className="w-12 h-12 mx-auto"
            />
            <p className="text-sm text-gray-600">{day.day.condition.text}</p>
            <div className="flex justify-center gap-2 mt-1 text-sm">
              <span className="font-semibold text-gray-800">
                {Math.round(day.day.maxtemp_c)}°
              </span>
              <span className="text-gray-400">
                {Math.round(day.day.mintemp_c)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastList;