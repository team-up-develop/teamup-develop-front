<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
import { RejectJob } from "@/types/index";
import { FetchRejectJob } from "@/types/fetch";
import { $fetch, m, API_URL, catchError } from "@/master";
import StatusChanges from "@/components/Templates/Manages/StatusChanges.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import Vuex from "@/store/index";

type State = {
  rejectUsers: RejectJob[];
  userId: number;
};

const initialState = (): State => ({
  rejectUsers: [],
  userId: Vuex.state.auth.userId,
});

export default defineComponent({
  components: {
    StatusChanges,
    Breadcrumbs,
  },
  props: {
    // * job.idを受け取る
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
        text: "拒否者一覧",
        disabled: true,
        href: `/manage/reject/${props.id}`,
      },
    ]);

    const fetchRejectUser = async () => {
      try {
        const res = await $fetch<FetchRejectJob>(`
            ${API_URL}/apply_jobs?job_id=${props.id}&apply_status_id=${m.APPLY_STATUS_REJECT}`);
        state.rejectUsers = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };

    onMounted(() => {
      fetchRejectUser();
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      fetchRejectUser,
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
      :users="rejectUsers"
      :activeCss="3"
    />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
