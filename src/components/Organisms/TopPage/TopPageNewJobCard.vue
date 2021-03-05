<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  // computed,
} from "@vue/composition-api";
// import axios from "axios";
// import { API_URL } from "@/master";
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
      fetchJobs,
      jobs,
    };
  },
});
</script>

<template>
  <section>
    <v-row>
      <router-link
        :to="`/jobs/${newJob.id}`"
        class="card"
        v-for="newJob in newJobs"
        :key="newJob.id"
      >
        <CardJob :job="newJob" />
      </router-link>
    </v-row>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

section {
  margin: 2rem auto;
  width: 98%;
}
.card {
  margin: 0 auto;
  max-width: 420px;

  @media screen and (max-width: $sm) {
    max-width: 90%;
  }
}
</style>
