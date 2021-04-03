<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { m } from "@/master";
import ApplyPutBtn from "@/components/Atoms/Button/ApplyPutBtn.vue";
import RejectBtn from "@/components/Atoms/Button/RejectBtn.vue";

export default defineComponent({
  components: {
    ApplyPutBtn,
    RejectBtn,
  },
  props: {
    id: { type: Number as PropType<number>, default: 0, require: true }, //? 詳細を見るユーザーのID
    jobId: { type: Number as PropType<number>, default: 0, require: true },
    updatedAt: {
      type: String as PropType<string>,
      defalut: new Date(),
      require: true,
    },
    applyId: { type: Number as PropType<number>, default: 0, require: true },
  },
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
