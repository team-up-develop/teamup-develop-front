import { reactive, toRefs } from "@vue/composition-api";
import Vuex from "@/store/index";
import { $fetch } from "@/libs/axios";
import { catchError } from "@/libs/errorHandler";
import { API_URL, AUTH_URL, m } from "@/master";
import { useUtils } from "@/hooks";
import { FavoriteJob, ManageJob, User, Fetch } from "@/types/index";

type Maybe<T> = T | {};

type State = {
  userId: number;
  accountMe: Maybe<User>;
};

const initialState = (): State => ({
  userId: Vuex.getters.userId,
  accountMe: {},
});

const useAccountMe = () => {
  const state = reactive<State>(initialState());
  const { auth } = useUtils();

  // * ログインユーザー
  const fetchAccountMe = async () => {
    try {
      const res = await $fetch<Fetch<User>>(
        `
        ${API_URL}/user/${state.userId}`,
        {
          headers: auth.value,
        }
      );
      return res.data.response;
    } catch (error) {
      catchError(error);
    }
  };

  // *管理案件数
  const fetchManageJobsNum = async () => {
    const res = await $fetch<Fetch<ManageJob[]>>(
      `${API_URL}/jobs?user_id=${state.userId}`
    );
    return res.data.response.length;
  };

  // *応募案件数
  const fetchApplyJobsNum = async () => {
    const res = await $fetch<Fetch<ManageJob[]>>(
      `${AUTH_URL}/apply_jobs?user_id=${state.userId}`,
      {
        headers: {
          Authorization: `Bearer ${Vuex.getters.token}`,
        },
      }
    );
    const applyArray: ManageJob[] = res.data.response.filter(
      (v) =>
        v.apply_status_id === m.APPLY_STATUS_APPLY ||
        v.apply_status_id === m.APPLY_STATUS_PARTICIPATE
    );
    return applyArray.length;
  };

  // *保存案件数
  const fetchFavoriteJobsNum = async () => {
    const res = await $fetch<Fetch<FavoriteJob[]>>(
      `${AUTH_URL}/favorite_jobs?user_id=${state.userId}`,
      {
        headers: {
          Authorization: `Bearer ${Vuex.getters.token}`,
        },
      }
    );
    return res.data.response.length;
  };

  return {
    ...toRefs(state),
    fetchAccountMe,
    fetchManageJobsNum,
    fetchApplyJobsNum,
    fetchFavoriteJobsNum,
  };
};

export default useAccountMe;
