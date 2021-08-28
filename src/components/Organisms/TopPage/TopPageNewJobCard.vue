<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from "@vue/composition-api";
import CardJob from "@/components/Organisms/Jobs/CardJob.vue";
import useJobs from "@/hooks/useJobs";

type State = {
  newJobsDesktop: {}[];
  newJobs: any;
};

const initialState = (): State => ({
  newJobsDesktop: [], //? デスクトップサイズ 案件4つ
  newJobs: [], //? 通常 案件3つ
});

export default defineComponent({
  components: {
    CardJob,
  },
  setup: () => {
    const state = reactive<State>(initialState());
    const { jobs, fetchJobs } = useJobs();

    const fetchNewJobsa = () => {
      if (jobs.value.length > 2) {
        state.newJobs = jobs.value.slice(0, 3);
      } else {
        return state.newJobs;
      }
    };

    onMounted(async () => {
      await fetchJobs();
      await fetchNewJobsa();
    });

    return {
      ...toRefs(state),
      fetchNewJobsa,
      jobs,
    };
  },
});
</script>

<template>
  <section class="d-flex justify-space-between">
    <router-link
      :to="`/jobs/${newJob.id}/detail`"
      class="card"
      v-for="newJob in newJobs"
      :key="newJob.id"
    >
      <CardJob :job="newJob" />
    </router-link>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

section {
  margin: 2rem auto;
  width: 99%;

  @media screen and (max-width: $la) {
    flex-flow: column;
    align-items: center;
  }
}
.card {
  // margin: 0 auto;
  max-width: 420px;
  text-decoration: none;

  @media screen and (max-width: $sm) {
    max-width: 90%;
  }
}
</style>
