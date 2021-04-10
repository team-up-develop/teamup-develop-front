<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  PropType,
} from "@vue/composition-api";

type State = {
  tabs: { id: number; tabName: string }[];
  selfTabs: { id: number; tabName: string }[];
};

const initialState = (): State => ({
  tabs: [
    { id: 0, tabName: "プロフィール" },
    { id: 1, tabName: "投稿案件" },
  ],
  selfTabs: [
    { id: 0, tabName: "プロフィール" },
    { id: 1, tabName: "投稿案件" },
    { id: 2, tabName: "基本情報" },
  ],
});

export default defineComponent({
  props: {
    myselfFlag: {
      type: Boolean as PropType<boolean>,
      default: false,
      require: true,
    },
    currentTab: { type: Number as PropType<number>, default: 0, require: true },
  },
  setup: (_, contex) => {
    const state = reactive<State>(initialState());

    const clickTab = (index: 0 | 1 | 2) => {
      contex.emit("clickTab", index);
    };

    return {
      ...toRefs(state),
      clickTab,
    };
  },
});
</script>

<template>
  <div class="tabs">
    <div class="btn-container">
      <template v-if="myselfFlag">
        <button
          v-for="(tab, index) in selfTabs"
          :key="tab.name"
          :class="{ active: currentTab === index }"
          @click="clickTab(index)"
        >
          {{ tab.tabName }}
        </button>
      </template>
      <template v-else>
        <button
          v-for="(tab, index) in tabs"
          :key="tab.name"
          :class="{ active: currentTab === index }"
          @click="clickTab(index)"
        >
          {{ tab.tabName }}
        </button>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.tabs {
  width: 100%;
  border-radius: 10px;
}
.btn-container {
  display: flex;
}

button {
  color: $text-main-color;
  text-decoration: none;
  width: 33.3%;
  padding: 0.7rem 0;
}

button.active {
  font-weight: bold;
  color: $text-main-color;
  text-decoration: none;
  width: 33.3%;
  padding: 0.7rem 0;
  border-bottom: $dark-grey 1px solid;
  background-color: $dark-grey;
}
</style>
