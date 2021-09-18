<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import {
  UserCard,
  JobsCard,
  NotDataCard,
} from "@/components/Organisms/Manages";
import { FavoriteJob } from "@/types/index";
import { useUtils } from "@/hooks";
import CircleLoading from "@/components/Organisms/Commons/Loading/CircleLoading.vue";

const propsOption = {
  activeCss: { type: Number as PropType<2 | 3>, defalut: 2, required: true }, //? 2:応募案件 3: 保存案件
  jobs: {
    type: Array as PropType<FavoriteJob[]>,
    defalut: [],
    required: true,
  },
  routingParams: {
    type: String as PropType<"favorite_job" | "apply_job">,
    defalut: "",
    required: true,
  },
  loading: { type: Boolean, defalut: false },
} as const;

type PropsOption = typeof propsOption;
export type ApplyFavoriteProps = OutsidePropsType<PropsOption>;

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    UserCard,
    JobsCard,
    NotDataCard,
    CircleLoading,
  },
  props: propsOption,
  setup: () => {
    const { isLogin } = useUtils();

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
        <v-sheet class="manage" elevation="1">
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
          <v-col v-show="!loading">
            <template v-if="jobs.length > 0">
              <router-link
                :to="`/manage/${routingParams}/${job.job_id}/detail`"
                v-for="job in jobs"
                :key="job.job_id"
                class="jobs"
              >
                <JobsCard :job="job.job" />
              </router-link>
            </template>
            <div v-else>
              <div v-if="activeCss == 2">
                <NotDataCard text="まだ案件に応募していません。" />
              </div>
              <div v-if="activeCss == 3">
                <NotDataCard text="まだ案件を保存していません。" />
              </div>
            </div>
          </v-col>
          <v-col v-show="loading">
            <CircleLoading />
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
      border: $dark-grey 1px solid;
      border-bottom: none;
      border-radius: 8px 8px 0 0;
    }
  }
}
.jobs {
  text-decoration: none;
}
</style>
