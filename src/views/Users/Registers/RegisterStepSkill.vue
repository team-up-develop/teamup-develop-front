<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onMounted,
} from "@vue/composition-api";
import { $fetch, API_URL, catchError } from "@/master";
import Session from "@/components/Atoms/Commons/Session.vue";
import {
  InputArea,
  DescriptionArea,
  SkillSelectArea,
} from "@/components/Molecules/Forms";
import { Language, Framework, Skill } from "@/types/index";
import { FetchLanguages, FetchFrameworks, FetchSkills } from "@/types/fetch";
import { RegisterSessionSecondParams } from "@/types/params";

type Maybe<T> = T | null;

type State = {
  selectedLang: [];
  languages: Language[];
  selectedFramwork: [];
  framworks: Framework[];
  selectedSkill: [];
  skills: Skill[];
  bio: string;
  github: Maybe<string>;
  twitter: Maybe<string>;
};

const initialState = (): State => ({
  selectedLang: [],
  languages: [],
  selectedFramwork: [],
  framworks: [],
  selectedSkill: [],
  skills: [],
  bio: "",
  github: "",
  twitter: "",
});

export default defineComponent({
  components: {
    Session,
    SkillSelectArea,
    InputArea,
    DescriptionArea,
  },
  setup(_, ctx: any) {
    const state = reactive<State>(initialState());
    const router = ctx.root.$router;

    const strageGet = () => {
      // const programingLanguage = sessionStorage.getItem("programingLanguage");
      // const programingFramework = sessionStorage.getItem("programingFramework");
      // const skill = sessionStorage.getItem("skill");
      const github = sessionStorage.getItem("github");
      const twitter = sessionStorage.getItem("twitter");
      // this.selectedLang = programingLanguage;
      // this.selectedFramwork = programingFramework;
      // this.selectedSkill = skill;
      state.github = github;
      state.twitter = twitter;
    };

    const fetchSkill = async () => {
      try {
        const res = await $fetch<FetchLanguages>(
          `${API_URL}/programing_languages`
        );
        state.languages = res.data.response;
      } catch (error) {
        catchError(error);
      }
      try {
        const res = await $fetch<FetchFrameworks>(
          `${API_URL}/programing_frameworks`
        );
        state.framworks = res.data.response;
      } catch (error) {
        catchError(error);
      }
      try {
        const res = await $fetch<FetchSkills>(`${API_URL}/skills`);
        state.skills = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };

    strageGet();
    onMounted(() => {
      fetchSkill();
    });

    const isForm = computed(() => {
      return state.selectedLang.length !== 0 &&
        state.selectedFramwork.length !== 0 &&
        state.selectedSkill.length !== 0
        ? true
        : false;
    });

    const backStep = () => {
      return router.push({ name: "RegisterStepBase" });
    };

    const nextStep = () => {
      const languageArray: {}[] = [];
      for (const selectedLang of state.selectedLang) {
        languageArray.push({ id: selectedLang });
      }
      const framworksArray: {}[] = [];
      for (const selectedFramwork of state.selectedFramwork) {
        framworksArray.push({ id: selectedFramwork });
      }
      const skillArray: {}[] = [];
      for (const selectedSkill of state.selectedSkill) {
        skillArray.push({ id: selectedSkill });
      }

      const params: RegisterSessionSecondParams = {
        programingLanguage: languageArray,
        programingFramework: framworksArray,
        skill: skillArray,
        bio: state.bio,
        github: state.github,
        twitter: state.twitter,
      };
      sessionStorage.setItem(
        "programingLanguage",
        JSON.stringify(params.programingLanguage)
      );
      sessionStorage.setItem(
        "programingFramework",
        JSON.stringify(params.programingFramework)
      );
      sessionStorage.setItem("skill", JSON.stringify(params.skill));
      if (params.github) {
        sessionStorage.setItem("github", params.github);
      }
      if (params.twitter) {
        sessionStorage.setItem("twitter", params.twitter);
      }
      if (params.bio) {
        sessionStorage.setItem("bio", params.bio);
      }
      return router.push({ name: "RegisterConfirm" });
    };

    return {
      ...toRefs(state),
      isForm,
      backStep,
      nextStep,
    };
  },
});
</script>

<template>
  <section>
    <div class="wrapper">
      <div class="title">スキル情報入力</div>
      <v-card class="pa-1 card">
        <div class="session">
          <Session :num="3" />
        </div>
        <v-col class="container text-left">
          <div class="input-area">
            <SkillSelectArea
              v-model="selectedLang"
              :options="languages"
              name="languages"
              textLabel="開発言語"
              :mandatory="true"
              mandatoryText=""
              :max="100"
            />
            <!-- {{ selectedLang }} -->
          </div>
          <div class="input-area">
            <SkillSelectArea
              v-model="selectedFramwork"
              :options="framworks"
              name="framworks"
              textLabel="フレームワーク"
              :mandatory="true"
              mandatoryText=""
              :max="100"
            />
          </div>
          <div class="input-area">
            <SkillSelectArea
              v-model="selectedSkill"
              :options="skills"
              name="framworks"
              textLabel="フレームワーク"
              :mandatory="true"
              mandatoryText=""
              :max="100"
            />
          </div>
          <div class="input-area">
            <DescriptionArea
              v-model="bio"
              type="text"
              name="bio"
              textLabel="自己紹介文"
              :mandatory="false"
              mandatoryText=""
              placeholder="自己紹介を記載してください。(500文字以内)"
              maxlength="500"
              :remaining="true"
            />
          </div>
          <div class="input-area">
            <InputArea
              v-model="github"
              type="text"
              name="GitHub"
              textLabel="GitHub"
              :mandatory="false"
              mandatoryText=""
              placeholder="URLを入力してください"
              maxlength="100"
              :remaining="false"
            />
          </div>
          <div class="input-area">
            <InputArea
              v-model="twitter"
              type="text"
              name="Twitter"
              textLabel="Twitter"
              :mandatory="false"
              mandatoryText=""
              placeholder="URLを入力してください"
              maxlength="100"
              :remaining="false"
            />
          </div>
          <div class="bottom" v-if="isForm">
            <v-btn class="back-btn" @click="backStep">戻る</v-btn>
            <v-btn class="next-btn" @click="nextStep">次へ2/3</v-btn>
          </div>
          <div class="bottom" v-else>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="back-btn" @click="backStep">戻る</v-btn>
                <v-btn class="next-btn-false" v-on="on" v-bind="attrs">
                  次へ2/3
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

      @media (max-width: $sm) {
        padding: 0 1rem;
      }
    }
  }
}
.input-area {
  min-height: 90px;
}

.bottom {
  width: 100%;
  height: 100px;
  margin: 1rem auto 0 auto;

  .back-btn {
    @include neumorphismGrey;
    color: $primary-color;
    font-weight: 600;
    display: block;
    padding: 0 4rem;
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

    @media (max-width: $ti) {
      padding: 0 3rem;
    }
  }

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
    cursor: pointer;
    transition: 0.3s;
    outline: none;

    @media (max-width: $ti) {
      padding: 0 2rem;
    }

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
    cursor: pointer;
    transition: 0.3s;
    outline: none;

    @media (max-width: $ti) {
      padding: 0 2rem;
    }
  }
}
</style>
