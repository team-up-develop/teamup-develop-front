import { ActionTree, GetterTree, MutationTree } from "vuex";
import { $fetch } from "@/libs/axios";
import { ManageJob } from "@/types/index";
import { FetchManageJobs, FetchFavoriteJob } from "@/types/fetch";
import { API_URL, AUTH_URL, m } from "@/master";
import { catchError } from "@/libs/errorHandler";
import Vuex from "@/store/index";
interface State {
  jobsManageNum: number;
  jobsFavoriteJobsNum: number;
  jobsApplyNum: number;
}

interface GetStatus {
  jobsManageNum: number;
  jobsFavoriteJobsNum: number;
  jobsApplyNum: number;
}

interface ActionsUser {
  userId: { userId: number };
}

const state: State = {
  jobsManageNum: 0,
  jobsFavoriteJobsNum: 0,
  jobsApplyNum: 0,
};

const getters: GetterTree<State, GetStatus> = {
  getJobsManageNum: (state: State) => state.jobsManageNum,
  getJobsFavoriteNum: (state: State) => state.jobsFavoriteJobsNum,
  getJobsApplyNum: (state: State) => state.jobsApplyNum,
  fetchStateJobs: (state: State) => state,
};

const mutations: MutationTree<State> = {
  getJobsManageNum(state: State, manageNum: number) {
    state.jobsManageNum = manageNum;
  },
  getJobsFavoriteNum(state: State, favoriteNum: number) {
    state.jobsFavoriteJobsNum = favoriteNum;
  },
  getJobsApplyNum(state: State, applyNum: number) {
    state.jobsApplyNum = applyNum;
  },
};

const actions: ActionTree<State, GetStatus> = {
  async getJobNum({ commit }, userObject: ActionsUser) {
    try {
      if (!userObject) {
        return;
      }
      const responseManage = await $fetch<FetchManageJobs>(
        `${API_URL}/jobs?user_id=${userObject.userId}`
      );
      commit("getJobsManageNum", responseManage.data.response.length);

      const responseFavorite = await $fetch<FetchFavoriteJob>(
        `${AUTH_URL}/favorite_jobs?user_id=${userObject.userId}`,
        {
          headers: {
            Authorization: `Bearer ${Vuex.getters.token}`,
          },
        }
      );
      commit("getJobsFavoriteNum", responseFavorite.data.response.length);

      const responseApply = await $fetch<FetchManageJobs>(
        `${AUTH_URL}/apply_jobs?user_id=${userObject.userId}`,
        {
          headers: {
            Authorization: `Bearer ${Vuex.getters.token}`,
          },
        }
      );
      const applyArray: ManageJob[] = responseApply.data.response.filter(
        (v) =>
          v.apply_status_id === m.APPLY_STATUS_APPLY ||
          v.apply_status_id === m.APPLY_STATUS_PARTICIPATE
      );
      commit("getJobsApplyNum", applyArray.length);
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
