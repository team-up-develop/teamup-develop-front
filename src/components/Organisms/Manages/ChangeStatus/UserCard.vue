<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import { truncate } from "@/hooks/useUtils";
import { dayJsFormat } from "@/libs/dayjs";
import { User } from "@/types";

const propsOption = {
  user: { type: Object as PropType<User>, default: null, required: true },
} as const;

type PropsOption = typeof propsOption;
export type UserCardProps = OutsidePropsType<PropsOption>;

export default defineComponent<InsidePropsType<PropsOption>>({
  props: propsOption,
  setup: () => {
    const day = (value: string, format: string) => dayJsFormat(value, format);
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
          v-for="(langage, index) in user.user.programing_languages.slice(0, 3)"
          :key="`langage-${index}`"
        >
          {{ langage.name }}
        </div>
        <div
          class="fram"
          v-for="(framework, index) in user.user.programing_frameworks.slice(
            0,
            3
          )"
          :key="`framework-${index}`"
        >
          {{ framework.name }}
        </div>
        <div
          class="skill"
          v-for="(skill, index) in user.user.skills.slice(0, 2)"
          :key="`skill-${index}`"
        >
          {{ skill.name }}
        </div>
      </v-row>
      <div class="card__user">
        <v-row>
          <div class="card__user__image"></div>
          <v-col>
            <div class="card__user__name">
              {{ limit(user.user.user_name, 26) }}
            </div>
            <div class="card__user__study">
              {{ day(user.user.learning_start_date, "YYYY年 M月 D日") }}
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="card__bottom">
        <span>
          {{ day(user.createdAt, "YYYY年 M月 D日") }}
        </span>
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

  &__user {
    padding: 0.6rem 0 1rem 2rem;
    margin-top: 1rem;
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
      word-wrap: break-word; //* 折り返し
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
