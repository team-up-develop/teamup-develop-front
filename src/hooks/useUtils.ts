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
  userId: Vuex.getters.userId,
  token: Vuex.getters.token,
});

const useUtils = () => {
  const state = reactive<State>(initialState());

  const isLogin = computed(() => {
    return state.userId ? true : false;
  });

  const auth = computed(() => {
    return { Authorization: `Bearer ${state.token}` };
  });

  const headerAuth = computed(() => {
    return { headers: { Authorization: `Bearer ${state.token}` } };
  });

  return {
    ...toRefs(state),
    isLogin,
    auth,
    headerAuth,
  };
};

export const truncate = (value: string, num: number) => {
  const over = "...";
  if (value.length <= num) {
    return value;
  }
  return value.substring(0, num) + over;
};

export default useUtils;
