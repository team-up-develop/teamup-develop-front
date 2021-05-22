<script lang="ts">
import Vue from "vue";
import { $fetch } from "@/libs/axios";
import { API_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import {
  HeaderArea,
  TopSkill,
  TopFreeword,
  TopHowto,
  TopPageNewJobCard,
} from "@/components/Organisms/TopPage";
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
    Loading,
    HeaderArea,
    TopSkill,
    TopFreeword,
    TopHowto,
    TopPageNewJobCard,
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
      $fetch<FetchLanguages>(`${API_URL}/programing_languages`)
        .then((res) => {
          // .slice(5)
          this.languages = res.data.response;
        })
        .catch((error) => {
          catchError(error);
        });
      // * フレームワーク
      $fetch<FetchFrameworks>(`${API_URL}/programing_frameworks`)
        .then((res) => {
          this.framworks = res.data.response;
        })
        .catch((error) => {
          catchError(error);
        });
      // * その他スキル
      $fetch<FetchSkills>(`${API_URL}/skills`)
        .then((res) => {
          this.skills = res.data.response;
        })
        .catch((error) => {
          catchError(error);
        });
    }, 3000);
  },
});
</script>

<template>
  <section>
    <div class="wrapper" v-show="!loading">
      <section class="wrapper__top">
        <div class="container">
          <!-- トップ AD area -->
          <HeaderArea />
          <!-- 中央 フリーワード  -->
          <div class="center-ad-area">
            <TopFreeword />
          </div>
          <div class="search-area mt-5">
            <h2>
              おすすめキーワード
            </h2>
            <div class="language-area">
              <!-- 開発言語 -->
              <label for="name" class="label">開発言語</label>
              <div class="langage">
                <TopSkill :options="languages" :color="1" />
              </div>
            </div>
            <!-- 開発フレームワーク -->
            <div class="framework-area">
              <label for="name" class="label">フレームワーク</label>
              <div class="framework">
                <TopSkill :options="framworks" :color="2" />
              </div>
            </div>
            <!-- その他スキル -->
            <div class="skill-area">
              <label for="name" class="label">その他スキル</label>
              <div class="skill">
                <TopSkill :options="skills" :color="3" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="wrapper__center">
          <h2>
            サービスの利用仕方
            <div class="under" />
          </h2>
          <TopHowto />
        </div>
      </section>
      <section>
        <div class="wrapper__bottom">
          <h2>
            新着案件
            <div class="under" />
          </h2>
          <!-- <v-row> -->
          <TopPageNewJobCard />
          <!-- </v-row> -->
        </div>
      </section>
    </div>
    <Loading v-show="loading"> </Loading>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.label {
  font-size: 1em;
  font-weight: bold;
}
.under {
  height: 6px;
  width: 120px;
  margin: 0 auto;
  background-color: $primary-color;
}

.wrapper {
  width: 100%;
  background-color: $white;

  &__top {
    width: 88%;
    margin: 0 auto;

    @media screen and (max-width: $sm) {
      width: 95%;
    }
  }

  .container {
    width: 100%;
    padding: 4rem 0rem 0rem 0rem;
    max-width: none;

    // * 中央 フリーワード
    .center-ad-area {
      width: 100%;
      min-height: 100px;
      margin: 4rem 0;
      position: relative;

      @media screen and (max-width: $sm) {
        min-height: 70px;
      }
    }

    // * おすすめキーワード
    .search-area {
      width: 100%;
      text-align: left;
      display: flex;
      flex-direction: column;
      margin: 2rem 0;

      .language-area {
        margin-top: 1rem;
        display: inline-block;

        .langage {
          width: 100%;
          overflow-x: auto;
          white-space: nowrap;
        }
      }

      .framework-area {
        margin-top: 1rem;
        display: inline-block;

        .framework {
          width: 100%;
          overflow-x: auto;
          white-space: nowrap;
        }
      }

      .skill-area {
        margin-top: 1rem;
        display: inline-block;

        .skill {
          width: 100%;
          overflow-x: auto;
          white-space: nowrap;
        }
      }
    }
  }

  &__center {
    padding: 2rem 0;
  }
  &__bottom {
    background-color: $light-grey;
    padding: 2rem 0;
  }
}
</style>
