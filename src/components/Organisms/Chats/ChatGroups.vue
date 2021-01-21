<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed
} from '@vue/composition-api';
import axios from 'axios'
import { Job } from '@/types/job';
import { m, dayJs, API_URL, truncate } from '@/master'
import { ManageJob, FetchManageJobs } from '@/types/manage';
import { FetchJobs } from '@/types/job';

type State = {
  chatGroups: Job[];
  myselfJobs: any;
  isActive: boolean;
  hasError: boolean;
}

const initialState = (): State => ({
  chatGroups: [],
  myselfJobs: [],
  isActive: true,
  hasError: false,
});

export default defineComponent({ 
  props: {
    userId: { type: Number, defalut: 0 }
  },
  setup: (props) => {
    const state = reactive<State>(initialState());

    const day = (value: string, format: string) => dayJs(value, format);
    const limit = (value: string, num: number) => truncate(value, num);

    const getChatGroups = async () => {
      try { 
        const res = await axios.get<FetchManageJobs>(`${API_URL}/apply_jobs?user_id=${ props.userId }`)
        const array: ManageJob[] = [];
        for(let i = 0; i < res.data.response.length; i++) {
          const applyData: ManageJob = res.data.response[i]
          if(applyData.apply_status_id == m.APPLY_STATUS_PARTICIPATE || applyData.apply_status_id  == m.APPLY_STATUS_SELF ) {
            array.push(applyData)
            state.chatGroups = array
          }
        }
      } catch (error) {
        console.log(error)
      }
    };

    const getMyselfGroupes = async () => {
      try {
        const res = await axios.get<FetchJobs>(`${API_URL}/jobs?user_id=${ props.userId }`)
        state.myselfJobs = res.data.response
      } catch (error) {
        console.log(error)
      }
    };

    onMounted(() => {
      getChatGroups();
      getMyselfGroupes();
    });

    return {
      ...toRefs(state),
      m: computed(() => m),
      day,
      limit,
      getChatGroups
    }
  }
});
</script>

<template>
  <section>
    <v-card 
      :to="`/chat/${ chatGroup.job.id }`" 
      v-for="chatGroup in chatGroups" 
      :key="chatGroup.job.id" 
      v-bind:class="{ active: isActive, 'text-danger': hasError }"
      class="group"
      >
      <div class="group__area">
        <p>{{ limit(chatGroup.job.job_title, 36) }}</p>
        <v-row class="row">
          <label 
            for="name" 
            class="selfPost" 
            v-if="chatGroup.apply_status_id === m.APPLY_STATUS_SELF"
          >投稿案件</label>
          <label 
            for="name" 
            class="post" 
            v-if="chatGroup.apply_status_id === m.APPLY_STATUS_PARTICIPATE"
          >参加案件</label>
          <section>{{ day(chatGroup.created_at, "YYYY年 M月 D日") }}</section>
        </v-row>
      </div>
    </v-card>
    <v-card 
      :to="`/chat/${ myselfJob.id }`" 
      v-for="myselfJob in myselfJobs" 
      :key="myselfJob.id" 
      v-bind:class="{ active: isActive, 'text-danger': hasError }"
      class="group"
      >
      <div class="group__area">
        <p>{{ limit(myselfJob.job_title, 36) }}</p>
        <v-row class="row">
          <label 
            for="name" 
            class="selfPost" 
          >投稿案件</label>
          <section>{{ day(myselfJob.created_at, "YYYY年 M月 D日") }}</section>
        </v-row>
      </div>
    </v-card>
  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

// * v-card の boxshadowを消します
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none; 
}
.active {
  text-decoration: none;
}
.router-link-exact-active.router-link-active.active {
  font-weight: bold;
}

.group {
  border-bottom: $card-border-color 1px solid;
  border-radius: none;

  &__area {
    width: 90%;
    height: 102px;
    margin: 0 auto;
    padding: 0.7rem 0 0.5rem 0;
    margin-top: 0.2rem;
    position: relative;
    
    @media (max-width: 868px) {
      padding: 0.7rem 0 0.5rem 1rem;
      margin: 0;
    }

    .row {
      padding: 0rem 0 1rem 1rem;
      position: absolute;
      bottom: 0;
      width: 100%;

      .selfPost {
        @include box-shadow-btn;
        background-color: $third-dark;
        color: $white;
        padding: 0.2rem 1.5rem;
        width: 102px;
        font-weight: bold;
        font-size: 0.8em;
        border-radius: 8px;
        appearance: none;
        border: none;
        transition: .3s;
        outline: none;
      }

      .post {
        border: $third-dark 1px solid;
        color: $third-dark;
        background-color: $white;
        padding: 0.2rem 1.5rem;
        width: 102px;
        font-weight: bold;
        font-size: 0.8em;
        border-radius: 8px;
        appearance: none;
        transition: .3s;
        outline: none;
      }

      section {
        color: $text-sub-color;
        font-size: 12px;
        margin-left: 5.5rem;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    p {
      text-align: left;
      color: $text-main-color;
    }

    .chat-member-name {
      font-size: 12px;
      color: $text-sub-color;
    }
  }
}

.router {
  cursor: pointer;
  text-decoration: none;
}

</style>