<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  PropType,
} from "@vue/composition-api";
import { md } from "@/master";

type State = {
  tabs: { id: number; tabName: string }[];
  selfTabs: { id: number; tabName: string }[];
};

const initialState = (): State => ({
  tabs: md.userTabs,
  selfTabs: md.selfTabs,
});

export default defineComponent({
  props: {
    myselfFlag: {
      type: Boolean as PropType<boolean>,
      default: false,
      required: true,
    },
    currentTab: {
      type: Number as PropType<number>,
      default: 0,
      required: true,
    },
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
  border-bottom: $dark-grey 1px solid;
}
button:hover {
  @include tab-hover;
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
</style>
