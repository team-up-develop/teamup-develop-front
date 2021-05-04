<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import Radio from "@/components/Atoms/Forms/Radio.vue";
import { Md } from "@/master";

const propsOption = {
  value: { type: String as PropType<string>, required: true, default: "" },
  options: { type: Array as PropType<Md[]>, required: true, default: [{}] },
  name: { type: String as PropType<string>, required: true, default: "" },
  textLabel: {
    type: String as PropType<string>,
    required: true,
    default: "",
  },
  mandatory: {
    type: Boolean as PropType<boolean>,
    required: true,
    defalut: false,
  },
} as const;

type PropsOption = typeof propsOption;
export type RadioAreaProps = OutsidePropsType<PropsOption>;

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    Radio,
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
    ><label for="name" class="label-required" v-if="mandatoryLabel">必須</label>
    <Radio
      :value="value"
      :options="options"
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
