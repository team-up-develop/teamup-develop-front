<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import axios from 'axios';
import { 
  m,
  API_URL,
  catchError
} from '@/master'
import { RejectParams } from '@/types/params';

export default defineComponent({ 
  props: {
    id: { type: Number, default: 0 }, //? 詳細を見るユーザーのID
    jobId: { type: Number, default: 0 },
  },
  setup: (props, context) => {
    const applyUserReject = async () => {
      const params: RejectParams = {
        jobId: props.jobId,
        userId: props.id,
        applyStatusId: m.APPLY_STATUS_REJECT
      };
      try {
        await axios.put(`${API_URL}/apply_job/`, params)
        context.emit("reject", m.APPLY_STATUS_REJECT);
      } catch (error) { catchError(error) }
    };
    return {
      applyUserReject
    }
  }
});
</script>

<template>
  <div>
    <button class="btn-reject" @click="applyUserReject">拒否する</button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.btn-reject {
  @include neumorphismGrey;
  color: $red;
  margin-left: 1rem;
  padding: 1.2rem 5.5rem;
  transition: .3s;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  font-size: 1.3rem;
  display: inline-block;
  cursor: pointer;

  @media screen and (max-width: 590px) {
    padding: 1.2rem 4.5rem;
  }
  @media screen and (max-width: 500px) {
    padding: 1.2rem 3.7rem;
    margin-left: 0.3rem;
  }
  @media screen and (max-width: 400px) {
    padding: 1.2rem 2.8rem;
    font-size: 1rem;
  }
  @media screen and (max-width: 312px) {
    padding: 1.2rem 2.4rem;
  }
}

</style>