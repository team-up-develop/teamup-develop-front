<script lang="ts">
import {
  defineComponent,
  reactive,
  SetupContext,
  toRefs,
} from "@vue/composition-api";
import { useUtils } from "@/hooks";

type State = {
  userId: number;
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
});

export default defineComponent({
  setup(_, ctx) {
    const state = reactive<State>(initialState(ctx));
    const { isLogin } = useUtils();

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
        本気でキャリアを変えようと努力している未経験エンジニア同士がオンラインでの「チーム開発」を通じて相互に成長し、エンジニアとしてキャリアをスタートを切ることをサポートします。
      </div>
    </v-col>
    <div class="right" v-if="isLogin">
      <button class="register-btn" @click="$router.push('/job_create')">
        案件を作る
      </button>
      <button class="search-btn" @click="$router.push('/jobs')">
        案件を探す
      </button>
    </div>
    <div class="right" v-else>
      <button class="register-btn" @click="$router.push('/register/personal')">
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
    color: $primary-dark;
    background: -webkit-linear-gradient(0deg, $primary-dark, $primary-color);
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

  @media (max-width: $me) {
    width: 100%;
  }

  .register-btn {
    @include blue-btn;
    @include neumorphism;
    color: $white;
    padding: 1.1rem 3rem;
    border-radius: 8px;
  }

  .login-btn {
    @include neumorphism;
    border: solid 1px $primary-color;
    color: $primary-color;
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
    border: solid 1px $primary-color;
    color: $primary-color;
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
