<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import { VueLoading } from "vue-loading-template";

type State = {
  loading: boolean;
};

const initialState = (): State => ({
  loading: true,
});
export default defineComponent({
  name: "Loading",
  components: {
    VueLoading,
  },
  setup: () => {
    const state = reactive<State>(initialState());

    return {
      ...toRefs(state),
    };
  },
});
</script>

<template>
  <div class="container" v-show="loading">
    <div class="fullview">
      <div class="loading-spacer" />
      <vue-loading
        type="bubbles"
        color="#2196f3"
        :size="{ width: '120px', height: '65px' }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 83%;
  height: 100vh;
  position: relative;
}
.fullview {
  width: 100%;
  height: 80%;
  position: fixed;
  top: 0;
  right: 0;
  position: absolute;
}
.loading-spacer {
  height: 30%;
}
</style>
