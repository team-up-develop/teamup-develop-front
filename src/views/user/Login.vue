<script lang="ts">
import Vue from 'vue';
import Loading from '@/components/common/loading/Loading.vue'

export type DataType = {
  LoginName: string;
  LoginPassword: string;
  loginErrorFlag: boolean;
  loading: boolean;
}

export default Vue.extend({ 
  data(): DataType {
    return {
      LoginName: '',
      LoginPassword: '',
      loginErrorFlag: false,
      loading: true, 
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
  <section>
    <div class="login-wrapper" v-show="!loading">
      <div class="login-title">LOGIN</div>
      <div class="login-container">
        <div class="login-box">
          <div class="error-flag" v-if="loginErrorFlag == true">
            <span>メールアドレス か パスワードが違います</span>
          </div>
          <div v-else>
          </div>
          <div class="name-form">
            <label for="name" class="label">ログイン名</label>
            <input type="text" class="input" v-model="LoginName" placeholder="ログイン名">
          </div>
          <div class="name-form">
            <label for="name" class="label">パスワード</label>
            <input type="password" class="input" v-model="LoginPassword" placeholder="パスワード">
          </div>
          <div class="btn-area">
            <p>登録してない方は<router-link to="/register" class="router-link"><span>こちら</span></router-link></p>
            <div @click="login" class="login-btn">ログイン</div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-show="loading">
    </Loading>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

section {
  height: 95vh;
}
.router-link {
  text-decoration: none;
}

.login-wrapper {
  @include card-margin;
  width: 45%;

  .login-container {
    max-width: 500px;
    margin: 0rem auto 3rem auto;
    border: solid 1px #B9B9B9;
    border-radius: 20px;
    padding: 2rem;
  }
}

//* 登録カード 
.login-title {
  color: $primary-color;
  font-size: 1.6rem;  
  font-weight: bold;
  height: 50px;
  padding: 1rem 2rem;
  margin-top: 1rem;
  margin-bottom: 0.2rem;
}

//* フォーム & ボタン ボックス 
.login-container .login-box {
  width: 90%;
  height: 90%;
  margin: 0 auto;
  position: relative;
}

.login-box {

  // * Error
  .error-flag {
    text-align: left;

    span {
      color: $error-message-color;
      font-weight: bold;
    }
  }

  .btn-area {
    padding: 30% 0 0 0;
    height: 30%;

    span {
      cursor: pointer;
      color: $primary-color;
    }
  }

  .name-form {
    width: 100%;
    height: 80px;
    margin: 10% 0rem 14% 0;
    transition: 0.3s;
    text-align: left;

    .label {
      font-weight: bold;
    }

    .input {
      font: 16px/24px sans-serif;
      box-sizing: border-box;
      width: 100%;
      height: 65%;
      margin-top: 0.3rem;
      transition: 0.3s;
      color: #111111;
      letter-spacing: 1px;
      border: 1px solid #A3A1A1;
      border-radius: 4px;
      padding: 0.5rem 0.5rem;
      background-color: #EFEFEF;
    }

    input {
      &[type='text']:focus, &[type='password']:focus {
        @include primary-border_color;
        outline: none;
        box-shadow: 0 0 5px 1px #2195f348;
      }
    }
  }

  .btn-area .login-btn {
    @include blue-btn;
    display: block;
    padding: 1.2rem 5rem;
    border-radius: 50px;
    font-size: .875rem;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1.3rem;
    display: inline-block;
    cursor: pointer;
    border: none;
    margin: 0 auto;
    transition: .3s;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.685);
    outline: none;
  }
}

@media (max-width: 1440px) {
  .login-wrapper 
  .login-container 
  .login-box
  .btn-area {
    padding: 20% 0 0 0;
    height: 30%;
  }
}

/* タブレット */
@media (max-width: 900px) {
  .login-wrapper {
    width: 75%;
  }
  .login-container .login-box {
    width: 100%;
    height: 70%;
    margin: 0 auto;
    position: relative;
  }

  .login-box {
    .btn-area {
      padding: 17% 0 0 0;
      height: 30%;
    }

    span {
      cursor: pointer;
    }

    .name-form {
      width: 100%;
      height: 80px;
      margin: 3rem 0;
    }
  }
}

@media (max-width: 768px) {
  .login-wrapper {
    width: 100%;
  }
  .login-container 
  .login-box {
    width: 100%;
    height: 70%;
    margin: 0 auto;
    position: relative;

    .btn-area {
      padding: 15% 0 0 0;
      height: 20%;
    }
  }

  .login-box .name-form {
    width: 100%;
    height: 80px;
    margin: 3rem 0;

    .input {
      width: 95%;
    }
  }
}

/* スマホではだいたいこのピクセルから */
@media (max-width: 500px) {
  .login-wrapper {
    width: 100%;

    .login-container {
      margin: 0 auto 2rem auto;
      width: calc(100% - 5rem);
    }
  }
}

@media (max-width: 420px) {
  .login-btn {
    padding: 1.4rem 3rem;
  }

  .login-wrapper .login-container {
    width: calc(97% - 2rem);
    height: 70%;
    margin: 0rem auto 3rem auto;
    border: solid 1px $card-border-color;
    border-radius: 20px;
    padding: 2rem 1rem;
  }

  .login-box .name-form {
    .input {
      width: 100%;
    }
    font-size: 14px;
  }
}
</style>