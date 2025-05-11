import React, { useState } from "react";
import Weathers from "./components/Weathers"
import Forecast from "./components/Forecast";
import "./App.css";


const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const apiKey = "ebb7fc0502abd160cd3ce3ada829723b"; // Replace with your API key

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        alert("City not found");
        return;
      }
      setWeatherData(data);
      fetchForecast(city);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const fetchForecast = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setForecastData(data.list);
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };

  return (
    <div className="container">
      <h1>Weather App 🌤️</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={() => fetchWeather(city)}>Get Weather</button>

      {weatherData && <Weathers data={weatherData} />}
      {forecastData && <Forecast data={forecastData} />}
    </div>
  );
};

export default App;
