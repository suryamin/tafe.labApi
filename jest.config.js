//---------------------------------------------------//
// created: 05/03/2026                               //
// updated: 05/03/2026                               //
// by     : suryamin                                 //
// note   : tafe project assignment                  //
// program: jest.config.js                           //
// use    : test runner config                       //
//---------------------------------------------------//

module.exports = {
  preset: "react-native", // Change from jest-expo to react-native
  setupFiles: ["./jest.globals.js"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|expo|@expo|@react-navigation)/)",
  ],
};
