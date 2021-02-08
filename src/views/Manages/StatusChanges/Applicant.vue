<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
import axios from "axios";
import { ManageJob } from "@/types/index";
import { FetchManageJobs } from "@/types/fetch";
import JobsCard from "@/components/Organisms/Manages/ChangeStatus/JobsCard.vue";
import UserCard from "@/components/Organisms/Manages/ChangeStatus/UserCard.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import { m, API_URL, catchError } from "@/master";
import Vuex from "@/store/index";

type State = {
  applyUsers: ManageJob[];
  userId: number;
};

const initialState = (): State => ({
  applyUsers: [],
  userId: Vuex.state.auth.userId,
});

export default defineComponent({
  components: {
    JobsCard,
    UserCard,
    Breadcrumbs,
  },
  props: {
    // * job.id
    id: { type: Number, default: null },
  },
  setup: (props) => {
    const state = reactive<State>(initialState());

    const breadcrumbs = computed(() => [
      {
        text: "探す",
        disabled: false,
        href: "/jobs",
      },
      {
        text: "管理案件",
        href: "/manage",
        disabled: false,
      },
      {
        text: "応募者一覧",
        disabled: true,
        href: `/manage/applicant/${props.id}`,
      },
    ]);

    const isLogin = computed(() => {
      if (state.userId) {
        return true;
      }
      return false;
    });

    const getApplyUser = async () => {
      try {
        const res = await axios.get<FetchManageJobs>(`
            ${API_URL}/apply_jobs?job_id=${props.id}&apply_status_id=${m.APPLY_STATUS_APPLY}`);
        state.applyUsers = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };

    onMounted(() => {
      getApplyUser();
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      isLogin,
      getApplyUser,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <v-container class="wrapper" v-if="isLogin">
      <v-row>
        <JobsCard :jobId="id" />
        <v-sheet class="manage">
          <v-row class="manage__header">
            <router-link
              :to="`/manage/applicant/${id}`"
              class="router-link-active-click"
            >
              <span>応募者</span>
            </router-link>
            <router-link :to="`/manage/participate/${id}`" class="router-link">
              <span>参加者</span>
            </router-link>
            <router-link :to="`/manage/reject/${id}`" class="router-link">
              <span>拒否者</span>
            </router-link>
          </v-row>
          <v-col>
            <router-link
              :to="`/manage/profile/${id}/${user.user_id}/${user.id}`"
              v-for="user in applyUsers"
              :key="user.id"
              class="users"
            >
              <UserCard :user="user" />
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

.users {
  text-decoration: none;
}
</style>
