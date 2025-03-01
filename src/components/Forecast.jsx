import React from "react";

const Forecast = ({ data, city }) => {
  if (!data || data.length === 0) {
    return <p>No forecast data available.</p>;
  }

  // Process data to get the best forecast for each day (closest to 12:00 PM)
  const dailyForecasts = data.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!acc[date] || Math.abs(new Date(item.dt_txt).getHours() - 12) < Math.abs(new Date(acc[date].dt_txt).getHours() - 12)) {
      acc[date] = item;
    }

    return acc;
  }, {});

  return (
    <div className="forecast">
      <h3>5-Day Forecast for {city}</h3>
      <div className="forecast-container">
        {Object.values(dailyForecasts).map((item, index) => (
          <div key={index} className="forecast-item">
            <p><strong>{new Date(item.dt * 1000).toDateString()}</strong></p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
            <p><strong>{item.weather[0].description}</strong></p>
            <p>{Math.round(item.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
