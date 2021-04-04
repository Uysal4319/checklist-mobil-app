module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv',
  ],
  "plugins": [
    '@babel/transform-flow-strip-types',
    ["@babel/plugin-proposal-decorators", {"legacy": true}],
    ["@babel/plugin-proposal-class-properties", {"loose": true}],
    '@babel/proposal-object-rest-spread',
    '@babel/transform-runtime'
  ]
};
