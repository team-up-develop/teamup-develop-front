<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
import { API_URL, m, catchError } from "@/master";
import axios from "axios";
import { ManageJob } from "@/types/index";
import { FetchManageJobs } from "@/types/fetch";
import Vuex from "@/store/index";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import ApplyFavorite from "@/components/Templates/Manages/ApplyFavorite.vue";

type State = {
  applyJob: ManageJob[];
  userId: number;
};

const initialState = (): State => ({
  applyJob: [],
  userId: Vuex.state.auth.userId,
});

export default defineComponent({
  components: {
    Breadcrumbs,
    ApplyFavorite,
  },
  setup: () => {
    const state = reactive<State>(initialState());

    const breadcrumbs = computed(() => [
      {
        text: "探す",
        disabled: false,
        href: "/jobs",
      },
      {
        text: "応募案件",
        disabled: true,
      },
    ]);

    // * 応募案件 / 参加案件 を取得
    const fetchApplyJobs = async () => {
      if (!state.userId) {
        return;
      }
      try {
        const res = await axios.get<FetchManageJobs>(
          `${API_URL}/apply_jobs?user_id=${state.userId}`
        );
        for (let i = 0; i < res.data.response.length; i++) {
          const applyJobCorrect: ManageJob = res.data.response[i];
          if (
            applyJobCorrect.apply_status_id === m.APPLY_STATUS_APPLY ||
            applyJobCorrect.apply_status_id === m.APPLY_STATUS_PARTICIPATE ||
            applyJobCorrect.apply_status_id === m.APPLY_STATUS_REJECT
          ) {
            state.applyJob.push(applyJobCorrect);
          }
        }
      } catch (error) {
        catchError(error);
      }
    };

    onMounted(() => {
      fetchApplyJobs();
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      fetchApplyJobs,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <ApplyFavorite
      :userId="userId"
      :jobs="applyJob"
      :activeCss="2"
      routingParams="apply_job"
    />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
