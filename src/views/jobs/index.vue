<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  SetupContext,
  computed,
} from "@vue/composition-api";
import { $fetch, $post } from "@/libs/axios";
import { API_URL, AUTH_URL, m } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { truncate } from "@/hooks/useUtils";
import VButton from "@/components/Atoms/VButton/VButton.vue";
import {
  JobRightLogin,
  CardJob,
  JobCardDetail,
} from "@/components/Organisms/Jobs";
import {
  LanguageSearchModal,
  FrameworkSearchModal,
  SkillSearchModal,
} from "@/components/Organisms/Modals/Searches";
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import Confirme from "@/components/Organisms/Modals/Actions/Confirme.vue";
import { dayJsFormat } from "@/libs/dayjs";
import { Job, Fetch } from "@/types/index";
import Vuex from "@/store/index";
import { encode } from "@/libs/jsBase64";
import { useJobs } from "@/hooks";
import { checkSelfJob, isStatusNew } from "@/modules/jobs";
import { ApplyParams } from "@/types/params";
import { useUtils } from "@/hooks";

type State = {
  jobs: Job[];
  jobsNullFlag: boolean;
  freeWord: string;
  loading: boolean;
  circleLoading: boolean;
  jobDetail: any;
  detailFlag: boolean;
  isSelfJob: boolean;
  applyFlug: boolean;
  id: number; //? clickした案件のIdを取得
  modal: boolean;
  userId: number;
  entryRedirect: boolean;
  langModal: boolean;
  frameworkModal: boolean;
  skillModal: boolean;
  page: number;
  displayJobs: Job[];
  jobsPageSize: number;
  paginationLength: number;
};

const initialState = (ctx: SetupContext): State => ({
  jobs: [],
  jobsNullFlag: false,
  freeWord: ctx.root.$store.getters.freeWord,
  loading: true,
  circleLoading: true,
  jobDetail: null,
  detailFlag: false,
  isSelfJob: false,
  applyFlug: true,
  id: 0,
  modal: false,
  userId: ctx.root.$store.getters.userId,
  entryRedirect: false,
  langModal: false,
  frameworkModal: false,
  skillModal: false,
  page: 1,
  displayJobs: [],
  jobsPageSize: 10, //FIXME: 開発に応じて仮で置いています。正規 20
  paginationLength: 0,
});

export default defineComponent({
  components: {
    Loading,
    // CircleLoading,
    // Applybtn,
    Confirme,
    CardJob,
    LanguageSearchModal,
    FrameworkSearchModal,
    SkillSearchModal,
    JobRightLogin,
    JobCardDetail,
    VButton,
  },
  setup: (_, ctx) => {
    const state = reactive<State>(initialState(ctx));

    const fetchData = async () => {
      // * 投稿一覧取得
      const posts: Job[] = [];
      try {
        const res = await $fetch<Fetch<Job[]>>(`${API_URL}/jobs`);
        state.jobs = res.data.response;
        paginateJobs(state.jobs);

        //* トップページから フリーワード 検索をした際の処理
        if (state.freeWord.length > 0) {
          res.data.response.map((v) => {
            if (
              v.job_description?.indexOf(state.freeWord) !== -1 ||
              v.job_title.indexOf(state.freeWord) !== -1
            ) {
              posts.push(v);
            }
          });
          state.jobs = posts;
          paginateJobs(state.jobs);
        }
        // * トップページから 開発言語 検索した際の処理
        if (ctx.root.$store.getters.language.length !== 0) {
          skillQueryParameter(ctx.root.$store.getters.language, "pl_id");
        }
        // * トップページから フレームワーク 検索した際の処理
        else if (ctx.root.$store.getters.framwork.length !== 0) {
          skillQueryParameter(ctx.root.$store.getters.framwork, "pf_id");
        }
        // * トップページから その他スキル 検索した際の処理
        else if (ctx.root.$store.getters.skill.length !== 0) {
          skillQueryParameter(ctx.root.$store.getters.skill, "skill_id");
        }
        // * もし案件が存在しなかったら処理が走る
        else if (!state.jobs.length) {
          state.jobsNullFlag = true;
        }
        // * 非ログイン時は応募/いいねを押下した際にリダイレクトでログインに遷移させる
        if (!state.userId) {
          state.entryRedirect = true; //* 非ログイン時表示に
        }
      } catch (error) {
        catchError(error);
      }
    };

    const skillQueryParameter = async <T extends number[], U>(
      searchLang: T,
      urlParams: U
    ) => {
      const arrayLanguage: string[] = [];
      const languageNum: number[] = searchLang;
      for (const value of languageNum) {
        const queryParamsLanguage = urlParams + "=" + value + "&";
        arrayLanguage.push(queryParamsLanguage);
      }
      const LastLanguageURL: string = arrayLanguage.join("");
      try {
        const res = await $fetch<Fetch<Job[]>>(
          `${API_URL}/jobs?${LastLanguageURL}`
        );
        state.jobs = res.data.response;
        if (state.jobs.length == 0) {
          state.jobsNullFlag = true;
          state.loading = false;
        } else {
          paginateJobs(state.jobs);
        }
      } catch (error) {
        catchError(error);
      }
    };

    onMounted(async () => {
      await fetchData();
    });

    // * ページネーション処理(検索)
    const paginateJobs = (value: Job[]) => {
      state.jobs = value;
      state.paginationLength = Math.ceil(
        state.jobs.length / state.jobsPageSize
      );
      state.displayJobs = state.jobs.slice(
        state.jobsPageSize * (state.page - 1),
        state.jobsPageSize * state.page
      );
      state.loading = false;
    };

    // * 言語検索 emit
    const compliteSearchLanguage = (emitLanguage: Job[]) => {
      state.loading = true;
      searchJobPagenate(emitLanguage);
    };
    // * フレームワーク検索 emit
    const compliteSearchFramework = (emitFramework: Job[]) => {
      state.loading = true;
      searchJobPagenate(emitFramework);
    };
    // * その他スキル検索 emit
    const compliteSearchSkill = (emitSkill: Job[]) => {
      state.loading = true;
      searchJobPagenate(emitSkill);
    };
    // * フリーワード 検索
    const searchFreeword = async () => {
      state.loading = true;
      const posts: Job[] = [];
      try {
        const res = await $fetch<Fetch<Job[]>>(`${API_URL}/jobs`);
        res.data.response.map((v) => {
          if (
            v.job_description?.indexOf(state.freeWord) !== -1 ||
            v.job_title.indexOf(state.freeWord) !== -1
          ) {
            posts.push(v);
          }
        });
        // * フリーワード 検索語 Vuexに値を格納する
        Vuex.dispatch("freeWordSearch", {
          freeWord: state.freeWord,
        });
        state.jobs = posts;
        searchJobPagenate(state.jobs);
        state.loading = false;
      } catch (error) {
        catchError(error);
      }
    };

    // * 検索後の処理
    const searchJobPagenate = (value: Job[]) => {
      state.jobs = value;
      paginateJobs(state.jobs);
      state.jobsNullFlag = false;
      state.langModal = false;
      state.frameworkModal = false;
      state.skillModal = false;
      if (value.length == 0) {
        state.jobsNullFlag = true;
        state.detailFlag = false;
      } else {
        state.detailFlag = false;
      }
    };

    return {
      ...toRefs(state),
      paginateJobs,
      fetchData,
      compliteSearchLanguage,
      compliteSearchFramework,
      compliteSearchSkill,
      searchFreeword,
      skillQueryParameter,
      ...utils(state, ctx),
      ...clickJob(state, ctx),
    };
  },
});

const utils = (state: State, ctx: SetupContext) => {
  const router = ctx.root.$router;

  // * 非ログイン時 登録リダイレクト
  const registerRedirect = () => {
    localStorage.setItem("CJI_DATA_EN", encode(String(state.id)));
    router.push({ name: "RegisterPersonal" });
  };

  // * ページネーション
  const pageChange = (pageNumber: number) => {
    state.loading = true;
    state.displayJobs = state.jobs.slice(
      state.jobsPageSize * (pageNumber - 1),
      state.jobsPageSize * pageNumber
    );

    ctx.root.$router.push({
      query: { page: String(state.page), job_id: String(state.id) },
    });
    state.loading = false;
  };
  return {
    dayJsFormat,
    truncate,
    registerRedirect,
    pageChange,
  };
};

const clickJob = (state: State, ctx: SetupContext) => {
  const { fetchManageJobs, manageJobs, checkApplyStatus, isApply } = useJobs();
  const { auth } = useUtils();

  // * click して案件を取得 === 詳細
  const getJob = async (job: Job) => {
    if (state.id === job.id) {
      return;
    }
    state.circleLoading = true;
    state.jobDetail = job; //? clickした案件を取得
    state.detailFlag = true; //? 詳細画面を表示するか否かを判定する
    state.id = job.id; //? clickしたIdを this.idに格納する
    state.isSelfJob = false; //? clickする度に 自分の案件では無くする
    state.applyFlug = true; //? clickする度に 応募済み案件にする

    ctx.root.$router.push({
      query: { page: String(state.page), job_id: String(state.id) },
    });

    // * ログインしていれば以下の処理が走る
    if (state.userId) {
      await Promise.all([selfJobCheck(), applyCheck()]);
    }
    state.circleLoading = false;
    // * 登録 or ログインしてない場合
    return;
  };

  // * 自分の案件かを判定
  const selfJobCheck = async () => {
    await fetchManageJobs();
    const result = checkSelfJob(manageJobs.value, state.id);
    state.isSelfJob = result;
  };
  // * 応募済みか応募済みでないかを判断
  const applyCheck = async () => {
    await checkApplyStatus(state.id);
    state.applyFlug = isApply.value;
  };
  // * 応募する
  const onApply = async () => {
    const params: ApplyParams = {
      job_id: state.id,
      user_id: state.userId,
      apply_status_id: m.APPLY_STATUS_APPLY,
    };
    try {
      await $post<ApplyParams>(`${AUTH_URL}/apply_job`, params, {
        headers: auth.value,
      });
      state.applyFlug = false;
      state.modal = false;
    } catch (error) {
      catchError(error);
    }
  };

  return {
    getJob,
    isStatusNew: computed(() => isStatusNew(state.jobDetail.job_status_id)),
    onApply,
  };
};
</script>

<template>
  <div class="job-wrapper">
    <LanguageSearchModal
      @close="() => (langModal = false)"
      v-if="langModal"
      @compliteSearchLanguage="compliteSearchLanguage($event)"
    />
    <FrameworkSearchModal
      v-if="frameworkModal"
      @close="() => (frameworkModal = false)"
      @compliteSearchFramework="compliteSearchFramework($event)"
    />
    <SkillSearchModal
      @close="() => (skillModal = false)"
      v-if="skillModal"
      @compliteSearchSkill="compliteSearchSkill($event)"
    />
    <div class="modal-window">
      <Confirme @close="() => (modal = false)" v-if="modal">
        <v-icon class="apply-icon pt-1 pb-4">
          mdi mdi-handshake-outline
        </v-icon>
        <p>応募を完了してよろしいですか？</p>
        <template v-slot:btnArea>
          <div class="d-flex justify-space-between">
            <VButton bc="red" @click="onApply" class="px-6">応募する</VButton>
            <VButton @click="() => (modal = false)" bc="redWhite" class="ml-6"
              >キャンセル</VButton
            >
          </div>
        </template>
      </Confirme>
    </div>
    <!-- 検索エリアバー -->
    <div class="search-area">
      <button
        :class="[
          this.$store.state.search.language.length == 0
            ? 'search-area__modal-btn'
            : 'search-area__modal-btn-active',
        ]"
        @click="() => (langModal = true)"
      >
        開発言語
      </button>
      <button
        :class="[
          this.$store.state.search.framwork.length == 0
            ? 'search-area__modal-btn'
            : 'search-area__modal-btn-active',
        ]"
        @click="() => (frameworkModal = true)"
      >
        フレームワーク
      </button>
      <button
        :class="[
          this.$store.state.search.skill.length == 0
            ? 'search-area__modal-btn'
            : 'search-area__modal-btn-active',
        ]"
        @click="() => (skillModal = true)"
      >
        その他技術
      </button>
      <input
        type="text"
        v-model="freeWord"
        placeholder="フリーワードで探す"
        class="search-area__freewrod"
        @keyup.enter="searchFreeword"
      />
    </div>

    <div class="job-wrapper-center" v-show="!loading">
      <div class="job-wrapper-left" v-if="jobsNullFlag === false">
        <div
          v-for="job in displayJobs"
          class="router"
          :key="job.index"
          :value="job.id"
          @click="getJob(job)"
          :jobId="job"
        >
          <CardJob :job="job" />
        </div>
      </div>
      <!-- 検索結果が無い場合 -->
      <div class="job-wrapper-left-false" v-else>
        この条件での開発案件はありませんでした。<br />
        別のキーワードで検索してください。
      </div>
      <router-link
        :to="`/jobs/${job.id}/detail`"
        class="router-1"
        v-for="job in displayJobs"
        :key="job.index"
      >
        <CardJob :job="job" />
      </router-link>
      <template v-if="detailFlag">
        <JobCardDetail
          :job="jobDetail"
          :not-login="entryRedirect"
          :register-redirect="registerRedirect"
          :circle-loading="circleLoading"
          :is-self-job="isSelfJob"
          :is-status-new="isStatusNew"
          :apply-flug="applyFlug"
          :on-apply="() => (modal = true)"
        />
      </template>
      <template v-else>
        <div class="job-wrapper-right-false">
          <JobRightLogin />
        </div>
      </template>
      <v-main>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="paginationLength"
            circle
            @input="pageChange"
          />
        </div>
      </v-main>
    </div>
    <Loading v-show="loading" />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.apply-icon {
  color: $apply;
  font-size: 6em;
}

// * 詳細検索
.search-area {
  width: 100%;
  height: 48px;
  position: absolute;
  top: 0;
  position: sticky;
  z-index: 1;
  text-align: left;
  padding: 0 3rem;
  display: inline-block;

  &__modal-btn {
    @include card-border-color;
    color: $text-sub-color;
    background-color: $white;
    margin-top: 0.4rem;
    padding: 0.5rem 1.5rem;
    border-radius: 50rem;
    cursor: pointer;
    font-weight: bold;
    margin-left: 0.7rem;
    transition: 0.3s;
    outline: none;

    &:hover {
      @include primary-border_color;
      color: $primary-color;
      transition: 0.3s;
    }
  }

  &__modal-btn-active {
    @include primary-border_color;
    color: $primary-color;
    background-color: $white;
    margin-top: 0.4rem;
    padding: 0.5rem 1.5rem;
    border-radius: 50rem;
    cursor: pointer;
    font-weight: bold;
    margin-left: 0.7rem;
    transition: 0.3s;
    outline: none;

    &:hover {
      @include primary-border_color;
      color: $primary-color;
      transition: 0.3s;
    }
  }

  &__freewrod {
    @include input-border-color;
    color: $text-main-color;
    font: 16px/24px sans-serif;
    box-sizing: border-box;
    transition: 0.3s;
    letter-spacing: 1px;
    border-radius: 4px;
    width: 28%;
    margin-top: 0.23rem;
    // border: solid 1px #E0E0E0;
    background-color: $input-background-color;
    border-radius: 50rem;
    padding: 0.5rem 1rem;
    position: absolute;
    right: 0;
    margin-right: 4rem;
    border: none;
    outline: none;

    &:focus {
      @include form-hover;
    }
  }
}

//* 全体
.job-wrapper {
  width: 100%;
  margin: 0 auto;
  padding: 0rem 0 2rem 0;
  position: relative;
  min-height: 800px;

  // * 案件中央
  .job-wrapper-center {
    width: 90%;
    margin: 0 auto;
    position: relative;

    .router :hover {
      box-shadow: 0 15px 30px -5px #0000002d, 0 0 5px #0000002d;
      transform: translateY(-2px);
      cursor: pointer;
    }
  }
}

// * 右側 詳細を表示しない際に
.job-wrapper-right-false {
  width: 52%;
  float: right;
  position: sticky;
  margin-left: 2rem;
  margin-bottom: 0.2rem;
  top: 0;
  border-radius: 8px;
  color: $text-main-color;
  text-align: left;
}

// * 案件カード側
.job-wrapper-left {
  width: 44%;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  display: inline-block;
  margin-top: 1rem;
}

.job-wrapper-left-false {
  margin-top: 10rem;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  display: inline-block;
}

.router-1 {
  display: none;
}

@media screen and (max-width: 1289px) {
  .job-wrapper .job-wrapper-center {
    width: 99%;
  }
}

@media screen and (max-width: $la) {
  .search-area {
    overflow-x: auto;
    width: 100%;
    padding: 0;
  }

  .router-1 {
    display: block;
    text-decoration: none;
  }

  .job-wrapper-left {
    width: 90%;
  }

  .job-wrapper .job-wrapper-center {
    width: 80%;
  }

  .job-wrapper-left,
  .job-wrapper-right-false {
    display: none;
  }
}

@media screen and (max-width: $me) {
  .search-area {
    &__freewrod {
      position: relative;
      margin-right: 0;
      padding: 0.4rem 1rem;
      margin-left: 0.5rem;
      width: 50%;
    }
    .search-freewrod-box {
      position: relative;
      padding: 0.4rem 1rem;
      margin-left: 0.5rem;
      margin-right: 0;
      width: 40%;
    }
  }

  .job-wrapper-left {
    width: 100%;
  }

  .job-wrapper .job-wrapper-center {
    width: 95%;
  }
}

@media screen and (max-width: $sm) {
  .job-wrapper-left {
    width: 100%;
  }

  .search-area {
    white-space: nowrap;
  }
}
</style>
