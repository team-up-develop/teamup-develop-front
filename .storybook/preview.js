import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import colors from "vuetify/es5/util/colors";
// import "@mdi/font/css/materialdesignicons.css";

const vuetifyOptions = {};

Vue.use(Vuetify, {
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
      },
    },
  },
  // icons: {
  //   iconfont: "mdi",
  // },
});

export const parameters = {
  backgrounds: {
    value: [
      { name: "Sample BG 1", value: "#CCCCCC", default: true },
      { name: "Sample BG 2", value: "#000000" },
    ],
  },
};

export const decorators = [
  () => {
    return {
      vuetify: new Vuetify(vuetifyOptions),
      template: "<v-app><story/></v-app>",
    };
  },
];
