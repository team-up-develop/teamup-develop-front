<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";

export default defineComponent({
  props: {
    color: { type: String, defalut: "" },
    icon: { type: String, defalut: "" },
    title: { type: String, defalut: "" },
  },
  setup: (props) => {
    const labelColor = computed(() => {
      return `color: ${props.color}; border-color: ${props.color};`;
    });
    return {
      labelColor,
    };
  },
});
</script>

<template>
  <div>
    <v-chip class="label" :style="labelColor" label outlined>
      <v-icon left>
        {{ icon }}
      </v-icon>
      {{ title }}
    </v-chip>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
