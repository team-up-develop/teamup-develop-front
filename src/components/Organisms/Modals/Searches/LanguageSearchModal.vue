<script lang="ts">
import Vue from 'vue';
import { API_URL } from '@/master'
import axios from 'axios'
import { Language } from '@/types/index';
import { Job } from '@/types/job';

type DateType = {
  languages: Language[];
  selectedLang: [];
  jobs: Job[];
}

export default Vue.extend({ 
  props: {
    jobsArray: Array,
  },
  data(): DateType {
    return {
      languages: [],
      selectedLang: this.$store.state.search.language,
      jobs: [],
    }
  },
  computed: {
    // FIXME: 現状は使用していない
    isSearch() {
      if(this.selectedLang.length !== 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    // * プログラミング言語 取得
    axios.get<Language[]>(`${API_URL}/programing_language`)
    .then(response => {
      this.languages = response.data
    })
  },
  methods: {
    // * 開発言語検索
    searchLanguage() {
      const array: string[] = [];
      const languageState: number[] = [];
      const params = {
        language: this.selectedLang,
      }
      for(let i = 0; i < params.language.length; i++) {
        const languageParams: number = params.language[i];
        languageState.push(languageParams)
        const queryParams: string =  'programing_language_id' + '[' + Number(languageParams - 1) + ']' + '=' + languageParams + '&';
        array.push(queryParams)
      }
      const languageStateEnd: number[] = languageState.slice(0)
      const result: string = array.join('');
      axios.get(`${API_URL}/job/?${result}`)
      .then(response => {
        this.jobs = response.data
        this.$emit('compliteSearchLanguage', this.jobs)

        // * 言語 検索語 Vuexに値を格納する
        this.$store.dispatch('languageSearch', {
          language: languageStateEnd,
        })
        // * 言語が１つも選択されていない時の処理
        if(params.language.length == 0 ) {
          this.$store.dispatch('languageSearch', {
            language: [],
          })
        }
      })
    },
  }
});
</script>

<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <v-card-title class="headline grey lighten-2">
          <span>開発言語</span>
        </v-card-title>
        <v-card-text class="modal-content">
          <div class="modal-content">
            <v-row>
              <label v-for="lang in languages" v-bind:key="lang.id">
                <input type="checkbox" v-model="selectedLang" v-bind:value="lang.id">
                <span>{{ lang.programingLanguageName }}</span>
              </label>
            </v-row>
          </div>
        </v-card-text>
        <div class="modal-footer">
          <div @click="searchLanguage" class="serach-btn">
            検索する
          </div>
        </div>
        <!-- // FIXME: 現状は使用していない -->
        <!-- <div class="modal-footer" v-else>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <div class="serach-btn-false" v-on="on" v-bind="attrs">
                検索する
              </div>
            </template>
            <span>検索言語を入力してください</span>
          </v-tooltip>
        </div> -->
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

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
  width: 58%;

  @media screen and (max-width: 1200px) {
    width: 78%;
  }

  @media screen and (max-width: 768px) {
    width: 88%;
  }

  @media screen and (max-width: 520px) {
    width: 100%;
  }
}

.modal-content {
  padding: 1rem 1.7rem;
  overflow: scroll;
  text-align: left;
  min-height: 500px;
  height: 550px;

  label {
    input[type=checkbox] {
      display: none;
    }

    span {
      background-color: #373740ba;
      border-radius: 4px;
      font-weight: 700;
      color: $white;
      font-size: .85em;
      letter-spacing: 4px;
      text-decoration: none;
      font-family: sans-serif;
      text-align: center;
      width: 180px;
      padding: 0.5rem 0;
      cursor: pointer;
      display: block;
      margin: 0 auto;
      transition: background-color 150ms ease-in;
      margin: 0.3rem 0.2rem;
    }

    span:hover {
      background-color: grey;
    }

    input[type=checkbox]:checked + span {
      background: $primary-color url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAX9JREFUeNpi+P//PwMNsS4QbwBiLnQ5WlqqAsRP/0PARiBmoYfFkkB8+z8qWALEjLS0mB+IL/3HDibSymJQXB7/jx/UgNSCvU4lwAbEG4DYkwi1WUxUspQZiOcRaSkIWOAKMk0Sg3jaf+IBOIVjMyQWiH8DsR+RljaTYOkBWJ5GNwRk2R+ooh9A7ETA0jwSLL0ATfEYqRpkyVc0xR+A2AyHpdFA/I9IS0F5WhRbAWIEtQQbeAXE6lhC5jeRlj4GYgVsRaYK1HBCmmWgmuyxhAwu8BpaXjNgs/gYkYbcAGIXPCGDDkCOM8eVPkCEFhE+JhX8BGJnfAkTxgC57BOVLAXlihBC2RA9Vf+k0FJQKk8nJv+jCwQi5WNyQAWxpR02wRQS8icy6CKlmMUlUUGipfOQK3lKLAbhdhIKfWZS6258kiAfzCZg6V4gZiOn0UBIAcgn63BYehK50Ke2xQxQH+3FUoqJUtJMIlYhLxAfxVJu09xiWENuMxCrUaNhCBBgAOAVfjALa5TLAAAAAElFTkSuQmCC) no-repeat 7% center;
      background-size: 15px 13px;
    }

    input[type=checkbox]:checked:hover + span {
      background: $primary-color url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAS5JREFUeNq8110OgjAMAGBGvIY3VESjt9jPg95PT+LccBIZ7dYOWJPGB+g+Ymg3hLW2QeLkcu/y2pSFdvl0eQevehjI3uXbfkMh96TShFq/xhG6J4faAtxEtSBOQTm4QWpnOBWl4CZT69fuYpiCpnBDrB1xLhrjgoFO8F1oGcFslUv4bV32zFoxmOHJta0XMn65dC0UaiddA8UGiN4axeC1cUkdmWviEls/NwL1FqjPNtNvoimPdC3yRCUTiTXbt0R/oSnw2iiK10BBvBY6w2uiE3xJr8oFtcrvxy/fVcyeVdGx98yotcOxN/znHeMUIhdMOG8c4reagssF43VEoT5O4ZJwvNUUFJtcEE5BMXyGpnanf5yDxjiI+hSJj7YunEBvhbuTCh9tD+jiR4ABAJ0SrJgNr1UAAAAAAElFTkSuQmCC) no-repeat 7% center;
      background-size: 15px 15px;
    }
  }
}

.modal-footer {
  width: 100%;
  height: 80px;
  padding: 0.5rem 2rem 1rem 0;
  text-align: right;
  display: inline-block;
  position: absolute;
  bottom: 0;
  left :0;
  font-size: 1em;

  // * モーダル内のキャンセルボタン 
  .serach-btn {
    @include blue-btn;
    @include box-shadow-btn;
    color: $white;
    padding: 1rem 3.4rem;
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

  .serach-btn-false {
    @include box-shadow-btn;
    @include grey-btn;
    color: $white;
    padding: 1rem 3.4rem;
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
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;
}

.modal-enter-active, .modal-window {
  transition: opacity 0.4s, transform 0.4s;
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}

.modal-enter, .modal-window {
  transform: translateY(-20px);
}
</style>