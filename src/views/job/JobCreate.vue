<script lang="ts">
import Vue from 'vue';
// import axios from 'axios'
import Loading from '@/components/common/loading/Loading.vue'
import { JobCreateData } from '@/types/job';

export type DataType = {
  loading: boolean;
  jobTitle: string | null;
  jobDescription: string | null;
  devStartDate: string | null;
  devEndDate: string | null;
  titleLimit: number | null;
  jobDescriptionLimit: number | null;
  errors: string[];
  errorsDevStartDates: string[];
  errorDevEndDates: string[];
}

export default Vue.extend({ 
  data(): DataType {
    return {
      loading: true,
      jobTitle: "", //? タイトル
      jobDescription: "", //? 詳細
      devStartDate: "", //? 開始日
      devEndDate: "", //? 終了日
      titleLimit: 0, //? タイトル文字制限
      jobDescriptionLimit: 0, //? 詳細文字制限
      errors: [], //? タイトルエラー格納先
      errorsDevStartDates: [], //? 開発開始時期エラー格納先
      errorDevEndDates: [] //? 開発終了時期エラー格納先
    }
  },
  computed: {
    // * 必須が入力されていない
    isForm() {
      if(this.jobTitle && this.devStartDate && this.devEndDate) {
        return true
      } else {
        return false
      }
    },
    // * 開発開始 より 開発終了 が前
    minStartDate() {
      if(this.devStartDate && this.devEndDate) {
        const a = new Date(this.devStartDate)
        const b = new Date(this.devEndDate)

        if (a > b) {
          return true
        }
        return false
      }
      return false
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 900)
    // * セッションストレージの値をフォームに格納する
    const jobTitle = sessionStorage.getItem('jobTitle');
    const jobDescription = sessionStorage.getItem('jobDescription');
    const devStartDateString = sessionStorage.getItem('devStartDateString');
    const devEndDateString = sessionStorage.getItem('devEndDateString');
    this.jobTitle = jobTitle;
    this.devStartDate = devStartDateString;
    this.devEndDate = devEndDateString;
    this.jobDescription = jobDescription;
  },
  methods: {
    nextCreateBtn(e: any) { // ! Todo 明示的なanyにしているがLinterでErrorを出してくれてる。あまり良くない書き方
      //* エラーメッセージ
      if(!this.jobTitle || !this.devStartDate || !this.devEndDate) {
        this.errors = [];
        this.errorsDevStartDates = [];
        this.errorDevEndDates = [];
        if(this.jobTitle == null || !this.jobTitle ) this.errors.push("案件タイトルを入力してください");
        if(this.devStartDate == null) this.errorsDevStartDates.push("開発終了時期を入力してください");
        if(this.devEndDate == null) this.errorDevEndDates.push("開発終了時期を入力してください");
        e.preventDefault();
      }
      // * PostData
      if(this.jobTitle && this.devStartDate && this.devEndDate) {
        const params: JobCreateData = {
          jobTitle : this.jobTitle,  //? タイトル
          jobDescription: this.jobDescription, //? 詳細
          devStartDate: this.devStartDate, //? 開発開始
          devEndDate: this.devEndDate, //? 開発終了
        };
        if(params.jobTitle == null) {
          console.log("null")
        } else {
          sessionStorage.setItem('jobTitle', params.jobTitle);
        }
        if(params.jobDescription == null) {
          console.log("null")
        } else {
          sessionStorage.setItem('jobDescription', params.jobDescription);
        }
        if(params.devStartDate == null) {
          console.log("null")
        } else {
          sessionStorage.setItem('devStartDateString', params.devStartDate);
        }
        if(params.devEndDate == null) {
          console.log("null")
        } else {
          sessionStorage.setItem('devEndDateString', params.devEndDate);
        }
        const jobTitle = sessionStorage.getItem('jobTitle');
        this.jobTitle = jobTitle;
      }
    },
    //* タイトル文字制限 
    onInputTitle: function(): void  {
      if(this.jobTitle == null) {
        console.log("null")
      } else {
        this.titleLimit = this.jobTitle.length;
      }
    },
    // * 詳細文字制限
    onTextJobDescription: function(): void  {
      if(this.jobDescription == null) {
        console.log("null")
      } else {
      this.jobDescriptionLimit = this.jobDescription.length
      }
    },
  },
  components: {
    Loading,
  },
});
</script>

<template>
  <div class="create-wrapper">
    <v-card class="job-create-wrapper" v-show="!loading">
      <div class="job-create-title-area">
        <label for="name" class="label">案件タイトル</label><label for="name" class="label-required">必須</label>
          <label v-if="errors.length" class="error-label">
            <p v-for="error in errors" :key="error" class="error-message">{{ error }}</p>
          </label>
        <input type="text" v-model="jobTitle" @input="onInputTitle" placeholder="Go と Vue.js で 未経験エンジニアのためのサービスを作りたい(60文字以内で入力してください)" maxlength="60" >
          <small id="rem">残り{{60 - titleLimit }}文字</small>
      </div>
      <div class="job-create-time-area">
        <label for="name" class="label">開発開始時期</label><label for="name" class="label-required">必須</label>
          <label v-if="errorsDevStartDates.length" class="error-label">
            <p v-for="errorsDevStartDate in errorsDevStartDates" :key="errorsDevStartDate" class="error-message">{{ errorsDevStartDate }}</p>
          </label>
        <input type="date" v-model="devStartDate">
      </div>
      <div class="job-create-time-area">
      <label for="name" class="label">開発終了時期</label><label for="name" class="label-required">必須</label><label v-if="minStartDate" class="error-message">{{ "開始日が終了日より前です。" }}</label>
        <label v-if="errorDevEndDates.length" class="error-label">
          <p v-for="errorDevEndDate in errorDevEndDates" :key="errorDevEndDate" class="error-message">{{ errorDevEndDate }}</p>
        </label>
      <input type="date" v-model="devEndDate">
      </div>
      <div class="job-create-detail-area">
        <label for="name" class="label">概要</label>
        <textarea type="text" name="" @input="onTextJobDescription" v-model="jobDescription" placeholder="詳しい内容や現在の状況を記載してください(250文字以内)" maxlength="250"></textarea>
        <small id="rem">残り{{250 - jobDescriptionLimit }}文字</small>
      </div>
      <router-link to='/job_create/2' class="job-create-btn-area" v-if="isForm && !minStartDate">
        <button class="next-btn" @click="nextCreateBtn">
          次へ 1/2
        </button>
      </router-link>
      <span class="job-create-btn-area" v-else>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
          <button class="next-btn-false" v-on="on" v-bind="attrs">
            次へ 1/2
          </button>
          </template>
        <span>必須項目が入力されていません</span>
        </v-tooltip>
      </span>
    </v-card>
    <Loading v-show="loading">
    </Loading>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
/* 文字制限 */
#rem {
  color: #7c7c7c;
  margin-top: 2px;
}

/* Wrapper */
.create-wrapper {
  width: 90%;
  height: 100vh;
  // height: 100%;
  margin: 0 auto;
  position: relative;

  .job-create-wrapper {
    @include card-border-color;
    border-radius: 20px;
    margin: 2rem 0rem;
    background-color: $basic-white;
    padding: 2.5rem;
    height: 85%;
  }
}

.label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.7rem;
  display: inline-block;
}

.label-required {
  color: $basic-white;
  background-color: $error-message-color;
  font-size: 12px;
  font-weight: bold;
  border-radius: 25px;
  padding: 0.25rem 0.9rem;
  text-align: center;
  margin-left: 10px;
}
.error-message {
  color: $error-message-color;
  list-style: none;
  font-weight: bold;
}

.error-label {
  display: inline-block;
  color: $error-message-color;
  list-style: none;
  font-weight: bold;
}

.error-message {
  margin: 0;
  padding-left: 10px;
}

/* 案件タイトル入力欄 start*/
.job-create-wrapper {
  .job-create-title-area {
    width: 100%;
    height: 18%;
    text-align: left;

    input[type='text'] {
      @include input-border-color;
      background-color: $sub-white;
      color: $text-main-color;
      font: 16px/24px sans-serif;
      box-sizing: border-box;
      width: 100%;
      padding: 0.3em;
      transition: 0.3s;
      letter-spacing: 1px;
      border-radius: 4px;
      padding: 0.5rem;

      &:focus {
        @include form-hover;
      }
    }
  }

  .job-create-time-area {
    width: 100%;
    height: 18%;
    text-align: left;

    input[type='date'] {
      @include input-border-color;
      background-color: $sub-white;
      color: $text-main-color;
      font: 16px/24px sans-serif;
      box-sizing: border-box;
      width: 40%;
      display: flex;
      padding: 0.3em;
      transition: 0.3s;
      letter-spacing: 1px;
      border-radius: 4px;
      padding: 0.5rem;

      &:focus {
        @include form-hover;
      }
    }
  }

  .job-create-detail-area {
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: column;
    text-align: left;

    textarea[type='text'] {
      @include input-border-color;
      background-color: $sub-white;
      color: $text-main-color;
      font: 16px/24px sans-serif;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 0.3em;
      transition: 0.3s;
      letter-spacing: 1px;
      border-radius: 4px;
      padding: 0.5rem;

      &:focus {
        @include form-hover;
      }
    }
  }

  .job-create-btn-area {
    width: 100px;
    height: 100px;
    text-align: left;
    margin-top: 1.5rem;

    .next-btn {
      @include box-shadow-btn;
      @include blue-btn;
      color: $basic-white;
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
        @include box-shadow-btn;
      }
    }

    .next-btn-false {
      @include box-shadow-btn;
      @include grey-btn;
      color: $basic-white;
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
    }
  }
}

@media (max-width: 768px) {
  .create-wrapper
  .job-create-wrapper {
    height: 100%;
    .job-create-time-area {
      input[type='date'] {
      width: 60%;
      }
    }
  }
}

/* スマホ */
@media (max-width: 500px){
  .create-wrapper .job-create-wrapper {
    width: 100%;
    padding: 2rem 1rem;
    margin: 2rem auto 2rem auto;
  }
  .job-create-wrapper .job-create-time-area{
    input[type='date'] {
      width: 100%;
    }
  }
  .job-create-wrapper .job-create-btn-area {
    .next-btn {
      padding: 1.1rem 3.4rem;
    }
  }
}

@media (max-width: 420px) {
  .create-wrapper {
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
  .create-wrapper 
  .job-create-wrapper {
    width: calc(97% - 0.5rem);
    margin: 2rem auto;
    position: relative;
    padding: 2rem 1rem 1rem 1rem;
  }
  .job-create-wrapper 
  .job-create-time-area{
    input[type='date'] {
      width: 100%;
    }
  }
  .job-create-wrapper 
    .job-create-btn-area {
      width: 100px;
      height: 100px;
      background-color: rebeccapurple;
    .next-btn {
      margin-bottom: 1rem;
    }
  }
}
</style>