<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  SetupContext,
} from "@vue/composition-api";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import Manage from "@/components/Templates/Manages/Manage.vue";
import useJobs from "@/hooks/useJobs";
// import ApplyFavorite from "@/components/Templates/Manages/ApplyFavorite.vue";

type State = {
  userId: number;
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
});

export default defineComponent({
  components: {
    Breadcrumbs,
    Manage,
    // ApplyFavorite,
  },
  setup: (_, ctx) => {
    const state = reactive<State>(initialState(ctx));

    const breadcrumbs = computed(() => [
      {
        text: "探す",
        disabled: false,
        href: "/jobs",
      },
      {
        text: "管理案件",
        disabled: true,
      },
    ]);

    const { manageJobs } = useJobs();
    // console.log(manageJobs);

    return {
      ...toRefs(state),
      breadcrumbs,
      manageJobs,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <!-- <ApplyFavorite :userId="userId" :jobs="manageJobs" /> -->
    <Manage :jobs="manageJobs" :activeCss="1" />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
