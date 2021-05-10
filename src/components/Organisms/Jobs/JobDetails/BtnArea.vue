<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  // computed,
} from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import { Job } from "@/types";
import FavoriteDetailBtn from "@/components/Atoms/Button/FavoriteDetailBtn.vue";
import ApplyModal from "@/components/Organisms/Modals/Applications/ApplyModal.vue";
import Applybtn from "@/components/Atoms/Button/Applybtn.vue";
// import EditJobModal from "@/components/Organisms/Modals/Edit/EditJobModal.vue";

const propsOption = {
  id: { type: Number as PropType<number>, default: 0, required: true },
  job: { type: Object as PropType<Job>, defalut: {}, required: true },
  selfjob: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: true,
  },
  applyFlug: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: true,
  },
  isLogin: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: true,
  },
} as const;

type PropsOption = typeof propsOption;
export type BtnAreaProps = OutsidePropsType<PropsOption>;

type State = {
  selfJobPost: boolean;
  modal: boolean;
  // editModal: boolean;
};

const initialState = (): State => ({
  selfJobPost: false,
  modal: false,
});

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    FavoriteDetailBtn,
    ApplyModal,
    Applybtn,
    // EditJobModal,
  },
  props: propsOption,
  setup: (_, ctx) => {
    const state = reactive<State>(initialState());
    const router = ctx.root.$router;

    const openModal = () => (state.modal = true);
    const closeModal = () => (state.modal = false);
    const doSend = () => closeModal();
    const compliteEntry = () => ctx.emit("applied");
    const registerRedirect = () => router.push("/register/step/1");

    return {
      ...toRefs(state),
      openModal,
      closeModal,
      doSend,
      registerRedirect,
      compliteEntry,
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
          <Applybtn :jobId="id" @compliteEntry="compliteEntry" />
          <v-btn @click="doSend" class="modal-btn">キャンセル</v-btn>
        </template>
      </ApplyModal>
    </div>
    <!-- 編集 モーダル画面 -->
    <!-- <div class="example-modal-window">
      <EditJobModal @close="closeEditModal" v-if="editModal" :job="job" />
    </div> -->
    <div class="button-area" v-if="isLogin">
      <div class="button-area__action" v-if="!selfjob">
        <button @click="openModal" class="apply" v-if="applyFlug">
          応募する
        </button>
        <div class="apply-false" v-else>応募済み</div>
        <div class="favorite">
          <FavoriteDetailBtn :jobId="id" />
        </div>
      </div>
    </div>
    <!-- <div v-else>
        <button class="edit" @click="openEditModal">編集する</button>
      </div> -->
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

    @media screen and (max-width: $la) {
      width: 60%;
    }
    @media screen and (max-width: $me) {
      min-height: 35px;
      margin: 0em auto 2rem auto;
      width: 100%;
      position: relative;
    }
    @media screen and (max-width: $sm) {
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

  @media screen and (max-width: $la) {
    width: 75%;
  }
  @media screen and (max-width: $me) {
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

  @media screen and (max-width: $la) {
    width: 75%;
  }
  @media screen and (max-width: $me) {
    width: 80%;
    padding: 1.2rem 2rem;
    font-size: 1rem;
  }
}

//* 編集するボタン
// .edit {
//   @include box-shadow-btn;
//   background-color: $secondary-color;
//   color: $white;
//   padding: 1.2rem 8rem;
//   transition: 0.3s;
//   border-radius: 50px;
//   font-weight: 600;
//   line-height: 1;
//   text-align: center;
//   margin: auto;
//   font-size: 1.3rem;
//   display: inline-block;
//   margin-bottom: 0.5rem;
//   cursor: pointer;
//   border: none;
//   appearance: none;
//   border: none;
//   transition: 0.3s;
//   outline: none;

//   @media screen and (max-width: $sm) {
//     font-size: 1rem;
//   }

//   &:hover {
//     @include btn-hover;
//   }
// }

.favorite {
  position: absolute;
  right: 0;
  top: 0;
  width: 20%;

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
}

// * モーダル内のキャンセルボタン
.modal-btn {
  @include neumorphismGrey;
  color: $red;
  padding: 0rem 2.4rem !important;
  height: 46px !important;
  border-radius: 50px;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin-left: 1.2rem;
  font-size: 1rem;
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  outline: none;
}
</style>
