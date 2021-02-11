<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { API_URL } from "@/master";
import CardJob from "@/components/Organisms/Jobs/CardJob.vue";

export default Vue.extend({
  components: {
    CardJob,
  },
  data() {
    return {
      newJobsDesktop: [], //? デスクトップサイズ 案件4つ
      newJobs: [], //? 通常 案件3つ
    };
  },
  created() {
    axios.get(`${API_URL}/jobs`).then((res) => {
      // this.newJobsDesktop = res.data.response.slice(0, 4);
      if (res.data.response) {
        if (res.data.response.length > 2) {
          this.newJobs = res.data.response.slice(0, 3);
        } else {
          return;
        }
      }
    });
  },
});
</script>

<template>
  <section>
    <v-row>
      <!-- 案件カード デスクトップ -->
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

  @media screen and (max-width: 500px) {
    max-width: 90%;
  }
}
</style>
