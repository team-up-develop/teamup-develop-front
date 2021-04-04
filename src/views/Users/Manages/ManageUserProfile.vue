<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  PropType,
} from "@vue/composition-api";
import axios from "axios";
import Vuex from "@/store/index";
// import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import PostUser from "@/components/Organisms/Users/PostUser.vue";
import SkillUser from "@/components/Organisms/Users/SkillUser.vue";
import IntroduceUser from "@/components/Organisms/Users/IntroduceUser.vue";
import StatusChangeBtnArea from "@/components/Organisms/Manages/StatusChangeBtnArea.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import CardJob from "@/components/Organisms/Jobs/CardJob.vue";
import { User } from "@/types/index";
import { API_URL, catchError, m } from "@/master";
import useJobs from "@/hooks/useJobs";

type Props = {
  id: number; //? 詳細を見るユーザーのID
  jobId: number;
  applyId: number;
};

type State = {
  myselfFlag: boolean;
  userInfo: User | {};
  userId: number;
  doneStatusFlag: boolean;
  statusId: number;
  currentTab: 0 | 1;
  tabs: any;
};

const initialState = (): State => ({
  myselfFlag: false,
  userInfo: {},
  userId: Vuex.state.auth.userId,
  doneStatusFlag: false,
  statusId: m.APPLY_STATUS_APPLY,
  currentTab: 0,
  tabs: [
    { id: 1, tabName: "プロフィール" },
    { id: 2, tabName: "投稿案件" },
  ],
});

export default defineComponent({
  components: {
    PostUser,
    SkillUser,
    IntroduceUser,
    StatusChangeBtnArea,
    Breadcrumbs,
    CardJob,
  },
  props: {
    id: { type: Number as PropType<number>, default: 0, require: true },
    jobId: { type: Number as PropType<number>, default: 0, require: true },
    applyId: { type: Number as PropType<number>, default: 0, require: true },
  },
  setup: (props: Props) => {
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
        disabled: false,
        href: `/manage/applicant/${props.jobId}`,
      },
      {
        text: "ユーザー詳細",
        disabled: true,
      },
    ]);

    const { manageJobs } = useJobs();

    // * ユーザー情報取得
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/${props.id}`);
        state.userInfo = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };

    onMounted(() => {
      if (!state.userId) {
        return;
      }
      fetchUser();
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      manageJobs,
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
            <div class="tabs">
              <div class="btn-container">
                <button
                  v-for="(tab, index) in tabs"
                  :key="tab.name"
                  :class="{ active: currentTab === index }"
                  @click="currentTab = index"
                >
                  {{ tab.tabName }}
                </button>
              </div>
            </div>
          </v-row>
        </div>
      </section>
      <div v-show="currentTab === 0">
        <v-col class="skill">
          <div class="skill__card">
            <div class="detail-tag">自己紹介</div>
            <SkillUser :user="userInfo" />
          </div>
        </v-col>
        <v-col class="pr">
          <div class="pr__card">
            <div class="detail-tag">自己紹介</div>
            <IntroduceUser :user="userInfo" />
          </div>
        </v-col>
      </div>
      <div v-show="currentTab === 1">
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
      </div>
      <div class="button-area">
        <section v-if="jobId">
          <StatusChangeBtnArea :id="id" :jobId="jobId" :applyId="applyId" />
        </section>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.detail-tag {
  color: $primary-color;
  text-align: left;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 0.7rem;
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

        .tabs {
          width: 100%;
          border-radius: 10px;
        }
        .btn-container {
          display: flex;
        }

        button {
          color: $text-main-color;
          text-decoration: none;
          width: 33.3%;
          padding: 0.7rem 0;
        }

        button.active {
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
}

// * 案件カード
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

//* スキル カード
.detail-wrapper .skill {
  width: 100%;

  &__card {
    width: 75%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 2rem auto 2rem auto;

    @media screen and (max-width: $la) {
      width: 95%;
    }

    @media screen and (max-width: $sm) {
      width: 100%;
    }
  }
}

//* 開発詳細 カード
.detail-wrapper .pr {
  width: 100%;

  &__card {
    width: 75%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0rem auto 2rem auto;

    @media screen and (max-width: $la) {
      width: 95%;
    }

    @media screen and (max-width: $sm) {
      width: 100%;
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
