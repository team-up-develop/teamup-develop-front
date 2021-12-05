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
import ConfirmDialog from "@/components/Organisms/Modals/Actions/ConfirmDialog.vue";
import { encode } from "@/libs/jsBase64";
import { VButton } from "@/components/Atoms";

const propsOption = {
  id: { type: Number, default: 0, required: true },
  job: { type: Object as PropType<Job> },
  isSelfJob: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: true,
  },
  isApply: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: true,
  },
  isLogin: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: true,
  },
  onApply: {
    type: Function as PropType<() => Promise<void>>,
    required: true,
  },
} as const;

type PropsOption = typeof propsOption;
export type BtnAreaProps = OutsidePropsType<PropsOption>;

type State = {
  modal: boolean;
};

const initialState = (): State => ({
  modal: false,
});

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    FavoriteDetailBtn,
    ConfirmDialog,
    VButton,
  },
  props: propsOption,
  setup: (props, ctx) => {
    const state = reactive<State>(initialState());
    const router = ctx.root.$router;

    const registerRedirect = async () => {
      await localStorage.setItem("CJI_DATA_EN", encode(String(props.id)));
      return router.push("/register/personal");
    };

    const onApplyEvent = async () => {
      await props.onApply();
      state.modal = false;
    };

    return {
      ...toRefs(state),
      registerRedirect,
      onApplyEvent,
    };
  },
});
</script>

<template>
  <section class="wrap">
    <!-- 応募する モーダル画面 -->
    <div class="example-modal-window">
      <ConfirmDialog @close="() => (modal = false)" v-if="modal">
        <v-icon class="apply-icon pt-1 pb-4">
          mdi mdi-handshake-outline
        </v-icon>
        <p>応募を完了してよろしいですか？</p>
        <template v-slot:btnArea>
          <div class="d-flex justify-space-between">
            <VButton
              class="rounded-pill modal-btn-apply mr-4"
              @click="onApplyEvent()"
              bc="red"
              size="lg"
              >応募する</VButton
            >
            <VButton
              class="rounded-pill modal-btn mr-4"
              @click="() => (modal = false)"
              bc="redWhite"
              size="lg"
              >キャンセル</VButton
            >
          </div>
        </template>
      </ConfirmDialog>
    </div>
    <div class="button-area" v-if="isLogin">
      <div class="button-area__action" v-if="!isSelfJob">
        <VButton
          v-if="isApply"
          class="rounded-pill apply mr-4"
          @click="() => (modal = true)"
          bc="red"
          size="lg"
          >応募する</VButton
        >
        <div class="apply-false" v-else>応募済み</div>
        <div class="favorite">
          <FavoriteDetailBtn :job-id="id" />
        </div>
      </div>
    </div>
    <!-- 非ログイン時 リダイレクトさせる -->
    <div class="button-area" v-else>
      <div class="button-area__action">
        <VButton
          class="rounded-pill apply mr-4"
          @click="registerRedirect"
          bc="red"
          size="lg"
          >応募する</VButton
        >
        <div class="favorite">
          <v-icon class="icon">mdi-heart</v-icon>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.apply-icon {
  color: $apply;
  font-size: 6em;
}

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
  font-size: 1.3rem;
  padding: 1.2rem 4rem;
  position: absolute;
  left: 0;
  top: 0;
  width: 70%;

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

.modal-btn {
  padding: 0rem 2rem !important;
  height: 46px !important;
  max-width: 280px;
}
.modal-btn-apply {
  padding: 0rem 2.5rem !important;
  height: 46px !important;
  max-width: 280px;
}
</style>
