<script lang="ts">
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import { User } from "@/types/index";
import { InputArea, DatePickerArea } from "@/components/Molecules/Forms";

const propsOption = {
  userInfo: {
    type: Object as PropType<User>, //TODO: any
    require: true,
    default: {},
  },
} as const;

type PropsOption = typeof propsOption;
export type ProfileEditModalProps = OutsidePropsType<PropsOption>;

type State = {
  id: number;
  lastName: string;
  firstName: string;
  birthday: string;
  email: string;
  password: string;
};
//TODO: any
const initialState = (userInfo: User | any): State => ({
  id: userInfo.id,
  lastName: userInfo.last_name,
  firstName: userInfo.first_name,
  email: userInfo.email,
  birthday: userInfo.birthday.substring(0, userInfo.birthday.indexOf("T")),
  password: userInfo.login_password,
});

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    InputArea,
    DatePickerArea,
  },
  props: propsOption,
  setup(props) {
    const state = reactive<State>(initialState(props.userInfo));

    return {
      ...toRefs(state),
    };
  },
});
</script>

<template>
  <div>
    <p class="font-weight-bold alert">
      基本情報編集にはご注意ください！
    </p>
    <InputArea
      v-model="lastName"
      type="text"
      name="lastName"
      textLabel="姓"
      :mandatory="true"
      mandatoryText=""
      placeholder="チームアップ"
      maxlength="60"
      :remaining="false"
    />
    <br />
    <InputArea
      v-model="firstName"
      type="text"
      name="firstName"
      textLabel="名"
      :mandatory="true"
      mandatoryText=""
      placeholder="太郎"
      maxlength="60"
      :remaining="false"
    />
    <br />
    <DatePickerArea
      v-model="birthday"
      placeholder="生年月日"
      name="birthday"
      type="text"
      textLabel="生年月日"
      :mandatory="true"
      mandatoryText=""
    />
    <InputArea
      v-model="email"
      type="text"
      name="email"
      textLabel="メールアドレス"
      :mandatory="true"
      mandatoryText=""
      placeholder="test@teamup.com"
      maxlength="128"
      :remaining="false"
    />
    <br />
    <InputArea
      v-model="password"
      type="text"
      name="password"
      textLabel="パスワード"
      :mandatory="true"
      mandatoryText=""
      placeholder="*******"
      maxlength="128"
      :remaining="false"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 3000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $modal-background;
}

.modal-window {
  background: $white;
  border-radius: 8px;
  overflow: hidden;
}

.modal-content {
  padding: 2rem 2rem;
  min-width: 660px;
  height: 74vh;
  text-align: left;
  overflow: scroll;

  @media screen and (max-width: $me) {
    min-width: 80vw;
  }
  @media screen and (max-width: $sm) {
    padding: 2rem 1rem;
    width: 52vh;
  }
  @media screen and (max-width: $ti) {
    padding: 2rem 1rem;
    width: 45vh;
  }

  // * モーダル
  section {
    .label-lang {
      font-weight: bold;
    }
    .label {
      display: block;
      font-weight: bold;
    }
    .edit-value {
      display: block;
      width: 100%;
      height: 48px;
      padding: 0.5rem;
      background-color: $dark-white;
    }
    .edit-text-value {
      display: block;
      width: 100%;
      height: 120px;
      padding: 0.5rem;
      background-color: $dark-white;
    }
  }
}

.modal-footer {
  width: 100%;
  position: relative;

  .btn {
    @include box-shadow-btn;
    background-color: $secondary-color;
    color: $white;
    padding: 1.5rem 4rem;
    border-radius: 25px;
    border: none;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    width: 280px;
    margin: 1rem auto;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s;
    outline: none;
  }
  .v-btn--disabled {
    @include box-shadow-btn;
    @include grey-btn;
    color: $white !important;
  }
}

button {
  color: $text-main-color;
  text-decoration: none;
  width: 33.3%;
  padding: 0.7rem 0;
  border-bottom: $dark-grey 1px solid;
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

.alert {
  color: $error-message-color;
  text-decoration: underline;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;
}

.modal-enter-active,
.modal-window {
  transition: opacity 0.4s, transform 0.4s;
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter,
.modal-window {
  transform: translateY(-20px);
}
</style>
