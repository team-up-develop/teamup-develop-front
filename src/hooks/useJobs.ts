import {
  reactive,
  toRefs,
  onMounted,
  // onUnmounted,
} from "@vue/composition-api";
import { $fetch } from "@/libs/axios";
import { API_URL } from "@/master";
import { fetchError, catchError } from "@/libs/errorHandler";
import { ManageJob, FavoriteJob, Job } from "@/types/index";
import { FetchManageJobs, FetchJobs, FetchFavoriteJob } from "@/types/fetch";
import Vuex from "@/store/index";

type State = {
  userId: number;
  jobs: Job[];
  job: Job | {};
  manageJobs: ManageJob[];
  profileJobs: ManageJob[];
  favoriteJobs: FavoriteJob[];
  loading: boolean;
};

const initialState = (): State => ({
  userId: Vuex.getters.userId,
  jobs: [],
  job: {},
  manageJobs: [],
  profileJobs: [],
  favoriteJobs: [],
  loading: true,
});

const useJobs = () => {
  const state = reactive<State>(initialState());

  const fetchJobs = async () => {
    try {
      const res = await $fetch<FetchJobs>(`${API_URL}/jobs`);
      state.jobs = res.data.response;
    } catch (error) {
      catchError(error);
    }
  };

  const fetchJobDetail = async (jobId: number) => {
    try {
      const res = await $fetch<FetchJobs>(`${API_URL}/job/${jobId}`);
      await fetchError(res.data.status);
      state.job = res.data.response;
      state.loading = false;
    } catch (error) {
      catchError(error);
    }
  };

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

  const fetchProfileJobs = async (userId: number) => {
    try {
      const res = await $fetch<FetchManageJobs>(
        `${API_URL}/jobs?user_id=${userId}`
      );
      state.profileJobs = res.data.response;
      state.loading = false;
    } catch (error) {
      catchError(error);
    }
  };

  const fetchFavoriteJobs = async () => {
    try {
      const res = await $fetch<FetchFavoriteJob>(
        `${API_URL}/favorite_jobs?user_id=${state.userId}`
      );
      state.favoriteJobs = res.data.response;
    } catch (error) {
      catchError(error);
    }
  };

  onMounted(async () => {
    await fetchJobs();
    await fetchManageJobs();
    await fetchFavoriteJobs();
  });

  return {
    ...toRefs(state),
    fetchJobs,
    fetchManageJobs,
    fetchFavoriteJobs,
    fetchJobDetail,
    fetchProfileJobs,
  };
};

export default useJobs;
