//npm install --save-dev @testing-library/react-native --legacy-peer-deps
//npm install -D react-test-renderer@19.1.0 --legacy-peer-deps
//npm install --save-dev typescript-eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --legacy-peer-deps

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { WeatherUI } from "../weatherUI";

// 1. Create the mock function with the "mock" prefix
const mockNavigate = jest.fn();

// 2. Mock the entire module
jest.mock("@react-navigation/native", () => {
  return {
    ...(jest.requireActual("@react-navigation/native") as object),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe("WeatherUI Component", () => {
  beforeEach(() => {
    // 3. Clear the mock so calls don't bleed between tests
    mockNavigate.mockClear();
  });

  test('should update input text and add a city to the list when "Search City" is pressed', () => {
    const { getByPlaceholderText, getByText } = render(<WeatherUI />);

    const input = getByPlaceholderText("Search City");
    const button = getByText("Search City");

    fireEvent.changeText(input, "Sydney");
    fireEvent.press(button);

    expect(getByText("Sydney")).toBeTruthy();
    expect(input.props.value).toBe("");
  });

  test("should navigate to WeatherDetailUI when a city item is pressed", () => {
    const { getByPlaceholderText, getByText } = render(<WeatherUI />);

    // Add city
    fireEvent.changeText(getByPlaceholderText("Search City"), "Melbourne");
    fireEvent.press(getByText("Search City"));

    // Find the arrow icon/button and press it
    // Note: Since we mocked icons to return text, we can often find them by name
    const arrowButton = getByText("arrow-forward-ios");
    fireEvent.press(arrowButton);

    expect(mockNavigate).toHaveBeenCalledWith("WeatherDetailUI", {
      city: "Melbourne",
    });
  });
});
