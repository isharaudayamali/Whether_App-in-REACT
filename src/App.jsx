import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./App.css";
import "./index.css";

import searchIcon from "../src/assets/search.png";
import clearIcon from "../src/assets/clear.png";
import rainIcon from "../src/assets/rain.png";
import cloudsIcon from "../src/assets/cloud.png";
import snowIcon from "../src/assets/snow.png";
import drizzleIcon from "../src/assets/drizzle.png";
import humidityIcon from "../src/assets/humidity.png";
import windIcon from "../src/assets/wind.png";
import locationIcon from "../src/assets/location.png";
import temperatureIcon from "../src/assets/temper.png";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [forcast, setForcast] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {}, []);

  //fetch weather
  const fetchWeather = async (city) => {
    if (!city) return false;
    setError("");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      localStorage.setItem("lastSearchedCity", city);
      return true;
    } catch (err) {
      console.log(err?.response?.data || err.message);
      setWeather(null);
      if (err?.response?.data?.message === "city not found") {
        setError("City not found. Please try again.");
      } else if (!err?.response) {
        setError("Network error. Check your connection.");
      } else {
        setError("Unable to fetch weather. Please try again later.");
      }
      return false;
    }
  };

  //fetch weather forcast
  const fetchWeatherForcast = async (city) => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForcast(response.data.list);
    } catch (err) {
      console.log(err?.response?.data || err.message);
      setForcast(null);
      if (err?.response?.data?.message === "city not found") {
        setError("City not found (forecast). Please try again.");
      }
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const ok = await fetchWeather(city);
      if (ok) fetchWeatherForcast(city);
    }
  };

  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1>WeatherPro</h1>
            <p>Your Personal Weather Companion</p>
          </div>
          <nav className="nav-links">
            <a href="#current" className="nav-link active">
              Current
            </a>
            <a href="#forecast" className="nav-link">
              Forecast
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Animated Weather Container */}
      <div className="weather-animation-section">
        <div id="fabrizio"></div>
        <div className="container">
          <div className="sunny"></div>
          <div className="cloudy"></div>
          <div className="rainy"></div>
          <div className="snowy"></div>
          <div className="rainbow"></div>
          <div className="starry"></div>
          <div className="stormy"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section" id="current">
        <div className="hero-content">
          <h2 className="hero-title">Real-Time Weather Updates</h2>
          <p className="hero-subtitle">
            Get accurate weather information for any city worldwide
          </p>
        </div>
      </section>

      {/* Main Weather Section */}
      <main className="main-content">
        <div className="weather-container">
          <div className="weather-card">
            <h3 className="section-title">Current Weather</h3>

            <div className="search">
              <input
                type="text"
                value={city}
                placeholder="Search for a city..."
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <img
                src={searchIcon}
                alt="Search"
                onClick={() => {
                  fetchWeather(city);
                  fetchWeatherForcast(city);
                }}
              />
            </div>

            {error && (
              <div className="error">
                <p>{error}</p>
              </div>
            )}

            {!weather && !error && (
              <div className="welcome-message">
                <h4>Welcome to WeatherPro! 🌤️</h4>
                <p>
                  Enter a city name above to get started with real-time weather
                  data.
                </p>
              </div>
            )}

            {weather && (
              <div className="main-card">
                <div className="weather-header">
                  {weather?.weather?.[0]?.icon && (
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={`Weather icon for ${weather.weather[0].description}`}
                      className="weatherIcon"
                    />
                  )}
                  <div className="weather-title-section">
                    <h2 className="location">
                      <img src={locationIcon} alt="" className="loca" />
                      {weather.name}, {weather.sys.country}
                    </h2>
                    <p className="weather-description">
                      {weather.weather[0].main} -{" "}
                      {weather.weather[0].description}
                    </p>
                  </div>
                </div>

                <div className="weather-details-grid">
                  <div className="detail-card temperature">
                    <img src={temperatureIcon} alt="" className="detail-icon" />
                    <div className="detail-info">
                      <span className="detail-value">
                        {Math.round(weather.main.temp)}°C
                      </span>
                      <span className="detail-label">Temperature</span>
                      <span className="detail-extra">
                        Feels like {Math.round(weather.main.feels_like)}°C
                      </span>
                    </div>
                  </div>

                  <div className="detail-card humidity">
                    <img src={humidityIcon} alt="" className="detail-icon" />
                    <div className="detail-info">
                      <span className="detail-value">
                        {weather.main.humidity}%
                      </span>
                      <span className="detail-label">Humidity</span>
                    </div>
                  </div>

                  <div className="detail-card wind">
                    <img src={windIcon} alt="" className="detail-icon" />
                    <div className="detail-info">
                      <span className="detail-value">
                        {weather.wind.speed} m/s
                      </span>
                      <span className="detail-label">Wind Speed</span>
                    </div>
                  </div>

                  <div className="detail-card pressure">
                    <img src={cloudsIcon} alt="" className="detail-icon" />
                    <div className="detail-info">
                      <span className="detail-value">
                        {weather.main.pressure} hPa
                      </span>
                      <span className="detail-label">Pressure</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Forecast Section */}
        {forcast && (
          <section className="forecast-section" id="forecast">
            <div className="forecast-container">
              <div className="section-header">
                <h2 className="forecast-title">Extended Forecast</h2>
                <p className="forecast-subtitle">
                  5-day weather outlook with 3-hour intervals
                </p>
              </div>

              <div className="forecast-grid">
                {forcast.slice(0, 15).map((f, index) => {
                  const date = new Date(f.dt * 1000);
                  const time = date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const day = date.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <div className="forecast-card-vertical" key={index}>
                      <div className="forecast-header">
                        <div className="forecast-date">{day}</div>
                        <div className="forecast-time">{time}</div>
                      </div>

                      <div className="forecast-weather">
                        <img
                          src={`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`}
                          alt={f.weather[0].description}
                          className="forecast-icon"
                        />
                        <div className="forecast-condition">
                          {f.weather[0].main}
                        </div>
                      </div>

                      <div className="forecast-details">
                        <div className="forecast-temp">
                          <img
                            src={temperatureIcon}
                            alt=""
                            className="detail-icon"
                          />
                          <span>{Math.round(f.main.temp)}°C</span>
                        </div>

                        <div className="forecast-humidity">
                          <img
                            src={humidityIcon}
                            alt=""
                            className="detail-icon"
                          />
                          <span>{f.main.humidity}%</span>
                        </div>

                        <div className="forecast-wind">
                          <img src={windIcon} alt="" className="detail-icon" />
                          <span>{f.wind.speed}m/s</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="about-container">
          <h2 className="about-title">About WeatherPro</h2>
          <div className="about-content">
            <div className="feature-card">
              <h3>🌍 Global Coverage</h3>
              <p>
                Get weather data for cities worldwide with accurate, real-time
                information.
              </p>
            </div>
            <div className="feature-card">
              <h3>⚡ Real-Time Updates</h3>
              <p>
                Stay updated with current weather conditions and 5-day
                forecasts.
              </p>
            </div>
            <div className="feature-card">
              <h3>📱 Responsive Design</h3>
              <p>
                Beautiful, modern interface that works perfectly on all devices.
              </p>
            </div>
            <div className="feature-card">
              <h3>🎨 Visual Weather</h3>
              <p>
                Enjoy animated weather effects and intuitive visual
                representations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>WeatherPro</h4>
            <p>
              Your trusted weather companion for accurate forecasts and
              real-time updates.
            </p>
          </div>
          <div className="footer-section">
            <h5>Features</h5>
            <ul>
              <li>Current Weather</li>
              <li>5-Day Forecast</li>
              <li>Global Cities</li>
              <li>Real-Time Data</li>
            </ul>
          </div>
          <div className="footer-section">
            <h5>Data Source</h5>
            <p>Powered by OpenWeatherMap API</p>
            <p className="footer-note">
              © 2025 WeatherPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
