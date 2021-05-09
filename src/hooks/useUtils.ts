import {
  reactive,
  toRefs,
  computed,
  // onMounted,
} from "@vue/composition-api";
import Vuex from "@/store/index";

type State = {
  userId: number;
};

const initialState = (): State => ({
  userId: Vuex.state.auth.userId,
});

const useUtils = () => {
  const state = reactive<State>(initialState());

  const isLogin = computed(() => {
    return state.userId ? true : false;
  });

  return {
    ...toRefs(state),
    isLogin,
  };
};

export default useUtils;
