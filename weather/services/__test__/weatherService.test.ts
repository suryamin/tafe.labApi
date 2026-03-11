import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import axios from "axios";
import { getWeather, formatTime } from "../weatherService"; // Adjust path if needed

// Mock axios
jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("WeatherService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ============================
  // getWeather Tests
  // ============================
  describe("getWeather", () => {
    test("should fetch weather data successfully from Supabase Edge Function", async () => {
      const mockResponse = {
        data: {
          name: "Sydney",
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getWeather("Sydney");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://frlpitizjnrfvrrysowg.supabase.co/functions/v1/get-weather",
        expect.objectContaining({
          params: { city: "Sydney" },
          headers: expect.objectContaining({
            Authorization: expect.stringContaining("Bearer"),
          }),
        }),
      );

      expect(result).toEqual(mockResponse.data);
    });

    test("should throw an error when the API call fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

      await expect(getWeather("Unknown City")).rejects.toThrow("Network Error");
    });
  });

  // ============================
  // formatTime Tests
  // ============================
  describe("formatTime", () => {
    test("should convert unix timestamp to a readable time", () => {
      const timestamp = 1714543200; // example unix timestamp

      const formatted = formatTime(timestamp);

      expect(typeof formatted).toBe("string");

      // check HH:MM format
      expect(formatted).toMatch(/\d{2}:\d{2}/);
    });
  });
});
