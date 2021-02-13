<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
import { API_URL, m, catchError } from "@/master";
import axios from "axios";
import { ManageJob } from "@/types/index";
import { FetchManageJobs } from "@/types/fetch";
import UserCard from "@/components/Organisms/Manages/UserCard.vue";
import JobsCard from "@/components/Organisms/Manages/JobsCard.vue";
import Vuex from "@/store/index";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";

type State = {
  applyJob: ManageJob[];
  userId: number;
};

const initialState = (): State => ({
  applyJob: [],
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
        text: "応募案件",
        disabled: true,
      },
    ]);

    const isLogin = computed(() => {
      if (state.userId) {
        return true;
      }
      return false;
    });

    // * 応募案件 / 参加案件 を取得
    const getApplyJobs = async () => {
      if (!state.userId) {
        return;
      }
      try {
        const res = await axios.get<FetchManageJobs>(
          `${API_URL}/apply_jobs?user_id=${state.userId}`
        );
        for (let i = 0; i < res.data.response.length; i++) {
          const applyJobCorrect: ManageJob = res.data.response[i];
          if (
            applyJobCorrect.apply_status_id === m.APPLY_STATUS_APPLY ||
            applyJobCorrect.apply_status_id === m.APPLY_STATUS_PARTICIPATE ||
            applyJobCorrect.apply_status_id === m.APPLY_STATUS_REJECT
          ) {
            state.applyJob.push(applyJobCorrect);
          }
        }
      } catch (error) {
        catchError(error);
      }
    };

    onMounted(() => {
      getApplyJobs();
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      isLogin,
      getApplyJobs,
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
            <router-link
              to="/manage/apply_job"
              class="router-link-active-click"
            >
              <span>応募案件</span>
            </router-link>
            <router-link to="/manage/favorite_job" class="router-link">
              <span>保存案件</span>
            </router-link>
          </v-row>
          <v-col>
            <router-link
              :to="`/manage/apply_job/${jobs.job_id}`"
              v-for="jobs in applyJob"
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

  @media screen and (max-width: $la) {
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

  @media screen and (max-width: $la) {
    width: 85%;
  }

  @media screen and (max-width: $me) {
    width: 95%;
  }

  @media screen and (max-width: $sm) {
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
