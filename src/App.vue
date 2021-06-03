<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  SetupContext,
} from "@vue/composition-api";
import {
  Header,
  Footer,
  HeaderLoginFalse,
} from "@/components/Organisms/Commons/Entires";
type Maybe<T> = T | null;

type State = {
  loginFlag: boolean;
  userId: Maybe<number>;
};

const initialState = (ctx: SetupContext): State => ({
  loginFlag: false,
  userId: ctx.root.$store.getters.userId,
});

export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer,
    HeaderLoginFalse,
  },
  setup: (_, ctx) => {
    const state = reactive<State>(initialState(ctx));

    onMounted(() => {
      if (state.userId) {
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
@import "@/assets/scss/_variables.scss";

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-main-color;
  position: relative;
  width: 100%;
}

.container {
  min-height: 112vh;
  width: 100%;
  position: relative;
  padding-bottom: 15rem;
  background-color: $light-grey;

  // TODO:
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

@media (min-width: $la) {
  .container {
    max-width: none;
  }
}
</style>
