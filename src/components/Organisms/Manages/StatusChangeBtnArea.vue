<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from "@vue/composition-api";
import axios from "axios";
import { m, API_URL, catchError } from "@/master";
import StatusChangeBtnArea from "@/components/Molecules/Manages/StatusChangeBtnArea.vue";

type State = {
  statusId: number;
  updatedAt: string;
};

const initialState = (): State => ({
  statusId: m.APPLY_STATUS_APPLY,
  updatedAt: "",
});

export default defineComponent({
  components: {
    StatusChangeBtnArea,
  },
  props: {
    id: { type: Number, default: 0 }, //? 詳細を見るユーザーのID
    jobId: { type: Number, default: 0 },
    applyId: { type: Number, default: 0 },
  },
  setup: (props) => {
    const state = reactive<State>(initialState());

    const participate = () => {
      state.statusId = m.APPLY_STATUS_PARTICIPATE;
    };
    const reject = () => {
      state.statusId = m.APPLY_STATUS_REJECT;
    };

    const doneParticipate = computed(() => {
      return state.statusId == m.APPLY_STATUS_PARTICIPATE ? true : false;
    });
    const doneReject = computed(() => {
      return state.statusId == m.APPLY_STATUS_REJECT ? true : false;
    });

    // * 表示中のユーザーのステータスを格納
    const getStatus = async () => {
      try {
        const res = await axios.get(`
          ${API_URL}/apply_jobs?job_id=${props.jobId}&user_id=${props.id}`);
        state.statusId = res.data.response[0].apply_status_id;
        state.updatedAt = res.data.response[0].updated_at;
      } catch (error) {
        catchError(error);
      }
    };
    getStatus();

    return {
      ...toRefs(state),
      participate,
      reject,
      doneParticipate,
      doneReject,
    };
  },
});
</script>

<template>
  <v-container>
    <div v-if="doneParticipate">
      <span class="btn-done">
        既に開発メンバーです <br />
        <span>※チャットをご覧ください</span>
      </span>
    </div>
    <div v-if="doneReject">
      <span class="btn-done">お断りしました </span>
    </div>
    <v-row v-if="!doneParticipate && !doneReject" class="btn-area">
      <StatusChangeBtnArea
        :id="id"
        :jobId="jobId"
        :applyId="applyId"
        :updatedAt="updatedAt"
        @participate="participate"
        @reject="reject"
      />
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.btn-area {
  margin-bottom: 1rem;
}
.btn-done {
  @include grey-btn;
  color: $white;
  padding: 1.2rem 4rem;
  transition: 0.3s;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  margin: auto;
  font-size: 1.1rem;
  display: inline-block;
  border: none;
  span {
    font-size: 0.5rem;
  }
}
</style>
