<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import ProfileEditModal from '@/components/Organisms/Modals/Edit/ProfileEditModal.vue'
import PostUser from '@/components/Organisms/Users/PostUser.vue'
import SkillUser from '@/components/Organisms/Users/SkillUser.vue'
import IntroduceUser from '@/components/Organisms/Users/IntroduceUser.vue'
// import Logout from '@/components/button/Logout'

export type DataType = {
  myselfFlag: boolean;
  userInfo: any;
  userId: number;
  modal: boolean;
  // loading: boolean;
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
      // loading: true, //? ローディング
    }
  },
  created() {
    if(this.userId == this.id) {
      this.myselfFlag = true
    }
    // TODO: websocket
    // const ws = (this.ws = new WebSocket(`ws://${location.host}/websocket`));
    // console.log(ws)
    // // * 接続が確認された時
    // ws.onopen = () => {
    //   console.log("sucsess")
    // };
    // ws.onmessage = message => {
    //   this.messages.push(message.data);
    // };

    // * ユーザー情報取得
    axios.get(`http://localhost:8888/api/v1/user/${this.id}`)
    .then(response => {
      // setTimeout(() => {
      //   this.loading = false;
        this.userInfo = response.data;
      // }, 1000)
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
        // this.loading = true;
        // setTimeout(() => {
          // this.loading = false;
        this.userInfo = response.data;
        // }, 1000)
      })
      .catch(error => {
        console.log(error)
      })
    },
    editEmit() {
      this.openModal();
    }
  },
  components: {
    ProfileEditModal,
    // Logout
    // Loading,
    PostUser,
    SkillUser,
    IntroduceUser
  }
});
</script>

<template>
  <section>
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
          <PostUser :user="userInfo" 
            @editEmit="editEmit()" 
            :myselfFlag="myselfFlag"
          />
          <v-row class="header">
            <router-link :to="`/account/profile/${ id }`" class="router-link-active-click">
              <span>プロフィール</span>
            </router-link>
            <router-link :to="`/account/profile/${ id }/jobs`" class="router-link">
              <span>投稿案件</span> 
            </router-link>
          </v-row>
        </div>
      </section>
      <v-col class="skill">
        <div class="skill__card">
          <div class="detail-tag">開発スキル</div>
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
          <div v-if="myselfFlag === true" class="button-action-area">
            <button @click="openModal" class="btn-box-edit" >編集する</button>
          </div>
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

.button-area {
  display: none;
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

@media screen and (max-width: 650px) {
  .button-area {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    bottom: 0;

  //* 編集するボタン 
    .btn-box-edit {
      @include box-shadow-btn;
      background-color: $secondary-color;
      color: $white;
      padding: 1.2rem 8rem;
      transition: .3s;
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

      &:hover {
        @include btn-hover;
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