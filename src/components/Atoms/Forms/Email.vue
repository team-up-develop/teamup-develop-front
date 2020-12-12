<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({ 
  props: {
    value: { type: String as PropType<string>, required: true },
    type: { type: String as PropType<string>, required: true },
    placeholder: { type: String as PropType<string>, required: false }
  },
  methods: {
    updateEmail(e: any) {
      this.$emit("input", e.target.value);
    }
  }
});
</script>

<template>
  <section>
    <input 
      class="input"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="updateEmail"
    />
  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.input {
  width: 100%;
  background: #EFEFEF;
  border: none;
  border-radius: 0;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 1rem;
  border-radius: 4px;
  margin: 0 0 20px;
}
</style>