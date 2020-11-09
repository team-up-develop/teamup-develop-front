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

<script>
import axios from 'axios'
import CompliteModal from '@/components/modal/CompliteModal.vue'
export default {
  props: {
    jobId: Number,
  },
  data() {
    return {
      compliteModal: false,
      applyFlag: true,
      message: 'welcome'
    }
  },
  methods: {
    // * 応募する
    applyJob() {
      const params = {
        jobId: this.jobId,
        userId: 1,
        applyStatusId: 1  
      };
      axios.post(`${this.$baseURL}/apply_job/`, params)
      .then(response => {
        console.log(response.data)
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
}
</script>

<style lang="scss" scoped>
.modal-apply-area {
  width: 47%;
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