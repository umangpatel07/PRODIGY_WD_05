import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'YOUR_API_KEY';

  const getWeatherData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('Location not found. Please try again.');
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={getWeatherData}>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
