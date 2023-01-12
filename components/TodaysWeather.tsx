import React from "react";
import { TbWindsock } from "react-icons/tb";
import { BsWind } from "react-icons/bs";
import { WiDayCloudyWindy } from "react-icons/wi";
import { ITodayWeather } from "../lib/interfaces/city.interface";
import moment from "moment-timezone";
import { convertToFahrenheit } from "../lib/utils/convertToFahrenheit";

export default function TodaysWeather({ city, time, temperature, windspeed, winddirection, isCelsius }: ITodayWeather) {
  return (
    <div className="current-weather-wrapper">
      <div className="current-weather-title">
        <p>{city.name} ({city.country})</p>
        <p>{moment(time).format('dddd')}</p>
      </div>
      <div className="current-weather-temperature">
          <WiDayCloudyWindy />
          <p>{isCelsius ? `${temperature}°C` : `${convertToFahrenheit(temperature)}°F`}</p>
        </div>
      <div className="current-weather-items">
        <div className="current-weather-item">
          <div className="current-weather-icon">
            <BsWind/>
          </div>
          <p>{windspeed} km/h</p>
        </div>
        <div className="current-weather-item">
          <div className="current-weather-icon">
              <TbWindsock/>
          </div>
          <p>{winddirection}</p>
        </div>
      </div>
    </div>
  );
}
