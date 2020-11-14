<script lang="ts">
import Loading from '@/components/common/loading/Loading.vue'
import Vue from 'vue';

export default Vue.extend({
  components: {
    Loading
  },
  data() {
    return {
      loading: true, 
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000)
  }
});
</script>


<template>
  <section>
    <div class="wrapper" v-show="!loading">
      <div class="container">
        <div class="top-area">
          <div class="top-area__left">
            <div class="top-title">
              <span>チーム開発で誰にも負けないスキルを</span>
              <p>
                本気でキャリアを変えようと努力している未経験エンジニア同士が
                オンラインでの「チーム開発」を通じて相互に成長し、
                エンジニアとしてスタートを切る。
              </p>
            </div>
            <div class="top-btn">
              <button class="login">ログインする</button>
              <button class="register">登録する</button>
            </div>
          </div>
          <div class="top-area__right">
            <img class="img" src="@/assets/images/teamup.jpg" width="100%" /> 
          </div>
        </div>
      </div>
      <div class="bc-image">
        <p>重なりを</p>
        <br>
        <p>確かめるため</p>
        <br>
        <p>一旦</p>
        <br>
        <p>コメントを</p>
        <br>
        <p>書いています</p>
        <br>
        <p>こんな感じで上書き</p>
        <br>
      </div>
    </div>
    <Loading v-show="loading">
    </Loading>
  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

// * 背景 波 
.bc-image {
  background-image: url('data:image/svg+xml;charset=utf8,%20%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201440%20320%22%3E%20%3Cpath%20fill%3D%22%232196F3%22%20fill-opacity%3D%221%22%20d%3D%22M0%2C64L48%2C90.7C96%2C117%2C192%2C171%2C288%2C186.7C384%2C203%2C480%2C181%2C576%2C154.7C672%2C128%2C768%2C96%2C864%2C85.3C960%2C75%2C1056%2C85%2C1152%2C106.7C1248%2C128%2C1344%2C160%2C1392%2C176L1440%2C192L1440%2C320L1392%2C320C1344%2C320%2C1248%2C320%2C1152%2C320C1056%2C320%2C960%2C320%2C864%2C320C768%2C320%2C672%2C320%2C576%2C320C480%2C320%2C384%2C320%2C288%2C320C192%2C320%2C96%2C320%2C48%2C320L0%2C320Z%22%3E%3C%2Fpath%3E%20%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: center;
  height: 450px;
  z-index: -10;
}

.wrapper {
  width: 100%;

  .container {
    width: 90%;
    margin: 0 auto;

    // * トップ エリア
    .top-area {
      height: 60vh;
      width: 100%;
      margin-top: 4rem;
      position: relative;

      &__left {
        padding: 5rem 0 2rem 0;
        width: 50%;
        height: calc(100% - 7rem);
        // background-color: rgb(175, 175, 175);
        position: absolute;
        left: 0;
        top: 0;

        .top-title {
          text-align: left;
          height: 50%;
          line-height: 1.8;

          span {
            background: -webkit-linear-gradient(0deg, #1142e2, #19bde6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            font-size: 2em;
          }

          p {
            font-weight: bold;
          }
        }

        .top-btn {
          width: 430px;
          height: 30%;
          margin: 0 auto;
          position: relative;
          // background-color: yellowgreen;

          .login {
            border: solid 1px #673AB7;
            color: #673AB7;
            background-color: #ffffff;
            text-align: left;
            display: block;
            padding: 1.1rem 3rem;
            border-radius: 8px;
            font-size: .875rem;
            font-weight: 600;
            line-height: 1;
            text-align: center;
            max-width: 280px;
            margin: auto;
            font-size: 1rem;
            float: right;
            cursor: pointer;
            transition: .3s;
            outline: none;
            position: absolute;
            right: 0;
            bottom: 0;
          }

          .register {
            @include purple-btn;
            text-align: left;
            display: block;
            padding: 1.1rem 4rem;
            border-radius: 8px;
            border: none;
            font-size: .875rem;
            font-weight: 600;
            color: $basic-white;
            line-height: 1;
            text-align: center;
            max-width: 280px;
            margin: auto;
            font-size: 1rem;
            float: right;
            cursor: pointer;
            transition: .3s;
            outline: none;
            position: absolute;
            left: 0;
            bottom: 0;
          }
        }
      }
      
      &__right {
        width: 50%;
        height: 100%;
        // background-color: rgba(204, 52, 52, 0.739);
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
}
</style>