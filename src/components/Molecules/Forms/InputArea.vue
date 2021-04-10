<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
  PropType,
} from "@vue/composition-api";
import Input from "@/components/Atoms/Forms/Input.vue";

type Props = {
  value: string | null;
  name: string;
  type: string;
  textLabel: string;
  mandatory: boolean;
  mandatoryText: string;
  placeholder: string;
  maxlength: string;
  remaining: boolean;
};

type State = {
  titleLimit: number;
};

const initialState = (): State => ({
  titleLimit: 0,
});

export default defineComponent({
  components: {
    Input,
  },
  props: {
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
  },
  setup: (props: Props, ctx) => {
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
