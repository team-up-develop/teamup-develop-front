<script lang="ts">
import Vue from 'vue';
import moment from "moment";

export default Vue.extend({
  props: {
    user: { type: Object, default: null }
  },
  filters: {
    // * date型を文字に変換
    moment(value: string, format: string) {
      return moment(value).format(format);
    },
  }
});

</script>

<template>
  <section>
    <v-sheet class="card">
      <v-row class="card__skill">
        <div class="lang" 
        >
          TypeScript
        </div>
        <div class="fram" >
          Vue.js
        </div>
        <div class="skill">
          Docker
        </div>
      </v-row>
      <div class="card__user">
        <v-row>
          <div class="card__user__image"></div>
          <v-col>
            <div class="card__user__name">
              {{ user.user.userName }}
            </div>
            <div class="card__user__study">
              {{ user.user.learningStartDate | moment("YYYY年 M月 D日") }}
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="card__bottom">
        <span>
          {{ user.createdAt | moment("YYYY年 M月 D日") }}
        </span>
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

  &__user {
    padding: 0.6rem 0 1rem 2rem;
    font-size: 1.2em;
    font-weight: bold;

    &__image {
      margin-top: 0.5rem;
      width: 52px;
      height: 52px;
      @include user-image;
    }

    &__name {
      margin-left: 1rem;
      font-weight: bold;
    }

    &__name:hover {
      text-decoration: underline;
    }

    &__study {
      font-size: 0.5em;
      margin-left: 1rem;
      color: $text-sub-color;
    }
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