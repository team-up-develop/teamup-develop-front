<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  watch,
  computed,
} from "@vue/composition-api";
import Vuex from "@/store/index";
import { backGroundImage } from "@/modules/images";
import { User } from "@/types";
import { VButton } from "@/components/Atoms";

type State = {
  userId: number;
  manageNum: number;
  favoriteNum: number;
  applyNum: number;
  userName: string;
  userImage: User["user_image"];
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
  userName: ctx.root.$store.getters.userName,
  manageNum: ctx.root.$store.getters.getJobsManageNum,
  favoriteNum: ctx.root.$store.getters.getJobsFavoriteNum,
  applyNum: ctx.root.$store.getters.getJobsApplyNum,
  userImage: ctx.root.$store.getters.getUserImage,
});

export default defineComponent({
  components: {
    VButton,
  },
  setup: (_, ctx) => {
    const state = reactive<State>(initialState(ctx));
    Vuex.dispatch("getJobNum", {
      userId: state.userId,
    });

    watch(
      () => ctx.root.$store.getters.fetchStateJobs,
      (val) => {
        state.manageNum = val.jobsManageNum;
        state.favoriteNum = val.jobsFavoriteJobsNum;
        state.applyNum = val.jobsApplyNum;
        state.userImage = val.userImage;
      },
      { deep: true }
    );
    return {
      ...toRefs(state),
      backGroundImage: computed(() => backGroundImage(state.userImage)),
      link: computed(() => `/account/profile/${state.userId}/detail`),
    };
  },
});
</script>

<template>
  <section>
    <v-card class="card">
      <v-col>
        <v-row class="card__top">
          <div v-if="userImage" class="user-image" :style="backGroundImage" />
          <div v-else class="user-image">
            <v-icon class="icon">mdi-account</v-icon>
          </div>
          <div class="user-name">{{ userName }}</div>
        </v-row>
        <v-row class="card__center pt-6">
          <VButton class="btn" :to="link" bc="primary" size="md">
            詳細をみる
          </VButton>
          <v-row class="pt-8">
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

      .icon {
        font-size: 40px;
        margin-top: 0.3rem;
        color: $primary-color;
      }
    }
    .user-name {
      margin-left: 1rem;
      margin-top: 0.9rem;
      font-weight: bold;
    }
  }

  &__center {
    height: 120px;

    .btn {
      width: 100%;
    }

    .value {
      width: 33%;

      .num {
        font-size: 1.5em;
      }
    }
  }
}
</style>
