import React, { useState, useEffect } from "react";
import style from './App.module.css'

//img 
const padrao = require('./assets/padrao.jpg')
const clear = require('./assets/clear.jpg')
const clouds = require('./assets/clouds.jpg')
const mist = require('./assets/Mist.jpg')
const rain = require('./assets/rain.jpg')
const snow = require('./assets/snow.jpg')
const thunderstorm = require('./assets/Thunderstorm.jpg')

function App() {
  const api = 'e657f5ab23529133d7b8e9a21370596d'
  const [img, setImg] = useState(padrao)
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")

   async function loadImg() {
    if (weatherData.weather[0].main === 'Clouds') {
      await weatherData
      setImg(clouds)
     } else if (weatherData.weather[0].main === 'Clear') {
      await weatherData
       setImg(clear)
     } else if (weatherData.weather[0].main === 'Mist') {
      await weatherData
       setImg(mist)
     } else if (weatherData.weather[0].main === 'Rain') {
      await weatherData
       setImg(rain)
     } else if (weatherData.weather[0].main === 'Snow') {
      await weatherData
       setImg(snow)
     } else if (weatherData.weather[0].main === 'Thunderstorm') {
      await weatherData
       setImg(thunderstorm)
     }
  }
  loadImg()


  const getWeather = (event) => {  
    if (event.key === "Enter") {    
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${api}`)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data)
          setCity('')
        })
      }
  }
  return (
    <div className={style.app}>
      <img src={img}></img>

      {/* {weatherData.weather[0].main === 'clouds' ? (
        
        <img src={clouds}></img>
      ): (
        <img src={padrao}></img>

      )} */}
      <div className={style.input}>
        <input
          placeholder="Enter City..."
          onChange={e => setCity(e.target.value)}
          value={city}
          onKeyPress={getWeather}
        ></input>
      </div>
      {typeof weatherData.main === 'undefined' ? (
        <div className={style.input}>
          <p><b>Bem vindo ao app do tempo! Coloque a cidade par ver o tempo.</b></p>
          {/* Welcome to weather app! Enter in a city to get the weather of */}
        </div>
      ) : (
        <div className={style.resultado}>
          <div >
            <b><p>{weatherData.name}</p></b>
            <p className={style.temperatura}>{(Math.round(weatherData.main.temp - 32) / 1.8).toFixed(0)}°</p>
            {weatherData.weather[0].main === 'Thunderstorm' ? (
              <>
                <b><p className={style.tempo}>{weatherData.weather[0].main}</p></b>
              </>
            ) : (
              <b><p className={style.tempo}>{weatherData.weather[0].main}</p></b>
            )
            }

          </div>
        </div>
      )
      }
    </div>
  );
}

export default App;
