import { 
  ActionTree, 
  GetterTree,
  MutationTree,
} from 'vuex';
import axios from 'axios';
import { 
  API_URL,
  catchError
} from '@/master'
import router from '@/router/index.ts';

interface State {
  userId: number | null;
  loginName: string;
  errorFlag: boolean;
}

interface LoginData {
  login_name: string;
  login_password: string;
}

const state: State = {
  userId: null,
  loginName: "",
  errorFlag: false
}

const getters: GetterTree<State, LoginData> = {
  userId: (state: State)  => state.userId,
  loginName: (state: State) => state.loginName
}

const mutations: MutationTree<State> = {
  loginUserId(state: State, userId: number) {
    state.userId = userId
  },
  loginUserName(state: State, loginName: string) {
    state.loginName  = loginName
  },
  loginError(state: State, errorFlag: boolean) {
    state.errorFlag = errorFlag;
  }
}

const actions: ActionTree<State, LoginData> = {
  // * ログイン
  async login({ commit }, authData: LoginData ) {
    const params: LoginData = {
      login_name: authData.login_name,
      login_password: authData.login_password,
    }
    try {
      const res = await axios.post(`${ API_URL }/login`, params)
      router.push('/jobs');
      commit('loginUserId', res.data.response.id)
      commit('loginUserName', res.data.response.login_name)
    } catch (error) {
      const errorFlag = true
      catchError(error)
      commit('loginError', errorFlag)
    }
  },
  // * ログアウト
  logout({ commit }) {
    commit('loginUserId', null);
    localStorage.clear();
    router.replace('/login')
  }
}

export default {
	state,
	getters,
	mutations,
	actions
}