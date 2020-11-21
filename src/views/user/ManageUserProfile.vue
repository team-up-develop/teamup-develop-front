<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Loading from '@/components/common/loading/Loading.vue'
import PostUser from '@/components/user/PostUser.vue'
import SkillUser from '@/components/user/SkillUser.vue'
import IntroduceUser from '@/components/user/IntroduceUser.vue'
import { ParticipateParams, RejectParams } from '@/types/manage';
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
  props: {
    id: Number,
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
  filters: {
    //* 案件タイトル 文字制限
    truncateTitle: function(value: string) {
      const length = 40;
      const ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
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
    // * 表示中のユーザーのステータスを格納
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.jobId }&user_id=${ this.id }`)
    .then(response => {
      setTimeout(() => {
        this.loading = false;
        this.statusId = response.data[0].applyStatusId
      }, 1000)
    });

    // *  案件タイトル取得
    axios.get(`http://localhost:8888/api/v1/job/${ this.jobId }`)
    .then(response => {
      console.log(response.data.jobTitle)
      this.jobTitle = response.data.jobTitle
    })
    // TODO: WebSocket
    // const ws = (this.ws = new WebSocket(`ws://${location.host}/websocket`));
    // console.log(ws)
    // // * 接続が確認された時
    // ws.onopen = () => {
    //   console.log("sucsess")
    // };
    // ws.onmessage = message => {
    //   this.messages.push(message.data);
    // };
  },
  methods: {
    // * 参加させる
    applyUserPut() {
      const params: ParticipateParams = {
        jobId: this.jobId,
        userId: this.id,
        applyStatusId: 2
      };
      axios.put(`http://localhost:8888/api/v1/apply_job/`, params)
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
      axios.put(`http://localhost:8888/api/v1/apply_job/`, params)
      .then(response => {
        console.log(response.data)
        this.statusId = 3;
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
  components: {
    // Logout
    Loading,
    PostUser,
    SkillUser,
    IntroduceUser
  }
});
</script>

<template>
  <div class="detail-wrapper">
    <div class="back-space">
      <router-link :to="`/manage/applicant/${ jobId }`">
      <p>＜ {{ jobTitle | truncateTitle }}に戻る</p>
      </router-link>
    </div>
    <section v-if="loading == false">
      <div class="detail-post-user-area">
        <div class="detail-tag">投稿者</div>
        <PostUser :user="userInfo" />
      </div>
      <div class="detail-post-skill-area">
        <div class="detail-tag">経験スキル</div>
        <SkillUser />
      </div>
      <div class="detail-post-detail-area">
        <div class="detail-area">
          <div class="detail-tag">自己紹介</div>
          <IntroduceUser />
        </div>
      </div>
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
    </section>
    <Loading v-else>
    </Loading>
  </div>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.router {
  text-decoration: none;
  color: $basic-white;
}

.detail-wrapper {
  width: 85%;
  padding: 3.5rem 0rem;
  margin: 0 auto;
  position: relative;

  .back-space {
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 1rem;
  }

  .detail-post-user-area {
    width: 80%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 auto;

    .detail-tag {
      color: $primary-color;
      text-align: left;
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 0.7rem;
    }
  }
}

//* スキル カード 
.detail-wrapper 
.detail-post-skill-area {
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0 auto 2rem auto;
}

//* 開発詳細 カード 
.detail-wrapper 
.detail-post-detail-area {
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0 auto;
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
        color: $basic-white;
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
        color: $basic-white;
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
    width: 90%;

    .detail-post-user-area {
      width: 85%;
    }
    /* スキル カード */
    .detail-post-skill-area{
      width: 85%;
    }
    /* 詳細 カード */
    .detail-post-detail-area{
      width: 85%;
    }
  }
}

@media screen and (max-width: 768px) {
  .detail-wrapper{

    .detail-post-user-area{
      width: 95%;
    }

    //* スキル カード 
    .detail-post-skill-area {
      width: 95%;
    }

    //* 詳細 カード 
    .detail-post-detail-area {
      width: 95%;
    }

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
}
/* スマホレスポンシブ */
@media screen and (max-width: 500px) {

  .detail-post-user-area {
    width: 100%;
  }
  //* スキル カード 
  .detail-post-skill-area{
    width: 100%;
  }
  //* 詳細 カード 
  .detail-post-detail-area{
    width: 100%;
  }
    //* ボタン エリア 
    .button-area 
    section 
    .button-action-area {
      width: 100%;
    } 
}

@media screen and (max-width: 420px) {
  .detail-wrapper {
    width: 97%;

    .detail-post-user-area{
      width: 100%;
    }
    //* スキル カード 
    .detail-post-skill-area {
      width: 100%;
    }
    //* 詳細 カード 
    .detail-post-detail-area {
      width: 100%;
    }

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
}
</style>