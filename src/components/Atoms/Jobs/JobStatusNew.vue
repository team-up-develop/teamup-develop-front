<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import { m } from "@/master";

export default defineComponent({
  props: {
    job: { type: Object, defalut: null, require: true },
  },
  setup: (props: any) => {
    const isStatusNew = computed(() => {
      if (props.job.job_status_id == m.JOB_STATUS_NEW) {
        return true;
      }
      return false;
    });

    return {
      isStatusNew,
    };
  },
});
</script>

<template>
  <section>
    <label v-if="isStatusNew" class="label pa-2 pr-4" label>
      <v-icon left>
        mdi-label
      </v-icon>
      <span>新規募集</span>
    </label>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.label {
  width: 106px;
  font-size: 14px;
  background-color: $primary-color;
  color: $white;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;

  @media screen and (max-width: $ti) {
    display: none;
  }
}
</style>
