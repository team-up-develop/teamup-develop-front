<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  SetupContext,
} from "@vue/composition-api";
import Template from "@/components/Templates/Manages/StatusChanges.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import { useUsers } from "@/hooks";

type State = {
  userId: number;
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
});

export default defineComponent({
  components: {
    Template,
    Breadcrumbs,
  },
  props: {
    // * job.idを受け取る
    id: { type: Number, default: null },
  },
  setup: (props, ctx) => {
    const state = reactive<State>(initialState(ctx));

    const { fetchRejectUser, rejectUsers } = useUsers();

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

    onMounted(async () => {
      await fetchRejectUser(props.id);
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      rejectUsers,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <Template
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
