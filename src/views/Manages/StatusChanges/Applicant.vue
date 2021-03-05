<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
import axios from "axios";
import { ManageJob } from "@/types/index";
import { FetchManageJobs } from "@/types/fetch";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import StatusChanges from "@/components/Templates/Manages/StatusChanges.vue";
import { m, API_URL, catchError } from "@/master";
import Vuex from "@/store/index";

type State = {
  applyUsers: ManageJob[];
  userId: number;
};

const initialState = (): State => ({
  applyUsers: [],
  userId: Vuex.state.auth.userId,
});

export default defineComponent({
  components: {
    Breadcrumbs,
    StatusChanges,
  },
  props: {
    // * job.id
    id: { type: Number, default: null },
  },
  setup: (props) => {
    const state = reactive<State>(initialState());

    const breadcrumbs = computed(() => [
      {
        text: "探す",
        disabled: false,
        href: "/jobs",
      },
      {
        text: "管理案件",
        href: "/manage",
        disabled: false,
      },
      {
        text: "応募者一覧",
        disabled: true,
        href: `/manage/applicant/${props.id}`,
      },
    ]);

    const fetchApplyUser = async () => {
      try {
        const res = await axios.get<FetchManageJobs>(`
            ${API_URL}/apply_jobs?job_id=${props.id}&apply_status_id=${m.APPLY_STATUS_APPLY}`);
        state.applyUsers = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };

    onMounted(() => {
      fetchApplyUser();
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      fetchApplyUser,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <StatusChanges
      :jobId="id"
      :userId="userId"
      :users="applyUsers"
      :activeCss="1"
    />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
