module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
    [
      "@babel/preset-env",
      {
        modules: "false",
        useBuiltIns: "usage",
        targets: "> 0.25%, not dead",
      },
    ],
  ],
  /*
  Jestではテスト実行にnode.jsをつかうので、CommonJSのお作法に従う必要がある
  CommonJS形式にするコード変換はBabelに設定
  https://qiita.com/riversun/items/6c30a0d0897194677a37
  */
  env: {
    test: {
      presets: [["@babel/preset-env", { targets: { node: "current" } }]],
    },
  },
};
