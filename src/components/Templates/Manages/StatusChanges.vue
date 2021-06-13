<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import {
  JobsCard,
  UserCard,
} from "@/components/Organisms/Manages/ChangeStatus";
import { User } from "@/types/index";
import { useUtils } from "@/hooks";

export default defineComponent({
  components: {
    UserCard,
    JobsCard,
  },
  props: {
    jobId: { type: Number as PropType<number>, defalut: 0, required: true },
    activeCss: {
      type: Number as PropType<1 | 2 | 3>,
      defalut: 1,
      required: true,
    }, //? 1: 応募者, 2: 参加者, 3: 拒否者
    userId: { type: Number as PropType<number>, defalut: 0, required: true },
    users: { type: Array as PropType<User[]>, defalut: [], required: true },
  },
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
        <JobsCard :jobId="jobId" />
        <v-sheet class="manage" elevation="1">
          <v-row class="manage__header">
            <router-link
              v-if="activeCss === 1"
              :to="`/manage/${jobId}/applicant`"
              class="router-link-active-click"
            >
              <span>応募者</span>
            </router-link>
            <router-link
              v-else
              :to="`/manage/${jobId}/applicant`"
              class="router-link"
            >
              <span>応募者</span>
            </router-link>
            <router-link
              v-if="activeCss === 2"
              :to="`/manage/${jobId}/participate`"
              class="router-link-active-click"
            >
              <span>参加者</span>
            </router-link>
            <router-link
              v-else
              :to="`/manage/${jobId}/participate`"
              class="router-link"
            >
              <span>参加者</span>
            </router-link>
            <router-link
              v-if="activeCss === 3"
              :to="`/manage/${jobId}/reject`"
              class="router-link-active-click"
            >
              <span>拒否者</span>
            </router-link>
            <router-link
              v-else
              :to="`/manage/${jobId}/reject`"
              class="router-link"
            >
              <span>拒否者</span>
            </router-link>
          </v-row>
          <v-col>
            <router-link
              :to="`/manage/profile/${jobId}/${user.user_id}/${user.id}/detail`"
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
