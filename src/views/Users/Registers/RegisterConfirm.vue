<script lang="ts">
import Vue from "vue";
// import { API_URL, catchError } from "@/master";
// import axios from "axios";
import Session from "@/components/Atoms/Commons/Session.vue";
// import SkillSelectArea from "@/components/Molecules/Forms/SkillSelectArea.vue";
// import InputArea from "@/components/Molecules/Forms/InputArea.vue";
// import 'vue-select/dist/vue-select.css';
import { Language, Framework, Skill } from "@/types/index";

type DataType = {
  selectedLang: any | null;
  languages: Language[];
  selectedFramwork: any | null;
  framworks: Framework[];
  selectedSkill: any | null;
  skills: Skill[];
  github: string | null;
  twitter: string | null;
  userName: string | null;
  nickName: string | null;
  password: string | null;
  userBirthday: string | null;
  learningStartDate: string | null;
};

export default Vue.extend({
  components: {
    Session,
    // SkillSelectArea,
    // InputArea,
  },
  data(): DataType {
    return {
      selectedLang: null, //? プログラミング言語
      languages: [],
      selectedFramwork: null, //? フレームワーク
      framworks: [],
      selectedSkill: null, //? その他開発スキル
      skills: [],
      github: "",
      twitter: "",
      userName: "",
      nickName: "",
      password: "",
      userBirthday: "",
      learningStartDate: "",
    };
  },
  created() {
    // * セッションストレージの値をフォームに格納する
    const userName = sessionStorage.getItem("userName");
    const nickName = sessionStorage.getItem("nickName");
    const password = sessionStorage.getItem("password");
    const userBirthday = sessionStorage.getItem("userBirthday");
    const learningStartDate = sessionStorage.getItem("learningStartDate");
    const programingLanguage = sessionStorage.getItem("programingLanguage");
    const programingFramework = sessionStorage.getItem("programingFramework");
    const skill = sessionStorage.getItem("skill");
    const github = sessionStorage.getItem("github");
    const twitter = sessionStorage.getItem("twitter");
    this.userName = userName;
    this.nickName = nickName;
    this.password = password;
    this.userBirthday = userBirthday;
    this.learningStartDate = learningStartDate;
    this.selectedLang = programingLanguage;
    this.selectedFramwork = programingFramework;
    this.selectedSkill = skill;
    this.github = github;
    this.twitter = twitter;

    console.log("sakamoto");
    console.log(this.selectedLang);
    console.log("sakamoto");
  },
  mounted() {},
  methods: {},
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
        <v-col class="container text-left">
          <div class="input-area">
            <label for="name" class="label">氏名</label>
            <p>{{ userName }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">ユーザー名</label>
            <p>{{ nickName }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">パスワード</label>
            <p>{{ password }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">誕生日</label>
            <p>{{ userBirthday }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">学習開始日</label>
            <p>{{ learningStartDate }}</p>
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
            <label for="name" class="label">GitHub</label>
            <p>{{ github }}</p>
          </div>
          <div class="input-area">
            <label for="name" class="label">Twitter</label>
            <p>{{ twitter }}</p>
          </div>
          <div class="alert-message">
            <span
              >こちらで登録を完了させ、案件を作成、又は応募がすることができます。※今後はプロフィールからも変更ができます。</span
            >
          </div>
          <div class="box-bottom">
            <div class="next-btn">登録完了する</div>
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

  @media (max-width: 768px) {
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

      @media (max-width: 500px) {
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
.box-bottom {
  width: 100%;
  height: 100px;

  .next-btn {
    @include box-shadow-btn;
    @include blue-btn;
    color: $white;
    text-align: left;
    display: block;
    padding: 1.1rem 4rem;
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
}
</style>
