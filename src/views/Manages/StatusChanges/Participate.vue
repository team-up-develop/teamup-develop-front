<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
import { ParticipateJob } from "@/types/index";
import { FetchParticipateJob } from "@/types/fetch";
import StatusChanges from "@/components/Templates/Manages/StatusChanges.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import { $fetch, m, API_URL, catchError } from "@/master";
import Vuex from "@/store/index";

type State = {
  assginUsers: ParticipateJob[];
  userId: number;
};

const initialState = (): State => ({
  assginUsers: [],
  userId: Vuex.state.auth.userId,
});

export default defineComponent({
  components: {
    Breadcrumbs,
    StatusChanges,
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
        text: "参加者一覧",
        disabled: true,
        href: `/manage/participate/${props.id}`,
      },
    ]);

    const fetchAssginUser = async () => {
      try {
        const res = await $fetch<FetchParticipateJob>(`
            ${API_URL}/apply_jobs?job_id=${props.id}&apply_status_id=${m.APPLY_STATUS_PARTICIPATE}
            `);
        state.assginUsers = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };

    onMounted(() => {
      fetchAssginUser();
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      fetchAssginUser,
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
      :users="assginUsers"
      :activeCss="2"
    />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
