<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";

type Bread = [
  {
    text: string;
    href: string;
    disabled: boolean;
  }
];

const breadDefalut: Bread = [
  {
    text: "",
    href: "",
    disabled: false,
  },
];

export default defineComponent({
  props: {
    breadCrumbs: {
      type: Array as PropType<Bread[]>,
      require: true,
      defalut: breadDefalut,
    },
  },
  setup: () => {
    return {};
  },
});
</script>

<template>
  <div>
    <v-breadcrumbs :items="breadCrumbs" divider="/" />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.v-breadcrumbs {
  padding: 0 1rem 1rem 2rem;

  @media screen and (max-width: $sm) {
    padding: 0 1rem 1rem 1rem;
  }
}
</style>
