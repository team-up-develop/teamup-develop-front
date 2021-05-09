<script lang="ts">
import { InsidePropsType, PropType } from "@icare-jp/vue-props-type";
import { defineComponent } from "@vue/composition-api";
import { m } from "@/master";
import ApplyPutBtn from "@/components/Atoms/Button/ApplyPutBtn.vue";
import RejectBtn from "@/components/Atoms/Button/RejectBtn.vue";

const propsOption = {
  id: { type: Number as PropType<number>, default: 0, required: true }, //? 詳細を見るユーザーのID
  jobId: { type: Number as PropType<number>, default: 0, required: true },
  updatedAt: {
    type: String as PropType<string>,
    defalut: new Date(),
    required: true,
  },
  applyId: { type: Number as PropType<number>, default: 0, required: true },
} as const;

type PropsOption = typeof propsOption;

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    ApplyPutBtn,
    RejectBtn,
  },
  props: propsOption,
  setup: (_, context) => {
    const participate = () => {
      context.emit("participate", m.APPLY_STATUS_PARTICIPATE);
    };
    const reject = () => {
      context.emit("reject", m.APPLY_STATUS_REJECT);
    };
    return {
      participate,
      reject,
    };
  },
});
</script>

<template>
  <v-row>
    <ApplyPutBtn
      :id="id"
      :jobId="jobId"
      :updatedAt="updatedAt"
      :applyId="applyId"
      @participate="participate"
    />
    <RejectBtn
      :id="id"
      :jobId="jobId"
      :updatedAt="updatedAt"
      :applyId="applyId"
      @reject="reject"
    />
  </v-row>
</template>
