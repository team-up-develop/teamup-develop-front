<script lang="ts">
import Vue from "vue";
import { API_URL, catchError } from "@/master";
import axios from "axios";
// import TopPageRecommendJobCard from '@/components/common/topPage/TopPageRecommendJobCard.vue'
// import TopPageNewJobCard from '@/components/Organisms/TopPage/TopPageNewJobCard.vue'
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import HeaderArea from "@/components/Organisms/TopPage/HeaderArea.vue";
import { Language, Framework, Skill } from "@/types/index";
import { FetchLanguages, FetchFrameworks, FetchSkills } from "@/types/fetch";

type DataType = {
  languages: Language[];
  framworks: Framework[];
  skills: Skill[];
  freeWord: string;
  loading: boolean;
};

export default Vue.extend({
  components: {
    // TopPageRecommendJobCard,
    // TopPageNewJobCard,
    Loading,
    HeaderArea,
  },
  data(): DataType {
    return {
      languages: [], //? 開発言語
      framworks: [], //? フレームワーク
      skills: [], //? その他スキル
      freeWord: this.$store.state.search.freeWord, //? フリーワード 検索
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
      // * ページ遷移知れてきたらVuexの中身を消す
      this.$store.state.search.freeWord = "";
      this.$store.state.search.language = [];
      this.$store.state.search.framwork = [];
      this.$store.state.search.skill = [];
      // * 開発言語 取得
      axios
        .get<FetchLanguages>(`${API_URL}/programing_languages`)
        .then((res) => {
          // .slice(5)
          this.languages = res.data.response;
        })
        .catch((error) => {
          catchError(error);
        });
      // * フレームワーク
      axios
        .get<FetchFrameworks>(`${API_URL}/programing_frameworks`)
        .then((res) => {
          this.framworks = res.data.response;
        })
        .catch((error) => {
          catchError(error);
        });
      // * その他スキル
      axios
        .get<FetchSkills>(`${API_URL}/skills`)
        .then((res) => {
          this.skills = res.data.response;
        })
        .catch((error) => {
          catchError(error);
        });
    }, 3000);
  },
  methods: {
    // * トップページフリーワード 検索
    freeWordSearch() {
      this.$store.dispatch("freeWordSearch", {
        freeWord: this.freeWord,
      });
      return this.$router.push("/jobs");
    },
    // * トップページ 言語検索
    languageClick(language: Language) {
      this.$store.dispatch("languageSearch", {
        language: [language.id],
      });
      return this.$router.push("/jobs");
    },
    // * トップページ フレームワーク検索
    framworkClick(framwork: Framework) {
      this.$store.dispatch("framworkSearch", {
        framwork: [framwork.id],
      });
      return this.$router.push("/jobs");
    },
    // * トップページ その他スキル検索
    skillClick(skill: Skill) {
      this.$store.dispatch("skillSearch", {
        skill: [skill.id],
      });
      return this.$router.push("/jobs");
    },
  },
});
</script>

<template>
  <section>
    <section v-show="!loading">
      <div class="top-wrapper">
        <v-container class="container-top">
          <!-- トップ AD area -->
          <HeaderArea />
          <!-- 中央 フリーワード  -->
          <div class="center-ad-area">
            <input
              type="text"
              class="serach-freeword"
              v-model="freeWord"
              placeholder="フリーワードを入力してください"
            />
            <button class="search-freeword-btn" @click="freeWordSearch">
              検索する
            </button>
          </div>
          <div class="bottom-ad-area">
            <label for="name" class="keyword-tag">おすすめキーワード</label>
            <div class="language-area">
              <!-- 開発言語 -->
              <label for="name" class="language-tag">開発言語</label>
              <div class="langage">
                <div
                  class="language-box"
                  v-for="language in languages"
                  :key="language.id"
                  @click="languageClick(language)"
                >
                  {{ language.name }}
                </div>
              </div>
            </div>
            <!-- 開発フレームワーク -->
            <div class="framework-area">
              <label for="name" class="framework-tag">フレームワーク</label>
              <div class="framework">
                <div
                  class="framework-box"
                  v-for="framwork in framworks"
                  :key="framwork.id"
                  @click="framworkClick(framwork)"
                >
                  {{ framwork.name }}
                </div>
              </div>
            </div>
            <!-- その他スキル -->
            <div class="skill-area">
              <label for="name" class="skill-tag">その他スキル</label>
              <div class="skill">
                <div
                  class="skill-box"
                  v-for="skill in skills"
                  :key="skill.id"
                  @click="skillClick(skill)"
                >
                  {{ skill.name }}
                </div>
              </div>
            </div>
          </div>
        </v-container>
      </div>
      <!-- <template>
        <div class="container-center">
          <label for="name" class="new-tag">新着案件</label>
          <TopPageNewJobCard />
        </div>
      </template> -->
      <div>
        <h1>ここは使い方説明欄</h1>
      </div>
    </section>
    <Loading v-show="loading"> </Loading>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.top-wrapper {
  width: 85%;
  height: 90vh;
  margin: 0 auto;
  position: relative;

  .container-top {
    width: 100%;
    margin: 2rem 0rem;
    padding: 2.5rem 0rem 0rem 0rem;
    max-width: none;

    // * 中央 フリーワード
    .center-ad-area {
      width: 100%;
      height: 12vh;
      margin: 2rem 0;
      position: relative;

      .serach-freeword {
        @include input-border-color;
        width: 80%;
        position: absolute;
        left: 0;
        border-radius: 32px;
        font-size: 2rem;
        padding: 0.65rem 2rem;
        outline: none;
      }

      .search-freeword-btn {
        @include blue-btn;
        text-align: left;
        display: block;
        padding: 1.3rem 3.5rem;
        border-radius: 32px;
        border: none;
        font-size: 0.875rem;
        font-weight: 600;
        color: $white;
        line-height: 1;
        text-align: center;
        max-width: 280px;
        margin: auto;
        font-size: 1rem;
        float: right;
        cursor: pointer;
        transition: 0.3s;
        outline: none;
        position: absolute;
        right: 0;
      }
    }

    // * おすすめキーワード
    .bottom-ad-area {
      width: 100%;
      text-align: left;
      display: flex;
      flex-direction: column;

      .keyword-tag {
        font-size: 1.1em;
        font-weight: bold;
      }

      .language-area {
        margin-top: 1rem;
        display: inline-block;

        .language-tag {
          font-size: 1em;
          font-weight: bold;
        }

        .langage {
          width: 100%;
          overflow-x: auto;
          white-space: nowrap;
          // display: flex;

          .language-box {
            background-color: $white;
            color: $language-color;
            border: 1px solid $language-color;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 600;
            line-height: 1;
            text-align: center;
            max-width: 130px;
            font-size: 1rem;
            cursor: pointer;
            transition: 0.3s;
            outline: none;
            margin-right: 0.8rem;
            margin-top: 0.4rem;
            display: inline-block;
          }
        }
      }

      .framework-area {
        margin-top: 1rem;
        display: inline-block;

        .framework-tag {
          font-size: 1em;
          font-weight: bold;
        }

        .framework {
          width: 100%;
          overflow-x: auto;
          white-space: nowrap;

          .framework-box {
            background-color: $white;
            color: $framework-color;
            border: 1px solid $framework-color;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 600;
            line-height: 1;
            text-align: center;
            max-width: 130px;
            font-size: 1rem;
            cursor: pointer;
            transition: 0.3s;
            outline: none;
            margin-right: 0.8rem;
            margin-top: 0.4rem;
            display: inline-block;
          }
        }
      }

      .skill-area {
        margin-top: 1rem;
        display: inline-block;

        .skill-tag {
          font-size: 1em;
          font-weight: bold;
        }

        .skill {
          width: 100%;
          overflow-x: auto;
          white-space: nowrap;

          .skill-box {
            background-color: $white;
            color: $skill-color;
            border: 1px solid $skill-color;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 600;
            line-height: 1;
            text-align: center;
            max-width: 130px;
            font-size: 1rem;
            cursor: pointer;
            transition: 0.3s;
            outline: none;
            margin-right: 0.8rem;
            margin-top: 0.4rem;
            display: inline-block;
          }
        }
      }
    }
  }
}

// * 中央
.container-center {
  width: 99%;
  padding: 0 2.5rem;
  // height: 82%;
  margin: 0 auto;

  .card-area {
    width: 100%;
    height: 35vh;
    text-align: left;
    position: relative;
    padding: 1.7rem 0;
    margin-bottom: 5rem;

    .new-tag {
      font-size: 1.7em;
      font-weight: bold;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

@media screen and (max-width: 1100px) {
  .top-wrapper {
    width: 90%;
    .container-top {
      width: calc(100% - 0rem);
      padding: 2.5rem 0rem;
    }
  }
}

/* タブレット */
@media (max-width: 900px) {
  .top-wrapper .container-top {
    .center-ad-area .serach-freeword {
      width: 66%;
    }
  }
}

/* スマホ */
@media (max-width: 500px) {
  .top-wrapper .container-top {
    .center-ad-area {
      .serach-freeword {
        width: 65%;
        padding: 1rem 1rem;
        font-size: 1rem;
      }
      .search-freeword-btn {
        padding: 1.1rem 1.5rem;
      }
    }
  }
  .container-center {
    margin-top: 10rem;
    padding: 0 1rem;
  }
}
</style>
