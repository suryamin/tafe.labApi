import { WeatherModel } from "../models/weatherModel";
import { WeatherResponse } from "../models/weatherResponseModel";

export const mapWeather = (data: WeatherResponse): WeatherModel => {
  return {
    city: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    minTemp: data.main.temp_min,
    maxTemp: data.main.temp_max,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    description: data.weather[0]?.description ?? "",
    icon: data.weather[0]?.icon ?? "",
    windSpeed: data.wind.speed,
    windDegree: data.wind.deg,
    cloudiness: data.clouds.all,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
  };
};
