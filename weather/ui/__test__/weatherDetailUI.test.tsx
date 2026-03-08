import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { WeatherDetailUI } from "../weatherDetailUI";
import { getWeather } from "../../services/weatherService";
import { mapWeather } from "../../services/weatherMap";
import { useRoute } from "@react-navigation/native";
import { describe, expect, test, jest, beforeEach } from "@jest/globals";

// 1. Define mocked functions with the 'mock' prefix so Jest hoists them
const mockUseRoute = jest.fn();
const mockNavigate = jest.fn();

// 2. Mock modules using the prefixed variables
jest.mock("../../services/weatherService");
jest.mock("../../services/weatherMap");
jest.mock("@react-navigation/native", () => ({
  useRoute: () => mockUseRoute(), // Call the hoisted mock function
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// 3. Cast for TypeScript support
const mockedGetWeather = getWeather as jest.MockedFunction<typeof getWeather>;
const mockedMapWeather = mapWeather as jest.MockedFunction<typeof mapWeather>;

describe("WeatherDetailUI Component", () => {
  const mockCity = "Sydney";

  const mockMappedWeather = {
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
    mockedGetWeather.mockResolvedValue({ name: "Sydney" } as any);
    mockedMapWeather.mockReturnValue(mockMappedWeather as any);

    const { getByText } = render(<WeatherDetailUI />);

    await waitFor(() => {
      expect(getByText("Sydney, AU")).toBeTruthy();
      expect(getByText("25°")).toBeTruthy();
    });
  });
});
