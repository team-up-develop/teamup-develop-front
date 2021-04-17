<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import SkillSelect from "@/components/Atoms/Forms/SkillSelect.vue";
import { Language, Framework, Skill } from "@/types/index";

const propsOption = {
  value: {
    type: Array as PropType<Language[] | Framework[] | Skill[]>,
    required: true,
    defalut: [{}],
  },
  options: {
    type: Array as PropType<Language[] | Framework[] | Skill[]>,
    required: true,
    defalut: [{}],
  },
  name: { type: String as PropType<string>, required: true, defalut: "" },
  textLabel: {
    type: String as PropType<string>,
    required: true,
    defalut: "",
  },
  mandatory: {
    type: Boolean as PropType<boolean>,
    required: true,
    defalut: false,
  },
  mandatoryText: { type: String as PropType<string>, defalut: "" },
  max: { type: Number as PropType<number>, required: true },
} as const;

type PropsOption = typeof propsOption;
export type SkillSelectAreaProps = OutsidePropsType<PropsOption>;

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    SkillSelect,
  },
  props: propsOption,
  setup: (props, ctx) => {
    const mandatoryLabel = computed(() => {
      return props.mandatory ? true : false;
    });

    const input = (e: any) => {
      ctx.emit("input", e);
    };
    return {
      mandatoryLabel,
      input,
    };
  },
});
</script>

<template>
  <section>
    <label for="name" class="label">{{ textLabel }}</label
    ><label for="name" class="label-required" v-if="mandatoryLabel"
      >必須 {{ mandatoryText }}</label
    >
    <SkillSelect
      :value="value"
      :options="options"
      :max="max"
      name="jobStatusId"
      @input="input"
    />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.7rem;
}

.label-required {
  color: $white;
  background-color: $error-message-color;
  font-size: 12px;
  font-weight: bold;
  border-radius: 25px;
  padding: 0.25rem 0.9rem;
  text-align: center;
  margin-left: 10px;
}
</style>
