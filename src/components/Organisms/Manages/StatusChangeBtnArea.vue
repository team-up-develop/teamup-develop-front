<script lang="ts">
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import { defineComponent, computed } from "@vue/composition-api";
import StatusChangeBtnArea from "@/components/Molecules/Manages/StatusChangeBtnArea.vue";
import { doneParticipate, doneReject } from "@/modules/Manages/manages";

const propsOption = {
  id: { type: Number as PropType<number>, default: 0, required: true }, //? 詳細を見るユーザーのID
  jobId: { type: Number as PropType<number>, default: 0, required: true },
  applyId: { type: Number as PropType<number>, default: 0, required: true },
  statusId: { type: Number as PropType<number>, default: 0, required: true },
  updatedAt: {
    type: String,
    default: "",
    required: true,
  },
} as const;

type PropsOption = typeof propsOption;
export type StatusChangeProps = OutsidePropsType<PropsOption>;

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    StatusChangeBtnArea,
  },
  props: propsOption,
  setup: (props, ctx) => {
    const participate = () => {
      ctx.emit("participate");
    };
    const reject = () => {
      ctx.emit("reject");
    };

    return {
      participate,
      reject,
      doneParticipate: computed(() => doneParticipate(props.statusId)),
      doneReject: computed(() => doneReject(props.statusId)),
    };
  },
});
</script>

<template>
  <v-container>
    <div v-if="doneParticipate">
      <span class="btn-done">
        既に開発メンバーです <br />
        <span>※チャットをご覧ください</span>
      </span>
    </div>
    <div v-if="doneReject">
      <span class="btn-done">お断りしました </span>
    </div>
    <v-row v-if="!doneParticipate && !doneReject" class="btn-area">
      <StatusChangeBtnArea
        :id="id"
        :jobId="jobId"
        :applyId="applyId"
        :updatedAt="updatedAt"
        @participate="participate"
        @reject="reject"
      />
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.btn-area {
  margin-bottom: 1rem;
}
.btn-done {
  @include grey-btn;
  color: $white;
  padding: 1.2rem 4rem;
  transition: 0.3s;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  margin: auto;
  font-size: 1rem;
  display: inline-block;
  border: none;
  span {
    font-size: 0.5rem;
  }
}
</style>
