<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
import { API_URL, catchError } from "@/master";
import axios from "axios";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import { Job } from "@/types/index";
import { FetchJobs } from "@/types/fetch";
import Vuex from "@/store/index";
import ApplyFavorite from "@/components/Templates/Manages/ApplyFavorite.vue";

type State = {
  favoriteJobs: Job[];
  userId: number;
};

const initialState = (): State => ({
  favoriteJobs: [],
  userId: Vuex.state.auth.userId,
});

export default defineComponent({
  components: {
    Breadcrumbs,
    ApplyFavorite,
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
        text: "保存案件",
        disabled: true,
      },
    ]);

    const fetchFavoriteJobs = async () => {
      try {
        const res = await axios.get<FetchJobs>(
          `${API_URL}/favorite_jobs?user_id=${state.userId}`
        );
        state.favoriteJobs = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };

    onMounted(() => {
      fetchFavoriteJobs();
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      fetchFavoriteJobs,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <ApplyFavorite
      :userId="userId"
      :jobs="favoriteJobs"
      :activeCss="3"
      routingParams="favorite_job"
    />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
