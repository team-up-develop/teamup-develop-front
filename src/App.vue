<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from "@vue/composition-api";
import Vuex from "@/store/index";
import Header from "@/components/Organisms/Commons/Entires/Header.vue";
import Footer from "@/components/Organisms/Commons/Entires/Footer.vue";
import HeaderLoginFalse from "@/components/Organisms/Commons/Entires/HeaderLoginFalse.vue";

type State = {
  loginFlag: boolean;
};

const initialState = (): State => ({
  loginFlag: false,
});

export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer,
    HeaderLoginFalse,
  },
  setup: () => {
    const state = reactive<State>(initialState());

    onMounted(() => {
      if (Vuex.state.auth.userId) {
        state.loginFlag = true;
      }
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<template>
  <v-app class="app">
    <Header v-if="$store.state.auth.userId || this.loginFlag == true" />
    <HeaderLoginFalse v-else />
    <div class="container">
      <router-view />
      <footer class="footer">
        <Footer />
      </footer>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #111111;
  position: relative;
  width: 100%;
}

.container {
  min-height: 112vh;
  width: 100%;
  position: relative;
  // margin-top: 0.7rem;
  padding-bottom: 15rem;

  @media screen and (max-width: 600px) {
    padding: 1rem 0;
    padding-bottom: 17rem;
    margin-top: 0rem;
  }

  footer {
    margin-top: auto;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}

@media (min-width: 960px) {
  .container {
    max-width: none;
  }
}
</style>
