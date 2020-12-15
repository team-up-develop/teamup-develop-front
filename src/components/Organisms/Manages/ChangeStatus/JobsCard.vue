<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

type DataType = {
  applyNum: number;
  rejectNum: number;
  assginNum: number;
}

export default Vue.extend({
  props: {
    jobTitle: { type: String, default: "" },
    jobId: { type: Number, default: 0 }
  },
  data(): DataType {
    return {
      applyNum: 0,
      rejectNum: 0,
      assginNum: 0
    }
  },
  filters: {
    //* 案件タイトル 詳細 文字制限
    truncateDetailTitle: function(value: string) {
      const length = 60;
      const ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  },
  created() {
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.jobId }&apply_status_id=1`)
    .then(response => {
      this.applyNum = response.data.length
    })
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.jobId }&apply_status_id=3`)
    .then(response => {
      this.rejectNum = response.data.length
    })
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.jobId }&apply_status_id=2`)
    .then(response => {
      this.assginNum = response.data.length
    })
  }
})
</script>
<template>
  <section>
    <v-sheet class="card">
      <v-col>
        <v-row class="card__top">
          {{ jobTitle | truncateDetailTitle }}
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
      @include purple-btn;
      color: $basic-white;
      padding: 0.5rem 4rem;
      position: absolute;
      left: 0;
      width: 100%;
      font-weight: bold;
      font-size: 0.8em;
      border-radius: 8px;
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