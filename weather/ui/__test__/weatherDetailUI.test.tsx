import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { getWeather } from "../../services/weatherService";
import { mapWeather } from "../../services/weatherMap";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { WeatherModel } from "../../models/weatherModel";
import { WeatherResponse } from "../../models/weatherResponseModel";
import { WeatherDetailUI } from "../weatherDetailUI";

// Mock dependencies
jest.mock("../../services/weatherService");
jest.mock("../../services/weatherMap");
jest.mock("@react-navigation/native");

// Match component route type
type RootStackParamList = {
  WeatherDetailUI: { city: string };
};

const mockedGetWeather = getWeather as jest.MockedFunction<typeof getWeather>;
const mockedMapWeather = mapWeather as jest.MockedFunction<typeof mapWeather>;
const mockedUseRoute = useRoute as jest.MockedFunction<
  () => RouteProp<RootStackParamList, "WeatherDetailUI">
>;

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

    mockedUseRoute.mockReturnValue({
      key: "test-key",
      name: "WeatherDetailUI",
      params: { city: mockCity },
    } as RouteProp<RootStackParamList, "WeatherDetailUI">);
  });

  // ===============================
  // 1️⃣ Loading State Test
  // ===============================
  test("should show loading indicator initially", () => {
    mockedGetWeather.mockResolvedValue({} as WeatherResponse);

    const { getByTestId } = render(<WeatherDetailUI />);

    // You must add testID="loading-indicator" in the UI
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  // ===============================
  // 2️⃣ Weather Data Render
  // ===============================
  test("should display weather data after fetch", async () => {
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
      expect(getByText("25°")).toBeTruthy();
      expect(getByText("clear sky")).toBeTruthy();
    });

    expect(mockedGetWeather).toHaveBeenCalledWith("Sydney");
  });

  // ===============================
  // 3️⃣ API Error Handling
  // ===============================
  test("should handle API errors gracefully", async () => {
    mockedGetWeather.mockRejectedValue(new Error("API failed"));

    const { getByText } = render(<WeatherDetailUI />);

    await waitFor(() => {
      expect(getByText("No data available")).toBeTruthy();
    });
  });

  // ===============================
  // 4️⃣ No Data Fallback
  // ===============================
  test("should show fallback when mapped weather is null", async () => {
    mockedGetWeather.mockResolvedValue({} as WeatherResponse);

    mockedMapWeather.mockReturnValue(null as unknown as WeatherModel);

    const { getByText } = render(<WeatherDetailUI />);

    await waitFor(() => {
      expect(getByText("No data available")).toBeTruthy();
    });
  });
});
