import React, { FormEvent, useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import { WeatherData } from "../../types/WeatherData";
import { useGeolocation } from "../../hooks/useGeoLocation";
import { LocationData } from "../../types/LocationData";
import WeatherCard from "../../components/Weathercard/WeatherCard";

const Home = () => {
  const { location } = useGeolocation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>();
  const [weatherDataError, setWeatherDataError] = useState<string | null>(null);
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cityName = (formData.get("city") as string).trim();
    setCity(cityName);
    fetchData(cityName);
  };
  const fetchData = async (city?: string) => {
    try {
      setWeatherDataError(null);
      setWeatherData(null);
      setLoading(true);

      if (!(city || (location.latitude && location.longitude))) {
        setWeatherDataError("Enter your city or or allow location access");
        throw new Error("City or latitude and longitude are required");
      }
      // Construct params object based on provided props
      const params = {
        appid: import.meta.env.VITE_APP_API_KEY as string,
        units: "metric",
        ...(city
          ? { q: city }
          : { lat: `${location.latitude}`, lon: `${location.longitude}` }),
      };

      // Construct URL with query parameters
      const queryString = new URLSearchParams(params).toString();
      const url = `${
        import.meta.env.VITE_APP_BASE_URL as string
      }?${queryString}`;

      // Fetch weather data
      const response = await fetch(url);

      // Check if response is successful
      if (!response.ok) {
        if (response.status === 404) {
          setWeatherDataError("City not found");
        } else {
          setWeatherDataError("Something went wrong");
        }
        throw new Error("Network response was not ok");
      }

      // Parse response JSON
      const data = await response.json();
      console.log(data);

      setWeatherData(data);
      setDate(new Date());
      setLoading(false);
    } catch (error) {
      // Handle errors
      console.log(
        "There was a problem with the request:",
        (error as Error).message
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.latitude, location.longitude]);

  return (
    <div>
      {" "}
      <div className="d-flex justify-content-center mb-5">
        <h2>Find Weather details</h2>
      </div>
      <div className="d-flex col-auto justify-content-center mb-4">
        <form onSubmit={handleSubmit} className="form">
          <div className="d-flex gap-2">
            {" "}
            <input
              type="text"
              name="city"
              placeholder="Enter city name"
              className="form-control"
            />
            <Button
              label="Search"
              type="submit"
              className="btn-primary btn-sm"
            ></Button>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-center">
        {loading && (
          <div className="spinner-border text-info" role="status">
            <span className="sr-only"></span>
          </div>
        )}
        {weatherDataError && <p>Error: {weatherDataError}</p>}
        {weatherData && <WeatherCard weatherData={weatherData} date={date} />}
      </div>
    </div>
  );
};

export default Home;
