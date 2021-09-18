<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  PropType,
} from "@vue/composition-api";
import {
  JobsCard,
  UserCard,
} from "@/components/Organisms/Manages/ChangeStatus";
import { NotDataCard } from "@/components/Organisms/Manages";
import { User } from "@/types/index";
import { useUtils } from "@/hooks";
import { md } from "@/master";

type State = {
  tabs: { id: number; tabName: string }[];
  currentTab: 0 | 1 | 2;
};
export type ApplyUsersStatus = {
  applyUsersStatus: {
    jobTitle: string | undefined;
    applyUsersNumber: number;
    assignUsersNumber: number;
    rejectUsersNumber: number;
  };
};

const initialState = (): State => ({
  tabs: md.applyUsersTabs,
  currentTab: 0,
});

export default defineComponent({
  components: {
    UserCard,
    JobsCard,
    NotDataCard,
  },
  props: {
    jobId: { type: Number, defalut: 0, required: true },
    userId: { type: Number, defalut: 0, required: true },
    applyUsers: {
      type: Array as PropType<User[]>,
      defalut: [],
      required: true,
    },
    assignUsers: {
      type: Array as PropType<User[]>,
      defalut: [],
      required: true,
    },
    rejectUsers: {
      type: Array as PropType<User[]>,
      defalut: [],
      required: true,
    },
    applyUsersStatus: {
      type: Object as PropType<ApplyUsersStatus["applyUsersStatus"]>,
      required: true,
    },
  },
  setup: () => {
    const state = reactive<State>(initialState());
    const { isLogin } = useUtils();

    const clickTab = (index: 0 | 1 | 2) => {
      state.currentTab = index;
    };
    return {
      ...toRefs(state),
      isLogin,
      clickTab,
    };
  },
});
</script>

<template>
  <section>
    <v-container class="wrapper" v-if="isLogin">
      <v-row>
        <JobsCard :job-id="jobId" :apply-users-status="applyUsersStatus" />
        <v-sheet class="manage" elevation="1">
          <v-row class="manage__header">
            <button
              v-for="(tab, index) in tabs"
              :key="tab.name"
              :class="{ active: currentTab === index }"
              @click="clickTab(index)"
            >
              {{ tab.tabName }}
            </button>
            <v-col v-show="currentTab === 0">
              <template v-if="applyUsers.length > 0">
                <router-link
                  :to="
                    `/manage/profile/${jobId}/${user.user_id}/${user.id}/detail`
                  "
                  v-for="user in applyUsers"
                  :key="user.id"
                  class="users"
                >
                  <UserCard :user="user" />
                </router-link>
              </template>
              <div v-else>
                <NotDataCard text="まだ応募者が存在しません。" />
              </div>
            </v-col>
            <v-col v-show="currentTab === 1">
              <template v-if="assignUsers.length > 0">
                <router-link
                  :to="
                    `/manage/profile/${jobId}/${user.user_id}/${user.id}/detail`
                  "
                  v-for="user in assignUsers"
                  :key="user.id"
                  class="users"
                >
                  <UserCard :user="user" />
                </router-link>
              </template>
              <div v-else>
                <NotDataCard text="まだ参加者が存在しません。" />
              </div>
            </v-col>
            <v-col v-show="currentTab === 2">
              <template v-if="rejectUsers.length > 0">
                <router-link
                  :to="
                    `/manage/profile/${jobId}/${user.user_id}/${user.id}/detail`
                  "
                  v-for="user in rejectUsers"
                  :key="user.id"
                  class="users"
                >
                  <UserCard :user="user" />
                </router-link>
              </template>
              <div v-else>
                <NotDataCard text="まだ拒否者が存在しません。" />
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-row>
    </v-container>
    <template v-else>
      ログインが必要です！
    </template>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.wrapper {
  width: 90%;
  max-width: none;

  @media screen and (max-width: 1100px) {
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
    button {
      color: $text-main-color;
      text-decoration: none;
      width: 33.3%;
      padding: 0.7rem 0;
      border-bottom: $dark-grey 1px solid;
    }
    button:hover {
      @include tab-hover;
    }
    button.active {
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

.users {
  text-decoration: none;
}
</style>
