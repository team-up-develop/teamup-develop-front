<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed
} from '@vue/composition-api';
import axios from 'axios';
import { ManageJob } from '@/types/manage';
import { m, API_URL } from '@/master'
import JobsCard from '@/components/Organisms/Manages/ChangeStatus/JobsCard.vue'
import UserCard from '@/components/Organisms/Manages/ChangeStatus/UserCard.vue'
import Vuex from '@/store/index'

type State = {
  rejectUsers: ManageJob[];
  userId: number;
  jobTitle: string;
}

const initialState = (): State => ({
  rejectUsers: [],
  userId: Vuex.state.auth.userId,
  jobTitle: ""
});

export default defineComponent({ 
  components: {
    JobsCard,
    UserCard
  },
  props: {
    // * job.idを受け取る
    id: { type: Number, default: null }
  },
  setup: (props, context) => {
    const state = reactive<State>(initialState());

    const isLogin = computed(() => {
      if(state.userId) {
        return true
      } else {
        return false
      }
    });

    onMounted(() => {
      axios.get<ManageJob[]>(`${API_URL}/apply_job/?job_id=${ props.id }&apply_status_id=${ m.APPLY_STATUS_REJECT }`)
      .then(response => {
        state.rejectUsers = response.data
      })
      .catch(error =>{
        console.log(error)
      })

      axios.get<any>(`${API_URL}/job/${ props.id }`)
      .then(response => {
        state.jobTitle = response.data.jobTitle
      })
      .catch(error =>{
        console.log(error)
      })
    })

    return {
      ...toRefs(state),
      isLogin,
    }
  }
});
</script>

<template>
  <section>
    <v-container class="wrapper" v-if="isLogin">
      <v-row>
        <JobsCard 
          :jobTitle="jobTitle" 
          :jobId="id"
        />
        <v-sheet class="manage">
          <v-row class="manage__header">
            <router-link :to="`/manage/applicant/${ id }`" class="router-link">
              <span>応募者</span> 
            </router-link>
            <router-link :to="`/manage/participate/${ id }`" class="router-link">
              <span>参加者</span>
            </router-link>
            <router-link :to="`/manage/reject/${ id }`" class="router-link-active-click">
              <span>拒否者</span> 
            </router-link>
          </v-row>
          <v-col>
            <router-link 
              :to="`/manage/profile/${ id }/${ user.userId }`" 
              v-for="user in rejectUsers" 
              :key="user.id"
              class="users"
            >
              <UserCard :user="user" />
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

.users {
  text-decoration: none;
}

</style>