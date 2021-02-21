<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from "@vue/composition-api";
import UserCard from "@/components/Organisms/Manages/UserCard.vue";
import JobCreateSkillCard from "@/components/Organisms/Jobs/JobCreateSkillCard.vue";
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
  },
  setup: () => {
    const state = reactive<State>(initialState());

    state.jobTitle = sessionStorage.getItem("jobTitle");
    state.devStartDate = sessionStorage.getItem("devStartDate");
    state.devEndDate = sessionStorage.getItem("devEndDate");
    state.jobDescription = sessionStorage.getItem("jobDescription");

    const isValue = computed(() => {
      if (state.jobTitle && state.devStartDate && state.devEndDate) {
        return true;
      }
      return false;
    });

    return {
      ...toRefs(state),
      isValue,
    };
  },
});
</script>

<template>
  <section>
    <v-container class="wrapper">
      <v-row v-if="isValue">
        <UserCard />
        <v-sheet class="create">
          <v-col>
            <JobCreateSkillCard
              :jobTitle="jobTitle"
              :devStartDate="devStartDate"
              :devEndDate="devEndDate"
              :jobDescription="jobDescription"
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

  @media screen and (max-width: 1100px) {
    width: 97%;
  }

  .not-value {
    min-height: 100vh;
  }
}

.create {
  @include card-border-color;
  width: 60%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
  font-size: 14px;
  padding: 0 2rem 2rem 2rem;
  color: $text-main-color;

  @media screen and (max-width: 1000px) {
    width: 50%;
  }

  @media screen and (max-width: 900px) {
    width: 85%;
    padding: 0 1rem 2rem 1rem;
  }

  @media screen and (max-width: 600px) {
    width: 95%;
  }

  @media screen and (max-width: 450px) {
    width: 98%;
    padding: 1rem;
  }
}
.jobs {
  text-decoration: none;
}
</style>
