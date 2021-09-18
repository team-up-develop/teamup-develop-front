<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
} from "@vue/composition-api";
import { InsidePropsType, OutsidePropsType } from "@icare-jp/vue-props-type";

const propsOption = {
  text: { type: String, default: "まだ案件に応募していません", required: true },
} as const;
type PropsOption = typeof propsOption;
export type NotJobCard = OutsidePropsType<PropsOption>;

type State = {
  userId: number;
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
});

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {},
  props: propsOption,
  setup: (_, ctx) => {
    const state = reactive<State>(initialState(ctx));

    return {
      ...toRefs(state),
    };
  },
});
</script>

<template>
  <section class="text-center">
    <v-sheet class="back pa-3 mt-3">
      <div>{{ text }}</div>
    </v-sheet>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.back {
  background-color: $light-grey;
}
</style>
