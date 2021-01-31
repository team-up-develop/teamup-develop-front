<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { m } from "@/master";
import ApplyPutBtn from "@/components/Atoms/Button/ApplyPutBtn.vue";
import RejectBtn from "@/components/Atoms/Button/RejectBtn.vue";

export default defineComponent({
  components: {
    ApplyPutBtn,
    RejectBtn,
  },
  props: {
    id: { type: Number, default: 0 }, //? 詳細を見るユーザーのID
    jobId: { type: Number, default: 0 },
    updatedAt: { type: String, defalut: new Date() },
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
      @participate="participate"
    />
    <RejectBtn
      :id="id"
      :jobId="jobId"
      :updatedAt="updatedAt"
      @reject="reject"
    />
  </v-row>
</template>
