module.exports = {
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>../backend/src/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
};
