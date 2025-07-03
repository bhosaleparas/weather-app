import React, { useState, useEffect } from 'react';
import './weather.css'; // We'll create this CSS file next
import clear from './images/clear sky.png'
import cloud from './images/cloudy.png'
import rain from './images/rainy-day.png'
// import sunrise from './images/sunrise.png'
// import sunset from './images/sunset.png'
import thunder from './images/thunderstorm.png'


const Weather = () => {
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace with your actual API key
  const API_KEY =process.env.API_KEY;
  
  
  // Import your weather icons (make sure you have these in your project)
  const weatherIcons = {
    '01d': clear,    
    '01n': clear,   
    '02d': cloud,    
    '02n': cloud,    
    '03d': cloud,    
    '03n': cloud,    
    '04d': cloud,    
    '04n': cloud,    
    '09d': rain,     
    '09n': rain,    
    '10d': rain,     
    '10n': rain,     
    '11d': thunder,  
    '11n': thunder,  
    '13d': cloud,   
    '13n': cloud,    
    '50d': cloud    
  };

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-card">
          <h2 className="city-name">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          
          <div className="weather-icon">
            <img 
              src={weatherIcons[weatherData.weather[0].icon]} 
            // src="./clear-sky.png"
              alt={weatherData.weather[0].description}
            />
            <p className="weather-description">
              {weatherData.weather[0].description}
            </p>
          </div>
          
          <div className="weather-details">
            <div className="temperature">
              <span className="temp-value">
                {Math.round(weatherData.main.temp)}°C
              </span>
              <span className="feels-like">
                Feels like: {Math.round(weatherData.main.feels_like)}°C
              </span>
            </div>
            
            <div className="additional-info">
              <div className="info-item">
                <span className="info-label">Humidity:</span>
                <span className="info-value">{weatherData.main.humidity}%</span>
              </div>
              <div className="info-item">
                <span className="info-label">Wind:</span>
                <span className="info-value">{weatherData.wind.speed} m/s</span>
              </div>
              <div className="info-item">
                <span className="info-label">Pressure:</span>
                <span className="info-value">{weatherData.main.pressure} hPa</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;


