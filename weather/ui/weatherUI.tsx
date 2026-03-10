//---npm install axios ---> HTTP requests

import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "../../style";

type RootStackParamList = {
  Home: undefined;
  ClassComponent: undefined;
  FunctionalComponent: undefined;
  Storage: undefined;
  Calculator: undefined;
  Weather: undefined;
  WeatherDetailUI: { city: string };
};

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
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => openWeatherDetail(item)}
            >
              <MaterialIcons name="arrow-forward-ios" style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
