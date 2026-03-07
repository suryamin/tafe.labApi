import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { WeatherModel } from "../models/weatherModel";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "../../style";
import { WeatherRow } from "../../components/weatherCard";
import { formatTime, getWeather } from "../services/weatherService";
import { WeatherResponse } from "../models/weatherResponseModel";
import { mapWeather } from "../services/weatherMap";

/* ----------------------------- */
/* stack screens and parameters  */
/* parameter must receive        */
/* ----------------------------- */

type RootStackParamList = {
  Weather: undefined;
  WeatherDetailUI: { city: string };
};

/* -------------------------------- */
/* route object                     */
/* route.params is { city: string } */
/* -------------------------------- */

type WeatherDetailRouteProp = RouteProp<RootStackParamList, "WeatherDetailUI">;

/* ----------------------------- */
/* navigation                    */
/* screen and required parameter */
/* ----------------------------- */

type WeatherDetailNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "WeatherDetailUI"
>;

export const WeatherDetailUI = () => {
  /* ----------------------------- */
  /* access to route.params.city   */
  /* ----------------------------- */
  const route = useRoute<WeatherDetailRouteProp>();
  const test = "";

  /* ------------------------------ */
  /* access to navigation functions */
  /* ------------------------------ */
  const navigation = useNavigation<WeatherDetailNavProp>();

  const { city } = route.params;
  const [weather, setWeather] = useState<WeatherModel | null>(null);
  const [loading, setLoading] = useState(true);

  /* ------------------------------------------------------- */
  /* run first --> like initial() or didChangeDependencies() */
  /* ------------------------------------------------------- */

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;

      setLoading(true);
      try {
        // 1. Fetch raw data from your Supabase proxy
        const rawData = await getWeather(city);

        // 2. Map the raw data to your WeatherModel
        // This is where we fix the "Argument of type 'WeatherResponse' is not assignable..." error
        const mappedData = mapWeather(rawData);

        // 3. Update the state with the correctly formatted data
        setWeather(mappedData);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  /* ----------------------------- */
  /* Loading State                 */
  /* ----------------------------- */

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  /* ----------------------------- */
  /* No Data State                 */
  /* ----------------------------- */

  if (!weather) {
    return (
      <View style={styles.center}>
        <Text>No data available</Text>
      </View>
    );
  }

  /* ----------------------------- */
  /* Main UI                       */
  /* ----------------------------- */
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1C1C1E" }}>
      <ScrollView
        contentContainerStyle={styles.weatherScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- TOP SECTION --- */}
        <View style={styles.weatherTopFrame}>
          <Text style={styles.weatherTitle}>
            {weather.city}, {weather.country}
          </Text>
          <Text style={styles.weatherSubtitle}>{weather.temperature}°</Text>
          <Text style={styles.weatherSubtitle}>{weather.description}</Text>
        </View>

        {/* --- INFO CARDS --- */}
        {/* <View style={styles.weatherRow}>
          <View style={styles.weatherCard}>
            <Ionicons name="thermometer-outline" size={22} color="#fff" />
            <Text style={styles.weatherCardTitle}>Feels Like</Text>
            <Text style={styles.weatherCardValue}>{weather.feelsLike}°C</Text>
          </View>

          <View style={styles.weatherCard}>
            <Ionicons name="water-outline" size={22} color="#fff" />
            <Text style={styles.weatherCardTitle}>Humidity</Text>
            <Text style={styles.weatherCardValue}>{weather.humidity}%</Text>
          </View>
        </View> */}

        <WeatherRow
          left={{
            icon: "thermometer-outline",
            title: "Feels Like",
            value: `${weather.feelsLike}°C`,
          }}
          right={{
            icon: "water-outline",
            title: "Humidity",
            value: `${weather.humidity}%`,
          }}
        />

        <View style={styles.weatherRow}>
          <View style={styles.weatherCard}>
            <Ionicons name="arrow-down-outline" size={22} color="#fff" />
            <Text style={styles.weatherCardTitle}>Min</Text>
            <Text style={styles.weatherCardValue}>{weather.minTemp}°C</Text>
          </View>

          <View style={styles.weatherCard}>
            <Ionicons name="arrow-up-outline" size={22} color="#fff" />
            <Text style={styles.weatherCardTitle}>Max</Text>
            <Text style={styles.weatherCardValue}>{weather.maxTemp}°C</Text>
          </View>
        </View>

        <View style={styles.weatherRow}>
          <View style={styles.weatherCard}>
            <Ionicons name="speedometer-outline" size={22} color="#fff" />
            <Text style={styles.weatherCardTitle}>Pressure</Text>
            <Text style={styles.weatherCardValue}>{weather.pressure} hPa</Text>
          </View>

          <View style={styles.weatherCard}>
            <Ionicons name="cloud-outline" size={22} color="#fff" />
            <Text style={styles.weatherCardTitle}>Cloudiness</Text>
            <Text style={styles.weatherCardValue}>{weather.cloudiness}%</Text>
          </View>
        </View>

        <View style={styles.weatherRow}>
          <View style={styles.weatherCard}>
            <Ionicons name="speedometer-outline" size={22} color="#fff" />
            <Text style={styles.weatherCardTitle}>Wind Speed</Text>
            <Text style={styles.weatherCardValue}>{weather.windSpeed} m/s</Text>
          </View>

          <View style={styles.weatherCard}>
            <Ionicons name="thermometer-outline" size={22} color="#fff" />
            <Text style={styles.weatherCardTitle}>Wind Degree</Text>
            <Text style={styles.weatherCardValue}>{weather.windDegree}°</Text>
          </View>
        </View>

        <View style={styles.weatherRow}>
          <View style={styles.weatherCard}>
            <Ionicons name="sunny-outline" size={22} color="#fff" />
            <Text style={styles.weatherCardTitle}>Sunrise</Text>
            <Text style={styles.weatherCardValue}>
              {formatTime(weather.sunrise)}
            </Text>
          </View>

          <View style={styles.weatherCard}>
            <Ionicons name="moon-outline" size={22} color="#fff" />
            <Text style={styles.weatherCardTitle}>Sunset</Text>
            <Text style={styles.weatherCardValue}>
              {formatTime(weather.sunset)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
function searchWeatherByCity(city: string) {
  throw new Error("Function not implemented.");
}
function mapWeatherResponseToModel(rawData: WeatherResponse) {
  throw new Error("Function not implemented.");
}
