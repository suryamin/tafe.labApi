import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { getWeather } from "../../services/weatherService";
import { WeatherModel } from "../../models/weatherModel";
import { WeatherResponse } from "../../models/weatherResponseModel";
import { mapWeather } from "../../services/weatherMap";
import { WeatherDetailUI } from "../weatherDetailUI";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

// 1. Mock the modules
jest.mock("../../services/weatherMap");
jest.mock("@react-navigation/native");

// 2. Define our Param List for Type Safety
type RootStackParamList = {
  WeatherDetail: { city: string };
};

// 3. Cast for TypeScript using proper Generics
const mockedGetWeather = getWeather as jest.MockedFunction<typeof getWeather>;
const mockedMapWeather = mapWeather as jest.MockedFunction<typeof mapWeather>;
const mockedUseRoute = useRoute as jest.MockedFunction<
  () => RouteProp<RootStackParamList, "WeatherDetail">
>;
const mockedUseNavigation = useNavigation as jest.MockedFunction<
  typeof useNavigation
>;

describe("WeatherDetailUI Component", () => {
  const mockCity = "Sydney";
  const mockNavigate = jest.fn();

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

    // Use specific RouteProp structure instead of 'any'
    mockedUseRoute.mockReturnValue({
      key: "test-key",
      name: "WeatherDetail",
      params: { city: mockCity },
    } as RouteProp<RootStackParamList, "WeatherDetail">);

    // Use Partial to satisfy the Navigation object structure
    mockedUseNavigation.mockReturnValue({
      navigate: mockNavigate,
      dispatch: jest.fn(),
      reset: jest.fn(),
      goBack: jest.fn(),
      isFocused: () => true,
      canGoBack: () => true,
    } as unknown);
    // Note: 'as any' on navigation is often allowed because the full
    // navigation object has ~50 properties. If your linter still
    // blocks it, use: as unknown as ReturnType<typeof useNavigation>
  });

  test("should show loading indicator and then weather data", async () => {
    mockedGetWeather.mockResolvedValue({
      name: "Sydney",
      sys: { country: "AU" },
      main: { temp: 25 },
      weather: [{ description: "clear sky", icon: "01d" }],
    } as unknown as WeatherResponse);

    mockedMapWeather.mockReturnValue(mockMappedWeather);

    const { getByText } = render(<WeatherDetailUI />);

    await waitFor(() => {
      expect(getByText("Sydney, AU")).toBeTruthy();
      expect(getByText(/25/)).toBeTruthy();
    });

    expect(mockedGetWeather).toHaveBeenCalledWith("Sydney");
    expect(mockedUseRoute).toHaveBeenCalled();
  });
});
