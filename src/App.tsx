import "./App.css";
import useFetch from "./hooks/useFetch";
import { fetchWeatherData } from "./services/api";
import { WeatherData } from "./types/WeatherData";
import Button from "./components/Button/Button";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  const { data, loading, error } = useFetch<WeatherData[]>(fetchWeatherData);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Button
        label="Click"
        onClick={handleClick}
        className="btn-primary btn-sm"
      ></Button>
    </>
  );
}

export default App;
