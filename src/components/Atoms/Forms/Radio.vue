<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { Md } from "@/master";

export default defineComponent({
  props: {
    value: { type: String as PropType<string>, required: true, default: "" },
    options: { type: Array as PropType<Md[]>, required: true, default: [] },
    name: { type: String as PropType<string>, required: true, default: "" },
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
          color="blue lighten-1"
          class="ml-8 mb-0"
          type="radio"
          :name="name"
          :value="option.value"
          @change="updateValue(option.value)"
        />
      </v-row>
    </v-radio-group>
  </v-row>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
