<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import DatePicker from "@/components/Atoms/Forms/DatePicker.vue";

const propsOption = {
  value: { type: String as PropType<string>, defalut: "" },
  name: { type: String as PropType<string>, required: true },
  textLabel: { type: String as PropType<string>, required: true },
  mandatory: {
    type: Boolean as PropType<boolean>,
    required: true,
    defalut: false,
  },
  mandatoryText: { type: String as PropType<string> },
  placeholder: { type: String as PropType<string>, required: true },
} as const;

type PropsOption = typeof propsOption;
export type DatePickerAreaProps = OutsidePropsType<PropsOption>;

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    DatePicker,
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
    <DatePicker
      :value="value"
      type="text"
      :name="name"
      @input="input"
      :placeholder="placeholder"
      class="mt-1"
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

#rem {
  color: $text-sub-color;
  margin-top: 2px;
  font-size: 12px;
  font-weight: bold;
}
</style>
