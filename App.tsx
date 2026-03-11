import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createURL } from "expo-linking";
import { WeatherUI } from "./weather/ui/weatherUI";
import { WeatherDetailUI } from "./weather/ui/weatherDetailUI";
import { HomeScreen } from "./HomeScreen";

export type RootStackParamList = {
  Home: undefined;
  Weather: undefined;
  WeatherDetailUI: { city: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking =
  Platform.OS === "web"
    ? {
        prefixes: [createURL("/")], // hash-based URL for GitHub Pages
        config: { screens: {} },
      }
    : undefined;

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "React Native Labs" }}
        />
        <Stack.Screen
          name="Weather"
          component={WeatherUI}
          options={{ title: "Weather" }}
        />
        <Stack.Screen
          name="WeatherDetailUI"
          component={WeatherDetailUI}
          options={{ title: "Weather Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
