import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import VueCompositionApi from "@vue/composition-api";
import vuetify from "./plugins/vuetify";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

Sentry.init({
  Vue,
  dsn:
    process.env.NODE_ENV === "production"
      ? "https://06ab5150431140bfbec9273ab901a9f4@o894465.ingest.sentry.io/5840382"
      : "",
  integrations: [new Integrations.BrowserTracing()],
  // tracesSampleRate: 1.0,
});
