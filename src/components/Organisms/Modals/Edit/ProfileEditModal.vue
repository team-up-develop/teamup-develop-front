<script lang="ts">
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  SetupContext,
} from "@vue/composition-api";
import { $fetch, $put } from "@/libs/axios";
import { md, API_URL, AUTH_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { EditProfileParams } from "@/types/params";
import { Language, Framework, Skill, User, Fetch } from "@/types/index";
import {
  SkillSelectArea,
  InputArea,
  DescriptionArea,
  DatePickerArea,
} from "@/components/Molecules/Forms";
// TODO: モーダルの molecule に分割
// import ProfileEditBase from "@/components/Molecules/Modals/ProfileEditBase.vue";

const propsOption = {
  userInfo: {
    type: Object as PropType<User | any>, //TODO: any
    required: true,
    default: {},
  },
} as const;

type PropsOption = typeof propsOption;
export type ProfileEditModalProps = OutsidePropsType<PropsOption>;

type Maybe<T> = T | null;

type State = {
  id: number;
  token: string;
  userName: string;
  lastName: string;
  firstName: string;
  birthday: string;
  email: string;
  password: string;
  learningStartDate: string;
  bio: Maybe<string>;
  githubAccount: Maybe<string>;
  twitterAccount: Maybe<string>;
  selectedLang: Language[]; //? プログラミング言語
  selectlangValue: number[]; //? 開発言語 編集用 array[Number, Number...]
  languages: Language[]; //? プログラミング言語全て
  selectedFramwork: Framework[];
  selectFramValue: number[];
  framworks: Framework[];
  selectedSkill: Skill[];
  selectSkillValue: number[];
  skills: Skill[];
  tabs: { id: number; tabName: string }[];
  currentTab: number;
};

//TODO: any
const initialState = (userInfo: User | any, ctx: SetupContext): State => ({
  id: userInfo.id,
  token: ctx.root.$store.getters.token,
  userName: userInfo.user_name,
  lastName: userInfo.last_name,
  firstName: userInfo.first_name,
  email: userInfo.email,
  birthday: userInfo.birthday.substring(0, userInfo.birthday.indexOf("T")),
  password: userInfo.login_password,
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
  selectedFramwork: [],
  selectFramValue: [],
  framworks: [],
  selectedSkill: [],
  selectSkillValue: [],
  skills: [],
  tabs: md.editProfileTabs,
  currentTab: 0,
});

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    SkillSelectArea,
    InputArea,
    DescriptionArea,
    DatePickerArea,
    // ProfileEditBase,
  },
  props: propsOption,
  setup(props, ctx) {
    const state = reactive<State>(initialState(props.userInfo, ctx));

    const clickTabs = (value: 0 | 1 | 2) => {
      state.currentTab = value;
    };

    const fetchLanguages = async () => {
      const res = await $fetch<Fetch<Language[]>>(
        `${API_URL}/programing_languages`
      );
      state.languages = res.data.response;
      state.selectedLang = props.userInfo.programing_languages;
      state.selectlangValue = state.selectedLang.map((v) => v.id);
    };

    const fetchFrameworks = async () => {
      const res = await $fetch<Fetch<Framework[]>>(
        `${API_URL}/programing_frameworks`
      );
      state.framworks = res.data.response;
      state.selectedFramwork = props.userInfo.programing_frameworks;
      state.selectFramValue = state.selectedFramwork.map((v) => v.id);
    };

    const fetchSkill = async () => {
      const res = await $fetch<Fetch<Skill[]>>(`${API_URL}/skills`);
      state.skills = res.data.response;
      state.selectedSkill = props.userInfo.skills;
      state.selectSkillValue = state.selectedSkill.map((v) => v.id);
    };

    (async () => {
      await Promise.all([fetchLanguages(), fetchFrameworks(), fetchSkill()]);
    })();

    const validEdit = computed(() => {
      if (
        state.userName.length > 0 &&
        state.firstName.length > 0 &&
        state.lastName.length > 0 &&
        state.birthday.length > 0 &&
        state.email.length > 0 &&
        state.password.length > 0 &&
        state.learningStartDate.length > 0 &&
        state.selectlangValue.length > 0 &&
        state.selectFramValue.length > 0 &&
        state.selectSkillValue.length > 0
      ) {
        return true;
      }
      return false;
    });

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
      for (const selectedLang of state.selectlangValue) {
        languageArray.push({ id: selectedLang });
      }
      // * フレームワークを{id: Number}に変換
      const framworksArray: {}[] = [];
      for (const selectedFramwork of state.selectFramValue) {
        framworksArray.push({ id: selectedFramwork });
      }
      // * その他スキルを {id: Number}に変換
      const skillArray: {}[] = [];
      for (const selectedSkill of state.selectSkillValue) {
        skillArray.push({ id: selectedSkill });
      }
      const params: EditProfileParams = {
        id: state.id,
        updated_at: props.userInfo.updated_at,
        user_name: state.userName,
        first_name: state.firstName,
        last_name: state.lastName,
        birthday: props.userInfo.birthday,
        email: state.email,
        bio: state.bio,
        github_account: state.githubAccount,
        twitter_account: state.twitterAccount,
        learning_start_date: learningStartDate,
        login_password: state.password,
        programing_language_ids: languageArray,
        programing_framework_ids: framworksArray,
        skill_ids: skillArray,
        user_image: {
          image_data: props.userInfo.imageData,
          file_name: props.userInfo.fileName,
        },
      };
      $put<EditProfileParams>(`${AUTH_URL}/user/${state.id}`, params, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
        .then((res) => {
          console.log(res.data, "res.data");
          ctx.emit("compliteEdit");
          return res;
        })
        .catch((error) => {
          catchError(error);
        });
    };

    return {
      ...toRefs(state),
      editProfile,
      clickTabs,
      validEdit,
    };
  },
});
</script>

<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <button
            v-for="(tab, index) in tabs"
            :key="tab.name"
            :class="{ active: currentTab === index }"
            @click="clickTabs(index)"
          >
            {{ tab.tabName }}
          </button>
          <section class="pt-5">
            <div v-show="currentTab === 0">
              <InputArea
                v-model="userName"
                type="text"
                name="userName"
                text-label="ユーザー名"
                :mandatory="true"
                mandatory-text=""
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
                text-label="開発開始時期"
                :mandatory="true"
                mandatory-text=""
              />
              <DescriptionArea
                v-model="bio"
                type="text"
                name="bio"
                text-label="自己紹介"
                :mandatory="false"
                mandatory-text=""
                placeholder="自己紹介(250文字以内)(500文字以内)"
                maxlength="500"
                :remaining="true"
              />
              <br />
              <InputArea
                v-model="githubAccount"
                type="text"
                name="githubAccount"
                text-label="GitHubアカウント"
                :mandatory="false"
                mandatory-text=""
                placeholder="TeamUp"
                maxlength="128"
                :remaining="false"
              />
              <br />
              <InputArea
                v-model="twitterAccount"
                type="text"
                name="twitterAccount"
                text-label="Twitterアカウント"
                :mandatory="false"
                mandatory-text=""
                placeholder="TeamUp"
                maxlength="128"
                :remaining="false"
              />
              <br />
              <SkillSelectArea
                v-model="selectlangValue"
                :options="languages"
                name="languages"
                text-label="開発言語"
                :mandatory="true"
                :max="15"
                mandatory-text="15個まで"
              />
              <SkillSelectArea
                v-model="selectFramValue"
                :options="framworks"
                name="framworks"
                text-label="フレームワーク"
                :mandatory="true"
                :max="15"
                mandatory-text="15個まで"
              />
              <SkillSelectArea
                v-model="selectSkillValue"
                :options="skills"
                name="skills"
                text-label="その他スキル"
                :mandatory="true"
                :max="15"
                mandatory-text="15個まで"
              />
            </div>
            <div v-show="currentTab === 1">
              <p class="font-weight-bold alert">
                基本情報編集にはご注意ください！
              </p>
              <InputArea
                v-model="lastName"
                type="text"
                name="lastName"
                text-label="姓"
                :mandatory="true"
                mandatory-text=""
                placeholder="チームアップ"
                maxlength="60"
                :remaining="false"
              />
              <br />
              <InputArea
                v-model="firstName"
                type="text"
                name="firstName"
                text-label="名"
                :mandatory="true"
                mandatory-text=""
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
                text-label="生年月日"
                :mandatory="true"
                mandatory-text=""
              />
              <InputArea
                v-model="email"
                type="text"
                name="email"
                text-label="メールアドレス"
                :mandatory="true"
                mandatory-text=""
                placeholder="test@teamup.com"
                maxlength="128"
                :remaining="false"
              />
              <br />
              <InputArea
                v-model="password"
                type="text"
                name="password"
                text-label="パスワード"
                :mandatory="true"
                mandatory-text=""
                placeholder="*******"
                maxlength="128"
                :remaining="false"
              />
              <!-- <ProfileEditBase :userInfo="userInfo" /> -->
            </div>
          </section>
          <slot />
        </div>
        <footer class="modal-footer">
          <v-btn :disabled="!validEdit" class="btn" @click="editProfile">
            編集する
          </v-btn>
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
  width: 75%;
  @media screen and (max-width: $me) {
    width: 80%;
  }
  @media screen and (max-width: $sm) {
    min-width: 90%;
  }
}

.modal-content {
  padding: 2rem 2rem;
  height: 80vh;
  text-align: left;
  overflow: scroll;

  @media screen and (max-width: $sm) {
    padding: 2rem 1rem;
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
