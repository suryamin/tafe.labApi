import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { WeatherDetailUI } from "../weatherDetailUI";
import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { WeatherModel } from "../../models/weatherModel";
import { WeatherResponse } from "../../models/weatherResponseModel";
import { getWeather } from "../../services/weatherService";
import { mapWeather } from "../../services/weatherMap";

/// 1. Define navigation mocks with the 'mock' prefix so they are hoisted correctly
const mockNavigate = jest.fn();
const mockUseRoute = jest.fn();

// 2. Mock the modules
// We mock the weatherMap service
jest.mock("../../services/weatherMap", () => ({
  getWeather: jest.fn(),
  mapWeather: jest.fn(),
}));

// We mock React Navigation
jest.mock("@react-navigation/native", () => ({
  useRoute: () => mockUseRoute(),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// 3. Cast the imported functions as Jest Mocks
// This provides the .mockResolvedValue and .mockReturnValue methods for TypeScript
const mockedGetWeather = getWeather as jest.MockedFunction<typeof getWeather>;
const mockedMapWeather = mapWeather as jest.MockedFunction<typeof mapWeather>;

describe("WeatherDetailUI Component", () => {
  const mockCity = "Sydney";

  const mockMappedWeather: WeatherModel = {
    city: "Sydney",
    country: "AU",
    temperature: 25,
    description: "clear sky",
    icon: "01d",
    feelsLike: 26,
    humidity: 50,
    minTemp: 20,
    maxTemp: 28,
    pressure: 1012,
    cloudiness: 0,
    windSpeed: 5,
    windDegree: 180,
    sunrise: 1714543200,
    sunset: 1714586400,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup the route params for the component to consume
    mockUseRoute.mockReturnValue({
      params: { city: mockCity },
    });
  });

  test("should show loading indicator and then weather data", async () => {
    // 4. Setup the mock return values
    // Ensure the structure matches what your component expects from the API
    mockedGetWeather.mockResolvedValue({
      name: "Sydney",
      sys: { country: "AU" },
      main: { temp: 25 },
      weather: [{ description: "clear sky", icon: "01d" }],
    } as unknown as WeatherResponse);

    mockedMapWeather.mockReturnValue(mockMappedWeather);

    const { getByText } = render(<WeatherDetailUI />);

    // 5. Assert: Wait for the async fetch to complete and UI to update
    await waitFor(() => {
      // Check for the rendered text based on your mockMappedWeather
      expect(getByText("Sydney, AU")).toBeTruthy();
      // Using a regex to find the temperature text regardless of exact formatting
      expect(getByText(/25/)).toBeTruthy();
    });

    expect(mockedGetWeather).toHaveBeenCalledWith("Sydney");
  });
});
