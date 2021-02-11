<template>
  <section>
    <div class="wrapper">
      <div class="title">登録完了</div>
      <v-card class="container">
        <div class="container text-left">
          <div>
            <img class="img" src="@/assets/images/register.jpg" width="100%" />
            <v-col class="message">
              <label for="name" class="register-label"
                >登録が完了しました。早速、下のボタンから始めてみよう！</label
              >
            </v-col>
          </div>
          <div class="bottom">
            <div class="job-search-btn">案件を探す</div>
            <div class="job-create-btn">人を募集する</div>
          </div>
        </div>
      </v-card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.wrapper {
  width: 550px;
  height: 90%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 95%;
  }

  .title {
    color: $primary-color;
    font-size: 1.8rem;
    font-weight: bold;
    height: 50px;
    padding: 1rem 2rem;
    margin-top: 1rem;
  }
  .card {
    min-height: 615px;

    .session {
      height: 80px;
    }

    .container {
      padding: 0 2rem;

      @media (max-width: 500px) {
        padding: 0 1rem;
      }
    }
  }
}

.message {
  min-height: 120px;
}

.bottom {
  width: 80%;
  height: 100px;
  margin: 0 auto;

  @media (max-width: 500px) {
    width: 100%;
  }

  .job-search-btn {
    @include box-shadow-btn;
    @include blue-btn;
    color: $white;
    text-align: left;
    display: block;
    padding: 1.1rem 2.4rem;
    border-radius: 28px;
    border: none;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: left;
    margin-top: 1.5rem;
    cursor: pointer;
    transition: 0.3s;
    outline: none;

    @media (max-width: 400px) {
      padding: 1.1rem 1.7rem;
    }

    &:hover {
      @include box-shadow-btn;
    }
  }

  .job-create-btn {
    @include blue-cancel-btn;
    text-align: left;
    display: block;
    padding: 1.1rem 2rem;
    border-radius: 28px;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: right;
    margin-top: 1.5rem;
    cursor: pointer;
    transition: 0.3s;
    outline: none;

    @media (max-width: 400px) {
      padding: 1.1rem 1rem;
    }

    &:hover {
      @include box-shadow-btn;
    }
  }
}
</style>
