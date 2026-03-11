import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createURL } from "expo-linking";
import { WeatherUI } from "./weather/ui/weatherUI";
import { WeatherDetailUI } from "./weather/ui/weatherDetailUI";
import { HomeScreen } from "./HomeScreen";

// Stack param types
export type RootStackParamList = {
  Home: undefined;
  Weather: undefined;
  WeatherDetailUI: { city: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Linking config for web (GitHub Pages)
const linking =
  Platform.OS === "web"
    ? {
        prefixes: [createURL("/")],
        config: { screens: {} },
      }
    : undefined;

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Weather" component={WeatherUI} />
        <Stack.Screen name="WeatherDetailUI" component={WeatherDetailUI} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
