<script lang="ts">
import Vue from 'vue';
import { API_URL } from '@/master'
import axios from 'axios'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import Session from '@/components/Atoms/Commons/Session.vue'
import { JobCreateDataComp } from '@/types/job';
import { Language } from '@/types/index';
import { Framework } from '@/types/index';
import { Skill } from '@/types/index';

type DataType = {
  selectedLang: number[];
  languages: Language[];
  selectedFramwork: number[];
  framworks: Framework[];
  selectedSkill: number[];
  skills: Skill[];
  selectedCommunication: number;
  recruitNumber: number;
  selectedLangErrors: string[];
  selectedFramworkErrors: string[];
  selectedSkillErrors: string[];
}

export default Vue.extend({
  components: {
    vSelect,
    Session
  },
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
    .catch(error =>{
      console.log(error)
    })
    // * フレームワーク
    axios.get<Framework[]>(`${API_URL}/programing_framework`)
    .then(response => {
      this.framworks = response.data;
    })
    .catch(error =>{
      console.log(error)
    })
    // * その他スキル
    axios.get<Skill[]>(`${API_URL}/skill`)
    .then(response => {
      this.skills = response.data;
    })
    .catch(error =>{
      console.log(error)
    })
  },
  methods: {
    // * 案件投稿
    createJob() {
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
      axios.post(`${API_URL}/job`, params)
      .then(response => {
        console.log(response);
        sessionStorage.removeItem('jobTitle');
        sessionStorage.removeItem('jobDescription');
        sessionStorage.removeItem('devStartDateString');
        sessionStorage.removeItem('devEndDateString');
        this.$router.push('/job_create/3');
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
  <section>
    <v-sheet class="card">
      <Session :num="2"/>
      <section>
        <div class="create-area">
          <label for="name" class="label">開発言語</label><label for="name" class="label-required">必須 5つまで</label>
          <v-select
            class="input-area"
            multiple
            :options="languages"
            label="programingLanguageName"
            v-model="selectedLang"
            :reduce="languages => languages.id"
            :selectable="() => selectedLang.length < 5"
          />
        </div>
        <div class="create-area">
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
        </div>
        <div class="create-area">
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
        </div>
        <div class="create-area">
          <label for="name" class="label">募集人数</label><label for="name" class="label-required">必須</label>
          <v-row class="radio">
            <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="1">1人</label>
            <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="2">2人</label>
            <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="3">3人</label>
            <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="4">4人</label>
            <label class="radio-btn"><input type="radio" v-model="recruitNumber" value="5">5人</label>
          </v-row>
        </div>
      </section>
      <div class="btn-are">
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
        <router-link to='/job_create/1' class="post-job-back">
          戻る 1/2
        </router-link>
      </div>
    </v-sheet>
  </section>
</template>



<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.card {
  position: relative;
  text-align: left;
  text-decoration: none;
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

.create-area {
  width: 100%;
  text-align: left;
  margin-bottom: 2.8rem;

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
}

.radio-btn {
  margin: 0.7rem 0rem;
  margin-left: 0.5rem;
}

.btn-are {
  .post-job-btn {
    @include box-shadow-btn;
    @include blue-btn;
    width: 191px;
    color: $white;
    text-align: left;
    display: block;
    padding: 1.1rem 1rem;
    border-radius: 8px;
    border: none;
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

    &:hover {
      @include btn-hover;
    }
  }

  .next-btn-false {
    @include box-shadow-btn;
    @include grey-btn;
    width: 191px;
    color: $white;
    text-align: left;
    display: block;
    padding: 1.1rem 1rem;
    border-radius: 8px;
    border: none;
    font-size: .875rem;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: right;
    transition: .3s;
    outline: none;
  }

  .post-job-back {
    @include blue-cancel-btn;
    width: 191px;
    text-align: left;
    display: block;
    padding: 1.1rem 2rem;
    border-radius: 8px;
    font-size: .875rem;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: left;
    transition: .3s;
    outline: none;
    text-decoration: none;
  }
}

/* スマホ */
@media (max-width: 500px){
  .btn-are {
    display: flex;
    flex-direction: column;

    .post-job-back {
      margin-top: 1rem;
    }
  }
}

</style>