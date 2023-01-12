import React, { useState } from "react";
import { cities } from "../../lib/cities.mock";
import TodaysWeather from "../../components/TodaysWeather";
import WeeklyWeather from "../../components/WeeklyWeather";
import Link from "next/link";
import Head from "next/head";
import SearchBox from "../../components/SearchBox";
import { ICityPageData, IDailyData, IWeatherData } from "../../lib/interfaces/city.interface";

export async function getServerSideProps(context: any) {
  const city = getCityId(context.params.city);
  let data;

  if (!city) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${city.coord.lat}&longitude=${city.coord.lon}&current_weather=true&timezone=auto&daily=temperature_2m_max,temperature_2m_min&hourly=relativehumidity_2m`
  );

  if(!res) {
    return {
      notFound: true,
    };
  }

  data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  const weatherData = buildWeatherData(data);
  
  return {
    props: {
      city: city,
      ...weatherData
    },
  };
}

const getCityId = (param: any) => {
  const cityParam = param.trim();
  const splitCity = cityParam.split("-");
  const id = splitCity[splitCity.length - 1];

  if (!id) {
    return null;
  }

  const city = cities.find((city) => city.id.toString() == id);
  return city;
};

const buildWeatherData = (data: any): IWeatherData => {
  const { time, temperature, windspeed, winddirection } = data?.current_weather;
  const dailyData = getDailyWeatherData(data?.daily)

  return {
    time,
    temperature,
    windspeed,
    winddirection,
    dailyData
  }
}

const getDailyWeatherData = (dailyData: any): IDailyData[] => {
  const dailyDataList: any[] = [];
  dailyData.time.forEach((time: string, i: number) => {
    if (i < 6) {
      const maxTemperature = dailyData.temperature_2m_max[i];
      const minTemperature = dailyData.temperature_2m_min[i];
      dailyDataList.push({
        time,
        temperature: Math.round(maxTemperature + minTemperature) / 2,
        maxTemperature,
        minTemperature,
      })
    }
  });
  return dailyDataList;
}

export default function City({
  city,
  time,
  temperature,
  windspeed,
  winddirection,
  dailyData,
}: ICityPageData) {
  const [isCelsius, setIsCelsius] = useState(true);

  const changeTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  }
  
  return (
    <>
      <Head>
        <title>{city?.name} Weather - Next Weather App</title>
      </Head>

      <div className="page-wrapper">
        <div className="container">
          <div className="nav-buttons">
          <Link href="/">
            <span className="back-link">&larr; Home</span>
          </Link>
          <button className="btn-unit" onClick={() => {changeTemperatureUnit()}}>Change units</button>
          </div>
          <SearchBox placeholder="Search for another location..." />
          <TodaysWeather
            city={city}
            time={time}
            temperature={temperature}
            windspeed={windspeed}
            winddirection={winddirection}
            isCelsius={isCelsius}
          />
          <WeeklyWeather weeklyWeather={dailyData} isCelsius={isCelsius} />
        </div>
      </div>
    </>
  );
}
