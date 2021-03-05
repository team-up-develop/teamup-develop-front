<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from "@vue/composition-api";
// import { API_URL, catchError } from "@/master";
// import axios from "axios";
// import { ManageJob } from "@/types/index";
// import { FetchManageJobs } from "@/types/fetch";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import Vuex from "@/store/index";
import Manage from "@/components/Templates/Manages/Manage.vue";
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
    Manage,
  },
  setup: () => {
    const state = reactive<State>(initialState());

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
    <Manage :userId="userId" :jobs="manageJobs" :activeCss="1" />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
