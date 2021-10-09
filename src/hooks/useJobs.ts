import { reactive, toRefs } from "@vue/composition-api";
import { $fetch } from "@/libs/axios";
import { API_URL, AUTH_URL } from "@/master";
import { fetchError, catchError } from "@/libs/errorHandler";
import { Fetch, ManageJob, FavoriteJob, Job } from "@/types/index";
import Vuex from "@/store/index";
import { useUtils } from "@/hooks";

type State = {
  userId: number;
  jobs: Job[];
  job: Job | null;
  manageJobs: ManageJob[];
  profileJobs: ManageJob[];
  favoriteJobs: FavoriteJob[];
  loading: boolean;
  isApply: boolean;
};

const initialState = (): State => ({
  userId: Vuex.getters.userId,
  jobs: [],
  job: null,
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
      const res = await $fetch<Fetch<Job[]>>(`${API_URL}/jobs`);
      state.jobs = res.data.response;
    } catch (error) {
      catchError(error);
    }
  };
  // *詳細
  const fetchJobDetail = async (jobId: number) => {
    try {
      const res = await $fetch<Fetch<Job>>(`${API_URL}/job/${jobId}`);
      await fetchError(res.data.status);
      state.job = res.data.response;
      // state.loading = false;
    } catch (error) {
      catchError(error);
    }
  };
  // *管理案件
  const fetchManageJobs = async () => {
    state.loading = true;
    try {
      const res = await $fetch<Fetch<ManageJob[]>>(
        `${API_URL}/jobs?user_id=${state.userId}`
      );
      state.manageJobs = res.data.response;
      state.loading = false;
    } catch (error) {
      catchError(error);
    }
  };
  // * 指定したユーザーの案件
  const fetchProfileJobs = async (userId: number) => {
    try {
      const res = await $fetch<Fetch<ManageJob[]>>(
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
      state.loading = true;
      const res = await $fetch<Fetch<FavoriteJob[]>>(
        `${AUTH_URL}/favorite_jobs?user_id=${state.userId}`,
        {
          headers: auth.value,
        }
      );
      state.favoriteJobs = res.data.response;
      state.loading = false;
    } catch (error) {
      catchError(error);
    }
  };
  // * 応募済みか判別
  const checkApplyStatus = async (jobId: number) => {
    try {
      const res = await $fetch<Fetch<ManageJob[]>>(
        `${AUTH_URL}/apply_jobs?user_id=${state.userId}`,
        {
          headers: auth.value,
        }
      );
      const result: boolean = res.data.response
        .map((v: ManageJob) => v.job.id)
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
