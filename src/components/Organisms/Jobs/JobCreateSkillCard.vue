<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
} from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import Vuex from "@/store/index";
import { $fetch, $post, API_URL, AUTH_URL, catchError, md } from "@/master";
import { SkillSelectArea, RadioArea } from "@/components/Molecules/Forms";
import Session from "@/components/Atoms/Commons/Session.vue";
import { JobCreateParamsSecond } from "@/types/params";
import { Language, Framework, Skill } from "@/types/index";
import { FetchLanguages, FetchFrameworks, FetchSkills } from "@/types/fetch";
import { useUtils } from "@/hooks";

type Select = { id: number };
type State = {
  selectedLang: number[];
  languages: Language[];
  selectedFramwork: number[];
  framworks: Framework[];
  selectedSkill: number[];
  skills: Skill[];
  recruitNumber: string | number; //? POSTする時にはnumberに変換
  jobStatusId: string | number;
};
const initialState = (): State => ({
  selectedLang: [],
  languages: [],
  selectedFramwork: [],
  framworks: [],
  selectedSkill: [],
  skills: [],
  recruitNumber: "",
  jobStatusId: "",
});

const propsOption = {
  jobTitle: { type: String as PropType<string>, required: true, default: "" },
  devStartDate: {
    type: String as PropType<string>,
    required: true,
    default: "",
  },
  devEndDate: {
    type: String as PropType<string>,
    required: true,
    default: "",
  },
  jobDescription: { type: String as PropType<string>, default: "" },
} as const;
type PropsOption = typeof propsOption;
export type JobCreateSkill = OutsidePropsType<PropsOption>;

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    Session,
    RadioArea,
    SkillSelectArea,
  },
  props: propsOption,
  setup: (props, ctx) => {
    const state = reactive<State>(initialState());
    const router = ctx.root.$router;
    const { auth } = useUtils();

    (async () => {
      try {
        const res = await $fetch<FetchLanguages>(
          `${API_URL}/programing_languages`
        );
        state.languages = res.data.response;
      } catch (error) {
        catchError(error);
      }
      try {
        const res = await $fetch<FetchFrameworks>(
          `${API_URL}/programing_frameworks`
        );
        state.framworks = res.data.response;
      } catch (error) {
        catchError(error);
      }
      try {
        const res = await $fetch<FetchSkills>(`${API_URL}/skills`);
        state.skills = res.data.response;
      } catch (error) {
        catchError(error);
      }
    })();

    const isForm = computed(() => {
      return state.selectedLang.length !== 0 &&
        state.selectedFramwork.length !== 0 &&
        state.selectedSkill.length !== 0 &&
        state.recruitNumber !== "" &&
        state.jobStatusId !== ""
        ? true
        : false;
    });

    const createJob = async () => {
      // * 言語を {id: Number}に変換
      const languageArray: Select[] = [];
      for (const selectedLang of state.selectedLang) {
        languageArray.push({ id: selectedLang });
      }
      // * フレームワークを{id: Number}に変換
      const framworksArray: Select[] = [];
      for (const selectedFramwork of state.selectedFramwork) {
        framworksArray.push({ id: selectedFramwork });
      }
      // * その他スキルを {id: Number}に変換
      const skillArray: Select[] = [];
      for (const selectedSkill of state.selectedSkill) {
        skillArray.push({ id: selectedSkill });
      }
      // FIXME:  宣言していない arameter 'str', 'delim' implicitly has an 'any' type.
      // * date型に変換のための data用意
      function toDate<T, U>(str: T | any, delim: U): Date {
        const arr = str.split(delim);
        return new Date(arr[0], arr[1] - 1, arr[2]);
      }
      //* 開始日
      const devStart = props.devStartDate;
      const devStartDate = toDate(devStart, "-");
      // *終了日
      const devEnd = props.devEndDate;
      const devEndDate = toDate(devEnd, "-");

      const params: JobCreateParamsSecond = {
        user_id: Vuex.state.auth.userId,
        job_title: props.jobTitle,
        job_description: props.jobDescription,
        dev_start_date: devStartDate,
        dev_end_date: devEndDate,
        programing_language_ids: languageArray,
        programing_framework_ids: framworksArray,
        skill_ids: skillArray,
        recruitment_numbers: Number(state.recruitNumber),
        job_status_id: Number(state.jobStatusId),
      };
      try {
        const res = await $post<JobCreateParamsSecond>(
          `${AUTH_URL}/job`,
          params,
          {
            headers: auth.value,
          }
        );
        console.log(res.data);
        await removeItem();
        router.push({ name: "JobCreateComplete" });
      } catch (error) {
        catchError(error);
      }
    };

    const removeItem = () => {
      sessionStorage.removeItem("jobTitle");
      sessionStorage.removeItem("jobDescription");
      sessionStorage.removeItem("devStartDate");
      sessionStorage.removeItem("devEndDate");
      state.selectedLang = [];
      state.selectedFramwork = [];
      state.selectedSkill = [];
      state.recruitNumber = "";
      state.jobStatusId = "";
    };

    return {
      ...toRefs(state),
      md: computed(() => md),
      isForm,
      createJob,
    };
  },
});
</script>

<template>
  <section>
    <v-sheet class="card">
      <Session :num="2.1" />
      <section>
        <div class="create-area">
          <SkillSelectArea
            v-model="selectedLang"
            :options="languages"
            name="languages"
            textLabel="開発言語"
            :mandatory="true"
            :max="5"
            mandatoryText="5つまで"
          />
        </div>
        <div class="create-area">
          <SkillSelectArea
            v-model="selectedFramwork"
            :options="framworks"
            name="framworks"
            textLabel="フレームワーク"
            :mandatory="true"
            :max="5"
            mandatoryText="5つまで"
          />
        </div>
        <div class="create-area">
          <SkillSelectArea
            v-model="selectedSkill"
            :options="skills"
            name="skills"
            textLabel="その他技術"
            :mandatory="true"
            :max="5"
            mandatoryText="5つまで"
          />
        </div>
        <div class="create-area">
          <RadioArea
            v-model="recruitNumber"
            :options="md.optionsRecruitNumber"
            name="recruitNumber"
            textLabel="募集人数"
            :mandatory="true"
          />
        </div>
        <div class="create-area">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <div class="question font-weight-bold" v-bind="attrs" v-on="on">
                開発フェーズとは？
              </div>
            </template>
            <span
              >開発フェーズとは、今回作成する案件が進行中のプロジェクトか<br />
              新規でのプロジェクトかを選択してください</span
            >
          </v-tooltip>
          <RadioArea
            v-model="jobStatusId"
            :options="md.optionsJobStatus"
            name="jobStatusId"
            textLabel="開発フェーズ"
            :mandatory="true"
          />
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

  .question {
    color: $primary-dark;
    text-decoration: underline;
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
@media (max-width: $sm) {
  .btn-area {
    display: flex;
    flex-direction: column;

    .post-job-back {
      margin-top: 1rem;
    }
  }
}
</style>
