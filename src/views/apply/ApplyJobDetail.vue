<script lang="ts">
import Vue from 'vue';
import axios from 'axios'
import moment from "moment";
import Applybtn from '@/components/button/Applybtn.vue'
import FavoriteDetailBtn from '@/components/button/FavoriteDetailBtn.vue'
import Loading from '@/components/common/loading/Loading.vue'
import ApplyModal from '@/components/modal/ApplyModal.vue'
import PostUser from '@/components/job/detail/PostUser.vue'
import SkillJob from '@/components/job/detail/SkillJob.vue'
import DetailJob from '@/components/job/detail/DetailJob.vue'
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
}
export default Vue.extend({ 
  props: {
    id: Number,
  },
  data(): DataType {
    return {
      job: {}, //! TODO: Type '{}' is missing the following properties from type 'Job':
      userId: this.$store.state.auth.userId,
      loginFlag: false, //? ログインしているかを判定
      loading: true, //? ローディング
      applyFlug: true,
      modal: false,
      // jobs: [],
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
          console.log(response.data)
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
          // this.loading = true;
          this.job = response.data
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
    }
  },
  components: {
    Applybtn,
    FavoriteDetailBtn,
    Loading,
    ApplyModal,
    PostUser,
    SkillJob,
    DetailJob
  }
});
</script>


<template>
  <div class="detail-wrapper">
    <div class="back-space">
      <router-link :to="`/manage/apply_job`">
      <p>＜ 管理画面に戻る</p>
      </router-link>
    </div>
    <section v-if="loading == false">
      <div class="detail-post-user-area">
        <div class="detail-tag">投稿者</div>
        <PostUser :job="job"/>
      </div>
      <div class="detail-post-skill-area">
        <div class="detail-tag">開発技術</div>
        <SkillJob :job="job"/>
      </div>
      <div class="detail-post-detail-area">
        <div class="detail-area">
          <div class="detail-tag">開発詳細</div>
          <DetailJob :job="job"/>
        </div>
      </div>
      <div class="button-area">
          <div v-if="loginFlag === true" class="button-action-area">
            <button @click="openModal" class="btn-box-apply" v-if="applyFlug">応募する</button>
            <div class="btn-box-apply-false" v-if="applyFlug == false">
              応募済み
            </div>
            <div class="favorite-btn-area">
              <favorite-detail-btn :jobId='id'></favorite-detail-btn>
            </div>
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

  .detail-post-skill-area {
    width: 80%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 auto 2rem auto;
  }

  .detail-post-detail-area {
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

.tag {
  font-weight: bold;
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
    margin: 0em auto 4rem auto;
    width: 50%;
    position: relative;
  }
}

//* 応募するボタン 
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

//* 応募済みボタン */
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
  width: 38px;
  height: 38px;
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

/* タブレットレスポンシブ */
@media screen and (max-width: 900px) {
  .detail-wrapper {
    width: 90%;

    .detail-post-user-area {
      width: 85%;
    }
    //* スキル カード 
    .detail-post-skill-area{
      width: 85%;
    }
    //* 詳細 カード 
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
    .detail-post-skill-area{
      width: 95%;
    }

    //* 詳細 カード 
    .detail-post-detail-area{
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

//* スマホレスポンシブ 
@media screen and (max-width: 500px) {
  .detail-wrapper{
    width:  97%;

    .detail-post-detail-area 
    .dev-detail-area {
      padding: 1.5rem 1rem;
    }

    .detail-post-user-area {
      width: 100%;
    }

    //** スキル カード 
    .detail-post-skill-area {
      width: 100%;
    }

    //* 詳細 カード 
    .detail-post-detail-area{
      width: 100%;
    }
  }
}

@media screen and (max-width: 420px) {
  .detail-wrapper {
    .detail-post-user-area {
      width: 100%;
    }
    //* スキル カード */
    .detail-post-skill-area {
      width: 100%;
    }
    //* 詳細 カード */
    .detail-post-detail-area {
      width: 100%;
    }
    //* ボタンエリア */
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