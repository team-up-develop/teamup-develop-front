import {
  reactive,
  // SetupContext,
  toRefs,
  onMounted,
  // onUnmounted,
} from "@vue/composition-api";
import { API_URL, catchError } from "@/master";
import axios from "axios";
import { ManageJob, Job } from "@/types/index";
import { FetchManageJobs, FetchJobs } from "@/types/fetch";
import Vuex from "@/store/index";

type State = {
  userId: number;
  manageJobs: ManageJob[];
  favoriteJobs: Job[];
};

const initialState = (): any => ({
  userId: Vuex.state.auth.userId,
  manageJobs: [],
  favoriteJobs: [],
});

const useJobs = () => {
  const state = reactive<State>(initialState());

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

  onMounted(() => {
    fetchManageJobs();
    fetchFavoriteJobs();
  });

  return {
    ...toRefs(state),
    fetchManageJobs,
    fetchFavoriteJobs,
  };
};

export default useJobs;
