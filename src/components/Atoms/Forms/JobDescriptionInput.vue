<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
} from '@vue/composition-api';

type State = {
  jobDescriptionLimit: number;
}

const initialState = (): State => ({
  jobDescriptionLimit: 0,
});

export default defineComponent({ 
  props: {
    type: { type: String, required: true },
    value: { type: String, required: false, default: null },
  },
  setup: (_, ctx) => {
    const state = reactive<State>(initialState());

    const onInputJobDescription = (e: any) => {
      state.jobDescriptionLimit = e.target.value.length;
      ctx.emit("input", e.target.value);
    }

    return {
      ...toRefs(state),
      onInputJobDescription
    }
  }
});
</script>

<template>
  <section>
    <textarea
      type="text"
      :value="value"
      @input="onInputJobDescription" 
      placeholder="詳しい内容や現在の状況を記載してください(250文字以内)" 
      maxlength="500" 
    />
    <small id="rem">残り{{ 500 - jobDescriptionLimit }}文字</small>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

textarea[type='text'] {
  @include input-border-color;
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

#rem {
  color: $text-sub-color;
  margin-top: 2px;
  font-size: 12px;
  font-weight: bold;
}
</style>