<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Loading from '@/components/common/loading/Loading.vue'
import ProfileEditModal from '@/components/modal/ProfileEditModal.vue'
import PostUser from '@/components/user/PostUser.vue'
import SkillUser from '@/components/user/SkillUser.vue'
import IntroduceUser from '@/components/user/IntroduceUser.vue'
// import Logout from '@/components/button/Logout'

export type DataType = {
  myselfFlag: boolean;
  userInfo: any;
  userId: number;
  modal: boolean;
  loading: boolean;
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
      loading: true, //? ローディング
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
      setTimeout(() => {
        this.loading = false;
        this.userInfo = response.data;
      }, 1000)
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
        setTimeout(() => {
          this.loading = false;
          this.userInfo = response.data;
        }, 1000)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  components: {
    ProfileEditModal,
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
  <!-- 編集 モーダル画面 -->
  <div class="example-modal-window">
    <ProfileEditModal :userInfo="userInfo" @close="closeModal" @compliteEdit="compliteEdit()" v-if="modal" />
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
          <IntroduceUser :user="userInfo" />
        </div>
      </div>
      <div class="button-area">
        <div v-if="myselfFlag === true" class="button-action-area">
          <button @click="openModal" class="btn-box-edit" >編集する</button>
        </div>
        <!-- 非ログイン時 リダイレクトさせる -->
        <div class="button-action-area" v-else>
        </div>
      </div>
    </section>
    <Loading v-else>
    </Loading>
  </div>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.detail-tag {
  color: $primary-color;
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

  .button-action-area {
    margin: 0em auto 0.5rem auto;
    width: 100%;
    position: relative;
  }
}

//* 編集するボタン 
.btn-box-edit {
  @include box-shadow-btn;
  @include blue-btn;
  color: $basic-white;
  padding: 1.2rem 8rem;
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
    @include btn-hover;
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

    //* ボタンエリア 
    .button-area {
      width: 90%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      position: -webkit-sticky;
      position: sticky;
      left: 0;
      bottom: 0;

      .button-action-area {
        margin: 0em auto 4rem auto;
        width: 100%;
        position: relative;

        .btn-box-apply {
          position: absolute;
          left: 0;
          top: 0;
          width: 60%;
          padding: 1.2rem 2rem;
          font-size: 1rem;
        }

        //* 応募済みボタン 
        .btn-box-apply-false {
          position: absolute;
          left: 0;
          top: 0;
          width: 60%;
          padding: 1.2rem 2rem;
          font-size: 1rem;
        }
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
  .btn-box-edit {
    font-size: 1rem;
    padding: 1.2rem 6rem;
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
    //* ボタンエリア 
    .button-area {
      .button-action-area {
        margin: 0em auto 4rem auto;
        width: 95%;
        position: relative;
      }
    }
  }
}
</style>