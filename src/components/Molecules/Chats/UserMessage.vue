<script lang="ts">
import {
  defineComponent,
  reactive,
  SetupContext,
  toRefs,
} from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import { Message } from "@/types/index";
type State = {
  userId: number;
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
});

const propsOption = {
  chats: { type: Array as PropType<Message[]>, required: true },
};
type PropsOption = typeof propsOption;
export type UserMessageProps = OutsidePropsType<PropsOption>;

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
  <div>
    <div class="balloon" v-for="chat in chats" :key="chat.id">
      <div class="balloon-image-left">
        <div class="balloon-img"/>
      </div>
      <div class="user-name">
        {{ chat.user.user_name }}
      </div>
      <div v-if="userId == chat.user_id" class="balloon-text-right self">
        <p>{{ chat.message }}</p>
      </div>
      <div class="balloon-text-right" v-else>
        <p>{{ chat.message }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

// * v-card の boxshadowを消します
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}

// * ここからトーク周り
.balloon {
  margin-bottom: 2em;
  position: relative;
}
.balloon:before,
.balloon:after {
  clear: both;
  content: "";
  display: block;
}
.balloon-image-left,
.balloon-image-right {
  width: 68px;
  height: 68px;
}
.balloon-image-left {
  float: left;
  // margin-right: 20px;
}
.user-name {
  padding: 0.2rem 1rem;
  text-align: left;
  color: $text-sub-color;
  font-size: 12px;
}
.balloon-image-right {
  float: right;
}
.balloon-img {
  @include user-image;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  margin: 0;
  background-color: #ffffff;
}
.balloon-image-description {
  padding: 5px 0 0;
  font-size: 10px;
  text-align: center;
  background-color: $light-grey;
}
.balloon-text-right,
.balloon-text-left {
  word-wrap: break-word;
  position: relative;
  padding: 0.8rem 1.4rem;
  // border: 1px solid #aaa;
  border-radius: 10px;
  max-width: -webkit-calc(100% - 120px);
  max-width: calc(100% - 120px);
  display: inline-block;
  background-color: $light-grey;
  text-align: left;
}
.balloon-text-right {
  float: left;
}
.balloon p {
  margin: 0 0 20px;
}
.balloon p:last-child {
  margin-bottom: 0;
}
// /* 三角部分 */
// .balloon-text-right .self :before {
//   position: absolute;
//   content: "";
//   // border: 10px solid transparent;
//   border-right: 10px solid #aaa;
//   top: 15px;
//   left: -20px;
// }
// .balloon-text-right .self :after {
//   position: absolute;
//   content: "";
//   border: 10px solid transparent;
//   border-right: 10px solid$light-grey;
//   top: 15px;
//   left: -19px;
// }
.balloon-text-left:before {
  position: absolute;
  content: "";
  background-color: $light-grey;
  border: 10px solid transparent;
  border-left: 10px solid #aaa;
  top: 15px;
  right: -20px;
}
.balloon-text-left:after {
  position: absolute;
  content: "";
  border: 10px solid transparent;
  border-left: 10px solid #f2f2f2;
  top: 15px;
  right: -19px;
  background-color: #ffffff;
}
.self {
  color: $white;
  background-color: #2195f396;
}
</style>
