<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import { VBtn } from "vuetify/lib";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
const themes = {
  variants: {
    basic: {
      depressed: true,
    },
    text: {
      text: true,
    },
    outlined: {
      outlined: true,
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
  textColors: {
    inherit: {
      class: {},
    },
    white: {
      class: {
        "btn-text--white": true,
      },
    },
  },
  bc: {
    primary: {
      class: "primary",
    },
    primaryWhite: {
      class: "primary-white",
    },
    red: {
      class: "red",
    },
    redWhite: {
      class: "red-white",
    },
    grey: {
      class: "grey",
    },
  },
} as const;

type Variants = keyof typeof themes.variants;
type Sizes = keyof typeof themes.sizes;
type TextColors = keyof typeof themes.textColors;
type BackgroundColor = keyof typeof themes.bc;
const propsOption = {
  variant: { type: String as PropType<Variants>, default: "basic" },
  size: { type: String as PropType<Sizes>, default: "md" },
  textColor: { type: String as PropType<TextColors>, default: "inherit" },
  bc: {
    type: String as PropType<BackgroundColor>,
    default: "primary",
  },
} as const;
type PropsOption = typeof propsOption;
export type ButtonProps = OutsidePropsType<PropsOption>;
export default defineComponent<InsidePropsType<PropsOption>>({
  name: "VButton",
  extends: VBtn,
  props: {
    /**
     * ボタンの種類 （`basic`, `text`, `outlined`）
     */
    variant: { type: String as PropType<Variants>, default: "basic" },
    /**
     * ボタンのサイズ（`xs`, `sm`, `md`, `lg`）
     */
    size: { type: String as PropType<Sizes>, default: "md" },
    /**
     * ボタンの文字の色（`inherit`, `white`）
     */
    textColor: { type: String as PropType<TextColors>, default: "white" },
    /**
     * 背景色の色（`primary`, `red`, `redWhite`）
     */
    bc: {
      type: String as PropType<BackgroundColor>,
      default: "primary",
    },
  },
  setup(props) {
    console.log(themes.bc[props.bc].class);
    const propsObj = computed(() => ({
      ...props,
      ...themes.variants[props.variant],
      ...themes.sizes[props.size],
    }));
    const classObj = computed(() => ({
      class: [
        themes.textColors[props.textColor].class,
        themes.bc[props.bc].class,
      ],
    }));
    return {
      propsObj,
      classObj,
    };
  },
});
</script>

<template>
  <v-btn v-bind="propsObj" :class="classObj.class" v-on="$listeners">
    <slot />
  </v-btn>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.v-btn {
  border-radius: 5px;
  font-weight: bold;
}
.v-btn--round {
  border-radius: 50% !important;
}
.btn-text--white {
  color: $white;
}
.red {
  @include neumorphism;
  @include red-btn;
  color: $white;
}
.primary {
  @include neumorphism;
  @include blue-btn;
  color: $white;
}
.primary-white {
  @include neumorphismGrey;
  color: $primary-color;
}
.red-white {
  @include neumorphismGrey;
  color: $red;
}
.grey {
  @include grey-btn;
  color: $white;
}
</style>
