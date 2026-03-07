import { WeatherResponse } from "../models/weatherResponseModel";
import axios from "axios";

const SUPABASE_ANON_KEY = "sb_publishable_u5NU_wiNoDX72v_uW-p3Kw_-jywt0ue";
const FUNCTION_URL =
  "https://frlpitizjnrfvrrysowg.supabase.co/functions/v1/get-weather";

export const getWeather = async (city: string): Promise<WeatherResponse> => {
  try {
    const response = await axios.get(FUNCTION_URL, {
      params: { city },
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching from Supabase Proxy:", error);
    throw error;
  }
};

export const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // convert seconds → milliseconds

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
