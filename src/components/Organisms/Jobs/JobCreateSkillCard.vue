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
import { $fetch, $post } from "@/libs/axios";
import { API_URL, AUTH_URL, md } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { SkillSelectArea, RadioArea } from "@/components/Molecules/Forms";
import Session from "@/components/Atoms/Commons/Session.vue";
import { JobCreateParamsSecond } from "@/types/params";
import { Fetch, Language, Framework, Skill } from "@/types/index";
import { useUtils } from "@/hooks";
import { isFormSecond } from "@/modules/jobCreate";
import { VButton } from "@/components/Atoms";

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
    VButton,
  },
  props: propsOption,
  setup: (props, ctx) => {
    const state = reactive<State>(initialState());
    const router = ctx.root.$router;
    const { auth } = useUtils();

    const fetchLanguages = async () => {
      try {
        const res = await $fetch<Fetch<Language[]>>(
          `${API_URL}/programing_languages`
        );
        state.languages = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };
    const fetchFrameworks = async () => {
      try {
        const res = await $fetch<Fetch<Framework[]>>(
          `${API_URL}/programing_frameworks`
        );
        state.framworks = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };
    const fetchSkills = async () => {
      try {
        const res = await $fetch<Fetch<Skill[]>>(`${API_URL}/skills`);
        state.skills = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };
    (async () => {
      await Promise.all([fetchLanguages(), fetchFrameworks(), fetchSkills()]);
    })();

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
        user_id: ctx.root.$store.getters.userId,
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
        await $post<JobCreateParamsSecond>(`${AUTH_URL}/job`, params, {
          headers: auth.value,
        });
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
      isForm: computed(() =>
        isFormSecond(
          state.selectedLang,
          state.selectedFramwork,
          state.selectedSkill,
          state.recruitNumber,
          state.jobStatusId
        )
      ),
      link: computed(() => `/job_create`),
      createJob,
    };
  },
});
</script>

<template>
  <section>
    <v-sheet class="card">
      <Session :num="Number(2)" />
      <section>
        <div class="create-area">
          <SkillSelectArea
            v-model="selectedLang"
            :options="languages"
            name="languages"
            text-label="開発言語"
            :mandatory="true"
            :max="5"
            mandatory-text="5つまで"
          />
        </div>
        <div class="create-area">
          <SkillSelectArea
            v-model="selectedFramwork"
            :options="framworks"
            name="framworks"
            text-label="フレームワーク"
            :mandatory="true"
            :max="5"
            mandatory-text="5つまで"
          />
        </div>
        <div class="create-area">
          <SkillSelectArea
            v-model="selectedSkill"
            :options="skills"
            name="skills"
            text-label="その他技術"
            :mandatory="true"
            :max="5"
            mandatory-text="5つまで"
          />
        </div>
        <div class="create-area">
          <RadioArea
            v-model="recruitNumber"
            :options="md.optionsRecruitNumber"
            name="recruitNumber"
            text-label="募集人数"
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
            text-label="開発フェーズ"
            :mandatory="true"
          />
        </div>
      </section>
      <div class="btn-area">
        <VButton
          v-if="isForm"
          @click="createJob"
          class="float-right px-8"
          bc="primary"
          size="lg"
          >案件投稿する</VButton
        >
        <v-tooltip bottom v-else>
          <template v-slot:activator="{ on, attrs }">
            <VButton
              class="float-right px-8"
              bc="grey"
              size="lg"
              v-on="on"
              v-bind="attrs"
              >案件投稿する</VButton
            >
          </template>
          <span>必須項目が入力されていません</span>
        </v-tooltip>
        <VButton :to="link" class="px-10 back-btn" bc="primaryWhite" size="lg"
          >戻る 1/2</VButton
        >
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

/* スマホ */
@media (max-width: $sm) {
  .btn-area {
    display: flex;
    flex-direction: column;
    .back-btn {
      margin-top: 1rem;
    }
  }
}
</style>
