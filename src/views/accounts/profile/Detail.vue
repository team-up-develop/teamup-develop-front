<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  PropType,
  onBeforeMount,
  SetupContext,
} from "@vue/composition-api";
import { $fetch } from "@/libs/axios";
import { API_URL } from "@/master";
import { fetchError, catchError } from "@/libs/errorHandler";
import ProfileEditModal from "@/components/Organisms/Modals/Edit/ProfileEditModal.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import {
  UserTabs,
  UserBasicInfo,
  PostUser,
  SkillUser,
  IntroduceUser,
} from "@/components/Organisms/Users";
// import Logout from '@/components/button/Logout'
import CardJob from "@/components/Organisms/Jobs/CardJob.vue";
import { User } from "@/types/index";
import { FetchUser } from "@/types/fetch";
import useJobs from "@/hooks/useJobs";

type Props = {
  id: number;
};

type State = {
  myselfFlag: boolean;
  userInfo: User | {};
  userId: number;
  modal: boolean;
  currentTab: 0 | 1 | 2;
};

const initialState = (ctx: SetupContext): State => ({
  myselfFlag: false,
  userInfo: {},
  userId: ctx.root.$store.getters.userId,
  modal: false,
  currentTab: 0,
});

export default defineComponent({
  components: {
    ProfileEditModal,
    // Logout
    PostUser,
    SkillUser,
    IntroduceUser,
    Breadcrumbs,
    CardJob,
    UserTabs,
    UserBasicInfo,
  },
  props: {
    id: { type: Number as PropType<number>, default: 0, required: true },
  },
  setup: (props: Props, ctx) => {
    const state = reactive<State>(initialState(ctx));

    const breadcrumbs = computed(() => [
      {
        text: "探す",
        disabled: false,
        href: "/jobs",
      },
      {
        text: "ユーザー詳細",
        disabled: true,
      },
    ]);

    const { fetchProfileJobs, profileJobs } = useJobs();
    fetchProfileJobs(props.id);

    const fetchUser = async () => {
      // * ユーザー情報取得
      try {
        const res = await $fetch<FetchUser>(`${API_URL}/user/${props.id}`);
        fetchError(res.data.status);
        state.userInfo = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };

    onBeforeMount(() => {
      if (state.userId == props.id) {
        state.myselfFlag = true;
      }
    });

    onMounted(() => {
      fetchUser();
    });

    const openModal = () => {
      state.modal = true;
    };
    const closeModal = () => {
      state.modal = false;
    };

    // * 編集完了 emit
    const compliteEdit = async () => {
      await fetchUser();
      await closeModal();
    };
    const editEmit = () => {
      openModal();
    };

    const clickTabs = (emitValue: 0 | 1 | 2) => {
      state.currentTab = emitValue;
    };

    return {
      ...toRefs(state),
      breadcrumbs,
      openModal,
      closeModal,
      compliteEdit,
      editEmit,
      profileJobs,
      clickTabs,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :bread-crumbs="breadcrumbs" />
    <div class="detail-wrapper">
      <ProfileEditModal
        v-if="modal"
        :user-info="userInfo"
        @close="closeModal"
        @compliteEdit="compliteEdit()"
      />
      <section class="user-area">
        <div class="user-area__post">
          <PostUser
            :user="userInfo"
            @editEmit="editEmit()"
            :myself-flag="myselfFlag"
          />
          <v-row>
            <UserTabs
              :myself-flag="myselfFlag"
              :current-tab="currentTab"
              @clickTab="clickTabs($event)"
            />
          </v-row>
        </div>
      </section>
      <div v-show="currentTab === 0">
        <v-col class="area">
          <div class="area__card">
            <div class="detail-tag">開発スキル</div>
            <SkillUser :user="userInfo" />
          </div>
        </v-col>
        <v-col class="area">
          <div class="area__card">
            <div class="detail-tag">自己紹介</div>
            <IntroduceUser :user="userInfo" />
          </div>
        </v-col>
      </div>
      <div v-show="currentTab === 1">
        <div class="jobs d-flex flex-wrap">
          <router-link
            :to="`/jobs/${jobs.id}/detail`"
            v-for="jobs in profileJobs"
            :key="jobs.id"
            class="jobs__card d-flex justify-start"
          >
            <CardJob :job="jobs" />
          </router-link>
        </div>
      </div>
      <template v-if="myselfFlag">
        <div v-show="currentTab === 2">
          <v-col class="area">
            <div class="area__card">
              <div class="detail-tag">基本情報</div>
              <UserBasicInfo :user="userInfo" />
            </div>
          </v-col>
        </div>
        <div class="button-area">
          <div v-if="myselfFlag" class="button-action-area">
            <button @click="openModal" class="btn-box-edit">編集する</button>
          </div>
          <div class="button-action-area" v-else />
        </div>
      </template>
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

  .back-space {
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 1rem;
  }
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
  width: 80%;
  margin: 2rem auto;
  max-width: 789px;

  @media screen and (max-width: $sm) {
    width: 95%;
  }

  &__card {
    margin-left: 1rem;
    margin: 0 auto;
    text-decoration: none;
  }
}

//* カード
.detail-wrapper .area {
  width: 100%;

  &__card {
    width: 75%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 1rem auto;

    @media screen and (max-width: $la) {
      width: 95%;
    }

    @media screen and (max-width: $sm) {
      width: 100%;
    }
  }
}

.button-area {
  display: none;

  @media screen and (max-width: $me) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    bottom: 0;
  }

  //* 編集するボタン
  .btn-box-edit {
    @include box-shadow-btn;
    background-color: $secondary-color;
    color: $white;
    padding: 1rem 8rem;
    transition: 0.3s;
    border-radius: 50px;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    margin: auto;
    font-size: 1rem;
    display: inline-block;
    margin-bottom: 0.5rem;
    cursor: pointer;
    border: none;

    @media screen and (max-width: $ti) {
      padding: 1.2rem 6.5rem;
    }

    &:hover {
      @include btn-hover;
    }
  }
}
</style>
