<script lang="ts">
import Vue from 'vue';
import Loading from '@/components/Organisms/Commons/Loading/Loading.vue'
import UserCard from '@/components/Organisms/Manages/UserCard.vue'
import JobCreateCompleteCard from '@/components/Organisms/Jobs/JobCreateCompleteCard.vue'

type DataType = {
  loading: boolean;
}

export default Vue.extend({
  components: {
    Loading,
    UserCard,
    JobCreateCompleteCard
  },
  data(): DataType {
    return {
      loading: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1500)
  },
});
</script>

<template>
  <section>
    <v-container class="wrapper" v-show="!loading">
      <v-row>
        <UserCard />
        <v-sheet class="create">
          <v-col>
            <JobCreateCompleteCard />
          </v-col>
        </v-sheet>
      </v-row>
    </v-container>
    <Loading v-show="loading">
    </Loading>
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


