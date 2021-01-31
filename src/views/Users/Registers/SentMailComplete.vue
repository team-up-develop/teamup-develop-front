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
      <div class="container">
        <div class="card">
          <img class="img" src="@/assets/images/mail-comp.png" />
          <div>
            <span>
              チームアップに登録ありがとうございます。<br />
              メールを確認してください。 <br />
              <span>まだ登録は完了しておりません。<br /></span>
            </span>
          </div>
          <div class="btn-area">
            <button class="btn-top" @click="topRedirect">TOPへ</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.wrapper {
  width: 45%;
  height: 77vh;
  margin: 2rem auto 0 auto;

  .card-title {
    color: #673ab7;
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
    border: solid 1px #b9b9b9;
    border-radius: 20px;
    padding: 0 2rem 2rem 2rem;
  }

  .card {
    width: 85%;
    height: 100%;
    margin: 0 auto;
    position: relative;

    img {
      width: 90%;
      max-width: 450px;
    }

    span {
      line-height: 1.8;
      margin: 1rem 0;
      text-align: center;
      font-weight: bold;

      span {
        line-height: 3;
        color: rgb(177, 14, 136);
      }
    }

    .btn-area {
      position: absolute;
      bottom: 0;
      width: 100%;

      .btn-top {
        display: block;
        padding: 1.2rem 5rem;
        border: #673ab7 1px solid;
        background-color: #ffffff;
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 600;
        color: #673ab7;
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

@media (max-width: 1440px) {
  .wrapper .container {
    .card .btn-area {
      padding: 15% 0 0 0;
    }
  }
}

@media (max-width: 1100px) {
  .wrapper {
    width: 50%;
  }
}

/* タブレット */
@media (max-width: 900px) {
  .wrapper {
    width: 75%;
  }
  .container .card {
    img {
      width: 80%;
      max-width: 450px;
    }
  }
}

@media (max-width: 768px) {
  .wrapper {
    width: 100%;
  }
}

/* スマホではだいたいこのピクセルから */
@media (max-width: 500px) {
  .wrapper {
    width: 100%;

    .container {
      margin: 0 auto 2rem auto;
      width: 98%;
    }
  }
}

@media (max-width: 420px) {
  .wrapper .container {
    margin: 0rem auto 3rem auto;
    border: solid 1px $card-border-color;
    border-radius: 20px;
    padding: 2rem 1rem;
  }
}
</style>
