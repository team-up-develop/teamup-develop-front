<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from "@vue/composition-api";
import axios from "axios";
import Vuex from "@/store/index";
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import PostUser from "@/components/Organisms/Users/PostUser.vue";
import SkillUser from "@/components/Organisms/Users/SkillUser.vue";
import IntroduceUser from "@/components/Organisms/Users/IntroduceUser.vue";
import StatusChangeBtnArea from "@/components/Organisms/Manages/StatusChangeBtnArea.vue";
import { User } from "@/types/index";
import { API_URL, truncate, catchError } from "@/master";
// import Logout from '@/components/button/Logout'

type State = {
  myselfFlag: boolean;
  userInfo: User;
  jobTitle: string;
  userId: number;
  loading: boolean;
  doneStatusFlag: boolean;
  statusId: number;
};

const initialState = (): State => ({
  myselfFlag: false,
  userInfo: {},
  jobTitle: "",
  userId: Vuex.state.auth.userId,
  loading: true,
  doneStatusFlag: false,
  statusId: 1,
});

export default defineComponent({
  components: {
    Loading,
    PostUser,
    SkillUser,
    IntroduceUser,
    StatusChangeBtnArea,
  },
  props: {
    id: { type: Number, default: 0 }, //? 詳細を見るユーザーのID
    jobId: { type: Number, default: 0 },
  },
  setup: (props) => {
    const state = reactive<State>(initialState());

    const limit = (value: string, num: number) => truncate(value, num);

    // * ユーザー情報取得
    const getUser = async () => {
      try {
        setTimeout(async () => {
          const res = await axios.get(`${API_URL}/user/${props.id}`);
          state.loading = false;
          state.userInfo = res.data.response;
        }, 700);
      } catch (error) {
        catchError(error);
      }
    };
    getUser();

    const getJobTitle = async () => {
      const res = await axios.get(`${API_URL}/job/${props.jobId}`);
      state.jobTitle = res.data.response.job_title;
    };

    onMounted(() => {
      if (!state.userId) {
        return;
      }
      getJobTitle();
    });

    return {
      ...toRefs(state),
      limit,
      getJobTitle,
    };
  },
});
</script>

<template>
  <section>
    <div class="detail-wrapper" v-if="loading == false">
      <div class="back-space">
        <router-link :to="`/manage/applicant/${jobId}`">
          <p>＜ {{ limit(jobTitle, 40) }}に戻る</p>
        </router-link>
      </div>
      <section class="user-area">
        <div class="user-area__post">
          <PostUser
            :user="userInfo"
            @editEmit="editEmit()"
            :myselfFlag="myselfFlag"
          />
          <v-row class="header">
            <router-link
              :to="`/manage/profile/${jobId}/${id}`"
              class="router-link-active-click"
            >
              <span>プロフィール</span>
            </router-link>
            <router-link
              :to="`/manage/profile/${jobId}/${id}/jobs`"
              class="router-link"
            >
              <span>投稿案件</span>
            </router-link>
          </v-row>
        </div>
      </section>
      <v-col class="skill">
        <div class="skill__card">
          <div class="detail-tag">自己紹介</div>
          <SkillUser />
        </div>
      </v-col>
      <v-col class="pr">
        <div class="pr__card">
          <div class="detail-tag">自己紹介</div>
          <IntroduceUser :user="userInfo" />
        </div>
      </v-col>
      <div class="button-area">
        <!-- 案件管理からきたら -->
        <section v-if="jobId">
          <StatusChangeBtnArea :id="id" :jobId="jobId" />
        </section>
      </div>
    </div>
    <Loading v-else> </Loading>
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

.router {
  text-decoration: none;
  color: $white;
}

.detail-wrapper {
  width: 100%;
  padding: 3.5rem 0rem 0 0;
  position: relative;

  .back-space {
    text-align: left;
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 1rem;
    padding: 0 2rem;
  }
  .user-area {
    width: 88%;
    margin: 0 auto;

    &__post {
      width: 85%;
      display: flex;
      flex-direction: column;
      margin: 0 auto;

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

//* タブレットレスポンシブ
@media screen and (max-width: 900px) {
  .detail-wrapper {
    .user-area {
      width: 100%;
      &__post {
        width: 95%;
      }
    }
    .skill {
      &__card {
        width: 95%;
      }
    }
    .pr {
      &__card {
        width: 95%;
      }
    }
  }
}

//* スマホレスポンシブ
@media screen and (max-width: 500px) {
  .detail-wrapper {
    .skill {
      &__card {
        width: 100%;
      }
    }

    .pr {
      &__card {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 400px) {
  //* ボタン エリア
  .button-area section .button-action-area {
    .btn-applicant {
      padding: 1.2rem 2rem;
      font-size: 1rem;
    }

    .btn-reject {
      padding: 1.2rem 2rem;
      font-size: 1rem;
    }
  }
}
</style>
