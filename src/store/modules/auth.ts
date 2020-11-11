import axios from 'axios'
import { GetterTree } from 'vuex';
import { ActionTree } from 'vuex';
import { MutationTree } from 'vuex';
import router from '@/router/index.ts' // Vue router instance

interface State {
  idToken: string | null;
  userId: number | null;
  errorFlag: boolean;
}

interface LoginData {
  LoginName: string;
  LoginPassword: string;
}

const state: State = {
  idToken: null,
  userId: null,
  errorFlag: false
}

const getters: GetterTree<State, LoginData> = {
  userId: (state: State)  => state.userId,
  // errorFlag: (state: State) => state.errorFlag
}

const mutations: MutationTree<State> = {
  // * idToken を使用する
  updateIdToken(state: State, idToken: string | null) {
    state.idToken = idToken;
  },
  // * localStorageにuserIdを保存し、判定する
  loginUserId(state: State, userId: number | null) {
    state.userId = userId
    // localStorage.userId = state.userId //? ローカルストレージ
  },
  loginError(state: State, errorFlag: boolean) {
    state.errorFlag = errorFlag;
  }
}

// ! commit は 暗黙的な anyになってます Binding element 'commit' implicitly has an 'any' type.
const actions: ActionTree<State, LoginData> = {
  // * ログイン
  login({ commit }, authData: LoginData ) {
    console.log(authData)
    const params = {
      LoginName: authData.LoginName,
      LoginPassword: authData.LoginPassword,
    }
    axios.post('http://localhost:8888/api/v1/login', params)
    .then(response => {
      router.push('/jobs');
      commit('updateIdToken', response.data.idToken)
      commit('loginUserId', response.data.userId)
    })
    .catch(error => {
      console.log(error)
      const errorFlag = true
      console.log("Errorが起きました!!!!!")
      commit('loginError', errorFlag)
    })
    ;
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