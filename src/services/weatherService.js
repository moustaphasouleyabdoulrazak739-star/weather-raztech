const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

/**
 * Récupère la météo actuelle + prévisions pour une ville donnée
 * @param {string} city - Nom de la ville (ex: "Niamey")
 * @param {number} days - Nombre de jours de prévisions (1 à 10)
 */
export async function getWeatherByCity(city, days = 5) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
    city
  )}&days=${days}&aqi=no&alerts=no`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData?.error?.message || "Ville introuvable ou erreur API.";
    throw new Error(message);
  }

  return response.json();
}

/**
 * Récupère la météo à partir des coordonnées GPS (géolocalisation)
 * @param {number} lat
 * @param {number} lon
 * @param {number} days
 */
export async function getWeatherByCoords(lat, lon, days = 5) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=${days}&aqi=no&alerts=no`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Impossible de récupérer la météo pour cette position.");
  }

  return response.json();
}