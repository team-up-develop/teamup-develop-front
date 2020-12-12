<script lang="ts">
import Vue from 'vue';
import moment from "moment";
export default Vue.extend({ 
  props: {
    job: Object
  },
  filters: {
    // * date型を文字に変換
    moment(value: string, format: string) {
      return moment(value).format(format);
    },
    //* 案件タイトル 文字制限
    truncateTitle: function(value: string) {
      const length = 55;
      const ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  }
});
</script>

<template>
  <section>
    <v-sheet class="card">
      <v-row class="card__skill">
        <div class="lang" 
          v-for="(langage, index) in job.programingLanguage.slice(0,3)" 
          :key="`langage-${index}`"
        >
          {{ langage.programingLanguageName }}
        </div>
        <div class="fram" 
          v-for="(framework, index) in job.programingFramework.slice(0,3)" 
          :key="`framework-${index}`"
        >
          {{ framework.programingFrameworkName }} 
        </div>
        <div class="skill" 
          v-for="(skill, index) in job.skill.slice(0,2)" 
          :key="`skill-${index}`"
        >
          {{ skill.skillName }} 
        </div>
      </v-row>
      <div class="card__title">
        <span>{{ job.jobTitle | truncateTitle }}</span>
      </div>
      <div class="card__bottom">
        <span>{{ job.devStartDate | moment("YYYY年 M月 D日") }}  ~  {{ job.devEndDate | moment("YYYY年 M月 D日")}}</span>
      </div>
    </v-sheet>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
.card {
  position: relative;
  border-bottom: $card-border-color 1px solid;
  padding: 0.7rem 0rem ;
  text-align: left;
  text-decoration: none;

  &__skill {

    .lang {
      @include border_language;
      color: $language-color;
      text-decoration: none;
      margin: 5px 0px 0px 5px;
      text-align: left;
      display: inline-block;
      font-size: 12px;
      padding: 4px 1.2rem;
      border-radius: 5px / 5px;
      font-weight: bold;
      pointer-events: none;
    }

    .fram {
      @include border_framework;
      margin: 5px 0px 0 5px;
      text-align: left;
      display: inline-block;
      color: $framework-color;
      font-size: 12px;
      padding: 4px 1.2rem;
      border-radius: 5px / 5px;
      font-weight: bold;
      pointer-events: none;
    }

    .skill {
      @include border-skill;
      color: $skill-color;
      margin: 5px 0px 0 5px;
      text-align: left;
      display: inline-block;
      font-size: 12px;
      padding: 4px 1.2rem;
      border-radius: 5px / 5px;
      font-weight: bold;
      pointer-events: none;
    }
  }

  &__title {
    padding: 0.2rem 0 3rem 0;
    font-size: 1.2em;
    font-weight: bold;
  }
  &__title :hover {
    text-decoration: underline;
  }

  &__bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    color: $text-sub-color;
    font-size: 0.8em;
    padding: 0 0 0.2rem 0;
  }
}
</style>