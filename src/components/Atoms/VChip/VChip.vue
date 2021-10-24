<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import { VChip } from "vuetify/lib";
import {
  // InsidePropsType,
  // OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";

const themes = {
  color: {
    pri: {
      class: "pri",
    },
    purp: {
      class: "purp",
    },
    gree: {
      class: "gree",
    },
  },
  sizes: {
    xs: {
      xSmall: true,
    },
    sm: {
      small: true,
    },
    md: {},
    lg: {
      large: true,
    },
  },
} as const;

type Color = keyof typeof themes.color;
type Sizes = keyof typeof themes.sizes;

const propsOption = {
  color: { type: String as PropType<Color>, default: "gree" },
  size: { type: String as PropType<Sizes>, default: "md" },
};

export default defineComponent({
  name: "Chip",
  extends: VChip,
  props: propsOption,
  setup(props) {
    const propsObj = computed(() => ({
      ...props,
      ...themes.sizes[props.size],
    }));
    const classObj = computed(() => ({
      ...props,
      ...themes.color[props.color],
    }));
    return {
      classObj,
      propsObj,
    };
  },
});
</script>

<template>
  <v-chip v-bind="propsObj" :class="classObj" v-on="$listeners" label outlined>
    <slot />
  </v-chip>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.pri {
  @include border_framework;
  color: $primary-color;
}
.purp {
  color: $language-color;
  @include border_language;
}
.gree {
  color: $third-color;
  @include border-skill;
}
</style>
