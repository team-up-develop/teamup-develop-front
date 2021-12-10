<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  onBeforeMount,
  SetupContext,
} from "@vue/composition-api";
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import {
  BtnArea,
  PostUser,
  SkillJob,
  DetailJob,
} from "@/components/Organisms/Jobs/JobDetails";
import { useJobs, useUtils } from "@/hooks";
import { checkSelfJob } from "@/modules/jobs";
import { ApplyParams } from "@/types/params";
import { $post } from "@/libs/axios";
import { m, AUTH_URL } from "@/master";

type State = {
  userId: number;
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
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
    id: { type: Number, default: 0, required: true },
  },
  setup: (props, ctx) => {
    const state = reactive<State>(initialState(ctx));
    const {
      fetchJobDetail,
      job,
      fetchManageJobs,
      manageJobs,
      checkApplyStatus,
      isApply,
      loading,
    } = useJobs();
    fetchJobDetail(props.id);

    const { isLogin, headerAuth } = useUtils();

    const breadcrumbs = computed(() => [
      {
        text: "探す",
        href: "/jobs",
        disabled: false,
      },
      {
        text: "案件詳細",
        disabled: true,
      },
    ]);

    onBeforeMount(() => {
      if (!state.userId) {
        return;
      }
    });

    onMounted(async () => {
      if (state.userId) {
        await checkApplyStatus(props.id);
        await fetchManageJobs();
      } else {
        setTimeout(() => {
          loading.value = false;
        }, 500);
      }
    });

    const onApply = async () => {
      const params: ApplyParams = {
        job_id: props.id,
        user_id: state.userId,
        apply_status_id: m.APPLY_STATUS_APPLY,
      };

      await $post<ApplyParams>(
        `${AUTH_URL}/apply_job`,
        params,
        headerAuth.value
      );
      isApply.value = false;
    };

    return {
      ...toRefs(state),
      selfJobPost: computed(() => checkSelfJob(manageJobs.value, props.id)),
      breadcrumbs,
      job,
      loading,
      isLogin,
      isApply,
      onApply,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :bread-crumbs="breadcrumbs" />
    <div class="detail-wrapper">
      <section v-show="!loading">
        <div class="detail-post-user-area">
          <div class="detail-tag">投稿者</div>
          <PostUser :job="job" />
        </div>
        <div class="detail-post-skill-area">
          <div class="detail-tag">使用技術</div>
          <SkillJob :job="job" />
        </div>
        <div class="detail-post-detail-area">
          <div class="detail-tag">詳細内容</div>
          <DetailJob :job="job" />
        </div>
        <BtnArea
          :id="id"
          :job="job"
          :is-login="isLogin"
          :is-self-job="selfJobPost"
          :is-apply="isApply"
          :on-apply="onApply"
        />
      </section>
      <Loading v-show="loading" />
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
  padding: 3.5rem 0rem;
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
