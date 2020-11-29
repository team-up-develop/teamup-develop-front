<script lang="ts">
import Vue from 'vue';
import Loading from '@/components/common/loading/Loading.vue'

export type DataType = {
  LoginName: string;
  LoginPassword: string;
  loginErrorFlag: boolean;
  loading: boolean;
  emailRules: any[];
  show2: boolean;
  rules: any;
}

export default Vue.extend({ 
  data(): DataType {
    return {
      LoginName: '',
      LoginPassword: '',
      loginErrorFlag: false,
      loading: true, 
      show2: true,
      rules: { //? パスワード 文字数
        required: (value: any) => !!value || 'パスワードが入力されていません',
        min: (v: any) => v.length >= 8 || '8文字以上で入力してください',
        emailMatch: () => (`The email and password you entered don't match`),
      },
      emailRules: [ //? メールアドレス 文字数
        (v: string) => !!v || 'メールアドレスが入力されていません',
        (v: string) => /.+@.+/.test(v) || '有効なメールアドレスを入力してください',
      ],
    }
  },
  methods: {
    login(): void {
      this.$store.dispatch('login', {
        LoginName: this.LoginName,
        LoginPassword: this.LoginPassword,
      })
      // this.LoginName = "";
      // this.LoginPassword = "";
      setTimeout(() => {
        if (this.$store.state.auth.errorFlag === true) {
          this.loginErrorFlag = true;
        }
      }, 1000)
    },
  },
  created() {
    this.$store.state.auth.errorFlag = false;
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000)
  },
  components: {
    Loading
  }
});
</script>

<template>
  <v-container>
    <div class="login-wrapper" v-show="!loading">
      <div class="login-container">
        <div class="login-title">LOGIN</div>
        <div class="name-form-mail">
          <label for="name">メールアドレス</label>
          <v-row
            cols="12"
            md="4"
          >
            <v-text-field
              class="textholder"
              v-model="LoginName"
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
          <v-row
            cols="12"
            md="4"
          >
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
        <div class="error-flag" v-if="loginErrorFlag == true">
          <span>メールアドレス か パスワードが違います</span>
        </div>
        <div v-else>
        </div>
        <hr>
          <v-row
            cols="12"
            md="4"
          >
          Twitter / Google ログイン エリア
          </v-row>
          <hr>
          <div class="btn-area">
            <p>登録してない方は<router-link to="/register" class="router-link"><span>こちら</span></router-link></p>
            <div @click="login" class="login-btn">ログイン</div>
          </div>
      </div>
    </div>
    <Loading v-show="loading">
    </Loading>
  </v-container>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

section {
  height: 87vh;
}
.router-link {
  text-decoration: none;
}

.login-wrapper {
  @include card-margin;
  width: 100%;
  height: 100%;

  .login-container {
    max-width: 500px;
    height: 620px;
    margin: 4rem auto 3rem auto;
    border: solid 1px #B9B9B9;
    border-radius: 20px;
    padding: 1rem 3rem 2rem 3rem;
    position: relative;

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
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 2rem 0;

      .login-btn {
        @include blue-btn;
        color: $basic-white;
        display: block;
        padding: 1.2rem 5rem;
        border-radius: 50px;
        font-size: .875rem;
        font-weight: 600;
        line-height: 1;
        text-align: center;
        max-width: 280px;
        margin: auto;
        font-size: 1.3rem;
        display: inline-block;
        cursor: pointer;
        margin: 0 auto;
        transition: .3s;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.685);
        outline: none;
      }
    }
  }
}

@media (max-width: 500px) {
  .login-wrapper {
    width: 100%;

    .login-container {
      margin: 0 auto 2rem auto;
      width: 100%;
      padding: 1.5rem ;
    }
  }
}
</style>