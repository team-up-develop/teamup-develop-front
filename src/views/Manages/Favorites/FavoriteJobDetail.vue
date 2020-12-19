<script lang="ts">
import Vue from 'vue';
import axios from 'axios'
import Applybtn from '@/components/Atoms/Button/Applybtn.vue'
import FavoriteDetailBtn from '@/components/Atoms/Button/FavoriteDetailBtn.vue'
import Loading from '@/components/Organisms/Commons/Loading/Loading.vue'
import ApplyModal from '@/components/Organisms/Modals/Applications/ApplyModal.vue'
import PostUser from '@/components/Organisms/Jobs/JobDetails/PostUser.vue'
import SkillJob from '@/components/Organisms/Jobs/JobDetails/SkillJob.vue'
import DetailJob from '@/components/Organisms/Jobs/JobDetails/DetailJob.vue'
// import GithubImage from '@/assets/github.png'
import { Job } from '@/types/job';

export type DataType = {
  job: any; //TODO: Any
  userId: number;
  selfJobPost: boolean;
  loginFlag: boolean; 
  loading: boolean;
  modal: boolean;
  statusId: number;
}

export default Vue.extend({ 
  props: {
    id: Number,
  },
  data(): DataType {
    return {
      job: {},
      userId: this.$store.state.auth.userId,
      selfJobPost: false, //? 自分の案件かを判定
      loginFlag: false, //? ログインしているかを判定
      loading: true, //? ローディング
      modal: false,
      statusId: 0
    }
  },
  computed: {
    // *応募しているか否か
    DoneApply() {
      if(this.statusId == 0) {
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
    // * 詳細画面情報を取得
    axios.get(`http://localhost:8888/api/v1/job/${this.id}/`)
    .then(response => {
      setTimeout(() => {
        this.loading = false;
        this.job = response.data
      }, 1000)
    })
  },
  created() {
    // * ログイン判定
    if(this.userId) {
      this.loginFlag = true
    } else {
      this.$router.push('/login');
    }

    // * 応募済みか応募済みでないかを判定
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.id }&user_id=${ this.userId }`)
    .then(response => {
      if(response.data.length == 0) {
        return 
      } else {
        this.statusId = response.data[0].applyStatusId
      }
    });

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
    // * エントリーが完了したら応募済みにする
    compliteEntry() {
      this.statusId = 1;
    },
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
      <router-link :to="`/manage/favorite_job`">
      <p>＜ 管理画面に戻る</p>
      </router-link>
    </div>
    <!-- 応募する モーダル画面 -->
    <ApplyModal @close="closeModal" v-if="modal">
      <p>応募を完了してよろしいですか？</p>
        <template slot="footer">
          <applybtn :jobId='id' @compliteEntry="compliteEntry"></applybtn>
          <button @click="doSend" class="modal-btn">キャンセル</button>
        </template>
    </ApplyModal>
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
          <div class="" v-if="selfJobPost">
            自分の案件
          </div>
          <div v-else>
            <div class="btn-box-apply-false" v-if="DoneApply">
              応募済み
            </div>
            <button @click="openModal" class="btn-box-apply" v-else>応募する</button>
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
  color: $white;
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
  height: 100px;

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
  color: $white;
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
  color: $white;
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

.favorite-btn-area {
  position: absolute;
  right: 0;
  top: 0;
  width: 20%;
  padding: 0.2rem 0 0 0 ;

  .heart {
    background-color: blue;
  }
}

.icon {
  font-size: 30px;
  padding: 10px;
  width: 38px;
  height: 38px;
  color: $white;
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
      .button-action-area {
        margin: 0em auto 0rem auto;
        width: 100%;
        position: relative;

        .btn-box-apply {
          width: 80%;
          padding: 1.2rem 2rem;
          font-size: 1rem;
        }

        //* 応募済みボタン 
        .btn-box-apply-false {
          width: 80%;
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
    // * 編集する
    .btn-box-edit {
      font-size: 1rem;
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
      height: 125px;

      .button-action-area {
        width: 95%;
      }
    }
  }
}
</style>