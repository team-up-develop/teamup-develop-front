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
import {
  PostUser,
  SkillUser,
  IntroduceUser,
  UserTabs,
} from "@/components/Organisms/Users";
import { StatusChangeBtnArea } from "@/components/Organisms/Manages";
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
};

const initialState = (): State => ({
  myselfFlag: false,
  userInfo: {},
  userId: Vuex.state.auth.userId,
  doneStatusFlag: false,
  statusId: m.APPLY_STATUS_APPLY,
  currentTab: 0,
});

export default defineComponent({
  components: {
    PostUser,
    SkillUser,
    IntroduceUser,
    StatusChangeBtnArea,
    Breadcrumbs,
    CardJob,
    UserTabs,
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

    const { fetchProfileJobs, profileJobs } = useJobs();
    fetchProfileJobs(props.id);

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/${props.id}`);
        state.userInfo = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };

    const clickTabs = (emitValue: 0 | 1) => {
      state.currentTab = emitValue;
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
      profileJobs,
      clickTabs,
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
            <UserTabs
              :myselfFlag="false"
              :currentTab="currentTab"
              @clickTab="clickTabs($event)"
            />
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
            v-for="jobs in profileJobs"
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
