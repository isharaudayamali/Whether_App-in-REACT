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
  const [error, setError] = useState(null);

  useEffect(() => {
 
  }, []);


  const fetchWeather = async (city) => {
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
      localStorage.setItem("lastSearchedCity", city);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      setWeather(null);
      if(error?.response?.data?.message=="city not found"){
        setError("City not found. Please try again.");
      }
    }
  };

  //fetchWeather();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(e);
      fetchWeather(city);
    }
  };

  return (
    <div className="whether">
        {weather?.weather?.[0]?.icon && (
    <img
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  alt={`Weather icon for ${weather.weather[0].description}`}
  className="weatherIcon"
/>

  )}
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          value={city}
          placeholder="Enter city"
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          src={searchIcon}
          alt=""
          onClick={() => {
            fetchWeather(city);
          }}
        />
      </div>
      <div>
        {error && <p className="error">{error}</p>}

      </div>
    
      {weather && (
        <div className="main-card">
          <div>
            <h2 className="location">
              <img src={locationIcon} alt="" className='loca' />
              {weather.name} - {weather.sys.country}
            </h2>
          </div>
          <div>
            <p>
              <img src={cloudsIcon} alt="" className="cloudIcon" />
              {weather.weather[0].main} - {weather.weather[0].description}
            </p>
          </div>
          <div>
            <p>
              <img src={temperatureIcon} alt="" className="tempIcon" />
              Temperature : {weather.main.temp}°C
            </p>
          </div>
          <div>
            <p>
              <img src={humidityIcon} alt="" className="humidityIcon" />
              Humidity : {weather.main.humidity}%
            </p>
          </div>
          <div>
            <p>
              <img src={windIcon} alt="" className="windIcon" />
              Wind Speed : {weather.wind.speed}m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
