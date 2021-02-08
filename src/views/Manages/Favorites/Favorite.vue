<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
import { API_URL, catchError } from "@/master";
import axios from "axios";
import UserCard from "@/components/Organisms/Manages/UserCard.vue";
import JobsCard from "@/components/Organisms/Manages/JobsCard.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import { Job } from "@/types/index";
import { FetchJobs } from "@/types/fetch";
import Vuex from "@/store/index";

type State = {
  favoriteJobs: Job[];
  userId: number;
};

const initialState = (): State => ({
  favoriteJobs: [],
  userId: Vuex.state.auth.userId,
});

export default defineComponent({
  components: {
    UserCard,
    JobsCard,
    Breadcrumbs,
  },
  setup: () => {
    const state = reactive<State>(initialState());

    const breadcrumbs = computed(() => [
      {
        text: "探す",
        disabled: false,
        href: "/jobs",
      },
      {
        text: "保存案件",
        disabled: true,
      },
    ]);

    const isLogin = computed(() => {
      if (state.userId) {
        return true;
      }
      return false;
    });

    const getFavoriteJobs = async () => {
      try {
        const res = await axios.get<FetchJobs>(
          `${API_URL}/favorite_jobs?user_id=${state.userId}`
        );
        state.favoriteJobs = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };

    onMounted(() => {
      getFavoriteJobs();
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      isLogin,
      getFavoriteJobs,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <v-container class="wrapper" v-if="isLogin">
      <v-row>
        <UserCard />
        <v-sheet class="manage">
          <v-row class="manage__header">
            <router-link to="/manage" class="router-link">
              <span>管理案件</span>
            </router-link>
            <router-link to="/manage/apply_job" class="router-link">
              <span>応募案件</span>
            </router-link>
            <router-link
              to="/manage/favorite_job"
              class="router-link-active-click"
            >
              <span>保存案件</span>
            </router-link>
          </v-row>
          <v-col>
            <router-link
              :to="`/manage/favorite_job/${jobs.job_id}`"
              v-for="jobs in favoriteJobs"
              :key="jobs.id"
              class="jobs"
            >
              <JobsCard :job="jobs.job" />
            </router-link>
          </v-col>
        </v-sheet>
      </v-row>
    </v-container>
    <template v-else>
      ログインが必要です！
    </template>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.wrapper {
  width: 90%;
  max-width: none;

  @media screen and (max-width: 1100px) {
    width: 97%;
  }
}

.manage {
  width: 60%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: $white;
  position: relative;
  font-size: 14px;
  padding: 2rem;
  color: $text-main-color;

  @media screen and (max-width: 1000px) {
    width: 50%;
  }

  @media screen and (max-width: 900px) {
    width: 85%;
  }

  @media screen and (max-width: 600px) {
    width: 95%;
  }

  @media screen and (max-width: 450px) {
    width: 98%;
    padding: 1rem;
  }

  &__header {
    .router-link {
      color: $text-main-color;
      text-decoration: none;
      width: 33.3%;
      padding: 0.7rem 0;
      border-bottom: $dark-grey 1px solid;
    }
    .router-link:hover {
      @include tab-hover;
    }

    .router-link-active-click {
      font-weight: bold;
      color: $text-main-color;
      text-decoration: none;
      width: 33.3%;
      padding: 0.7rem 0;
      border-bottom: $dark-grey 1px solid;
      background-color: $dark-grey;
    }
  }
}
.jobs {
  text-decoration: none;
}
</style>
