<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    value: { type: String, required: true },
    options: { type: Array, required: true },
    name: { type: String, required: true },
  },
  setup: (_, ctx) => {
    const updateValue = (e: any) => {
      ctx.emit("input", e);
    };

    return {
      updateValue,
    };
  },
});
</script>

<template>
  <v-row class="mt-1">
    <v-radio-group
      v-for="(option, index) in options"
      :key="index"
      :value="value"
    >
      <v-row>
        <v-radio
          :label="option.label"
          color="primary"
          class="ml-8 mb-0"
          type="radio"
          :name="name"
          :value="option.value"
          @change="updateValue(option.value)"
        ></v-radio>
      </v-row>
    </v-radio-group>
  </v-row>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
