import React from "react";
import { WeatherData } from "../../types/WeatherData";

interface WeatherDataProps {
  weatherData: WeatherData;
  date: Date;
}
const WeatherCard: React.FC<WeatherDataProps> = ({ weatherData, date }) => (
  <div className="weather-card">
    {weatherData.weather.map((item, index) => (
      <div key={index} className="weather-data">
        <p className="temperature">{item.description}</p>
        <img
          src={`https://openweathermap.org/img/wn/${item.icon}.png`}
          alt=""
        />
      </div>
    ))}
    <p>City: {weatherData.name}</p>
    <p>Temperature: {weatherData.main.temp}°C</p>
    <p>Wind Speed : {weatherData.wind.speed} km/h</p>
    <p>Humidity : {weatherData.main.humidity}%</p>
    <p>Last Updated Time : {date.toLocaleString()}</p>
  </div>
);

export default WeatherCard;
