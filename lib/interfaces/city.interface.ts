export interface ICityPageData {
  city: ICityData,
  time: string,
  temperature: number,
  windspeed: number,
  winddirection: number,
  dailyData: IDailyData[]
}

export interface ITodayWeather {
  city: any;
  time: string;
  temperature: number;
  windspeed: number;
  winddirection: number;
  isCelsius?: boolean;
}

export interface IWeatherData {
  time: string,
  temperature: number,
  windspeed: number,
  winddirection: number,
  dailyData: IDailyData[]
}

export interface IDailyData {
  time: string,
  temperature: number,
  maxTemperature: number,
  minTemperature: number,
}


export interface ICityData {
  slug: string,
  id: number,
  name: string,
  state?: string,
  country: string,
  coord: ICoordinates
}

export interface ICity {
  id: number,
  name: string,
  state?: string,
  country: string,
  coord: ICoordinates
}

interface ICoordinates {
  lon: number,
  lat: number
}
