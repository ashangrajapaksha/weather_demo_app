import "./App.css";
import useFetch from "./hooks/useFetch";
import { fetchWeatherData } from "./services/api";
import { WeatherData } from "./types/WeatherData";

function App() {
  const { data, loading, error } = useFetch<WeatherData[]>(fetchWeatherData);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <></>;
}

export default App;
