<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from "@vue/composition-api";
import {
  InputArea,
  DescriptionArea,
  DatePickerArea,
} from "@/components/Molecules/Forms";
import { VButton } from "@/components/Atoms";
import Session from "@/components/Atoms/Commons/Session.vue";
import { JobCreateParamsFirst } from "@/types/params";
import {
  isFormFirst,
  afterDevEndDate,
  beforeToDate,
  minPeriod,
} from "@/modules/jobCreate";
type Maybe<T> = T | null;

export type JobCreateSession1 = {
  jobTitle: string;
  devStartDate: string;
  devEndDate: string;
  jobDescription: Maybe<string>;
};

const initialState = (): JobCreateSession1 => ({
  jobTitle: "",
  devStartDate: "",
  devEndDate: "",
  jobDescription: "",
});

export default defineComponent({
  components: {
    Session,
    InputArea,
    DescriptionArea,
    DatePickerArea,
    VButton,
  },
  setup: () => {
    const state = reactive<JobCreateSession1>(initialState());

    // * セッションストレージの値をフォームに格納する
    (() => {
      const jobTitle = sessionStorage.getItem("jobTitle")!;
      const jobDescription = sessionStorage.getItem("jobDescription");
      const devStartDateString = sessionStorage.getItem("devStartDate")!;
      const devEndDateString = sessionStorage.getItem("devEndDate")!;
      state.jobTitle = jobTitle;
      state.devStartDate = devStartDateString;
      state.devEndDate = devEndDateString;
      state.jobDescription = jobDescription;
    })();

    const nextCreateBtn = () => {
      if (state.jobTitle && state.devStartDate && state.devEndDate) {
        const params: JobCreateParamsFirst = {
          jobTitle: state.jobTitle,
          jobDescription: state.jobDescription,
          devStartDate: state.devStartDate,
          devEndDate: state.devEndDate,
        };
        sessionStorage.setItem("jobTitle", params.jobTitle);
        sessionStorage.setItem("devStartDate", params.devStartDate);
        sessionStorage.setItem("devEndDate", params.devEndDate);
        if (params.jobDescription) {
          sessionStorage.setItem("jobDescription", params.jobDescription);
        }
      }
      return;
    };

    return {
      ...toRefs(state),
      isForm: computed(() =>
        isFormFirst(state.jobTitle, state.devStartDate, state.devEndDate)
      ),
      afterDevEndDate: computed(() =>
        afterDevEndDate(state.devStartDate, state.devEndDate)
      ),
      beforeToDate: computed(() => beforeToDate(state.devStartDate)),
      minPeriod: computed(() =>
        minPeriod(state.devStartDate, state.devEndDate)
      ),
      link: computed(() => `/job_create/skills`),
      nextCreateBtn,
    };
  },
});
</script>

<template>
  <section>
    <v-sheet class="card">
      <Session :num="Number(1)" />
      <section>
        <div class="title">
          <InputArea
            v-model="jobTitle"
            type="text"
            name="jobTitle"
            text-label="案件タイトル"
            :mandatory="true"
            mandatory-text=""
            placeholder="Go と Vue.js で 未経験エンジニアのためのサービスを作りたい(60文字以内で入力してください)"
            maxlength="60"
            :remaining="true"
          />
        </div>
        <p v-if="afterDevEndDate" class="error-message mb-5">
          開発開始日を開発終了日より後に設定してください。
        </p>
        <p v-if="beforeToDate" class="error-message mb-5">
          開発開始日を現在の日付より後に設定してください。
        </p>
        <p v-if="minPeriod" class="error-message mb-5">
          開発期間を1ヶ月以上に設定してください。
        </p>
        <div class="time">
          <DatePickerArea
            v-model="devStartDate"
            placeholder="開発を開始した日"
            name="devStartDate"
            type="text"
            text-label="開発開始時期"
            :mandatory="true"
            mandatory-text=""
          />
        </div>
        <div class="time">
          <DatePickerArea
            v-model="devEndDate"
            placeholder="開発を終了する予定日"
            name="devEndDate"
            type="text"
            text-label="開発終了時期"
            :mandatory="true"
            mandatory-text=""
          />
        </div>
        <div class="detail">
          <DescriptionArea
            v-model="jobDescription"
            type="text"
            name="jobDescription"
            text-label="概要"
            :mandatory="false"
            mandatory-text=""
            placeholder="詳しい内容や現在の状況を記載してください(500文字以内)"
            maxlength="500"
            :remaining="true"
          />
        </div>
      </section>
      <div class="btn-area">
        <VButton
          v-if="isForm && !afterDevEndDate && !beforeToDate && !minPeriod"
          :to="link"
          class="float-right px-8"
          @click="nextCreateBtn"
          bc="primary"
          size="lg"
          >次へ 1/2</VButton
        >
        <v-tooltip bottom v-else>
          <template v-slot:activator="{ on, attrs }">
            <VButton
              class="float-right px-8"
              bc="grey"
              size="lg"
              v-on="on"
              v-bind="attrs"
              >次へ 1/2</VButton
            >
          </template>
          <span>必須項目が入力されていません</span>
        </v-tooltip>
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

#rem {
  color: #7c7c7c;
  margin-top: 2px;
  font-size: 12px;
}

.label {
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
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
.error-message {
  color: $error-message-color;
  font-weight: bold;
}

section {
  .title {
    width: 100%;
    text-align: left;
  }

  .time {
    width: 100%;
    text-align: left;
  }

  .detail {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
  }
}

/* スマホ */
@media (max-width: $sm) {
  .btn-area {
    display: flex;
    flex-direction: column;
    float: none;
  }
}
</style>
