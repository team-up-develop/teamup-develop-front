<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { API_URL, catchError } from "@/master";

type DataType = {
  email: string;
  LoginPassword: string;
  emailRules: any[];
  show2: boolean;
  rules: any;
};

export default Vue.extend({
  data(): DataType {
    return {
      email: "",
      LoginPassword: "",
      show2: true,
      rules: {
        //? パスワード 文字数
        required: (value: any) => !!value || "パスワードが入力されていません.",
        min: (v: any) => v.length >= 8 || "8文字以上で入力してください",
        emailMatch: () => `The email and password you entered don't match`,
      },
      emailRules: [
        //? メールアドレス 文字数
        (v: string) => !!v || "メールアドレスが入力されていません",
        (v: string) =>
          /.+@.+/.test(v) || "有効なメールアドレスを入力してください",
      ],
    };
  },
  methods: {
    register() {
      const params = {
        email: this.email,
        LoginPassword: this.LoginPassword,
      };

      axios
        .post(`${API_URL}/signup`, params)
        .then((res) => {
          console.log(res);
          return this.$router.push("/register/sent_mail");
        })
        .catch((error) => {
          catchError(error);
        });
      this.email = "";
      this.LoginPassword = "";
    },
  },
});
</script>

<template>
  <section>
    <div class="login-wrapper">
      <v-card class="login-container">
        <div class="login-title">REGISTER</div>
        <div class="name-form-mail">
          <label for="name">メールアドレス</label>
          <br /><br />
          <v-row cols="12" md="4">
            <v-text-field
              class="textholder"
              v-model="email"
              :rules="emailRules"
              label="example@teamup.com"
              required
              outlined
              single-line
              filled
            ></v-text-field>
          </v-row>
        </div>
        <div class="name-form-password">
          <label for="name">パスワード</label>
          <br /><br />
          <v-row cols="12" md="4">
            <v-text-field
              :type="show2 ? 'text' : 'password'"
              :rules="[rules.required, rules.min]"
              name="input-10-2"
              label="password"
              hint="8文字以上で入力してください"
              value="wqfasds"
              class="input-group--focused"
              v-model="LoginPassword"
              outlined
              @click:append="show2 = !show2"
              single-line
              filled
            ></v-text-field>
          </v-row>
        </div>
        <div class="btn-area">
          <p>
            登録済みの方は<router-link to="/login" class="router-link"
              ><span>こちら</span></router-link
            >
          </p>
          <div @click="register" class="login-btn">新規登録する</div>
        </div>
      </v-card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

section {
  height: 87vh;
}
.router-link {
  text-decoration: none;

  span {
    color: $primary-color;
  }
}

.login-wrapper {
  @include card-margin;
  width: 100%;
  height: 100%;
  margin: 0;

  .login-container {
    max-width: 500px;
    height: 620px;
    margin: 2rem auto 3rem auto;
    border-radius: 8px;
    padding: 1rem 3rem 2rem 3rem;
    position: relative;
    background-color: $white;

    @media (max-width: $sm) {
      width: 95%;
      padding: 1rem;
    }

    //* ログインタイトル
    .login-title {
      color: $primary-color;
      font-size: 1.8rem;
      font-weight: bold;
      height: 50px;
      margin-top: 1rem;
      width: 100%;
      border-bottom: solid 3px $primary-color;
    }

    // * メールフォーム
    .name-form-mail {
      text-align: left;
      margin: 1.5rem 0 0 0;

      .row {
        margin-right: 0;
        margin-left: 0;
      }

      label {
        font-weight: bold;
      }
    }

    // * パスワードフォーム
    .name-form-password {
      text-align: left;
      margin: 0.5rem 0 0.5rem 0;

      .row {
        margin-right: 0;
        margin-left: 0;
      }

      label {
        font-weight: bold;
      }
    }

    .btn-area {
      margin: 0 auto;
      width: 80%;
      position: absolute;
      bottom: 0;
      padding: 2rem 0;

      @media (max-width: $sm) {
        width: 90%;
      }

      .login-btn {
        @include blue-btn;
        @include neumorphism;
        color: $white;
        display: block;
        width: 100%;
        padding: 1.2rem 5rem;
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1;
        text-align: center;
        // max-width: 280px;
        margin: auto;
        font-size: 1em;
        display: inline-block;
        cursor: pointer;
        margin: 0 auto;
        transition: 0.3s;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.685);
        outline: none;
      }
    }
  }
}
</style>
