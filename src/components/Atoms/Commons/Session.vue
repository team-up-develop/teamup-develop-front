<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({ 
  props: {
    num: { type: Number as PropType<number>, default: 0 },
  }
});
</script>

<template>
  <section>
    <v-stepper :num="num">
      <v-stepper-header>
        <v-stepper-step
          :complete="num > 1"
          step="1"
        >
          STEP 1
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          :complete="num > 2"
          step="2"
        >
          STEP 2
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">
          STEP 3
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.v-stepper {
  box-shadow: none;
  &__header {
    box-shadow: none;
  }
}
</style>


