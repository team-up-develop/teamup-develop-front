import { 
  ActionTree, 
  GetterTree,
  MutationTree,
} from 'vuex';
import axios from 'axios'
import { ManageJob } from '@/types/manage'
import { API_URL, m } from '@/master'

interface State {
  userApplyNum: number;
  userParticipateNum: number;
  userRejectNum: number;
}

interface GetStatus {
  userApplyNum: number;
  userParticipateNum: number;
  userRejectNum: number;
}

interface ActionsJob {
  jobId: { jobId: number }
}

const state: State = {
  userApplyNum: 0,
  userParticipateNum: 0,
  userRejectNum: 0,
}

const getters: GetterTree<State, GetStatus> = {
  getUserApplyNum: (state: State) => state.userApplyNum,
  getUserParticipateNum: (state: State) => state.userParticipateNum,
  getUserRejectNum: (state: State) => state.userRejectNum,
}

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
}

const actions: ActionTree<State, GetStatus> = {
  async getUserNum({ commit }, jobObject: ActionsJob) {
    try { 
      const responseApply = await axios.get<ManageJob[]>(`${API_URL}/apply_job/?job_id=${ jobObject.jobId }&apply_status_id=${ m.APPLY_STATUS_APPLY }`)
      commit('getUserApplyNum', responseApply.data.length)
      const responseParticipate = await axios.get<ManageJob[]>(`${API_URL}/apply_job/?job_id=${ jobObject.jobId }&apply_status_id=${ m.APPLY_STATUS_PARTICIPATE }`)
      commit('getUserParticipateNum', responseParticipate.data.length)
      const responseReject = await axios.get<ManageJob[]>(`${API_URL}/apply_job/?job_id=${ jobObject.jobId }&apply_status_id=${ m.APPLY_STATUS_REJECT }`)
      commit('getUserRejectNum', responseReject.data.length)
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
	state,
	getters,
	mutations,
	actions
}