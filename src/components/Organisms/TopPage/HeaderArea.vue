<script lang="ts">
import Vue from 'vue';

export default Vue.extend({ 

});
</script>

<template>
  <v-row class="header">
    <v-col class="left">
      <div class="left__title">
        チーム開発をすぐに始めれる
      </div>
      <div>
        本気でキャリアを変えようと努力している未経験エンジニア同士が
        オンラインでの「チーム開発」を通じて相互に成長し、
        エンジニアとしてスタートを切る。
      </div>
    </v-col>
    <div class="right">
      <button class="register-btn" @click="$router.push('/register')">登録する</button>
      <button class="login-btn" @click="$router.push('/login')">ログインする</button>
    </div>
  </v-row>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
.header {
  min-height: 200px;
  position: relative;

  @media (max-width: 786px) {
    min-height: 250px;
  }

  @media (max-width: 500px) {
    min-height: 320px;
  }
}

.left {
  text-align: left;
  max-width: 750px;

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
    color: $basic-white;
    padding: 1.1rem 3rem;
    border-radius: 8px;
  }

  .login-btn {
    border: solid 1px #673AB7;
    color: #673AB7;
    background-color: $basic-white;
    padding: 1.1rem 2rem;
    border-radius: 8px;
    margin-left: 1rem;

    @media (max-width: 508px) {
      margin-left: 0.5rem;
    }
  }
}
</style>