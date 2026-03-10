import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styles } from "./style";

/* --------------------------------------------------------- */
/* 1. Define the shape of your navigation paths              */
/* --------------------------------------------------------- */
type RootStackParamList = {
  Home: undefined;
  Weather: undefined;
  WeatherDetailUI: { city: string };
};

/* --------------------------------------------------------- */
/* 2. Define the Props for this specific screen              */
/* --------------------------------------------------------- */
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

/* --------------------------------------------------------- */
/* 3. Define the shape of your menu items                    */
/* We restrict 'route' to only screens that don't need params */
/* --------------------------------------------------------- */
interface MenuItem {
  id: string;
  title: string;
  route: "Home" | "Weather"; // This specifically avoids the "No overload" error
}

const MENU_DATA: MenuItem[] = [
  { id: "1", title: "Week 3 - Weather", route: "Weather" },
];

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={MENU_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuRow}>
            <Text style={styles.menuText}>{item.title}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(item.route)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons
                name="arrow-forward-ios"
                size={18}
                style={styles.suffixButton}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
