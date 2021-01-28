<script lang="ts">
import Vue from "vue";
import JobCreateCard from "@/components/Organisms/Jobs/JobCreateCard.vue";
import UserCard from "@/components/Organisms/Manages/UserCard.vue";

export default Vue.extend({
  components: {
    JobCreateCard,
    UserCard,
  },
});
</script>

<template>
  <section>
    <v-container class="wrapper">
      <v-row>
        <UserCard />
        <v-sheet class="create">
          <v-col>
            <JobCreateCard />
          </v-col>
        </v-sheet>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

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
