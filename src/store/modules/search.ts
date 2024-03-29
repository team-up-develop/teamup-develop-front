import { ActionTree, GetterTree, MutationTree } from "vuex";
import { Language, Framework, Skill } from "@/types/index";

interface State {
  freeWord: string;
  language: Language[];
  framwork: Framework[];
  skill: Skill[];
}

export type SearchData = {
  freeWord: string;
  language: Language[];
  framwork: Framework[];
  skill: Skill[];
};

const state: State = {
  freeWord: "",
  language: [],
  framwork: [],
  skill: [],
};

const getters: GetterTree<State, SearchData> = {
  freeWord: (state: State) => state.freeWord,
  language: (state: State) => state.language,
  framwork: (state: State) => state.framwork,
  skill: (state: State) => state.skill,
};

const mutations: MutationTree<State> = {
  // * フリーワード 格納
  freeWord(state: State, freeWord: string) {
    state.freeWord = freeWord;
  },
  // * 言語 格納
  language(state: State, language: Language[]) {
    state.language = language;
  },
  // * 言語 格納
  framwork(state: State, framwork: Framework[]) {
    state.framwork = framwork;
  },
  // * その他スキル 格納
  skill(state: State, skill: Skill[]) {
    state.skill = skill;
  },
};

const actions: ActionTree<State, SearchData> = {
  // * フリーワード 検索
  freeWordSearch({ commit }, freeWord: SearchData) {
    commit("freeWord", freeWord.freeWord);
  },
  // * 言語 検索
  languageSearch({ commit }, language: SearchData) {
    commit("language", language.language);
  },
  // * フレームワーク 検索
  framworkSearch({ commit }, framwork: SearchData) {
    commit("framwork", framwork.framwork);
  },
  // * その他スキル 検索
  skillSearch({ commit }, skill: SearchData) {
    commit("skill", skill.skill);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
