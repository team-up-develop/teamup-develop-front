<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  PropType,
  onBeforeMount,
  SetupContext,
} from "@vue/composition-api";
import { $fetch, $put } from "@/libs/axios";
import { API_URL, AUTH_URL } from "@/master";
import { fetchError, catchError } from "@/libs/errorHandler";
import ProfileEditModal from "@/components/Organisms/Modals/Edit/ProfileEditModal.vue";
import Breadcrumbs from "@/components/Organisms/Commons/Entires/Breadcrumbs.vue";
import {
  UserTabs,
  UserBasicInfo,
  PostUser,
  SkillUser,
  IntroduceUser,
} from "@/components/Organisms/Users";
import CardJob from "@/components/Organisms/Jobs/CardJob.vue";
import { User, Fetch } from "@/types/index";
import { useJobs, useUtils } from "@/hooks";
import { EditProfileParams } from "@/types/params";

type Props = {
  id: number;
};

type State = {
  myselfFlag: boolean;
  userInfo: User | any;
  userId: number;
  modal: boolean;
  currentTab: 0 | 1 | 2;
  token: string;
  inputs: Inputs;
};

export type Inputs = {
  userImage: {
    imageData: any;
    fileName: string;
  };
};

const initialState = (ctx: SetupContext): State => ({
  myselfFlag: false,
  userInfo: {},
  userId: ctx.root.$store.getters.userId,
  modal: false,
  currentTab: 0,
  token: ctx.root.$store.getters.token,
  inputs: {
    userImage: {
      imageData: "",
      fileName: "",
    },
  },
});

export default defineComponent({
  components: {
    ProfileEditModal,
    // Logout
    PostUser,
    SkillUser,
    IntroduceUser,
    Breadcrumbs,
    CardJob,
    UserTabs,
    UserBasicInfo,
  },
  props: {
    id: { type: Number as PropType<number>, default: 0, required: true },
  },
  setup: (props: Props, ctx) => {
    const state = reactive<State>(initialState(ctx));

    onBeforeMount(() => {
      if (state.userId == props.id) {
        state.myselfFlag = true;
      }
    });

    const breadcrumbs = computed(() => [
      {
        text: "探す",
        disabled: false,
        href: "/jobs",
      },
      {
        text: "ユーザー詳細",
        disabled: true,
      },
    ]);

    const { fetchProfileJobs, profileJobs } = useJobs();
    const { headerAuth } = useUtils();

    const fetchUser = async () => {
      // * ユーザー情報取得
      try {
        const res = await $fetch<Fetch<User>>(`${API_URL}/user/${props.id}`);
        fetchError(res.data.status);
        state.userInfo = res.data.response;
      } catch (error) {
        catchError(error);
      }
    };
    (async () => {
      await Promise.all([fetchProfileJobs(props.id), fetchUser()]);
    })();

    const onInput = (item: { name: string; value: string }) => {
      state.inputs.userImage = {
        ...state.inputs.userImage,
        [item.name]: item.value,
      };
    };

    const onUploadImage = async () => {
      // * 言語を {id: Number}に変換
      const selectlangValue = state.userInfo.programing_languages.map(
        (v: any) => v.id
      );
      const languageArray: {}[] = [];
      for (const selectedLang of selectlangValue) {
        languageArray.push({ id: selectedLang });
      }
      // * フレームワークを{id: Number}に変換
      const selectFramValue = state.userInfo.programing_frameworks.map(
        (v: any) => v.id
      );
      const framworksArray: {}[] = [];
      for (const selectedFramwork of selectFramValue) {
        framworksArray.push({ id: selectedFramwork });
      }
      // * その他スキルを {id: Number}に変換
      const selectSkillValue = state.userInfo.skills.map((v: any) => v.id);
      const skillArray: {}[] = [];
      for (const selectedSkill of selectSkillValue) {
        skillArray.push({ id: selectedSkill });
      }
      const params: EditProfileParams = {
        ...state.userInfo,
        user_image: {
          image_data: state.inputs.userImage.imageData,
          file_name: state.inputs.userImage.fileName,
        },
        programing_language_ids: languageArray,
        programing_framework_ids: framworksArray,
        skill_ids: skillArray,
      };

      try {
        await $put<EditProfileParams>(
          `${AUTH_URL}/user/${state.userInfo.id}`,
          params,
          headerAuth.value
        );
      } catch (error) {
        catchError(error);
      }
    };

    const openModal = () => {
      state.modal = true;
    };
    const closeModal = () => {
      state.modal = false;
    };

    // * 編集完了 emit
    const compliteEdit = async () => {
      await fetchUser();
      await closeModal();
    };
    const editEmit = () => {
      openModal();
    };

    const onEdit = (userInput: EditProfileParams) => {
      console.log(userInput, "userInput");
    };

    const clickTabs = (emitValue: 0 | 1 | 2) => {
      state.currentTab = emitValue;
    };

    return {
      ...toRefs(state),
      breadcrumbs,
      openModal,
      closeModal,
      compliteEdit,
      editEmit,
      profileJobs,
      clickTabs,
      onEdit,
      onUploadImage,
      onInput,
    };
  },
});
</script>

<template>
  <section>
    <Breadcrumbs :bread-crumbs="breadcrumbs" />
    <div class="detail-wrapper">
      <ProfileEditModal
        v-if="modal"
        :user-info="userInfo"
        @close="closeModal"
        @compliteEdit="compliteEdit()"
        :on-edit="onEdit"
      />
      <section class="user-area">
        <div class="user-area__post">
          <PostUser
            :user="userInfo"
            @editEmit="editEmit()"
            :myself-flag="myselfFlag"
            :on-upload-image="onUploadImage"
            :inputs="inputs"
            :on-input="onInput"
          />
          <v-row>
            <UserTabs
              :myself-flag="myselfFlag"
              :current-tab="currentTab"
              @clickTab="clickTabs($event)"
            />
          </v-row>
        </div>
      </section>
      <div v-show="currentTab === 0">
        <v-col class="area">
          <div class="area__card">
            <div class="detail-tag">開発スキル</div>
            <SkillUser :user="userInfo" />
          </div>
        </v-col>
        <v-col class="area">
          <div class="area__card">
            <div class="detail-tag">自己紹介</div>
            <IntroduceUser :user="userInfo" />
          </div>
        </v-col>
      </div>
      <div v-show="currentTab === 1">
        <div class="jobs d-flex flex-wrap">
          <router-link
            :to="`/jobs/${jobs.id}/detail`"
            v-for="jobs in profileJobs"
            :key="jobs.id"
            class="jobs__card d-flex justify-start"
          >
            <CardJob :job="jobs" />
          </router-link>
        </div>
      </div>
      <template v-if="myselfFlag">
        <div v-show="currentTab === 2">
          <v-col class="area">
            <div class="area__card">
              <div class="detail-tag">基本情報</div>
              <UserBasicInfo :user="userInfo" />
            </div>
          </v-col>
        </div>
        <div class="button-area">
          <div v-if="myselfFlag" class="button-action-area">
            <button @click="openModal" class="btn-box-edit">編集する</button>
          </div>
          <div class="button-action-area" v-else />
        </div>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.detail-tag {
  color: $primary-color;
  text-align: left;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 0.7rem;
}

.detail-wrapper {
  width: 100%;
  padding: 3.5rem 0rem 0 0;
  position: relative;

  .back-space {
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 1rem;
  }
  .user-area {
    width: 88%;
    margin: 0 auto;

    @media screen and (max-width: $la) {
      width: 100%;
    }

    &__post {
      width: 85%;
      display: flex;
      flex-direction: column;
      margin: 0 auto;

      @media screen and (max-width: $la) {
        width: 95%;
      }
    }
  }
}

// * 案件カード
.jobs {
  width: 80%;
  margin: 2rem auto;
  max-width: 789px;

  @media screen and (max-width: $sm) {
    width: 95%;
  }

  &__card {
    margin-left: 1rem;
    margin: 0 auto;
    text-decoration: none;
  }
}

//* カード
.detail-wrapper .area {
  width: 100%;

  &__card {
    width: 75%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 1rem auto;

    @media screen and (max-width: $la) {
      width: 95%;
    }

    @media screen and (max-width: $sm) {
      width: 100%;
    }
  }
}

.button-area {
  display: none;

  @media screen and (max-width: $me) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    bottom: 0;
  }

  //* 編集するボタン
  .btn-box-edit {
    @include box-shadow-btn;
    background-color: $secondary-color;
    color: $white;
    padding: 1rem 8rem;
    transition: 0.3s;
    border-radius: 50px;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    margin: auto;
    font-size: 1rem;
    display: inline-block;
    margin-bottom: 0.5rem;
    cursor: pointer;
    border: none;

    @media screen and (max-width: $ti) {
      padding: 1.2rem 6.5rem;
    }

    &:hover {
      @include btn-hover;
    }
  }
}
</style>
