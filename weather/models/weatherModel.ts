export interface WeatherModel {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  windSpeed: number;
  windDegree: number;
  cloudiness: number;
  sunrise: number;
  sunset: number;
}
