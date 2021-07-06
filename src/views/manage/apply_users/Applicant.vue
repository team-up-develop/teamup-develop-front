<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  SetupContext,
} from "@vue/composition-api";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import Template from "@/components/Templates/Manages/StatusChanges.vue";
import { useUsers } from "@/hooks";

type State = {
  userId: number;
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
});

export default defineComponent({
  components: {
    Breadcrumbs,
    Template,
  },
  props: {
    // * job.id
    id: { type: Number, default: null },
  },
  setup: (props, ctx) => {
    const state = reactive<State>(initialState(ctx));

    const { fetchApplyUser, applyUsers } = useUsers();

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

    onMounted(async () => {
      await fetchApplyUser(props.id);
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      applyUsers,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <Template :jobId="id" :userId="userId" :users="applyUsers" :activeCss="1" />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
