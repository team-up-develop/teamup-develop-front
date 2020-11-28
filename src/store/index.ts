import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth' 
import search from './modules/search'
import createPersistedState from "vuex-persistedstate" //? State の値を localStorageに保存するためのプラグイン

Vue.use(Vuex)

// TODO: Any
export default new Vuex.Store<any>({
  // * 状態保存
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    search
  },
  plugins: [createPersistedState({storage: window.localStorage})] //? State の値を localStorageに保存するためのプラグイン
})
