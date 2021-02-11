<script lang="ts">
import Vue from "vue";
import { API_URL, catchError } from "@/master";
import axios from "axios";
import Session from "@/components/Atoms/Commons/Session.vue";
import SkillSelectArea from "@/components/Molecules/Forms/SkillSelectArea.vue";
import InputArea from "@/components/Molecules/Forms/InputArea.vue";
// import 'vue-select/dist/vue-select.css';
import { Language, Framework, Skill } from "@/types/index";

type DataType = {
  selectedLang: [];
  languages: Language[];
  selectedFramwork: [];
  framworks: Framework[];
  selectedSkill: [];
  skills: Skill[];
  github: string | null;
  twitter: string | null;
};

export default Vue.extend({
  components: {
    Session,
    SkillSelectArea,
    InputArea,
  },
  data(): DataType {
    return {
      selectedLang: [], //? プログラミング言語
      languages: [],
      selectedFramwork: [], //? フレームワーク
      framworks: [],
      selectedSkill: [], //? その他開発スキル
      skills: [],
      github: "",
      twitter: "",
    };
  },
  created() {
    // const programingLanguage = sessionStorage.getItem("programingLanguage");
    // const programingFramework = sessionStorage.getItem("programingFramework");
    // const skill = sessionStorage.getItem("skill");
    const github = sessionStorage.getItem("github");
    const twitter = sessionStorage.getItem("twitter");
    // this.selectedLang = programingLanguage;
    // this.selectedFramwork = programingFramework;
    // this.selectedSkill = skill;
    this.github = github;
    this.twitter = twitter;
  },
  mounted() {
    // *開発言語
    axios
      .get(`${API_URL}/programing_languages`)
      .then((res) => {
        this.languages = res.data.response;
      })
      .catch((error) => {
        catchError(error);
      });
    // * フレームワーク
    axios
      .get(`${API_URL}/programing_frameworks`)
      .then((res) => {
        this.framworks = res.data.response;
      })
      .catch((error) => {
        catchError(error);
      });
    // * その他スキル
    axios
      .get(`${API_URL}/skills`)
      .then((res) => {
        this.skills = res.data.response;
      })
      .catch((error) => {
        catchError(error);
      });
  },
  methods: {
    nextStep() {
      // * 言語を {id: Number}に変換
      const languageArray: {}[] = [];
      for (let i = 0; i < this.selectedLang.length; i++) {
        languageArray.push({ id: this.selectedLang[i] });
      }
      // * フレームワークを{id: Number}に変換
      const framworksArray: {}[] = [];
      for (let c = 0; c < this.selectedFramwork.length; c++) {
        framworksArray.push({ id: this.selectedFramwork[c] });
      }
      // * その他スキルを {id: Number}に変換
      const skillArray: {}[] = [];
      for (let d = 0; d < this.selectedSkill.length; d++) {
        skillArray.push({ id: this.selectedSkill[d] });
      }

      const params = {
        programingLanguage: languageArray, //? プログラミング言語
        programingFramework: framworksArray, //? フレームワーク
        skill: skillArray, //? その他開発スキル,
        github: this.github,
        twitter: this.twitter,
      };
      sessionStorage.setItem(
        "programingLanguage",
        JSON.stringify(params.programingLanguage)
      );
      sessionStorage.setItem(
        "programingFramework",
        JSON.stringify(params.programingFramework)
      );
      sessionStorage.setItem("skill", JSON.stringify(params.skill));
      if (params.github) {
        sessionStorage.setItem("github", params.github);
      }
      if (params.twitter) {
        sessionStorage.setItem("twitter", params.twitter);
      }
      return this.$router.push("/register/step/confirm");
    },
  },
});
</script>

<template>
  <section>
    <div class="wrapper">
      <div class="title">スキル情報入力</div>
      <v-card class="pa-1 card">
        <div class="session">
          <Session :num="3" />
        </div>
        <v-col class="container text-left">
          <div class="input-area">
            <SkillSelectArea
              v-model="selectedLang"
              :options="languages"
              name="languages"
              textLabel="開発言語"
              :mandatory="true"
              mandatoryText=""
            />
            {{ selectedLang }}
          </div>
          <div class="input-area">
            <SkillSelectArea
              v-model="selectedFramwork"
              :options="framworks"
              name="framworks"
              textLabel="フレームワーク"
              :mandatory="true"
              mandatoryText=""
            />
          </div>
          <div class="input-area">
            <SkillSelectArea
              v-model="selectedSkill"
              :options="skills"
              name="framworks"
              textLabel="フレームワーク"
              :mandatory="true"
              mandatoryText=""
            />
          </div>
          <div class="input-area">
            <InputArea
              v-model="github"
              type="text"
              name="GitHub"
              textLabel="GitHub"
              :mandatory="false"
              mandatoryText=""
              placeholder="URLを入力してください"
              maxlength="100"
              :remaining="false"
            />
          </div>
          <div class="input-area">
            <InputArea
              v-model="twitter"
              type="text"
              name="Twitter"
              textLabel="Twitter"
              :mandatory="false"
              mandatoryText=""
              placeholder="URLを入力してください"
              maxlength="100"
              :remaining="false"
            />
          </div>
          <div class="box-bottom">
            <div class="next-btn" @click="nextStep">次へ2/3</div>
          </div>
        </v-col>
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
.input-area {
  height: 90px;
}
.box-bottom {
  width: 100%;
  height: 100px;

  .next-btn {
    @include box-shadow-btn;
    @include blue-btn;
    color: $white;
    text-align: left;
    display: block;
    padding: 1.1rem 4rem;
    border-radius: 25px;
    border: none;
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

    &:hover {
      @include box-shadow-btn;
    }
  }
}
</style>
