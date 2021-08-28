<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onMounted,
} from "@vue/composition-api";
import { $fetch } from "@/libs/axios";
import Vuex from "@/store/index";
import Session from "@/components/Atoms/Commons/Session.vue";
import { Language, Framework, Skill } from "@/types/index";
import { RegisterCompleteParams } from "@/types/params";
import { FetchLanguages, FetchFrameworks, FetchSkills } from "@/types/fetch";
import { API_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { dayJsFormat } from "@/libs/dayjs";
import Confirme from "@/components/Organisms/Modals/Base/Confirme.vue";
import Complete from "@/components/Organisms/Modals/Base/Complete.vue";
import Loading from "@/components/Organisms/Commons/Loading/Loading.vue";
import { InputSet } from "@/components/Molecules/Forms";

type Maybe<T> = T | null;
type Select = { id: number };
type State = {
  selectedLang: NonNullable<Select[]>; //* 選択言語
  selectedFramwork: NonNullable<Select[]>; //* 選択フレームワーク
  selectedSkill: NonNullable<Select[]>; //* 選択その他スキル
  userName: string;
  lastName: string;
  firstName: string;
  password: string;
  userBirthday: string;
  learningStartDate: string;
  passwordModal: boolean;
  email: string;
  bio: Maybe<string>;
  github: Maybe<string>;
  twitter: Maybe<string>;
  confirm: boolean;
  complite: boolean;
  loading: boolean;
};

type SkillState = {
  displayLanguages: Language[]; //* 表示用開発言語
  languages: Language[]; //* fetch
  displayFramworks: Framework[]; //* 表示用フレームワーク
  framworks: Framework[]; //* fetch
  displaySkills: Skill[]; //* 表示用その他スキル
  skills: Skill[]; //* fetch
};

const initialState = (): State => ({
  selectedLang: [],
  selectedFramwork: [],
  selectedSkill: [],
  userName: "",
  lastName: "",
  firstName: "",
  password: "",
  userBirthday: "",
  learningStartDate: "",
  passwordModal: false,
  email: "",
  bio: "",
  github: "",
  twitter: "",
  confirm: false,
  complite: false,
  loading: true,
});

const skillState = (): SkillState => ({
  displayLanguages: [],
  languages: [],
  displayFramworks: [],
  framworks: [],
  displaySkills: [],
  skills: [],
});

export default defineComponent({
  components: {
    Session,
    Confirme,
    Complete,
    Loading,
    InputSet,
  },
  setup(_, ctx) {
    const state = reactive<State>(initialState());
    const skills = reactive<SkillState>(skillState());
    const router = ctx.root.$router;

    const fetchSkill = async () => {
      try {
        const res = await $fetch<FetchLanguages>(
          `${API_URL}/programing_languages`
        );
        skills.languages = res.data.response;
      } catch (error) {
        catchError(error);
      }
      try {
        const res = await $fetch<FetchFrameworks>(
          `${API_URL}/programing_frameworks`
        );
        skills.framworks = res.data.response;
      } catch (error) {
        catchError(error);
      }
      try {
        const res = await $fetch<FetchSkills>(`${API_URL}/skills`);
        skills.skills = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };

    const strageGet: () => void = () => {
      state.userName = sessionStorage.getItem("userName")!;
      state.lastName = sessionStorage.getItem("lastName")!;
      state.firstName = sessionStorage.getItem("firstName")!;
      state.password = sessionStorage.getItem("password")!;
      state.email = sessionStorage.getItem("email")!;
      state.userBirthday = sessionStorage.getItem("userBirthday")!;
      state.learningStartDate = sessionStorage.getItem("learningStartDate")!;
      const programingLanguage: string = sessionStorage.getItem(
        "programingLanguage"
      )!;
      const programingFramework: string = sessionStorage.getItem(
        "programingFramework"
      )!;
      const skill: string = sessionStorage.getItem("skill")!;
      state.bio = sessionStorage.getItem("bio");
      state.github = sessionStorage.getItem("github");
      state.twitter = sessionStorage.getItem("twitter");

      state.selectedLang = JSON.parse(programingLanguage);
      for (const selectLang of state.selectedLang) {
        const foundLang: Language = skills.languages.find(
          (e: Language) => e.id === selectLang.id
        )!;
        skills.displayLanguages.push(foundLang);
      }
      state.selectedFramwork = JSON.parse(programingFramework);
      for (const selectFrame of state.selectedFramwork) {
        const foundFrame: Framework = skills.framworks.find(
          (e: Framework) => e.id === selectFrame.id
        )!;
        skills.displayFramworks.push(foundFrame);
      }
      state.selectedSkill = JSON.parse(skill);
      for (const selectSkill of state.selectedSkill) {
        const foundSkill: Skill = skills.skills.find(
          (e: Skill) => e.id === selectSkill.id
        )!;
        skills.displaySkills.push(foundSkill);
      }
      state.loading = false;
    };

    onMounted(async () => {
      await fetchSkill();
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

    const backStep = () => {
      return router.push({ name: "RegisterStepSkill" });
    };

    // TODO: 登録周りパラメーター確認 エラー処理
    const register = async () => {
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

      const params: Required<RegisterCompleteParams> = {
        user_name: state.userName,
        last_name: state.lastName,
        first_name: state.firstName,
        login_password: state.password,
        email: state.email,
        learning_start_date: learningStartDate,
        birthday: birthdayDate,
        programing_language_ids: state.selectedLang,
        programing_framework_ids: state.selectedFramwork,
        skill_ids: state.selectedSkill,
        bio: state.bio,
        github_account: state.github,
        twitter_account: state.twitter,
        // TODO: ユーザー登録 画像投稿
        user_image: {
          image_data: "",
          file_name: "",
        },
      };
      console.log(JSON.stringify(params), "res");
      const data = Vuex.dispatch("register", {
        ...params,
      });
      console.log(data, "data");
      setTimeout(() => {
        if (!ctx.root.$store.getters.errorFlag) {
          state.confirm = false;
          state.complite = true;
        }
        return;
      }, 2000);
    };

    const redirectProfile = () => {
      return router.push({ name: "Jobs" });
    };

    const redirectJobCreate = () => {
      return router.push({ name: "JobCreate" });
    };
    return {
      ...toRefs(state),
      ...toRefs(skills),
      dayJsFormat,
      backStep,
      isForm,
      isOpenPassword,
      register,
      redirectProfile,
      redirectJobCreate,
    };
  },
});
</script>

<template>
  <section>
    <Complete
      v-if="complite"
      :image-number="Number(1)"
      title="登録が完了しました"
      content="早速チーム開発を始めよう！"
      btn-main="案件を作る"
      btn-sub="案件を探す"
      @subFunction="redirectProfile"
      @mainFunction="redirectJobCreate"
      @close="redirectProfile"
    />
    <Confirme
      v-if="confirm"
      :on-function="register"
      title="登録完了しますか？"
      btn-main="登録する"
      btn-sub="閉じる"
      @close="confirm = false"
    />
    <div class="wrapper">
      <div class="title">入力確認</div>
      <v-card class="pa-1 card">
        <div class="session">
          <Session :num="Number(3)" />
        </div>
        <div v-show="!loading">
          <v-col class="container text-left" v-if="isForm">
            <div class="input-area">
              <InputSet :value="userName" label="ユーザー名" />
            </div>
            <div class="input-area">
              <InputSet :value="lastName" label="姓" />
            </div>
            <div class="input-area">
              <InputSet :value="firstName" label="名" />
            </div>
            <div class="input-area">
              <InputSet :value="email" label="メールアドレス" />
            </div>
            <div class="input-area">
              <label for="name" class="label">パスワード</label>
              <section v-show="!isOpenPassword">
                <button
                  @click="() => (passwordModal = true)"
                  class="password-btn"
                >
                  開く
                </button>
                <p>*********</p>
              </section>
              <section v-show="isOpenPassword">
                <button
                  @click="() => (passwordModal = false)"
                  class="password-btn"
                >
                  閉じる
                </button>
                <p>{{ password }}</p>
              </section>
            </div>
            <div class="input-area">
              <InputSet :day-value="userBirthday" label="誕生日" />
            </div>
            <div class="input-area">
              <InputSet :day-value="learningStartDate" label="学習開始日" />
            </div>
            <div class="input-area">
              <InputSet
                :skills="displayLanguages"
                label="開発言語"
                color="#651fff"
              />
            </div>
            <div class="input-area">
              <InputSet
                :skills="displayFramworks"
                label="フレームワーク"
                color="#2196f3"
              />
            </div>
            <div class="input-area">
              <InputSet
                :skills="displaySkills"
                label="その他スキル"
                color="#00bcd4"
              />
            </div>
            <div class="input-area pre-wrap">
              <InputSet :value="bio" label="自己紹介" />
            </div>
            <div class="input-area">
              <InputSet :value="github" label="GitHub URL" />
            </div>
            <div class="input-area">
              <InputSet :value="twitter" label="Twitter URL" />
            </div>
            <div class="alert-message">
              <span
                >こちらで登録を完了させ、案件を作成、又は応募がすることができます。※今後はプロフィールからも変更ができます。</span
              >
            </div>
            <div class="bottom">
              <v-btn class="back-btn" @click="backStep">内容修正する</v-btn>
              <v-btn class="next-btn" @click="() => (confirm = true)"
                >登録完了する</v-btn
              >
            </div>
          </v-col>
          <v-col v-else>
            <div class="false-card">
              <img
                class="alert-img py-4"
                src="@/assets/images/alert-icon.png"
              />
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
        </div>
        <Loading v-show="loading" />
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
  margin-bottom: 5px;
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

  .alert-img {
    width: 50%;
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
