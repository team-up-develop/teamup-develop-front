<script lang="ts">
import { defineComponent, computed, PropType } from "@vue/composition-api";
import UserCard from "@/components/Organisms/Manages/UserCard.vue";
import JobsCard from "@/components/Organisms/Manages/JobsCard.vue";
import { FavoriteJob } from "@/types/index";

type Props = {
  activeCss: 2 | 3;
  userId: number;
  jobs: FavoriteJob[];
  routingParams: "favorite_job" | "apply_job";
};

export default defineComponent({
  components: {
    UserCard,
    JobsCard,
  },
  props: {
    activeCss: { type: Number as PropType<2 | 3>, defalut: 2, require: true }, //? 2:応募案件 3: 保存案件
    userId: { type: Number as PropType<number>, defalut: 0, require: true },
    jobs: {
      type: Array as PropType<FavoriteJob[]>,
      defalut: [],
      require: true,
    },
    routingParams: {
      type: String as PropType<"favorite_job" | "apply_job">,
      defalut: "",
      require: true,
    },
  },
  setup: (props: Props) => {
    const isLogin = computed(() => {
      return props.userId ? true : false;
    });

    return {
      isLogin,
    };
  },
});
</script>

<template>
  <section>
    <v-container class="wrapper" v-if="isLogin">
      <v-row>
        <UserCard />
        <v-sheet class="manage">
          <v-row class="manage__header">
            <router-link to="/manage" class="router-link">
              <span>管理案件</span>
            </router-link>
            <!-- <router-link
              v-if="activeCss === 1"
              to="/manage"
              class="router-link-active-click"
            >
              <span>管理案件</span>
            </router-link> -->
            <router-link
              v-if="activeCss === 2"
              to="/manage/apply_job"
              class="router-link-active-click"
            >
              <span>応募案件</span>
            </router-link>
            <router-link v-else to="/manage/apply_job" class="router-link">
              <span>応募案件</span>
            </router-link>
            <router-link
              v-if="activeCss === 3"
              to="/manage/favorite_job"
              class="router-link-active-click"
            >
              <span>保存案件</span>
            </router-link>
            <router-link v-else to="/manage/favorite_job" class="router-link">
              <span>保存案件</span>
            </router-link>
          </v-row>
          <v-col>
            <router-link
              :to="`/manage/${routingParams}/${job.job_id}`"
              v-for="job in jobs"
              :key="job.job_id"
              class="jobs"
            >
              <JobsCard :job="job.job" />
            </router-link>
          </v-col>
        </v-sheet>
      </v-row>
    </v-container>
    <template v-else>
      ログインが必要です
    </template>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.wrapper {
  width: 90%;
  max-width: none;

  @media screen and (max-width: $la) {
    width: 95%;
  }
}

.manage {
  width: 60%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: $white;
  position: relative;
  font-size: 14px;
  padding: 2rem;
  color: $text-main-color;

  @media screen and (max-width: $la) {
    width: 85%;
  }

  @media screen and (max-width: $me) {
    width: 95%;
  }

  @media screen and (max-width: $me) {
    padding: 2rem 1rem;
    width: 95%;
  }

  &__header {
    .router-link {
      color: $text-main-color;
      text-decoration: none;
      width: 33.3%;
      padding: 0.7rem 0;
      border-bottom: $dark-grey 1px solid;
    }
    .router-link:hover {
      @include tab-hover;
    }

    .router-link-active-click {
      font-weight: bold;
      color: $text-main-color;
      text-decoration: none;
      width: 33.3%;
      padding: 0.7rem 0;
      border-bottom: $dark-grey 1px solid;
      background-color: $dark-grey;
    }
  }
}
.jobs {
  text-decoration: none;
}
</style>