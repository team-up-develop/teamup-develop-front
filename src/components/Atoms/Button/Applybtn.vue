<script lang="ts">
import Vue, { PropType } from "vue";
import { m, API_URL, catchError } from "@/master";
import axios from "axios";
import CompliteModal from "@/components/Organisms/Modals/Applications/CompliteModal.vue";
import { ApplyParams } from "@/types/params";

type DataType = {
  userId: number;
  compliteModal: boolean;
  applyFlag: boolean;
};

export default Vue.extend({
  props: {
    jobId: { type: Number as PropType<number>, default: 0 },
  },
  data(): DataType {
    return {
      userId: this.$store.state.auth.userId,
      compliteModal: false,
      applyFlag: true,
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
      axios
        .post<ApplyParams>(`${API_URL}/apply_job`, params)
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
    closeCompliteModal() {
      this.compliteModal = false;
    },
  },
  components: {
    CompliteModal,
  },
});
</script>

<template>
  <div class="modal-apply-area">
    <div class="btn-apply" @click="applyJob">
      応募する
    </div>
    <complite-modal @close="closeCompliteModal" v-if="compliteModal">
      <p>応募が完了しました。</p>
      <template v-slot:footer> </template>
    </complite-modal>
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
  display: block;
  padding: 1rem 3rem;
  border-radius: 50px;
  font-weight: 600;
  color: $white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 0.95rem;
  display: inline-block;
  cursor: pointer;
  outline: none;
}
</style>
