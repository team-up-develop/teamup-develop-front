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
import { AUTH_URL, m } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { Fetch, ManageJob } from "@/types/index";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import ApplyFavorite from "@/components/Templates/Manages/ApplyFavorite.vue";
import { useUtils } from "@/hooks";

type State = {
  applyJob: ManageJob[];
  userId: number;
  loading: boolean;
};

const initialState = (ctx: SetupContext): State => ({
  applyJob: [],
  userId: ctx.root.$store.getters.userId,
  loading: false,
});

export default defineComponent({
  components: {
    Breadcrumbs,
    ApplyFavorite,
  },
  setup: (_, ctx) => {
    const state = reactive<State>(initialState(ctx));
    const { auth } = useUtils();
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

    // * 応募案件 / 参加案件 / 拒否案件 を取得
    const fetchApplyJobs = async () => {
      if (!state.userId) {
        return;
      }
      try {
        state.loading = true;
        const res = await $fetch<Fetch<ManageJob[]>>(
          `${AUTH_URL}/apply_jobs?user_id=${state.userId}`,
          {
            headers: auth.value,
          }
        );
        state.applyJob = res.data.response.filter(
          (v) =>
            v.apply_status_id === m.APPLY_STATUS_APPLY ||
            v.apply_status_id === m.APPLY_STATUS_PARTICIPATE ||
            v.apply_status_id === m.APPLY_STATUS_REJECT
        );
        state.loading = false;
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
    <Breadcrumbs :bread-crumbs="breadcrumbs" />
    <ApplyFavorite
      :jobs="applyJob"
      :active-css="2"
      routing-params="apply_job"
      :loading="loading"
    />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
