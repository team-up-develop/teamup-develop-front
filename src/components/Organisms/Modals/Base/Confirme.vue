<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  // onBeforeUnmount,
} from "@vue/composition-api";
import { InsidePropsType, PropType } from "@icare-jp/vue-props-type";

const propsOption = {
  onFunction: { type: Function as PropType<() => void>, required: true },
  btnTitle: {
    type: String,
    required: true,
    default: "",
  },
  btnSubTitle: {
    type: String,
    required: true,
    default: "",
  },
  confirmModalTitle: {
    type: String,
    required: true,
    default: "",
  },
  compliteModalTitle: {
    type: String,
    required: true,
    default: "",
  },
  compliteOk: { type: Boolean, default: false },
} as const;
type PropsOption = typeof propsOption;

type State = {
  overlay: boolean;
};

const initialState = (): State => ({
  overlay: false,
});

export default defineComponent<InsidePropsType<PropsOption>>({
  props: propsOption,
  setup(props, ctx) {
    const state = reactive<State>(initialState());

    const onclickFunc = () => {
      props.onFunction?.();
      state.overlay = !state.overlay;
    };

    watch(
      () => state.overlay,
      () => {
        setTimeout(() => {
          state.overlay = false;
        }, 3000);
      }
    );

    const emitOption = () => {
      // *完了した際の emit
      if (props.compliteOk) {
        return ctx.emit("complite");
      }
      // * モーダルを閉じる
      return ctx.emit("close");
    };
    return {
      ...toRefs(state),
      onclickFunc,
      emitOption,
    };
  },
});
</script>

<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="emitOption">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64" />
      </v-overlay>
      <div class="modal-window">
        <div class="modal-content">
          <div class="confirm" v-if="!compliteOk">
            <v-icon class="icon">
              mdi mdi-emoticon-happy-outline
            </v-icon>
            <p class="py-2">{{ confirmModalTitle }}</p>
            <div class="d-flex justify-center">
              <v-btn
                class="close-btn font-weight-bold px-8"
                @click="emitOption"
              >
                {{ btnSubTitle }}
              </v-btn>
              <v-btn
                class="register-btn font-weight-bold px-6 ml-4"
                @click="onclickFunc"
              >
                {{ btnTitle }}
              </v-btn>
            </div>
          </div>
          <div class="complite" v-if="compliteOk">
            <v-icon class="icon">mdi-check-underline-circle-outline</v-icon>
            <p>
              {{ compliteModalTitle }}
            </p>
          </div>
        </div>
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
  z-index: 30;
  top: 0;
  left: 0;
  background: $modal-background;
  font-weight: bold;
  width: 100%;
  height: 100%;
}

.modal-window {
  background: $white;
  border-radius: 8px;
  overflow: hidden;
}

.modal-content {
  margin: 0 auto;
  min-width: 320px;
  max-width: 480px;

  .confirm {
    margin: 0 auto;
    padding: 1rem 0rem;

    .register-btn {
      @include box-shadow-btn;
      @include blue-btn;
      color: $white;
    }
    .close-btn {
      @include neumorphismGrey;
      color: $primary-color;
    }
  }

  .complite {
    margin: 0 auto;
    padding: 1rem 0rem;
  }

  .icon {
    color: $primary-color;
    font-size: 6em;
  }
}

.modal-footer {
  width: 80%;
  text-align: right;
  display: inline-block;
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
