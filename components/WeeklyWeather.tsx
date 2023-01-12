import React from "react";
import moment from "moment-timezone";
import { TbTemperature } from "react-icons/tb";
import { IDailyData } from "../lib/interfaces/city.interface";
import { convertToFahrenheit } from "../lib/utils/convertToFahrenheit";

export default function WeeklyWeather({ weeklyWeather, isCelsius }: { weeklyWeather: IDailyData[], isCelsius: boolean }) {
  const getTemperature = (value: number) => {
    return isCelsius ? `${value}°C` : `${convertToFahrenheit(value)}°F`
  }
  
  return (
    <div className="weekly">
      <h3 className="weekly-title">
        Weekly Weather
      </h3>

      {weeklyWeather.length > 0 &&
        weeklyWeather.map((weather, index) => {
          if (index == 0) {
            return;
          }

          return (
            <div className="weekly-card" key={index}>
              <div className="weekly-inner">
                <div className="weekly-content">
                  <h3>
                    {moment(weather.time).format("dddd")}
                  </h3>

                  <h4>
                    <span>{getTemperature(weather.maxTemperature)}</span>
                    <span>{getTemperature(weather.minTemperature)}</span>
                  </h4>
                </div>

                <div className="weekly-temperature">
                  <TbTemperature />
                  <span>{getTemperature(weather.temperature)}</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
