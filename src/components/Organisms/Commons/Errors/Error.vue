<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";

const propsOption = {
  errorNumber: {
    type: Number as PropType<number>,
    required: true,
    default: 400,
  },
  title: { type: String as PropType<string>, required: true, default: "" },
  describe: { type: String as PropType<string>, required: true, default: "" },
};
type PropsOption = typeof propsOption;
export type Error = OutsidePropsType<PropsOption>;

export default defineComponent<InsidePropsType<PropsOption>>({
  props: propsOption,
  setup() {
    return {};
  },
});
</script>
<template>
  <div class="app">
    <div class="txt">
      <span>{{ title }}<span class="blink">_</span></span
      ><br />
      <span class="message">
        {{ describe }} <br />
        {{ errorNumber }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Press+Start+2P");
@import "@/assets/scss/_variables.scss";

$glowSize: 10px;

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

* {
  font-family: "Press Start 2P", cursive;
  box-sizing: border-box;
}
.app {
  padding: 1rem;
  background: $white;
  display: flex;
  height: 93vh;
  justify-content: center;
  align-items: center;
  color: $primary-color;
  text-shadow: 0px 0px $glowSize;
  font-size: 6rem;
  flex-direction: column;
  .title {
    font-size: 1rem;
  }
  .txt {
    font-size: 1.8rem;
  }
}
@keyframes blink {
  0% {
    opacity: 0;
  }
  49% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

.blink {
  animation-name: blink;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.message {
  font-size: 1rem;
}
</style>
