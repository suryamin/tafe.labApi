import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import axios from "axios";
import { getWeather, formatTime } from "../weatherService"; // Adjust path if needed
import { WeatherResponse } from "../../models/weatherResponseModel";

// 1. Mock Axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Tell Jest to mock the entire module
jest.mock("../services/weatherService");

// Create a typed reference to the mock
const mockedGetWeather = jest.mocked(getWeather);

// Now .mockResolvedValue will be available
mockedGetWeather.mockResolvedValue({
  name: "Sydney",
} as unknown as WeatherResponse);

describe("WeatherService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getWeather", () => {
    test("should fetch weather data successfully from Supabase Edge Function", async () => {
      // Arrange: Create a mock response matching WeatherResponse structure
      const mockWeatherData = {
        name: "Sydney",
        main: { temp: 25, humidity: 60 },
        weather: [{ description: "sunny", icon: "01d" }],
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

      // Act
      const result = await getWeather("Sydney");

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://frlpitizjnrfvrrysowg.supabase.co/functions/v1/get-weather",
        expect.objectContaining({
          params: { city: "Sydney" },
          headers: expect.objectContaining({
            Authorization: expect.stringContaining("Bearer"),
          }),
        }),
      );
      expect(result).toEqual(mockWeatherData);
    });

    test("should throw an error when the API call fails", async () => {
      // Arrange
      mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

      // Act & Assert
      await expect(getWeather("Unknown City")).rejects.toThrow("Network Error");
    });
  });

  describe("formatTime", () => {
    test("should convert a unix timestamp to a 2-digit time string", () => {
      // Arrange: 1714543200 is roughly May 1st, 2024
      const timestamp = 1714543200;

      // Act
      const formatted = formatTime(timestamp);

      // Assert: We check if it matches the "HH:MM" pattern (e.g., "05:00 PM" or "17:00")
      // because locale strings vary by environment, we use a regex
      expect(formatted).toMatch(/\d{2}:\d{2}/);
    });
  });
});
