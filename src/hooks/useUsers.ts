import { reactive, toRefs } from "@vue/composition-api";
import Vuex from "@/store/index";
import { $fetch } from "@/libs/axios";
import { catchError } from "@/libs/errorHandler";
import { ApplyJob, ParticipateJob, RejectJob } from "@/types/index";
import {
  FetchApplyJob,
  FetchParticipateJob,
  FetchRejectJob,
} from "@/types/fetch";
import { m, AUTH_URL } from "@/master";
import { useUtils } from "@/hooks";

type State = {
  userId: number;
  applyUsers: ApplyJob[];
  assignUsers: ParticipateJob[];
  rejectUsers: RejectJob[];
};

const initialState = (): State => ({
  userId: Vuex.getters.userId,
  applyUsers: [],
  assignUsers: [],
  rejectUsers: [],
});

const useUsers = () => {
  const state = reactive<State>(initialState());
  const { auth } = useUtils();

  // * 応募者
  const fetchApplyUser = async (jobId: number) => {
    try {
      const res = await $fetch<FetchApplyJob>(
        `
        ${AUTH_URL}/apply_jobs?job_id=${jobId}&apply_status_id=${m.APPLY_STATUS_APPLY}`,
        {
          headers: auth.value,
        }
      );
      state.applyUsers = res.data.response;
    } catch (error) {
      catchError(error);
    }
  };
  // * 参加者
  const fetchAssignUsers = async (jobId: number) => {
    try {
      const res = await $fetch<FetchParticipateJob>(
        `
          ${AUTH_URL}/apply_jobs?job_id=${jobId}&apply_status_id=${m.APPLY_STATUS_PARTICIPATE}
          `,
        {
          headers: auth.value,
        }
      );
      state.assignUsers = res.data.response;
    } catch (error) {
      catchError(error);
    }
  };
  // * 拒否者
  const fetchRejectUser = async (jobId: number) => {
    try {
      const res = await $fetch<FetchRejectJob>(
        `
          ${AUTH_URL}/apply_jobs?job_id=${jobId}&apply_status_id=${m.APPLY_STATUS_REJECT}`,
        {
          headers: auth.value,
        }
      );
      state.rejectUsers = res.data.response;
    } catch (error) {
      catchError(error);
    }
  };

  return {
    ...toRefs(state),
    fetchApplyUser,
    fetchAssignUsers,
    fetchRejectUser,
  };
};

export default useUsers;
