<script lang="ts">
import Vue from 'vue';
import axios from 'axios'
import moment from "moment";
import UserCard from '@/components/manage/UserCard.vue'
import JobsCard from '@/components/manage/JobsCard.vue'

export type DataType = {
  favoriteJobs: [];
  loginFlag: boolean;
  userId: number;
}

export default Vue.extend({ 
  components: {
    UserCard,
    JobsCard
  },
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
        this.favoriteJobs = response.data
      })
    }
    else {
      this.loginFlag = false;
      this.$router.push('/login');
    }
  }
});
</script>

<template>
  <section>
    <v-container class="wrapper" v-if="loginFlag === true">
      <v-row>
        <UserCard />
        <v-sheet class="manage">
          <v-row class="manage__header">
            <router-link to="/manage" class="router-link">
              <span>管理案件</span> 
            </router-link>
            <router-link to="/manage/apply_job" class="router-link">
              <span>応募案件</span>
            </router-link>
            <router-link to="/manage/favorite_job" class="router-link-active-click">
              <span>保存案件</span> 
            </router-link>
          </v-row>
          <v-col>
            <router-link 
              :to="`/manage/favorite_job/${ jobs.jobId }`" 
              v-for="jobs in favoriteJobs" 
              :key="jobs.id" 
              class="jobs"
            >
              <JobsCard :job="jobs.job"/>
            </router-link>
          </v-col>
        </v-sheet>
      </v-row>
    </v-container>
    <div v-else>
      ログインが必要です！
    </div>
  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.wrapper {
  width: 90%;
  max-width: none;

  @media screen and (max-width: 1100px) {
    width: 97%;
  }
}

.manage {
  @include card-border-color;
  width: 60%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
  font-size: 14px;
  padding: 2rem;
  color: $text-main-color;

  @media screen and (max-width: 1000px) {
    width: 50%;
  }

  @media screen and (max-width: 900px) {
    width: 85%;
  }

  @media screen and (max-width: 600px) {
    width: 95%;
  }

  @media screen and (max-width: 450px) {
    width: 98%;
    padding: 1rem;
  }

  &__header {
    .router-link {
      color: $text-main-color;
      text-decoration: none;
      width: 33.3%;
      padding: 0.7rem 0;
      border-bottom: grey 1px solid;
    }

    .router-link-active-click {
      font-weight: bold;
      color: $text-main-color;
      text-decoration: none;
      width: 33.3%;
      padding: 0.7rem 0;
      border-bottom: grey 1px solid;
      background-color: silver;
    }
  }
}
.jobs {
  text-decoration: none;
}

</style>