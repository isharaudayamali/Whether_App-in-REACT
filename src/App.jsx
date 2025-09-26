import React from 'react'
import { useState } from 'react';
import axios from 'axios';

  const API_KEY=import.meta.env.VITE_API_KEY;

function App(){

 const [weather, setWeather]=useState(null);
 const [city, setCity]=useState('');
  const [error, setError] = useState(null);

 const fetchWeather= async(city)=>{
  if(!city) return;

 try{
 
 const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  setWeather(response.data);
  console.log(response.data);
 }catch(error){
  console.log(error.response.data);
  setWeather(null);
  setError('City not found!');
}
  };

  //fetchWeather();
  
  const handleKeyDown=(e)=> {
    if(e.key === 'Enter') {
    console.log(e);
    fetchWeather(city);
  }
};

  return (
    <div>
    
    <h1>Weather App</h1>
   
      <input type="text" value={city} placeholder="Enter city" onChange={(e) => setCity(e.target.value)} onKeyDown={ handleKeyDown }/>

       <button onClick={() => { fetchWeather(city);}}>Get Weather</button>

      {weather && (
        <div className='main-card'>
       
       <div><h2>{weather.name}- {weather.sys.country}</h2></div>
       <div><p> {weather.weather[0].main} - {weather.weather[0].description}</p></div>
       <br />
      <div><p>Temperature : {weather.main.temp}°C</p></div>
      <div><p>Humidity : {weather.main.humidity}%</p></div>
      <div><p>Wind Speed : {weather.wind.speed}m/s</p></div>
      </div>)}


     </div>
  );     
}
export default App