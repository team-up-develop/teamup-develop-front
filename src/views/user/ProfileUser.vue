<template>
  <div class="detail-wrapper">
  <!-- 編集 モーダル画面 -->
  <div class="example-modal-window">
    <profile-edit-modal @close="closeModal" v-if="modal">
      <section>
        <p class="label-lang">プロフィール編集</p>
        <label for="name" class="label">名前</label>
        <input type="text" v-model="userName" class="edit-value">
        <br>
        <label for="name" class="label">学習開発開始時期</label>
        <input type="date" v-model="learningStartDate" class="edit-value">
        <br>
        <label for="name" class="label">自己紹介</label>
        <textarea type="text" v-model="bio" class="edit-text-value"></textarea>
        <br>
        <label for="name" class="label">GitHub</label>
        <input type="url" v-model="githubAccount" class="edit-value">
        <br>
        <label for="name" class="label">Twitter</label>
        <input type="url" v-model="githubAccount" class="edit-value">
        <br>
        <template>
          <div class="serach-btn" @click="profileEdit">
            編集する
          </div>
        </template>
      </section>
    </profile-edit-modal>
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

<script>
import axios from 'axios';
import Loading from '@/components/common/loading/Loading.vue'
import ProfileEditModal from '@/components/modal/ProfileEditModal'
import PostUser from '@/components/user/PostUser.vue'
import SkillUser from '@/components/user/SkillUser.vue'
import IntroduceUser from '@/components/user/IntroduceUser.vue'
// import Logout from '@/components/button/Logout'
export default {
  props: {
    id: Number
  },
  data() {
    return {
      myselfFlag: false,
      userInfo: {},
      userId: this.$store.state.auth.userId,
      activeTab: '1', //? タブ
      isActive: true, //? タブ
      hasError: false,
      modal: false,
      userName: "",
      learningStartDate: Date,
      bio: "",
      githubAccount: "",
      twitterAccount: "",
      messages: "Test",
      loading: true, //? ローディング
    }
  },
  created() {
    if(this.userId == this.id) {
      this.myselfFlag = true
    }
    const ws = (this.ws = new WebSocket(`ws://${location.host}/websocket`));
    console.log(ws)
    // * 接続が確認された時
    ws.onopen = () => {
      console.log("sucsess")
    };
    ws.onmessage = message => {
      this.messages.push(message.data);
    };

    // * ユーザー情報取得
      axios.get(`http://localhost:8888/api/v1/user/${this.id}`)
      .then(response => {
        setTimeout(() => {
          this.loading = false;
          this.userInfo = response.data;
          this.userName = this.userInfo.userName; //? ユーザー名前モーダル
          this.learningStartDate = this.userInfo.learningStartDate;
          this.bio = this.userInfo.bio;
          this.githubAccount = this.userInfo.githubAccount;
          this.twitterAccount = this.userInfo.twitterAccount;
        }, 1000)
      // .catch(error => {
      //   console.log(error)
      // })
    }, 2000)
  },
  methods: {
    send() {
      console.log("aaaaaaa")
      console.log(this.ws)
      // * メッセージを送信する
      this.ws.send(this.message);
    },
    // * 編集する
    profileEdit() {
      const params = {
        userName: this.userName,
        learningStartDate: this.learningStartDate,
        bio: this.bio,
        githubAccount: this.githubAccount,
        twitterAccount: this.twitterAccount,
      }
      axios.put(`http://localhost:8888/api/v1/user/${this.id}`, params)
      .then(response => {
        console.log(response.data)
        // this.$emit('compliteAssgin', this.message)
      })
      .catch(error => {
        console.log(error)
      })
    },
    // * タブの切り替え
    change: function(num){
      this.isActive = !this.isActive ;
      this.activeTab = num
    },
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
  },
  components: {
    ProfileEditModal,
    // Logout
    Loading,
    PostUser,
    SkillUser,
    IntroduceUser
  }
}
</script>

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

// * モーダル
section {
  .label-lang {
    font-weight: bold;
  }
  .label {
    display: block;
    font-weight: bold;
  }
  .edit-value {
    display: block;
    width: 100%;
    height: 48px;
    padding: 0.5rem;
    background-color: $sub-white;
  }
  .edit-text-value {
    display: block;
    width: 100%;
    height: 120px;
    padding: 0.5rem;
    background-color: $sub-white;
  }
  .serach-btn {
    @include box-shadow-btn;
    @include blue-btn;
    color: $basic-white;
    text-align: left;
    display: block;
    padding: 1.1rem 4rem;
    border-radius: 25px;
    border: none;
    font-size: .875rem;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: right;
    margin-top: 1.5rem;
    cursor: pointer;
    transition: .3s;
    outline: none;
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