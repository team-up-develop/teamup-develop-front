<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    type: { type: String, required: true },
    value: { type: String, required: false, default: null },
    placeholder: { type: String, required: false },
    maxlength: { type: String, required: true },
  },
  setup: (_, ctx) => {
    const onInputTitle = (e: any) => {
      ctx.emit("input", e.target.value);
    };

    return {
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
      :placeholder="placeholder"
      :maxlength="maxlength"
    />
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
</style>
