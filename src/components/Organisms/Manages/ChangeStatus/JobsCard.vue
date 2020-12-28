<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
  onMounted
} from '@vue/composition-api';
import axios from 'axios';
import { m, API_URL, truncate } from '@/master'
import { ManageJob } from '@/types/manage';

type State = {
  applyNum: number;
  rejectNum: number;
  assginNum: number;
}

const initialState = (): State => ({
  applyNum: 0,
  rejectNum: 0,
  assginNum: 0
});

export default defineComponent({ 
  props: {
    jobTitle: { type: String, default: "", require: true },
    jobId: { type: Number, default: 0 , require: true}
  },
  setup: (props) => {
    const state = reactive<State>(initialState());

    const limit = (value: string, num: number) => truncate(value, num);
    onMounted(() => {
      axios.get<ManageJob[]>(`${API_URL}/apply_job/?job_id=${ props.jobId }&apply_status_id=${ m.APPLY_STATUS_APPLY }`)
      .then(response => {
        state.applyNum = response.data.length
      })
      .catch(error =>{
        console.log(error)
      })
      axios.get<ManageJob[]>(`${API_URL}/apply_job/?job_id=${ props.jobId }&apply_status_id=${ m.APPLY_STATUS_REJECT }`)
      .then(response => {
        state.rejectNum = response.data.length
      })
      .catch(error =>{
        console.log(error)
      })
      axios.get<ManageJob[]>(`${API_URL}/apply_job/?job_id=${ props.jobId }&apply_status_id=${ m.APPLY_STATUS_PARTICIPATE }`)
      .then(response => {
        state.assginNum = response.data.length
      })
      .catch(error =>{
        console.log(error)
      })
    });

    return {
      ...toRefs(state),
      limit
    }
  }
})
</script>
<template>
  <section>
    <v-sheet class="card">
      <v-col>
        <v-row class="card__top">
          {{ limit(jobTitle, 60) }}
        </v-row>
        <v-row class="card__center">
          <router-link :to="`/jobs/${ jobId }`"> 
            <button class="detail-btn">詳細をみる</button>
          </router-link>
          <v-row class="data-area">
            <div class="value">
              <div class="num">{{ applyNum }}</div>
              <label for="name">応募数</label>
            </div>
            <div class="value">
              <div class="num">{{ assginNum }}</div>
              <label for="name">参加数</label>
            </div>
            <div class="value">
              <div class="num">{{ rejectNum }}</div>
              <label for="name">拒否数</label>
            </div>
          </v-row>
        </v-row>
      </v-col>
    </v-sheet>
  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
section {
  width: 30%;

  @media screen and (max-width: 900px) {
    width: 100%;
  }

}
.card {
  @include card-border-color;
  width: 360px;
  height: 248px;
  padding: 1rem 1.2rem ;
  border-radius: 8px;

  @media screen and (max-width: 900px) {
    margin: 0 auto;
    width: 85%;
    margin-bottom: 1.5rem;
  }

  @media screen and (max-width: 600px) {
    width: 95%;
  }

  @media screen and (max-width: 450px) {
    width: 98%;
  }

  &__top {
    padding: 0.2rem 0 0 0rem;
    height: 90px;
  }

  &__center {
    padding: 20px 0 0 0;
    height: 120px;
    position: relative;

    .detail-btn {
      @include box-shadow-btn;
      background-color: $secondary-color;
      color: $white;
      padding: 0.5rem 4rem;
      position: absolute;
      left: 0;
      width: 100%;
      font-weight: bold;
      font-size: 0.8em;
      border-radius: 8px;
      appearance: none;
      border: none;
      transition: .3s;
      outline: none;
    }

    .data-area {
      padding: 3.5rem 0 0 0;

      .value {
        width: 33%;

        .num {
          font-size: 1.5em;
        }
      }
    }
  }
}
</style>