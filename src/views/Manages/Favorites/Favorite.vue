<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from "@vue/composition-api";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import Vuex from "@/store/index";
import ApplyFavorite from "@/components/Templates/Manages/ApplyFavorite.vue";
import useJobs from "@/hooks/useJobs";

type State = {
  userId: number;
};

const initialState = (): State => ({
  userId: Vuex.state.auth.userId,
});

export default defineComponent({
  components: {
    Breadcrumbs,
    ApplyFavorite,
  },
  setup: () => {
    const state = reactive<State>(initialState());
    const { favoriteJobs } = useJobs();

    const breadcrumbs = computed(() => [
      {
        text: "探す",
        disabled: false,
        href: "/jobs",
      },
      {
        text: "保存案件",
        disabled: true,
      },
    ]);

    return {
      ...toRefs(state),
      breadcrumbs,
      favoriteJobs,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <ApplyFavorite
      :jobs="favoriteJobs"
      :activeCss="3"
      routingParams="favorite_job"
    />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
