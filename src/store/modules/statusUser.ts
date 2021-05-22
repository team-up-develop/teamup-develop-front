import { ActionTree, GetterTree, MutationTree } from "vuex";
// import { ManageJob } from '@/types/index'
import {
  FetchApplyJob,
  FetchParticipateJob,
  FetchRejectJob,
  FetchJob,
} from "@/types/fetch";
import { $fetch } from "@/libs/axios";
import { API_URL, m } from "@/master";
import { catchError } from "@/libs/errorHandler";

interface State {
  userApplyNum: number;
  userParticipateNum: number;
  userRejectNum: number;
  jobTitle: string;
}

interface GetStatus {
  userApplyNum: number;
  userParticipateNum: number;
  userRejectNum: number;
  jobTitle: string;
}

interface ActionsJob {
  jobId: { jobId: number };
}

const state: State = {
  userApplyNum: 0,
  userParticipateNum: 0,
  userRejectNum: 0,
  jobTitle: "",
};

const getters: GetterTree<State, GetStatus> = {
  getUserApplyNum: (state: State) => state.userApplyNum,
  getUserParticipateNum: (state: State) => state.userParticipateNum,
  getUserRejectNum: (state: State) => state.userRejectNum,
  getJob: (state: State) => state.jobTitle,
};

const mutations: MutationTree<State> = {
  getUserApplyNum(state: State, userApplyNum: number) {
    state.userApplyNum = userApplyNum;
  },
  getUserParticipateNum(state: State, userParticipateNum: number) {
    state.userParticipateNum = userParticipateNum;
  },
  getUserRejectNum(state: State, userRejectNum: number) {
    state.userRejectNum = userRejectNum;
  },
  getJob(state: State, jobTitle: string) {
    state.jobTitle = jobTitle;
  },
};

const actions: ActionTree<State, GetStatus> = {
  async getUserNum({ commit }, jobObject: ActionsJob) {
    try {
      const responseApply = await $fetch<FetchApplyJob>(
        `${API_URL}/apply_jobs?job_id=${jobObject.jobId}&apply_status_id=${m.APPLY_STATUS_APPLY}`
      );
      commit("getUserApplyNum", responseApply.data.response.length);
      const responseParticipate = await $fetch<FetchParticipateJob>(
        `${API_URL}/apply_jobs?job_id=${jobObject.jobId}&apply_status_id=${m.APPLY_STATUS_PARTICIPATE}`
      );
      commit("getUserParticipateNum", responseParticipate.data.response.length);
      const responseReject = await $fetch<FetchRejectJob>(
        `${API_URL}/apply_jobs?job_id=${jobObject.jobId}&apply_status_id=${m.APPLY_STATUS_REJECT}`
      );
      commit("getUserRejectNum", responseReject.data.response.length);
      const res = await $fetch<FetchJob>(`${API_URL}/job/${jobObject.jobId}`);
      commit("getJob", res.data.response.job_title);
    } catch (error) {
      catchError(error);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
