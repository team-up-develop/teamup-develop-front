const path = require("path");

module.exports = {
  // ストーリーを宣言する storiesファイル がどこにあるか
  stories: ["../src/components/**/*.stories.js"],
  // Essential addons を使用する
  addons: ["@storybook/addon-essentials"],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src/"),
      vue$: "vue/dist/vue.esm.js",
    };

    return config;
  },
};
