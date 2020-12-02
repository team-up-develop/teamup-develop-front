<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <v-card-title class="headline grey lighten-2">
          <span>その他スキル</span>
        </v-card-title>
        <v-card-text class="modal-content">
          <div class="modal-content">
            <div class="round-skill" v-for="skill in skills" v-bind:key="skill.id">
            <input type="checkbox"  id="checkbox" v-model="selectedSkill" v-bind:value="skill.id">
              <label for="" class="checkbox">{{ skill.skillName }}</label>
            </div>
          </div>
        </v-card-text>
        <div class="footer">
          <div @click="searchSkill" class="serach-btn">
            検索する
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    jobsArray: Array
  },
  data() {
    return {
      selectedSkill: this.$store.state.search.skill, //? その他スキル v-model
      skills: [], //? その他スキル取得
    }
  },
  created() {
    // * フレームワーク取得
    axios.get('http://localhost:8888/api/v1/skill')
    .then(response => {
      this.skills = response.data
    })
  },
  methods: {
    // * その他スキル 検索
    searchSkill() {
      this.loading = false;
      const arraySkill = [];
      const skillState = []; //? Stateにその他スキルを複数いれるための配列
      const params = {
        skill: this.selectedSkill,
      }
      for(let i =0; i < params.skill.length; i++) {
        const skillParams = params.skill[i];
        skillState.push(skillParams)
        const queryParams =  'skill_id' + '[' + Number(skillParams - 1) + ']' + '=' + skillParams + '&';
        arraySkill.push(queryParams)
      }
      const skillStateEnd = skillState.slice(0)
      const result = arraySkill.join('');
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
}
</script>

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
  margin-top: 2rem;
  background: $basic-white;
  border-radius: 8px;
  overflow: hidden;
  width: 600px;
  height: 690px;
}

.modal-content {
  padding: 1rem 1rem;
  overflow: scroll;
  height: 500px;
}


.modal-footer {
  /* background: #ccc; */
  width: 100%;
  padding: 2rem 2rem 1rem 0;
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

.v-card__text {
  width: 92%;
  // background-color: green;
  margin: 0 auto;
  text-align: left;
}

span {
  font-weight: bold;
}
</style>