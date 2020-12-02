<script lang="ts">
import Vue from 'vue';
import axios from 'axios'
import { Framework } from '@/types/index';
import { Job } from '@/types/job';

export type DateType = {
  frameworks: Framework[];
  selectedFramework: [];
  jobs: Job[];
}

export default Vue.extend({ 
  props: {
    jobsArray: Array
  },
  data(): DateType {
    return {
      frameworks: [],
      selectedFramework: this.$store.state.search.framwork,
      jobs: []
    }
  },
  created() {
    // * フレームワーク取得
    axios.get<Framework[]>('http://localhost:8888/api/v1/programing_framework')
    .then(response => {
      this.frameworks = response.data
    })
  },
  methods: {
    // * フレームワーク検索
    searchFramework() {
      const arrayFramework: string[] = [];
      const frameworkState: number[] = [];
      const params = {
        framework: this.selectedFramework,
      }
      for(let i = 0; i < params.framework.length; i++) {
        const frameworkParams: number = params.framework[i];
        frameworkState.push(frameworkParams)
        const queryParams: string =  'programing_framework_id' + '[' + Number(frameworkParams - 1) + ']' + '=' + frameworkParams + '&';
        arrayFramework.push(queryParams)
      }
      const frameworkStateEnd: number[]  = frameworkState.slice(0)
      const result: string = arrayFramework.join('');
      axios.get(`http://localhost:8888/api/v1/job/?${result}`)
      .then(response => {
        this.jobs = response.data
        this.$emit('compliteSearchFramework', this.jobs)

        // * フレームワーク 検索語 Vuexに値を格納する
        this.$store.dispatch('framworkSearch', {
          framwork: frameworkStateEnd,
        })
        // * フレームワークが１つも選択されていない時の処理
        if(params.framework.length == 0 ) {
          this.$store.dispatch('framworkSearch', {
            framwork: [],
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
          <span>フレームワーク</span>
        </v-card-title>
        <v-card-text class="modal-content">
          <div class="modal-content">
            <div class="round" v-for="framework in frameworks" v-bind:key="framework.id">
            <input type="checkbox"  id="checkbox" v-model="selectedFramework" v-bind:value="framework.id">
              <label for="" class="checkbox">{{ framework.programingFrameworkName }}</label>
            </div>
          </div>
          <h1>{{ selectedFramework }}</h1>
        </v-card-text>
        <div slot="modal-footer">
          <div @click="searchFramework" class="serach-btn">
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
}

.modal-content {
  padding: 1rem 1rem;
  overflow: scroll;
  height: 500px;
}

.modal-footer {
  width: 100%;
  padding: 0rem 2rem 1rem 0;
  text-align: right;
  display: inline-block;
  position: relative;
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

@media screen and (max-width: 700px) {

}
</style>