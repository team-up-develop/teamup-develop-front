<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onMounted,
  // watch,
  // onMounted,
} from "@vue/composition-api";
import Session from "@/components/Atoms/Commons/Session.vue";
import { Language, Framework, Skill } from "@/types/index";
import { RegisterCompleteParams } from "@/types/params";
import { $post, API_URL, dayJs, catchError } from "@/master";
import Confirme from "@/components/Organisms/Modals/Base/Confirme.vue";

type Maybe<T> = T | null;

type State = {
  selectedLang: Maybe<any>;
  languages: Language[];
  selectedFramwork: any | null;
  framworks: Framework[];
  selectedSkill: any | null;
  skills: Skill[];
  bio: Maybe<string>;
  github: Maybe<string>;
  twitter: Maybe<string>;
  userName: string;
  lastName: string;
  firstName: string;
  password: string;
  userBirthday: string;
  learningStartDate: string;
  passwordModal: boolean;
  email: string;
  confirmModal: boolean;
  compliteOk: boolean;
};

const initialState = (): State => ({
  selectedLang: null,
  languages: [],
  selectedFramwork: null,
  framworks: [],
  selectedSkill: null,
  skills: [],
  bio: "",
  github: "",
  twitter: "",
  userName: "",
  lastName: "",
  firstName: "",
  password: "",
  userBirthday: "",
  learningStartDate: "",
  passwordModal: false,
  email: "",
  confirmModal: false,
  compliteOk: false,
});

export default defineComponent({
  components: {
    Session,
    Confirme,
  },
  setup(_, ctx: any) {
    const state = reactive<State>(initialState());
    const router = ctx.root.$router;
    const day = (value: string, format: string) => dayJs(value, format);

    const strageGet = () => {
      const userName = sessionStorage.getItem("userName");
      const lastName = sessionStorage.getItem("lastName");
      const firstName = sessionStorage.getItem("firstName");
      const password = sessionStorage.getItem("password");
      const email = sessionStorage.getItem("email");
      const userBirthday = sessionStorage.getItem("userBirthday");
      const learningStartDate = sessionStorage.getItem("learningStartDate");
      const programingLanguage = sessionStorage.getItem("programingLanguage");
      const programingFramework = sessionStorage.getItem("programingFramework");
      const skill = sessionStorage.getItem("skill");
      const bio = sessionStorage.getItem("bio");
      const github = sessionStorage.getItem("github");
      const twitter = sessionStorage.getItem("twitter");
      if (userName) {
        state.userName = userName;
      }
      if (lastName) {
        state.lastName = lastName;
      }
      if (firstName) {
        state.firstName = firstName;
      }
      if (password) {
        state.password = password;
      }
      if (email) {
        state.email = email;
      }
      if (userBirthday) {
        state.userBirthday = userBirthday;
      }
      if (learningStartDate) {
        state.learningStartDate = learningStartDate;
      }
      if (programingLanguage) {
        state.selectedLang = JSON.parse(programingLanguage);
      }
      if (programingFramework) {
        state.selectedFramwork = JSON.parse(programingFramework);
      }
      if (skill) {
        state.selectedSkill = JSON.parse(skill);
      }
      if (bio) {
        state.bio = bio;
      }
      if (github) {
        state.github = github;
      }
      if (twitter) {
        state.twitter = twitter;
      }
    };

    onMounted(async () => {
      await strageGet();
    });

    const isForm = computed(() => {
      if (
        state.userName &&
        state.lastName &&
        state.firstName &&
        state.password &&
        state.userBirthday &&
        state.learningStartDate &&
        state.selectedLang &&
        state.selectedFramwork &&
        state.selectedSkill
      ) {
        return true;
      }
      return false;
    });

    const isOpenPassword = computed(() => {
      return state.passwordModal ? true : false;
    });

    const openPassword = () => {
      state.passwordModal = true;
    };
    const closePassword = () => {
      state.passwordModal = false;
    };

    const backStep = () => {
      return router.push({ name: "RegisterStepSkill" });
    };

    const registerConfirm = () => {
      state.confirmModal = true;
    };

    const closeConfirm = () => {
      state.confirmModal = false;
    };
    // TODO: 登録周りパラメーター確認 エラー処理
    const register = async () => {
      console.log("register");
      // * date型に変換のための data用意
      function toDate<T, U>(str: T | any, delim: U): Date {
        const arr = str.split(delim);
        return new Date(arr[0], arr[1] - 1, arr[2]);
      }
      // //* 開始日
      const learningStart: string = state.learningStartDate;
      const learningStartDate: Date = toDate(learningStart, "-");
      // //* 生年月日
      const birthdayString: string = state.userBirthday;
      const birthdayDate: Date = toDate(birthdayString, "-");
      // * 言語を {id: Number}に変換
      const languageArray: {}[] = [];
      for (const selectedLang of state.selectedLang) {
        languageArray.push({ id: selectedLang });
      }
      // * フレームワークを{id: Number}に変換
      const framworksArray: {}[] = [];
      for (const selectedFramwork of state.selectedFramwork) {
        framworksArray.push({ id: selectedFramwork });
      }
      // * その他スキルを {id: Number}に変換
      const skillArray: {}[] = [];
      for (const selectedSkill of state.selectedSkill) {
        skillArray.push({ id: selectedSkill });
      }
      const params: RegisterCompleteParams = {
        user_name: state.userName,
        last_name: state.lastName,
        first_name: state.firstName,
        login_password: state.password,
        email: state.email,
        learning_start_date: learningStartDate,
        birthday: birthdayDate,
        programing_language_ids: languageArray,
        programing_framework_ids: framworksArray,
        skill_ids: skillArray,
        bio: state.bio,
        github_account: state.github,
        twitter_account: state.twitter,
      };
      console.log(JSON.stringify(params), "res");
      try {
        await $post<RegisterCompleteParams>(`${API_URL}/sign_up`, params);
        await removeSessionStrage();
        state.compliteOk = true;
      } catch (error) {
        catchError(error);
      }
    };

    const removeSessionStrage = () => {
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("lastName");
      sessionStorage.removeItem("firstName");
      sessionStorage.removeItem("password");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("userBirthday");
      sessionStorage.removeItem("learningStartDate");
      sessionStorage.removeItem("programingLanguage");
      sessionStorage.removeItem("programingFramework");
      sessionStorage.removeItem("skill");
      sessionStorage.removeItem("bio");
      sessionStorage.removeItem("github");
      sessionStorage.removeItem("twitter");
    };

    const redirectProfile = () => {
      return router.push({ name: "Jobs" });
    };
    return {
      ...toRefs(state),
      day,
      backStep,
      isForm,
      openPassword,
      closePassword,
      isOpenPassword,
      registerConfirm,
      closeConfirm,
      register,
      redirectProfile,
    };
  },
});
</script>

<template>
  <section>
    <Confirme
      v-if="confirmModal"
      :onFunction="register"
      confirmModalTitle="登録完了しますか？"
      compliteModalTitle="登録完了しました。"
      mainBtnText="登録する"
      subBtnText="閉じる"
      :compliteOk="compliteOk"
      @close="closeConfirm"
      @complite="redirectProfile"
    />
    <div class="wrapper">
      <div class="title">入力確認</div>
      <v-card class="pa-1 card">
        <div class="session">
          <Session :num="4" />
        </div>
        <v-col class="container text-left" v-if="isForm">
          <div class="input-area">
            <label for="name" class="label">ユーザー名</label>
            <p>{{ userName }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">姓</label>
            <p>{{ lastName }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">名</label>
            <p>{{ firstName }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">メールアドレス</label>
            <p>{{ email }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">パスワード</label>
            <section v-if="!isOpenPassword">
              <button @click="openPassword" class="password-btn">開く</button>
              <p>*********</p>
            </section>
            <section v-else>
              <button @click="closePassword" class="password-btn">
                閉じる
              </button>
              <p>{{ password }}</p>
            </section>
          </div>
          <div class="input-area">
            <label for="name" class="label">誕生日</label>
            <p>{{ day(userBirthday, "YYYY年 M月 D日") }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">学習開始日</label>
            <p>{{ day(learningStartDate, "YYYY年 M月 D日") }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">開発言語</label>
            <p>{{ selectedLang }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">フレームワーク</label>
            <p>{{ selectedFramwork }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">その他スキル</label>
            <p>{{ selectedSkill }}</p>
          </div>
          <div class="input-area pre-wrap">
            <label for="name" class="label">自己紹介</label>
            <p>{{ bio }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">GitHub URL</label>
            <p>{{ github }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">Twitter URL</label>
            <p>{{ twitter }}</p>
          </div>
          <div class="alert-message">
            <span
              >こちらで登録を完了させ、案件を作成、又は応募がすることができます。※今後はプロフィールからも変更ができます。</span
            >
          </div>
          <div class="bottom">
            <v-btn class="back-btn" @click="backStep">内容修正する</v-btn>
            <v-btn class="next-btn" @click="registerConfirm"
              >登録完了する</v-btn
            >
          </div>
        </v-col>
        <v-col v-else>
          <div class="false-card">
            <img class="alert-img py-4" src="@/assets/images/alert.png" />
            <div class="alert-message">
              <span
                >入力されていない項目があるようです。 <br />
                入力内容をご確認ください。
              </span>
            </div>
          </div>
          <div class="bottom">
            <v-btn class="back-btn" @click="backStep">内容修正する</v-btn>
            <v-btn class="next-btn-false">登録完了する</v-btn>
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
  .card {
    min-height: 615px;

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
}

.input-area {
  min-height: 60px;
}
.label {
  font-weight: bold;
}

.pre-wrap {
  white-space: pre-wrap;
}
.alert-message {
  padding: 0.5rem;
  border: 1px solid $error-message-color;
  span {
    color: $error-message-color;
    font-weight: bold;
  }
}
.false-card {
  min-height: 380px;
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
.bottom {
  width: 100%;
  height: 100px;
  margin: 2rem auto 0 auto;

  @media (max-width: $sm) {
    width: 100%;
  }

  .back-btn {
    @include neumorphismGrey;
    color: $primary-color;
    font-weight: 600;
    display: block;
    padding: 0 2rem;
    height: 46px;
    border-radius: 25px;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: left;
    transition: 0.3s;
    outline: none;
    text-decoration: none;

    @media (max-width: 400px) {
      padding: 0 1.2rem;
    }
  }

  .next-btn {
    @include box-shadow-btn;
    @include blue-btn;
    color: $white;
    display: block;
    padding: 0 2rem;
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
    cursor: pointer;
    transition: 0.3s;
    outline: none;

    @media (max-width: 400px) {
      padding: 0 1rem;
    }

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
    padding: 0 2rem;
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
    cursor: pointer;
    transition: 0.3s;
    outline: none;
  }
}
</style>
