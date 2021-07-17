module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "block-spacing": ["error", "always"],
    "no-console": "off",
    // * propsを子で変更を制御する
    "vue/no-mutating-props": "error",
    // * 特定のディレクティブを持たない<template>をエラーにする
    "vue/no-lone-template": [
      "error",
      {
        ignoreAccessible: false,
      },
    ],
    // * 構文エラーをチェック
    "vue/no-parsing-error": [
      "error",
      {
        "missing-semicolon-after-character-reference": false, // @see https://html.spec.whatwg.org/multipage/parsing.html#parse-errors
      },
    ],
    // * <script>, <template>, <style>タグの順序
    "vue/component-tags-order": [
      "error",
      {
        order: ["script", "template", "style"],
      },
    ],
    // * class style の重複チェック
    "vue/no-duplicate-attributes": [
      "error",
      {
        allowCoexistClass: false,
        allowCoexistStyle: false,
      },
    ],
    //* 使用していないtemplateをチェック
    "vue/comment-directive": [
      "error",
      {
        reportUnusedDisableDirectives: false,
      },
    ],
    // * 使用していないimport したComponentをチェック
    "vue/no-unused-components": [
      "error",
      {
        ignoreWhenBindingPresent: false,
      },
    ],
    // * v-on:click の場合修飾子のチェック
    "vue/use-v-on-exact": ["error"],
    // * template propsをハイフンでつながれた属性名の使用を強制
    "vue/attribute-hyphenation": ["error", "always"],
    // * component を パスカルケースに強制
    "vue/component-definition-name-casing": ["error", "PascalCase"],
    // * v.2.6.0 で非推奨になった slot を エラーにする
    "vue/no-deprecated-slot-attribute": "error",
    // * v2.5.0 で非推奨になった scope を エラーにする
    "vue/no-deprecated-scope-attribute": "error",
    // * v.2.6.0 で非推奨になった slot-scope を エラーにする
    "vue/no-deprecated-slot-scope-attribute": "error",
    // * 静的なインラインstyle バインディングとstyle属性をエラーにする
    "vue/no-static-inline-styles": "error",
    // * <div />
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
};
