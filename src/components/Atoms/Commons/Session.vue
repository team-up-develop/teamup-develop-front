<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  PropType,
} from "@vue/composition-api";

const initialState = () => ({
  e1: 1,
});

export default defineComponent({
  props: {
    num: { type: Number as PropType<1 | 2 | 3>, default: 0 },
  },
  setup: (props) => {
    const state = reactive(initialState());

    const init = () => {
      state.e1 = props.num;
    };
    init();
    return {
      ...toRefs(state),
    };
  },
});
</script>

<template>
  <section>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="blue lighten-1">
          STEP 1
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="e1 > 2" step="2" color="blue lighten-1">
          STEP 2
        </v-stepper-step>
        <v-divider />
        <v-stepper-step step="3" color="blue lighten-1">
          STEP 3
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.v-stepper {
  box-shadow: none;
  &__header {
    box-shadow: none;
  }
}
</style>
