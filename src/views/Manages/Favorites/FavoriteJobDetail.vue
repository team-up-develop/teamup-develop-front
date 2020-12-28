<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed
} from '@vue/composition-api';
import { API_URL } from '@/master'
import Vuex from '@/store/index'
import axios from 'axios'
import Applybtn from '@/components/Atoms/Button/Applybtn.vue'
import FavoriteDetailBtn from '@/components/Atoms/Button/FavoriteDetailBtn.vue'
import Loading from '@/components/Organisms/Commons/Loading/Loading.vue'
import ApplyModal from '@/components/Organisms/Modals/Applications/ApplyModal.vue'
import PostUser from '@/components/Organisms/Jobs/JobDetails/PostUser.vue'
import SkillJob from '@/components/Organisms/Jobs/JobDetails/SkillJob.vue'
import DetailJob from '@/components/Organisms/Jobs/JobDetails/DetailJob.vue'

type State = {
  job: any; //TODO: Any
  userId: number;
  selfJobPost: boolean;
  loading: boolean;
  modal: boolean;
  statusId: number;
}

const initialState = (): State => ({
  job: {},
  userId: Vuex.state.auth.userId,
  selfJobPost: false,
  loading: true,
  modal: false,
  statusId: 0
});

export default defineComponent({ 
  components: {
    Applybtn,
    FavoriteDetailBtn,
    Loading,
    ApplyModal,
    PostUser,
    SkillJob,
    DetailJob
  },
  props: {
    id: { type: Number, default: 0 }
  },
  setup: (props) => {
    const state = reactive<State>(initialState());

    const isLogin = computed(() => {
      if(state.userId) {
        return true
      } else {
        return false
      }
    });

    const DoneApply = computed(() => {
      if(state.statusId == 0) {
        return false
      }
      return true
    });

    const openModal = () => state.modal = true;
    const closeModal = () => state.modal = false;
    const doSend = () => closeModal();

    const compliteEntry = () => state.statusId = 1;

    onMounted(() => {
      // * 詳細画面情報を取得
      axios.get(`${API_URL}/job/${props.id}/`)
      .then(response => {
        setTimeout(() => {
          state.loading = false;
          state.job = response.data
        }, 1000)
      })
      // * 応募済みか応募済みでないかを判定
      axios.get(`${API_URL}/apply_job/?job_id=${ props.id }&user_id=${ state.userId }`)
      .then(response => {
        if(response.data.length == 0) {
          return 
        } else {
          state.statusId = response.data[0].applyStatusId
        }
      });
      // * 自分の案件かを判定
      axios.get(`${API_URL}/job/?user_id=${state.userId}`)
      .then(response => {
        for(let i = 0; i < response.data.length; i++){
          const selfJob = response.data[i]
          if(selfJob.id === props.id){
            state.selfJobPost = true
          }
        }
      })
    });

    return {
      ...toRefs(state),
      isLogin,
      DoneApply,
      openModal,
      closeModal,
      doSend,
      compliteEntry
    }
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
          <Applybtn :jobId='id' @compliteEntry="compliteEntry"></Applybtn>
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
        <div v-if="isLogin" class="button-action-area">
          <div class="" v-if="selfJobPost">
            自分の案件
          </div>
          <div v-else>
            <div class="btn-box-apply-false" v-if="DoneApply">
              応募済み
            </div>
            <button @click="openModal" class="btn-box-apply" v-else>応募する</button>
            <div class="favorite-btn-area">
              <FavoriteDetailBtn :jobId='id' />
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
  @include neumorphism;
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
  @include neumorphismGrey;
  color: #D81B60;
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