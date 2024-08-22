module.exports = function (api) {
  api.cache(false); // or true depending on your preference

  return {
    presets: ["babel-preset-expo"],
    plugins: [["module:react-native-dotenv"]],
  };
};
