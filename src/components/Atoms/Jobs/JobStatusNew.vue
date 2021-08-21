<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { Job } from "@/types/index";

export default defineComponent({
  props: {
    job: { type: Object as PropType<Job>, defalut: {}, required: true },
  },
  setup: () => {},
});
</script>

<template>
  <h3 class="ribbon">新規募集</h3>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.ribbon {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 5px;
  box-sizing: border-box;
  padding: 0 12px;
  margin: 0;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  letter-spacing: 0.1em;
  color: $white;
  background: $primary-color;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
}
.ribbon:before {
  position: absolute;
  content: "";
  top: 0;
  left: -7px;
  border: none;
  height: 38px;
  width: 7px;
  background: $primary-color;
  border-radius: 6px 0 0 6px;
}
.ribbon:after {
  position: absolute;
  content: "";
  bottom: -7px;
  left: -5px;
  border: none;
  height: 7px;
  width: 5px;
  background: $primary-color;
  border-radius: 6px 0 0 6px;
}
</style>
