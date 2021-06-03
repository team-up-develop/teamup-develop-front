import { ActionTree, GetterTree, MutationTree } from "vuex";
import { $post } from "@/libs/axios";
import { API_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import router from "@/router";
import { encode, decode } from "@/libs/jsBase64";
interface State {
  userId: string;
  userName: string;
  token: string;
  errorFlag: boolean;
}

interface LoginData {
  email: string;
  login_password: string;
}

const state: State = {
  userId: "",
  userName: "",
  token: "",
  errorFlag: false,
};

const getters: GetterTree<State, LoginData> = {
  userId: (state: State) => decode(state.userId),
  userName: (state: State) => state.userName,
  token: (state: State) => state.token,
};

const mutations: MutationTree<State> = {
  loginUserId(state: State, userId: number) {
    state.userId = encode(String(userId));
  },
  loginUserName(state: State, userName: string) {
    state.userName = userName;
  },
  loginToken(state: State, token: string) {
    state.token = token;
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
      // TODO: type fix any
      const res = await $post<any>(`${API_URL}/login`, params);
      console.log(res);
      commit("loginUserId", res.data.response.id);
      commit("loginUserName", res.data.response.user_name);
      commit("loginToken", res.data.response.token);
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
