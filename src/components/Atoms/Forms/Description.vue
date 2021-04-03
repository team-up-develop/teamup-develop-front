<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  PropType,
} from "@vue/composition-api";

type State = {
  jobDescriptionLimit: number;
};

const initialState = (): State => ({
  jobDescriptionLimit: 0,
});

export default defineComponent({
  props: {
    type: { type: String as PropType<string>, required: true, default: "" },
    value: { type: String as PropType<string>, required: false, default: null },
    placeholder: {
      type: String as PropType<string>,
      required: false,
      default: "",
    },
    maxlength: {
      type: String as PropType<string>,
      required: true,
      default: "",
    },
  },
  setup: (_, ctx) => {
    const state = reactive<State>(initialState());

    const onInputJobDescription = (e: any) => {
      ctx.emit("input", e.target.value);
    };

    return {
      ...toRefs(state),
      onInputJobDescription,
    };
  },
});
</script>

<template>
  <section class="mt-2">
    <textarea
      type="text"
      :value="value"
      @input="onInputJobDescription"
      :placeholder="placeholder"
      :maxlength="maxlength"
    />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

textarea[type="text"] {
  background-color: $dark-white;
  color: $text-main-color;
  font: 16px/24px sans-serif;
  box-sizing: border-box;
  width: 100%;
  min-height: 133px;
  max-height: 133px;
  padding: 0.3em;
  transition: 0.3s;
  letter-spacing: 1px;
  border-radius: 4px;
  padding: 0.5rem;

  &:focus {
    @include form-hover;
  }
}
</style>
