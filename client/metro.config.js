const { getDefaultConfig } = require("@expo/metro-config");
const { generate } = require("@storybook/react-native/scripts/generate");
const path = require("path");
const defaultConfig = getDefaultConfig(__dirname);

// Push 'cjs' extension to sourceExts
defaultConfig.resolver.sourceExts.push("cjs");

generate({
  configPath: path.resolve(__dirname, "./.storybook"),
});
// Configure SVG transformer
defaultConfig.transformer = {
  ...defaultConfig.transformer,
  unstable_allowRequireContext: true,

  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};
defaultConfig.resolver = {
  ...defaultConfig.resolver,
  assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
};

module.exports = defaultConfig;
