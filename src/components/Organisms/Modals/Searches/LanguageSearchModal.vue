<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
  onMounted
} from '@vue/composition-api';
import { $fetch, API_URL, catchError } from "@/master";
import { Job, Language } from "@/types/index";
import { FetchLanguages, FetchJobs } from "@/types/fetch";
import Vuex from "@/store/index";

type State = {
  languages: Language[];
  selectedLang: number[];
  jobs: Job[];
};

type SearchParams = {
  language: number[];
};

const initialState = (): State => ({
  languages: [],
  selectedLang: Vuex.state.search.language,
  jobs: [],
});

export default defineComponent({
  setup: (_, context) => {
    const state = reactive<State>(initialState());
    
    onMounted(() => {
      fetchLanguages();
    });
    // * 開発言語一覧取得
    const fetchLanguages = async () => {
      try {
        const res = await $fetch<FetchLanguages>(
          `${API_URL}/programing_languages`
        );
        state.languages = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };
    // * 開発言語検索
    const searchLanguage = async () => {
      const array: string[] = [];
      const languageState: number[] = [];
      const params: SearchParams = {
        language: state.selectedLang,
      };
      for (const languageParams of params.language) {
        languageState.push(languageParams);
        const queryParams: string = "pl_id=" + languageParams + "&";
        array.push(queryParams);
      }
      const languageStateEnd: number[] = languageState.slice(0);
      const result: string = array.join("");
      try {
        const res = await $fetch<FetchJobs>(`${API_URL}/jobs?${result}`);
        state.jobs = res.data.response;
        context.emit("compliteSearchLanguage", state.jobs);

        // * 言語 検索語 Vuexに値を格納する
        Vuex.dispatch("languageSearch", {
          language: languageStateEnd,
        });
        // * 言語が１つも選択されていない時の処理
        if (params.language.length == 0) {
          Vuex.dispatch("languageSearch", {
            language: [],
          });
        }
      } catch (error) {
        catchError(error);
      }
    };

    return {
      ...toRefs(state),
      searchLanguage
    }
  },
});
</script>

<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <v-card class="headline grey lighten-2 text-left py-3 pl-4">
          <span class="title">開発言語で探す</span>
        </v-card>
        <v-card-text class="modal-content">
          <div class="modal-content">
            <v-row class="row-area">
              <label v-for="language in languages" v-bind:key="language.id">
                <input
                  type="checkbox"
                  v-model="selectedLang"
                  v-bind:value="language.id"
                />
                <span>{{ language.name }}</span>
              </label>
            </v-row>
          </div>
        </v-card-text>
        <div class="modal-footer">
          <v-btn @click="searchLanguage" class="serach-btn">
            検索する
          </v-btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.title {
  font-size: 0.8em;
  font-weight: bold;
}

.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 3000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $modal-background;
}

.modal-window {
  background: $white;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  width: 700px;

  @media screen and (max-width: $me) {
    width: 88%;
  }
}

.modal-content {
  padding: 1rem 0.5rem;
  overflow: scroll;
  text-align: left;
  min-height: 500px;
  height: 550px;

  @media screen and (max-width: $me) {
    padding: 1rem 1.2rem;
  }
  @media screen and (max-width: $sm) {
    padding: 1rem 0.7rem;
  }

  .row-area {
    margin: 0;
    height: 52%;

    @media screen and (max-width: $me) {
      display: block;
    }
  }

  label {
    max-height: 30px;
    input[type="checkbox"] {
      display: none;
    }

    span {
      background-color: #373740ba;
      border-radius: 4px;
      font-weight: 700;
      color: $white;
      font-size: 0.85em;
      text-decoration: none;
      font-family: sans-serif;
      text-align: center;
      width: 95%;
      min-width: 160px;
      display: inline-block;
      padding: 0.5rem 1rem;
      cursor: pointer;
      margin: 0 auto;
      transition: background-color 150ms ease-in;
      margin: 0.3rem 0.2rem;
    }

    span:hover {
      background-color: #2195f39e;
    }

    input[type="checkbox"]:checked + span {
      background: $primary-color
        url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAX9JREFUeNpi+P//PwMNsS4QbwBiLnQ5WlqqAsRP/0PARiBmoYfFkkB8+z8qWALEjLS0mB+IL/3HDibSymJQXB7/jx/UgNSCvU4lwAbEG4DYkwi1WUxUspQZiOcRaSkIWOAKMk0Sg3jaf+IBOIVjMyQWiH8DsR+RljaTYOkBWJ5GNwRk2R+ooh9A7ETA0jwSLL0ATfEYqRpkyVc0xR+A2AyHpdFA/I9IS0F5WhRbAWIEtQQbeAXE6lhC5jeRlj4GYgVsRaYK1HBCmmWgmuyxhAwu8BpaXjNgs/gYkYbcAGIXPCGDDkCOM8eVPkCEFhE+JhX8BGJnfAkTxgC57BOVLAXlihBC2RA9Vf+k0FJQKk8nJv+jCwQi5WNyQAWxpR02wRQS8icy6CKlmMUlUUGipfOQK3lKLAbhdhIKfWZS6258kiAfzCZg6V4gZiOn0UBIAcgn63BYehK50Ke2xQxQH+3FUoqJUtJMIlYhLxAfxVJu09xiWENuMxCrUaNhCBBgAOAVfjALa5TLAAAAAElFTkSuQmCC)
        no-repeat 7% center;
      background-size: 15px 13px;
    }

    input[type="checkbox"]:checked:hover + span {
      background: $primary-color
        url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAS5JREFUeNq8110OgjAMAGBGvIY3VESjt9jPg95PT+LccBIZ7dYOWJPGB+g+Ymg3hLW2QeLkcu/y2pSFdvl0eQevehjI3uXbfkMh96TShFq/xhG6J4faAtxEtSBOQTm4QWpnOBWl4CZT69fuYpiCpnBDrB1xLhrjgoFO8F1oGcFslUv4bV32zFoxmOHJta0XMn65dC0UaiddA8UGiN4axeC1cUkdmWviEls/NwL1FqjPNtNvoimPdC3yRCUTiTXbt0R/oSnw2iiK10BBvBY6w2uiE3xJr8oFtcrvxy/fVcyeVdGx98yotcOxN/znHeMUIhdMOG8c4reagssF43VEoT5O4ZJwvNUUFJtcEE5BMXyGpnanf5yDxjiI+hSJj7YunEBvhbuTCh9tD+jiR4ABAJ0SrJgNr1UAAAAAAElFTkSuQmCC)
        no-repeat 7% center;
      background-size: 15px 15px;
    }
  }
}

.modal-footer {
  width: 100%;

  // * モーダル内のキャンセルボタン
  .serach-btn {
    @include blue-btn;
    @include neumorphism;
    color: $white;
    padding: 1rem 5.5rem !important;
    height: 46px !important;
    border-radius: 35px;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin-left: 1.2rem;
    font-size: 1rem;
    cursor: pointer;
    margin: 1rem auto;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;
}

.modal-enter-active,
.modal-window {
  transition: opacity 0.4s, transform 0.4s;
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
