<script lang="ts">
import Vue from 'vue';
import axios from 'axios'
import moment from "moment";
import Applybtn from '@/components/button/Applybtn.vue'
import FavoriteDetailBtn from '@/components/button/FavoriteDetailBtn.vue'
import Loading from '@/components/common/loading/Loading.vue'
import ApplyModal from '@/components/modal/ApplyModal.vue'
// import GithubImage from '@/assets/github.png'
import { Job } from '@/types/job';

export type DataType = {
  job: Job;
  userId: number;
  selfJobPost: boolean; //? 自分の案件かを判定
  loginFlag: boolean; //? ログインしているかを判定
  loading: boolean;
  applyFlug: boolean;
  modal: boolean;
  // jobs: [],
  // assetsImage: GithubImage,
}

export default Vue.extend({ 
  props: {
    id: Number,
  },
  data(): DataType {
    return {
      job: {}, //! TODO: Type '{}' is missing the following properties from type 'Job':
      userId: this.$store.state.auth.userId,
      selfJobPost: false, //? 自分の案件かを判定
      loginFlag: false, //? ログインしているかを判定
      loading: true, //? ローディング
      applyFlug: true,
      modal: false,
      // jobs: [],
      // assetsImage: GithubImage,
    }
  },
  filters: {
    moment(value: string, format: string) {
      return moment(value).format(format);
    }
  },
  mounted() {
    // * 詳細画面情報を取得
    axios.get(`http://localhost:8888/api/v1/job/${this.id}/`)
    .then(response => {
      setTimeout(() => {
        this.loading = false;
        this.job = response.data
        console.log("よまれてるよ")
      }, 1000)
    })
  },
  created() {
    if(this.userId) {
      this.loginFlag = true
    } else {
      this.$router.push('/login');
    }
    // * ログインユーザーが応募済みか応募済みではないかを判定する
    axios.get(`http://localhost:8888/api/v1/apply_job/?user_id=${this.userId}`)
    .then(response => {
      const arrayApply = []
      for(let c = 0; c < response.data.length; c++){
        const applyData = response.data[c];
        arrayApply.push(applyData.job.id)
      }
      if (arrayApply.includes(this.id)) {
        this.applyFlug = false
      } else {
        console.log("まだ応募していません")
      }
    })
    // * 自分の案件かを判定
    axios.get(`http://localhost:8888/api/v1/job/?user_id=${this.userId}`)
    .then(response => {
      for(let i = 0; i < response.data.length; i++){
        const selfJob = response.data[i]
        if(selfJob.id === this.id){
          this.selfJobPost = true
        }
      }
    })
  },
  methods: {
    // * モーダルを開く
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    doSend() {
        this.closeModal()
    },
    getJob() {
      axios.get(`http://localhost:8888/api/v1/job/${this.id}/`)
        .then(response => {
          this.job = response.data
          console.log(this.job)
          console.log(this.id)
        })
    },
    // * Twitter をタブで開く
    twitterTab() {
      if(this.job.user.twitterAccount == null) {
        return this.job.user.twitterAccount;
      } else {
        const url: string = this.job.user.twitterAccount;
        return window.open(url);
      }
    },
    // * Github をタブで開く
    gitTab() {
      if(this.job.user.githubAccount == null) {
        return this.job.user.githubAccount;
      } else {
        const url: string = this.job.user.githubAccount;
        return window.open(url);
      }
    },
  },
  components: {
    Applybtn,
    FavoriteDetailBtn,
    Loading,
    ApplyModal,
  }
});
</script>

<template>
  <div class="detail-wrapper">
    <!-- 応募する モーダル画面 -->
    <div class="example-modal-window">
      <ApplyModal @close="closeModal" v-if="modal">
        <p>応募を完了してよろしいですか？</p>
        <template slot="footer">
          <applybtn :jobId='id'></applybtn>
          <button @click="doSend" class="modal-btn">キャンセル</button>
        </template>
      </ApplyModal>
    </div>
    <section v-if="loading == false">
      <div class="detail-post-user-area">
        <div class="detail-tag">投稿者</div>
        <div class="post-user-area">
          <div class="left-user-area">
            <div class="user-image"></div>
          </div>
          <div class="right-user-area">
            <div class="user-profile-area">
              <div class="user-name-are">
                <div class="user-name-tag">名前</div>
                <router-link :to="`/account/profile/${ job.userId }`"> 
                  <div class="user-name">
                    {{ job.user.userName }} 
                  </div>
                </router-link>
              </div>
              <div class="user-introduce-area">
                <div class="introduce-tag">学習開始</div>
                <div class="introduce">
                  {{ job.user.learningStartDate | moment("YYYY年 M月 D日") }}
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
        </div>
      </div>
      <div class="detail-post-skill-area">
        <div class="detail-tag">開発技術</div>
        <div class="skill-detail-area">
          <div class="lang-area">
            <label for="name" class="name-tag">開発言語</label>
            <div class="lang-box">
              <div class="skill-tag"  v-for="langage in job.programingLanguage" :key="langage.id">
                {{ langage.programingLanguageName }}
              </div>
            </div>
          </div>
          <div class="lang-area">
            <label for="name" class="name-tag">フレームワーク</label>
            <div class="lang-box">
              <div class="flame-tag" v-for="framework in job.programingFramework" :key="framework.programingFrameworkName">
                {{ framework.programingFrameworkName }}
              </div>
            </div>
          </div>
          <div class="lang-area">
            <label for="name" class="name-tag">その他関連スキル</label>
            <div class="lang-box">
              <div class="other-tag" v-for="skill in job.skill" :key="skill.skillName">
                {{ skill.skillName }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-post-detail-area">
        <div class="detail-area">
          <div class="detail-tag">開発詳細</div>
          <div class="dev-detail-area">
            <div class="detail-leff-area">
              <div class="detail-information">
                <div class="tag">タイトル</div>
                <div class="sub-area">{{ job.jobTitle }}</div>
              </div>
              <div class="detail-information">
                <div class="tag">募集人数</div>
                <div class="sub-area">{{ job.recruitmentNumbers }}人</div>
              </div>
              <div class="detail-information">
                <div class="tag">応募ケース</div>
                <div class="sub-area">新規開発</div>
              </div>
              <div class="detail-information">
                <div class="tag">開発期間</div>
                <div class="sub-area">{{ job.devStartDate | moment("YYYY年 M月 D日") }} ~ {{ job.devEndDate  | moment("YYYY年 M月 D日")}}</div>
              </div>
              <div class="detail-information">
                <div class="tag">応募ケース</div>
                <div class="sub-area">{{ job.jobDescription }}</div>
              </div>
            </div>
            <!-- <div class="detail-right-area">
              <div class="tag">募集内容詳細</div>
              <div class="description">
                {{ job.jobDescription }}
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="button-area">
        <div v-if="loginFlag === true" class="button-action-area">
          <div class="" v-if="selfJobPost">
            自分の案件
          </div>
          <div v-else>
            <button @click="openModal" class="btn-box-apply" v-if="applyFlug">応募する</button>
            <div class="btn-box-apply-false" v-if="applyFlug == false">
              応募済み
            </div>
            <div class="favorite-btn-area">
              <favorite-detail-btn :jobId='id'></favorite-detail-btn>
            </div>
          </div>
        </div>
        <div v-else>
          ログインが必要です！
        </div>
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
.detail-wrapper .detail-post-user-area .post-user-area {
  @include card-border-color;
  border-radius: 4px;
  padding: 2rem 4rem;
  margin-bottom: 2rem;
  position: relative;
  box-shadow: 0 2px 5px rgba(0,0,0,0.26);
}

/* ユーザー画像 start*/
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
    width: 70%;
    position: absolute;
    right: 0;
    top: 0;
    padding: 2rem 4rem 2rem 2rem;
    text-align: left;

    .user-profile-area {
      width: 65%;
      height: 100%;
      display: inline-block;
    }
  }
}

/* ユーザー 詳細情報 start */
.user-profile-area {
  .user-name-are {
    width: 45%;
    display: inline-block;

    .user-name-tag {
      font-weight: bold;
    }

    .user-name {
      margin-top: 0.2rem;
      font-size: 14px;
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
    margin-top: 3.2rem;

    .introduce-tag {
      font-weight: bold;
    }

    .introduce {
      margin-top: 0.2rem;
      font-size: 14px;
    }
  }
}

.post-user-area .right-user-area .user-url-area {
  display: inline-block;
  width: 30%;
  position: absolute;
  top: 0;
  padding: 2.2rem 0 0 0;

  .user-github {
    /* width: 35%;
    padding: 0.8rem 1rem;
    background-color: #24292e;
    border-radius: 5px / 5px;
    margin-right: 10px;
    color: #FFFFFF;
    text-align: center;
    box-shadow: 10px 5px 5px grey;
    box-shadow: 0 0 3px 0 rgba(122, 122, 122, 0.705), 0 2px 3px 0 rgba(156, 156, 156, 0.993);
    font-weight: bold; */
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }

  .user-twtter {
    margin-top: 2rem;
    width: 68%;
    padding: 0.8rem;
    background-color: #1DA1F2;
    border-radius: 5px / 5px;
    color: #FFFFFF;
    text-align: center;
    box-shadow: 10px 5px 5px grey;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12), 0 2px 3px 0 rgba(0, 0, 0, 0.22);
    font-weight: bold;
    cursor: pointer;

    :hover {
      opacity: 0.8;
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
    box-shadow: 0 2px 5px rgba(0,0,0,0.26);
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
    box-shadow: 0 2px 5px rgba(0,0,0,0.26);
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
    margin: 0em auto 4rem auto;
    width: 50%;
    position: relative;
  }
}

/* 応募するボタン */
.btn-box-apply {
  @include red-btn;
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
  width: 39%;
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
  width: 38px;
  height: 38px;
  color: $basic-white;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}

/* モーダル内のキャンセルボタン */
.modal-btn {
  @include blue-btn;
  padding: 1rem 2.4rem;
  border-radius: 50px;
  font-weight: 600;
  color: $basic-white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin-left: 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
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

      .right-user-area {
        width: 57%;
        position: absolute;
        right: 0;
        top: 0;
        padding: 2rem 4rem 2rem 2rem;
        text-align: left;

        .user-profile-area {
          width: 65%;
          height: 100%;
          display: inline-block;
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

        .right-user-area {
          width: 50%;
          position: absolute;
          right: 0;
          top: 0;
          padding: 2rem 4rem 2rem 2rem;
          text-align: left;

          .user-profile-area {
            width: 60%;
            height: 100%;
            display: inline-block;
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
        .right-user-area{
          width: 50%;
          position: absolute;
          right: 0;
          top: 0;
          padding: 2rem;
          text-align: left;
          .user-url-area {
            padding: 2.2rem 0 0 1rem;
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
          width: 38%;
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
        .right-user-area{
          width: 50%;
          position: absolute;
          right: 0;
          top: 0;
          padding: 1rem 2rem;
          text-align: left;
          
          .user-url-area {
            padding: 1rem 0 0 0.5rem;
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
          width: 55%;
          position: absolute;
          right: 0;
          top: 0;
          padding: 1rem 1rem;
          text-align: left;
          
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