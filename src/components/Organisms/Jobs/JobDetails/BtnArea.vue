<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
import Vuex from "@/store/index";
import axios from "axios";
import { API_URL, catchError } from "@/master";
import { FetchManageJobs } from "@/types/fetch";
import FavoriteDetailBtn from "@/components/Atoms/Button/FavoriteDetailBtn.vue";
import ApplyModal from "@/components/Organisms/Modals/Applications/ApplyModal.vue";
import Applybtn from "@/components/Atoms/Button/Applybtn.vue";
import EditJobModal from "@/components/Organisms/Modals/Edit/EditJobModal.vue";

type State = {
  userId: number;
  selfJobPost: boolean;
  applyFlug: boolean;
  modal: boolean;
  editModal: boolean;
};

const initialState = (): State => ({
  userId: Vuex.state.auth.userId,
  selfJobPost: false,
  applyFlug: true,
  modal: false,
  editModal: false,
});

export default defineComponent({
  components: {
    FavoriteDetailBtn,
    ApplyModal,
    Applybtn,
    EditJobModal,
  },
  props: {
    id: { type: Number, default: 0 },
    job: { type: Object },
  },
  setup: (props, context) => {
    const state = reactive<State>(initialState());
    const router = context.root.$router;

    const isLogin = computed(() => {
      if (state.userId) {
        return true;
      }
      return false;
    });

    // * 自分の案件か否かを判定
    const getCheckSelfJob = async () => {
      try {
        const res = await axios.get(`${API_URL}/jobs?user_id=${state.userId}`);
        for (let i = 0; i < res.data.response.length; i++) {
          const selfJob = res.data.response[i];
          if (selfJob.id === props.id) {
            state.selfJobPost = true;
          }
        }
      } catch (error) {
        catchError(error);
      }
    };

    // * ログインユーザーが応募済みか応募済みではないかを判定する
    const getCheckStatus = async () => {
      try {
        const res = await axios.get<FetchManageJobs>(
          `${API_URL}/apply_jobs?user_id=${state.userId}`
        );
        const arrayApply: any = [];
        for (let c = 0; c < res.data.response.length; c++) {
          const applyData: any = res.data.response[c];
          arrayApply.push(applyData.job.id);
        }
        if (arrayApply.includes(props.id)) {
          state.applyFlug = false;
        }
      } catch (error) {
        catchError(error);
      }
    };

    const openModal = () => (state.modal = true);
    const closeModal = () => (state.modal = false);
    const doSend = () => closeModal();
    const openEditModal = () => (state.editModal = true);
    const closeEditModal = () => (state.editModal = false);

    const registerRedirect = () => router.push("/register");

    onMounted(() => {
      if (!state.userId) {
        return;
      }
      getCheckSelfJob();
      getCheckStatus();
    });

    return {
      ...toRefs(state),
      isLogin,
      getCheckSelfJob,
      getCheckStatus,
      openModal,
      closeModal,
      doSend,
      openEditModal,
      closeEditModal,
      registerRedirect,
    };
  },
});
</script>

<template>
  <section class="wrap">
    <!-- 応募する モーダル画面 -->
    <div class="example-modal-window">
      <ApplyModal @close="closeModal" v-if="modal">
        <p>応募を完了してよろしいですか？</p>
        <template v-slot:footer>
          <Applybtn :jobId="id" />
          <button @click="doSend" class="modal-btn">キャンセル</button>
        </template>
      </ApplyModal>
    </div>
    <!-- 編集 モーダル画面 -->
    <div class="example-modal-window">
      <EditJobModal @close="closeEditModal" v-if="editModal" :job="job" />
    </div>
    <div class="button-area" v-if="isLogin">
      <div v-if="!selfJobPost" class="button-area__action">
        <button @click="openModal" class="apply" v-if="applyFlug">
          応募する
        </button>
        <div class="apply-false" v-if="applyFlug == false">応募済み</div>
        <div class="favorite">
          <FavoriteDetailBtn :jobId="id" />
        </div>
      </div>
      <div v-if="selfJobPost">
        <button class="edit" @click="openEditModal">編集する</button>
      </div>
    </div>
    <!-- 非ログイン時 リダイレクトさせる -->
    <div class="button-area" v-else>
      <div class="button-area__action" @click="registerRedirect">
        <button class="apply">応募する</button>
        <div class="favorite">
          <v-icon class="icon">mdi-heart</v-icon>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  bottom: 0;
  z-index: 2;
}
.router {
  text-decoration: none;
  color: $white;
}

//* ボタン エリア
.button-area {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  bottom: 0;

  &__action {
    margin: 0em auto 4rem auto;
    width: 50%;
    position: relative;

    @media screen and (max-width: 1100px) {
      width: 55%;
    }
    @media screen and (max-width: 900px) {
      width: 65%;
    }
    @media screen and (max-width: 900px) {
      min-height: 35px;
      margin: 0em auto 2rem auto;
      width: 100%;
      position: relative;
    }
    @media screen and (max-width: 768px) {
      min-height: 65px;
      margin: 0em auto 0rem auto;
      width: 100%;
      position: relative;
    }
  }
}

//* 応募するボタン
.apply {
  @include red-btn;
  @include neumorphism;
  color: $white;
  position: absolute;
  left: 0;
  top: 0;
  width: 70%;
  padding: 1.2rem 4rem;
  transition: 0.3s;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  margin: auto;
  font-size: 1.3rem;
  display: inline-block;
  cursor: pointer;
  border: none;

  @media screen and (max-width: 1000px) {
    width: 75%;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
    padding: 1.2rem 2rem;
    font-size: 1rem;
  }
}

//* 応募済みボタン */
.apply-false {
  @include grey-btn;
  @include box-shadow-btn;
  color: $white;
  position: absolute;
  left: 0;
  top: 0;
  width: 70%;
  padding: 1.2rem 4rem;
  transition: 0.3s;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  margin: auto;
  font-size: 1.3rem;
  display: inline-block;
  border: none;

  @media screen and (max-width: 1000px) {
    width: 75%;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
    padding: 1.2rem 2rem;
    font-size: 1rem;
  }
}

//* 編集するボタン
.edit {
  @include box-shadow-btn;
  background-color: $secondary-color;
  color: $white;
  padding: 1.2rem 8rem;
  transition: 0.3s;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  margin: auto;
  font-size: 1.3rem;
  display: inline-block;
  margin-bottom: 0.5rem;
  cursor: pointer;
  border: none;
  appearance: none;
  border: none;
  transition: 0.3s;
  outline: none;

  &:hover {
    @include btn-hover;
  }
}

.favorite {
  position: absolute;
  right: 0;
  top: 0;
  width: 20%;

  .heart {
    background-color: blue;
  }
}

.icon {
  font-size: 30px;
  padding: 1.5rem;
  width: 38px;
  height: 38px;
  color: $white;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}

// * モーダル内のキャンセルボタン
.modal-btn {
  @include neumorphismGrey;
  color: $red;
  padding: 1rem 2.4rem;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin-left: 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  outline: none;
}

//* スマホレスポンシブ
@media screen and (max-width: 500px) {
  // * 編集する
  .edit {
    font-size: 1rem;
  }
}
</style>
