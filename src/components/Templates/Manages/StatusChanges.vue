<script lang="ts">
import { defineComponent, computed, PropType } from "@vue/composition-api";
import JobsCard from "@/components/Organisms/Manages/ChangeStatus/JobsCard.vue";
import UserCard from "@/components/Organisms/Manages/ChangeStatus/UserCard.vue";
import { User } from "@/types/index";

type Props = {
  jobId: number;
  activeCss: 1 | 2 | 3;
  userId: number;
  users: User[];
};

export default defineComponent({
  components: {
    UserCard,
    JobsCard,
  },
  props: {
    jobId: { type: Number as PropType<number>, defalut: 0, require: true },
    activeCss: {
      type: Number as PropType<1 | 2 | 3>,
      defalut: 1,
      require: true,
    }, //? 1: 応募者, 2: 参加者, 3: 拒否者
    userId: { type: Number as PropType<number>, defalut: 0, require: true },
    users: { type: Array as PropType<User[]>, defalut: [], require: true },
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
        <JobsCard :jobId="jobId" />
        <v-sheet class="manage">
          <v-row class="manage__header">
            <router-link
              v-if="activeCss === 1"
              :to="`/manage/applicant/${jobId}`"
              class="router-link-active-click"
            >
              <span>応募者</span>
            </router-link>
            <router-link
              v-else
              :to="`/manage/applicant/${jobId}`"
              class="router-link"
            >
              <span>応募者</span>
            </router-link>
            <router-link
              v-if="activeCss === 2"
              :to="`/manage/participate/${jobId}`"
              class="router-link-active-click"
            >
              <span>参加者</span>
            </router-link>
            <router-link
              v-else
              :to="`/manage/participate/${jobId}`"
              class="router-link"
            >
              <span>参加者</span>
            </router-link>
            <router-link
              v-if="activeCss === 3"
              :to="`/manage/reject/${jobId}`"
              class="router-link-active-click"
            >
              <span>拒否者</span>
            </router-link>
            <router-link
              v-else
              :to="`/manage/reject/${jobId}`"
              class="router-link"
            >
              <span>拒否者</span>
            </router-link>
          </v-row>
          <v-col>
            <router-link
              :to="`/manage/profile/${jobId}/${user.user_id}/${user.id}`"
              v-for="user in users"
              :key="user.id"
              class="users"
            >
              <UserCard :user="user" />
            </router-link>
          </v-col>
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

.users {
  text-decoration: none;
}
</style>