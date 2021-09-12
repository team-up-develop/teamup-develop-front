import { ActionTree, GetterTree, MutationTree } from "vuex";
import { ManageJob } from "@/types/index";
import { catchError } from "@/libs/errorHandler";
import { useAccountMe } from "@/hooks";
interface State {
  userImage: ManageJob["user"]["user_image"];
  jobsManageNum: number;
  jobsFavoriteJobsNum: number;
  jobsApplyNum: number;
}

interface GetStatus {
  userImage: ManageJob["user"]["user_image"];
  jobsManageNum: number;
  jobsFavoriteJobsNum: number;
  jobsApplyNum: number;
}

interface ActionsUser {
  userId: { userId: number };
}

const state: State = {
  userImage: null,
  jobsManageNum: 0,
  jobsFavoriteJobsNum: 0,
  jobsApplyNum: 0,
};

const getters: GetterTree<State, GetStatus> = {
  getUserImage: (state: State) => state.userImage,
  getJobsManageNum: (state: State) => state.jobsManageNum,
  getJobsFavoriteNum: (state: State) => state.jobsFavoriteJobsNum,
  getJobsApplyNum: (state: State) => state.jobsApplyNum,
  fetchStateJobs: (state: State) => state,
};

const mutations: MutationTree<State> = {
  getUserImage(state: State, userImage: ManageJob["user"]["user_image"]) {
    state.userImage = userImage;
  },
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
      const {
        fetchAccountMe,
        fetchManageJobsNum,
        fetchApplyJobsNum,
        fetchFavoriteJobsNum,
      } = useAccountMe();

      const getAccountMe = async () => {
        const result = await fetchAccountMe();
        commit("getUserImage", result?.user_image);
      };
      const getManageJob = async () => {
        const result = await fetchManageJobsNum();
        commit("getJobsManageNum", result);
      };
      const getApplyJobs = async () => {
        const result = await fetchApplyJobsNum();
        commit("getJobsApplyNum", result);
      };
      const getFavoriteJobs = async () => {
        const result = await fetchFavoriteJobsNum();
        commit("getJobsFavoriteNum", result);
      };

      await Promise.all([
        getAccountMe(),
        getManageJob(),
        getApplyJobs(),
        getFavoriteJobs(),
      ]);
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
