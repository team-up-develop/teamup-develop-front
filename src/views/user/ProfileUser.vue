<template>
  <div class="detail-wrapper">
  <!-- 編集 モーダル画面 -->
  <div class="example-modal-window">
    <profile-edit-modal @close="closeModal" v-if="modal">
      <p class="label-lang">プロフィール編集</p>
      <label for="name">名前</label>
      <input type="text" v-model="userName">
      <br>
      <label for="name">学習開発開始時期</label>
      <input type="date" v-model="learningStartDate">
      <br>
      <label for="name">自己紹介</label>
      <textarea type="text" v-model="bio"></textarea>
      <br>
      <label for="name">GitHub</label>
      <input type="url" v-model="githubAccount">
      <br>
      <label for="name">Twitter</label>
      <input type="url" v-model="githubAccount">
      <br>
      <template slot="footer">
        <div class="serach-btn" @click="profileEdit">
          編集
        </div>
      </template>
    </profile-edit-modal>
  </div>
    <section v-if="loading == false">
      <div class="detail-post-user-area">
        <div class="detail-tag">投稿者</div>
        <v-card class="post-user-area">
          <div class="left-user-area">
            <div class="user-image"></div>
          </div>
          <div class="right-user-area">
            <div class="user-profile-area">
              <div class="user-name-are">
                <div class="user-name-tag">名前</div>
                <router-link :to="`/`"> 
                  <div class="user-name">
                    {{ userInfo.userName }}
                  </div>
                </router-link>
              </div>
              <div class="user-introduce-area">
                <div class="introduce-tag">学習開始</div>
                <div class="introduce">
                  {{ userInfo.learningStartDate | moment("YYYY年 M月 D日")}}
                </div>
              </div>
            </div>
            <div class="user-url-area">
              <div class="user-github" @click="gitTab">
                <img class="img" src="@/assets/github.png" width="50" />
                </div>
              <div class="user-twtter" @click="twitterTab">
                Twiiter
              </div>
            </div>
          </div>
        </v-card>
      </div>
      <div class="detail-post-skill-area">
        <div class="detail-tag">経験スキル</div>
        <v-card class="skill-detail-area">
          <div class="lang-area">
            <label for="name" class="name-tag">開発言語</label>
            <div class="lang-box">
              <div class="skill-tag">
                JavaScript ハリボテ
              </div>
            </div>
          </div>
          <div class="lang-area">
            <label for="name" class="name-tag">フレームワーク</label>
            <div class="lang-box">
              <div class="flame-tag">
                Vue ハリボテ
              </div>
            </div>
          </div>
          <div class="lang-area">
            <label for="name" class="name-tag">その他関連スキル</label>
            <div class="lang-box">
              <div class="other-tag">
                Docker ハリボテ
              </div>
            </div>
          </div>
        </v-card>
      </div>
      <div class="detail-post-detail-area">
        <div class="detail-area">
          <div class="detail-tag">自己紹介</div>
          <v-card class="dev-detail-area">
            <div class="detail-leff-area">
              <div class="detail-information">
                <div class="tag"></div>
                <div class="sub-area">
                  応募の情報をここに記載する予定です”””””””応募の情報をここに記載する予定です”””””””！！！！！！
                  ！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！
                  応募の情報をここに記載する予定です”””””””！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！
                  応募の情報をここに記載する予定です”””””””！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！
                  応募の情報をここに記載する予定です”””””””！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！
                  応募の情報をここに記載する予定です”””””””！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！
                  応募の情報をここに記載する予定です”””””””！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！
                  応募の情報をここに記載する予定です”””””””！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！
                  </div>
              </div>
              </div>
          </v-card>
        </div>
      </div>
      <div class="button-area">
          <div v-if="myselfFlag === true" class="button-action-area">
            <button @click="openModal" class="btn-box-apply" >編集する</button>
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
import moment from "moment";
import Loading from '@/components/common/loading/Loading.vue'
import ProfileEditModal from '@/components/modal/ProfileEditModal'
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
  filters: {
    // * date型を文字に変換
    moment(value, format) {
      return moment(value).format(format);
    },
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
  }
}

.detail-tag {
  color: $primary-color;
  text-align: left;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 0.7rem;
}

/* 投稿者 カード中身 */
.detail-wrapper 
.detail-post-user-area 
.post-user-area {
  @include card-border-color;
  border-radius: 4px;
  padding: 2rem 4rem;
  margin-bottom: 2rem;
  position: relative;
}

// * ユーザー画像 start
.post-user-area {
  .left-user-area {
    width: 20%;
    height: 100%;

    .user-image {
      @include user-image;
      width: 130px;
      height: 130px;
    }
  }

  .right-user-area {
    width: 75%;
    position: absolute;
    right: 0;
    top: 0;
    padding: 1.8rem 2rem 0 2rem;
    text-align: left;
    .user-profile-area {
      height: 80%;
      width: 70%;
      display: inline-block;
    }

    .user-url-area {
      display: inline-block;
      width: 140px;
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.5rem 0 0 0;

      .user-github {
        cursor: pointer;
        display: inline-block;
        margin-right: 0.5rem;

        :hover {
          opacity: 0.8;
        }
      }

      .user-twtter {
        // margin-top: 2rem;
        width: 45px;
        height: 45px;
        padding: 0.2rem;
        background-color: #1DA1F2;
        border-radius: 50%;
        color: #FFFFFF;
        text-align: center;
        box-shadow: 10px 5px 5px grey;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12), 0 2px 3px 0 rgba(0, 0, 0, 0.22);
        font-weight: bold;
        cursor: pointer;
        display: inline-block;

        :hover {
          opacity: 0.8;
        }
      }
    }
  }
}

// * ユーザー 詳細情報 start
.user-profile-area {
  .user-name-are {
    width: 45%;
    display: inline-block;

    .user-name-tag {
      font-weight: bold;
    }

    .user-name {
      margin-top: 0.2rem;
      font-size: 16px;
    }
  }

  .user-study-area {
    width: 45%;
    display: inline-block;

    .study-tag {
      font-weight: bold;
      width: 45%;
    }

    .stydy-time {
      margin-top: 0.2rem;
    }
  }

  .user-introduce-area {
    margin-top: 2rem;

    .introduce-tag {
      font-weight: bold;
    }

    .introduce {
      margin-top: 0.2rem;
      font-size: 14px;
    }
  }
}


/* スキル カード */
.detail-wrapper .detail-post-skill-area {
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0 auto 2rem auto;

  .skill-detail-area {
    @include card-border-color;
    border-radius: 4px;
    padding: 1.5rem 4rem 1rem 4rem;
    margin-bottom: 2rem;
    position: relative;
  }
}

.skill-detail-area .lang-area {
  width: 100%;
  position: relative;

  .name-tag {
    font-weight: bold;
    text-align: left;
    position: absolute;
    left: 0;
  }

  .lang-box {
    width: 95%;
    text-align: left;
    padding: 10px 20px 30px 0;

    .skill-tag {
      @include detail-language;
    }

    .flame-tag {
      @include detail-framework;
    }

    .other-tag {
      @include detail-skill;
    }
  }
}

/* 開発詳細 カード */
.detail-wrapper .detail-post-detail-area {
  width: 80%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0 auto;

  .dev-detail-area {
    @include card-border-color;
    border-radius: 4px;
    padding: 1rem 4rem 1rem 4rem;
    margin-bottom: 2rem;
    position: relative;
    line-height: 1.8;
  }
}

.dev-detail-area .detail-leff-area {
  display: inline-block;
  width: 100%;
  height: 100%;

  .detail-information {
    margin-top: 1px;
    padding: 1rem 0;
    position: relative;
    flex-direction: column;
  }
}

.tag {
  font-weight: bold;
}

.detail-information .sub-area {
  right: 0;
  font-size: 14px;
}

.dev-detail-area .detail-right-area {
  line-height: 1.8;
  width: calc(50% - 5rem);
  display: inline-block;
  top: 0;
  padding: 2.5rem 5rem 0 0;
}

/* ボタン エリア */
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
    width: 60%;
    position: relative;
  }
}

/* 応募するボタン */
.btn-box-apply {
  @include red-btn;
  @include box-shadow-btn;
  color: $basic-white;
  width: 60%;
  padding: 1.2rem 4rem;
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

/* 応募済みボタン */
.btn-box-apply-false {
  @include grey-btn;
  @include box-shadow-btn;
  color: $basic-white;
  position: absolute;
  left: 0;
  top: 0;
  width: 60%;
  padding: 1.2rem 4rem;
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
}

.favorite-btn-area {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
}

.icon {
  font-size: 30px;
  padding: 10px;
  width: 50px;
  height: 50px;
  color: $basic-white;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}

// * モーダル内のキャンセルボタン 
.modal-btn {
  @include red-cancel-btn;
  @include box-shadow-btn;
  padding: 1rem 2.4rem;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin-left: 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  outline: none;
}

@media screen and (max-width: 1200px) {
  .detail-wrapper {

    .post-user-area{

      .left-user-area {
        width: 20%;
        height: 100%;

        .user-image {
          @include user-image;
          width: 130px;
          height: 130px;
        }
      }
    }
  }
}
/* タブレットレスポンシブ */
@media screen and (max-width: 900px) {
  .detail-wrapper {
    width: 90%;

    .detail-post-user-area{
      width: 85%;

      .post-user-area{

        .left-user-area {
          width: 20%;
          height: 100%;

          .user-image {
            @include user-image;
            width: 130px;
            height: 130px;
          }
        }
      }
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

      .post-user-area{
        padding: 2rem;

        .left-user-area{

          .user-image{
            width: 120px;
            height: 120px;
          }
        }
      }
    }
    /* スキル カード */
    .detail-post-skill-area{
      width: 95%;
    }
    /* 詳細 カード */
    .detail-post-detail-area{
      width: 95%;
    }
    /* ボタンエリア */
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

        /* 応募済みボタン */
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
  .detail-wrapper{
    width:  97%;

    .detail-post-detail-area 
    .dev-detail-area {
      padding: 1.5rem 1rem;
    }

    .detail-post-user-area{
      width: 100%;

      .post-user-area{
        padding: 1.5rem 1rem;

        .left-user-area{
          .user-image{
            width: 100px;
            height: 100px;
          }
        }
      }
    }
    /* スキル カード */
    .detail-post-skill-area{
      width: 100%;

      .skill-detail-area {
        padding: 1.5rem 1rem;
      }
    }
    /* 詳細 カード */
    .detail-post-detail-area{
      width: 100%;
    }
  }
}

@media screen and (max-width: 420px) {
.detail-wrapper{
    .detail-post-user-area{
      width: 100%;
      .post-user-area{
        padding: 2.5rem 1rem;
        .left-user-area{
          .user-image{
            width: 80px;
            height: 80px;
          }
        }
        .right-user-area{
          
          .user-url-area {
            padding: 1rem 0 0 0.5rem;
          }
        }
      }
    }
    /* スキル カード */
    .detail-post-skill-area{
      width: 100%;
    }
    /* 詳細 カード */
    .detail-post-detail-area{
      width: 100%;
    }
    /* ボタンエリア */
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