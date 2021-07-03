import { reactive, toRefs } from "@vue/composition-api";
import { $fetch } from "@/libs/axios";
import { API_URL, AUTH_URL } from "@/master";
import { fetchError, catchError } from "@/libs/errorHandler";
import { ManageJob, FavoriteJob, Job } from "@/types/index";
import { FetchManageJobs, FetchJobs, FetchFavoriteJob } from "@/types/fetch";
import Vuex from "@/store/index";
import { useUtils } from "@/hooks";

type State = {
  userId: number;
  jobs: Job[];
  job: Job | {};
  manageJobs: ManageJob[];
  profileJobs: ManageJob[];
  favoriteJobs: FavoriteJob[];
  loading: boolean;
  isApply: boolean;
};

const initialState = (): State => ({
  userId: Vuex.getters.userId,
  jobs: [],
  job: {},
  manageJobs: [],
  profileJobs: [],
  favoriteJobs: [],
  loading: true,
  isApply: true,
});

const useJobs = () => {
  const state = reactive<State>(initialState());
  const { auth } = useUtils();

  const fetchJobs = async () => {
    try {
      const res = await $fetch<FetchJobs>(`${API_URL}/jobs`);
      state.jobs = res.data.response;
    } catch (error) {
      catchError(error);
    }
  };
  // *詳細
  const fetchJobDetail = async (jobId: number) => {
    try {
      const res = await $fetch<FetchJobs>(`${API_URL}/job/${jobId}`);
      await fetchError(res.data.status);
      state.job = res.data.response;
      // state.loading = false;
    } catch (error) {
      catchError(error);
    }
  };
  // *管理案件
  const fetchManageJobs = async () => {
    try {
      const res = await $fetch<FetchManageJobs>(
        `${API_URL}/jobs?user_id=${state.userId}`
      );
      state.manageJobs = res.data.response;
    } catch (error) {
      catchError(error);
    }
  };
  // * 指定したユーザーの案件
  const fetchProfileJobs = async (userId: number) => {
    try {
      const res = await $fetch<FetchManageJobs>(
        `${API_URL}/jobs?user_id=${userId}`
      );
      state.profileJobs = res.data.response;
      // state.loading = false;
    } catch (error) {
      catchError(error);
    }
  };
  // * お気に入り案件
  const fetchFavoriteJobs = async () => {
    try {
      const res = await $fetch<FetchFavoriteJob>(
        `${AUTH_URL}/favorite_jobs?user_id=${state.userId}`,
        {
          headers: auth.value,
        }
      );
      state.favoriteJobs = res.data.response;
    } catch (error) {
      catchError(error);
    }
  };
  // * 応募済みか判別
  const checkApplyStatus = async (jobId: number) => {
    try {
      const res = await $fetch<FetchManageJobs>(
        `${AUTH_URL}/apply_jobs?user_id=${state.userId}`,
        {
          headers: auth.value,
        }
      );
      const result: boolean = res.data.response
        .map((v) => v.job.id)
        .includes(jobId);
      state.isApply = !result;
      state.loading = false;
    } catch (error) {
      catchError(error);
    }
  };

  return {
    ...toRefs(state),
    fetchJobs,
    fetchManageJobs,
    fetchFavoriteJobs,
    fetchJobDetail,
    fetchProfileJobs,
    checkApplyStatus,
  };
};

export default useJobs;
