<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Loading from '@/components/Organisms/Commons/Loading/Loading.vue'
import PostUser from '@/components/Organisms/Users/PostUser.vue'
import SkillUser from '@/components/Organisms/Users/SkillUser.vue'
import IntroduceUser from '@/components/Organisms/Users/IntroduceUser.vue'
import { ParticipateParams, RejectParams } from '@/types/manage';
import { API_URL, truncate } from '@/master'
// import Logout from '@/components/button/Logout'

export type DataType = {
  myselfFlag: boolean;
  userInfo: {};
  jobTitle: string;
  userId: number;
  loading: boolean;
  doneStatusFlag: boolean;
  statusId: number;
}


export default Vue.extend({
  components: {
    Loading,
    PostUser,
    SkillUser,
    IntroduceUser
  },
  props: {
    id: Number, //? 詳細を見るユーザーのID
    jobId: Number
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
    }
  },
  computed: {
    // * 参加
    doneParticipate() { 
      if(this.statusId == 2) {
        return true
      }
      return false
    },
    // * 拒否
    doneReject() {
      if(this.statusId == 3) {
        return true
      }
      return false
    },
  },
  created() {
    // * ユーザー情報取得
      axios.get(`${API_URL}/user/${this.id}`)
      .then(response => {
        this.userInfo = response.data;
      })
      .catch(error => {
        console.log(error)
      })
    // * 表示中のユーザーのステータスを格納
    axios.get(`${API_URL}/apply_job/?job_id=${ this.jobId }&user_id=${ this.id }`)
    .then(response => {
      setTimeout(() => {
        this.loading = false;
        this.statusId = response.data[0].applyStatusId
      }, 700)
    });

    // *  案件タイトル取得
    axios.get(`${API_URL}/job/${ this.jobId }`)
    .then(response => {
      this.jobTitle = response.data.jobTitle
    })
  },
  methods: {
    limit(value: string, num: number) {
      return truncate(value, num)
    },
    // * 参加させる
    applyUserPut() {
      const params: ParticipateParams = {
        jobId: this.jobId,
        userId: this.id,
        applyStatusId: 2
      };
      axios.put(`${API_URL}/apply_job/`, params)
      .then(response => {
        this.statusId = 2;
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    // * 拒否する
    applyUserReject() {
      const params: RejectParams = {
        jobId: this.jobId,
        userId: this.id,
        applyStatusId: 3
      };
      axios.put(`${API_URL}/apply_job/`, params)
      .then(response => {
        console.log(response.data)
        this.statusId = 3;
      })
      .catch(error => {
        console.log(error)
      })
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
          <router-link :to="`/manage/profile/${ jobId }/${ id }`"  class="router-link-active-click">
            <span>プロフィール</span>
          </router-link>
          <router-link :to="`/manage/profile/${ jobId }/${ id }/jobs`" class="router-link">
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
          <div class="button-action-area" v-if="doneParticipate">
            <button class="btn-done">参加しています</button>
          </div>
          <div class="button-action-area" v-if="doneReject">
            <button class="btn-done">拒否しています</button>
          </div>
          <div class="button-action-area" v-if="!doneParticipate && !doneReject">
            <button class="btn-applicant" @click="applyUserPut">参加させる</button>
            <button class="btn-reject" @click="applyUserReject">拒否する</button>
          </div>
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
        .router-link {
          color: $text-main-color;
          text-decoration: none;
          width: 33.3%;
          padding: 0.7rem 0;
          border-bottom: #F1F5F9 1px solid;
        }

        .router-link-active-click {
          font-weight: bold;
          color: $text-main-color;
          text-decoration: none;
          width: 33.3%;
          padding: 0.7rem 0;
          border-bottom: #F1F5F9 1px solid;
          background-color: #F1F5F9;
        }
      }
    }
  }
}

//* スキル カード 
.detail-wrapper 
.skill {
  width: 100%;
  background-color: #F1F5F9;

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
  background-color: #F1F5F9;

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
  
  section {
    width: 100%;

    .button-action-area {
      margin: 0em auto 0.5rem auto;
      width: 80%;
      position: relative;

      .btn-applicant {
        @include red-btn;
        @include box-shadow-btn;
        color: $white;
        padding: 1.2rem 5rem;
        transition: .3s;
        border-radius: 50px;
        font-weight: 600;
        line-height: 1;
        text-align: center;
        margin: auto;
        font-size: 1.3rem;
        display: inline-block;
        cursor: pointer;
        border: none;

        &:hover {
          @include red-btn-hover;
        }
      }

      .btn-reject {
        @include red-cancel-btn;
        @include box-shadow-btn;
        margin-left: 1rem;
        padding: 1.2rem 5.5rem;
        transition: .3s;
        border-radius: 50px;
        font-weight: 600;
        line-height: 1;
        text-align: center;
        font-size: 1.3rem;
        display: inline-block;
        cursor: pointer;
      }

      .btn-done {
        @include grey-btn;
        @include box-shadow-btn;
        color: $white;
        margin-left: 1rem;
        padding: 1.2rem 5.5rem;
        transition: .3s;
        border-radius: 50px;
        font-weight: 600;
        line-height: 1;
        text-align: center;
        font-size: 1.3rem;
        display: inline-block;
        pointer-events:none;
      }
    }
  }
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