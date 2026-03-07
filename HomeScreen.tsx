import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./style";

const MENU_DATA = [{ id: "1", title: "Week 3 - Weather", route: "Weather" }];

export const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={MENU_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuRow}>
            <Text>{item.title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
              <MaterialIcons
                name="arrow-forward-ios"
                style={styles.suffixButton}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
