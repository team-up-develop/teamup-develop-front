<script lang="ts">
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default Vue.extend({
  components: {
    vSelect,
  },
  props: {
    value: { type: Array, required: true },
    options: { type: Array, required: true },
    name: { type: String, required: true },
    max: { type: Number, required: true },
  },
  methods: {
    onInput(e: []) {
      this.$emit("input", e);
    },
  },
});
</script>

<template>
  <section>
    <v-select
      class="input-area"
      multiple
      :options="options"
      label="name"
      @input="onInput"
      :reduce="(options) => options.id"
      :selectable="() => value.length < max"
    />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}

.input-area {
  margin: 0.7rem 0rem;
  font: 16px/24px sans-serif;
  box-sizing: border-box;
  width: 100%;
  transition: 0.3s;
  letter-spacing: 1px;
  color: $text-main-color;
  border-radius: 4px;
  border: none;
  background-color: $dark-white;
}
</style>
