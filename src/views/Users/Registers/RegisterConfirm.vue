<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  // watch,
  // onMounted,
} from "@vue/composition-api";
import Session from "@/components/Atoms/Commons/Session.vue";
import { Language, Framework, Skill } from "@/types/index";
import { dayJs } from "@/master";

type Maybe<T> = T | null;

type State = {
  selectedLang: Maybe<any>;
  languages: Language[];
  selectedFramwork: any | null;
  framworks: Framework[];
  selectedSkill: any | null;
  skills: Skill[];
  github: Maybe<string>;
  twitter: Maybe<string>;
  userName: Maybe<string>;
  nickName: Maybe<string>;
  password: Maybe<string>;
  userBirthday: Maybe<string>;
  learningStartDate: Maybe<string>;
  passwordModal: boolean;
  email: Maybe<string>;
};

const initialState = (): State => ({
  selectedLang: null,
  languages: [],
  selectedFramwork: null,
  framworks: [],
  selectedSkill: null,
  skills: [],
  github: "",
  twitter: "",
  userName: "",
  nickName: "",
  password: "",
  userBirthday: "",
  learningStartDate: "",
  passwordModal: false,
  email: "",
});

export default defineComponent({
  components: {
    Session,
  },
  setup(_, ctx: any) {
    const state = reactive<State>(initialState());
    const router = ctx.root.$router;
    const day = (value: string, format: string) => dayJs(value, format);

    const strageGet = () => {
      const userName = sessionStorage.getItem("userName");
      const nickName = sessionStorage.getItem("nickName");
      const password = sessionStorage.getItem("password");
      const email = sessionStorage.getItem("email");
      const userBirthday = sessionStorage.getItem("userBirthday");
      const learningStartDate = sessionStorage.getItem("learningStartDate");
      const programingLanguage = sessionStorage.getItem("programingLanguage");
      const programingFramework = sessionStorage.getItem("programingFramework");
      const skill = sessionStorage.getItem("skill");
      const github = sessionStorage.getItem("github");
      const twitter = sessionStorage.getItem("twitter");
      state.userName = userName;
      state.nickName = nickName;
      state.password = password;
      state.email = email;
      state.userBirthday = userBirthday;
      state.learningStartDate = learningStartDate;
      state.selectedLang = programingLanguage;
      state.selectedFramwork = programingFramework;
      state.selectedSkill = skill;
      state.github = github;
      state.twitter = twitter;
    };
    strageGet();

    const isForm = computed(() => {
      return state.userName &&
        state.nickName &&
        state.password &&
        state.userBirthday &&
        state.learningStartDate &&
        state.selectedLang &&
        state.selectedFramwork &&
        state.selectedSkill
        ? true
        : false;
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
      return router.push({ name: "RegisterStep2" });
    };

    return {
      ...toRefs(state),
      day,
      backStep,
      isForm,
      openPassword,
      closePassword,
      isOpenPassword,
    };
  },
});
</script>

<template>
  <section>
    <div class="wrapper">
      <div class="title">入力確認</div>
      <v-card class="pa-1 card">
        <div class="session">
          <Session :num="4" />
        </div>
        <v-col class="container text-left" v-if="isForm">
          <div class="input-area">
            <label for="name" class="label">氏名</label>
            <p>{{ userName }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">ユーザー名</label>
            <p>{{ nickName }}</p>
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
            <div class="back-btn" @click="backStep">内容修正する</div>
            <div class="next-btn">登録完了する</div>
          </div>
        </v-col>
        <v-col v-else>
          <div class="false-card">
            <img class="alert-img py-4" src="@/assets/images/alert.png" />
            <div class="alert-message">
              <span
                >入力されていない項目があるようです。 <br />
                一旦戻って確認してください。
              </span>
            </div>
          </div>
          <div class="bottom">
            <div class="back-btn" @click="backStep">内容修正する</div>
            <div class="next-btn-false">登録完了する</div>
          </div>
        </v-col>
      </v-card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.label {
  font-weight: bold;
}
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
  height: 60px;
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
  width: 80%;
  height: 100px;
  margin: 2rem auto 0 auto;

  @media (max-width: $sm) {
    width: 100%;
  }

  .back-btn {
    @include neumorphismGrey;
    color: $primary-color;
    font-weight: 600;
    text-align: left;
    display: block;
    padding: 1.1rem 2rem;
    border-radius: 25px;
    font-size: 0.875rem;
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
      padding: 1.1rem 1.2rem;
    }
  }

  .next-btn {
    @include box-shadow-btn;
    @include blue-btn;
    color: $white;
    text-align: left;
    display: block;
    padding: 1.1rem 2rem;
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
    cursor: pointer;
    transition: 0.3s;
    outline: none;

    @media (max-width: 400px) {
      padding: 1.1rem 1rem;
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
    padding: 1.1rem 2rem;
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
    cursor: pointer;
    transition: 0.3s;
    outline: none;
  }
}
</style>
