<script lang="ts">
import Vue from 'vue';
import axios from 'axios'
// import TopPageRecommendJobCard from '@/components/common/topPage/TopPageRecommendJobCard.vue'
import TopPageNewJobCard from '@/components/common/topPage/TopPageNewJobCard.vue'
import Loading from '@/components/common/loading/Loading.vue'
import { Language } from '@/types/index';
import { Framework } from '@/types/index';
import { Skill } from '@/types/index';

export type DataType = {
  languages: Language[];
  framworks: Framework[];
  skills: Skill[];
  freeWord: string;
  loading: boolean;
}

export default Vue.extend({ 
  data(): DataType {
    return {
      languages: [], //? 開発言語
      framworks: [], //? フレームワーク
      skills: [], //? その他スキル
      freeWord: this.$store.state.search.freeWord, //? フリーワード 検索
      loading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
      // * ページ遷移知れてきたらVuexの中身を消す
      this.$store.state.search.freeWord = ""
      this.$store.state.search.language = []
      this.$store.state.search.framwork = []
      this.$store.state.search.skill = []

      // * 開発言語 取得
      axios.get('http://localhost:8888/api/v1/programing_language')
      .then(response => {
        this.languages = response.data.slice(8)
      })
      // * フレームワーク
      axios.get('http://localhost:8888/api/v1/programing_framework')
        .then(response => {
          this.framworks = response.data.slice(10)
        })
      // * その他スキル
      axios.get('http://localhost:8888/api/v1/skill')
        .then(response => {
          this.skills = response.data.slice(18)
        })
    }, 3000)
  },
  methods: {
    // * トップページフリーワード 検索
    freeWordSearch() {
      this.$store.dispatch('freeWordSearch', {
        freeWord: this.freeWord,
      })
      return this.$router.push('/jobs');
    },
    // * トップページ 言語検索
    languageClick(language: Language) {
      this.$store.dispatch('languageSearch', {
        language: [language.id],
      })
      return this.$router.push('/jobs');
    },
    // * トップページ フレームワーク検索
    framworkClick(framwork: Framework) {
      this.$store.dispatch('framworkSearch', {
        framwork: [framwork.id],
      })
      return this.$router.push('/jobs');

    },
    // * トップページ その他スキル検索
    skillClick(skill: Skill) {
      this.$store.dispatch('skillSearch', {
        skill: [skill.id],
      })
      return this.$router.push('/jobs');
    }
  },
  components: {
    // TopPageRecommendJobCard,
    TopPageNewJobCard,
    Loading
  },
});
</script>

<template>
  <section>
    <div v-show="!loading">
      <div class="top-wrapper">
        <v-container class="container-top">
          <!-- トップ AD area -->
          <div class="top-ad-area">
            <div class="top-ad-left">
              <div class="ad-title-area">
                チーム開発をすぐに始めれる
              </div>
              <div class="ad-subtitle-area">
                本気でキャリアを変えようと努力している未経験エンジニア同士が
                オンラインでの「チーム開発」を通じて相互に成長し、
                エンジニアとしてスタートを切る。
              </div>
            </div>
            <div class="top-ad-right">
              <div class="btn-area">
                <button class="register-btn" @click="$router.push('/register')">登録する</button>
                <button class="login-btn" @click="$router.push('/login')">ログインする</button>
              </div>
            </div>
          </div>
          <!-- 中央 フリーワード  -->
          <div class="center-ad-area">
            <input type="text" class="serach-freeword" v-model="freeWord"  placeholder="フリーワードを入力してください">
            <button class="search-freeword-btn" @click="freeWordSearch">検索する</button>
          </div>
          <div class="bottom-ad-area">
            <label for="name" class="keyword-tag">おすすめキーワード</label>
            <div class="language-area">
              <!-- 開発言語 -->
              <label for="name" class="language-tag">開発言語</label>
              <div class="langage">
                <div class="language-box" v-for="language in languages" :key="language.id" @click="languageClick(language)">
                  {{ language.programingLanguageName }}
                </div>
              </div>
            </div>
            <!-- 開発フレームワーク -->
            <div class="framework-area">
              <label for="name" class="framework-tag">フレームワーク</label>
              <div class="framework">
                <div class="framework-box" v-for="framwork in framworks" :key="framwork.id" @click="framworkClick(framwork)">
                  {{ framwork.programingFrameworkName }}
                </div>
              </div>
            </div>
            <!-- その他スキル -->
            <div class="skill-area">
              <label for="name" class="skill-tag">その他スキル</label>
              <div class="skill">
                <div class="skill-box" v-for="skill in skills" :key="skill.id" @click="skillClick(skill)">
                  {{ skill.skillName }}
                </div>
              </div>
            </div>
          </div>
        </v-container>
      </div>
      <template>
        <div class="container-center">
          <div class="card-area">
            <label for="name" class="new-tag">新着案件</label>
            <top-page-new-job-card></top-page-new-job-card>
          </div>
          <!-- <div class="card-area">
            <label for="name" class="new-tag">おすすめ案件</label>
            <top-page-recommend-job-card></top-page-recommend-job-card>
          </div> -->
        </div>
      </template>
      <div>
        <h1>ここは使い方説明欄</h1>
      </div>
    </div>
    <Loading v-show="loading">
    </Loading>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.top-wrapper {
  width: 85%;
  height: 90vh;
  margin: 0 auto;
  position: relative;

  .container-top {
    width: 100%;
    margin: 2rem 0rem;
    padding: 2.5rem 0rem 0rem 0rem;
    height: 100%;
    max-width: none;

    // * トップ 広告エリア
    .top-ad-area {
      width: 100%;
      height: 40%;
      position: relative;

      .top-ad-left {
        width: 50%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        text-align: left;

        .ad-title-area {
          color: #1142e2;
          background: -webkit-linear-gradient(0deg, #1142e2, #19bde6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
          font-size: 2.3em;
        }
        .ad-subtitle-area {
          width: 80%;
          padding: 1.5rem 0;
          font-weight: bold;
          line-height: 1.4;
        }
      }

      .top-ad-right {
        width: 50%;
        height: 50%;
        // background-color: #673AB7;
        position: absolute;
        right: 0;
        bottom: 0;
        margin-bottom: 2rem;

        .btn-area {
          width: 350px;
          height: 100%;
          float: right;
          position: relative;

          .register-btn {
            @include purple-btn;
            text-align: left;
            display: block;
            padding: 1.1rem 3rem;
            border-radius: 8px;
            border: none;
            font-size: .875rem;
            font-weight: 600;
            color: $basic-white;
            line-height: 1;
            text-align: center;
            max-width: 280px;
            margin: auto;
            font-size: 1rem;
            float: right;
            cursor: pointer;
            transition: .3s;
            outline: none;
            position: absolute;
            left: 0;
          }

          .login-btn {
            border: solid 1px #673AB7;
            color: #673AB7;
            background-color: #ffffff;
            text-align: left;
            display: block;
            padding: 1.1rem 2rem;
            border-radius: 8px;
            font-size: .875rem;
            font-weight: 600;
            line-height: 1;
            text-align: center;
            max-width: 280px;
            margin: auto;
            font-size: 1rem;
            float: right;
            cursor: pointer;
            transition: .3s;
            outline: none;
            position: absolute;
            right: 0;
          }
        }
      }
    }

    // * 中央 フリーワード 
    .center-ad-area {
      width: 100%;
      height: 12vh;
      position: relative;

      .serach-freeword {
        @include input-border-color;
        // height: 52px;
        width: 80%;
        position: absolute;
        left: 0;
        border-radius: 32px;
        font-size: 2rem;
        padding: 0.65rem 2rem;
        outline: none;
      }

      .search-freeword-btn {
        @include blue-btn ;
        text-align: left;
        display: block;
        padding: 1.3rem 3.5rem;
        border-radius: 32px;
        border: none;
        font-size: .875rem;
        font-weight: 600;
        color: $basic-white;
        line-height: 1;
        text-align: center;
        max-width: 280px;
        margin: auto;
        font-size: 1rem;
        float: right;
        cursor: pointer;
        transition: .3s;
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
            background-color: $basic-white;
            color: $language-color;
            border: 1px solid $language-color;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: .875rem;
            font-weight: 600;
            line-height: 1;
            text-align: center;
            max-width: 130px;
            font-size: 1rem;
            cursor: pointer;
            transition: .3s;
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
            background-color: $basic-white;
            color: $framework-color;
            border: 1px solid $framework-color;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: .875rem;
            font-weight: 600;
            line-height: 1;
            text-align: center;
            max-width: 130px;
            font-size: 1rem;
            cursor: pointer;
            transition: .3s;
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
            background-color: $basic-white;
            color: $skill-color;
            border: 1px solid $skill-color;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: .875rem;
            font-weight: 600;
            line-height: 1;
            text-align: center;
            max-width: 130px;
            font-size: 1rem;
            cursor: pointer;
            transition: .3s;
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
  height: 82%;
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
  .top-wrapper 
  .container-top {

    .top-ad-area {
      display: flex;
      align-items: center;

      .top-ad-left {
        display: block;
        height: 40%;
        width: 100%;
      }

      .top-ad-right {
        width: 100%;
        position: none;
        display: block;
        margin-bottom: 0rem;
        padding: 2rem 0 0 0 ;

        .btn-area {
          float: none;
          width: 100%;

          .register-btn {
            width: 35%;
          }
          .login-btn {
            width: 35%;
          }
        }
      }
    }

    .center-ad-area 
    .serach-freeword {
      width: 66%;
    }
  }
}

/* スマホ */
@media (max-width: 500px) {
  .top-wrapper 
  .container-top {

    .top-ad-area {
      height: 70%;

      .top-ad-left 
      .ad-subtitle-area {
        width: 100%;
      }

      .top-ad-right 
      .btn-area {
        .register-btn {
          width: 45%;
          padding: 1rem 2rem;
        }
        .login-btn {
          width: 45%;
          padding: 1rem 1rem;
        }
      }
    }
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