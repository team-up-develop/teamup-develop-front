import { 
  ActionTree, 
  GetterTree,
  MutationTree,
} from 'vuex';
import axios from 'axios'
import { ManageJob } from '@/types/manage'
import { API_URL, m } from '@/master'
import { Job } from '@/types/job';

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
  userId: { userId: number }
}

const state: State = {
  jobsManageNum: 0,
  jobsFavoriteJobsNum: 0,
  jobsApplyNum: 0,
}

const getters: GetterTree<State, GetStatus> = {
  getJobsManageNum: (state: State) => state.jobsManageNum,
  getJobsFavoriteNum: (state: State) => state.jobsFavoriteJobsNum,
  getJobsApplyNum: (state: State) => state.jobsApplyNum,
}

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
}

const actions: ActionTree<State, GetStatus> = {
  async getJobNum({ commit }, userObject: ActionsUser) {
    try {
      if(!userObject) {
        return 
      }
      const responseManage = await axios.get<ManageJob[]>(`${API_URL}/job/?user_id=${userObject.userId}`)
      commit('getJobsManageNum', responseManage.data.length)
      const responseFavorite = await axios.get<Job[]>(`${API_URL}/favorite_job/?user_id=${userObject.userId}`)
      commit('getJobsFavoriteNum', responseFavorite.data.length)
      const responseApply = await axios.get<ManageJob[]>(`${API_URL}/apply_job/?user_id=${userObject.userId}`)
      const applyNumber: any = [];
      for(let i = 0; i < responseApply.data.length; i++) {
        const applyJobCorrect: ManageJob = responseApply.data[i];
        if(
          applyJobCorrect.applyStatusId === m.APPLY_STATUS_APPLY || 
          applyJobCorrect.applyStatusId === m.APPLY_STATUS_PARTICIPATE
        ) {
          applyNumber.push(applyJobCorrect);
        }
      }
      commit('getJobsApplyNum', applyNumber.length)
    } catch (error) {
      console.log(error)
    }
  },
}

export default {
	state,
	getters,
	mutations,
	actions
}