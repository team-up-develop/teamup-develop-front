<script lang="ts">
import Vue, { PropType } from 'vue';
import axios from 'axios';
import { m, API_URL, truncate } from '@/master'
import { ManageJob } from '@/types/manage';

type DataType = {
  applyNum: number;
  rejectNum: number;
  assginNum: number;
}

export default Vue.extend({
  props: {
    jobTitle: { type: String as PropType<string>, default: "" },
    jobId: { type: Number as PropType<number>, default: 0 }
  },
  data(): DataType {
    return {
      applyNum: 0,
      rejectNum: 0,
      assginNum: 0
    }
  },
  created() {
    axios.get<ManageJob[]>(`${API_URL}/apply_job/?job_id=${ this.jobId }&apply_status_id=${ m.APPLY_STATUS_APPLY }`)
    .then(response => {
      this.applyNum = response.data.length
    })
    .catch(error =>{
      console.log(error)
    })
    axios.get<ManageJob[]>(`${API_URL}/apply_job/?job_id=${ this.jobId }&apply_status_id=${ m.APPLY_STATUS_REJECT }`)
    .then(response => {
      this.rejectNum = response.data.length
    })
    .catch(error =>{
      console.log(error)
    })
    axios.get<ManageJob[]>(`${API_URL}/apply_job/?job_id=${ this.jobId }&apply_status_id=${ m.APPLY_STATUS_PARTICIPATE }`)
    .then(response => {
      this.assginNum = response.data.length
    })
    .catch(error =>{
      console.log(error)
    })
  },
  methods: {
    limit(value: string, num: number) {
      return truncate(value, num)
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
    height: 120px;
    position: relative;

    .detail-btn {
      @include box-shadow-btn;
      // @include purple-btn;
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