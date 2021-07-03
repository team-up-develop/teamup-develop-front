import { ActionTree, GetterTree, MutationTree } from "vuex";
import { $post } from "@/libs/axios";
import { API_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import router from "@/router";
import { encode, decode } from "@/libs/jsBase64";
import { RegisterCompleteParams } from "@/types/params";

interface State {
  userId: string;
  userName: string;
  token: string;
  errorFlag: boolean;
}
interface LoginParams {
  email: string;
  login_password: string;
}
interface LoginResponse {
  msg: string;
  response: {
    id: number;
    token: string;
    user_name: string;
  };
  status: string;
}

const state: State = {
  userId: "",
  userName: "",
  token: "",
  errorFlag: false,
};

const getters: GetterTree<State, LoginParams> = {
  userId: (state: State) => decode(state.userId),
  userName: (state: State) => state.userName,
  token: (state: State) => state.token,
  errorFlag: (state: State) => state.errorFlag,
};

const mutations: MutationTree<State> = {
  loginError(state: State, errorFlag: boolean) {
    state.errorFlag = errorFlag;
  },
  loginResponse(state: State, response: LoginResponse["response"]) {
    state.userId = encode(String(response.id));
    state.userName = response.user_name;
    state.token = response.token;
  },
};

const actions: ActionTree<State, LoginParams> = {
  async login({ commit }, authData: LoginParams) {
    const params: LoginParams = {
      email: authData.email,
      login_password: authData.login_password,
    };
    try {
      const res = await $post<LoginResponse>(`${API_URL}/login`, params);
      commit("loginResponse", res.data.response);
      commit("loginError", false);
      await router.push("/jobs");
    } catch (error) {
      catchError(error);
      commit("loginError", true);
    }
  },
  async register({ commit }, registerParams: RegisterCompleteParams) {
    try {
      const res = await $post<LoginResponse>(
        `${API_URL}/sign_up`,
        registerParams
      );
      commit("loginResponse", res.data.response);
      commit("loginError", false);
      await sessionStorage.clear();
    } catch (error) {
      catchError(error);
      commit("loginError", true);
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
