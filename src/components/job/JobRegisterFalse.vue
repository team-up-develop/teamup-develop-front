<script>
import axios from 'axios'
export default {
  data() {
    return {
      LoginName: '',
      LoginPassword: '',
    }
  },
  methods: {
    register() {
      const params = {
        LoginName: this.LoginName,
        LoginPassword: this.LoginPassword,
      }
      axios.post(`${this.$baseURL}/signup`, params)
      .then(response => {
        console.log(response)
      });
      this.LoginName = "";
      this.LoginPassword = "";
    }
  }
}
</script>

<template>
  <section>
    <div class="false-user-login">
      <div class="top-login-title">
        簡単登録
      </div>
      <div class="register-form-area">
        <label for="name" class="label">ログイン名</label>
        <input type="text" class="input" v-model="LoginName" placeholder="ログイン名">
        <label for="name" class="label">パスワード</label>
        <input type="password" class="input" v-model="LoginPassword" placeholder="パスワード">
      </div>
      <div @click="register" class="register-btn">新規登録</div>
    </div>
    <!-- <div class="false-user-Advertisement">
    </div> -->
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

  .false-user-login {
    @include card-border-color;
    width: 75%;
    // height: calc(44vh - 4rem);
    background-color: $basic-white;
    border-radius: 8px;
    margin-top: 3.5rem;
    padding: 0 2rem 2rem 2rem;
    position: sticky;
  }

  .top-login-title {
    width: 100%;
    padding: 1rem 0;
    text-align: center;
    position: relative;
    color: #AB47BC;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 0.5rem;

    &:after {
      @include purple-btn;
      content: "";
      display: block;
      height: 4px;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 6px;
      content: '';
      border-radius: 3px;
    }
  }

  .register-form-area {
    width: 100%;
    height: 65%;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;

    .input {
      background: #EFEFEF;
      border: none;
      border-radius: 0;
      outline: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      padding: 1rem;
      border-radius: 4px;
      margin: 0 0 20px;
    }

    .label {
      color: #444444;
      font-size: 14px;
    }
  }

  .false-user-Advertisement {
    width: 75%;
    height: 40vh;
    background-color: $basic-white;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .register-btn {
    @include purple-btn;
    @include box-shadow-btn;
    display: block;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-size: .875rem;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    cursor: pointer;
    transition: .3s;
    outline: none;

    &:hover {
      color: #F8FAFF;
      appearance: none;
      border: none;
      box-shadow: 0 5px 20px -3px #AB47BC;
      transition: .3s;
    }
  }
</style>