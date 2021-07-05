<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  ref,
  watch,
  SetupContext,
} from "@vue/composition-api";
import { $fetch } from "@/libs/axios";
import { useUtils } from "@/hooks";
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import ChatGroups from "@/components/Organisms/Chats/ChatGroups.vue";
import SendMessage from "@/components/Organisms/Chats/SendMessage.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import { Message } from "@/types/index";
import { FetchMessage, FetchJob } from "@/types/fetch";
import { m, API_URL, AUTH_URL } from "@/master";
import { truncate } from "@/hooks/useUtils";
import { catchError } from "@/libs/errorHandler";
import UserMessage from "@/components/Molecules/Chats/UserMessage.vue";

type State = {
  chats: Message[];
  chatMessage: string;
  userId: number;
  isActive: boolean;
  hasError: boolean;
  loading: boolean;
  jobTitle: string;
  clickJobId: number;
};

const initialState = (ctx: SetupContext): State => ({
  chats: [],
  chatMessage: "",
  userId: ctx.root.$store.getters.userId,
  isActive: true,
  hasError: false,
  loading: true,
  jobTitle: "",
  clickJobId: 0,
});

export default defineComponent({
  components: {
    Loading,
    ChatGroups,
    SendMessage,
    Breadcrumbs,
    UserMessage,
  },
  props: {
    // * job.idを受け取る
    id: { type: Number, required: true, defalut: 0 },
  },
  setup: (props, ctx) => {
    const state = reactive<State>(initialState(ctx));
    let root: any = ref(null);

    const { auth } = useUtils();

    const breadcrumbs = computed(() => [
      {
        text: "探す",
        disabled: false,
        href: "/jobs",
      },
      {
        text: "チャット",
        disabled: true,
      },
    ]);

    const scrollChat = () => {
      state.loading = false;
      setTimeout(() => {
        const a = Number(root.value.scrollHeight);
        const b = Number(root.value.clientHeight);
        const bottom = a - b;
        if (root.value.scrollTop === bottom) {
          // state.loading = false;
          return;
        } else {
          // state.loading = false;
          root.value.scrollTop = bottom;
        }
      }, 500);
    };

    watch(
      () => props.id,
      async (val: number) => {
        await fetchJob(val);
        await fetchMessage(val);
      }
    );

    const fetchJob = async (id: number) => {
      try {
        const res = await $fetch<FetchJob>(`${API_URL}/job/${id}`);
        state.jobTitle = res.data.response.job_title;
        state.clickJobId = res.data.response.id;
      } catch (error) {
        catchError(error);
      }
    };
    // * チャット内容を取得 setInterval
    const fetchMessage = async (id: number) => {
      let chatLength = 0;
      // state.loading = false;
      try {
        const res = await $fetch<FetchMessage>(
          `${AUTH_URL}/chat_messages?job_id=${id}`,
          {
            headers: auth.value,
          }
        );
        state.chats = res.data.response;
        if (chatLength === state.chats.length) {
          state.loading = false;
          return;
        } else {
          chatLength = state.chats.length;
          scrollChat();
        }
      } catch (error) {
        catchError(error);
      }
    };

    onMounted(() => {
      fetchMessage(props.id);
      fetchJob(props.id);
    });

    const blankJob = () => {
      const url = `/jobs/${state.clickJobId}/detail`;
      return window.open(url, "_blank");
    };

    return {
      ...toRefs(state),
      m: computed(() => m),
      root,
      breadcrumbs,
      scrollChat,
      fetchMessage,
      fetchJob,
      truncate,
      blankJob,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <div class="wrapper">
      <v-sheet class="chat-card">
        <div class="chat-card__left">
          <div class="title" />
          <ChatGroups :userId="userId" />
        </div>
        <div class="chat-card__right">
          <div class="main" ref="target" v-show="!loading">
            <div class="blank-link" @click="blankJob">
              <header class="header">{{ truncate(jobTitle, 60) }}</header>
              <header class="min">{{ truncate(jobTitle, 40) }}</header>
            </div>
            <section class="room" ref="root">
              <UserMessage :chats="chats" />
            </section>
          </div>
          <Loading v-show="loading" />
          <div class="bottom">
            <SendMessage :id="id" @reFetch="fetchMessage(clickJobId)" />
          </div>
        </div>
      </v-sheet>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.active {
  text-decoration: none;
}
.router-link-exact-active.router-link-active.active {
  font-weight: bold;
  text-decoration: underline;
}
.blank-link {
  text-decoration: underline;
  cursor: pointer;
  color: $text-main-color;
}
.blank-link:hover {
  color: $primary-color;
}

.wrapper {
  width: 90%;
  height: 90vh;
  margin: 0 auto;
  position: relative;

  @media screen and (max-width: $gr) {
    width: 100%;
  }

  .chat-card {
    @include card-border-color;
    background-color: $white;
    width: 980px;
    border-radius: 8px;
    margin: 0rem auto;
    padding: 0 0rem;
    position: absolute;
    right: 0;
    height: 93%;
    position: relative;

    @media (max-width: $me) {
      width: 95%;
    }

    &__left {
      width: 285px;
      height: 100%;
      box-shadow: 5px 0 3px #00000011;
      border-radius: 8px 0 0px 8px;
      font-size: 14px;
      background-color: $white;
      overflow: scroll;
      z-index: 10;
      position: relative;

      @media (max-width: $me) {
        display: none;
      }

      .title {
        width: 100%;
        height: 60px;
        padding: 1rem 0.6rem;
        font-size: 0.5em;
        text-align: left;
        border-bottom: $card-border-color 1px solid;
        background-color: $white;
        box-shadow: 0 6px 2px -2px rgb(189, 189, 189);
        z-index: 10;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        left: 0;
        display: flex;
        font-weight: bold;
      }

      .group {
        border-bottom: $card-border-color 1px solid;
        border-radius: none;

        &__area {
          width: 90%;
          height: 102px;
          margin: 0 auto;
          padding: 0.7rem 0 0.5rem 0;
          margin-top: 0.2rem;
          position: relative;

          .row {
            padding: 0rem 0 1rem 1rem;
            position: absolute;
            bottom: 0;
            // height: 30px;
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
    }

    &__right {
      width: 71%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 0 20px 20px 0;

      @media (max-width: $me) {
        width: 100%;
      }

      .main {
        height: 85%;
        display: flex;
        flex-direction: column;

        .header {
          background-color: $white;
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          left: 0;
          display: flex;
          font-weight: bold;
          text-align: left;
          padding: 0.4rem 2rem;
          border-bottom: $card-border-color 1px solid;
          margin-left: 0.2rem;
          border-radius: 0 20px 0 0;
          height: 60px;
          box-shadow: 0 6px 2px -2px rgb(189, 189, 189);

          @media (max-width: $sm) {
            display: none;
          }
        }

        .min {
          display: none;
          @media (max-width: $sm) {
            background-color: $white;
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            left: 0;
            display: flex;
            font-weight: bold;
            text-align: left;
            padding: 0.4rem 0.8rem;
            border-bottom: $card-border-color 1px solid;
            margin-left: 0.2rem;
            border-radius: 0 20px 0 0;
            height: 60px;
            box-shadow: 0 6px 2px -2px rgb(189, 189, 189);
          }
        }

        .room {
          padding: 1rem 2rem;
          overflow: scroll;

          @media (max-width: $me) {
            padding: 1rem 0.5rem 1rem 1rem;
          }
        }
      }

      .bottom {
        background-color: $light-grey;
        z-index: 10;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        border-radius: 0 0px 8px 0;
        box-shadow: 0 -3px 2px #00000020;
        padding: 1.5rem 0 1.5rem 1rem;

        @media (max-width: $sm) {
          padding: 1rem 0 1rem 0.1rem;
        }
      }
    }
  }
}

// * v-card の boxshadowを消します
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
</style>
