<script lang="ts">
import Vue from 'vue';
import { API_URL } from '@/master'
import axios from 'axios'
import 'vue-select/dist/vue-select.css';
import { JobCreateDataComp } from '@/types/job';
import { Language } from '@/types/index';
import { Framework } from '@/types/index';
import { Skill } from '@/types/index';

export type DataType = {
  selectedLang: [];
  languages: {}[];
  selectedFramwork: [];
  framworks: {}[];
  selectedSkill: [];
  skills: {}[];
  selectedCommunication: number;
  recruitNumber: number;
  selectedLangErrors: string[];
  selectedFramworkErrors: string[];
  selectedSkillErrors: string[];
}

export default Vue.extend({
  data(): DataType {
    return {
      selectedLang: [], //? プログラミング言語
      languages: [],
      selectedFramwork: [], //? フレームワーク
      framworks: [],
      selectedSkill: [], //? その他開発スキル
      skills: [],
      selectedCommunication: 0, //? コミュニケーションツール
      recruitNumber: 0, //? メンバー人数
      selectedLangErrors: [], //?言語入力エラー
      selectedFramworkErrors: [], //?フレームワーク入力エラー
      selectedSkillErrors: [], //?その他スキル入力エラー
    }
  },
  computed: {
    // * 必須が入力されていない
    isForm() {
      if(this.selectedLang.length !== 0 
        && this.selectedFramwork.length !== 0 
        && this.selectedSkill.length !== 0 
        && this.recruitNumber
        ) {
        return true
      } else {
        return false
      }
    },
  },
  mounted() {
    // *開発言語
    axios.get<Language[]>(`${API_URL}/programing_language`)
      .then(response => {
        this.languages = response.data;
      })
    // * フレームワーク
    axios.get<Framework[]>(`${API_URL}/programing_framework`)
      .then(response => {
          this.framworks = response.data;
      })
    // * その他スキル
    axios.get<Skill[]>(`${API_URL}/skill`)
      .then(response => {
          this.skills = response.data;
      })
  },
  methods: {
    // * 案件投稿
    createJob(error: any) {
      //* エラーメッセージ
      if(this.selectedLang.length == 0 || 
        this.selectedFramwork.length == 0 || 
        this.selectedSkill.length == 0
      ) {
        console.log('入力必須項目を入力してください')
        this.selectedLangErrors = [];
        this.selectedFramworkErrors = [];
        this.selectedSkillErrors = [];

        if(this.selectedLang.length == 0){
          this.selectedLangErrors.push("開発言語を選択してください");
          this.selectedLang = [];
        } 
        if(this.selectedFramwork.length == 0){
          this.selectedFramworkErrors.push("開発フレームワークを選択してください");
          this.selectedFramwork = [];
        } 
        if(this.selectedSkill.length == 0){
          this.selectedSkillErrors.push("開発その他スキルを選択してください");
          this.selectedSkill = [];
        } 

        return error;
      }

      // * 応募者人数を文字列から数値に変換
      const recruitNum = Number(this.recruitNumber);
      // * 言語を {id: Number}に変換
      const languageArray: {}[] = [];
      for(let i = 0; i < this.selectedLang.length; i++) {
        languageArray.push({id: this.selectedLang[i]})
      }
      // * フレームワークを{id: Number}に変換
      const framworksArray: {}[] = [];
      for(let c = 0; c < this.selectedFramwork.length; c++) {
        framworksArray.push({id: this.selectedFramwork[c]})
      }
      // * その他スキルを {id: Number}に変換
      const skillArray: {}[] = [];
      for(let d = 0; d < this.selectedSkill.length; d++) {
        skillArray.push({id: this.selectedSkill[d]})
      }
      // * settion 1のデータを変数に格納する
      const jobTitle = sessionStorage.getItem('jobTitle');
      const jobDescription = sessionStorage.getItem('jobDescription');
      const devStartDateString = sessionStorage.getItem('devStartDateString');
      const devEndDateString = sessionStorage.getItem('devEndDateString');

      // ! 宣言していない arameter 'str', 'delim' implicitly has an 'any' type.
      // * date型に変換のための data用意
      function toDate (str: any, delim: any) {
        const arr = str.split(delim)
        return new Date(arr[0], arr[1] - 1, arr[2]);
      }

      // //* 開始日
      const devStart = devStartDateString
      const devStartDate = toDate(devStart, '-');
      // *終了日
      const devEnd = devEndDateString
      const devEndDate = toDate(devEnd, '-');

      const params: JobCreateDataComp = {
        userId: this.$store.state.auth.userId, //? ログインUserId
        jobTitle : jobTitle,  //? タイトル
        jobDescription: jobDescription, //? 詳細
        devStartDate: devStartDate,  //? 開始日
        devEndDate: devEndDate, //? 終了日
        programingLanguage: languageArray,  //? プログラミング言語
        programingFramework: framworksArray , //? フレームワーク
        skill: skillArray, //? その他開発スキル,
        recruitmentNumbers: recruitNum //?募集人数
      };
      console.log(params)
      axios.post(`${API_URL}/job`, params)
      .then(response => {
        console.log(response);
        sessionStorage.removeItem('jobTitle');
        sessionStorage.removeItem('jobDescription');
        sessionStorage.removeItem('devStartDateString');
        sessionStorage.removeItem('devEndDateString');
        alert('案件を投稿しました')
        this.$router.push('/manage');
      })
      .catch(error => {
        console.log(error);
      });
      this.selectedLang = [];
      this.selectedFramwork = [];
      this.selectedSkill = [];
      this.recruitNumber = 0;
    },
  }
});
</script>

<template>
  <div class="create-wrapper">
    <div class="job-create-wrapper">
      <div class="job-create-area">
        <label for="name" class="label">開発言語</label><label for="name" class="label-required">必須 5つまで</label>
        <!-- <label v-if="selectedLangErrors.length" class="error-label">
          <p v-for="selectedLangError in selectedLangErrors" :key="selectedLangError" class="error-message">
            {{ selectedLangError }}</p>
        </label> -->
        <v-select
          class="input-area"
          multiple
          :options="languages"
          label="programingLanguageName"
          v-model="selectedLang"
          :reduce="languages => languages.id"
          :selectable="() => selectedLang.length < 5"
        />
        <!-- <h1>Selected 言語:{{ selectedLang }}</h1> -->
      </div>
      <div class="job-create-area">
        <label for="name" class="label">フレームワーク</label><label for="name" class="label-required">必須 5つまで</label>
        <label v-if="selectedFramworkErrors.length" class="error-label">
          <p v-for="selectedFramworkError in selectedFramworkErrors" :key="selectedFramworkError" class="error-message">
            {{ selectedFramworkError }}</p>
        </label>
        <v-select
            class="input-area"
            multiple
            :options="framworks"
            label="programingFrameworkName"
            v-model="selectedFramwork"
            :reduce="framworks => framworks.id"
            :selectable="() => selectedFramwork.length < 5"
        />
        <!-- <h1>Selected フレームワーク: {{ selectedFramwork }}</h1> -->
      </div>
      <div class="job-create-area">
        <label for="name" class="label">その他技術</label><label for="name" class="label-required">必須 5つまで</label>
        <label v-if="selectedSkillErrors.length" class="error-label">
          <p v-for="selectedSkillError in selectedSkillErrors" :key="selectedSkillError" class="error-message">
            {{ selectedSkillError }}</p>
        </label>
        <v-select
            class="input-area"
            multiple
            :options="skills"
            label="skillName"
            v-model="selectedSkill"
            :reduce="skills => skills.id"
            :selectable="() => selectedSkill.length < 5"
        />
        <!-- <h1>Selected フレームワーク: {{ selectedFramwork }}</h1> -->
      </div>
      <div class="job-create-area">
        <label for="name" class="label">募集人数</label><label for="name" class="label-required">必須</label>
        <div class="job-create-radio">
        <!-- <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="0">未定</label> -->
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="1">1人</label>
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="2">2人</label>
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="3">3人</label>
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="4">4人</label>
        <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="5">5人</label>
        <!-- <p>Selected 開発メンバー {{ recruitNumber }} 人</p> -->
      </div>
      </div>
      <div class="button-are">
        <section>
          <button @click="createJob" class="post-job-btn" v-if="isForm">
            案件投稿する
          </button>
          <v-tooltip bottom v-else>
          <template v-slot:activator="{ on, attrs }">
            <button class="next-btn-false" v-on="on" v-bind="attrs">
              案件投稿する
            </button>
          </template>
          <span>必須項目が入力されていません</span>
          </v-tooltip>
        </section>
        <router-link to='/job_create/1' class="post-job-back">
          戻る 1/2
        </router-link>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.create-wrapper {
  width: 90%;
  height: 100vh;
  margin: 0 auto;
  position: relative;

  .job-create-wrapper {
    @include card-border-color;
    background-color: $white;
    border-radius: 20px;
    margin: 2rem 0rem;
    padding: 2.5rem;
    // position: absolute;
    // right: 0;
    height: 82%;
  }

  .job-create-radio {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    text-align: left;
  }
}

.label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.7rem;
}

.label-required {
  color: $white;
  background-color: $error-message-color;
  font-size: 12px;
  font-weight: bold;
  border-radius: 25px;
  padding: 0.25rem 0.9rem;
  text-align: center;
  margin-left: 10px;
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

.job-create-area {
  width: 100%;
  height: 23%;
  text-align: left;
}

.input-area {
  margin: 0.7rem 0rem;
  font: 16px/24px sans-serif;
  box-sizing: border-box;
  width: 100%;
  transition: 0.3s;
  letter-spacing: 1px;
  color: $text-main-color;
  border-radius: 4px;
  background-color: $white;
  background-color: $dark-white;
}

.radio-btn {
  margin: 0.7rem 0rem;
  margin-left: 0.5rem;
}

.button-are {
  width: 100%;
  height: 10%;
  position: relative;
  margin: 0 auto;
}

.post-job-btn {
  @include box-shadow-btn;
  @include blue-btn;
  position: absolute;
  right: 0;
  top: 0;
  text-align: left;
  display: block;
  padding: 1.1rem 3rem;
  border-radius: 25px;
  border: none;
  font-size: .875rem;
  font-weight: 600;
  color: $white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1rem;
  float: right;
  cursor: pointer;
  transition: .3s;
  outline: none;

  &:hover {
    @include btn-hover;
  }
}

.next-btn-false {
  @include box-shadow-btn;
  @include grey-btn;
  position: absolute;
  right: 0;
  top: 0;
  text-align: left;
  display: block;
  padding: 1.1rem 3rem;
  border-radius: 25px;
  border: none;
  font-size: .875rem;
  font-weight: 600;
  color: $white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1rem;
  float: right;
  cursor: pointer;
  transition: .3s;
  outline: none;
}

.post-job-back {
  @include blue-cancel-btn;
  @include box-shadow-btn;
  position: absolute;
  left: 0;
  top: 0;
  text-align: left;
  display: block;
  padding: 1.1rem 4rem;
  border-radius: 25px;
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
  text-decoration: none;
  outline: none;
}

@media screen and (max-width: 1200px) {
  .create-wrapper .job-create-wrapper {
    margin: 2rem 0rem;
    padding: 2rem;
    position: absolute;
    right: 0rem;
    width: 100%;
  }
}
/* タブレット */
@media screen and (max-width: 900px) {
  .create-wrapper .job-create-wrapper {
    width: 100%;
    border-radius: 20px;
    background-color: $white;
    padding: 1.5rem;
    position: absolute;
    right: 0;
  }
}
@media (max-width: 768px) {
  .create-wrapper
  .job-create-wrapper {
    height: 100%;

    .button-are  { 
      .post-job-btn {
        padding: 1.1rem 3rem;
      }
    }
  }
}
/* スマホ */
@media (max-width: 500px){
  .create-wrapper .job-create-wrapper {
    width: 100%;
    padding: 2rem 1rem;
    margin: 2rem auto;
  }
  .job-create-wrapper .button-are  { 
    .post-job-btn {
      padding: 1.1rem 2rem;
    }
    .post-job-back {
      padding: 1.1rem 3rem;
    }
    .next-btn-false {
      padding: 1.1rem 2.5rem;
    }
  }
}

@media (max-width: 420px) {
  .create-wrapper {
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
  .create-wrapper .job-create-wrapper {
    width: calc(97% - 0.5rem);
    margin: 2rem auto;
    position: relative;
    padding: 2rem 1rem 1rem 1rem;
  }
  .job-create-wrapper .button-are  { 
    .post-job-btn {
      padding: 1.1rem 0.2rem;
      width: 49%;
    }
      .post-job-back {
        padding: 1.1rem 0.2rem;
        width: 49%;
      }
      .next-btn-false {
        padding: 1.1rem 0.2rem;
        width: 49%;
      }
  }
}
</style>