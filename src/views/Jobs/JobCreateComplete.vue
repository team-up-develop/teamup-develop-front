<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
import Vuex from "@/store/index";
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import UserCard from "@/components/Organisms/Manages/UserCard.vue";
import JobCreateCompleteCard from "@/components/Organisms/Jobs/JobCreateCompleteCard.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";

type State = {
  loading: boolean;
  userId: number;
};

const initialState = (): State => ({
  loading: true,
  userId: Vuex.state.auth.userId,
});

export default defineComponent({
  components: {
    Loading,
    UserCard,
    JobCreateCompleteCard,
    Breadcrumbs,
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
        text: "案件作成",
        disabled: true,
      },
    ]);

    const isLogin = computed(() => {
      if (state.userId) {
        return true;
      }
      return false;
    });

    const Loading = () => {
      setTimeout(() => {
        state.loading = false;
      }, 1500);
    };

    onMounted(() => {
      Loading();
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      Loading,
      isLogin,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <v-container class="wrapper" v-show="!loading">
      <v-row v-if="isLogin">
        <UserCard />
        <v-card class="create">
          <v-col>
            <JobCreateCompleteCard />
          </v-col>
        </v-card>
      </v-row>
      <template v-else>
        ログインが必要です
      </template>
    </v-container>
    <Loading v-show="loading"> </Loading>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.wrapper {
  width: 90%;
  max-width: none;
  margin-bottom: 1rem;

  @media screen and (max-width: $la) {
    width: 95%;
  }
}

.create {
  width: 60%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: $white;
  position: relative;
  font-size: 14px;
  padding: 0 2rem 2rem 2rem;
  color: $text-main-color;

  @media screen and (max-width: $la) {
    width: 85%;
    padding: 0 1rem 2rem 1rem;
  }

  @media screen and (max-width: $me) {
    width: 95%;
  }

  @media screen and (max-width: $sm) {
    padding: 1rem;
  }
}
.jobs {
  text-decoration: none;
}
</style>
