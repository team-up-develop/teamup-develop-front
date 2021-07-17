<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  // onMounted,
  computed,
  SetupContext,
} from "@vue/composition-api";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import Pages from "@/components/Templates/Manages/StatusChanges.vue";
import { useUsers, useJobs } from "@/hooks";

type State = {
  userId: number;
  applyUsersStatus: {
    jobTitle: string | undefined;
    applyUsersNumber: number;
    assignUsersNumber: number;
    rejectUsersNumber: number;
  };
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
  applyUsersStatus: {
    jobTitle: "",
    applyUsersNumber: 0,
    assignUsersNumber: 0,
    rejectUsersNumber: 0,
  },
});

export default defineComponent({
  components: {
    Breadcrumbs,
    Pages,
  },
  props: {
    // * job.id
    id: { type: Number, default: null },
  },
  setup: (props, ctx) => {
    const state = reactive<State>(initialState(ctx));

    const {
      fetchApplyUser,
      applyUsers,
      fetchAssignUsers,
      assignUsers,
      fetchRejectUser,
      rejectUsers,
    } = useUsers();
    const { fetchJobDetail, job } = useJobs();

    (async () => {
      await Promise.all([
        fetchJobDetail(props.id),
        fetchApplyUser(props.id),
        fetchAssignUsers(props.id),
        fetchRejectUser(props.id),
      ]);
      state.applyUsersStatus.jobTitle = job?.value?.job_title;
      state.applyUsersStatus.applyUsersNumber = applyUsers.value.length;
      state.applyUsersStatus.assignUsersNumber = assignUsers.value.length;
      state.applyUsersStatus.rejectUsersNumber = rejectUsers.value.length;
    })();

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
        href: `/manage/${props.id}/apply_users`,
      },
    ]);

    return {
      ...toRefs(state),
      breadcrumbs,
      applyUsers,
      assignUsers,
      rejectUsers,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :bread-crumbs="breadcrumbs" />
    <Pages
      :job-id="id"
      :user-id="userId"
      :apply-users="applyUsers"
      :assign-users="assignUsers"
      :reject-users="rejectUsers"
      :apply-users-status="applyUsersStatus"
    />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
