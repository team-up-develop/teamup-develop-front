<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
import { API_URL, catchError } from "@/master";
import axios from "axios";
import Vuex from "@/store/index";
import ProfileEditModal from "@/components/Organisms/Modals/Edit/ProfileEditModal.vue";
import PostUser from "@/components/Organisms/Users/PostUser.vue";
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import { User } from "@/types/index";
import CardJob from "@/components/Organisms/Jobs/CardJob.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import useJobs from "@/hooks/useJobs";
// import Logout from '@/components/button/Logout'

type State = {
  myselfFlag: boolean;
  userInfo: User;
  userId: number;
  modal: boolean;
  loading: boolean;
};

const initialState = (): State => ({
  myselfFlag: false,
  userInfo: {},
  userId: Vuex.state.auth.userId,
  modal: false,
  loading: true,
});

export default defineComponent({
  components: {
    ProfileEditModal,
    PostUser,
    CardJob,
    Breadcrumbs,
    Loading,
  },
  props: {
    id: Number,
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
        text: "ユーザー詳細",
        disabled: true,
      },
    ]);

    if (state.userId == props.id) {
      state.myselfFlag = true;
    }

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

    const openModal = () => {
      state.modal = true;
    };
    const closeModal = () => {
      state.modal = false;
    };

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
      <!-- 編集 モーダル画面 -->
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
            <router-link :to="`/account/profile/${id}`" class="router-link">
              <span>プロフィール</span>
            </router-link>
            <router-link
              :to="`/account/profile/${id}/jobs`"
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
          <div v-if="myselfFlag === true" class="button-action-area">
            <button @click="openModal" class="btn-box-edit">編集する</button>
          </div>
          <!-- 非ログイン時 リダイレクトさせる -->
          <div class="button-action-area" v-else></div>
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
