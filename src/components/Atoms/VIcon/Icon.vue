<script lang="ts">
import { OutsidePropsType, PropType } from "@icare-jp/vue-props-type";
import { VIcon } from "vuetify/lib";
const themes = {
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
type Sizes = keyof typeof themes.sizes;
const propsOption = {
  size: { type: String as PropType<Sizes>, default: "md" },
} as const;
type PropsOption = typeof propsOption;

export type IconProps = OutsidePropsType<PropsOption>;
export default {
  name: "VIcon",
  extends: VIcon,
  inject: {
    components: {
      default: {
        VIcon,
      },
    },
  },
  propsObj(props: IconProps, data: any) {
    return {
      ...data.attrs,
      ...props,
      ...themes.sizes[props.size ?? "md"],
    };
  },
  classObj(props: IconProps) {
    return {
      icon: true,
      [`icon-${props.size ?? "md"}`]: true,
    };
  },
};
</script>

<template functional>
  <component
    :is="injections.components.VIcon"
    v-bind="$options.propsObj(props, data)"
    :class="[data.staticClass, $options.classObj(props)]"
    v-on="listeners"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.icon {
  overflow: hidden;
  &-xs {
    max-width: 12px;
  }
  &-sm {
    max-width: 16px;
  }
  &-md {
    max-width: 24px;
  }
  &-lg {
    max-width: 36px;
  }
}
</style>
