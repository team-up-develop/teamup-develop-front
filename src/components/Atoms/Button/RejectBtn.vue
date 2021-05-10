<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { $put, m, API_URL, catchError } from "@/master";
import { RejectParams } from "@/types/params";

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
        await $put<RejectParams>(`${API_URL}/apply_job/${props.jobId}`, params);
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
    <button class="btn-reject" @click="applyUserReject">お断りする</button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.btn-reject {
  @include neumorphismGrey;
  color: $red;
  margin-left: 1.1rem;
  padding: 1rem 5.5rem;
  transition: 0.3s;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  font-size: 1.1rem;
  display: inline-block;
  cursor: pointer;

  @media screen and (max-width: $sm) {
    padding: 1.1rem 3.2rem;
    margin-left: 0.3rem;
  }
  @media screen and (max-width: $ti) {
    padding: 1.1rem 2.8rem;
    font-size: 1rem;
  }
  // TODO: px指定をしなくてもstyleがずれないようにする
  @media screen and (max-width: 352px) {
    padding: 1rem 2.2rem;
  }
}
</style>
