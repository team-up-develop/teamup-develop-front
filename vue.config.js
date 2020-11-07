module.exports = {
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    disableHostCheck: false,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8888',
        ws: true,
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/_variables.scss";
        `
      }
    }
  }
};
