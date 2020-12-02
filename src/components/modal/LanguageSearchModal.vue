<script lang="ts">
import Vue from 'vue';
import axios from 'axios'

export default Vue.extend({ 
  props: {
    jobsArray: Array,
  },
  data() {
    return {
      languages: [],
      selectedLang: this.$store.state.search.language,
      jobs: []
    }
  },
  created() {
    // * プログラミング言語 取得
    axios.get('http://localhost:8888/api/v1/programing_language')
    .then(response => {
      this.languages = response.data
    })
  },
  methods: {
    // * 開発言語検索
    searchLanguage() {
      console.log("検索発火")
      const array = [];
      const languageState = []; //? Stateにフレームワークを複数いれるための配列
      const params = {
        language: this.selectedLang,
      }
      for(let i =0; i < params.language.length; i++) {
        const languageParams = params.language[i];
        languageState.push(languageParams)
        const queryParams =  'programing_language_id' + '[' + Number(languageParams - 1) + ']' + '=' + languageParams + '&';
        array.push(queryParams)
      }
      const languageStateEnd = languageState.slice(0)
      const result = array.join('');
      // console.log( result );
        axios.get(`http://localhost:8888/api/v1/job/?${result}`)
        .then(response => {
          this.jobs = response.data
          console.log("↓検索後のJobの中身だよ！")
          console.log(this.jobs)
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
            <div class="round" v-for="lang in languages" v-bind:key="lang.id">
            <input type="checkbox" id="checkbox" v-model="selectedLang" v-bind:value="lang.id">
              <label for="" class="checkbox">{{ lang.programingLanguageName }}</label>
            </div>
          </div>
          <h1>{{ selectedLang }}</h1>
        </v-card-text>
        <div class="modal-footer">
          <div @click="searchLanguage" class="serach-btn">
            検索する
          </div>
        </div>
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

  /* font-weight: bold; */
}

.modal-window {
  background: $basic-white;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.modal-content {
  padding: 2rem 1rem;
  overflow: scroll;
  height: 550px;
}

.modal-footer {
  /* background: #ccc; */
  width: 100%;
  padding: 2rem 2rem 1rem 0;
  text-align: right;
  display: inline-block;
  position: absolute;
  bottom: 0;
  left :0;
  font-size: 100px;
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

span {
  font-weight: bold;
}

.v-card__text {
  width: 100%;
}

.serach-btn {
  width: 100px;
  height: 100px;
  font-size: 20px;
  background-color: yellow;
}
</style>