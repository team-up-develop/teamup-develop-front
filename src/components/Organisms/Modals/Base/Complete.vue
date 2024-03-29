<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  // watch,
  // onBeforeUnmount,
} from "@vue/composition-api";
import { InsidePropsType } from "@icare-jp/vue-props-type";

const propsOption = {
  imageNumber: { type: Number, default: 1 },
  btnMain: {
    type: String,
    required: true,
    default: "",
  },
  btnSub: {
    type: String,
    required: true,
    default: "",
  },
  title: {
    type: String,
    required: true,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
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
  setup(_, ctx) {
    const state = reactive<State>(initialState());

    const mainFunction = () => {
      return ctx.emit("mainFunction");
    };

    const subFunction = () => {
      return ctx.emit("subFunction");
    };

    const close = () => {
      return ctx.emit("close");
    };

    return {
      ...toRefs(state),
      mainFunction,
      subFunction,
      close,
    };
  },
});
</script>

<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="close">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64" />
      </v-overlay>
      <div class="modal-window">
        <div class="modal-content">
          <div class="confirm">
            <img
              v-if="imageNumber === 1"
              class="img"
              src="@/assets/images/gif/happy.gif"
              width="30%"
            />
            <h3 class="py-2">{{ title }}</h3>
            <p class="content">{{ content }}</p>
            <div class="d-flex justify-center">
              <v-btn
                class="close-btn font-weight-bold px-8"
                @click="subFunction"
              >
                {{ btnSub }}
              </v-btn>
              <v-btn
                class="register-btn font-weight-bold px-6 ml-4"
                @click="mainFunction"
              >
                {{ btnMain }}
              </v-btn>
            </div>
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

    .content {
      font-size: 12px;
      font-weight: 100;
    }

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
