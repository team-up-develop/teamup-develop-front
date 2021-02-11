<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";

type State = {
  jobDescriptionLimit: number;
};

const initialState = (): State => ({
  jobDescriptionLimit: 0,
});

export default defineComponent({
  props: {
    type: { type: String, required: true },
    value: { type: String, required: false, default: null },
    placeholder: { type: String, required: false },
    maxlength: { type: String, required: true },
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
