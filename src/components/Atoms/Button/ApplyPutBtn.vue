<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import axios from "axios";
import { m, API_URL, catchError } from "@/master";
import { ParticipateParams } from "@/types/params";

export default defineComponent({
  props: {
    id: { type: Number, default: 0 }, //? 詳細を見るユーザーのID
    jobId: { type: Number, default: 0 },
    updatedAt: { type: String, defalut: String(new Date()), require: true },
  },
  setup: (props, context) => {
    console.log(props.updatedAt);

    const applyUserPut = async () => {
      const params: ParticipateParams = {
        job_id: props.jobId,
        user_id: props.id,
        apply_status_id: m.APPLY_STATUS_PARTICIPATE,
        // @ts-ignore //FIXME: 処理見直し
        updated_at: props.updatedAt,
      };
      try {
        await axios.put(`${API_URL}/apply_job/${props.jobId}`, params);
        context.emit("participate", m.APPLY_STATUS_PARTICIPATE);
      } catch (error) {
        catchError(error);
      }
    };
    return {
      applyUserPut,
    };
  },
});
</script>

<template>
  <div>
    <button class="btn-applicant" @click="applyUserPut">参加させる</button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.btn-applicant {
  @include red-btn;
  @include neumorphism;
  color: $white;
  padding: 1.2rem 5rem;
  transition: 0.3s;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  margin: auto;
  font-size: 1.3rem;
  display: inline-block;
  cursor: pointer;
  border: none;

  &:hover {
    @include red-btn-hover;
  }

  @media screen and (max-width: 590px) {
    padding: 1.2rem 4rem;
  }
  @media screen and (max-width: 500px) {
    padding: 1.2rem 3.2rem;
  }
  @media screen and (max-width: 400px) {
    padding: 1.2rem 2.4rem;
    font-size: 1rem;
  }
  @media screen and (max-width: 312px) {
    padding: 1.2rem 2rem;
  }
}
</style>
