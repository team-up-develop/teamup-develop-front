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
import { isEmailValid, isPasswordValid, isFormBaseInfo } from "@/modules/user";

// type Maybe<T> = T | null;

type State = {
  userName: string;
  lastName: string;
  firstName: string;
  userBirthday: string;
  learningStartDate: string;
  dialog: boolean;
  password: string;
  email: string;
};

const initialState = (): State => ({
  userName: "",
  lastName: "",
  firstName: "",
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

    (() => {
      const userName = sessionStorage.getItem("userName");
      const lastName = sessionStorage.getItem("lastName");
      const firstName = sessionStorage.getItem("firstName");
      const email = sessionStorage.getItem("email");
      const password = sessionStorage.getItem("password");
      const userBirthday = sessionStorage.getItem("userBirthday");
      const learningStartDate = sessionStorage.getItem("learningStartDate");
      state.userName = userName!;
      state.lastName = lastName!;
      state.firstName = firstName!;
      state.password = password!;
      state.email = email!;
      state.userBirthday = userBirthday!;
      state.learningStartDate = learningStartDate!;
    })();

    const nextStep2 = () => {
      if (
        state.userName &&
        state.firstName &&
        state.lastName &&
        state.userBirthday &&
        state.learningStartDate &&
        state.password &&
        state.email
      ) {
        const params: RegisterSessionFirstParams = {
          userName: state.userName,
          lastName: state.lastName,
          firstName: state.firstName,
          userBirthday: state.userBirthday,
          learningStartDate: state.learningStartDate,
          password: state.password,
          email: state.email,
        };
        sessionStorage.setItem("userName", params.userName);
        sessionStorage.setItem("lastName", params.lastName);
        sessionStorage.setItem("firstName", params.firstName);
        sessionStorage.setItem("userBirthday", params.userBirthday);
        sessionStorage.setItem("learningStartDate", params.learningStartDate);
        sessionStorage.setItem("password", params.password);
        sessionStorage.setItem("email", params.email);

        return router.push({ name: "RegisterStepSkill" });
      } else {
        console.log("必須が入力されていません");
      }
    };

    return {
      ...toRefs(state),
      nextStep2,
      isForm: computed(() =>
        isFormBaseInfo(
          state.userName,
          state.lastName,
          state.firstName,
          state.userBirthday,
          state.learningStartDate,
          state.password,
          state.email
        )
      ),
      isEmailValid: computed(() => isEmailValid(state.email)),
      isPasswordValid: computed(() => isPasswordValid(state.password)),
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
              name="userName"
              text-label="ユーザー名"
              :mandatory="true"
              mandatory-text=""
              placeholder="例) TeamUp"
              maxlength="30"
              :remaining="false"
            />
          </div>
          <div class="input-area">
            <InputArea
              v-model="lastName"
              type="text"
              name="lastName"
              text-label="姓"
              :mandatory="true"
              mandatory-text=""
              placeholder="例) チームアップ"
              maxlength="30"
              :remaining="false"
            />
          </div>
          <div class="input-area">
            <InputArea
              v-model="firstName"
              type="text"
              name="firstName"
              text-label="名"
              :mandatory="true"
              mandatory-text=""
              placeholder="例) 太郎"
              maxlength="30"
              :remaining="false"
            />
          </div>
          <div class="input-area">
            <InputArea
              v-model="email"
              type="email"
              name="email"
              text-label="メールアドレス"
              :mandatory="true"
              mandatory-text=""
              placeholder="example@teamUp.com"
              maxlength="100"
              :remaining="false"
              valid-message="メールアドレスの形式が正しくありません"
              :is-valid="isEmailValid"
            />
          </div>
          <div class="input-area">
            <InputArea
              v-model="password"
              type="password"
              name="password"
              text-label="パスワード"
              :mandatory="true"
              mandatory-text=""
              placeholder="パスワードを入力してください"
              maxlength="100"
              :remaining="false"
              valid-message="8文字以上で入力してください"
              :is-valid="isPasswordValid"
            />
          </div>
          <div class="input-area">
            <DatePickerArea
              v-model="userBirthday"
              placeholder="生年月日"
              name="userBirthday"
              type="text"
              text-label="生年月日"
              :mandatory="true"
              mandatory-text=""
            />
          </div>
          <div class="input-area">
            <DatePickerArea
              v-model="learningStartDate"
              placeholder="学習開始日"
              name="learningStartDate"
              type="text"
              text-label="学習開始日"
              :mandatory="true"
              mandatory-text=""
            />
          </div>
          <div class="bottom" v-if="isForm && isEmailValid && isPasswordValid">
            <v-btn class="next-btn" @click="nextStep2">次へ1/3</v-btn>
          </div>
          <div class="bottom" v-else>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="next-btn-false" v-on="on" v-bind="attrs">
                  次へ1/3
                </v-btn>
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

    @media (max-width: $sm) {
      padding: 0 1rem;
    }
  }
}

.input-area {
  height: 90px;
}

.bottom {
  width: 100%;
  height: 100px;
  margin: 0 auto;

  .next-btn {
    @include box-shadow-btn;
    @include blue-btn;
    color: $white;
    display: block;
    padding: 0 3rem;
    height: 46px;
    border-radius: 25px;
    border: none;
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
    display: block;
    padding: 0 3rem;
    height: 46px;
    border-radius: 25px;
    border: none;
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
