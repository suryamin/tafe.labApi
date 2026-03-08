// eslint.config.js
module.exports = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off", // TypeScript handles this better than ESLint v10
    },
  },
];
