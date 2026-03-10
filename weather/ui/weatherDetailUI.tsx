import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { mapWeather } from "../services/weatherMap";
import { WeatherModel } from "../models/weatherModel";
import { WeatherRow } from "../../components/weatherCard";
import { formatTime, getWeather } from "../services/weatherService";
import { styles } from "../../style";

type RootStackParamList = {
  Weather: undefined;
  WeatherDetailUI: { city: string };
};

type WeatherDetailRouteProp = RouteProp<RootStackParamList, "WeatherDetailUI">;

export const WeatherDetailUI = () => {
  const route = useRoute<WeatherDetailRouteProp>();

  // FIXED: navigation was defined but unused.
  // If you don't use it for a back button or navigation, you can delete this line.
  // const navigation = useNavigation<WeatherDetailNavProp>();

  const { city } = route.params;
  const [weather, setWeather] = useState<WeatherModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;

      setLoading(true);
      try {
        const rawData = await getWeather(city);
        const mappedData = mapWeather(rawData);
        setWeather(mappedData);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          testID="loading-indicator"
          size="large"
          color="#fff"
        />
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#1C1C1E" }}>
      <ScrollView
        contentContainerStyle={styles.weatherScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.weatherTopFrame}>
          <Text style={styles.weatherTitle}>
            {weather.city}, {weather.country}
          </Text>
          <Text style={styles.weatherSubtitle}>{weather.temperature}°</Text>
          <Text style={styles.weatherSubtitle}>{weather.description}</Text>
        </View>

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
    </View>
  );
};

