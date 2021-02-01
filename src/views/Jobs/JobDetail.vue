<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
import Vuex from "@/store/index";
import { API_URL, catchError } from "@/master";
import axios from "axios";
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import PostUser from "@/components/Organisms/Jobs/JobDetails/PostUser.vue";
import SkillJob from "@/components/Organisms/Jobs/JobDetails/SkillJob.vue";
import DetailJob from "@/components/Organisms/Jobs/JobDetails/DetailJob.vue";
import BtnArea from "@/components/Organisms/Jobs/JobDetails/BtnArea.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import { FetchJobs } from "@/types/fetch";

type State = {
  job: any;
  userId: number;
  loading: boolean;
};

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
    BtnArea,
    Breadcrumbs,
  },
  props: {
    id: { type: Number, default: 0 },
  },
  setup: (props) => {
    const state = reactive<State>(initialState());

    const breadcrumbs = computed(() => [
      {
        text: "探す",
        href: "/jobs",
        disabled: false,
      },
      {
        text: "案件詳細",
        disabled: true,
      },
    ]);

    // * 詳細画面情報を取得
    const getJobDetail = async () => {
      try {
        const res = await axios.get<FetchJobs>(`${API_URL}/job/${props.id}`);
        setTimeout(() => {
          state.loading = false;
          state.job = res.data.response;
        }, 1000);
      } catch (error) {
        catchError(error);
      }
    };
    getJobDetail();

    onMounted(() => {
      if (!state.userId) {
        return;
      }
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      getJobDetail,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <div class="detail-wrapper">
      <section v-if="loading == false">
        <div class="detail-post-user-area">
          <div class="detail-tag">投稿者</div>
          <PostUser :job="job" />
        </div>
        <div class="detail-post-skill-area">
          <div class="detail-tag">開発技術</div>
          <SkillJob :job="job" />
        </div>
        <div class="detail-post-detail-area">
          <DetailJob :job="job" />
        </div>
        <BtnArea :id="id" :job="job" />
      </section>
      <Loading v-else> </Loading>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.router {
  text-decoration: none;
  color: $white;
}

.detail-wrapper {
  width: 85%;
  padding: 3.5rem 0rem;
  margin: 0 auto;
  position: relative;

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
    .detail-post-skill-area {
      width: 85%;
    }
    //* 詳細 カード
    .detail-post-detail-area {
      width: 85%;
    }
  }
}

@media screen and (max-width: 768px) {
  .detail-wrapper {
    .detail-post-user-area {
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
  }
}

//* スマホレスポンシブ
@media screen and (max-width: 500px) {
  .detail-wrapper {
    width: 97%;

    .detail-post-detail-area .dev-detail-area {
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
    .detail-post-detail-area {
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
