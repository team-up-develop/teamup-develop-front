<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import ProfileEditModal from '@/components/modal/ProfileEditModal.vue'
import PostUser from '@/components/user/PostUser.vue'
import { ManageJob } from '@/types/manage';
import CardJob from '@/components/job/CardJob.vue'
// import Logout from '@/components/button/Logout'

export type DataType = {
  myselfFlag: boolean;
  userInfo: any;
  userId: number;
  modal: boolean;
  manageJobs: ManageJob[];
}

export default Vue.extend({
  props: {
    id: Number
  },
  data(): DataType {
    return {
      myselfFlag: false,
      userInfo: {},
      userId: this.$store.state.auth.userId,
      modal: false,
      manageJobs: []
    }
  },
  created() {
    if(this.userId == this.id) {
      this.myselfFlag = true
    }

    axios.get(`http://localhost:8888/api/v1/job/?user_id=${this.userId}`)
    .then(response => {
      this.manageJobs = response.data
    })

    // * ユーザー情報取得
    axios.get(`http://localhost:8888/api/v1/user/${this.id}`)
    .then(response => {
      this.userInfo = response.data;
    })
  },
  methods: {
    // * モーダル
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    doSend() {
      this.closeModal()
    },
    // * 編集完了 emit
    compliteEdit() {
      this.closeModal();
      // * ユーザー情報取得
      axios.get(`http://localhost:8888/api/v1/user/${this.id}`)
      .then(response => {
        this.loading = true;
          this.userInfo = response.data;
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  components: {
    ProfileEditModal,
    PostUser,
    CardJob
  }
});
</script>

<template>
  <section>
    <div class="detail-wrapper">
      <!-- 編集 モーダル画面 -->
      <ProfileEditModal :userInfo="userInfo" @close="closeModal" @compliteEdit="compliteEdit()" v-if="modal" />
      <section class="user-area">
        <div class="user-area__post">
          <PostUser :user="userInfo" />
          <v-row class="header">
            <router-link :to="`/account/profile/${ id }`" class="router-link">
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
          <div v-if="myselfFlag === true" class="button-action-area">
            <button @click="openModal" class="btn-box-edit" >編集する</button>
          </div>
          <!-- 非ログイン時 リダイレクトさせる -->
          <div class="button-action-area" v-else>
          </div>
        </div>
    </div>
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
  color: $basic-white;
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

  .jobs {
    width: 100%;
    background-color: #F1F5F9;
    margin: 0 auto;

    &__card {
      margin-left: 1rem;
      width: 560px;
      margin: 0 auto;
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
  }
}
</style>