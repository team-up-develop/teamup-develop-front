<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import Vuex from "@/store/index";

type State = {
  freeWord: string;
};

const initialState = (): State => ({
  freeWord: Vuex.state.search.freeWord, //? フリーワード 検索
});

export default defineComponent({
  setup: (_, ctx: any) => {
    const state = reactive<State>(initialState());
    const router = ctx.root.$router;

    // * トップページフリーワード 検索
    const freeWordSearch = () => {
      Vuex.dispatch("freeWordSearch", {
        freeWord: state.freeWord,
      });
      return router.push({ name: "Jobs" });
    };

    return {
      ...toRefs(state),
      freeWordSearch,
    };
  },
});
</script>

<template>
  <section>
    <input
      type="text"
      class="serach-freeword"
      v-model="freeWord"
      placeholder="フリーワードを入力してください"
    />
    <button class="search-freeword-btn" @click="freeWordSearch">
      検索する
    </button>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.serach-freeword {
  background-color: $input-background-color;
  width: 75%;
  position: absolute;
  left: 0;
  border-radius: 32px;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  outline: none;

  @media screen and (max-width: 800px) {
    width: 70%;
  }

  @media screen and (max-width: 700px) {
    padding: 1rem;
    font-size: 1rem;
  }

  @media screen and (max-width: 400px) {
    width: 63%;
  }
}

.search-freeword-btn {
  @include blue-btn;
  @include neumorphism;
  text-align: left;
  display: block;
  padding: 1.3rem 3.5rem;
  border-radius: 32px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  color: $white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1rem;
  float: right;
  cursor: pointer;
  transition: 0.3s;
  outline: none;
  position: absolute;
  right: 0;

  @media screen and (max-width: 700px) {
    padding: 1rem 1.5rem;
  }
}
</style>
