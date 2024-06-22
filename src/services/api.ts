export const fetchWeatherData = async () => {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=0fe741beb434213988e2bf514a883b8a"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};
