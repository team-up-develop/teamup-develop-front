
<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
  computed
} from '@vue/composition-api';
import axios from 'axios';
import { m, API_URL } from '@/master'
import StatusChangeBtnArea from '@/components/Molecules/Manages/StatusChangeBtnArea.vue'

type State = {
  statusId: number;
}

const initialState = (): State => ({
  statusId: 1,
});

export default defineComponent({ 
  components: {
    StatusChangeBtnArea
  },
  props: {
    id: { type: Number, default: 0 }, //? 詳細を見るユーザーのID
    jobId: { type: Number, default: 0 },
  },
  setup: (props) => {
    const state = reactive<State>(initialState());

    const participate = () => {
      state.statusId = m.APPLY_STATUS_PARTICIPATE;
    }
    const reject = () => {
      state.statusId = m.APPLY_STATUS_REJECT;
    }

    const doneParticipate = computed(() => {
      if(state.statusId == m.APPLY_STATUS_PARTICIPATE) {
        return true
      }
      return false
    });
    const doneReject = computed(() => {
      if(state.statusId == m.APPLY_STATUS_REJECT) {
        return true
      }
      return false
    });

    // * 表示中のユーザーのステータスを格納
    const getStatus = async () => {
      try { 
        const response = await axios.get(`${API_URL}/apply_job/?job_id=${ props.jobId }&user_id=${ props.id }`)
        state.statusId = response.data[0].applyStatusId
      } catch (error) {
        console.log(error)
      }
    }
    getStatus();

    return {
      ...toRefs(state),
      participate,
      reject,
      doneParticipate,
      doneReject
    }
  }
});
</script>

<template>
  <v-container>
    <div v-if="doneParticipate">
      <button class="btn-done">参加しています</button>
    </div>
    <div v-if="doneReject">
      <button class="btn-done">拒否しています</button>
    </div>
    <v-row v-if="!doneParticipate && !doneReject" class="btn-area">
      <StatusChangeBtnArea :id="id" :jobId="jobId" @participate="participate" @reject="reject" />
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.btn-area {
  margin-bottom: 1rem;
}
.btn-done {
  color: $red;
  font-weight: bold;
}
</style>