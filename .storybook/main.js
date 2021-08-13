const path = require("path");

module.exports = {
  // ストーリーを宣言する storiesファイル がどこにあるか
  stories: ["../src/components/**/*.stories.js"],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });
    return config;
  },
};
