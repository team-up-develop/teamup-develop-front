<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { $put } from "@/libs/axios";
import { m, AUTH_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { RejectParams } from "@/types/params";
import { useUtils } from "@/hooks";

type Props = {
  id: number;
  jobId: number;
  updatedAt: string;
  applyId: number;
};

export default defineComponent({
  props: {
    id: { type: Number as PropType<number>, default: 0 }, //? 詳細を見るユーザーのID
    jobId: { type: Number as PropType<number>, default: 0 },
    updatedAt: {
      type: String as PropType<string>,
      defalut: String(new Date()),
      required: true,
    },
    applyId: { type: Number as PropType<number>, default: 0 },
  },
  setup: (props: Props, context) => {
    const { auth } = useUtils();

    const applyUserReject = async () => {
      const params: RejectParams = {
        id: props.applyId,
        job_id: props.jobId,
        user_id: props.id,
        apply_status_id: m.APPLY_STATUS_REJECT,
        // @ts-ignore //FIXME: 処理見直し
        updated_at: props.updatedAt,
      };
      try {
        await $put<RejectParams>(
          `${AUTH_URL}/apply_job/${props.jobId}`,
          params,
          {
            headers: auth.value,
          }
        );
        context.emit("reject", m.APPLY_STATUS_REJECT);
      } catch (error) {
        catchError(error);
      }
    };
    return {
      applyUserReject,
    };
  },
});
</script>

<template>
  <div>
    <v-btn class="btn-reject" @click="applyUserReject">お断りする</v-btn>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.btn-reject {
  @include neumorphismGrey;
  color: $red;
  padding: 0.4rem 1.7rem !important;
  transition: 0.3s;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  margin: auto;
  font-size: 0.9rem;
  display: inline-block;
  cursor: pointer;
  border: none;

  @media screen and (max-width: $sm) {
  }
  @media screen and (max-width: $ti) {
  }
}
</style>
