import {
  reactive,
  toRefs,
  computed,
  // onMounted,
} from "@vue/composition-api";
import Vuex from "@/store/index";

type State = {
  userId: number;
  token: string | undefined;
};

const initialState = (): State => ({
  userId: Vuex.state.auth.userId,
  // userId: 1,
  token: Vuex.state.auth.token,
});

const useUtils = () => {
  const state = reactive<State>(initialState());

  const isLogin = computed(() => {
    return state.userId ? true : false;
  });

  const auth = computed(() => {
    return { Authorization: `Bearer ${state.token}` };
  });

  return {
    ...toRefs(state),
    isLogin,
    auth,
  };
};

export default useUtils;
