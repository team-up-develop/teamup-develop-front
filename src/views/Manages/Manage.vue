<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed
} from '@vue/composition-api';
import { 
  API_URL,
  catchError,
} from '@/master'
import axios from 'axios'
import { ManageJob } from '@/types/index';
import { FetchManageJobs } from '@/types/fetch';
import UserCard from '@/components/Organisms/Manages/UserCard.vue'
import JobsCard from '@/components/Organisms/Manages/JobsCard.vue'
import Vuex from '@/store/index'

type State = {
  manageJobs: ManageJob[];
  userId: number;
}

const initialState = (): State => ({
  manageJobs: [],
  userId: Vuex.state.auth.userId
});

export default defineComponent({ 
  components: {
    UserCard,
    JobsCard
  },
  setup: () => {
    const state = reactive<State>(initialState());

    const isLogin = computed(() => {
      if(state.userId) {
        return true
      } else {
        return false
      }
    });

    const getManageJobs = async () => {
      try { 
        const res = await axios
          .get<FetchManageJobs>(`${API_URL}/jobs?user_id=${state.userId}`) 
        state.manageJobs = res.data.response
      } catch (error) { catchError(error) }
    };

    onMounted(() => {
      getManageJobs();
    })

    return {
      ...toRefs(state),
      isLogin,
      getManageJobs
    }
  },
});
</script>

<template>
  <section>
    <v-container class="wrapper" v-if="isLogin">
      <v-row>
        <UserCard />
        <v-sheet class="manage">
          <v-row class="manage__header">
            <router-link to="/manage" class="router-link-active-click">
              <span>管理案件</span> 
            </router-link>
            <router-link to="/manage/apply_job" class="router-link">
              <span>応募案件</span>
            </router-link>
            <router-link to="/manage/favorite_job" class="router-link">
              <span>保存案件</span> 
            </router-link>
          </v-row>
          <v-col>
            <router-link 
              :to="`/manage/applicant/${ jobs.id }`" 
              v-for="jobs in manageJobs" 
              :key="jobs.id" 
              class="jobs"
            >
              <JobsCard :job="jobs"/>
            </router-link>
          </v-col>
        </v-sheet>
      </v-row>
    </v-container>
    <div v-else>
      ログインが必要です
    </div>
  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.wrapper {
  width: 90%;
  max-width: none;

  @media screen and (max-width: 1100px) {
    width: 97%;
  }
}

.manage {
  @include card-border-color;
  width: 60%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
  font-size: 14px;
  padding: 2rem;
  color: $text-main-color;

  @media screen and (max-width: 1000px) {
    width: 50%;
  }

  @media screen and (max-width: 900px) {
    width: 85%;
  }

  @media screen and (max-width: 600px) {
    width: 95%;
  }

  @media screen and (max-width: 450px) {
    width: 98%;
    padding: 1rem;
  }

  &__header {
    .router-link {
      color: $text-main-color;
      text-decoration: none;
      width: 33.3%;
      padding: 0.7rem 0;
      border-bottom: $dark-grey 1px solid;
    }
    .router-link:hover {
      @include tab-hover;
    }

    .router-link-active-click {
      font-weight: bold;
      color: $text-main-color;
      text-decoration: none;
      width: 33.3%;
      padding: 0.7rem 0;
      border-bottom: $dark-grey 1px solid;
      background-color: $dark-grey;
    }
  }
}
.jobs {
  text-decoration: none;
}

</style>