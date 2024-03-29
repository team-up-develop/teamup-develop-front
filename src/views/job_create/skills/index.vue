<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from "@vue/composition-api";
import UserCard from "@/components/Organisms/Manages/UserCard.vue";
import JobCreateSkillCard from "@/components/Organisms/Jobs/JobCreateSkillCard.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import { JobCreateSession1 as State } from "@/components/Organisms/Jobs/JobCreateCard.vue";

const initialState = (): State => ({
  jobTitle: "",
  devStartDate: "",
  devEndDate: "",
  jobDescription: "",
});

export default defineComponent({
  components: {
    UserCard,
    JobCreateSkillCard,
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

    state.jobTitle = sessionStorage.getItem("jobTitle")!;
    state.devStartDate = sessionStorage.getItem("devStartDate")!;
    state.devEndDate = sessionStorage.getItem("devEndDate")!;
    state.jobDescription = sessionStorage.getItem("jobDescription");

    const isValue = computed(() => {
      return state.jobTitle && state.devStartDate && state.devEndDate
        ? true
        : false;
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      isValue,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :bread-crumbs="breadcrumbs" />
    <v-container class="wrapper">
      <v-row v-if="isValue">
        <UserCard />
        <v-sheet class="create" elevation="1">
          <v-col>
            <JobCreateSkillCard
              :job-title="jobTitle"
              :dev-start-date="devStartDate"
              :dev-end-date="devEndDate"
              :job-description="jobDescription"
            />
          </v-col>
        </v-sheet>
      </v-row>
      <v-col class="not-value" v-else>
        入力されていないものが存在します。
      </v-col>
    </v-container>
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

  .not-value {
    min-height: 100vh;
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
    padding: 1rem 0.2rem;
  }
}
.jobs {
  text-decoration: none;
}
</style>
