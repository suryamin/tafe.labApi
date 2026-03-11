import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./App";
import { styles } from "./style";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

interface MenuItem {
  id: string;
  title: string;
  route: "Weather"; // Only navigates to Weather
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
