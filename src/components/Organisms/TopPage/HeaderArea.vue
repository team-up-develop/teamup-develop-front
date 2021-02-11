<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from "@vue/composition-api";
import Vuex from "@/store/index";

type State = {
  userId: number;
};

const initialState = (): State => ({
  userId: Vuex.state.auth.userId,
});

export default defineComponent({
  setup() {
    const state = reactive<State>(initialState());

    const isLogin = computed(() => {
      if (state.userId) {
        return true;
      }
      return false;
    });
    return {
      ...toRefs(state),
      isLogin,
    };
  },
});
</script>

<template>
  <v-row class="header">
    <v-col class="left">
      <div class="left__title mb-2">
        チーム開発をすぐに始めれる
      </div>
      <div>
        本気でキャリアを変えようと努力している未経験エンジニア同士がオンラインでの「チーム開発」を通じて相互に成長し、エンジニアとしてスタートを切る。
        本気でキャリアを変えようと努力している未経験エンジニア同士がオンラインでの「チーム開発」を通じて相互に成長し、エンジニアとしてスタートを切る。
      </div>
    </v-col>
    <div class="right" v-if="isLogin">
      <button class="register-btn" @click="$router.push('/job_create/1')">
        案件を作る
      </button>
      <button class="search-btn" @click="$router.push('/jobs')">
        案件を探す
      </button>
    </div>
    <div class="right" v-else>
      <button class="register-btn" @click="$router.push('/register')">
        登録する
      </button>
      <button class="login-btn" @click="$router.push('/login')">
        ログインする
      </button>
    </div>
  </v-row>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.header {
  min-height: 200px;
  position: relative;

  @media (max-width: 786px) {
    min-height: 340px;
  }

  @media (max-width: 500px) {
    min-height: 410px;
  }
}

.left {
  text-align: left;
  max-width: 800px;

  &__title {
    color: #1142e2;
    background: -webkit-linear-gradient(0deg, #1142e2, #19bde6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    font-size: 2.3em;
  }
}

.right {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 100%;
  }

  .register-btn {
    @include purple-btn;
    @include neumorphism;
    color: $white;
    padding: 1.1rem 3rem;
    border-radius: 8px;
  }

  .login-btn {
    @include neumorphism;
    border: solid 1px #673ab7;
    color: #673ab7;
    background-color: $white;
    padding: 1.1rem 2rem;
    border-radius: 8px;
    margin-left: 1rem;

    @media (max-width: 508px) {
      margin-left: 0.5rem;
    }
  }

  .search-btn {
    @include neumorphism;
    border: solid 1px #673ab7;
    color: #673ab7;
    background-color: $white;
    padding: 1.1rem 2.7rem;
    border-radius: 8px;
    margin-left: 1rem;

    @media (max-width: 508px) {
      margin-left: 0.5rem;
    }
  }
}
</style>
