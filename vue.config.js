module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  "devServer": {
    "port": 3030,
    "host": "0.0.0.0",
    "disableHostCheck": false,
    "proxy": {
      "/api/v1": {
        "target": "http://localhost:8090",
        "ws": true,
        "changeOrigin": true
      }
    }
  },
  "css": {
    "loaderOptions": {
      // "sass": {
      //   "prependData": "\n@import \"@/assets/scss/_variables.scss\";\n"
      // }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}