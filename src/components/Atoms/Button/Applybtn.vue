<script lang="ts">
import Vue from 'vue';
import axios from 'axios'
import CompliteModal from '@/components/Organisms/Modals/Applys/CompliteModal.vue'
import { ApplyParams } from '@/types/job';

export type DataType = {
  userId: number;
  compliteModal: boolean;
  applyFlag: boolean;
  message: 'welcome';
}

export default Vue.extend({ 
  props: {
    jobId: Number,
  },
  data(): DataType {
    return {
      userId: this.$store.state.auth.userId,
      compliteModal: false,
      applyFlag: true,
      message: 'welcome'
    }
  },
  methods: {
    // * 応募する
    applyJob() {
      const params: ApplyParams = {
        jobId: this.jobId,
        userId: this.userId,
        applyStatusId: 1  
      };
      axios.post(`http://localhost:8888/api/v1/apply_job/`, params)
      .then(response => {
        this.compliteModal = true
        this.applyFlag = false
        this.$emit('compliteEntry', this.message)
      })
      .catch(error =>{
        console.log(error)
      })
    },
    openCompliteModal() {
      this.compliteModal = true
    },
    closeCompliteModal() {
      this.compliteModal = false
    },
  },
  components: {
    CompliteModal
  }
});
</script>


<template>
  <div class="modal-apply-area">
    <div class="btn-apply" @click="applyJob">
      応募する
    </div>
    <complite-modal @close="closeCompliteModal" v-if="compliteModal">
      <p>応募が完了しました。</p>
      <template slot="footer">
      </template>
    </complite-modal>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.modal-apply-area {
  width: 160px;
}

.btn-apply {
  @include box-shadow-btn ;
  @include red-btn ;
  display: block;
  padding: 1rem 3rem;
  border-radius: 50px;
  font-weight: 600;
  color: $basic-white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 0.95rem;
  display: inline-block;
  cursor: pointer;
  outline: none;
}

.btn-box-apply :hover {
  font-size: 100px;
}
</style>