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

export const truncate = (value: string, num: number) => {
  const over = "...";
  if (value.length <= num) {
    return value;
  }
  return value.substring(0, num) + over;
};

export default useUtils;
