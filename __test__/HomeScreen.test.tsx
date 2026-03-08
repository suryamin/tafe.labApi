import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { HomeScreen } from "../HomeScreen"; // Adjust path as needed
import { describe, expect, test, jest, beforeEach } from "@jest/globals";

describe("HomeScreen Component", () => {
  // 1. Create a mock navigation object
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    // Clear mock history before each test
    jest.clearAllMocks();
  });

  test("should render the menu items correctly", () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);

    // Verify the Weather lab entry exists
    expect(getByText("Week 3 - Weather")).toBeTruthy();
  });

  test("should navigate to the Weather screen when the arrow icon is pressed", () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);

    // In your setup, MaterialIcons is likely mocked to render the icon name as text
    // We find the icon by its name or search for the TouchableOpacity
    const arrowIcon = getByText("arrow-forward-ios");

    // Simulate the press
    fireEvent.press(arrowIcon);

    // Verify navigation.navigate was called with "Weather"
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Weather");
  });

  test("should render the correct number of items in the FlatList", () => {
    const { getAllByText } = render(<HomeScreen navigation={mockNavigation} />);

    // Since there is currently only one item in MENU_DATA
    const menuItems = getAllByText("Week 3 - Weather");
    expect(menuItems.length).toBe(1);
  });
});
