import React, { useState } from "react";
import ButtonCs from "../../Components/ButtonCs";
import InputCus from "../../Components/InputCus";
import axios from "axios";

interface Weatherdata {
  name: string;
  humidity: number;
  temperature: number;
  feels_like: number;
  wind_speed: number;
  icon: string;
  description: string;
}

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<Weatherdata | null>(null);
  const [dates, setdates] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false)
  const key: string = "1b67615db12d368802bacd9b9da4b0a4";

  async function fetchweather(city: string) {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    try {
      const response = await axios.get(API);
      if (response.status === 200) {
        const data = response.data;
        setWeather({
          name: data.name,
          humidity: data.main.humidity,
          temperature: data.main.temp,
          feels_like: data.main.feels_like,
          wind_speed: data.wind.speed,
          icon: data.weather[0].icon,
          description: data.weather[0].description,
        });
        setError(false)
      }
    } catch (error) {
        console.warn(error)
        setError(true)
    }
  }

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  const handleweatherclick = () => {
    fetchweather(city);
    setdates(
      new Date().toLocaleString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  };

  return (
    <>
      <div className=" flex justify-center flex-col gap-5 items-center">
        <h1 className="text-center capitalize text-5xl text-black font-semibold mt-4">
          weather app{" "}
        </h1>
        <div className="flex gap-3">
          <InputCus
            type="text"
            value={city}
            onChange={handlechange}
            placeholder="Enter your location..."
          />
          <ButtonCs name={"search"} onclick={handleweatherclick} />
        </div>
      
      {(weather && error==false)  ?
      (
        <div className="min-h-60 lg:w-96 w-full lg:mx-0 mx-2 bg-amber-200  border-2  p-5 rounded-xl shadow-2xl text-black">
        <p className="text-center text-3xl font-bold mb-2">Weather Details</p>
        <p className="text-center font-medium text-lg mb-4">{dates}</p>
        <div className="flex flex-col items-center gap-2">
          <img
            src={`https://openweathermap.org/img/wn/${weather?.icon}.png`}
            alt="Weather Icon"
            className="w-20 h-20 mb-2"
          />
          <p className="text-lg capitalize">{weather?.description}</p>
        </div>
        <h1 className="font-bold text-2xl text-center mt-3">{weather?.name}</h1>
        <div className="mt-4 space-y-2 text-center">
          <p className="text-lg">Temperature: <span className="font-semibold">{weather?.temperature}°C</span></p>
          <p className="text-lg">Feels Like: <span className="font-semibold">{weather?.feels_like}°C</span></p>
          <p className="text-lg">Humidity: <span className="font-semibold">{weather?.humidity}%</span></p>
          <p className="text-lg">Wind Speed: <span className="font-semibold">{weather?.wind_speed} m/s</span></p>
        </div>
      </div>
      ):
      null
      }
        {error &&
        <p className="text-red-500 font-semibold text-2xl">Invalid user input </p>
        
        }
        
      </div>
    </>
  );
};

export default Weather;
