//npm install --save-dev @types/jest
//npm install --save-dev @jest/globals
//npm install --save-dev jest
//npm install --save-dev jest-expo
//npm install --save-dev babel-jest @babel/core @babel/preset-env
//npm install --save-dev babel-preset-expo
//npx expo install expo-constants
//run    : npx jest --clearCache
//         npm test

import { describe, expect, test } from "@jest/globals";
import { WeatherResponse } from "../../models/weatherResponseModel";
import { mapWeather } from "../weatherMap";

describe("Weather Mapper Detailed Logic", () => {
  test("should map a complete WeatherResponse to WeatherModel correctly", () => {
    // 1. Arrange: Create a mock that strictly follows the WeatherResponse interface
    const mockResponse: WeatherResponse = {
      coord: { lon: 151.2093, lat: -33.8688 },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
      ],
      base: "stations",
      main: {
        temp: 22.5,
        feels_like: 21.8,
        temp_min: 20.1,
        temp_max: 24.5,
        pressure: 1012,
        humidity: 55,
      },
      visibility: 10000,
      wind: { speed: 4.6, deg: 180 },
      clouds: { all: 0 },
      dt: 1710000000,
      sys: {
        type: 1,
        id: 1234,
        country: "AU",
        sunrise: 1710001000,
        sunset: 1710045000,
      },
      timezone: 39600,
      id: 2147714,
      name: "Sydney",
      cod: 200,
    };

    // 2. Act: Run the mapper
    const result = mapWeather(mockResponse);

    // 3. Assert: Verify every field from your WeatherModel
    expect(result.city).toBe("Sydney");
    expect(result.country).toBe("AU");
    expect(result.temperature).toBe(22.5);
    expect(result.feelsLike).toBe(21.8);
    expect(result.minTemp).toBe(20.1);
    expect(result.maxTemp).toBe(24.5);
    expect(result.pressure).toBe(1012);
    expect(result.humidity).toBe(55);
    expect(result.description).toBe("clear sky");
    expect(result.icon).toBe("01d");
    expect(result.windSpeed).toBe(4.6);
    expect(result.windDegree).toBe(180);
    expect(result.cloudiness).toBe(0);
    expect(result.sunrise).toBe(1710001000);
    expect(result.sunset).toBe(1710045000);
  });

  test("should handle missing optional weather elements using defaults", () => {
    // 1. We define the object as 'unknown' first to bypass strict property checks
    // then cast it to 'WeatherResponse' to satisfy the function.
    const minimalResponse = {
      name: "Lijiang",
      sys: {
        country: "CN",
        sunrise: 100,
        sunset: 200,
      },
      main: {
        temp: 15,
        feels_like: 14,
        temp_min: 10,
        temp_max: 20,
        pressure: 1000,
        humidity: 40,
      },
      weather: [],
      wind: { speed: 2, deg: 90 },
      clouds: { all: 50 },
    } as unknown as WeatherResponse;

    // 2. Act
    const result = mapWeather(minimalResponse);

    // 3. Assert: Check fallback for description and icon
    expect(result.description).toBe("");
    expect(result.icon).toBe("");
  });
});
