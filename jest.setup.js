//---------------------------------------------------//
// created: 08/03/2026                               //
// updated: 08/03/2026                               //
// by     : suryamin                                 //
// program: jest.setup.js                            //
// use    : test runner                              //
// npm    : react-native-gesture-handler             //
//---------------------------------------------------//
/* eslint-disable no-undef */

/* eslint-disable no-undef */

// FIX: Prevent ReferenceError regarding __ExpoImportMetaRegistry
global.__expo_import_meta_registry__ = {};

// 1. Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

// 2. Mock the Alert module
jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

// 3. Mock Vector Icons (Prevents icon-related crashes)
jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    MaterialIcons: ({ name, ...props }) =>
      React.createElement(Text, props, name),
    Ionicons: ({ name, ...props }) => React.createElement(Text, props, name),
    MaterialCommunityIcons: ({ name, ...props }) =>
      React.createElement(Text, props, name),
  };
});

// 4. Global Fetch Mock (Essential for Weather API/Supabase)
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
    status: 200,
  }),
);

// 5. Silence logs during tests
jest.spyOn(console, "log").mockImplementation(() => {});
jest.spyOn(console, "error").mockImplementation(() => {});
