<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  SetupContext,
} from "@vue/composition-api";
import { $fetch } from "@/libs/axios";
import { ApplyJob } from "@/types/index";
import { FetchApplyJob } from "@/types/fetch";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import StatusChanges from "@/components/Templates/Manages/StatusChanges.vue";
import { m, AUTH_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { useUtils } from "@/hooks";

type State = {
  applyUsers: ApplyJob[];
  userId: number;
};

const initialState = (ctx: SetupContext): State => ({
  applyUsers: [],
  userId: ctx.root.$store.getters.userId,
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
  setup: (props, ctx) => {
    const state = reactive<State>(initialState(ctx));
    const { auth } = useUtils();
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
        href: `/manage/${props.id}/applicant`,
      },
    ]);

    const fetchApplyUser = async () => {
      try {
        const res = await $fetch<FetchApplyJob>(
          `
            ${AUTH_URL}/apply_jobs?job_id=${props.id}&apply_status_id=${m.APPLY_STATUS_APPLY}`,
          {
            headers: auth.value,
          }
        );
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
