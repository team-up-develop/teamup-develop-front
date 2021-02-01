<script lang="ts">
import Vue, { PropType } from "vue";
import { API_URL, catchError } from "@/master";
import axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Session from "@/components/Atoms/Commons/Session.vue";
import { JobCreateParamsSecond } from "@/types/params";
import { Language, Framework, Skill } from "@/types/index";
import { FetchLanguages, FetchFrameworks, FetchSkills } from "@/types/fetch";

type State = {
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
  jobStatusId: number;
};

export default Vue.extend({
  components: {
    vSelect,
    Session,
  },
  props: {
    jobTitle: { type: String as PropType<string>, default: "" },
    devStartDate: { type: String as PropType<string>, default: "" },
    devEndDate: { type: String as PropType<string>, default: "" },
    jobDescription: { type: String as PropType<string>, default: "" },
  },
  data(): State {
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
      jobStatusId: 0,
    };
  },
  computed: {
    // * 必須が入力されていない
    isForm() {
      if (
        this.selectedLang.length !== 0 &&
        this.selectedFramwork.length !== 0 &&
        this.selectedSkill.length !== 0 &&
        this.recruitNumber !== 0 &&
        this.jobStatusId !== 0
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  async mounted() {
    try {
      const res = await axios.get<FetchLanguages>(
        `${API_URL}/programing_languages`
      );
      this.languages = res.data.response;
    } catch (error) {
      catchError(error);
    }
    try {
      const res = await axios.get<FetchFrameworks>(
        `${API_URL}/programing_frameworks`
      );
      this.framworks = res.data.response;
    } catch (error) {
      catchError(error);
    }
    try {
      const res = await axios.get<FetchSkills>(`${API_URL}/skills`);
      this.skills = res.data.response;
    } catch (error) {
      catchError(error);
    }
  },
  methods: {
    // * 案件投稿
    async createJob() {
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

      // FIXME:  宣言していない arameter 'str', 'delim' implicitly has an 'any' type.
      // * date型に変換のための data用意
      function toDate(str: any, delim: any) {
        const arr = str.split(delim);
        return new Date(arr[0], arr[1] - 1, arr[2]);
      }

      //* 開始日
      const devStart = this.devStartDate;
      const devStartDate = toDate(devStart, "-");
      // *終了日
      const devEnd = this.devEndDate;
      const devEndDate = toDate(devEnd, "-");

      const params: JobCreateParamsSecond = {
        user_id: this.$store.state.auth.userId,
        job_title: this.jobTitle,
        job_description: this.jobDescription,
        dev_start_date: devStartDate,
        dev_end_date: devEndDate,
        programing_language_ids: languageArray,
        programing_framework_ids: framworksArray,
        skill_ids: skillArray,
        recruitment_numbers: Number(this.recruitNumber),
        job_status_id: Number(this.jobStatusId),
      };
      try {
        await axios.post<JobCreateParamsSecond>(`${API_URL}/job`, params);
        sessionStorage.removeItem("jobTitle");
        sessionStorage.removeItem("jobDescription");
        sessionStorage.removeItem("devStartDate");
        sessionStorage.removeItem("devEndDate");
        this.$router.push("/job_create/3");
        this.selectedLang = [];
        this.selectedFramwork = [];
        this.selectedSkill = [];
        this.recruitNumber = 0;
      } catch (error) {
        catchError(error);
      }
    },
  },
});
</script>

<template>
  <section>
    <v-sheet class="card">
      <Session :num="2.5" />
      <section>
        <div class="create-area">
          <label for="name" class="label">開発言語</label
          ><label for="name" class="label-required">必須 5つまで</label>
          <v-select
            class="input-area"
            multiple
            :options="languages"
            label="name"
            v-model="selectedLang"
            :reduce="(languages) => languages.id"
            :selectable="() => selectedLang.length < 5"
          />
        </div>
        <div class="create-area">
          <label for="name" class="label">フレームワーク</label
          ><label for="name" class="label-required">必須 5つまで</label>
          <label v-if="selectedFramworkErrors.length" class="error-label">
            <p
              v-for="selectedFramworkError in selectedFramworkErrors"
              :key="selectedFramworkError"
              class="error-message"
            >
              {{ selectedFramworkError }}
            </p>
          </label>
          <v-select
            class="input-area"
            multiple
            :options="framworks"
            label="name"
            v-model="selectedFramwork"
            :reduce="(framworks) => framworks.id"
            :selectable="() => selectedFramwork.length < 5"
          />
        </div>
        <div class="create-area">
          <label for="name" class="label">その他技術</label
          ><label for="name" class="label-required">必須 5つまで</label>
          <label v-if="selectedSkillErrors.length" class="error-label">
            <p
              v-for="selectedSkillError in selectedSkillErrors"
              :key="selectedSkillError"
              class="error-message"
            >
              {{ selectedSkillError }}
            </p>
          </label>
          <v-select
            class="input-area"
            multiple
            :options="skills"
            label="name"
            v-model="selectedSkill"
            :reduce="(skills) => skills.id"
            :selectable="() => selectedSkill.length < 5"
          />
        </div>
        <div class="create-area">
          <label for="name" class="label">募集人数</label
          ><label for="name" class="label-required">必須</label>
          <v-radio-group v-model="recruitNumber">
            <v-row>
              <v-radio
                label="1名"
                color="primary"
                value="1"
                class="ml-3 mb-0"
              ></v-radio>
              <v-radio
                label="2名"
                color="primary"
                value="2"
                class="ml-3 mb-0"
              ></v-radio>
              <v-radio
                label="3名"
                color="primary"
                value="3"
                class="ml-3 mb-0"
              ></v-radio>
              <v-radio
                label="4名"
                color="primary"
                value="4"
                class="ml-3 mb-0"
              ></v-radio>
              <v-radio
                label="5名"
                color="primary"
                value="5"
                class="ml-3"
              ></v-radio>
            </v-row>
          </v-radio-group>
        </div>
        <div class="create-area">
          <label for="name" class="label">開発フェーズ</label
          ><label for="name" class="label-required">必須</label>
          <v-radio-group v-model="jobStatusId">
            <v-row>
              <v-radio
                label="新規募集"
                color="primary"
                value="1"
                class="ml-3 mb-0"
              ></v-radio>
              <v-radio
                label="追加募集"
                color="primary"
                value="2"
                class="ml-3"
              ></v-radio>
            </v-row>
          </v-radio-group>
        </div>
      </section>
      <div class="btn-area">
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
        <router-link to="/job_create/1" class="post-job-back">
          戻る 1/2
        </router-link>
      </div>
    </v-sheet>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

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

.btn-area {
  .post-job-btn {
    @include neumorphism;
    @include blue-btn;
    width: 191px;
    color: $white;
    text-align: left;
    display: block;
    padding: 1.1rem 1rem;
    border-radius: 8px;
    border: none;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: right;
    cursor: pointer;
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
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: right;
    transition: 0.3s;
    outline: none;
  }

  .post-job-back {
    @include neumorphismGrey;
    color: $primary-color;
    font-weight: 600;
    width: 191px;
    text-align: left;
    display: block;
    padding: 1.1rem 2rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: left;
    transition: 0.3s;
    outline: none;
    text-decoration: none;
  }
}

/* スマホ */
@media (max-width: 500px) {
  .btn-area {
    display: flex;
    flex-direction: column;

    .post-job-back {
      margin-top: 1rem;
    }
  }
}
</style>
