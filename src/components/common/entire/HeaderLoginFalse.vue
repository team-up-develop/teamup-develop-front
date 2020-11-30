<script lang="ts">
import Vue from 'vue';
// import LogoImage from '.../assets/logo.jpg'
// import $ from 'jquery'
export type DataType = {
  isActive: boolean;
  hasError: boolean;
  gnav: boolean;
}

export default Vue.extend({ 
  props: {
    flag: Boolean
  },
  data(): DataType {
    return {
      isActive: true,
      hasError: false,
      gnav: false //? ハンバーガーメニューフラグ
    }
  },
});
</script>

<template>
  <div class="header-wrapper">
    <div class="header-wrapper-area">
      <div class="header-main-area">
        <div class="header-main-left">
          <router-link to="/" class="router-link">ロゴ</router-link>
        </div>
        <div class="header-main-right">
          <v-row class="left-user-menu">
            <router-link to="/jobs" class="menu-list"><v-icon class="icon">mdi-magnify</v-icon></router-link>
            <router-link to="/login" class="router">
              <v-btn class="login-btn">
              ログイン
              </v-btn>
            </router-link>
          </v-row>
          <v-row class="right-create-btn">
            <router-link to="/register" class="router">
              <v-btn class="create-btn">
              登録する
              </v-btn>
            </router-link>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.boder-line {
  margin-top: 0.5rem;
  border-bottom: 1px dashed $primary-color;
}

.icon {
  color: $text-sub-color;
  margin-right: 0.7rem;
  font-size: 2em;
}

.router {
  text-decoration: none;
}

.header-wrapper {
  background-color: #ffffff;
  width: 100%;
  height: 58px;
  margin-bottom: 2px;
  top: 0px;
  top: -100px;
  left: 0;
  z-index: 2;
  transition: 0.3s ease-in-out;

  .header-wrapper-area {
    width: 100%;
    height: 66px;
    position: relative;

    .header-main-area {
      height: 100%;
      width: 100%;
      position: absolute;
      right: 0;
      top: 0;

      .header-main-left {
        width: 180px;
        height: 100%;
        padding: 1rem 0 0rem 2rem;

        @media screen and (max-width: 768px) {
          width: 100px;
        }

        @media screen and (max-width: 500px) {
          padding: 1rem 0 0rem 0rem;
        }
      }

      .header-main-right {
        width: 440px;
        padding: 0.7rem 0rem 0 0 ;
        position: absolute; 
        right: 0;
        top: 0;

        @media screen and (max-width: 768px) {
          width: 300px;
        }

        @media screen and (max-width: 500px) {
          width: 260px;
        }

        .left-user-menu {
          width: 38%;
          height: 100%;
          display: inline-block;
          font-weight: bold;

          @media screen and (max-width: 768px) {
            width: 50%;
            margin-right: 1rem;
          }

          @media screen and (max-width: 500px) {
            width: 60%;
          }

          .login-btn {
            @include blue-cancel-btn;
            background-color: $basic-white;
            font-weight: bold;
          }
        }

        .right-create-btn {
          width: 30%;
          height: 100%;
          display: inline-block;
          font-weight: bold;

          .create-btn {
            @include blue-btn;
            color: $basic-white;
            font-weight: bold;
          }
        }
      }
    }
  }
}

.menu-list {
  color: $text-sub-color;
  font-size: 14px;
  text-decoration: none;
}

/* スマホ */
@media (max-width: 500px){
  .header-wrapper .header-logo-area {
    padding: 0 0 0 0.3rem;
  }
}
</style>