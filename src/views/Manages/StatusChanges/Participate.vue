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
import { ParticipateJob } from "@/types/index";
import { FetchParticipateJob } from "@/types/fetch";
import StatusChanges from "@/components/Templates/Manages/StatusChanges.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import { m, AUTH_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { useUtils } from "@/hooks";

type State = {
  assginUsers: ParticipateJob[];
  userId: number;
};

const initialState = (ctx: SetupContext): State => ({
  assginUsers: [],
  userId: ctx.root.$store.getters.userId,
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
        text: "参加者一覧",
        disabled: true,
        href: `/manage/${props.id}/participate`,
      },
    ]);

    const fetchAssginUser = async () => {
      try {
        const res = await $fetch<FetchParticipateJob>(
          `
            ${AUTH_URL}/apply_jobs?job_id=${props.id}&apply_status_id=${m.APPLY_STATUS_PARTICIPATE}
            `,
          {
            headers: auth.value,
          }
        );
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
