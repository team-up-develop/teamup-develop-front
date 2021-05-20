<script lang="ts">
import Vue, { PropType } from "vue";
import { $post, m, AUTH_URL, catchError } from "@/master";
import CompliteModal from "@/components/Organisms/Modals/Applications/CompliteModal.vue";
import { ApplyParams } from "@/types/params";

type State = {
  userId: number;
  compliteModal: boolean;
  applyFlag: boolean;
  token: string;
};

export default Vue.extend({
  components: {
    CompliteModal,
  },
  props: {
    jobId: { type: Number as PropType<number>, default: 0 },
  },
  data(): State {
    return {
      userId: this.$store.state.auth.userId,
      compliteModal: false,
      applyFlag: true,
      token: this.$store.state.auth.token,
    };
  },
  methods: {
    // * 応募する
    applyJob() {
      const params: ApplyParams = {
        job_id: this.jobId,
        user_id: this.userId,
        apply_status_id: m.APPLY_STATUS_APPLY,
      };
      $post<ApplyParams>(`${AUTH_URL}/apply_job`, params, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => {
          this.compliteModal = true;
          this.applyFlag = false;
          this.$emit("compliteEntry");
          return res;
        })
        .catch((error) => {
          catchError(error);
        });
    },
    openCompliteModal() {
      this.compliteModal = true;
    },
  },
});
</script>

<template>
  <div class="modal-apply-area">
    <CompliteModal v-if="compliteModal" />
    <v-btn class="btn-apply" @click="applyJob" v-if="!compliteModal">
      応募する
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.modal-apply-area {
  width: 160px;
}

.btn-apply {
  @include neumorphism;
  @include red-btn;
  padding: 0rem 3rem !important;
  height: 46px !important;
  border-radius: 45px;
  color: $white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 0.95rem;
  display: inline-block;
  cursor: pointer;
}

span {
  color: $text-sub-color;
  font-size: 0.5rem;
  text-align: center;
}
</style>
