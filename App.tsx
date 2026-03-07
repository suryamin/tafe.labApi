import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./HomeScreen";
import { WeatherUI } from "./weather/ui/weatherUI";
import { WeatherDetailUI } from "./weather/ui/weatherDetailUI";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer key={Date.now()}>
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
