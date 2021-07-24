<script lang="ts">
import { defineComponent, reactive, computed } from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import { User } from "@/types/index";
import { dayJsFormat } from "@/libs/dayjs";

const propsOption = {
  user: { type: Object as PropType<User>, required: true, defalut: {} },
} as const;

type PropsOption = typeof propsOption;
export type UserBasicInfoProps = OutsidePropsType<PropsOption>;

type State = {
  passwordModal: boolean;
};

const initialState = (): State => ({
  passwordModal: false,
});
export default defineComponent<InsidePropsType<PropsOption>>({
  props: propsOption,
  setup: () => {
    const state = reactive<State>(initialState());

    const isOpenPassword = computed(() => {
      return state.passwordModal ? true : false;
    });
    const openPassword = () => {
      state.passwordModal = true;
    };
    const closePassword = () => {
      state.passwordModal = false;
    };
    return {
      dayJsFormat,
      isOpenPassword,
      openPassword,
      closePassword,
    };
  },
});
</script>

<template>
  <div>
    <p class="text-color">他のユーザーには公開されていない情報です</p>
    <v-sheet class="card" elevation="1">
      <div class="d-flex justify-start">
        <div class="card__area">
          <label for="name" class="font-weight-bold text-left">姓</label>
          <p>{{ user.last_name }}</p>
        </div>
        <div class="card__area">
          <label for="name" class="font-weight-bold text-left">名</label>
          <p>{{ user.first_name }}</p>
        </div>
      </div>
      <div class="d-flex justify-start">
        <div class="card__area">
          <label for="name" class="font-weight-bold text-left">生年月日</label>
          <p>{{ dayJsFormat(user.birthday, "YYYY年 M月 D日") }}</p>
        </div>
        <div class="card__area">
          <label for="name" class="font-weight-bold text-left"
            >メールアドレス</label
          >
          <p>{{ user.email }}</p>
        </div>
      </div>
      <div>
        <label for="name" class="font-weight-bold text-left">パスワード</label>
        <section v-if="!isOpenPassword">
          <button @click="openPassword" class="password-btn">開く</button>
          <p>*********</p>
        </section>
        <section v-else>
          <button @click="closePassword" class="password-btn">
            閉じる
          </button>
          <p>{{ user.login_password }}</p>
        </section>
      </div>
    </v-sheet>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.text-color {
  color: $error-message-color;
}

.card {
  border-radius: 4px;
  padding: 1.5rem 4rem 1rem 4rem;
  margin-bottom: 2rem;
  position: relative;

  @media screen and (max-width: $sm) {
    padding: 1.5rem 1rem;
  }
  &__area {
    width: 50%;
    position: relative;
  }
}

.password-btn {
  background-color: $error-message-color;
  color: $white;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-size: 12px;
  float: right;
  outline: none;
}
</style>
