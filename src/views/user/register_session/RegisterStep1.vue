<script lang="ts">
import Vue from 'vue';
import { RegisterSessionParams } from '@/types/user';

export type DataType = {
  userName: string;
  nickName: string;
  userBirthday: string;
  learningStartDate: string;
}

export default Vue.extend({ 
  data(): DataType {
    return {
      userName: '',
      nickName: '',
      userBirthday: '',
      learningStartDate: '',
    }
  },
  methods: {
    nextStep2() {
      if(this.userName && this.nickName && this.userBirthday && this.learningStartDate ) {
        const params: RegisterSessionParams = {
          userName: this.userName,
          nickName: this.nickName,
          userBirthday: this.userBirthday,
          learningStartDate: this.learningStartDate,
        }
        console.log("入力された値は" + params + "です。")
        sessionStorage.setItem('userName', params.userName);
        sessionStorage.setItem('nickName', params.nickName);
        sessionStorage.setItem('userBirthday', params.userBirthday);
        sessionStorage.setItem('learningStartDate', params.learningStartDate);
        
        return this.$router.push('/step/2');
      }
      else {
        console.log("必須が入力されていません")
      }
    }
  }
});
</script>

<template>
  <section>
    <div class="wrapper">
      <div class="title">基本情報</div>
      <div class="container">
        <div class="container__box">
          <div class="box-top">
            <span>STEP1/3</span>
            <!-- STEP グラフ -->
            <div class="step-graph">
              <div class="step-graph__line"></div>
            </div>
          </div>
          <!-- 中央 -->
          <div class="box-center">
            <div class="input-area">
              <label for="name" class="label">氏名</label><label for="name" class="label-required">必須</label>
              <input type="text" v-model="userName"  placeholder="例) チームアップ 太郎" maxlength="30" >
            </div>
            <div class="input-area">
              <label for="name" class="label">ユーザー名</label><label for="name" class="label-required">必須</label>
              <input type="text" v-model="nickName"  placeholder="例) チームアップ 太郎" maxlength="30" >
            </div>
            <div class="input-area">
              <label for="name" class="label">生年月日</label><label for="name" class="label-required">必須</label>
              <input type="date" v-model="userBirthday" placeholder="例) チームアップ 太郎" maxlength="30" >
            </div>
            <div class="input-area">
              <label for="name" class="label">学習開始日</label><label for="name" class="label-required">必須</label>
              <input type="date" v-model="learningStartDate" placeholder="例) チームアップ 太郎" maxlength="30" >
            </div>
          </div>
          <div class="box-bottom">
            <div class="next-btn" @click="nextStep2">次へ1/3</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 45%;
  margin: 0 auto;

  .title {
    // color: $secondary-color;
    font-size: 1.8rem;
    font-weight: bold;
    height: 50px;
    padding: 1rem 2rem;
    margin-top: 1rem;
  }
  .container {
    width: calc(100% - 12rem);
    max-width: 500px;
    height: 66vh;
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
          // color: $secondary-color;
        }

        .step-graph {
          width: 100%;
          height: 8px;
          margin: 0 auto;
          border-radius: 35px;
          // background-color: $basic-white;
          // border: solid 1px $text-sub-color;

          &__line {
            width: 33%;
            height: 100%;
            border-radius: 35px;
            // background-color: $secondary-color;
          }
        }
      }

      .box-center {
        width: 100%;
        height: 70%;
        // background-color: blueviolet;
        display: flex;
        flex-direction: column;
        text-align: left;
        // color: $text-main-color;

        .input-area {
          height: 16%;
          margin-bottom: 1.5rem;

          .label {
            font-weight: bold;
            // margin-bottom: 1rem;
          }

          .label-required {
            // color: $basic-white;
            // background-color: $error-message-color;
            font-size: 12px;
            font-weight: bold;
            border-radius: 25px;
            padding: 0.25rem 0.9rem;
            text-align: center;
            margin-left: 10px;
          }

          input[type='text'] {
            // @include input-border-color;
            // background-color: $sub-white;
            // color: $text-main-color;
            font: 16px/24px sans-serif;
            box-sizing: border-box;
            width: 100%;
            padding: 0.3em;
            transition: 0.3s;
            letter-spacing: 1px;
            border-radius: 4px;
            padding: 0.5rem;
            margin-top: 0.5rem;

            &:focus {
              // @include form-hover;
            }
          }

          input[type='date'] {
            // @include input-border-color;
            // background-color: $sub-white;
            // color: $text-main-color;
            font: 16px/24px sans-serif;
            box-sizing: border-box;
            width: 100%;
            padding: 0.3em;
            transition: 0.3s;
            letter-spacing: 1px;
            border-radius: 4px;
            padding: 0.5rem;
            margin-top: 0.5rem;

            &:focus {
              // @include form-hover;
            }
          }

        }
      }

      .box-bottom {
        width: 100%;
        height: 12%;
        position: absolute;
        bottom: 0;

        .next-btn {
          // @include box-shadow-btn;
          // @include purple-btn;
          // color: $basic-white;
          text-align: left;
          display: block;
          padding: 1.1rem 4rem;
          border-radius: 25px;
          border: none;
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
            // @include box-shadow-btn;
          }
        }
      }
    }
  }

}
</style>