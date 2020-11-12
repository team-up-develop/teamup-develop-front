<script lang="ts">
import Vue from 'vue';
import axios from 'axios'
import moment from "moment";

export type DataType = {
  manageJobs: [];
  loginFlag: boolean;
  userId: number;
}

export default Vue.extend({ 
  data(): DataType {
    return {
      manageJobs: [],
      loginFlag: false,
      userId: this.$store.state.auth.userId
    }
  },
  filters: {
    // * date型を文字に変換
    moment(value: string, format: string) {
      return moment(value).format(format);
    },
    //* 案件タイトル 文字制限
    truncateTitle: function(value: string) {
      const length = 25;
      const ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
    //* 案件タイトル レスポンシブ 文字制限
    truncateResponsiveTitle: function(value: string) {
      const length = 15;
      const ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  },
  mounted() {
    // * 管理案件を取得
    if(this.userId) {
      this.loginFlag = true
      axios.get(`http://localhost:8888/api/v1/job/?user_id=${this.userId}`)
      .then(response => {
        this.manageJobs = response.data
      })
    }
    else {
      this.loginFlag = false;
    }
  }
});
</script>

<template>
  <div class="manage-wrapper">
    <div v-if="loginFlag === true" class="job-manage-wrapper">
      <router-link to="/manage" class="router-no-link">
        <div class="manage-job-area">
          <p>管理案件</p> 
        </div>
      </router-link>
      <router-link to="/manage/apply_job" class="router-link">
        <div class="apply-job-area">
          <p>応募案件</p>
        </div>
      </router-link>
      <router-link to="/manage/favorite_job" class="router-link">
        <div class="save-job-area">
          <p>保存案件</p> 
        </div>
      </router-link>
      <div class="title-area">案件タイトル</div>
      <div class="time-area">開発期間</div>
      <div class="skill-area">開発言語</div>
      <div class="job-wrapper-area">
        <router-link :to="`/manage/apply/${ jobs.id }`" v-for="jobs in manageJobs" :key="jobs.id" class="router">
          <div class="job-area">
            <div class="job-area-box">
              <span>{{ jobs.jobTitle | truncateTitle }}</span>
              <p>{{ jobs.jobTitle | truncateResponsiveTitle }}</p>
            </div>
            <div class="job-area-box">
              <span>{{ jobs.devStartDate | moment("YYYY年 M月 D日") }}  ~  {{ jobs.devEndDate | moment("YYYY年 M月 D日")}}</span>
              <p>{{ jobs.devStartDate | moment("YYYY/M/D") }}  ~  {{ jobs.devEndDate | moment("YYYY/M/D")}}</p>
            </div>
            <div class="job-area-box">
              <div class="lang" 
                v-for="(langage, index) in jobs.programingLanguage.slice(0,2)" 
                :key="`langage-${index}`"
              >
                {{ langage.programingLanguageName }}  ,
              </div>
              <div class="lang" 
                v-for="(framework, index) in jobs.programingFramework.slice(0,2)" 
                :key="`framework-${index}`"
              >
                {{ framework.programingFrameworkName }}  ,
              </div>
            </div>
          </div>
        </router-link>
        </div>
    </div>
    <div v-else>
      ログインが必要です！
    </div>
  </div>
</template>


<style lang="scss" scoped>
.router-link :hover {
  opacity: 0.8 ;
}

.router-no-link, .router-link {
  text-decoration: none;
  color: $basic-white;
}

.manage-wrapper {
  width: 92%;
  height: 89.5vh;
  margin: 0 auto;

  .job-manage-wrapper {
    width: 95%;
    height: calc(90vh - 5rem);
    border-radius: 20px;
    margin: 2rem 2rem;
    background-color: #ffffff;
    // float: right;
    border-bottom: solid 1px $card-border-color;
    border-right: solid 1px $card-border-color;
    border-left: solid 1px $card-border-color;
    position: relative;
    font-size: 14px;

    .manage-job-area {
      @include box-shadow-manage;
      width: 33.2%;
      height: calc(68px - 1.6rem);
      padding: 0.8rem 0;
      border-radius: 20px 0 0 0;
      background-color: $secondary-color;
      display: inline-block;
      color: $basic-white;
      font-weight: bold;
      }

    .apply-job-area {
      width: 33.2%;
      height: calc(68px - 1.6rem);
      padding: 0.8rem 0;
      background-color: #606060;
      display: inline-block;
      color: $basic-white;
      border: 0.5px solid $basic-white;
      font-weight: bold;
      transition: .3s;
    }

    .save-job-area {
      width: 33.2%;
      height: calc(68px - 1.6rem);
      padding: 0.8rem 0;
      border-radius: 0 20px 0 0;
      background-color: #606060;
      display: inline-block;
      color: $basic-white;
      font-weight: bold;
      transition: .3s;
    }
  }

  .title-area {
    width: 33.2%;
    height: calc(48px - 1.8rem);
    padding: 0.8rem 0;
    background-color: $secondary-color;
    display: inline-block;
    color: $basic-white;
    font-weight: bold;
  }

  .time-area {
    width: 33.2%;
    height: calc(48px - 1.8rem);
    padding: 0.8rem 0;
    border-left: 1px solid $basic-white;
    border-right: 1px solid $basic-white;
    background-color: $secondary-color;
    display: inline-block;
    color: $basic-white;
    font-weight: bold;
  }

  .skill-area {
    width: 33.2%;
    height: calc(48px - 1.8rem);
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
    border-bottom: 1px solid #9c9c9c;
  }

  .job-wrapper-area {
    width: 100%;
    height: 81%;
    overflow: scroll;

    .job-area {
      line-height: 2;

      .job-area-box {
        width: 33.2%;
        // border-bottom: 1px solid #9c9c9c;
        height: calc(48px - 1.6rem);
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
        // display:flex;
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

      .save-job-area {
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

    .save-job-area {
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