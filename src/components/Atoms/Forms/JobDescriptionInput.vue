<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({ 
  props: {
    type: { type: String as PropType<string>, required: true },
    value: { type: String as PropType<string>, required: false, default: null },
  },
  data() {
    return {
      jobDescriptionLimit: 0,
    }
  },
  methods: {
    onInputTitle(e: any) {
      this.jobDescriptionLimit = e.target.value.length;
      this.$emit("input", e.target.value);
    }
  }
});
</script>

<template>
  <section>
    <textarea
      type="text"
      :value="value"
      @input="onInputTitle" 
      placeholder="詳しい内容や現在の状況を記載してください(250文字以内)" 
      maxlength="250" 
      />
    <small id="rem">残り{{ 250 - jobDescriptionLimit }}文字</small>
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
  color: #7c7c7c;
  margin-top: 2px;
}
</style>