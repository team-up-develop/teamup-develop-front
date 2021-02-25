<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
import axios from "axios";
import Vuex from "@/store/index";
import PostUser from "@/components/Organisms/Users/PostUser.vue";
import CardJob from "@/components/Organisms/Jobs/CardJob.vue";
import StatusChangeBtnArea from "@/components/Organisms/Manages/StatusChangeBtnArea.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import { User } from "@/types/index";
import { API_URL, catchError, m } from "@/master";
import useJobs from "@/hooks/useJobs";
// import Logout from '@/components/button/Logout'

type State = {
  myselfFlag: boolean;
  userInfo: User;
  userId: number;
  loading: boolean;
  statusId: number;
};

const initialState = (): State => ({
  myselfFlag: false,
  userInfo: {},
  userId: Vuex.state.auth.userId,
  loading: true,
  statusId: m.APPLY_STATUS_APPLY,
});

export default defineComponent({
  components: {
    PostUser,
    CardJob,
    StatusChangeBtnArea,
    Breadcrumbs,
    Loading,
  },
  props: {
    id: { type: Number, default: 0, require: true }, //? 詳細を見るユーザーのID
    jobId: { type: Number, default: 0, require: true },
    applyId: { type: Number, default: 0, require: true },
  },
  setup: (props) => {
    const state = reactive<State>(initialState());
    const { manageJobs } = useJobs();

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
        disabled: false,
        href: `/manage/applicant/${props.jobId}`,
      },
      {
        text: "ユーザー詳細",
        disabled: true,
      },
    ]);

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/${props.id}`);
        state.userInfo = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };

    onMounted(async () => {
      setTimeout(() => {
        state.loading = false;
      }, 700);
      await fetchUser();
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      manageJobs,
      fetchUser,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <div class="detail-wrapper">
      <section class="user-area">
        <div class="user-area__post">
          <PostUser
            :user="userInfo"
            @editEmit="editEmit()"
            :myselfFlag="myselfFlag"
          />
          <v-row class="header">
            <router-link
              :to="`/manage/profile/${jobId}/${id}/${applyId}`"
              class="router-link"
            >
              <span>プロフィール</span>
            </router-link>
            <router-link
              :to="`/account/profile/${jobId}/${id}/${applyId}/jobs`"
              class="router-link-active-click"
            >
              <span>投稿案件</span>
            </router-link>
          </v-row>
        </div>
      </section>
      <template v-if="!loading">
        <v-row class="jobs">
          <router-link
            :to="`/jobs/${jobs.id}`"
            v-for="jobs in manageJobs"
            :key="jobs.id"
            class="jobs__card"
          >
            <CardJob :job="jobs" />
          </router-link>
        </v-row>
        <div class="button-area">
          <!-- 案件管理からきたら -->
          <section v-if="jobId">
            <StatusChangeBtnArea :id="id" :jobId="jobId" />
          </section>
        </div>
      </template>
      <Loading v-else />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.detail-tag {
  text-align: left;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 0.7rem;
}

.router {
  text-decoration: none;
  color: $white;
}

.detail-wrapper {
  width: 100%;
  padding: 3.5rem 0rem 0 0;
  position: relative;

  .user-area {
    width: 88%;
    margin: 0 auto;

    @media screen and (max-width: $la) {
      width: 100%;
    }

    &__post {
      width: 85%;
      display: flex;
      flex-direction: column;
      margin: 0 auto;

      @media screen and (max-width: $la) {
        width: 95%;
      }

      .header {
        border-bottom: $dark-grey 2px solid;

        .router-link {
          color: $text-main-color;
          text-decoration: none;
          width: 33.3%;
          padding: 0.7rem 0;
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
  }

  .jobs {
    min-height: 500px;
    width: 80%;
    margin: 2rem auto;

    @media screen and (max-width: $sm) {
      width: 95%;
    }

    &__card {
      margin-left: 1rem;
      width: 500px;
      margin: 0 auto;
    }
  }
}

//* ボタン エリア
.button-area {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  bottom: 0;
}
</style>
