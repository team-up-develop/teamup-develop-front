<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  PropType,
} from "@vue/composition-api";
import Vuex from "@/store/index";
import { truncate } from "@/hooks/useUtils";

type Props = {
  jobId: number;
};

type State = {
  applyNum: number;
  rejectNum: number;
  participateNum: number;
  jobTitle: string;
};

const initialState = (): State => ({
  applyNum: Vuex.state.statusUser.userApplyNum,
  participateNum: Vuex.state.statusUser.userParticipateNum,
  rejectNum: Vuex.state.statusUser.userRejectNum,
  jobTitle: Vuex.state.statusUser.jobTitle,
});

export default defineComponent({
  props: {
    jobId: { type: Number as PropType<number>, default: 0, required: true },
  },
  setup: (props: Props) => {
    const state = reactive<State>(initialState());
    const limit = (value: string, num: number) => truncate(value, num);

    onMounted(() => {
      Vuex.dispatch("getUserNum", {
        jobId: props.jobId,
      });
      setTimeout(() => {
        state.applyNum = Vuex.state.statusUser.userApplyNum;
        state.participateNum = Vuex.state.statusUser.userParticipateNum;
        state.rejectNum = Vuex.state.statusUser.userRejectNum;
        state.jobTitle = Vuex.state.statusUser.jobTitle;
      }, 500);
    });

    return {
      ...toRefs(state),
      limit,
    };
  },
});
</script>
<template>
  <section>
    <v-card class="card">
      <v-col>
        <v-row class="card__top">
          {{ limit(jobTitle, 60) }}
        </v-row>
        <v-row class="card__center">
          <router-link :to="`/jobs/${jobId}/detail`">
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
    </v-card>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
section {
  width: 30%;

  @media screen and (max-width: $la) {
    width: 100%;
  }
}
.card {
  width: 360px;
  min-width: 300px;
  height: 248px;
  padding: 1rem 1.2rem;
  border-radius: 8px;

  @media screen and (max-width: $la) {
    margin: 0 auto;
    width: 85%;
    margin-bottom: 1.5rem;
  }

  @media screen and (max-width: $me) {
    width: 95%;
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
      @include neumorphism;
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
      transition: 0.3s;
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
