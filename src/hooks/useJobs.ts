import {
  reactive,
  // SetupContext,
  toRefs,
  onMounted,
  // onUnmounted,
} from "@vue/composition-api";
import { API_URL, catchError } from "@/master";
import axios from "axios";
import { ManageJob, Job, ApplyJob } from "@/types/index";
import {
  FetchManageJobs,
  FetchJobs,
  FetchApplyJob,
  FetchFavoriteJob,
} from "@/types/fetch";
import Vuex from "@/store/index";

type State = {
  userId: number;
  jobs: Job[];
  job: ApplyJob | Job | {};
  manageJobs: ManageJob[];
  favoriteJobs: Job[];
  loading: boolean;
};

const initialState = (): State => ({
  userId: Vuex.state.auth.userId,
  jobs: [],
  job: {},
  manageJobs: [],
  favoriteJobs: [],
  loading: true,
});

const useJobs = () => {
  const state = reactive<State>(initialState());

  const fetchJobs = async () => {
    try {
      const res = await axios.get<FetchJobs>(`${API_URL}/jobs`);
      state.jobs = res.data.response;
    } catch (error) {
      catchError(error);
    }
  };

  const fetchJobDetail = async (jobId: number) => {
    try {
      const res = await axios.get<FetchJobs | FetchApplyJob | FetchFavoriteJob>(
        `${API_URL}/job/${jobId}`
      );
      state.job = res.data.response;
      setTimeout(() => {
        state.loading = false;
      }, 1000);
    } catch (error) {
      catchError(error);
    }
  };

  const fetchManageJobs = async () => {
    try {
      const res = await axios.get<FetchManageJobs>(
        `${API_URL}/jobs?user_id=${state.userId}`
      );
      state.manageJobs = res.data.response;
    } catch (error) {
      catchError(error);
    }
  };

  const fetchFavoriteJobs = async () => {
    try {
      const res = await axios.get<FetchJobs>(
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
  };
};

export default useJobs;
