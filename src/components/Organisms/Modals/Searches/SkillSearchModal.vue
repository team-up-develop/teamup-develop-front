<script lang="ts">
import Vue from 'vue';
import axios from 'axios'
import { Skill } from '@/types/index';
import { Job } from '@/types/job';

export type DateType = {
  skills: Skill[];
  selectedSkill: [];
  jobs: Job[];
}

export default Vue.extend({ 
  props: {
    jobsArray: Array
  },
  data(): DateType {
    return {
      selectedSkill: this.$store.state.search.skill, 
      skills: [],
      jobs: []
    }
  },
  computed: {
    isSearch() {
      if(this.selectedSkill.length !== 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    // * フレームワーク取得
    axios.get<Skill[]>('http://localhost:8888/api/v1/skill')
    .then(response => {
      this.skills = response.data
    })
  },
  methods: {
    // * その他スキル 検索
    searchSkill() {
      const arraySkill: string[] = [];
      const skillState: number[] = [];
      const params = {
        skill: this.selectedSkill,
      }
      for(let i = 0; i < params.skill.length; i++) {
        const skillParams: number = params.skill[i];
        skillState.push(skillParams)
        const queryParams: string =  'skill_id' + '[' + Number(skillParams - 1) + ']' + '=' + skillParams + '&';
        arraySkill.push(queryParams)
      }
      const skillStateEnd: number[] = skillState.slice(0)
      const result: string = arraySkill.join('');
      axios.get(`http://localhost:8888/api/v1/job/?${result}`)
      .then(response => {
        this.jobs = response.data

        this.$emit('compliteSearchSkill', this.jobs)
        // * その他スキル 検索語 Vuexに値を格納する
        this.$store.dispatch('skillSearch', {
          skill: skillStateEnd,
        })
        // * その他スキルが１つも選択されていない時の処理
        if(params.skill.length == 0 ) {
          this.$store.dispatch('skillSearch', {
            skill: [],
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
          <span>その他スキル</span>
        </v-card-title>
        <v-card-text class="modal-content">
          <div class="modal-content">
            <v-row>
              <label v-for="skill in skills" v-bind:key="skill.id">
                <input type="checkbox" v-model="selectedSkill" v-bind:value="skill.id">
                <span>{{ skill.skillName }}</span>
              </label>
            </v-row>
          </div>
        </v-card-text>
        <div class="modal-footer" v-if="isSearch">
          <div @click="searchSkill" class="serach-btn">
            検索する
          </div>
        </div>
        <div class="modal-footer" v-else>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <div class="serach-btn-false" v-on="on" v-bind="attrs">
                検索する
              </div>
            </template>
            <span>検索項目入力してください</span>
          </v-tooltip>
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
}

.modal-window {
  background: $basic-white;
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
      color: $basic-white;
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
    color: $basic-white;
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
    color: $basic-white;
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