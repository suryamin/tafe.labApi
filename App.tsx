import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WeatherUI } from "./weather/ui/weatherUI";
import { WeatherDetailUI } from "./weather/ui/weatherDetailUI";
import { HomeScreen } from "./HomeScreen";

// Define stack param types
export type RootStackParamList = {
  Home: undefined;
  Weather: undefined;
  WeatherDetailUI: { city: string };
};

// Create typed navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ["https://yourusername.github.io/tafe.labApi"],
  config: {
    screens: {
      Home: "",
      Weather: "weather",
      WeatherDetailUI: "weather/:city",
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#fff" },
          headerTitleStyle: { fontWeight: "bold" },
          headerTitleAlign: "center",
        }}
      >
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
