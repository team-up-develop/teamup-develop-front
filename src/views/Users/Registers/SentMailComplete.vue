<script>
export default {
  data() {
    return {};
  },
  methods: {
    topRedirect() {
      return this.$router.push("/");
    },
  },
};
</script>

<template>
  <section>
    <div class="wrapper">
      <div class="card-title">登録確認メール送信完了</div>
      <v-card class="container">
        <div class="card">
          <img class="img" src="@/assets/images/mail-comp.png" />
          <div>
            <span>
              チームアップにご登録ありがとうございます。<br />
              メールを確認してください。 <br />
              <v-row class="alert d-block"
                ><img class="alert__img" src="@/assets/images/alert.png"/>
                まだ登録は完了しておりません。<br
              /></v-row>
            </span>
          </div>
          <div class="btn-area">
            <button class="btn-top" @click="topRedirect">TOPへ</button>
          </div>
        </div>
      </v-card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.wrapper {
  width: 45%;
  height: 77vh;
  margin: 2rem auto 0 auto;

  @media (max-width: 1100px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  .card-title {
    color: $primary-color;
    font-size: 1.4rem;
    font-weight: bold;
    padding: 1rem 2rem;
    margin-top: 1rem;
  }

  .container {
    width: 100%;
    max-width: 500px;
    height: 98%;
    margin: 0rem auto 3rem auto;
    background-color: $white;
    border-radius: 8px;
    padding: 0 2rem 2rem 2rem;

    @media (max-width: 500px) {
      margin: 0 auto 2rem auto;
      width: 95%;
    }

    @media (max-width: 420px) {
      margin: 0rem auto 3rem auto;
      padding: 2rem 1rem;
    }
  }

  .card {
    width: 85%;
    height: 100%;
    margin: 0 auto;
    position: relative;

    img {
      width: 90%;
      max-width: 450px;

      @media (max-width: 900px) {
        width: 80%;
      }
    }

    span {
      line-height: 1.8;
      margin: 1rem 0;
      text-align: center;
      font-weight: bold;

      .alert {
        line-height: 3;
        color: $error-message-color;

        &__img {
          width: 20px;
          height: 20px;
          margin: 1rem 0.2rem 0 0;
        }
      }
    }

    .btn-area {
      position: absolute;
      bottom: 0;
      width: 100%;

      @media (max-width: 1440px) {
        padding: 15% 0 0 0;
      }

      .btn-top {
        @include blue-btn;
        @include neumorphism;
        color: $white;
        display: block;
        padding: 1.2rem 5rem;
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1;
        text-align: center;
        max-width: 280px;
        margin: auto;
        font-size: 1.3rem;
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
