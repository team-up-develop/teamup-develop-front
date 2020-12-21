<script lang="ts">
import Vue from 'vue';
import { API_URL } from '@/master'
import axios, { AxiosResponse } from 'axios'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import { Language, Framework, Skill } from '@/types/index';

type DataType = {
  selectedLang: []; 
  languages: Language[];
  selectedFramwork: [];
  framworks: Framework[];
  selectedSkill: [];
  skills: Skill[];
}

export default Vue.extend({ 
  components: {
    vSelect
  },
  data(): DataType {
    return {
      selectedLang: [], //? プログラミング言語
      languages: [],
      selectedFramwork: [], //? フレームワーク
      framworks: [],
      selectedSkill: [], //? その他開発スキル
      skills: [],
    }
  },
  mounted() {
    // *開発言語
    axios.get<Language[]>(`${API_URL}/programing_language`)
    .then(response => {
      this.languages = response.data
    })
    .catch(error =>{
      console.log(error)
    })
    // * フレームワーク
    axios.get<Framework[]>(`${API_URL}/programing_framework`)
    .then(response => {
      this.framworks = response.data
    })
    .catch(error =>{
      console.log(error)
    })
    // * その他スキル
    axios.get<Skill[]>(`${API_URL}/skill`)
    .then(response => {
      this.skills = response.data
    })
    .catch(error =>{
      console.log(error)
    })
  },
  methods: {
    nextStep3() {
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

      const params = {
        programingLanguage: languageArray,  //? プログラミング言語
        programingFramework: framworksArray , //? フレームワーク
        skill: skillArray, //? その他開発スキル,
      };
      sessionStorage.setItem('programingLanguage', JSON.stringify(params.programingLanguage));
      sessionStorage.setItem('programingFramework', JSON.stringify(params.programingFramework));
      sessionStorage.setItem('skill', JSON.stringify(params.skill));
      return this.$router.push('/step/3');
    }
  }
});
</script>

<template>
  <section>
    <div class="wrapper">
      <div class="title">スキル情報</div>
      <div class="container">
        <div class="container__box">
          <div class="box-top">
            <span>STEP2/3</span>
            <!-- STEP グラフ -->
            <div class="step-graph">
              <div class="step-graph__line"></div>
            </div>
          </div>
          <!-- 中央 -->
          <div class="box-center">
            <div class="input-area">
              <label for="name" class="label">経験開発言語</label>
              <v-select
                class="skill"
                multiple
                :options="languages"
                label="programingLanguageName"
                v-model="selectedLang"
                :reduce="languages => languages.id"
                placeholder="開発言語を入力してください"
              />
              <!-- <h1>Selected 言語:{{ selectedLang }}</h1> -->
            </div>
            <div class="input-area">
              <label for="name" class="label">経験フレームワーク</label>
              <v-select
                class="skill"
                multiple
                :options="framworks"
                label="programingFrameworkName"
                v-model="selectedFramwork"
                :reduce="framworks => framworks.id"
                placeholder="フレームワークを入力してください"
                />
            </div>
            <div class="input-area">
              <label for="name" class="label">経験スキル</label>
              <v-select
                class="skill"
                multiple
                :options="skills"
                label="skillName"
                v-model="selectedSkill"
                :reduce="skills => skills.id"
                placeholder="その他スキルを入力してください"
              />
            </div>
          </div>
          <div class="box-bottom">
            <div class="next-btn" @click="nextStep3">次へ2/3</div>
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
            width: 67%;
            height: 100%;
            border-radius: 35px;
            background-color: $primary-color;
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
        color: $text-main-color;

        .input-area {
          // height: 16%;
          margin-bottom: 1.5rem;

          .label {
            font-weight: bold;
            // margin-bottom: 1rem;
          }

          .skill {
            margin: 0.7rem 0rem;
            font: 16px/24px sans-serif;
            box-sizing: border-box;
            width: 100%;
            transition: 0.3s;
            letter-spacing: 1px;
            border-radius: 4px;
            background-color: $white;
            background-color: $dark-white;
          }
        }
      }

      .box-bottom {
        width: 100%;
        height: 12%;
        position: absolute;
        bottom: 0;

        .next-btn {
          @include box-shadow-btn;
          @include blue-btn;
          color: $white;
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
      }
    }
  }

}
</style>