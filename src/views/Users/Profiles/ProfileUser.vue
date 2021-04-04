<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  PropType,
} from "@vue/composition-api";
import { API_URL, catchError } from "@/master";
import axios from "axios";
import ProfileEditModal from "@/components/Organisms/Modals/Edit/ProfileEditModal.vue";
import PostUser from "@/components/Organisms/Users/PostUser.vue";
import SkillUser from "@/components/Organisms/Users/SkillUser.vue";
import IntroduceUser from "@/components/Organisms/Users/IntroduceUser.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
// import Logout from '@/components/button/Logout'
import CardJob from "@/components/Organisms/Jobs/CardJob.vue";
import { User } from "@/types/index";
import Vuex from "@/store/index";
import useJobs from "@/hooks/useJobs";

type Props = {
  id: number;
};

type State = {
  myselfFlag: boolean;
  userInfo: User | {};
  userId: number;
  modal: boolean;
  currentTab: 0 | 1;
  tabs: any;
};

const initialState = (): State => ({
  myselfFlag: false,
  userInfo: {},
  userId: Vuex.state.auth.userId,
  modal: false,
  currentTab: 0,
  tabs: [
    { id: 1, tabName: "プロフィール" },
    { id: 2, tabName: "投稿案件" },
  ],
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
  },
  props: {
    id: { type: Number as PropType<number>, default: 0, require: true },
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
        text: "ユーザー詳細",
        disabled: true,
      },
    ]);

    const { manageJobs } = useJobs();

    const fetchUser = async () => {
      // * ユーザー情報取得
      try {
        const res = await axios.get(`${API_URL}/user/${props.id}`);
        state.userInfo = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };

    if (state.userId == props.id) {
      state.myselfFlag = true;
    }

    onMounted(() => {
      fetchUser();
    });

    const openModal = () => {
      state.modal = true;
    };
    const closeModal = () => {
      state.modal = false;
    };
    const doSend = () => {
      closeModal();
    };

    // * 編集完了 emit
    const compliteEdit = async () => {
      await fetchUser();
      await closeModal();
    };
    const editEmit = () => {
      openModal();
    };

    return {
      ...toRefs(state),
      breadcrumbs,
      openModal,
      closeModal,
      doSend,
      compliteEdit,
      editEmit,
      manageJobs,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <div class="detail-wrapper">
      <ProfileEditModal
        :userInfo="userInfo"
        @close="closeModal"
        @compliteEdit="compliteEdit()"
        v-if="modal"
      />
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
      <template>
        <div v-show="currentTab === 0">
          <v-col class="skill">
            <div class="skill__card">
              <div class="detail-tag">開発スキル</div>
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
          <div v-if="myselfFlag" class="button-action-area">
            <button @click="openModal" class="btn-box-edit">編集する</button>
          </div>
          <div class="button-action-area" v-else></div>
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
  width: 85%;
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
    padding: 1.2rem 8rem;
    transition: 0.3s;
    border-radius: 50px;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    margin: auto;
    font-size: 1.3rem;
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
