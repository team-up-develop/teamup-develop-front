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
import SkillSelectArea from "@/components/Molecules/Forms/SkillSelectArea.vue";
import InputArea from "@/components/Molecules/Forms/InputArea.vue";
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
  github: "",
  twitter: "",
});

export default defineComponent({
  components: {
    Session,
    SkillSelectArea,
    InputArea,
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
      for (let i = 0; i < state.selectedLang.length; i++) {
        languageArray.push({ id: state.selectedLang[i] });
      }
      const framworksArray: {}[] = [];
      for (let c = 0; c < state.selectedFramwork.length; c++) {
        framworksArray.push({ id: state.selectedFramwork[c] });
      }
      const skillArray: {}[] = [];
      for (let d = 0; d < state.selectedSkill.length; d++) {
        skillArray.push({ id: state.selectedSkill[d] });
      }

      const params: RegisterSessionSecondParams = {
        programingLanguage: languageArray,
        programingFramework: framworksArray,
        skill: skillArray,
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
            <div class="back-btn" @click="backStep">戻る</div>
            <div class="next-btn" @click="nextStep">次へ2/3</div>
          </div>
          <div class="bottom" v-else>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <div class="back-btn" @click="backStep">戻る</div>
                <div class="next-btn-false" v-on="on" v-bind="attrs">
                  次へ2/3
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
  width: 80%;
  height: 100px;
  margin: 1rem auto 0 auto;

  @media (max-width: $sm) {
    width: 100%;
  }

  .back-btn {
    @include neumorphismGrey;
    color: $primary-color;
    font-weight: 600;
    text-align: left;
    display: block;
    padding: 1.1rem 4rem;
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

    @media (max-width: $ti) {
      padding: 1.1rem 3rem;
    }
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
    cursor: pointer;
    transition: 0.3s;
    outline: none;

    @media (max-width: $ti) {
      padding: 1.1rem 2rem;
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
    cursor: pointer;
    transition: 0.3s;
    outline: none;
  }
}
</style>
