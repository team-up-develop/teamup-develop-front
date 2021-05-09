<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  SetupContext,
} from "@vue/composition-api";
import { $fetch, API_URL, catchError } from "@/master";
import {
  JobRegisterFalse,
  JobRightLogin,
  CardJob,
} from "@/components/Organisms/Jobs";
import {
  LanguageSearchModal,
  FrameworkSearchModal,
  SkillSearchModal,
} from "@/components/Organisms/Modals/Searches";
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import ApplyModal from "@/components/Organisms/Modals/Applications/ApplyModal.vue";
import Applybtn from "@/components/Atoms/Button/Applybtn.vue";
import FavoriteBtn from "@/components/Atoms/Button/FavoriteBtn.vue";
import JobStatusNew from "@/components/Atoms/Jobs/JobStatusNew.vue";
import { dayJs, truncate } from "@/master";
import { Job } from "@/types/index";
import { FetchJobs, FetchFavoriteJob, FetchManageJobs } from "@/types/fetch";
import Vuex from "@/store/index";

type Maybe<T> = T | null;

type State = {
  jobs: Job[]; //? 案件一覧配列
  jobsNullFlag: boolean; //? 案件が存在しない場合 表示のため
  freeWord: string;
  loading: boolean;
  jobDetail: any; //? 案件詳細
  detailFlag: boolean; //? 案件詳細を表示するためのフラグ
  selfJobPost: boolean; //? 自分の案件かを判定
  selfJob: Maybe<Job>; //? 自分の案件を格納する
  applyFlug: boolean; //?応募済みかの判定フラグ
  id: number; //? clickした案件のIdを取得
  modal: boolean; //?モーダルを開いてるか否か
  saveFlag: boolean; //? 案件保存しているかを判定
  limitationList: number;
  userId: number;
  entryRedirect: boolean; //? 非ログイン時にエントリー押下後 登録にリダイレクトするためのフラグ
  langModal: boolean; //? 言語モーダル
  frameworkModal: boolean; //? フレームワークモーダル
  skillModal: boolean; //? その他スキルモーダル
  buttonActive: boolean; //? 右側浮いてるボタン
  page: number; //? 現在のページ
  displayJobs: Job[]; //? 表示する案件
  jobsPageSize: number; //? ページに表示する案件の数
  paginationLength: number; //? ページネーション番号
};

const initialState = (): State => ({
  jobs: [],
  jobsNullFlag: false,
  freeWord: Vuex.state.search.freeWord,
  loading: true,
  jobDetail: null,
  detailFlag: false,
  selfJobPost: false,
  selfJob: null,
  applyFlug: true,
  id: 0,
  modal: false,
  saveFlag: true,
  limitationList: 1,
  userId: Vuex.state.auth.userId,
  entryRedirect: false,
  langModal: false,
  frameworkModal: false,
  skillModal: false,
  buttonActive: false,
  page: 1,
  displayJobs: [],
  jobsPageSize: 5, //FIXME: 開発に応じて仮で置いています。正規 20
  paginationLength: 0,
});

export default defineComponent({
  components: {
    Loading,
    Applybtn,
    ApplyModal,
    JobRegisterFalse,
    CardJob,
    LanguageSearchModal,
    FrameworkSearchModal,
    SkillSearchModal,
    JobRightLogin,
    FavoriteBtn,
    JobStatusNew,
  },
  setup: (_, ctx) => {
    const state = reactive<State>(initialState());
    const router = ctx.root.$router;

    // * 非ログイン時 登録リダイレクト
    const registerRedirect = () => {
      router.push({ name: "RegisterStepBase" });
    };

    const fetchData = async () => {
      // * 投稿一覧取得
      const posts: Job[] = [];
      try {
        const res = await $fetch<FetchJobs>(`${API_URL}/jobs`);
        setTimeout(() => {
          state.loading = false;
          state.jobs = res.data.response;
          paginateJobs(state.jobs);

          //* トップページから フリーワード 検索をした際の処理
          for (const job of res.data.response) {
            if (job.job_description) {
              if (job.job_description.indexOf(state.freeWord) !== -1) {
                posts.push(job);
              }
            }
          }
          state.jobs = posts;
          paginateJobs(state.jobs);
          // * トップページから 開発言語 検索した際の処理
          if (Vuex.state.search.language.length !== 0) {
            skillQueryParameter(Vuex.state.search.language, "pl_id");
          }
          // * トップページから フレームワーク 検索した際の処理
          else if (Vuex.state.search.framwork.length !== 0) {
            skillQueryParameter(Vuex.state.search.framwork, "pf_id");
          }
          // * トップページから その他スキル 検索した際の処理
          else if (Vuex.state.search.skill.length !== 0) {
            skillQueryParameter(Vuex.state.search.skill, "skill_id");
          }
          // * もし案件が存在しなかったら処理が走る
          else if (!state.jobs.length) {
            state.jobsNullFlag = true;
          }
        }, 1000);
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
        const res = await $fetch<FetchJobs>(
          `${API_URL}/jobs?${LastLanguageURL}`
        );
        state.jobs = res.data.response;
        if (state.jobs.length == 0) {
          state.jobsNullFlag = true;
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
    };

    // * 言語検索 emit
    const compliteSearchLanguage = (emitLanguage: Job[]) => {
      searchJobPagenate(emitLanguage);
    };
    // * フレームワーク検索 emit
    const compliteSearchFramework = (emitFramework: Job[]) => {
      searchJobPagenate(emitFramework);
    };
    // * その他スキル検索 emit
    const compliteSearchSkill = (emitSkill: Job[]) => {
      searchJobPagenate(emitSkill);
    };
    // * フリーワード 検索
    const searchFreeword = async () => {
      const posts: Job[] = [];
      try {
        const res = await $fetch<FetchJobs>(`${API_URL}/jobs`);
        for (const job of res.data.response) {
          if (job.job_description) {
            if (job.job_description.indexOf(state.freeWord) !== -1) {
              posts.push(job);
            }
          }
        }
        // * フリーワード 検索語 Vuexに値を格納する
        Vuex.dispatch("freeWordSearch", {
          freeWord: state.freeWord,
        });
        state.jobs = posts;
        searchJobPagenate(state.jobs);
      } catch (error) {
        catchError(error);
      }
    };

    // * 検索後の処理
    const searchJobPagenate = (value: Job[]) => {
      state.jobs = value;
      state.paginationLength = Math.ceil(
        state.jobs.length / state.jobsPageSize
      );
      state.displayJobs = state.jobs.slice(
        state.jobsPageSize * (state.page - 1),
        state.jobsPageSize * state.page
      );
      state.jobsNullFlag = false;
      modal(state).closeLangSearchModal();
      modal(state).closeFrameworkSearchModal();
      modal(state).closeSkillSearchModal();
      state.loading = true;
      setTimeout(() => {
        if (value.length == 0) {
          state.loading = false;
          state.jobsNullFlag = true;
        } else {
          state.loading = false;
          state.detailFlag = false;
        }
      }, 1500);
    };

    return {
      ...toRefs(state),
      paginateJobs,
      fetchData,
      registerRedirect,
      compliteSearchLanguage,
      compliteSearchFramework,
      compliteSearchSkill,
      searchFreeword,
      skillQueryParameter,
      ...useUtils(state, ctx),
      ...modal(state),
      ...clickJob(state, ctx),
    };
  },
});

const useUtils = (state: State, ctx: SetupContext) => {
  const day = (value: string, format: string) => dayJs(value, format);
  const limit = (value: string, num: number) => truncate(value, num);
  // * ページネーション
  const pageChange = (pageNumber: number) => {
    state.loading = true;
    setTimeout(() => {
      state.loading = false;
      state.displayJobs = state.jobs.slice(
        state.jobsPageSize * (pageNumber - 1),
        state.jobsPageSize * pageNumber
      );

      ctx.root.$router.push({
        query: { page: String(state.page), job_id: String(state.id) },
      });
    }, 1000);
  };
  return {
    day,
    limit,
    pageChange,
  };
};

const modal = (state: State) => {
  // * エントリーが完了したら応募済みにする
  const compliteEntry = () => {
    state.applyFlug = false;
  };
  // * モーダル
  const openModal = () => {
    state.modal = true;
  };
  const closeModal = () => {
    state.modal = false;
  };
  const doSend = () => {
    closeModal();
  };
  // *検索 モーダル
  const langSearchModal = () => {
    state.langModal = true;
  };
  const closeLangSearchModal = () => {
    state.langModal = false;
  };
  const frameworkSearchModal = () => {
    state.frameworkModal = true;
  };
  const closeFrameworkSearchModal = () => {
    state.frameworkModal = false;
  };
  const skillSearchModal = () => {
    state.skillModal = true;
  };
  const closeSkillSearchModal = () => {
    state.skillModal = false;
  };

  return {
    compliteEntry,
    openModal,
    closeModal,
    doSend,
    langSearchModal,
    closeLangSearchModal,
    frameworkSearchModal,
    closeFrameworkSearchModal,
    skillSearchModal,
    closeSkillSearchModal,
  };
};

const clickJob = (state: State, ctx: SetupContext) => {
  // * click して案件を取得 === 詳細
  const getJob = async (job: Job) => {
    if (state.id === job.id) {
      return;
    }
    state.jobDetail = job; //? clickした案件を取得
    state.detailFlag = true; //? 詳細画面を表示するか否かを判定する
    state.id = job.id; //? clickしたIdを this.idに格納する
    state.selfJobPost = false; //? clickする度に 自分の案件では無くする
    state.applyFlug = true; //? clickする度に 応募済み案件にする

    ctx.root.$router.push({
      query: { page: String(state.page), job_id: String(state.id) },
    });

    // * ログインしていれば以下の処理が走る
    if (state.userId) {
      await selfJobCheck();
      await applyCheck();
      await favoriteCheck();
    }
    // * 登録 or ログインしてない場合
    return;
  };

  // * 自分の案件かを判定
  const selfJobCheck = async () => {
    try {
      const res = await $fetch<FetchJobs>(
        `${API_URL}/jobs?user_id=${state.userId}`
      );
      for (const selfJob of res.data.response) {
        state.selfJob = selfJob;
        if (state.selfJob.id === state.id) {
          state.selfJobPost = true;
        }
      }
    } catch (error) {
      catchError(error);
    }
  };
  // * 応募済みか応募済みでないかを判断
  const applyCheck = async () => {
    try {
      const res = await $fetch<FetchManageJobs>(
        `${API_URL}/apply_jobs?user_id=${state.userId}`
      );
      const arrayApply: number[] = [];
      for (const applyData of res.data.response) {
        arrayApply.push(applyData.job.id);
      }
      if (arrayApply.includes(state.jobDetail.id)) {
        state.applyFlug = false;
      }
    } catch (error) {
      catchError(error);
    }
  };
  // * 保存済みか保存済みではないかを判定する
  const favoriteCheck = async () => {
    try {
      const res = await $fetch<FetchFavoriteJob>(
        `${API_URL}/favorite_jobs?user_id=${state.userId}`
      );
      const array: number[] = [];
      for (const favoriteData of res.data.response) {
        array.push(favoriteData.job.id);
      }
      if (array.includes(state.jobDetail.id)) {
        state.saveFlag = false;
      } else {
        state.saveFlag = true;
      }
    } catch (error) {
      catchError(error);
    }
  };
  return {
    getJob,
  };
};
</script>

<template>
  <div class="job-wrapper">
    <LanguageSearchModal
      @close="closeLangSearchModal"
      v-if="langModal"
      @compliteSearchLanguage="compliteSearchLanguage($event)"
    />
    <FrameworkSearchModal
      v-if="frameworkModal"
      @close="closeFrameworkSearchModal"
      @compliteSearchFramework="compliteSearchFramework($event)"
    />
    <SkillSearchModal
      @close="closeSkillSearchModal"
      v-if="skillModal"
      @compliteSearchSkill="compliteSearchSkill($event)"
    />
    <div class="modal-window">
      <ApplyModal @close="closeModal" v-if="modal">
        <p>応募を完了してよろしいですか？</p>
        <template v-slot:footer>
          <Applybtn @compliteEntry="compliteEntry" :jobId="id" />
          <v-btn @click="doSend" class="modal-btn">キャンセル</v-btn>
        </template>
      </ApplyModal>
    </div>
    <!-- 検索エリアバー -->
    <template>
      <div class="search-area">
        <button
          v-if="this.$store.state.search.language.length == 0"
          class="search-area__modal-btn"
          @click="langSearchModal"
        >
          開発言語
        </button>
        <button
          v-else
          class="search-area__modal-btn-active"
          @click="langSearchModal"
        >
          開発言語
        </button>
        <button
          v-if="this.$store.state.search.framwork.length == 0"
          class="search-area__modal-btn"
          @click="frameworkSearchModal"
        >
          フレームワーク
        </button>
        <button
          v-else
          class="search-area__modal-btn-active"
          @click="frameworkSearchModal"
        >
          フレームワーク
        </button>
        <button
          v-if="this.$store.state.search.skill.length == 0"
          class="search-area__modal-btn"
          @click="skillSearchModal"
        >
          その他技術
        </button>
        <button
          v-else
          class="search-area__modal-btn-active"
          @click="skillSearchModal"
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
    </template>
    <!-- 案件表示エリア -->
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
          <!-- 案件カード コンポーネント -->
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
        <v-card class="job-wrapper-right">
          <div class="top-job-detail-area">
            <div class="top-job-detail-area__title">
              {{ limit(jobDetail.job_title, 60) }}
            </div>
            <!-- ログイン時 -->
            <template v-if="!entryRedirect">
              <div class="top-job-detail-bottom" v-if="!selfJobPost">
                <button
                  @click="openModal"
                  class="btn-box-apply"
                  v-if="applyFlug"
                >
                  応募する
                </button>
                <div class="btn-box-apply-false" v-else>応募済み</div>
                <div class="btn-box-save">
                  <FavoriteBtn :jobId="id" />
                </div>
                <div class="label-area mt-5">
                  <JobStatusNew :job="jobDetail" />
                </div>
              </div>
              <template v-else>
                <div class="top-job-detail-bottom">
                  <router-link :to="`/manage/${jobDetail.id}/applicant`">
                    <button class="btn-box-manage">管理画面</button>
                  </router-link>
                  <div class="label-area mt-5">
                    <JobStatusNew :job="jobDetail" />
                  </div>
                </div>
              </template>
            </template>
            <!-- 非ログイン時 リダイレクトさせる -->
            <template v-else>
              <div class="top-job-detail-bottom">
                <button class="btn-box-apply" @click="registerRedirect">
                  応募する
                </button>
                <div class="btn-box-save">
                  <v-icon class="save-icon" @click="registerRedirect"
                    >mdi-heart</v-icon
                  >
                </div>
                <div class="label-area mt-5">
                  <JobStatusNew :job="jobDetail" />
                </div>
              </div>
            </template>
          </div>
          <!-- 右側案件詳細 -->
          <div class="main-job-detail-area">
            <div class="tag-area">
              投稿者
            </div>
            <router-link :to="`/account/profile/${jobDetail.user_id}/detail`">
              <div class="post-user-name-area">
                {{ limit(jobDetail.user.user_name, 55) }}
              </div>
            </router-link>
            <div class="tag-area">
              開発言語
            </div>
            <div class="post-user-area">
              <div
                class="detail-langage"
                v-for="langage in jobDetail.programing_languages.slice(0, 5)"
                :key="langage.name"
              >
                {{ langage.name }}
              </div>
            </div>
            <div class="tag-area">
              フレームワーク
            </div>
            <div class="post-user-area">
              <div
                class="detail-framework"
                v-for="framework in jobDetail.programing_frameworks.slice(0, 5)"
                :key="framework.name"
              >
                {{ framework.name }}
              </div>
            </div>
            <div class="tag-area">
              その他スキル
            </div>
            <div class="post-user-area">
              <div
                class="detail-skill"
                v-for="skill in jobDetail.skills.slice(0, 5)"
                :key="skill.name"
              >
                {{ skill.name }}
              </div>
            </div>
            <div class="tag-area">
              開発期間
            </div>
            <div class="post-user-area">
              {{ day(jobDetail.dev_start_date, "YYYY年 M月 D日") }} ~
              {{ day(jobDetail.dev_end_date, "YYYY年 M月 D日") }}
            </div>
            <div class="tag-area">
              募集人数
            </div>
            <div class="post-user-area">
              {{ jobDetail.recruitment_numbers }} 人
            </div>
            <div class="tag-area">
              開発詳細
            </div>
            <div class="post-user-area pre-wrap">
              {{ jobDetail.job_description }}
            </div>
            <div class="jobDetail-time-area">
              投稿期日 {{ day(jobDetail.created_at, "YYYY年 M月 D日") }}
            </div>
          </div>
        </v-card>
      </template>
      <template v-else>
        <div class="job-wrapper-right-false">
          <!-- 右側の登録コンポーネント -->
          <JobRegisterFalse v-if="!userId" />
          <JobRightLogin v-else />
        </div>
      </template>
      <!-- ページネーション -->
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

// * 案件詳細画面
.job-wrapper-right {
  width: 52%;
  height: 90vh;
  margin-left: 2rem;
  margin-top: 1rem;
  background-color: $white;
  position: sticky;
  display: inline-block;
  margin-bottom: 0.2rem;
  bottom: 0;
  border-radius: 8px;
  color: $text-main-color;
  text-align: left;

  .top-job-detail-area {
    font-weight: bold;
    padding: 1.5rem 2rem 1rem 2rem;
    box-shadow: 2px 4px 3px -2px rgba(3, 29, 41, 0.15);

    &__title {
      width: 100%;
      height: 50%;
      font-size: 1.2em;
    }

    .top-job-detail-bottom {
      width: 100%;
      height: 65%;
      display: inline-block;
      position: relative;
      margin-top: 0.8rem;

      .label-area {
        float: right;

        .label {
          width: 146px;
          font-size: 14px;
          background-color: $third-dark;
          color: $white;
          border-radius: 8px;
          font-weight: bold;
          text-decoration: none;
        }
      }
    }
  }
}

.btn-box-save {
  display: inline-block;
  padding: 0.3rem 0 0 1.2rem;
  position: absolute;
  top: 0;
}

.job-wrapper-right .main-job-detail-area {
  height: calc(79% - 1rem);
  overflow: auto;
  padding: 0 2rem 1rem 2rem;
  position: relative;

  .tag-area {
    font-weight: bold;
    margin: 1rem 0 0.5rem 0;
    font-size: 1em;

    .icon {
      color: $primary-color;
    }
  }
}

.post-user-area {
  line-height: 1.8;
  font-size: 14px;
}

.jobDetail-time-area {
  margin-top: 1rem;
  font-size: 12px;
  color: $dark-grey;
  float: right;
}

.post-user-name-area {
  line-height: 1.8;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 0.3rem;
  font-size: 16px;

  &:hover {
    color: $primary-color;
    transition: 0.3s;
  }
}

.detail-langage {
  @include border_language;
  color: $language-color;
  margin: 0 0px 0px 5px;
  text-align: left;
  display: inline-block;
  font-size: 14px;
  padding: 2px 23px;
  border-radius: 5px / 5px;
  font-weight: bold;
  pointer-events: none;
}

.detail-framework {
  @include border_framework;
  margin: 0px 0px 0 5px;
  text-align: left;
  display: inline-block;
  color: $framework-color;
  font-size: 14px;
  padding: 2px 23px;
  border-radius: 5px / 5px;
  font-weight: bold;
  pointer-events: none;
}

.detail-skill {
  @include border-skill;
  color: $skill-color;
  margin: 0px 0px 0 5px;
  text-align: left;
  display: inline-block;
  font-size: 14px;
  padding: 2px 23px;
  border-radius: 5px / 5px;
  font-weight: bold;
  pointer-events: none;
}

// * 管理画面遷移ボタン
.btn-box-manage {
  @include neumorphismGrey;
  padding: 0.75rem 3rem;
  border-radius: 8px;
  font-weight: 600;
  color: $primary-color;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1.1em;
  display: inline-block;
  cursor: pointer;
  border: none;
  margin-top: 4px;
  appearance: none;
  border: none;
  outline: none;
}

// * 応募するボタン
.btn-box-apply {
  @include red-btn;
  @include neumorphism;
  padding: 0.75rem 3rem;
  border-radius: 8px;
  font-weight: 600;
  color: $white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1.1em;
  display: inline-block;
  cursor: pointer;
  border: none;
  margin-top: 4px;
  appearance: none;
  border: none;
  transition: 0.3s;
  outline: none;
}

// * 応募済みボタン
.btn-box-apply-false {
  @include grey-btn;
  display: block;
  padding: 0.75rem 3rem;
  border-radius: 8px;
  font-weight: 600;
  color: $white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  margin-top: 4px;
  font-size: 1.1em;
  display: inline-block;
}

// * モーダル内のキャンセルボタン
.modal-btn {
  @include neumorphismGrey;
  color: $red;
  padding: 0rem 2.4rem !important;
  height: 46px !important;
  border-radius: 50px;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin-left: 1.2rem;
  font-size: 1rem;
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  outline: none;
}

// * 保存アイコン
.save-icon {
  font-size: 20px;
  width: 42px;
  height: 42px;
  padding: 0.5rem;
  color: $white;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}

// * 右側 詳細を表示しない際に
.job-wrapper-right-false {
  width: 52%;
  // height: 40vh;
  float: right;
  position: sticky;
  // display: inline-block;
  margin-left: 2rem;
  margin-bottom: 0.2rem;
  // bottom: 0;
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

.label-lang {
  font-weight: bold;
  font-size: 1.5em;
  color: #111111;
}

.router-1 {
  display: none;
}

.pre-wrap {
  white-space: pre-wrap;
}

@media screen and (max-width: 1289px) {
  .job-wrapper .job-wrapper-center {
    width: 99%;
  }

  .job-wrapper-right {
    margin-left: 0.5rem;
  }
}

@media screen and (max-width: $la) {
  .search-area {
    overflow-x: auto;
    width: 100%;
    padding: 0;
  }
  // * 右側案件をdisplaynone
  .job-wrapper-right {
    display: none;
  }

  .router-1 {
    display: block;
  }

  .job-wrapper-left,
  .job-wrapper-right-false {
    display: none;
  }

  .job-wrapper-left {
    width: 90%;
  }

  .job-wrapper .job-wrapper-center {
    width: 80%;
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
