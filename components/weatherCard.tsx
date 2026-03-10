import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../style";

type WeatherCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
};

type WeatherRowProps = {
  left: WeatherCardProps;
  right: WeatherCardProps;
};

export const WeatherRow: React.FC<WeatherRowProps> = ({ left, right }) => {
  return (
    <View style={styles.weatherRow}>
      <View style={styles.weatherCard}>
        <Ionicons name={left.icon} size={22} color="#fff" />
        <Text style={styles.weatherCardTitle}>{left.title}</Text>
        <Text style={styles.weatherCardValue}>{left.value}</Text>
      </View>

      <View style={styles.weatherCard}>
        <Ionicons name={right.icon} size={22} color="#fff" />
        <Text style={styles.weatherCardTitle}>{right.title}</Text>
        <Text style={styles.weatherCardValue}>{right.value}</Text>
      </View>
    </View>
  );
};
