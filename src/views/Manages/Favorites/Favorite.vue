<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed
} from '@vue/composition-api';
import { API_URL } from '@/master'
import axios from 'axios'
import UserCard from '@/components/Organisms/Manages/UserCard.vue'
import JobsCard from '@/components/Organisms/Manages/JobsCard.vue'
import { Job } from '@/types/job';
import Vuex from '@/store/index'

type State = {
  favoriteJobs: Job[];
  userId: number;
}

const initialState = (): State => ({
  favoriteJobs: [],
  userId: Vuex.state.auth.userId
});

export default defineComponent({ 
  components: {
    UserCard,
    JobsCard
  },
  setup: (_, context) => {
    const state = reactive<State>(initialState());
    const router = context.root.$router

    const isLogin = computed(() => {
      if(state.userId) {
        return true
      } else {
        router.push('/login');
      }
    })

    onMounted(() => {
      // * 保存している案件を取得
      axios.get(`${API_URL}/favorite_job/?user_id=${state.userId}`)
      .then(response => {
        state.favoriteJobs = response.data
      })
      .catch(error =>{
        console.log(error)
      })
    })

    return {
      ...toRefs(state),
      isLogin
    }
  }
});
</script>

<template>
  <section>
    <v-container class="wrapper" v-if="isLogin">
      <v-row>
        <UserCard />
        <v-sheet class="manage">
          <v-row class="manage__header">
            <router-link to="/manage" class="router-link">
              <span>管理案件</span> 
            </router-link>
            <router-link to="/manage/apply_job" class="router-link">
              <span>応募案件</span>
            </router-link>
            <router-link to="/manage/favorite_job" class="router-link-active-click">
              <span>保存案件</span> 
            </router-link>
          </v-row>
          <v-col>
            <router-link 
              :to="`/manage/favorite_job/${ jobs.jobId }`" 
              v-for="jobs in favoriteJobs" 
              :key="jobs.id" 
              class="jobs"
            >
              <JobsCard :job="jobs.job"/>
            </router-link>
          </v-col>
        </v-sheet>
      </v-row>
    </v-container>
    <div v-else>
      ログインが必要です！
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