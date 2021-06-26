<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { $put } from "@/libs/axios";
import { m, AUTH_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { ParticipateParams } from "@/types/params";
import { useUtils } from "@/hooks";

type Props = {
  id: number;
  jobId: number;
  updatedAt: string;
  applyId: number;
};

export default defineComponent({
  props: {
    id: { type: Number as PropType<number>, default: 0, required: true }, //? 詳細を見るユーザーのID
    jobId: { type: Number as PropType<number>, default: 0, required: true },
    updatedAt: {
      type: String as PropType<string>,
      defalut: String(new Date()),
      required: true,
    },
    applyId: { type: Number as PropType<number>, default: 0, required: true },
  },
  setup: (props: Props, context) => {
    const { auth } = useUtils();

    const putApply = async () => {
      const params: ParticipateParams = {
        id: props.applyId,
        job_id: props.jobId,
        user_id: props.id,
        apply_status_id: m.APPLY_STATUS_PARTICIPATE,
        // @ts-ignore //FIXME: 処理見直し
        updated_at: props.updatedAt,
      };
      try {
        await $put<ParticipateParams>(
          `${AUTH_URL}/apply_job/${props.jobId}`,
          params,
          {
            headers: auth.value,
          }
        );
        console.log(params);
        context.emit("participate", m.APPLY_STATUS_PARTICIPATE);
      } catch (error) {
        catchError(error);
      }
    };
    return {
      putApply,
    };
  },
});
</script>

<template>
  <div>
    <v-btn class="btn-applicant" @click="putApply">一緒に開発する</v-btn>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.btn-applicant {
  @include red-btn;
  @include neumorphism;
  color: $white;
  padding: 0.4rem 1.2rem !important;
  transition: 0.3s;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  margin: auto;
  font-size: 0.8rem;
  cursor: pointer;
  border: none;

  &:hover {
    @include red-btn-hover;
  }

  @media screen and (max-width: $sm) {
  }
  @media screen and (max-width: $ti) {
  }
}
</style>
