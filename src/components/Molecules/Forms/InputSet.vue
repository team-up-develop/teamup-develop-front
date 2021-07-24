<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import { Skill } from "@/types/index";
import { dayJsFormat } from "@/libs/dayjs";

type Color = "#651fff" | "#2196f3" | "#00bcd4";

const propsOption = {
  value: { type: String, default: "" },
  label: { type: String, default: "" },
  skills: { type: Array as PropType<Skill[]> },
  color: { type: String as PropType<Color> },
  dayValue: { type: String },
} as const;

type PropsOption = typeof propsOption;
export type InputSet = OutsidePropsType<PropsOption>;

export default defineComponent<InsidePropsType<PropsOption>>({
  props: propsOption,
  setup(props) {
    return {
      styles: computed(() => {
        return {
          "--color": props.color,
        };
      }),
      dayJsFormat,
    };
  },
});
</script>

<template>
  <div>
    <label for="name" class="font-weight-bold text-left">{{ label }}</label>
    <p v-if="value">{{ value }}</p>
    <p v-if="dayValue">{{ dayJsFormat(dayValue, "YYYY年 M月 D日") }}</p>
    <p v-if="skills">
      <span
        class="skill"
        :style="styles"
        v-for="skill in skills"
        :key="skill.id"
      >
        {{ skill.name }}
      </span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.skill {
  --color: $language-color;
  border: solid 1px var(--color);
  color: var(--color);
  text-decoration: none;
  margin: 5px 0px 0px 5px;
  text-align: left;
  display: inline-block;
  font-size: 12px;
  padding: 6px 1.2rem;
  border-radius: 5px / 5px;
  font-weight: bold;
  pointer-events: none;
}
</style>
