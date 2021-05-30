<script lang="ts">
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import Vue from "vue";
import Vuex from "@/store/index";

export default Vue.extend({
  components: {
    Loading,
  },
  data() {
    return {
      loading: true,
      userId: Vuex.state.auth.userId,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  },
  methods: {
    register() {
      this.$router.push("/register/step/1");
    },
    login() {
      this.$router.push("login");
    },
    createJob() {
      this.$router.push("/job_create/1");
    },
    searchJob() {
      this.$router.push("/jobs");
    },
  },
});
</script>

<template>
  <section>
    <div class="wrapper" v-show="!loading">
      <div class="top-area">
        <div class="top-area__left">
          <div class="top-title">
            <div class="top-title__upper">
              <span>チーム開発で実務で使えるスキルを獲得する</span>
            </div>
            <div class="top-title__lower">
              <p>
                本気でキャリアを変えようと努力している未経験エンジニア同士がオンラインでの「チーム開発」を通じて相互に成長し、エンジニアとしてキャリアをスタートを切ることをサポートします。
              </p>
            </div>
          </div>
          <div class="top-img">
            <img
              class="img"
              src="@/assets/images/teamUp.png"
              alt="チームアップ, teamUp, team up, チーム開発, 開発, 駆け出しエンジニア, エンジニア, 未経験エンジニア"
              width="100%"
              height="350px"
            />
          </div>
          <div class="top-btn" v-if="!userId">
            <button class="login" @click="login">ログインする</button>
            <button class="register" @click="register">登録する</button>
          </div>
          <div class="top-btn" v-else>
            <button class="login" @click="searchJob">案件を探す</button>
            <button class="register" @click="createJob">作成する</button>
          </div>
        </div>
        <div class="top-area__right">
          <img
            class="img"
            src="@/assets/images/teamUp.png"
            alt="チームアップ, teamUp, team up, チーム開発, 開発, 駆け出しエンジニア, エンジニア, 未経験エンジニア"
            width="100%"
            height="350px"
          />
        </div>
      </div>
      <div class="middle-area">
        <h2 class="middle-titlle font-weight-bold">
          チームアップでできること
          <p>What you can do</p>
        </h2>
        <div class="card-area">
          <v-card elevation="6">
            <h3 class="card-title">仲間との繋がり</h3>
            <div class="circle">
              <v-icon class="icon">
                mdi-account-group
              </v-icon>
            </div>
            <div class="card-inner">
              <p>
                未経験のエンジニア同士エンジニア同士がオンラインで繋がり、
                <span>0からチーム開発を体験する事ができます。</span>
                目標を共有できる開発の仲間を見つけることができます。
              </p>
            </div>
          </v-card>
          <v-card elevation="6">
            <h3 class="card-title">スキルを習得</h3>
            <div class="circle">
              <v-icon class="icon">
                mdi-diamond-stone
              </v-icon>
            </div>
            <div class="card-inner">
              <p>
                <span>「使いたい」「得意な」</span>
                スキルを選択して開発をスタートすることができます。
                実際にサービスをリリースするにあたり、コードを書くだけでなく
                品質を意識した開発をすることで学べる知識は多岐に渡ります。
              </p>
            </div>
          </v-card>
          <v-card elevation="6" color="rgba(0, 0, 0, 0.637)">
            <h3 class="card-title-coming">メンターサポート</h3>
            <div class="text-center">
              <p class="soon mt-10">Coming Soon</p>
            </div>
            <!-- <div class="circle">
              <v-icon class="icon">
                mdi-account-multiple
              </v-icon>
            </div> -->
          </v-card>
        </div>
        <div class="middle-btn-area">
          <div class="middle-btn" v-if="!userId">
            <button class="login" @click="login">ログインする</button>
            <button class="register" @click="register">登録する</button>
          </div>
          <div class="middle-btn" v-else>
            <button class="login" @click="searchJob">案件を探す</button>
            <button class="register" @click="createJob">作成する</button>
          </div>
        </div>
      </div>
      <div class="bottom-area">
        <h2 class="bottom-title font-weight-bold">
          チームアップはスキルアップの手助けをします
          <p>value of service</p>
        </h2>
        <div class="bottom-img">
          <img
            class="img"
            src="@/assets/images/lp-value.png"
            alt="チームアップ, teamUp, team up, チーム開発, 開発, 駆け出しエンジニア, エンジニア, 未経験エンジニア "
            width="90%"
            height="500px"
          />
        </div>
        <div class="bottom_contents">
          <div class="bottom_contents_left">
            <div class="bottom_contents_left__top">
              <h3>チームの『知』を自分の『知』にできる</h3>
            </div>
            <div class="bottom_contents_left__upper">
              <p>
                個人で得る情報には、偏りがまれやすい。
                しかし、チーム開発を行うことで、<br />その偏りを技ない、知識の幅を広げることができる。<br />
              </p>
            </div>
            <div class="bottom_contents_left__top">
              <h3>個人では得られない『体験価値』得ることができる</h3>
            </div>
            <div class="bottom_contents_left__upper">
              <p>
                個人では意識しない「コードレビュー」・「第三者の意見」「開発の進め方」が体験としいて得ることができます。<br />
                実務では必須だが、個人では得られない観点の知識を得ることができます。
              </p>
            </div>
            <div class="bottom_contents_left__top">
              <h3>専門分野に特化することができる</h3>
            </div>
            <div class="bottom_contents_left__upper">
              <p>
                開発では、作業を分担して行います。バックエンド、フロントエンド、デザイナーなど様々な専門的技術が混ざり合い開発を行います。
                浅く広くではなく、深く1点を突き詰めることで実務でも活きる力になります。
              </p>
            </div>
          </div>
          <div class="bottom_contents_right">
            <img
              class="img"
              src="@/assets/images/lp-value.png"
              alt="チームアップ, teamUp, team up, チーム開発, 開発, 駆け出しエンジニア, エンジニア, 未経験エンジニア"
              width="100%"
              height="700px"
            />
          </div>
        </div>
      </div>
      <div class="image">
        <div class="image_inner"></div>
      </div>
    </div>
    <Loading v-show="loading" />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

// * 背景 波
//.bc-image {
//  background-image: url('data:image/svg+xml;charset=utf8,%20%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201440%20320%22%3E%20%3Cpath%20fill%3D%22%232196F3%22%20fill-opacity%3D%221%22%20d%3D%22M0%2C64L48%2C90.7C96%2C117%2C192%2C171%2C288%2C186.7C384%2C203%2C480%2C181%2C576%2C154.7C672%2C128%2C768%2C96%2C864%2C85.3C960%2C75%2C1056%2C85%2C1152%2C106.7C1248%2C128%2C1344%2C160%2C1392%2C176L1440%2C192L1440%2C320L1392%2C320C1344%2C320%2C1248%2C320%2C1152%2C320C1056%2C320%2C960%2C320%2C864%2C320C768%2C320%2C672%2C320%2C576%2C320C480%2C320%2C384%2C320%2C288%2C320C192%2C320%2C96%2C320%2C48%2C320L0%2C320Z%22%3E%3C%2Fpath%3E%20%3C%2Fsvg%3E');
//  background-repeat: no-repeat;
//  background-position: center;
//  height: 450px;
//  z-index: -10;
//}

.wrapper {
  width: 100%;

  // * トップ エリア
  .top-area {
    height: 60vh;
    width: 80%;
    margin: 2rem auto;
    position: relative;

    &__left {
      width: 50%;
      height: 90%;
      //background-color: rgb(175, 175, 175);
      position: absolute;
      left: 0;
      top: 0;

      .top-title {
        margin: 2rem 0;
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
          margin-top: 2rem;
          font-weight: bold;
        }
      }

      .top-img {
        display: none;
      }

      .top-btn {
        width: 430px;
        height: 20%;
        margin: 3rem auto;
        position: relative;

        .login {
          @include neumorphism;
          color: $primary-color;
          font-weight: bold;
          display: block;
          padding: 1.1rem 3rem;
          border-radius: 8px;
          line-height: 1;
          text-align: center;
          max-width: 280px;
          margin: auto;
          font-size: 1rem;
          float: right;
          transition: 0.3s;
          position: absolute;
          right: 0;
          bottom: 0;
        }

        .register {
          @include blue-btn;
          @include box-shadow-btn;
          color: $white;
          font-weight: bold;
          padding: 1.1rem 4rem;
          border-radius: 8px;
          line-height: 1;
          text-align: center;
          max-width: 280px;
          margin: auto;
          font-size: 1rem;
          float: right;
          cursor: pointer;
          transition: 0.3s;
          position: absolute;
          left: 0;
          bottom: 0;

          &:hover {
            box-shadow: none;
          }
        }
      }
    }

    &__right {
      width: 50%;
      height: 100%;
      position: absolute;
      right: 0;
      display: flex;
      top: 0;
      padding: 2rem 0 0 3rem;
    }
  }
  //* できることエリア
  .middle-area {
    width: 100%;
    position: relative;

    .middle-titlle p {
      font-size: 0.5em;
      color: $secondary-color;
    }

    .card-area {
      width: 90%;
      margin: 3rem auto;
      display: flex;
      justify-content: space-between;
      position: relative;

      .card-title {
        color: $primary-color;
        margin: 1rem auto;
      }
      .card-title-coming {
        color: $white;
        margin: 1rem auto;
      }
      .soon {
        font-size: 2em;
        color: $white;
      }

      .v-card {
        min-height: 450px;
        width: 30%;

        .circle {
          height: 7rem;
          width: 7rem;
          background-color: $dark-white;
          position: relative;
          margin: 0rem auto;
          border-radius: 50%;
          box-shadow: -5px -5px 20px $white, 5px 5px 20px #babecc;

          .icon {
            margin-top: 1.8rem;
            font-size: 49px;
            color: $primary-color;
          }
        }

        .card-inner {
          margin: 2rem;
          line-height: 1.8rem;

          p span {
            color: $primary-dark;
            font-size: 1.2em;
            font-weight: bold;
          }
        }
      }
    }

    .middle-btn-area {
      width: 95%;
      height: 20vh;
      margin: 5rem auto;
      position: relative;
      display: flex;
      // background-color: $primary-dark;

      .middle-btn {
        width: 430px;
        height: 100px;
        position: relative;
        margin: 1rem auto;

        .login {
          @include neumorphism;
          color: $primary-color;
          text-align: left;
          background-color: $white;
          padding: 1.1rem 3rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          line-height: 1;
          text-align: center;
          max-width: 280px;
          font-size: 1rem;
          float: right;
          cursor: pointer;
          transition: 0.3s;
          outline: none;
          position: absolute;
          right: 0;
          bottom: 0;
        }

        .register {
          @include blue-btn;
          @include box-shadow-btn;
          color: $white;
          font-weight: bold;
          padding: 1.1rem 4rem;
          border-radius: 8px;
          line-height: 1;
          text-align: center;
          max-width: 280px;
          margin: auto;
          font-size: 1rem;
          float: right;
          cursor: pointer;
          transition: 0.3s;
          position: absolute;
          left: 0;
          bottom: 0;

          &:hover {
            box-shadow: none;
          }
        }
      }
    }
  }

  .bottom-area {
    width: 80%;
    position: relative;
    margin: 3rem auto;

    .bottom-title p {
      font-size: 0.5em;
      color: $secondary-color;
    }

    .bottom-img {
      display: none;
    }

    .bottom_contents {
      position: relative;
      height: 100vh;
      margin-top: 3rem;

      .bottom_contents_left {
        position: absolute;
        width: 50%;
        float: left;
        left: 0;

        .bottom_contents_left__top {
          float: left;
          text-align: left;
          margin-top: 1rem;
        }

        .bottom_contents_left__upper {
          float: left;
          text-align: left;
          margin: 1rem 0;
        }

        h3 {
          color: $primary-color;
        }

        p {
          margin-top: 1rem;
        }
      }

      .bottom_contents_right {
        height: 0;
        width: 50%;
        float: right;
        position: absolute;
        right: 0;
        padding-left: 3rem;
      }
    }
  }

  .image_inner {
    background-color: $primary-dark;
    width: 100%;
    margin-top: 8rem;
    p {
      color: $white;
    }
  }
}

@media screen and (max-width: $gr) {
  .wrapper {
    .top-area {
      width: 90%;
      margin: auto;

      &__left {
        height: 90%;
      }

      &__right {
        margin: 0;
      }

      .top-btn {
        width: 100%;
      }
    }
    .middle-area {
      .card-area {
        width: 90%;
        margin: 4rem auto;

        .v-card {
          width: 32%;
        }
      }
    }
    .bottom-area {
      width: 90%;
      margin: 2rem auto;

      .bottom-title {
        margin-bottom: 2rem;
      }

      .bottom_contents {
        margin-top: 1rem;
      }
    }
  }
}

/* タブレット */
@media (max-width: $la) {
  .wrapper {
    .top-area {
      width: 100%;

      &__left {
        height: 100%;
        width: 55%;
        margin: 0 1rem;
      }

      &__right {
        width: 40%;
        padding: 2rem 1rem 0 1rem;
      }

      .top-btn {
        width: 95%;
        margin: 2rem 0rem;
      }
    }

    .middle-area {
      .card-area {
        width: 95%;
        margin: 4rem auto;
      }

      .middle-btn-area {
        .middle-btn {
          width: 540px;
        }
      }
    }

    .bottom-area {
      width: 100%;
      margin: 0 auto;

      .bottom_contents {
        margin: 3rem 2rem;
      }
    }
  }
}

@media (max-width: $me) {
  .wrapper {
    .top-area {
      height: 90vh;
      margin: 2rem auto;

      &__left {
        width: 100%;
        margin: 0 0;
        padding: 0;

        .top-title {
          margin: 0rem auto;
          text-align: center;
          width: 90%;
          height: 40%;

          &__upper {
            height: 40%;
            margin: 1rem 0;
          }

          span {
            margin: 1rem 0;
          }

          &__lower {
            height: 50%;
            margin: 1rem 0;
          }

          p {
            margin-top: 1rem;
          }
        }
        .top-img {
          display: inline;
          height: 40%;
          width: 90%;
          margin: 2rem auto;
        }

        .top-btn {
          width: 80%;
          height: 3rem;
          margin: 2.5rem auto;
        }
      }
      &__right {
        display: none;
      }
    }

    .middle-area {
      margin: 8rem 0;

      .card-area {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        margin: 0rem auto;

        .v-card {
          width: 80%;
          margin: 2rem auto;
        }
      }
      .middle-btn-area {
        margin: 3rem auto;
      }
    }

    .bottom-area {
      .bottom-img {
        display: inline;
      }

      .bottom_contents {
        margin-top: 0;

        .bottom_contents_left {
          width: 100%;
          height: 90vh;
        }
        .bottom_contents_right {
          display: none;
        }
      }
    }
  }
}

@media (max-width: $sm) {
  .wrapper {
    .top-area {
      height: 90vh;
      margin: 1rem 0;

      .top-area__left {
        margin: 0 0;
        height: 90%;

        .top-title {
          height: 50%;
          margin: 0 auto;

          .top-title__upper {
            height: 50%;
          }

          .top-title__lower {
            height: 50%;

            p {
              margin: 0;
            }
          }
        }
      }

      .top-btn {
        width: 95%;
        margin: 2rem auto;
      }
    }

    .middle-area {
      margin: 10rem 0;
      .middle-titlle {
        margin: 2rem 2rem;
      }
    }

    .bottom-area {
      .bottom-title {
        margin: 3rem 2rem;
      }

      .bottom_contents {
        margin: 2rem 2rem;
      }
    }
  }
}

@media (max-width: $ti) {
  .wrapper {
    .top-area {
      height: 100vh;

      .top-area__left {
        .top-title {
          height: 50%;

          .top-title__upper {
            height: 40%;
          }

          .top-title__lower {
            height: 40%;
            margin: 1rem 0;
          }
        }
      }
      .top-btn {
        margin: 3rem auto;

        .login {
          max-width: 200px;
          padding: 1rem 2rem;
        }
        .register {
          max-width: 200px;
          padding: 1rem 3rem;
        }
      }
    }

    .middle-area {
      .middle-titlle {
        margin: 0 2rem;
      }

      .card-area {
        margin: 2rem auto;
      }

      .middle-btn-area {
        margin: 3rem auto;
        padding-right: 2rem;

        .middle-btn {
          .login {
            padding: 1.1rem 2rem;
          }
          .register {
            padding: 1.1rem 3rem;
          }
        }
      }
    }

    .bottom-area {
      margin: 3rem auto;
      .bottom_contents {
        height: 120vh;
      }
    }
  }
}
</style>
