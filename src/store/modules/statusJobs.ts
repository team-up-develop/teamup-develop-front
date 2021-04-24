import { ActionTree, GetterTree, MutationTree } from "vuex";
import { ManageJob } from "@/types/index";
import { FetchManageJobs, FetchFavoriteJob } from "@/types/fetch";
import { $fetch, API_URL, m, catchError } from "@/master";

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
        `${API_URL}/favorite_jobs?user_id=${userObject.userId}`
      );
      commit("getJobsFavoriteNum", responseFavorite.data.response.length);

      const responseApply = await $fetch<FetchManageJobs>(
        `${API_URL}/apply_jobs?user_id=${userObject.userId}`
      );
      const applyArray: ManageJob[] = [];
      for (const job of responseApply.data.response) {
        if (
          job.apply_status_id === m.APPLY_STATUS_APPLY ||
          job.apply_status_id === m.APPLY_STATUS_PARTICIPATE
        ) {
          applyArray.push(job);
        }
      }
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
