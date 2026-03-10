import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { WeatherDetailUI } from "../weatherDetailUI";
import { getWeather } from "../../services/weatherService";
import { mapWeather } from "../../services/weatherMap";
import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { WeatherModel } from "../../models/weatherModel";
import { WeatherResponse } from "../../models/weatherResponseModel";
// 1. Define mocked functions with the 'mock' prefix so Jest hoists them
const mockUseRoute = jest.fn();
const mockNavigate = jest.fn();

// 2. Mock modules using the prefixed variables
jest.mock("../../services/weatherMap");
jest.mock("@react-navigation/native", () => ({
  useRoute: () => mockUseRoute(),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// 3. Cast for TypeScript support
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

    // 4. Setup the return value for the hoisted mock
    mockUseRoute.mockReturnValue({
      params: { city: mockCity },
    });
  });

  test("should show loading indicator and then weather data", async () => {
    /* --------------------------------------------------------- */
    /* FIXED: Using 'as unknown as Type' instead of 'as any'     */
    /* This satisfies the linter and the function signatures     */
    /* --------------------------------------------------------- */

    // Mock the raw API response (casted through unknown)
    mockedGetWeather.mockResolvedValue({
      name: "Sydney",
    } as unknown as WeatherResponse);

    // Mock the mapped model response
    mockedMapWeather.mockReturnValue(mockMappedWeather);

    const { getByText } = render(<WeatherDetailUI />);

    await waitFor(() => {
      expect(getByText("Sydney, AU")).toBeTruthy();
      expect(getByText("25°")).toBeTruthy();
    });
  });
});
