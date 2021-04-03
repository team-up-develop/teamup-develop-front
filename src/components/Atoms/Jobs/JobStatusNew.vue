<script lang="ts">
import { defineComponent, computed, PropType } from "@vue/composition-api";
import { m } from "@/master";
import { Job } from "@/types/index";

type Props = {
  job: Job;
};

export default defineComponent({
  props: {
    job: { type: Object as PropType<Job>, defalut: {}, require: true },
  },
  setup: (props: Props) => {
    const isStatusNew = computed(() => {
      return props.job.job_status_id == m.JOB_STATUS_NEW ? true : false;
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
