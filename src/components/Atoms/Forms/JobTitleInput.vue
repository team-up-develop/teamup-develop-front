<script lang="ts">
import Vue, { PropType }  from 'vue';

export default Vue.extend({ 
  props: {
    type: { type: String as PropType<string>, required: true },
    value: { type: String as PropType<string>, required: false, default: null },
  },
  data() {
    return {
      titleLimit: 0,
    }
  },
  methods: {
    onInputTitle(e: any) {
      this.titleLimit = e.target.value.length;
      this.$emit("input", e.target.value);
    }
  }
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
    <small id="rem">残り{{60 - titleLimit }}文字</small>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

input[type='text'] {
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
  color: #7c7c7c;
  margin-top: 2px;
  font-size: 12px;
}
</style>