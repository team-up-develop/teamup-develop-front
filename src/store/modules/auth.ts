import { ActionTree, GetterTree, MutationTree } from "vuex";
import axios from "axios";
import { API_URL, catchError } from "@/master";
import router from "@/router/index.ts";

interface State {
  userId: number | null;
  userName: string;
  errorFlag: boolean;
}

interface LoginData {
  email: string;
  login_password: string;
}

const state: State = {
  userId: null,
  userName: "",
  errorFlag: false,
};

const getters: GetterTree<State, LoginData> = {
  userId: (state: State) => state.userId,
  userName: (state: State) => state.userName,
};

const mutations: MutationTree<State> = {
  loginUserId(state: State, userId: number) {
    state.userId = userId;
  },
  loginUserName(state: State, userName: string) {
    state.userName = userName;
  },
  loginError(state: State, errorFlag: boolean) {
    state.errorFlag = errorFlag;
  },
};

const actions: ActionTree<State, LoginData> = {
  // * ログイン
  async login({ commit }, authData: LoginData) {
    const params: LoginData = {
      email: authData.email,
      login_password: authData.login_password,
    };
    try {
      const res = await axios.post(`${API_URL}/login`, params);
      console.log(res);
      commit("loginUserId", res.data.response.id);
      commit("loginUserName", res.data.response.user_name);
      router.push("/jobs");
    } catch (error) {
      const errorFlag = true;
      catchError(error);
      commit("loginError", errorFlag);
    }
  },
  // * ログアウト
  logout({ commit }) {
    commit("loginUserId", null);
    localStorage.clear();
    router.replace("/login");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
