<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onMounted,
  SetupContext,
} from "@vue/composition-api";
import { $fetch } from "@/libs/axios";
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import {
  BtnArea,
  PostUser,
  SkillJob,
  DetailJob,
} from "@/components/Organisms/Jobs/JobDetails";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import useJobs from "@/hooks/useJobs";
import { AUTH_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { FetchManageJobs } from "@/types/fetch";
import { useUtils } from "@/hooks";

type State = {
  userId: number;
  applyFlug: boolean;
  selfJobPost: boolean;
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
  applyFlug: false,
  selfJobPost: false,
});

export default defineComponent({
  components: {
    Loading,
    PostUser,
    SkillJob,
    DetailJob,
    BtnArea,
    Breadcrumbs,
  },
  props: {
    id: { type: Number, default: 0 },
  },
  setup: (props, ctx) => {
    const state = reactive<State>(initialState(ctx));
    const { auth } = useUtils();
    const {
      fetchJobDetail,
      job,
      loading,
      manageJobs,
      fetchManageJobs,
    } = useJobs();
    fetchJobDetail(props.id);

    const breadcrumbs = computed(() => [
      {
        text: "探す",
        disabled: false,
        href: "/jobs",
      },
      {
        text: "応募案件",
        href: "/manage/apply_job",
        disabled: false,
      },
      {
        text: "案件詳細",
        disabled: true,
      },
    ]);

    const isLogin = computed(() => {
      return state.userId ? true : false;
    });

    // * ログインユーザーが応募済みか応募済みではないかを判定する
    const getCheckStatus = async () => {
      try {
        const res = await $fetch<FetchManageJobs>(
          `${AUTH_URL}/apply_jobs?user_id=${state.userId}`,
          {
            headers: auth.value,
          }
        );
        const arrayApply: number[] = [];
        for (const applyData of res.data.response) {
          arrayApply.push(applyData.job.id);
        }
        if (arrayApply.includes(props.id)) {
          state.applyFlug = false;
        }
      } catch (error) {
        catchError(error);
      }
    };

    // * 自分の案件か否かを判定
    const getCheckSelfJob = () => {
      for (const selfJob of manageJobs.value) {
        if (selfJob.id === props.id) {
          state.selfJobPost = true;
        }
      }
    };

    const applied = () => (state.applyFlug = false);

    onMounted(async () => {
      if (state.userId) {
        await fetchManageJobs();
        await getCheckSelfJob();
        await getCheckStatus();
      }
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      job,
      loading,
      applied,
      isLogin,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <div class="detail-wrapper">
      <section v-if="!loading">
        <div class="detail-post-user-area">
          <div class="detail-tag">投稿者</div>
          <PostUser :job="job" />
        </div>
        <div class="detail-post-skill-area">
          <div class="detail-tag">使用技術</div>
          <SkillJob :job="job" />
        </div>
        <div class="detail-post-detail-area">
          <div class="detail-area">
            <div class="detail-tag">詳細内容</div>
            <DetailJob :job="job" />
          </div>
        </div>
        <BtnArea
          :id="id"
          :job="job"
          :isLogin="isLogin"
          :selfjob="selfJobPost"
          :applyFlug="applyFlug"
          @applied="applied"
        />
      </section>
      <Loading v-else />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.router {
  text-decoration: none;
  color: $white;
}

.detail-wrapper {
  width: 85%;
  padding: 0.5rem 0rem;
  margin: 0 auto;
  position: relative;

  @media screen and (max-width: $la) {
    width: 90%;
  }

  @media screen and (max-width: $sm) {
    width: 95%;
  }

  .detail-post-user-area {
    width: 80%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 auto;

    @media screen and (max-width: $la) {
      width: 85%;
    }

    @media screen and (max-width: $me) {
      width: 95%;
    }

    @media screen and (max-width: $me) {
      width: 100%;
    }
  }

  .detail-post-skill-area {
    width: 80%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 auto 2rem auto;

    @media screen and (max-width: $la) {
      width: 85%;
    }

    @media screen and (max-width: $me) {
      width: 95%;
    }

    @media screen and (max-width: $me) {
      width: 100%;
    }
  }

  .detail-post-detail-area {
    width: 80%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 auto;

    @media screen and (max-width: $la) {
      width: 85%;
    }

    @media screen and (max-width: $me) {
      width: 95%;
    }

    @media screen and (max-width: $me) {
      width: 100%;
    }
  }
}

.detail-tag {
  color: $primary-color;
  text-align: left;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 0.7rem;
}
</style>
