import React from "react";
import { WeatherData } from "../../types/WeatherData";

interface WeatherDataProps {
  weatherData: WeatherData;
  date: Date;
}
const WeatherCard: React.FC<WeatherDataProps> = ({ weatherData, date }) => (
  <div className="weather-card d-flex flex-column gap-1 justify-content-center">
    {weatherData.weather.map((item, index) => (
      <div key={index} className="weather-data">
        <p className="temperature text">{item.description}</p>
        <img
          src={`https://openweathermap.org/img/wn/${item.icon}.png`}
          alt=""
        />
      </div>
    ))}
    <p className="text">City: {weatherData.name}</p>
    <p className="text">Temperature: {weatherData.main.temp}°C</p>
    <p className="text">Wind Speed : {weatherData.wind.speed} km/h</p>
    <p className="text">Humidity : {weatherData.main.humidity}%</p>
    <p className="text">Last Updated Time : {date.toLocaleString()}</p>
  </div>
);

export default WeatherCard;
