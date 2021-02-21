<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";

type State = {
  titleLimit: number;
};

const initialState = (): State => ({
  titleLimit: 0,
});

export default defineComponent({
  props: {
    type: { type: String, required: true },
    value: { type: String, required: false, default: null },
  },
  setup: (_, ctx) => {
    const state = reactive<State>(initialState());

    const onInputTitle = (e: any) => {
      state.titleLimit = e.target.value.length;
      ctx.emit("input", e.target.value);
    };

    return {
      ...toRefs(state),
      onInputTitle,
    };
  },
});
</script>

<template>
  <section>
    <input
      type="text"
      :value="value"
      @input="onInputTitle"
      placeholder="Go と Vue.js で 未経験エンジニアのためのサービスを作りたい(60文字以内で入力してください)"
      maxlength="60"
    />
    <small id="rem">残り{{ 60 - titleLimit }}文字</small>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

input[type="text"] {
  @include input-border-color;
  background-color: $dark-white;
  color: $text-main-color;
  font: 16px/24px sans-serif;
  box-sizing: border-box;
  width: 100%;
  padding: 0.3em;
  transition: 0.3s;
  letter-spacing: 1px;
  border-radius: 4px;
  padding: 0.5rem;

  &:focus {
    @include form-hover;
  }
}

#rem {
  color: $text-sub-color;
  margin-top: 2px;
  font-size: 12px;
  font-weight: bold;
}
</style>
