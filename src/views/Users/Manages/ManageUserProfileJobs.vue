<script lang="ts">
import Vue, { PropType } from 'vue';
import axios from 'axios';
import Loading from '@/components/Organisms/Commons/Loading/Loading.vue'
import PostUser from '@/components/Organisms/Users/PostUser.vue'
import CardJob from '@/components/Organisms/Jobs/CardJob.vue'
import StatusChangeBtnArea from '@/components/Organisms/Manages/StatusChangeBtnArea.vue'
import { ManageJob } from '@/types/index';
import { User } from '@/types/index';
import { 
  API_URL, 
  truncate, 
  catchError, 
} from '@/master'
// import Logout from '@/components/button/Logout'

type DataType = {
  myselfFlag: boolean;
  userInfo: User;
  jobTitle: string;
  userId: number;
  loading: boolean;
  doneStatusFlag: boolean;
  statusId: number;
  manageJobs: ManageJob[];
}

export default Vue.extend({
  components: {
    Loading,
    PostUser,
    CardJob,
    StatusChangeBtnArea
  },
  props: {
    id: { type: Number as PropType<number>, default: 0 }, //? 詳細を見るユーザーのID
    jobId: { type: Number as PropType<number>, default: 0 }
  },
  data(): DataType {
    return {
      myselfFlag: false,
      userInfo: {},
      jobTitle: "",
      userId: this.$store.state.auth.userId,
      loading: true, //? ローディング
      doneStatusFlag: false,
      statusId: 1,
      manageJobs: []
    }
  },
  created() {
    // * ユーザー情報取得
    axios.get(`${API_URL}/user/${this.id}`)
    .then(res => {
      setTimeout(() => {
        this.loading = false;
        this.userInfo = res.data.response;
      }, 1000)
    })
    .catch(error => { catchError(error) })

    // *  案件タイトル取得
    axios.get(`${API_URL}/job/${ this.jobId }`)
    .then(res => {
      this.jobTitle = res.data.response.job_title
    })
    .catch(error => { catchError(error) })

    // *詳細を見ているユーザーの投稿案件
    axios.get(`${API_URL}/jobs?user_id=${this.id}`)
    .then(res => {
      this.manageJobs = res.data.response
    })
    .catch(error => { catchError(error) })
  },
  methods: {
    limit(value: string, num: number) {
      return truncate(value, num)
    },
  }
});
</script>

<template>
  <section>
    <div class="detail-wrapper" v-if="loading == false">
    <div class="back-space">
      <router-link :to="`/manage/applicant/${ jobId }`">
      <p>＜ {{ limit(jobTitle, 40) }}に戻る</p>
      </router-link>
    </div>
    <section class="user-area">
      <div class="user-area__post">
        <PostUser :user="userInfo" 
          @editEmit="editEmit()" 
          :myselfFlag="myselfFlag"
        />
        <v-row class="header">
          <router-link :to="`/manage/profile/${ jobId }/${ id }`"  class="router-link">
            <span>プロフィール</span>
          </router-link>
          <router-link :to="`/account/profile/${ id }/jobs`" class="router-link-active-click">
            <span>投稿案件</span> 
          </router-link>
        </v-row>
      </div>
    </section>
      <v-row class="jobs">
        <router-link 
          :to="`/jobs/${ jobs.id }`" 
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
    </div>
    <Loading v-else>
    </Loading>
  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

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

  .jobs {
    min-height: 500px;
    width: 80%;
    margin: 2rem auto;

    @media screen and (max-width: 480px) {
      width: 98%;
    }

    &__card {
      margin-left: 1rem;
      width: 500px;
      margin: 0 auto;
    }
  }
}

//* スキル カード 
.detail-wrapper 
.skill {
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
.detail-wrapper 
.pr {
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

/* タブレットレスポンシブ */
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

@media screen and (max-width: 690px) {
  //* ボタン エリア 
  .button-area 
  section 
  .button-action-area {
    .btn-applicant {
      padding: 1.2rem 3rem;
      font-size: 1rem;
    }

    .btn-reject {
      padding: 1.2rem 3rem;
      font-size: 1rem;
    }
  } 
}

/* スマホレスポンシブ */
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

    //* ボタン エリア 
    .button-area 
    section 
    .button-action-area {
      width: 100%;
    } 
  }
}

@media screen and (max-width: 400px) {
    //* ボタン エリア 
    .button-area 
    section 
    .button-action-area {
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