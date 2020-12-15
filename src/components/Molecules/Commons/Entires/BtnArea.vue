<script lang="ts">
import Vue, { PropType } from 'vue';
import LoginBtn from '@/components/Atoms/Commons/Entires/LoginBtn.vue'
import RegisteBtn from '@/components/Atoms/Commons/Entires/RegisteBtn.vue'

export default Vue.extend({
  components: {
    LoginBtn,
    RegisteBtn
  }
});
</script>

<template>
  <section>
    <v-row class="left-user-menu">
      <router-link to="/jobs" class="menu-list">
        <!-- <v-icon class="icon">mdi-magnify</v-icon> -->
      </router-link>
      <LoginBtn/>
    </v-row>
    <v-row class="right-create-btn">
      <RegisteBtn/>
    </v-row>
  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.icon {
  margin-right: 0.5rem;
}

.router {
  text-decoration: none;
}

.menu-list {
  color: $text-sub-color;
  font-size: 14px;
  text-decoration: none;
  margin-left: 1rem;
}

.left-user-menu {
  width: 35%;
  height: 100%;
  display: inline-block;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    width: 45%;
    margin-right: 1rem;
  }
}

.right-create-btn {
  width: 28%;
  height: 100%;
  display: inline-block;
  font-weight: bold;
}

</style>