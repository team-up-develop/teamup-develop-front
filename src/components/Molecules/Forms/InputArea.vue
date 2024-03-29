<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
} from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import Input from "@/components/Atoms/Forms/Input.vue";

const propsOption = {
  value: { type: String as PropType<string> },
  name: { type: String as PropType<string>, required: true },
  type: { type: String as PropType<string>, required: true },
  textLabel: { type: String as PropType<string>, required: true },
  mandatory: {
    type: Boolean as PropType<boolean>,
    required: true,
    defalut: false,
  },
  mandatoryText: { type: String as PropType<string> },
  placeholder: { type: String as PropType<string>, required: true },
  maxlength: { type: String as PropType<string>, required: true },
  remaining: {
    type: Boolean as PropType<boolean>,
    required: true,
    defalut: false,
  },
  validMessage: { type: String, default: "" },
  isValid: { type: Boolean },
} as const;

type PropsOption = typeof propsOption;
export type InputAreaProps = OutsidePropsType<PropsOption>;

type State = {
  titleLimit: number;
};

const initialState = (): State => ({
  titleLimit: 0,
});

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    Input,
  },
  props: propsOption,
  setup: (props, ctx) => {
    const state = reactive<State>(initialState());

    const mandatoryLabel = computed(() => {
      return props.mandatory ? true : false;
    });
    const remainingLabel = computed(() => {
      return props.remaining ? true : false;
    });

    const input = (e: any) => {
      state.titleLimit = e.length;
      ctx.emit("input", e);
    };
    return {
      ...toRefs(state),
      mandatoryLabel,
      remainingLabel,
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
    <Input
      :value="value"
      :type="type"
      :name="name"
      @input="input"
      :placeholder="placeholder"
      :maxlength="maxlength"
      class="mt-1"
    />
    <small id="rem" v-if="remainingLabel">残り{{ 60 - titleLimit }}文字</small>
    <p v-if="!isValid" class="valid-message">{{ validMessage }}</p>
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

.valid-message {
  color: $error-message-color;
}

#rem {
  color: $text-sub-color;
  margin-top: 2px;
  font-size: 12px;
  font-weight: bold;
}
</style>
