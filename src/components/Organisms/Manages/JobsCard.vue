<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import { dayJs, truncate } from "@/master";
import { ManageJob } from "@/types/index";

const propsOption = {
  job: { type: Object as PropType<ManageJob>, required: true },
} as const;

type PropsOption = typeof propsOption;
export type JobCardProps = OutsidePropsType<PropsOption>;

export default defineComponent<InsidePropsType<PropsOption>>({
  props: propsOption,
  setup: () => {
    const day = (value: string, format: string) => dayJs(value, format);
    const limit = (value: string, num: number) => truncate(value, num);
    return {
      day,
      limit,
    };
  },
});
</script>

<template>
  <section>
    <v-sheet class="card">
      <v-row class="card__skill">
        <div
          class="lang"
          v-for="(langage, index) in job.programing_languages.slice(0, 3)"
          :key="`langage-${index}`"
        >
          {{ langage.name }}
        </div>
        <div
          class="fram"
          v-for="(framework, index) in job.programing_frameworks.slice(0, 3)"
          :key="`framework-${index}`"
        >
          {{ framework.name }}
        </div>
        <div
          class="skill"
          v-for="(skill, index) in job.skills.slice(0, 2)"
          :key="`skill-${index}`"
        >
          {{ skill.name }}
        </div>
      </v-row>
      <div class="card__title">
        <span>{{ limit(job.job_title, 55) }}</span>
      </div>
      <div class="card__bottom">
        <span
          >{{ day(job.dev_start_date, "YYYY年 M月 D日") }} ~
          {{ day(job.dev_end_date, "YYYY年 M月 D日") }}</span
        >
      </div>
    </v-sheet>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.card {
  position: relative;
  border-bottom: $card-border-color 1px solid;
  padding: 0.7rem 0rem;
  text-align: left;
  text-decoration: none;

  &__skill {
    margin-top: 0.01rem;

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
    padding: 0.4em 0 3rem 0;
    margin-top: 0.6rem;
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
