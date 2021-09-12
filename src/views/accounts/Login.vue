<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from "@vue/composition-api";
import Vuex from "@/store/index";
import { isEmailValid, isPasswordValid } from "@/modules/user";
import InputArea from "@/components/Molecules/Forms/InputArea.vue";

type State = {
  email: string;
  password: string;
  loginErrorFlag: boolean;
};

const initialState = (): State => ({
  email: "",
  password: "",
  loginErrorFlag: false,
});

export default defineComponent({
  components: {
    // Email,
    // Password,
    InputArea,
  },
  setup: () => {
    const state = reactive<State>(initialState());
    // TODO: 修正が必要 Vuex
    const fetchError = () => {
      Vuex.state.auth.errorFlag = false;
    };
    fetchError();

    const login = () => {
      Vuex.dispatch("login", {
        email: state.email,
        login_password: state.password,
      });
      setTimeout(() => {
        if (Vuex.state.auth.errorFlag === true) {
          state.loginErrorFlag = true;
        }
      }, 700);
    };

    return {
      ...toRefs(state),
      fetchError,
      login,
      isEmailValid: computed(() => isEmailValid(state.email)),
      isPasswordValid: computed(() => isPasswordValid(state.password)),
    };
  },
});
</script>

<template>
  <section>
    <div class="wrapper  mt-8">
      <div class="title">LOGIN</div>
      <v-card class="card py-4">
        <div class="text-left mt-6">
          <InputArea
            v-model="email"
            type="email"
            name="email"
            text-label="メールアドレス"
            :mandatory="false"
            mandatory-text=""
            placeholder="example@teamUp.com"
            maxlength="100"
            :remaining="false"
            valid-message="メールアドレスの形式が正しくありません"
            :is-valid="isEmailValid"
          />
        </div>
        <div class="text-left mt-6">
          <InputArea
            v-model="password"
            type="password"
            name="password"
            text-label="パスワード"
            :mandatory="false"
            mandatory-text=""
            placeholder="パスワード"
            maxlength="100"
            :remaining="false"
            valid-message="8文字以上で入力してください"
            :is-valid="isPasswordValid"
          />
        </div>
        <div class="error-flag" v-if="loginErrorFlag == true">
          <span>メールアドレス か パスワードが違います</span>
        </div>
        <div class="btn-area">
          <p>
            登録してない方は<router-link
              to="/register/personal"
              class="router-link"
              ><span>こちら</span></router-link
            >
          </p>
          <v-btn @click="login()" class="login-btn">ログインする</v-btn>
        </div>
      </v-card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.wrapper {
  width: 500px;
  margin: 0 auto;
  position: relative;

  @media (max-width: $me) {
    width: 95%;
  }

  .card {
    min-height: 380px;
    padding: 0 2.8rem;

    @media (max-width: $sm) {
      padding: 0 1rem;
    }
  }

  .title {
    color: $primary-color;
    font-size: 2rem;
    font-weight: bold;
    height: 50px;
    padding: 1rem 2rem;
    margin-top: 1rem;
  }

  .btn-area {
    margin: 0 auto;
    width: 85%;
    position: absolute;
    bottom: 0;
    padding: 2rem 0;

    @media (max-width: $sm) {
      width: 85%;
    }

    .login-btn {
      @include box-shadow-btn;
      @include blue-btn;
      color: $white;
      display: block;
      width: 85%;
      height: 48px;
      border-radius: 50px;
      line-height: 1;
      text-align: center;
      margin: auto;
      font-size: 1em;
      display: inline-block;
      cursor: pointer;
      transition: 0.3s;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.685);
      outline: none;
      font-weight: bold;
    }
  }
}
</style>
