<template>
  <div class="manage-wrapper">
    <div v-if="loginFlag === true" class="job-manage-wrapper">
      <router-link to="/manage" class="router-link">
        <div class="manage-job-area">
          <p>管理案件</p> 
        </div>
      </router-link>
      <router-link to="/manage/apply_job" class="router-link">
        <div class="apply-job-area">
          <p>応募案件</p>
        </div>
      </router-link>
      <div class="save-job-area">
        <p>保存案件</p> 
      </div>
      <div class="title-area">案件タイトル</div>
      <div class="time-area">開発期間</div>
      <div class="skill-area">開発言語</div>
      <div class="job-wrapper-area">
        <router-link :to="`/manage/favorite_job/${ jobs.jobId }`" v-for="jobs in favoriteJobs" :key="jobs.id" class="router">
          <div class="job-area">
            <div class="job-area-box">
              <span>{{ jobs.job.jobTitle | truncateTitle }}</span>
              <p>{{ jobs.job.jobTitle | truncateResponsiveTitle }}</p>
            </div>
            <div class="job-area-box">
              <span>{{ jobs.devStartDate | moment("YYYY年 M月 D日") }}  ~  {{ jobs.devEndDate | moment("YYYY年 M月 D日")}}</span>
              <p>{{ jobs.devStartDate | moment("YYYY/M/D") }}  ~  {{ jobs.devEndDate | moment("YYYY/M/D")}}</p>
            </div>
            <div class="job-area-box">
              <div class="lang"
                v-for="(langage, index) in jobs.job.programingLanguage.slice(0,2)" 
                :key="`langage-${index}`"
              >
                {{ langage.programingLanguageName }}  ,
              </div>
              <div class="lang" 
                v-for="(framework, index) in jobs.job.programingFramework.slice(0,2)" 
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

<script lang="ts">
import Vue from 'vue';
import axios from 'axios'
import moment from "moment";
// import Loading from '@/components/Loading'

export type DataType = {
  favoriteJobs: [];
  loginFlag: boolean;
  userId: number;
}

export default Vue.extend({ 
  data() {
    return {
      favoriteJobs: [],
      loginFlag: false,
      // loading: true
      userId: this.$store.state.auth.userId
    }
  },
  filters: {
    moment(value: string, format: string) {
      return moment(value).format(format);
    },
    //* 案件タイトル 文字制限
    truncateTitle: function(value: string) {
      const length = 23;
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
    // * 保存している案件を取得
    if(this.userId) {
      this.loginFlag = true
      axios.get(`http://localhost:8888/api/v1/favorite_job/?user_id=${this.userId}`)
      .then(response => {
          // this.loading = false;
          this.favoriteJobs = response.data
      })
    }
    else {
      this.loginFlag = false;
    }
  },
  components: {
    // Loading,
  },
});
</script>

<style lang="scss" scoped>
.router-link {
  :hover {
    opacity: 0.8;
  }

  text-decoration: none;
  color: $basic-white;
}

.manage-wrapper {
  width: 92%;
  height: 89.5vh;
  margin: 0 auto;

  .job-manage-wrapper {
    @include card-border-color;
    background-color: $basic-white;
    width: 95%;
    height: calc(90vh - 5rem);
    border-radius: 20px;
    margin: 2rem 2rem;
    position: relative;
    font-size: 14px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.26);

    .manage-job-area {
      width: 33.2%;
      height: calc(68px - 1.6rem);
      padding: 0.8rem 0;
      border-radius: 20px 0 0 0;
      background-color: #606060;
      display: inline-block;
      color: $basic-white;
      font-weight: bold;
      transition: .3s;
    }

    .apply-job-area {
      width: 33.2%;
      height: calc(68px - 1.6rem);
      padding: 0.8rem 0;
      background-color: #606060;
      display: inline-block;
      color: #ffffff;
      border: 0.5px solid #ffffff;
      font-weight: bold;
      transition: .3s;
    }

    .save-job-area {
      @include box-shadow-manage;
      background-color: $secondary-color;
      width: 33.2%;
      height: calc(68px - 1.6rem);
      padding: 0.8rem 0;
      border-radius: 0 20px 0 0;
      display: inline-block;
      color: #ffffff;
      font-weight: bold;
    }
  }
}

.title-area {
  width: 33.2%;
  height: calc(48px - 1.8rem);
  padding: 0.8rem 0;
  background-color: $secondary-color;
  display: inline-block;
  color: #ffffff;
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
  width: 33.2%;
  height: 70%;
  display: inline-block;
}

.router :hover {
  background-color: $manage-hover-color;
}

.job-wrapper-area {
  width: 100%;
  height: 81%;
  overflow: scroll;
}

.job-area {
  transition: .2s;
  border-bottom: 1px solid #9c9c9c;

  .job-area-box {
    width: 33%;
    height: calc(48px - 1.6rem);
    padding: 0.8rem 0;
    color: $text-main-color;
    display: inline-block;
    pointer-events: none;
    line-height: 2;
    
    p{
      display: none;
    }
  }
}

.lang {
  display: inline-block;
}
.lang2 {
  display: none;
}

@media screen and (max-width: 1200px) {
  .manage-wrapper {
    margin: 0rem auto;
    width: 90%;

    .job-manage-wrapper {
      width: 93%;
      height: calc(90vh - 5rem);
      border-radius: 20px;
      margin: 2rem 2rem;
    }
  }
}

/*タブレット*/
@media screen and (max-width: 900px) {
  .manage-wrapper {
    margin: 0rem auto;
    width: 90%;
  
    .job-manage-wrapper {
      width: calc(100% - 3rem);
      height: calc(90vh - 5rem);
      border-radius: 20px;
      margin: 2rem 1.5rem;
    }
  }
}

@media screen and (max-width: 768px) {
  .manage-wrapper {
    .job-manage-wrapper {
      .manage-job-area {
        @include box-shadow-manage;
        width: 33.1%;
        height: calc(68px - 1.6rem);
        padding: 0.8rem 0;
      }

      .apply-job-area {
        @include box-shadow-manage;
        width: 33.1%;
        height: calc(68px - 1.6rem);
        padding: 0.8rem 0;
      }

      .save-job-area {
        @include box-shadow-manage;
        width: 33.1%;
        height: calc(68px - 1.6rem);
        padding: 0.8rem 0;
      }

      .title-area {
        @include box-shadow-manage;
        width: 33.1%;
        height: calc(48px - 1.8rem);
        padding: 0.8rem 0;
      }

      .time-area {
        @include box-shadow-manage;
        width: 33.1%;
        height: calc(48px - 1.8rem);
        padding: 0.8rem 0;
      }
      .skill-area {
        @include box-shadow-manage;
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
      height: calc(90vh - 5rem);
      margin: 2rem auto;
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
    margin: 0;

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

    .job-manage-wrapper {
      width: 97%;
      height: calc(90vh - 5rem);
      margin: 2rem auto;
      position: relative;

      .job-area {
        display:flex;

        .job-area-box{
          width: 33.2%;
          height: 100%;
          padding: 0.8rem 0;
          color: $text-main-color;
          font-size: 14px;
          display: inline-block;
          pointer-events: none;

          p {
            display: inline;
          }
          span {
            display: none;
            height: calc(48px - 1.6rem);
          }  
        }
      }
    }
  }
}
</style>
