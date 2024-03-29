<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  SetupContext,
} from "@vue/composition-api";
import { InsidePropsType, OutsidePropsType } from "@icare-jp/vue-props-type";
import { $fetch, $put } from "@/libs/axios";
import {
  PostUser,
  SkillUser,
  IntroduceUser,
  UserTabs,
} from "@/components/Organisms/Users";
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import { StatusChangeBtnArea } from "@/components/Organisms/Manages";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import CardJob from "@/components/Organisms/Jobs/CardJob.vue";
import { Fetch, User, ManageJob } from "@/types/index";
import { m, API_URL, AUTH_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { useJobs, useUtils } from "@/hooks";
import ConfirmDialog from "@/components/Organisms/Modals/Actions/ConfirmDialog.vue";
import get from "lodash/get";
import { VButton } from "@/components/Atoms";
import { ParticipateParams, RejectParams } from "@/types/params";

const propsOption = {
  id: { type: Number, default: 0, required: true }, //? ユーザーのID
  jobId: { type: Number, default: 0, required: true },
  applyId: { type: Number, default: 0, required: true },
} as const;
type PropsOption = typeof propsOption;
export type ManageUserProfile = OutsidePropsType<PropsOption>;

type State = {
  loading: boolean;
  myselfFlag: boolean;
  userInfo: User | {};
  userId: number;
  doneStatusFlag: boolean;
  currentTab: 0 | 1;
  statusId: number;
  updatedAt: Date | null;
  modal: boolean;
  cancelModal: boolean;
};

const initialState = (ctx: SetupContext): State => ({
  loading: true,
  myselfFlag: false,
  userInfo: {},
  userId: ctx.root.$store.getters.userId,
  doneStatusFlag: false,
  currentTab: 0,
  statusId: m.APPLY_STATUS_APPLY,
  updatedAt: null,
  modal: false,
  cancelModal: false,
});

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    PostUser,
    SkillUser,
    IntroduceUser,
    StatusChangeBtnArea,
    Breadcrumbs,
    CardJob,
    UserTabs,
    Loading,
    ConfirmDialog,
    VButton,
  },
  props: propsOption,
  setup: (props, ctx) => {
    const state = reactive<State>(initialState(ctx));
    const router = ctx.root.$router;

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
        href: `/manage/${props.jobId}/apply_users`,
      },
      {
        text: "ユーザー詳細",
        disabled: true,
      },
    ]);

    const { fetchProfileJobs, profileJobs } = useJobs();
    fetchProfileJobs(props.id);
    const { headerAuth } = useUtils();

    const fetchUser = async () => {
      try {
        const res = await $fetch<Fetch<User>>(`${API_URL}/user/${props.id}`);
        state.userInfo = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };

    // * 表示中のユーザーのステータスを格納
    const getStatus = async () => {
      try {
        const res = await $fetch<Fetch<ManageJob[]>>(
          `
          ${AUTH_URL}/apply_jobs?job_id=${props.jobId}&user_id=${props.id}`,
          headerAuth.value
        );
        // TODO: 応募者, 参加者, 拒否者 URL制御
        // https://github.com/team-up-develop/teamup-develop-front/issues/202
        if (res.data.response.length == 0) {
          return router.push({ name: "BadRequest" });
        }
        state.statusId = get(res, "data.response[0].apply_status_id");
        state.updatedAt = get(res, "data.response[0].updated_at");
        state.loading = false;
      } catch (error) {
        catchError(error);
      }
    };

    const onChangeParticipate = async () => {
      const params: ParticipateParams = {
        id: props.applyId,
        job_id: props.jobId,
        user_id: props.id,
        apply_status_id: m.APPLY_STATUS_PARTICIPATE,
        updated_at: state.updatedAt!,
      };
      try {
        await $put<ParticipateParams>(
          `${AUTH_URL}/apply_job/${props.jobId}`,
          params,
          headerAuth.value
        );

        state.modal = false;
        state.statusId = m.APPLY_STATUS_PARTICIPATE;
      } catch (error) {
        catchError(error);
      }
    };

    const onChangeReject = async () => {
      const params: RejectParams = {
        id: props.applyId,
        job_id: props.jobId,
        user_id: props.id,
        apply_status_id: m.APPLY_STATUS_REJECT,
        updated_at: state.updatedAt!,
      };
      try {
        await $put<RejectParams>(
          `${AUTH_URL}/apply_job/${props.jobId}`,
          params,
          headerAuth.value
        );

        state.cancelModal = false;
        state.statusId = m.APPLY_STATUS_REJECT;
      } catch (error) {
        catchError(error);
      }
    };

    const clickTabs = (emitValue: 0 | 1) => {
      state.currentTab = emitValue;
    };

    onMounted(async () => {
      if (!state.userId) {
        return;
      }
      await fetchUser();
      await getStatus();
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      profileJobs,
      clickTabs,
      onChangeReject,
      onChangeParticipate,
    };
  },
});
</script>

<template>
  <section>
    <ConfirmDialog @close="() => (modal = false)" v-show="modal">
      <v-icon class="icon pt-1 pb-4">
        mdi mdi-handshake-outline
      </v-icon>
      <p>
        <span class="user-name">{{ userInfo.user_name }}</span
        >さんを採用しますか？
      </p>
      <template v-slot:btnArea>
        <div class="d-flex justify-space-between">
          <VButton
            class="rounded-pill"
            @click="onChangeParticipate()"
            bc="red"
            size="lg"
            >一緒に開発する</VButton
          >
          <VButton
            class="rounded-pill modal-btn ml-3"
            @click="() => (modal = false)"
            bc="grey"
            size="lg"
            >閉じる</VButton
          >
        </div>
      </template>
    </ConfirmDialog>
    <ConfirmDialog @close="() => (cancelModal = false)" v-show="cancelModal">
      <v-icon class="icon pt-1 pb-4">
        mdi mdi-hand-right
      </v-icon>
      <p>
        <span class="user-name">{{ userInfo.user_name }}</span
        >さんをお断りしますか？
      </p>
      <template v-slot:btnArea>
        <div class="d-flex justify-space-between">
          <VButton
            class="rounded-pill btn-reject"
            @click="onChangeReject()"
            bc="redWhite"
            size="lg"
            >お断りする</VButton
          >
          <VButton
            class="rounded-pill modal-btn ml-3"
            @click="() => (cancelModal = false)"
            bc="grey"
            size="lg"
            >閉じる</VButton
          >
        </div>
      </template>
    </ConfirmDialog>
    <Breadcrumbs :bread-crumbs="breadcrumbs" />
    <div class="detail-wrapper" v-show="!loading">
      <section class="user-area">
        <div class="user-area__post">
          <PostUser
            :user="userInfo"
            @editEmit="editEmit()"
            :myself-flag="myselfFlag"
          />
          <v-row>
            <UserTabs
              :myself-flag="false"
              :current-tab="currentTab"
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
          <template v-if="profileJobs.length > 0">
            <router-link
              :to="`/jobs/${jobs.id}/detail`"
              v-for="jobs in profileJobs"
              :key="jobs.id"
              class="jobs__card"
            >
              <CardJob :job="jobs" />
            </router-link>
          </template>
          <template v-else>
            <div>
              まだ案件がありません
            </div>
          </template>
        </v-row>
      </div>
      <div class="button-area">
        <section v-if="jobId">
          <StatusChangeBtnArea
            :status-id="statusId"
            :open-modal="() => (modal = true)"
            :open-cancel-modal="() => (cancelModal = true)"
          />
        </section>
      </div>
    </div>
    <Loading v-show="loading" />
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
.icon {
  color: $apply;
  font-size: 6em;
}
.user-name {
  text-decoration: underline;
}
.modal-btn {
  padding: 1rem 2.7rem !important;
}
.btn-reject {
  padding: 0.4rem 2rem !important;
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
