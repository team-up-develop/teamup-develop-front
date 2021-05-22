<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
import Vuex from "@/store/index";
import ChatGroups from "@/components/Organisms/Chats/ChatGroups.vue";
import SendMessage from "@/components/Organisms/Chats/SendMessage.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";

type State = {
  userId: number;
};

const initialState = (): State => ({
  userId: Vuex.state.auth.userId,
});

export default defineComponent({
  components: {
    ChatGroups,
    SendMessage,
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
        text: "チャット",
        disabled: true,
      },
    ]);

    const isLogin = computed(() => {
      return state.userId ? true : false;
    });

    onMounted(() => {
      if (!state.userId) {
        return;
      }
    });

    return {
      ...toRefs(state),
      breadcrumbs,
      isLogin,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :breadCrumbs="breadcrumbs" />
    <div class="wrapper">
      <v-sheet class="chat-card" v-if="isLogin">
        <div class="chat-card__left">
          <div class="title" />
          <ChatGroups :userId="userId" />
        </div>
        <div class="chat-card__right">
          <div class="main" ref="target">
            <header class="header" />
          </div>
          <div class="bottom">
            <SendMessage :id="0" />
          </div>
        </div>
      </v-sheet>
      <template v-else>
        ログインが必要です
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

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
        width: 100%;
      }

      .title {
        width: 100%;
        height: 60px;
        padding: 1rem 0.6rem;
        font-size: 0.5em;
        text-align: left;
        border-bottom: $card-border-color 1px solid;
        box-shadow: 0 6px 2px -2px rgb(189, 189, 189);
        background-color: $white;
        z-index: 10;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        left: 0;
        display: flex;
        font-weight: bold;
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
        display: none;
      }

      .main {
        height: 85%;
        overflow: scroll;
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
          border-radius: 20px 30px 0 0;
          height: 60px;
          box-shadow: 0 6px 2px -2px rgb(189, 189, 189);
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

        .chat-form {
          width: 80%;
          border-radius: 8px;
          padding: 1rem;
          background-color: rgba(128, 128, 128, 0.172);
          border: $card-border-color 1px solid;
          float: left;
          resize: none;
          outline: none;
          margin-left: 1rem;
        }

        .send {
          @include grey-btn;
          color: $white;
          padding: 1rem 1rem;
          font-weight: bold;
          font-size: 14px;
          border-radius: 8px;
          appearance: none;
          border: none;
          transition: 0.3s;
          outline: none;
        }
      }
    }
  }
}
</style>
