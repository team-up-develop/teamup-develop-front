<script lang="ts">
import { InsidePropsType, PropType } from "@icare-jp/vue-props-type";
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from "@vue/composition-api";
import axios from "axios";
import { API_URL, catchError } from "@/master";
import { EditProfileParams } from "@/types/params";
import { FetchLanguages, FetchFrameworks, FetchSkills } from "@/types/fetch";
import { Language, Framework, Skill, User } from "@/types/index";
import {
  SkillSelectArea,
  InputArea,
  DescriptionArea,
  DatePickerArea,
} from "@/components/Molecules/Forms";

const propsOption = {
  userInfo: {
    type: Object as PropType<User | any>, //TODO: any
    require: true,
    default: {},
  },
};
type PropsOption = typeof propsOption;

type Maybe<T> = T | null;

type State = {
  id: number;
  userName: string;
  learningStartDate: string;
  bio: Maybe<string>;
  githubAccount: Maybe<string>;
  twitterAccount: Maybe<string>;
  selectedLang: Language[]; //? プログラミング言語
  selectlangValue: number[]; //? 開発言語 編集用 array[Number, Number...]
  languages: Language[]; //? プログラミング言語全て
  selectedFram: Framework[];
  selectFramValue: number[];
  framworks: Framework[];
  selectedSkill: Skill[];
  selectSkillValue: number[];
  skills: Skill[];
};
//TODO: any
const initialState = (userInfo: User | any): State => ({
  id: userInfo.id,
  userName: userInfo.user_name,
  learningStartDate: userInfo.learning_start_date.substring(
    0,
    userInfo.learning_start_date.indexOf("T")
  ),
  bio: userInfo.bio,
  githubAccount: userInfo.github_account,
  twitterAccount: userInfo.twitter_account,
  selectedLang: [],
  selectlangValue: [],
  languages: [],
  selectedFram: [],
  selectFramValue: [],
  framworks: [],
  selectedSkill: [],
  selectSkillValue: [],
  skills: [],
});

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    SkillSelectArea,
    InputArea,
    DescriptionArea,
    DatePickerArea,
  },
  props: propsOption,
  setup(props, ctx) {
    const state = reactive<State>(initialState(props.userInfo));
    console.log(props, "props");
    const fetchLang = async () => {
      const res = await axios.get<FetchLanguages>(
        `${API_URL}/programing_languages`
      );
      state.languages = res.data.response;
      state.selectedLang = props.userInfo.programing_languages;
      for (let l = 0; l < state.selectedLang.length; l++) {
        state.selectlangValue.push(state.selectedLang[l].id); //? 配列 [Number, Number...]
      }
    };

    const fetchFram = async () => {
      const res = await axios.get<FetchFrameworks>(
        `${API_URL}/programing_frameworks`
      );
      state.framworks = res.data.response;
      state.selectedFram = props.userInfo.programing_frameworks;
      for (let l = 0; l < state.selectedFram.length; l++) {
        state.selectFramValue.push(state.selectedFram[l].id); //? 配列 [Number, Number...]
      }
    };

    const fetchSkill = async () => {
      const res = await axios.get<FetchSkills>(`${API_URL}/skills`);
      state.skills = res.data.response;
      state.selectedSkill = props.userInfo.skills;
      for (let l = 0; l < state.selectedSkill.length; l++) {
        state.selectSkillValue.push(state.selectedSkill[l].id); //? 配列 [Number, Number...]
      }
    };

    const editProfile = () => {
      // * date型に変換のための data用意
      function toDate<T, U>(str: T | any, delim: U): Date {
        const arr = str.split(delim);
        return new Date(arr[0], arr[1] - 1, arr[2]);
      }
      // //* 開始日
      const learningStart = state.learningStartDate;
      const learningStartDate = toDate(learningStart, "-");
      // * 言語を {id: Number}に変換
      const languageArray: {}[] = [];
      for (let i = 0; i < state.selectedLang.length; i++) {
        languageArray.push({ id: state.selectedLang[i].id });
      }
      // * フレームワークを{id: Number}に変換
      const framworksArray: {}[] = [];
      for (let c = 0; c < state.selectedFram.length; c++) {
        framworksArray.push({ id: state.selectedFram[c].id });
      }
      // * その他スキルを {id: Number}に変換
      const skillArray: {}[] = [];
      for (let d = 0; d < state.selectedSkill.length; d++) {
        skillArray.push({ id: state.selectedSkill[d].id });
      }
      console.log(skillArray, "skillArray");
      const params: EditProfileParams = {
        id: state.id,
        updated_at: props.userInfo.updated_at,
        user_name: state.userName,
        first_name: props.userInfo.first_name,
        last_name: props.userInfo.last_name,
        birthday: props.userInfo.birthday,
        bio: state.bio,
        github_account: state.githubAccount,
        twitter_account: state.twitterAccount,
        learning_start_date: learningStartDate,
        login_password: props.userInfo.login_password,
        programing_language_ids: languageArray,
        programing_framework_ids: framworksArray,
        skill_ids: skillArray,
      };
      console.log(params);
      const a = JSON.stringify(params);
      console.log(a);
      axios
        .put<EditProfileParams>(`${API_URL}/user/${state.id}`, params)
        .then((res) => {
          ctx.emit("compliteEdit");
          return res;
        })
        .catch((error) => {
          catchError(error);
        });
    };

    onMounted(async () => {
      fetchLang();
      fetchFram();
      fetchSkill();
    });

    return {
      ...toRefs(state),
      editProfile,
    };
  },
});
</script>

<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <section>
            <p class="label-lang">プロフィール編集</p>
            <InputArea
              v-model="userName"
              type="text"
              name="userName"
              textLabel="ユーザー名"
              :mandatory="true"
              mandatoryText=""
              placeholder="TeamUp"
              maxlength="60"
              :remaining="false"
            />
            <br />
            <DatePickerArea
              v-model="learningStartDate"
              placeholder="学習を始めた日にちを入力してください"
              name="learningStartDate"
              type="text"
              textLabel="開発開始時期"
              :mandatory="true"
              mandatoryText=""
            />
            <DescriptionArea
              v-model="bio"
              type="text"
              name="bio"
              textLabel="概要"
              :mandatory="false"
              mandatoryText=""
              placeholder="自己紹介(250文字以内)(500文字以内)"
              maxlength="500"
              :remaining="true"
            />
            <br />
            <InputArea
              v-model="githubAccount"
              type="text"
              name="githubAccount"
              textLabel="GitHubアカウント"
              :mandatory="false"
              mandatoryText=""
              placeholder="TeamUp"
              maxlength="128"
              :remaining="false"
            />
            <br />
            <InputArea
              v-model="twitterAccount"
              type="text"
              name="twitterAccount"
              textLabel="Twitterアカウント"
              :mandatory="false"
              mandatoryText=""
              placeholder="TeamUp"
              maxlength="128"
              :remaining="false"
            />
            <br />
            <SkillSelectArea
              v-model="selectlangValue"
              :options="languages"
              name="languages"
              textLabel="開発言語"
              :mandatory="true"
              :max="5"
              mandatoryText="5つまで"
            />
            <SkillSelectArea
              v-model="selectFramValue"
              :options="framworks"
              name="framworks"
              textLabel="フレームワーク"
              :mandatory="true"
              :max="5"
              mandatoryText="5つまで"
            />
            <SkillSelectArea
              v-model="selectSkillValue"
              :options="skills"
              name="skills"
              textLabel="その他スキル"
              :mandatory="true"
              :max="5"
              mandatoryText="5つまで"
            />
            {{ selectSkillValue }}
            <template>
              <div class="btn" @click="editProfile">
                編集する
              </div>
            </template>
          </section>
          <slot />
        </div>
        <footer class="modal-footer">
          <!-- <slot name="footer">
            <button @click="$emit('close')">Close</button>
          </slot> -->
        </footer>
      </div>
    </div>
  </transition>
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
    .btn {
      @include box-shadow-btn;
      background-color: $secondary-color;
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
    }
  }
}

.modal-footer {
  width: 100%;
  padding: 2rem 0 1rem 0;
  text-align: right;
  display: inline-block;
  position: relative;
  font-size: 100px;
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
