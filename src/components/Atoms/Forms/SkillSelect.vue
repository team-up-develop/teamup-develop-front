<script lang="ts">
import Vue from 'vue';
import vSelect from 'vue-select';

export default Vue.extend({ 
  components: {
    vSelect
  },
  props: {
    languages: { type: Array, required: true },
  },
  methods: {
    onInput(e: []) {
      console.log(e)
      this.$emit("input", e);
    }
  }
})
// TODO: label が nameだといいな 
</script>

<template>
  <v-col
    cols="12"
    sm="6"
  >
  <v-select
    class="input-area"
    multiple
    :options="languages"
    label="programingLanguageName"
    @input="onInput"
    :reduce="languages => languages.id"
  />
  <!-- <h1>Selected 言語:{{ selectedLang }}</h1> -->
  </v-col>
</template>

<style lang="scss" scoped>
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
</style>