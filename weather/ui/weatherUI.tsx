import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { styles } from "../../style";

type WeatherNavProp = NativeStackNavigationProp<RootStackParamList, "Weather">;

export const WeatherUI = () => {
  const navigation = useNavigation<WeatherNavProp>();
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<string[]>([]);

  const searchCity = () => {
    if (city.trim()) {
      setCities([...cities, city]);
      setCity("");
    }
  };

  const openWeatherDetail = (cityName: string) => {
    navigation.navigate("WeatherDetailUI", { city: cityName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>City Weather</Text>
      <TextInput
        style={styles.input}
        placeholder="Search City"
        placeholderTextColor="#999"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search City" onPress={searchCity} />
      <FlatList
        data={cities}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.task}>{item}</Text>
            <TouchableOpacity onPress={() => openWeatherDetail(item)}>
              <MaterialIcons name="arrow-forward-ios" style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
