<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from '@vue/composition-api';
import { API_URL } from '@/master'
import Vuex from '@/store/index'
import axios from 'axios'
import Loading from '@/components/Organisms/Commons/Loading/Loading.vue'
import PostUser from '@/components/Organisms/Jobs/JobDetails/PostUser.vue'
import SkillJob from '@/components/Organisms/Jobs/JobDetails/SkillJob.vue'
import DetailJob from '@/components/Organisms/Jobs/JobDetails/DetailJob.vue'
import BtnArea from '@/components/Organisms/Jobs/JobDetails/BtnArea.vue'
import { Job } from '@/types/job';

type State = {
  job: any; //TODO: Any
  userId: number;
  loading: boolean;
}

const initialState = (): State => ({
  job: {},
  userId: Vuex.state.auth.userId,
  loading: true,
});

export default defineComponent({ 
  components: {
    Loading,
    PostUser,
    SkillJob,
    DetailJob,
    BtnArea
  },
  props: {
    id: { type: Number, default: 0 }
  },
  setup: (props) => {
    const state = reactive<State>(initialState());

    // * 詳細画面情報を取得
    const getJobDetail = async () => {
      try { 
        const response = await axios.get<Job>(`${API_URL}/job/${props.id}/`)
        setTimeout(() => {
          state.loading = false;
          state.job = response.data
        }, 1000)
      } catch (error) {
        console.log(error)
      }
    };

    onMounted(() => {
      getJobDetail();
    });

    return {
      ...toRefs(state),
      getJobDetail,
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
      <BtnArea :id="id" :job="job" />
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
  }
}
</style>