<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
} from "@vue/composition-api";
import Vuex from "@/store/index";
import axios from "axios";
import { API_URL, catchError } from "@/master";
import { messageParams } from "@/types/params";

type State = {
  userId: number;
  chatMessage: string;
};

const initialState = (): State => ({
  chatMessage: "",
  userId: Vuex.state.auth.userId,
});

export default defineComponent({
  props: {
    id: { type: Number, defalut: 0, required: true },
  },
  setup: (props) => {
    const state = reactive<State>(initialState());

    // * job_id が存在するか判別
    const isChat = computed(() => {
      return props.id == 0 ? false : true;
    });

    // * メッセージの送信
    const postMessage = async () => {
      const params: messageParams = {
        message: state.chatMessage,
        user_id: state.userId,
        job_id: props.id,
      };
      // ? 空のメッセージは送信させない
      if (params.message == "") {
        return console.log("空のメッセージは送信させない");
      }
      try {
        // ? 投稿
        await axios.post<messageParams>(`${API_URL}/chat_message`, params);
      } catch (error) {
        catchError(error);
      }
      state.chatMessage = "";
    };

    return {
      ...toRefs(state),
      isChat,
      postMessage,
    };
  },
});
</script>

<template>
  <v-row>
    <div class="is-message-room" v-if="isChat">
      <textarea
        type="text"
        class="chat-form"
        v-model="chatMessage"
        name=""
        maxlength="250"
        placeholder="メッセージを入力してください"
      />
      <span @click="postMessage">
        <button class="send">送信する</button>
      </span>
    </div>
    <div v-else class="message-room">
      <textarea
        type="text"
        class="chat-form"
        name=""
        maxlength="0"
        placeholder="チャットグループを選択してください"
      />
      <span>
        <button class="send">送信する</button>
      </span>
    </div>
  </v-row>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.is-message-room {
  width: 100%;

  .chat-form {
    width: 80%;
    border-radius: 8px;
    padding: 1rem;
    background-color: $white;
    border: $card-border-color 1px solid;
    float: left;
    resize: none;
    outline: none;
    margin-left: 1rem;

    @media (max-width: 868px) {
      width: 70%;
    }
    @media (max-width: 500px) {
      width: 65%;
    }
    @media (max-width: 380px) {
      width: 60%;
    }
  }

  .send {
    @include neumorphism;
    @include blue-btn;
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
.message-room {
  width: 100%;

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

    @media (max-width: $me) {
      width: 70%;
    }
    @media (max-width: $sm) {
      width: 65%;
    }
    @media (max-width: $ti) {
      width: 60%;
    }
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
</style>
