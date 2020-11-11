import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth' 
import search from './modules/search'
import createPersistedState from "vuex-persistedstate" //? State の値を localStorageに保存するためのプラグイン

Vue.use(Vuex)

export default new Vuex.Store({
  // * 状態保存
  state: {}, //! Todo 

  getters: {},

  mutations: {},
  // * 非同期処理
  actions: {},

  modules: {
    auth,
    search // ! Todo
  },
  plugins: [createPersistedState({storage: window.localStorage})] //? State の値を localStorageに保存するためのプラグイン
})
