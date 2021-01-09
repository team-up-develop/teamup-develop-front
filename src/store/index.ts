import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth' 
import search from './modules/search'
import statusJobs from './modules/statusJobs'
import statusUser from './modules/statusUser'

import createPersistedState from "vuex-persistedstate" //? State の値を localStorageに保存するためのプラグイン

Vue.use(Vuex)

export default new Vuex.Store<any>({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    search,
    statusJobs,
    statusUser
  },
  plugins: [createPersistedState({storage: window.localStorage})] //? State の値を localStorageに保存するためのプラグイン
})
