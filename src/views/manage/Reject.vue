<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import moment from "moment";
import { ManageJob } from '@/types/manage';
// import StatusChange from '@/components/manage/StatusChange'

export type DataType = {
  applyUsers: ManageJob[];
  applyUsersNum: number;
  assginUsers: ManageJob[];
  assginUsersNum: number;
  rejectUsers: ManageJob[];
  rejectUsersNum: number;
  favoriteUsers: ManageJob[];
  favoriteUsersNum: number;
  manageJobs: ManageJob[];
  userId: number;
  jobTitle: string;
}

export default Vue.extend({
  props: {
    // * job.idを受け取る
    id: Number,
  },
  data(): DataType {
    return {
      applyUsers: [], //? 応募者
      applyUsersNum: 0,//? 応募者人数
      assginUsers: [], //? 参加者
      assginUsersNum: 0, //? 参加者人数
      rejectUsers: [], //? 拒否者
      rejectUsersNum: 0, //? 拒否者人数
      favoriteUsers: [], //? お気に入りしているユーザー一覧
      favoriteUsersNum: 0, //? お気に入りしているユーザー 人数
      manageJobs: [], //? 管理
      userId: this.$store.state.auth.userId,
      jobTitle: ""
    }
  },
  filters: {
    // * date型を文字に変換
    moment(value: string, format: string) {
      return moment(value).format(format);
    },
    //* 案件タイトル 詳細 文字制限
    truncateDetailTitle: function(value: string) {
      const length = 60;
      const ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  },
  created() {
    // * 参加者をステータスごとに取り出す
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.id }&apply_status_id=1`)
    .then(response => {
      this.applyUsers = response.data
      this.applyUsersNum = response.data.length
    })
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.id }&apply_status_id=2`)
    .then(response => {
      this.assginUsers = response.data
      this.assginUsersNum = response.data.length
    })
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.id }&apply_status_id=3`)
    .then(response => {
      this.rejectUsers = response.data
      this.rejectUsersNum = response.data.length
    })

    axios.get(`http://localhost:8888/api/v1/favorite_job/?job_id=${ this.id }`)
    .then(response => {
      this.favoriteUsers = response.data
      this.favoriteUsersNum = this.favoriteUsers.length
    })
  },
  mounted() {
    // * 管理している案件を取得する
    axios.get(`http://localhost:8888/api/v1/job/?user_id=${this.userId}`)
    .then(response => {
      this.manageJobs = response.data
    })
    // *  案件タイトル取得
    axios.get(`http://localhost:8888/api/v1/job/${ this.id }`)
    .then(response => {
      console.log(response.data.jobTitle)
      this.jobTitle = response.data.jobTitle
    })
  },
  methods: {
    // * 参加者 リアルタイムで変更する
    compliteAssgin(){
      // * 参加者をステータスごとに取り出す
      axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.id }&apply_status_id=1`)
      .then(response => {
        this.applyUsers = response.data
        this.applyUsersNum = response.data.length
      })
      axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.id }&apply_status_id=2`)
      .then(response => {
        this.assginUsers = response.data
        this.assginUsersNum = response.data.length
      })
    },
    // *拒否者 リアルタイムで取得
    compliteReject() {
      // * 参加者をステータスごとに取り出す
      axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.id }&apply_status_id=1`)
      .then(response => {
        this.applyUsers = response.data
        this.applyUsersNum = response.data.length
      })
      axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.id }&apply_status_id=3`)
      .then(response => {
        this.rejectUsers = response.data
        this.rejectUsersNum = response.data.length
      })
    }
  },
  components: {
    // StatusChange
  }
});
</script>

<template>
  <section>
    <div class="back-space">
      案件名:
      <router-link :to="`/jobs/${ id }`"> 
        <span>{{ jobTitle | truncateDetailTitle }}</span>
      </router-link>
    </div>
    <div class="manage-wrapper">
      <v-card class="job-manage-wrapper">
        <router-link :to="`/manage/applicant/${ id }`" class="router-no-link">
          <div class="manage-job-area">
            <span>応募者 <font-awesome-icon icon="user" class="icon"/></span> 
          </div>
        </router-link>
        <router-link :to="`/manage/participate/${ id }`" class="router-link">
          <div class="apply-job-area">
            <span>参加者 <font-awesome-icon icon="users" class="icon"/></span>
          </div>
        </router-link>
        <router-link :to="`/manage/reject/${ id }`" class="router-link">
          <div class="reject-job-area">
            <span>拒否者 <font-awesome-icon icon="user-alt-slash" class="icon"/></span> 
          </div>
        </router-link>
        <div class="title-area">名前</div>
        <div class="time-area">学習開始日</div>
        <div class="skill-area">スキル</div>
        <div class="job-wrapper-area">
          <router-link :to="`/manage/profile/${ id }/${ rejectUser.userId }`" v-for="rejectUser in rejectUsers" :key="rejectUser.id" class="router">
            <div class="job-area">
              <div class="job-area-box">
                <span>{{ rejectUser.user.userName }}</span>
                <p>{{ rejectUser.user.userName }}</p>
              </div>
              <div class="job-area-box">
                <span>{{ rejectUser.user.learningStartDate | moment("YYYY年 M月 D日") }}</span>
                <p>{{ rejectUser.user.learningStartDate | moment("YYYY年 M月 D日") }}</p>
              </div>
              <div class="job-area-box">
                仮置き: {{ rejectUser.user.userName }}
              </div>
            </div>
          </router-link>
          </div>
      </v-card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.router-link :hover {
  opacity: 0.8 ;
}

.router-no-link, .router-link {
  text-decoration: none;
  // color: $basic-white;
}

.back-space {
  margin-top: 1rem;
  font-weight: bold;
}

.manage-wrapper {
  width: 100%;
  height: 89.5vh;
  margin: 0 auto;

  .job-manage-wrapper {
    width: 90%;
    height: calc(90vh - 5rem);
    border-radius: 20px;
    margin: 2rem auto 0 auto;
    background-color: #ffffff;
    border-bottom: solid 1px $card-border-color;
    border-right: solid 1px $card-border-color;
    border-left: solid 1px $card-border-color;
    position: relative;
    font-size: 14px;

    .manage-job-area {
      background-color: #606060;
      width: 33.3%;
      padding: 1rem 0;
      border-radius: 20px 0 0 0;
      display: inline-block;
      color: $basic-white;
      font-weight: bold;
    }

    .apply-job-area {
      background-color: #606060;
      width: 33.4%;
      // height: calc(68px - 1.6rem);
      padding: 1rem 0;
      display: inline-block;
      color: $basic-white;
      border: 0.5px solid $basic-white;
      font-weight: bold;
      transition: .3s;
    }

    .reject-job-area {
      @include box-shadow-manage;
      background-color: $secondary-color;
      width: 33.3%;
      // height: calc(68px - 1.6rem);
      padding: 1rem 0;
      border-radius: 0 20px 0 0;
      display: inline-block;
      color: $basic-white;
      font-weight: bold;
      transition: .3s;
    }
  }

  .title-area {
    width: 33.3%;
    // height: calc(48px - 1.8rem);
    padding: 0.8rem 0;
    background-color: $secondary-color;
    display: inline-block;
    color: $basic-white;
    font-weight: bold;
  }

  .time-area {
    width: 33.4%;
    // height: calc(48px - 1.8rem);
    padding: 0.8rem 0;
    border-left: 1px solid $basic-white;
    border-right: 1px solid $basic-white;
    background-color: $secondary-color;
    display: inline-block;
    color: $basic-white;
    font-weight: bold;
  }

  .skill-area {
    width: 33.3%;
    // height: calc(48px - 1.8rem);
    padding: 0.8rem 0;
    background-color: $secondary-color;
    display: inline-block;
    color: $basic-white;
    font-weight: bold;
  }

  .job-title-area {
    width: 33.3%;
    height: 70%;
    display: inline-block;
  }

  .router :hover {
    background-color: $manage-hover-color;
  }

  .job-area {
    transition: .2s;
    // border-bottom: 1px solid #9c9c9c;
  }

  .job-wrapper-area {
    width: 100%;
    height: 81%;
    overflow: scroll;

    .job-area {
      line-height: 2;

      .job-area-box {
        width: 33.2%;
        border-bottom: 1px solid #9c9c9c;
        // height: calc(48px - 1.6rem);
        padding: 0.8rem 0;
        color: $text-main-color;
        font-size: 14px;
        display: inline-block;
        pointer-events: none;
        line-height: 2;

        p{
          display: none;
        }
      }

      .lang {
        display: inline-block;
        }
    }
  }
}

@media screen and (max-width: 1200px) {
  .manage-wrapper {
    margin: 0rem auto;
    width: 90%;
  
    .job-manage-wrapper {
      width: 93%;
      border-radius: 20px;
      margin: 2rem 2rem;

      .job-area {
        display:flex;
      }
    }
  }
}

/* タブレット */
@media screen and (max-width: 900px) {
  .manage-wrapper {
    margin: 0rem auto;
    width: 90%;

    .job-manage-wrapper {
      width: calc(100% - 3rem);
      height: calc(90vh - 5rem);
      margin: 2rem 1.5em;
    }
  }
}

@media screen and (max-width: 768px) {
  .manage-wrapper {
    .job-manage-wrapper{
      .manage-job-area {
        @include box-shadow-manage;
        width: 33.1%;
        height: calc(68px - 1.6rem);
        padding: 0.8rem 0;
      }

      .apply-job-area {
        width: 33.1%;
        height: calc(68px - 1.6rem);
        padding: 0.8rem 0;
      }

      .reject-job-area {
        width: 33.1%;
        height: calc(68px - 1.6rem);
        padding: 0.8rem 0;
      }

      .title-area {
        width: 33.1%;
        height: calc(48px - 1.8rem);
        padding: 0.8rem 0;
        background-color: $secondary-color;
        display: inline-block;
        color: $basic-white;
        font-weight: bold;
      } 

      .time-area{
        width: 33.1%;
        height: calc(48px - 1.8rem);
        padding: 0.8rem 0;
      }

      .skill-area {
        width: 33.1%;
        height: calc(48px - 1.8rem);
        padding: 0.8rem 0;
      }
    }
  }
}


/*スマホ*/
@media screen and (max-width: 500px){
  .manage-wrapper {
    width: 100%;
    height: 89.5vh;
    margin: 0 auto;
    .job-manage-wrapper {
      width: calc(100% - 4rem);
      height: calc(90vh - 5rem);
      margin: 2rem 2rem;
      // float: right;
      position: relative;
      font-size: 14px;
    }
    .job-wrapper-area .job-area .job-area-box{
      p{
        display: inline;
      }
      span{
        display: none;
        height: calc(48px - 1.6rem);
      } 
    }
  } 
}

@media (max-width: 420px){
  .manage-wrapper {
    width: 100%;
    height: 89.5vh;
    margin: 0 auto;

    .job-manage-wrapper {
      width: 97%;
      margin: 0 auto;
      height: calc(90vh - 5rem);
      margin: 2rem auto;
      position: relative;
    }

  .manage-job-area {
    @include box-shadow-manage;
    width: 33%;
    height: calc(68px - 1.6rem);
    padding: 0.8rem 0;
  }

    .apply-job-area {
      width: 33%;
      height: calc(68px - 1.6rem);
      padding: 0.8rem 0;
    }

    .reject-job-area {
      width: 33%;
      height: calc(68px - 1.6rem);
      padding: 0.8rem 0;
    }

    .title-area {
      width: 33%;
      height: calc(48px - 1.8rem);
      padding: 0.8rem 0;
      background-color: $secondary-color;
      display: inline-block;
      color: $basic-white;
      font-weight: bold;
  }

    .time-area{
      width: 33;
      height: calc(48px - 1.8rem);
      padding: 0.8rem 0;
    }

    .skill-area {
      width: 33%;
      height: calc(48px - 1.8rem);
      padding: 0.8rem 0;
    }
    .job-wrapper-area {
      width: 100%;
      height: 81%;
      overflow: scroll;

      .job-area {
        display:flex;

        .job-area-box {
          width: 33.2%;
          height: 100%;
          padding: 0.8rem 0;
          color: $text-main-color;
          font-size: 14px;
          display: inline-block;
          pointer-events: none;

          p{
            display: inline;
          }
          span{
            display: none;
          }
        }
      }
    }
  }
}

</style>