<script lang="ts">
import Vue from 'vue';
import UserCard from '@/components/Organisms/Manages/UserCard.vue'
import JobCreateSkillCard from '@/components/Organisms/Jobs/JobCreateSkillCard.vue'
import { JobCreateSession1 as DateType } from '@/components/Organisms/Jobs/JobCreateCard.vue'

export default Vue.extend({
  components: {
    UserCard,
    JobCreateSkillCard
  },
  computed: {
    isValue() {
      if(this.jobTitle && this.devStartDate && this.devEndDate) {
        return true
      }
      return false
    }
  },
  data(): DateType {
    return {
      jobTitle: "",
      devStartDate: "",
      devEndDate: "",
      jobDescription: "",
    }
  },
  created() {
    this.jobTitle = sessionStorage.getItem('jobTitle');
    this.devStartDate = sessionStorage.getItem('devStartDate');
    this.devEndDate = sessionStorage.getItem('devEndDate');
    this.jobDescription = sessionStorage.getItem('jobDescription');
  }
});
</script>

<template>
  <section>
    <v-container class="wrapper">
      <v-row v-if="isValue">
        <UserCard />
        <v-sheet class="create">
          <v-col>
            <JobCreateSkillCard 
              :jobTitle="jobTitle"
              :devStartDate="jobTitle"
              :devEndDate="jobTitle"
              :jobDescription="jobDescription"
            />
          </v-col>
        </v-sheet>
      </v-row>
      <v-col class="not-value" v-else>
        入力されていないものが存在します。
      </v-col>
    </v-container>
  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.wrapper {
  width: 90%;
  max-width: none;
  margin-bottom: 1rem;

  @media screen and (max-width: 1100px) {
    width: 97%;
  }

  .not-value {
    min-height: 100vh
  }
}

.create {
  @include card-border-color;
  width: 60%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
  font-size: 14px;
  padding: 0 2rem 2rem 2rem;
  color: $text-main-color;

  @media screen and (max-width: 1000px) {
    width: 50%;
  }

  @media screen and (max-width: 900px) {
    width: 85%;
    padding: 0 1rem 2rem 1rem;
  }

  @media screen and (max-width: 600px) {
    width: 95%;
  }

  @media screen and (max-width: 450px) {
    width: 98%;
    padding: 1rem;
  }
}
.jobs {
  text-decoration: none;
}
</style>