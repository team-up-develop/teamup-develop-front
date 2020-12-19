<template>
  <section>
    <div class="wrapper">
      <div class="title">登録完了</div>
      <div class="container">
        <div class="container__box">
          <div class="box-top">
            <span>STEP3/3</span>
            <!-- STEP グラフ -->
            <div class="step-graph">
              <div class="step-graph__line"></div>
            </div>
          </div>
          <!-- 中央 -->
          <div class="box-center">
            <label for="name" class="register-label">登録が完了しました。</label>
            <img class="img"  src="@/assets/images/register.jpg" width="100%" />
          </div>
          <div class="box-bottom">
            <div class="job-search-btn">案件を探してみる</div>
            <div class="job-create-btn">案件を募集してみる</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

section {
  height: 95vh;
}

.wrapper {
  width: 45%;
  height: 90%;
  margin: 0 auto;

  .title {
    color: $primary-color;
    font-size: 1.8rem;
    font-weight: bold;
    height: 50px;
    padding: 1rem 2rem;
    margin-top: 1rem;
  }
  .container {
    max-width: 500px;
    height: 90%;
    margin: 0rem auto 3rem auto;
    border: solid 1px #B9B9B9;
    border-radius: 20px;
    padding: 2rem;

    &__box {
      width: 90%;
      height: 100%;
      margin: 0 auto;
      position: relative;

      .box-top {
        width: 100%;
        height: 12%;

        span {
          font-weight: bold;
          color: $primary-color;
        }

        .step-graph {
          width: 100%;
          height: 8px;
          margin: 0 auto;
          border-radius: 35px;
          background-color: $white;
          border: solid 1px $text-sub-color;

          &__line {
            width: 100%;
            height: 100%;
            border-radius: 35px;
            background-color: $primary-color;
          }
        }
      }

      .box-center {
        width: 100%;
        // height: 70%;
        // background-color: blueviolet;
        display: flex;
        flex-direction: column;
        text-align: left;
        color: $text-main-color;

        .register-label {
          font-weight: bold;
        }
      }

      .box-bottom {
        width: 100%;
        height: 12%;
        position: absolute;
        bottom: 0;

        .job-search-btn {
          @include box-shadow-btn;
          @include blue-btn;
          color: $white;
          text-align: left;
          display: block;
          padding: 1.1rem 1.7rem;
          border-radius: 28px;
          border: none;
          font-size: .875rem;
          font-weight: 600;
          line-height: 1;
          text-align: center;
          max-width: 280px;
          margin: auto;
          font-size: 1rem;
          float: left;
          margin-top: 1.5rem;
          cursor: pointer;
          transition: .3s;
          outline: none;

          &:hover {
            @include box-shadow-btn;
          }
        }

        .job-create-btn {
          @include blue-cancel-btn;
          text-align: left;
          display: block;
          padding: 1.1rem 1.2rem;
          border-radius: 28px;
          font-size: .875rem;
          font-weight: 600;
          line-height: 1;
          text-align: center;
          max-width: 280px;
          margin: auto;
          font-size: 1rem;
          float: right;
          margin-top: 1.5rem;
          cursor: pointer;
          transition: .3s;
          outline: none;

          &:hover {
            @include box-shadow-btn;
          }
        }
      }
    }
  }

}
</style>