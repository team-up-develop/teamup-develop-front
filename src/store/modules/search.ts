interface State {
  freeWord: string;
  language: [] | null;
  framwork: [] | null;
  skill: [] | null;
}

const state: State = {
  freeWord: "",
  language: null,
  framwork: null,
  skill: null
}

const getters = {
  freeWord: (state: State) => state.freeWord,
  language: (state: State) => state.language,
  framwork: (state: State) => state.framwork,
  skill: (state: State) => state.skill,
}

const mutations = {
  // * フリーワード 格納
  freeWord(state: State, freeWord: string) {
    state.freeWord = freeWord
  },
  // * 言語 格納
  language(state: State, language: [] | null) {
    state.language = language
  },
  // * 言語 格納
  framwork(state: State, framwork: [] | null) {
    state.framwork = framwork
  },
  // * その他スキル 格納
  skill(state: State, skill: [] | null) {
    state.skill = skill
  }
}

const actions = {
  // * フリーワード 検索
  freeWordSearch({ commit }, freeWord: State) {
    // router.push('/jobs');
    commit('freeWord', freeWord.freeWord)
  },
  // * 言語 検索
  languageSearch({ commit }, language: State) {
    // router.push('/jobs');
    commit('language', language.language)
  },
  // * フレームワーク 検索
  framworkSearch({ commit }, framwork: State) {
    // router.push('/jobs');
    console.log("↓ search.js フレームワークの中身")
    console.log(framwork)
    commit('framwork', framwork.framwork)
  },
  // * その他スキル 検索
  skillSearch({ commit }, skill: State) {
    // router.push('/jobs');
    commit('skill', skill.skill)
  }
}

export default {
	state,
	getters,
	mutations,
	actions
}