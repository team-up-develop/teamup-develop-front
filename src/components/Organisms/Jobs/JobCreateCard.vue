<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
  computed
} from '@vue/composition-api';
import JobTitleInput from '@/components/Atoms/Forms/JobTitleInput.vue'
import DatePicker from '@/components/Atoms/Forms/DatePicker.vue'
import JobDescriptionInput from '@/components/Atoms/Forms/JobDescriptionInput.vue'
import Session from '@/components/Atoms/Commons/Session.vue'
import { JobCreateParamsFirst } from '@/types/job';

export type JobCreateSession1 = {
  jobTitle: string | null;
  jobDescription: string | null;
  devStartDate: string | null;
  devEndDate: string | null;
}

const initialState = (): JobCreateSession1 => ({
  jobTitle: "",
  devStartDate: "",
  devEndDate: "",
  jobDescription: "",
});

export default defineComponent({ 
  components: {
    JobTitleInput,
    DatePicker,
    JobDescriptionInput,
    Session
  },
  setup: () => {
    const state = reactive<JobCreateSession1>(initialState());

    // * セッションストレージの値をフォームに格納する
    const jobTitle = sessionStorage.getItem('jobTitle');
    const jobDescription = sessionStorage.getItem('jobDescription');
    const devStartDateString = sessionStorage.getItem('devStartDate');
    const devEndDateString = sessionStorage.getItem('devEndDate');
    state.jobTitle = jobTitle;
    state.devStartDate = devStartDateString;
    state.devEndDate = devEndDateString;
    state.jobDescription = jobDescription;

    const isForm = computed(() => {
      if (state.jobTitle && state.devStartDate && state.devEndDate) {
        return true
      } else {
        return false
      }
    });

    const minStartDate = computed(() => {
      if(state.devStartDate && state.devEndDate) {
        const a = new Date(state.devStartDate)
        const b = new Date(state.devEndDate)
        if (a > b) { return true }
        return false
      }
      return false
    });

    const nextCreateBtn = () => { 
      if(state.jobTitle && state.devStartDate && state.devEndDate) {
        const params: JobCreateParamsFirst = {
          jobTitle : state.jobTitle,
          jobDescription: state.jobDescription,
          devStartDate: state.devStartDate,
          devEndDate: state.devEndDate,
        };
        if(params.jobTitle) { sessionStorage.setItem('jobTitle', params.jobTitle); } 
        if(params.jobDescription) { sessionStorage.setItem('jobDescription', params.jobDescription); }
        if(params.devStartDate) { sessionStorage.setItem('devStartDate', params.devStartDate); }
        if(params.devEndDate) { sessionStorage.setItem('devEndDate', params.devEndDate); }
      }
    }

    return {
      ...toRefs(state),
      isForm,
      minStartDate,
      nextCreateBtn
    }
  }
});
</script>

<template>
  <section>
    <v-sheet class="card">
      <Session :num="1"/>
      <section>
        <div class="title">
          <label for="name" class="label">案件タイトル</label><label for="name" class="label-required">必須</label>
          <JobTitleInput 
            v-model="jobTitle" 
            type="text"
          />
        </div>
        <div class="time">
          <label for="name" class="label">開発開始時期</label><label for="name" class="label-required">必須</label>
          <DatePicker 
            v-model="devStartDate" 
            type="text" 
          />
        </div>
        <div class="time">
        <label for="name" class="label">開発終了時期</label><label for="name" class="label-required">必須</label><label v-if="minStartDate" class="error-message">{{ "開始日が終了日より前です。" }}</label>
          <DatePicker 
            v-model="devEndDate" 
            type="text" 
          />
        </div>
        <div class="detail">
          <label for="name" class="label">概要</label>
          <JobDescriptionInput 
            v-model="jobDescription" 
            type="text" 
          />
        </div>
      </section>
      <router-link to='/job_create/2' 
        class="btn-area" 
        v-if="isForm && !minStartDate"
      >
        <button class="next-btn" @click="nextCreateBtn">次へ 1/2</button>
      </router-link>
      <span class="btn-area" v-else>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <button class="next-btn-false" v-on="on" v-bind="attrs">次へ 1/2</button>
          </template>
        <span>必須項目が入力されていません</span>
        </v-tooltip>
      </span>
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

.btn-area {
  .next-btn {
    @include neumorphism;
    @include blue-btn;
    color: $white;
    text-align: left;
    display: block;
    padding: 1.1rem 4rem;
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
    outline: none;
  }

  .next-btn-false {
    @include box-shadow-btn;
    @include grey-btn;
    color: $white;
    text-align: left;
    display: block;
    padding: 1.1rem 4rem;
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
}

</style>