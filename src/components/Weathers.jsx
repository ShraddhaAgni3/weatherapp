import React from "react";

const Weathers = ({ data }) => {
  return (
    <div className="weather-card">
      <h2>{data.name}, {data.sys.country}</h2>
      <p><strong>Temperature:</strong> {data.main.temp}°C</p>
      <p><strong>Condition:</strong> {data.weather[0].description}</p>
      <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Weather Icon" />
    </div>
  );
};

export default Weathers;
