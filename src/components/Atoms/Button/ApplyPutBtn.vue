<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import axios from "axios";
import { m, API_URL, catchError } from "@/master";
import { ParticipateParams } from "@/types/params";

export default defineComponent({
  props: {
    id: { type: Number, default: 0, require: true }, //? 詳細を見るユーザーのID
    jobId: { type: Number, default: 0, require: true },
    updatedAt: { type: String, defalut: String(new Date()), require: true },
    applyId: { type: Number, default: 0, require: true },
  },
  setup: (props, context) => {
    // console.log(props);

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
        await axios.put(`${API_URL}/apply_job/${props.jobId}`, params);
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
    <button class="btn-applicant" @click="putApply">一緒に開発する</button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.btn-applicant {
  @include red-btn;
  @include neumorphism;
  color: $white;
  padding: 1.2rem 4.2rem;
  transition: 0.3s;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  margin: auto;
  font-size: 1.1rem;
  display: inline-block;
  cursor: pointer;
  border: none;

  &:hover {
    @include red-btn-hover;
  }

  @media screen and (max-width: $sm) {
    padding: 1.2rem 3rem;
  }
  @media screen and (max-width: $ti) {
    padding: 1.2rem 2.4rem;
    font-size: 1rem;
  }
  // TODO: px指定をしなくてもstyleがずれないようにする
  @media screen and (max-width: 352px) {
    padding: 1.2rem 1.5rem;
  }
}
</style>
