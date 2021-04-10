<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from "@vue/composition-api";
import Vuex from "@/store/index";

type State = {
  userId: number;
  manageNum: number;
  favoriteNum: number;
  applyNum: number;
  userName: string;
};

const initialState = (): State => ({
  userId: Vuex.state.auth.userId,
  userName: Vuex.state.auth.userName,
  manageNum: Vuex.state.statusJobs.jobsManageNum,
  favoriteNum: Vuex.state.statusJobs.jobsFavoriteJobsNum,
  applyNum: Vuex.state.statusJobs.jobsApplyNum,
});

export default defineComponent({
  setup: () => {
    const state = reactive<State>(initialState());
    onMounted(() => {
      Vuex.dispatch("getJobNum", {
        userId: state.userId,
      });
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<template>
  <section>
    <v-card class="card">
      <v-col>
        <v-row class="card__top">
          <div class="user-image"></div>
          <div class="user-name">{{ userName }}</div>
        </v-row>
        <v-row class="card__center">
          <router-link :to="`/account/profile/${userId}`" class="">
            <button class="btn">詳細をみる</button>
          </router-link>
          <v-row class="data-area">
            <div class="value">
              <div class="num">{{ manageNum }}</div>
              <label for="name">投稿数</label>
            </div>
            <div class="value">
              <div class="num">{{ applyNum }}</div>
              <label for="name">応募数</label>
            </div>
            <div class="value">
              <div class="num">{{ favoriteNum }}</div>
              <label for="name">保存数</label>
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
  height: 235px;
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
    padding: 0.2rem 0 0 1.45rem;
    height: 70px;

    .user-image {
      width: 52px;
      height: 52px;
      @include user-image;
    }
    .user-name {
      margin-left: 1rem;
      margin-top: 0.9rem;
      font-weight: bold;
    }
  }

  &__center {
    padding: 24px 0 0 0;
    height: 120px;
    position: relative;

    .btn {
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
