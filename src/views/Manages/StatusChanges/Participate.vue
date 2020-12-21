<script lang="ts">
import Vue, { PropType } from 'vue';
import axios from 'axios';
import { ManageJob } from '@/types/manage';
import JobsCard from '@/components/Organisms/Manages/ChangeStatus/JobsCard.vue'
import UserCard from '@/components/Organisms/Manages/ChangeStatus/UserCard.vue'
import { m, API_URL } from '@/master'

type DataType = {
  assginUsers: ManageJob[];
  userId: number;
  jobTitle: string;
}

export default Vue.extend({
  components: {
    JobsCard,
    UserCard
  },
  props: {
    // * job.idを受け取る
    id: { type: Number as PropType<number>, default: 0 }
  },
  data(): DataType {
    return {
      assginUsers: [], //? 参加者
      userId: this.$store.state.auth.userId,
      jobTitle: ""
    }
  },
  created() {
    axios.get(`${API_URL}/apply_job/?job_id=${ this.id }&apply_status_id=${ m.APPLY_STATUS_PARTICIPATE }`)
    .then(response => {
      this.assginUsers = response.data
    })
  },
  mounted() {
    // *  案件タイトル取得
    axios.get(`${API_URL}/job/${ this.id }`)
    .then(response => {
      this.jobTitle = response.data.jobTitle
    })
  }
});
</script>

<template>
  <section>
    <v-container class="wrapper">
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
            <router-link :to="`/manage/participate/${ id }`" class="router-link-active-click">
              <span>参加者</span>
            </router-link>
            <router-link :to="`/manage/reject/${ id }`" class="router-link">
              <span>拒否者</span> 
            </router-link>
          </v-row>
          <v-col>
            <router-link 
              :to="`/manage/profile/${ id }/${ user.userId }`" 
              v-for="user in assginUsers" 
              :key="user.id"
              class="users"
            >
              <UserCard :user="user" />
            </router-link>
          </v-col>
        </v-sheet>
      </v-row>
    </v-container>
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
      border-bottom: grey 1px solid;
    }

    .router-link-active-click {
      font-weight: bold;
      color: $text-main-color;
      text-decoration: none;
      width: 33.3%;
      padding: 0.7rem 0;
      border-bottom: grey 1px solid;
      background-color: silver;
    }
  }
}

.users {
  text-decoration: none;
}

</style>