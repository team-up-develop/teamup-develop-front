<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  ref,
} from "@vue/composition-api";
import Vuex from "@/store/index";
import axios from "axios";
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import ChatGroups from "@/components/Organisms/Chats/ChatGroups.vue";
import SendMessage from "@/components/Organisms/Chats/SendMessage.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import { Message } from "@/types/index";
import { FetchMessage } from "@/types/fetch";
import { m, API_URL, truncate, catchError } from "@/master";

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

const initialState = (): State => ({
  chats: [],
  chatMessage: "",
  userId: Vuex.state.auth.userId,
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
  },
  props: {
    // * job.idを受け取る
    id: { type: Number, required: true },
  },
  setup: (props) => {
    const state = reactive<State>(initialState());
    let root: any = ref(null);

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

    const limit = (value: string, num: number) => truncate(value, num);

    const scrollChat = () => {
      setTimeout(() => {
        const a = Number(root.value.scrollHeight);
        const b = Number(root.value.clientHeight);
        const bottom = a - b;
        if (root.value.scrollTop === bottom) {
          return;
        } else {
          root.value.scrollTop = bottom;
        }
      }, 2000);
    };

    const getJob = async () => {
      try {
        const res = await axios.get(`${API_URL}/job/${props.id}`);
        state.jobTitle = res.data.response.job_title;
        state.clickJobId = res.data.response.id;
      } catch (error) {
        catchError(error);
      }
    };
    // * チャット内容を取得 setInterval
    const getChatMessage = async () => {
      let chatLength = 0;
      setInterval(async () => {
        try {
          const res = await axios.get<FetchMessage>(
            `${API_URL}/chat_messages?job_id=${props.id}`
          );
          state.loading = false;
          state.chats = res.data.response;
          if (chatLength === state.chats.length) {
            return console.log("chatLengt が一緒なのでスクロールしません。");
          } else {
            console.log("chatLengt の更新がかかりました。");
            chatLength = state.chats.length;
            scrollChat();
          }
        } catch (error) {
          catchError(error);
        }
      }, 1500);
    };

    onMounted(() => {
      // scrollChat();
      getChatMessage();
      getJob();
    });

    return {
      ...toRefs(state),
      m: computed(() => m),
      root,
      breadcrumbs,
      scrollChat,
      getChatMessage,
      getJob,
      limit,
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
          <div class="title">
            チャットグループ
          </div>
          <ChatGroups :userId="userId" />
        </div>
        <div class="chat-card__right">
          <div class="main" ref="target" v-show="!loading">
            <router-link :to="`/jobs/${clickJobId}`" class="router">
              <header class="header">{{ limit(jobTitle, 60) }}</header>
            </router-link>
            <section class="room" ref="root">
              <div class="balloon" v-for="chat in chats" :key="chat.id">
                <div class="balloon-image-left">
                  <div class="balloon-img"></div>
                </div>
                <div class="user-name">
                  {{ chat.user.user_name }}
                </div>
                <div class="balloon-text-right">
                  <p>{{ chat.message }}</p>
                </div>
              </div>
            </section>
          </div>
          <Loading v-show="loading" />
          <div class="bottom">
            <SendMessage :id="id" />
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

.router {
  text-decoration: none;
  color: $text-main-color;
}
.router:hover {
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

        header {
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

// * ここからトーク周り
.balloon {
  margin-bottom: 2em;
  position: relative;
}
.balloon:before,
.balloon:after {
  clear: both;
  content: "";
  display: block;
}
.balloon-image-left,
.balloon-image-right {
  width: 68px;
  height: 68px;
}
.balloon-image-left {
  float: left;
  // margin-right: 20px;
}
.user-name {
  padding: 0.2rem 1rem;
  text-align: left;
  color: $text-sub-color;
  font-size: 12px;
}
.balloon-image-right {
  float: right;
}
.balloon-img {
  @include user-image;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  margin: 0;
  background-color: #ffffff;
}
.balloon-image-description {
  padding: 5px 0 0;
  font-size: 10px;
  text-align: center;
  background-color: $light-grey;
}
.balloon-text-right,
.balloon-text-left {
  word-wrap: break-word;
  position: relative;
  padding: 0.8rem 1.4rem;
  // border: 1px solid #aaa;
  border-radius: 10px;
  max-width: -webkit-calc(100% - 120px);
  max-width: calc(100% - 120px);
  display: inline-block;
  background-color: $light-grey;
  text-align: left;
}
.balloon-text-right {
  float: left;
}
.balloon p {
  margin: 0 0 20px;
}
.balloon p:last-child {
  margin-bottom: 0;
}
/* 三角部分 */
.balloon-text-right:before {
  position: absolute;
  content: "";
  // border: 10px solid transparent;
  border-right: 10px solid #aaa;
  top: 15px;
  left: -20px;
}
.balloon-text-right:after {
  position: absolute;
  content: "";
  border: 10px solid transparent;
  border-right: 10px solid$light-grey;
  top: 15px;
  left: -19px;
}
.balloon-text-left:before {
  position: absolute;
  content: "";
  background-color: $light-grey;
  border: 10px solid transparent;
  border-left: 10px solid #aaa;
  top: 15px;
  right: -20px;
}
.balloon-text-left:after {
  position: absolute;
  content: "";
  border: 10px solid transparent;
  border-left: 10px solid #f2f2f2;
  top: 15px;
  right: -19px;
  background-color: #ffffff;
}
</style>
