<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
} from "@vue/composition-api";
import { RegisterSessionFirstParams } from "@/types/params";
import Session from "@/components/Atoms/Commons/Session.vue";
import DatePickerArea from "@/components/Molecules/Forms/DatePickerArea.vue";
import InputArea from "@/components/Molecules/Forms/InputArea.vue";

type Maybe<T> = T | null;

type State = {
  userName: Maybe<string>;
  nickName: Maybe<string>;
  userBirthday: Maybe<string>;
  learningStartDate: Maybe<string>;
  dialog: boolean;
  password: Maybe<string>;
  email: Maybe<string>;
};

const initialState = (): State => ({
  userName: "",
  nickName: "",
  password: "",
  userBirthday: "",
  learningStartDate: "",
  email: "",
  dialog: false,
});

export default defineComponent({
  components: {
    Session,
    DatePickerArea,
    InputArea,
  },
  setup(_, ctx: any) {
    const state = reactive<State>(initialState());
    const router = ctx.root.$router;

    const strageGet = () => {
      const userName = sessionStorage.getItem("userName");
      const nickName = sessionStorage.getItem("nickName");
      const email = sessionStorage.getItem("email");
      const password = sessionStorage.getItem("password");
      const userBirthday = sessionStorage.getItem("userBirthday");
      const learningStartDate = sessionStorage.getItem("learningStartDate");
      state.userName = userName;
      state.nickName = nickName;
      state.password = password;
      state.email = email;
      state.userBirthday = userBirthday;
      state.learningStartDate = learningStartDate;
    };

    const isForm = computed(() => {
      return state.userName &&
        state.nickName &&
        state.userBirthday &&
        state.learningStartDate &&
        state.password &&
        state.email
        ? true
        : false;
    });

    const nextStep2 = () => {
      if (
        state.userName &&
        state.nickName &&
        state.userBirthday &&
        state.learningStartDate &&
        state.password &&
        state.email
      ) {
        const params: RegisterSessionFirstParams = {
          userName: state.userName,
          nickName: state.nickName,
          userBirthday: state.userBirthday,
          learningStartDate: state.learningStartDate,
          password: state.password,
          email: state.email,
        };
        sessionStorage.setItem("userName", params.userName);
        sessionStorage.setItem("nickName", params.nickName);
        sessionStorage.setItem("userBirthday", params.userBirthday);
        sessionStorage.setItem("learningStartDate", params.learningStartDate);
        sessionStorage.setItem("password", params.password);
        sessionStorage.setItem("email", params.email);

        return router.push({ name: "RegisterStep2" });
      } else {
        console.log("必須が入力されていません");
      }
    };

    strageGet();

    return {
      ...toRefs(state),
      nextStep2,
      isForm,
    };
  },
});
</script>

<template>
  <section>
    <div class="wrapper">
      <div class="title">基本情報入力</div>
      <v-card class="pa-1">
        <div class="session">
          <Session :num="2" />
        </div>
        <v-col class="container text-left">
          <div class="input-area">
            <InputArea
              v-model="userName"
              type="text"
              name="jobTitle"
              textLabel="氏名"
              :mandatory="true"
              mandatoryText=""
              placeholder="例) チームアップ 太郎"
              maxlength="30"
              :remaining="false"
            />
          </div>
          <div class="input-area">
            <InputArea
              v-model="nickName"
              type="text"
              name="nickName"
              textLabel="ユーザー名"
              :mandatory="true"
              mandatoryText=""
              placeholder="例) Tarou"
              maxlength="30"
              :remaining="false"
            />
          </div>
          <div class="input-area">
            <InputArea
              v-model="email"
              type="email"
              name="email"
              textLabel="メールアドレス"
              :mandatory="true"
              mandatoryText="ログイン時必要"
              placeholder="example@teamUp.com"
              maxlength="100"
              :remaining="false"
            />
          </div>
          <div class="input-area">
            <InputArea
              v-model="password"
              type="password"
              name="email"
              textLabel="パスワード"
              :mandatory="true"
              mandatoryText="ログイン時必要"
              placeholder="パスワードを入力してください"
              maxlength="100"
              :remaining="false"
            />
          </div>
          <div class="input-area">
            <DatePickerArea
              v-model="userBirthday"
              placeholder="生年月日"
              name="userBirthday"
              type="text"
              textLabel="生年月日"
              :mandatory="true"
              mandatoryText=""
            />
          </div>
          <div class="input-area">
            <DatePickerArea
              v-model="learningStartDate"
              placeholder="学習開始日"
              name="learningStartDate"
              type="text"
              textLabel="学習開始日"
              :mandatory="true"
              mandatoryText=""
            />
          </div>
          <div class="bottom" v-if="isForm">
            <div class="next-btn" @click="nextStep2">次へ1/3</div>
          </div>
          <div class="bottom" v-else>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <div class="next-btn-false" v-on="on" v-bind="attrs">
                  次へ1/3
                </div>
              </template>
              <span>必須項目が入力されていません</span>
            </v-tooltip>
          </div>
        </v-col>
      </v-card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.wrapper {
  width: 550px;
  height: 90%;
  margin: 0 auto;

  @media (max-width: $me) {
    width: 95%;
  }

  .title {
    color: $primary-color;
    font-size: 1.8rem;
    font-weight: bold;
    height: 50px;
    padding: 1rem 2rem;
    margin-top: 1rem;
  }

  .session {
    height: 80px;
  }

  .container {
    padding: 0 2rem;

    @media (max-width: 500px) {
      padding: 0 1rem;
    }
  }
}

.label {
  font-weight: bold;
  margin-bottom: 1rem;
}
.label-required {
  color: $white;
  background-color: $error-message-color;
  font-size: 12px;
  font-weight: bold;
  border-radius: 25px;
  padding: 0.25rem 0.9rem;
  text-align: center;
  margin-left: 10px;
}
.input-area {
  height: 90px;
}

input[type="password"] {
  background-color: $dark-white;
  color: $text-main-color;
  font: 16px/24px sans-serif;
  box-sizing: border-box;
  width: 100%;
  padding: 0.3em;
  transition: 0.3s;
  letter-spacing: 1px;
  border-radius: 4px;
  padding: 0.5rem;
  margin-top: 0.5rem;

  &:focus {
    @include form-hover;
  }
}
.datepicker {
  width: 100%;
  height: 100px;
}

.bottom {
  width: 80%;
  height: 100px;
  margin: 0 auto;

  @media (max-width: $sm) {
    width: 100%;
  }

  .next-btn {
    @include box-shadow-btn;
    @include blue-btn;
    color: $white;
    text-align: left;
    display: block;
    padding: 1.1rem 3rem;
    border-radius: 25px;
    border: none;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: right;
    margin-top: 1.5rem;
    cursor: pointer;
    transition: 0.3s;
    outline: none;

    &:hover {
      @include box-shadow-btn;
    }
  }
  .next-btn-false {
    @include box-shadow-btn;
    @include grey-btn;
    color: $white;
    text-align: left;
    display: block;
    padding: 1.1rem 3rem;
    border-radius: 25px;
    border: none;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: right;
    margin-top: 1.5rem;
    cursor: pointer;
    transition: 0.3s;
    outline: none;
  }
}
</style>
