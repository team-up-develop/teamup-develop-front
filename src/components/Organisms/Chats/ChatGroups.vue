<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  PropType,
} from "@vue/composition-api";
import { $fetch } from "@/libs/axios";
import { Job, Fetch, ManageJob } from "@/types/index";
import { m, AUTH_URL } from "@/master";
import { truncate } from "@/hooks/useUtils";
import { catchError } from "@/libs/errorHandler";
import { dayJsFormat } from "@/libs/dayjs";
import { useUtils } from "@/hooks";

type Props = {
  userId: number;
};

type State = {
  chatGroups: Job[] | {};
  isActive: boolean;
  hasError: boolean;
};

const initialState = (): State => ({
  chatGroups: [],
  isActive: true,
  hasError: false,
});

export default defineComponent({
  props: {
    userId: { type: Number as PropType<number>, defalut: 0 },
  },
  setup: (props: Props) => {
    const state = reactive<State>(initialState());
    const { auth } = useUtils();

    const getChatGroups = async () => {
      try {
        const res = await $fetch<Fetch<ManageJob[]>>(
          `${AUTH_URL}/apply_jobs?user_id=${props.userId}`,
          {
            headers: auth.value,
          }
        );
        state.chatGroups = res.data.response.filter(
          (v) =>
            v.apply_status_id == m.APPLY_STATUS_PARTICIPATE ||
            v.apply_status_id === m.APPLY_STATUS_SELF
        );
      } catch (error) {
        catchError(error);
      }
    };

    onMounted(async () => {
      await getChatGroups();
    });

    return {
      ...toRefs(state),
      m: computed(() => m),
      dayJsFormat,
      truncate,
      getChatGroups,
    };
  },
});
</script>

<template>
  <section>
    <v-card
      :to="`/chat/${chatGroup.job.id}`"
      v-for="chatGroup in chatGroups"
      :key="chatGroup.job.id"
      :class="{ active: isActive, 'text-danger': hasError }"
    >
      <div class="group__area">
        <p>{{ truncate(chatGroup.job.job_title, 36) }}</p>
        <v-row class="row">
          <label
            for="name"
            class="selfPost"
            v-if="chatGroup.apply_status_id === m.APPLY_STATUS_SELF"
            >投稿案件</label
          >
          <label
            for="name"
            class="post"
            v-if="chatGroup.apply_status_id === m.APPLY_STATUS_PARTICIPATE"
            >参加案件</label
          >
          <section>
            {{ dayJsFormat(chatGroup.created_at, "YYYY年 M月 D日") }}
          </section>
        </v-row>
      </div>
    </v-card>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

// * v-card の boxshadowを消します
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
.active {
  text-decoration: none;
  border-bottom: $card-border-color 1px solid;
  border-radius: none;
}
.router-link-exact-active.router-link-active.active {
  font-weight: bold;
}

.group {
  &__area {
    width: 90%;
    height: 102px;
    margin: 0 auto;
    padding: 0.7rem 0 0.5rem 0;
    margin-top: 0.2rem;
    position: relative;

    @media (max-width: $me) {
      padding: 0.7rem 0 0.5rem 1rem;
      margin: 0;
    }

    .row {
      padding: 0rem 0 1.2rem 1rem;
      position: absolute;
      bottom: 0;
      width: 100%;

      .selfPost {
        @include box-shadow-btn;
        background-color: $third-dark;
        color: $white;
        padding: 0.2rem 1.5rem;
        width: 102px;
        font-weight: bold;
        font-size: 0.8em;
        border-radius: 8px;
        appearance: none;
        border: none;
        transition: 0.3s;
        outline: none;
      }

      .post {
        border: $third-dark 1px solid;
        color: $third-dark;
        background-color: $white;
        padding: 0.2rem 1.5rem;
        width: 102px;
        font-weight: bold;
        font-size: 0.8em;
        border-radius: 8px;
        appearance: none;
        transition: 0.3s;
        outline: none;
      }

      section {
        color: $text-sub-color;
        font-size: 12px;
        margin-left: 5.5rem;
        position: absolute;
        right: 0;
        top: 0;
        margin: 0.1rem 0 0 0;
      }
    }
    p {
      text-align: left;
      color: $text-main-color;
    }

    .chat-member-name {
      font-size: 12px;
      color: $text-sub-color;
    }
  }
}

.router {
  cursor: pointer;
  text-decoration: none;
}
</style>
