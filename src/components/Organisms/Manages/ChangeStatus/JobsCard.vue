<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
  onMounted
} from '@vue/composition-api';
import Vuex from '@/store/index'
import { truncate } from '@/master'

type State = {
  applyNum: number;
  rejectNum: number;
  participateNum: number;
}

const initialState = (): State => ({
  applyNum: Vuex.state.statusUser.userApplyNum,
  participateNum: Vuex.state.statusUser.userParticipateNum,
  rejectNum: Vuex.state.statusUser.userRejectNum,
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
      Vuex.dispatch('getUserNum', {
        jobId: props.jobId
      });
      setTimeout(() => {
        state.applyNum = Vuex.state.statusUser.userApplyNum;
        state.participateNum = Vuex.state.statusUser.userParticipateNum;
        state.rejectNum =  Vuex.state.statusUser.userRejectNum;
      }, 500);
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
              <div class="num">{{ participateNum }}</div>
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
      background-color: $primary-dark;
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