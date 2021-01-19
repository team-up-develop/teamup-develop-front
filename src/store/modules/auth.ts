import { 
  ActionTree, 
  GetterTree,
  MutationTree,
} from 'vuex';
import axios from 'axios';
import { API_URL } from '@/master'
import router from '@/router/index.ts';

interface State {
  userId: number | null;
  userName: string;
  errorFlag: boolean;
}

interface LoginData {
  login_name: string;
  login_password: string;
}

const state: State = {
  userId: 1,
  userName: "Test",
  errorFlag: false
}

const getters: GetterTree<State, LoginData> = {
  userId: (state: State)  => state.userId,
  userName: (state: State) => state.userName
}

const mutations: MutationTree<State> = {
  loginUserId(state: State, userId: number) {
    state.userId = userId
  },
  loginUserName(state: State, userName: string) {
    state.userName  = userName
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
    console.log(params)
    try {
      const response = await axios.post(`${ API_URL }/login`, params)
      router.push('/jobs');
      commit('loginUserId', response.data.userId)
      commit('loginUserName', response.data.user.userName)
    } catch (error) {
      const errorFlag = true
      console.log("ログイン失敗しました")
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