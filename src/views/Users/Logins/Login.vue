<script lang="ts">
import Vue from 'vue';
import Email from '@/components/Atoms/Forms/Email.vue'
import Password from '@/components/Atoms/Forms/Password.vue'

type DataType = {
  LoginName: string;
  LoginPassword: string;
  loginErrorFlag: boolean;
}

export default Vue.extend({ 
  components: {
    Email,
    Password
  },
  data(): DataType {
    return {
      LoginName: '',
      LoginPassword: '',
      loginErrorFlag: false,
    }
  },
  methods: {
    login(): void {
      this.$store.dispatch('login', {
        LoginName: this.LoginName,
        LoginPassword: this.LoginPassword,
      })
      setTimeout(() => {
      if (this.$store.state.auth.errorFlag === true) {
        this.loginErrorFlag = true;
      }
      }, 700)
    },
  },
  created() {
    this.$store.state.auth.errorFlag = false;
  },
});
</script>

<template>
  <section>
    <div class="login-wrapper">
      <div class="login-container">
        <div class="login-title">LOGIN</div>
        <div class="name-form-mail">
          <label for="name">メールアドレス</label>
          <br/><br/>
          <v-row
            cols="12"
            md="4"
          >
            <Email
              v-model="LoginName"
              type="text"
            />
          </v-row>
        </div>
        <div class="name-form-password">
          <label for="name">パスワード</label>
          <br/><br/>
          <v-row
            cols="12"
            md="4"
          >
            <Password
              v-model="LoginPassword"
              type="password"
            />
          </v-row>
        </div>
        <div class="error-flag" v-if="loginErrorFlag == true">
          <span>メールアドレス か パスワードが違います</span>
        </div>
        <div v-else>
        </div>
        <div class="btn-area">
          <p>登録してない方は<router-link to="/register" class="router-link"><span>こちら</span></router-link></p>
          <div @click="login" class="login-btn">ログイン</div>
        </div>
      </div>
    </div>
  </section>
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
  margin: 0;

  .login-container {
    max-width: 500px;
    height: 620px;
    margin: 2rem auto 3rem auto;
    border: solid 1px #B9B9B9;
    border-radius: 8px;
    padding: 1rem 3rem 2rem 3rem;
    position: relative;
    background-color: $white;

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
      // background-color: #B9B9B9;

      .login-btn {
        @include blue-btn;
        @include neumorphism;
        color: $white;
        display: block;
        width: 100%;
        padding: 1.2rem 5rem;
        border-radius: 50px;
        font-size: .875rem;
        font-weight: 600;
        line-height: 1;
        text-align: center;
        // max-width: 280px;
        margin: auto;
        font-size: 1em;
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
      width: 98%;
      padding: 1rem;

      .btn-area {
        width: 90%;
      }
    }
  }
}
</style>